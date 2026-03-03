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

  // Debug (safe): shows only if secret exists, not the secret itself
  console.log("verifyRecaptcha: secret exists?", Boolean(secret));

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

  // Debug
  console.log("verifyRecaptcha: http status", res.status);
  console.log("verifyRecaptcha: google response", data);

  if (!res.ok) throw new Error(`reCAPTCHA verification request failed (${res.status}).`);
  if (!data?.success) throw new Error("reCAPTCHA verification failed.");
}

export async function POST(req: Request) {
  // Debug: confirms the API route is being hit
  console.log("Apply API hit");

  try {
    const form = await req.formData();

    // Honeypot (keep empty)
    const website = String(form.get("website") || "");
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // reCAPTCHA token (required)
    const recaptchaToken = String(form.get("recaptchaToken") || "");
    console.log("recaptchaToken exists?", Boolean(recaptchaToken));

    if (!recaptchaToken) {
      return NextResponse.json(
        { ok: false, error: "Please complete reCAPTCHA." },
        { status: 400 }
      );
    }

    await verifyRecaptcha(recaptchaToken);

    // Fields (match ApplyFormClient.tsx)
    const jobId = String(form.get("jobId") || "").trim();
    const jobTitle = String(form.get("jobTitle") || "").trim();
    const jobAdId = String(form.get("jobAdId") || "").trim();

    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const message = String(form.get("message") || "").trim();

    const terms = String(form.get("terms") || "") === "true";

    if (fullName.length < 2) {
      return NextResponse.json({ ok: false, error: "Name is too short." }, { status: 400 });
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
    if (!terms) {
      return NextResponse.json(
        { ok: false, error: "Please confirm acceptance of the Terms & Conditions." },
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

    const to = process.env.APPLY_TO;
    console.log("APPLY_TO exists?", Boolean(to));

    if (!to) {
      return NextResponse.json({ ok: false, error: "APPLY_TO not set on server." }, { status: 500 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const transport = getTransport();

    await transport.sendMail({
      from: fromAddress(),
      to,
      replyTo: email,
      subject: `New candidate application — ${fullName}${jobTitle ? ` (${jobTitle})` : ""}`,
      text: `New candidate application:

Role: ${jobTitle || "-"}
Website job ID: ${jobId || "-"}
JobAdder JobAd ID: ${jobAdId || "-"}

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
    console.log("Apply API error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}