import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // Basic hardening headers (CSP is set in next.config.ts)
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Helpful request ID
  res.headers.set("X-Request-Id", crypto.randomUUID());

  /**
   * IMPORTANT:
   * Never force HTTPS on localhost / private network during development.
   * Only enforce HTTPS in production when behind a real proxy (e.g., Vercel).
   */
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers.get("x-forwarded-proto");
    if (proto && proto !== "https") {
      const url = req.nextUrl.clone();
      url.protocol = "https:";
      return NextResponse.redirect(url, 308);
    }
  }

  return res;
}

// Apply to all routes except Next static/image assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
