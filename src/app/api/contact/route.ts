// C:\Users\simon\Documents\illuminex-site\src\app\api\contact\route.ts

import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";
import { logAdminEvent } from "@/lib/adminAudit";

export const runtime = "nodejs";

/* =========================================================
   Config
========================================================= */

const RECAPTCHA_ACTION = "contact_submit";
const MIN_SCORE = 0.5; // tune later (0.3–0.7 common)

/* =========================================================
   Rate limiting (basic per-IP throttle)
========================================================= */

const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 6; // 6 requests per minute per IP
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
   Utilities
========================================================= */

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isMockMode() {
  return String(process.env.MOCK_FORMS || "").toLowerCase() === "true";
}

async function verifyRecaptcha(token: string, expectedAction: string) {
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

  // v3 checks
  if (data.action && data.action !== expectedAction) {
    throw new Error("Invalid reCAPTCHA action.");
  }

  const score = typeof data.score === "number" ? data.score : 0;
  if (score < MIN_SCORE) {
    throw new Error("reCAPTCHA score too low.");
  }
}

/* =========================================================
   POST handler
========================================================= */

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip).ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Try again shortly." },
        { status: 429 }
      );
    }

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
      recaptchaToken = "",
    } = body as Record<string, unknown>;

    /* =========================
       Honeypot
    ========================= */
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    /* =========================
       reCAPTCHA v3
    ========================= */
    const token = String(recaptchaToken || "").trim();
    if (!token) {
      return NextResponse.json({ ok: false, error: "Please complete verification." }, { status: 400 });
    }

    await verifyRecaptcha(token, RECAPTCHA_ACTION);

    /* =========================
       Field validation
    ========================= */
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim();
    const cleanMessage = String(message || "").trim();
    const cleanCompany = String(company || "").trim();
    const cleanPhone = String(phone || "").trim();

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
       MOCK MODE (no SMTP)
    ========================= */
    if (isMockMode()) {
  await logAdminEvent({
    action: "contact.submit",
    actorEmail: cleanEmail,
    actor: cleanName,
    ip,
    meta: {
      company: cleanCompany || null,
      phone: cleanPhone || null,
      mode: "mock",
    },
  });

  return NextResponse.json({
    ok: true,
    mode: "mock",
    received: {
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || "-",
      phone: cleanPhone || "-",
      message: cleanMessage,
    },
  });
}

    /* =========================
       Live email mode
    ========================= */
    const to = process.env.CONTACT_TO;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO not set on server." },
        { status: 500 }
      );
    }

    const transport = getTransport();

    await transport.sendMail({
      from: fromAddress(),
      to,
      replyTo: cleanEmail,
      subject: `New website enquiry — ${cleanName}`,
      text: `New enquiry from the website:

Name: ${cleanName}
Email: ${cleanEmail}
Company: ${cleanCompany || "-"}
Phone: ${cleanPhone || "-"}

Message:
${cleanMessage}

IP: ${ip}
`,
    });

    await logAdminEvent({
  action: "contact.submit",
  actorEmail: cleanEmail,
  actor: cleanName,
  ip,
  meta: {
    company: cleanCompany || null,
    phone: cleanPhone || null,
    mode: "live",
  },
});

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}