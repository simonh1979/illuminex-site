import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 60_000; // 1 min
const RATE_MAX = 6;            // 6 requests/min per IP
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

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

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
      return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
    }

    const {
      name = "",
      email = "",
      message = "",
      company = "",
      phone = "",
      website = "", // honeypot (must remain empty)
    } = body;

    // Honeypot trap
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // pretend success
    }

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

    const to = process.env.CONTACT_TO;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO not set on server." },
        { status: 500 }
      );
    }

    const transport = getTransport();

    const subject = `New website enquiry — ${cleanName}`;
    const text =
`New enquiry from the website:

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

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}