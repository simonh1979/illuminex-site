import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";

export const runtime = "nodejs";

/* =========================================================
   CONFIG
   - Rate limit
   - Mock behaviour (Preview/Dev)
========================================================= */

const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 6; // 6 requests per minute per IP

/**
 * Mock Mode B:
 * - Preview/Development: if CONTACT_TO is missing, return ok:true (mocked)
 * - Production: require CONTACT_TO (so you don't go live broken)
 */
function isProductionEnv() {
  const vercelEnv = process.env.VERCEL_ENV; // "production" | "preview" | "development"
  return vercelEnv === "production" || process.env.NODE_ENV === "production";
}

/* =========================================================
   RATE LIMITING (basic per-IP throttle)
========================================================= */

const ipHits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= RATE_MAX) return { ok: false };

  entry.count += 1;
  return { ok: true };
}

/* =========================================================
   UTILITIES
========================================================= */

function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* =========================================================
   reCAPTCHA (server verify)
========================================================= */

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("RECAPTCHA_SECRET_KEY not set on server.");

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(`reCAPTCHA verification request failed (${res.status}).`);
  if (!data?.success) throw new Error("reCAPTCHA verification failed.");
}

/* =========================================================
   MAIN HANDLER
========================================================= */

export async function POST(req: Request) {
  try {
    /* =========================
       1) Rate limit
    ========================= */
    const ip = getClientIp(req);

    if (!rateLimit(ip).ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Try again shortly." },
        { status: 429 }
      );
    }

    /* =========================
       2) Parse request body
       (Contact form uses JSON)
    ========================= */
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const {
      name = "",
      email = "",
      message = "",
      company = "",
      phone = "",
      website = "", // honeypot
      recaptchaToken = "", // required
    } = body;

    /* =========================
       3) Honeypot trap
    ========================= */
    if (typeof website === "string" && website.trim().length > 0) {
      // Pretend success to avoid tipping bots
      return NextResponse.json({ ok: true });
    }

    /* =========================
       4) reCAPTCHA validation
    ========================= */
    const token = String(recaptchaToken || "").trim();
    if (!token) {
      return NextResponse.json({ ok: false, error: "Please complete reCAPTCHA." }, { status: 400 });
    }

    await verifyRecaptcha(token);

    /* =========================
       5) Field validation
    ========================= */
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanMessage = String(message).trim();
    const cleanCompany = String(company).trim();
    const cleanPhone = String(phone).trim();

    if (cleanName.length < 2) {
      return NextResponse.json({ ok: false, error: "Name is too short." }, { status: 400 });
    }

    if (!isEmail(cleanEmail)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    if (cleanMessage.length < 10) {
      return NextResponse.json({ ok: false, error: "Message is too short." }, { status: 400 });
    }

    /* =========================
       6) Mock Mode B (no mailbox yet)
    ========================= */
    const to = process.env.CONTACT_TO;

    if (!to) {
      // Production must fail (safe go-live)
      if (isProductionEnv()) {
        return NextResponse.json(
          { ok: false, error: "CONTACT_TO not set on server." },
          { status: 500 }
        );
      }

      // Preview/Dev succeeds (mock)
      return NextResponse.json({ ok: true, mocked: true });
    }

    /* =========================
       7) Email transport (real send)
    ========================= */
    const transport = getTransport();

    const subject = `New website enquiry — ${cleanName}`;
    const text = `New enquiry from the website:

Name: ${cleanName}
Email: ${cleanEmail}
Company: ${cleanCompany || "-"}
Phone: ${cleanPhone || "-"}

Message:
${cleanMessage}

IP: ${ip}
`;

    await transport.sendMail({
      from: fromAddress(),
      to,
      replyTo: cleanEmail,
      subject,
      text,
    });

    /* =========================
       8) Success response
    ========================= */
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}