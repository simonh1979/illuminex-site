import { NextResponse } from "next/server";
import { z } from "zod";
import { applyRateLimit } from "@/lib/rateLimit";
import { generateCSRFToken, verifyCSRFToken } from "@/lib/csrf";

const BodySchema = z.object({
  message: z.string().min(1).max(200),
});

export async function GET() {
  const token = generateCSRFToken();
  return NextResponse.json({ csrfToken: token });
}

export async function POST(req: Request) {
  // IP (basic)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

  // Rate limit (Upstash Ratelimit uses .limit())
  const result = await applyRateLimit.limit(ip);

  if (!result.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // CSRF check
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