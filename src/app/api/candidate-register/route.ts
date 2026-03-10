// C:\Users\simon\Documents\illuminex-site\src\app\api\candidate-register\route.ts

import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";
import { logAdminEvent } from "@/lib/adminAudit";
import { candidateRateLimit } from "@/lib/rateLimit";
import {
  cleanText,
  getClientIp,
  isEmail,
  isMultipartRequest,
  isSafeUploadFilename,
  looksLikeSuspiciousUrlSpam,
} from "@/lib/validation";

export const runtime = "nodejs";

const RECAPTCHA_ACTION = "candidate_submit";
const MIN_SCORE = 0.5;

const MAX_FILE_MB = 8;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

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
  if (typeof data.action === "string" && data.action !== expectedAction) {
    throw new Error("Invalid reCAPTCHA action.");
  }

  const score = typeof data.score === "number" ? data.score : 0;
  if (score < MIN_SCORE) {
    throw new Error("reCAPTCHA score too low.");
  }
}

export async function POST(req: Request) {
  try {
    if (!isMultipartRequest(req)) {
      return NextResponse.json(
        { ok: false, error: "Invalid content type." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);

    const rate = await candidateRateLimit.limit(`candidate:${ip}`);
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

    const form = await req.formData();

    const website = cleanText(form.get("website"), 200);
    if (website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const recaptchaToken = cleanText(form.get("recaptchaToken"), 4000);
    if (!recaptchaToken) {
      return NextResponse.json(
        { ok: false, error: "Verification missing. Please try again." },
        { status: 400 }
      );
    }

    await verifyRecaptcha(recaptchaToken, RECAPTCHA_ACTION);

    const fullName = cleanText(form.get("fullName"), 120);
    const email = cleanText(form.get("email"), 160);
    const phone = cleanText(form.get("phone"), 50);
    const linkedin = cleanText(form.get("linkedin"), 300);
    const message = cleanText(form.get("message"), 3000);

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

    if (looksLikeSuspiciousUrlSpam(fullName)) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission." },
        { status: 400 }
      );
    }

    const file = form.get("cv");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Please attach your CV." },
        { status: 400 }
      );
    }

    if (!isSafeUploadFilename(file.name)) {
      return NextResponse.json(
        { ok: false, error: "Invalid CV file name." },
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
      await logAdminEvent({
        action: "candidate.register",
        actorEmail: email,
        actor: fullName,
        ip,
        meta: {
          phone,
          linkedin: linkedin || null,
          cvName: file.name,
          cvType: file.type,
          cvSizeMb: Math.round(sizeMb * 10) / 10,
          mode: "mock",
        },
      });

      return NextResponse.json({
        ok: true,
        mode: "mock",
        received: {
          fullName,
          email,
          phone,
          linkedin: linkedin || "-",
          message: message || "-",
          cvName: file.name,
          cvType: file.type,
          cvSizeMb: Math.round(sizeMb * 10) / 10,
        },
      });
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

    await logAdminEvent({
      action: "candidate.register",
      actorEmail: email,
      actor: fullName,
      ip,
      meta: {
        phone,
        linkedin: linkedin || null,
        cvName: file.name,
        cvType: file.type,
        cvSizeMb: Math.round(sizeMb * 10) / 10,
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