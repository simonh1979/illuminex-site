// src/app/api/security-test/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { applyRateLimit } from "@/lib/rateLimit";
import { generateCSRFToken, verifyCSRFToken } from "@/lib/csrf";

const BodySchema = z.object({
  message: z.string().min(1).max(200),
});

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // first IP in the list is the client in most setups
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  // fallback (local dev or unknown)
  return "local";
}

export async function GET() {
  const token = generateCSRFToken();
  return NextResponse.json({ csrfToken: token });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  // Rate limit (Upstash limiter uses .limit(); dev fallback also exposes .limit())
  const result = await applyRateLimit.limit(ip);

  if (!result.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // CSRF check (client must send token in header)
  const csrf = req.headers.get("x-csrf-token") || "";
  if (!verifyCSRFToken(csrf)) {
    return NextResponse.json({ error: "CSRF failed" }, { status: 403 });
  }

  // Validation check
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, echo: parsed.data.message });
}