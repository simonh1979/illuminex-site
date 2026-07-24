import { NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rateLimit";
import {
  cleanText,
  getClientIp,
  isEmail,
  isMultipartRequest,
  isSafeUploadFilename,
  looksLikeSuspiciousUrlSpam,
} from "@/lib/validation";

export const runtime = "nodejs";

const MAX_FILE_MB = 8;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type RecaptchaV3Response = {
  success?: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyRecaptchaV3(token: string, expectedAction: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("RECAPTCHA_V3_SECRET_KEY not set on server.");

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = (await res.json().catch(() => null)) as
    | RecaptchaV3Response
    | null;

  if (!res.ok) {
    throw new Error(`reCAPTCHA verification request failed (${res.status}).`);
  }

  if (!data?.success) {
    throw new Error("reCAPTCHA verification failed.");
  }

  if (data.action && data.action !== expectedAction) {
    throw new Error("reCAPTCHA action mismatch.");
  }

  const score = typeof data.score === "number" ? data.score : 0;
  const MIN_SCORE = 0.5;

  if (data.action !== "apply_submit") {
    throw new Error("Invalid reCAPTCHA action.");
  }

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

    const rate = await applyRateLimit.limit(`apply:${ip}`);
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
        { ok: false, error: "Please complete reCAPTCHA." },
        { status: 400 }
      );
    }

    await verifyRecaptchaV3(recaptchaToken, "apply_submit");

    const jobId = cleanText(form.get("jobId"), 80);
    const jobTitle = cleanText(form.get("jobTitle"), 220);
    const jobAdId = cleanText(form.get("jobAdId"), 80);
    const sector = cleanText(form.get("sector"), 160);
    const location = cleanText(form.get("location"), 160);

    const fullName = cleanText(form.get("fullName"), 120);
    const email = cleanText(form.get("email"), 160);
    const phone = cleanText(form.get("phone"), 50);
    const linkedin = cleanText(form.get("linkedin"), 300);
    const message = cleanText(form.get("message"), 3000);
    const terms = String(form.get("terms") || "") === "true";

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

    if (!terms) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please confirm acceptance of the Terms & Conditions.",
        },
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

    return NextResponse.json({
      ok: true,
      mode: "mock",
      received: {
        jobId: jobId || "-",
        jobTitle: jobTitle || "-",
        jobAdId: jobAdId || "-",
        sector: sector || "-",
        location: location || "-",
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
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}