// C:\Users\simon\Documents\illuminex-site\src\app\api\contact\route.ts

import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";
import { logAdminEvent } from "@/lib/adminAudit";
import { contactRateLimit } from "@/lib/rateLimit";
import {
  cleanText,
  getClientIp,
  isEmail,
  isJsonRequest,
  looksLikeSuspiciousUrlSpam,
} from "@/lib/validation";

export const runtime = "nodejs";

const RECAPTCHA_ACTION = "contact_submit";
const MIN_SCORE = 0.5;

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

  if (!res.ok) {
    throw new Error(`reCAPTCHA verification request failed (${res.status}).`);
  }
  if (!data?.success) {
    throw new Error("reCAPTCHA verification failed.");
  }
  if (data.action && data.action !== expectedAction) {
    throw new Error("Invalid reCAPTCHA action.");
  }

  const score = typeof data.score === "number" ? data.score : 0;
  if (score < MIN_SCORE) {
    throw new Error("reCAPTCHA score too low.");
  }
}

function isMockMode() {
  return String(process.env.MOCK_FORMS || "").toLowerCase() === "true";
}

export async function POST(req: Request) {
  try {
    if (!isJsonRequest(req)) {
      return NextResponse.json(
        { ok: false, error: "Invalid content type." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);

    const rate = await contactRateLimit.limit(`contact:${ip}`);
    if (!rate.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.max(1, Math.ceil((rate.reset - Date.now()) / 1000))
            ),
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 }
      );
    }

    const website = cleanText((body as Record<string, unknown>).website, 200);
    if (website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const token = cleanText(
      (body as Record<string, unknown>).recaptchaToken,
      4000
    );
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Please complete verification." },
        { status: 400 }
      );
    }

    await verifyRecaptcha(token, RECAPTCHA_ACTION);

    const cleanName = cleanText((body as Record<string, unknown>).name, 120);
    const cleanEmail = cleanText((body as Record<string, unknown>).email, 160);
    const cleanMessage = cleanText(
      (body as Record<string, unknown>).message,
      3000
    );
    const cleanCompany = cleanText(
      (body as Record<string, unknown>).company,
      160
    );
    const cleanPhone = cleanText((body as Record<string, unknown>).phone, 50);

    if (cleanName.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Name is too short." },
        { status: 400 }
      );
    }

    if (!isEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message is too short." },
        { status: 400 }
      );
    }

    if (looksLikeSuspiciousUrlSpam(cleanName) || looksLikeSuspiciousUrlSpam(cleanCompany)) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission." },
        { status: 400 }
      );
    }

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