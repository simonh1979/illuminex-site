
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
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
const MAX_BODY_BYTES = 16 * 1024;

// Additional protection against sustained automated submissions.
// Uses the existing shared Upstash Redis connection.
const contactHourlyLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 h"),
      prefix: "ratelimit:contact-hour",
      analytics: true,
    })
  : null;

async function verifyRecaptcha(
  token: string,
  expectedAction: string,
  expectedHostname: string
) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY not set on server.");
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  const res = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    }
  );

  if (!res.ok) {
    throw new Error("reCAPTCHA verification service unavailable.");
  }

  const data = await res.json().catch(() => null);

  const errorCodes = Array.isArray(data?.["error-codes"])
    ? data["error-codes"]
    : [];

  if (
    errorCodes.includes("Over free quota.") ||
    data?.error === "Over free quota."
  ) {
    throw new Error("reCAPTCHA verification quota exceeded.");
  }

  if (!data?.success) {
    throw new Error("reCAPTCHA verification failed.");
  }

  if (data.action !== expectedAction) {
    throw new Error("Invalid reCAPTCHA action.");
  }

  // Vercel supplies the visitor-facing domain in the Host header.
  // Compare it with the hostname verified by Google.
  if (
    typeof data.hostname !== "string" ||
    data.hostname.toLowerCase() !== expectedHostname.toLowerCase()
  ) {
    throw new Error("Invalid reCAPTCHA hostname.");
  }

  const score =
    typeof data.score === "number" ? data.score : 0;

  if (score < MIN_SCORE) {
    throw new Error("reCAPTCHA score too low.");
  }
}

function isMockMode() {
  return (
    String(process.env.MOCK_FORMS || "").toLowerCase() === "true"
  );
}

function rateLimitResponse(reset: number) {
  return NextResponse.json(
    {
      ok: false,
      error: "Too many requests. Try again shortly.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(
          Math.max(1, Math.ceil((reset - Date.now()) / 1000))
        ),
      },
    }
  );
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

    // Existing protection: 6 requests per minute per IP.
    const rate = await contactRateLimit.limit(`contact:${ip}`);

    if (!rate.success) {
      return rateLimitResponse(rate.reset);
    }

    // Reject declared oversized contact submissions.
    const declaredLength = Number(
      req.headers.get("content-length") || 0
    );

    if (
      !Number.isFinite(declaredLength) ||
      declaredLength > MAX_BODY_BYTES
    ) {
      return NextResponse.json(
        { ok: false, error: "Submission is too large." },
        { status: 413 }
      );
    }

    // Limit the size of JSON accepted for processing.
    const rawBody = await req.text();

    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Submission is too large." },
        { status: 413 }
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 }
      );
    }

    const fields = body as Record<string, unknown>;

    // Preserve UK routing for older submissions.
    const requestedMarket = fields.market;

    if (
      requestedMarket !== undefined &&
      requestedMarket !== "uk" &&
      requestedMarket !== "usa"
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid enquiry market." },
        { status: 400 }
      );
    }

    const market = requestedMarket === "usa" ? "usa" : "uk";

    const token = cleanText(fields.recaptchaToken, 4000);

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Please complete verification." },
        { status: 400 }
      );
    }

    // Use the public-facing hostname rather than assuming that
    // an internal or rewritten request URL always matches it.
    const requestHost = req.headers.get("host");

    const expectedHostname = (
      requestHost?.split(":")[0] ||
      new URL(req.url).hostname
    ).toLowerCase();

    await verifyRecaptcha(
      token,
      RECAPTCHA_ACTION,
      expectedHostname
    );

    const cleanName = cleanText(fields.name, 120);
    const cleanEmail = cleanText(fields.email, 160);
    const cleanMessage = cleanText(fields.message, 3000);
    const cleanCompany = cleanText(fields.company, 160);
    const cleanPhone = cleanText(fields.phone, 50);

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

    if (
      looksLikeSuspiciousUrlSpam(cleanName) ||
      looksLikeSuspiciousUrlSpam(cleanCompany)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission." },
        { status: 400 }
      );
    }

    // New longer-term protection: 30 validated submission
    // attempts per hour per IP, if shared Redis is available.
    // Invalid reCAPTCHA tokens do not consume this allowance.
    if (contactHourlyLimiter) {
      const hourly = await contactHourlyLimiter.limit(
        `contact:${ip}`
      );

      if (!hourly.success) {
        return rateLimitResponse(hourly.reset);
      }
    }

    // Preserve existing mock-mode behaviour.
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

    // Existing UK and Eastern USA email routing.
    const to = (
      market === "usa"
        ? process.env.CONTACT_TO_USA
        : process.env.CONTACT_TO
    )?.trim();

    const cc =
      (
        market === "usa"
          ? process.env.CONTACT_CC_USA
          : process.env.CONTACT_CC
      )?.trim() || undefined;

    if (!to) {
      return NextResponse.json(
        {
          ok: false,
          error:
            market === "usa"
              ? "CONTACT_TO_USA not set on server."
              : "CONTACT_TO not set on server.",
        },
        { status: 500 }
      );
    }

    const transport = getTransport();

    await transport.sendMail({
      from: fromAddress(),
      to,
      cc,
      replyTo: cleanEmail,
      subject: `New website enquiry — ${cleanName}`,
      text: `New enquiry from the website:

Name: ${cleanName}
Email: ${cleanEmail}
Company: ${cleanCompany || "-"}
Phone: ${cleanPhone || "-"}

Message:
${cleanMessage}
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
  } catch (err: unknown) {
    console.error(
      "Contact submission failed:",
      err instanceof Error ? err.message : "Unknown error"
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message. Please try again or contact us directly by email.",
      },
      { status: 500 }
    );
  }
}
