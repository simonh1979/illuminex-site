// C:\Users\simon\Documents\illuminex-site\src\app\api\candidate-register\route.ts

import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_FILE_MB = 8;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

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

  if (!res.ok) {
    throw new Error(`reCAPTCHA verification request failed (${res.status}).`);
  }

  if (!data?.success) {
    throw new Error("reCAPTCHA verification failed.");
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot (keep empty)
    const website = String(form.get("website") || "");
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // reCAPTCHA token (required)
    const recaptchaToken = String(form.get("recaptchaToken") || "");
    if (!recaptchaToken) {
      return NextResponse.json(
        { ok: false, error: "Please complete reCAPTCHA." },
        { status: 400 }
      );
    }
    await verifyRecaptcha(recaptchaToken);

    // Fields
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const message = String(form.get("message") || "").trim();

    const terms = String(form.get("terms") || "") === "true";
    const privacy = String(form.get("privacy") || "") === "true";
    const cookies = String(form.get("cookies") || "") === "true";

    if (fullName.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Name is too short." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "Please enter a phone number." },
        { status: 400 }
      );
    }
    if (!terms || !privacy || !cookies) {
      return NextResponse.json(
        { ok: false, error: "Please accept Terms, Privacy and Cookies." },
        { status: 400 }
      );
    }

    // CV (required)
    const file = form.get("cv");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Please attach your CV." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { ok: false, error: "CV must be PDF or Word (.doc/.docx)." },
        { status: 400 }
      );
    }

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_MB) {
      return NextResponse.json(
        { ok: false, error: `CV too large. Max ${MAX_FILE_MB}MB.` },
        { status: 400 }
      );
    }

    const to = process.env.CANDIDATE_TO;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CANDIDATE_TO not set on server." },
        { status: 500 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const transport = getTransport();

    await transport.sendMail({
      from: fromAddress(),
      to,
      replyTo: email,
      subject: `New candidate registration — ${fullName}`,
      text: `New candidate registration:

Name: ${fullName}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin || "-"}

Message:
${message || "-"}

Attached: ${file.name} (${file.type}, ${Math.round(sizeMb * 10) / 10}MB)
`,
      attachments: [
        {
          filename: file.name || "cv",
          content: bytes,
          contentType: file.type,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}