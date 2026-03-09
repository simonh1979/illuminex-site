import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* =========================================================
   Upload rules
========================================================= */

const MAX_FILE_MB = 8;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/* =========================================================
   Utilities
========================================================= */

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

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

/* =========================================================
   POST handler (mock mode)
========================================================= */

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    /* =========================
       Honeypot (keep empty)
    ========================= */
    const website = String(form.get("website") || "");
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    /* =========================
       reCAPTCHA v3 (required)
    ========================= */
    const recaptchaToken = String(form.get("recaptchaToken") || "");
    if (!recaptchaToken) {
      return NextResponse.json(
        { ok: false, error: "Please complete reCAPTCHA." },
        { status: 400 }
      );
    }

    await verifyRecaptchaV3(recaptchaToken, "apply_submit");

    /* =========================
       Fields
    ========================= */
    const jobId = String(form.get("jobId") || "").trim();
    const jobTitle = String(form.get("jobTitle") || "").trim();
    const jobAdId = String(form.get("jobAdId") || "").trim();
    const sector = String(form.get("sector") || "").trim();
    const location = String(form.get("location") || "").trim();

    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const message = String(form.get("message") || "").trim();
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

    /* =========================
       CV (required)
    ========================= */
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

    /* =========================
       MOCK MODE (no mailbox yet)
    ========================= */
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