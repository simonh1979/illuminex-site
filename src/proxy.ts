// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";

function isPublicAdminPage(pathname: string) {
  return (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname === "/admin/2fa" ||
    pathname.startsWith("/admin/2fa/")
  );
}

function isProtectedAdminApi(pathname: string) {
  return (
    pathname === "/api/admin/dashboard" ||
    pathname.startsWith("/api/admin/export/") ||
    pathname.startsWith("/api/admin/ops/")
  );
}

function applySecurityHeaders(res: NextResponse) {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline' https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https:",
    "connect-src 'self' https://www.google.com https://www.gstatic.com https:",
    "frame-src 'self' https://www.google.com https://recaptcha.google.com https:",
    "form-action 'self'",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);

  return res;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasAdminCookie = Boolean(req.cookies.get(ADMIN_COOKIE_NAME)?.value);

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    if (isPublicAdminPage(pathname)) {
      return applySecurityHeaders(NextResponse.next());
    }

    if (!hasAdminCookie) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }

    return applySecurityHeaders(NextResponse.next());
  }

  // Protect sensitive admin APIs
  if (isProtectedAdminApi(pathname)) {
    if (!hasAdminCookie) {
      return applySecurityHeaders(
        NextResponse.json(
          { ok: false, error: "Unauthorized" },
          { status: 401 }
        )
      );
    }

    return applySecurityHeaders(NextResponse.next());
  }

  // Helpful request ID
  const res = NextResponse.next();
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
      return applySecurityHeaders(NextResponse.redirect(url, 308));
    }
  }

  return applySecurityHeaders(res);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};