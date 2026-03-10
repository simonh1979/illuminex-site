// middleware.ts
import { NextRequest, NextResponse } from "next/server";

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
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasAdminCookie = Boolean(req.cookies.get(ADMIN_COOKIE_NAME)?.value);

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

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};