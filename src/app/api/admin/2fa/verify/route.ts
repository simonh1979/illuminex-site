// src/app/api/admin/2fa/verify/route.ts
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/adminAuth";
import { verify2FACode } from "@/lib/admin2fa";
import { logAdminEvent } from "@/lib/adminAudit";

export const runtime = "nodejs";

const PRE2FA_COOKIE = "admin_pre2fa";

function getIp(h: Headers) {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

function getBaseUrl(req: Request) {
  const host = req.headers.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal
    ? "http"
    : (req.headers.get("x-forwarded-proto") ?? "http");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  console.log("ADMIN 2FA VERIFY POST hit");

  const base = getBaseUrl(req);
  const ip = getIp(req.headers);
  const ua = req.headers.get("user-agent") || "";

  // If already fully logged in, just go admin (prevents weird double-post issues)
  const already = req.headers.get("cookie")?.includes(`${ADMIN_COOKIE_NAME}=`);

  if (already) {
    return NextResponse.redirect(new URL("/admin", base), 303);
  }

  // Read pre-2FA cookie from request
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|; )${PRE2FA_COOKIE}=([^;]+)`)
  );
  const preToken = match ? decodeURIComponent(match[1]) : "";

  if (!preToken) {
    return NextResponse.redirect(new URL("/admin/login", base), 303);
  }

  const payload = verifyAdminSessionToken(preToken);
  if (!payload?.email) {
    return NextResponse.redirect(new URL("/admin/login", base), 303);
  }

  const fd = await req.formData();
  const code = String(fd.get("code") ?? "").trim();

  const ok = await verify2FACode(payload.email, code);

  if (!ok) {
    await logAdminEvent({
      action: "admin.2fa.failed",
      actor: payload.email,
      ip,
      meta: { ua },
    });

    return NextResponse.redirect(new URL("/admin/2fa?error=1", base), 303);
  }

  // Success -> create full session cookie + clear pre2fa cookie
  const token = createAdminSessionToken(payload.email);

  const res = NextResponse.redirect(new URL("/admin", base), 303);

  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  res.cookies.set(PRE2FA_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  await logAdminEvent({
    action: "admin.2fa.success",
    actor: payload.email,
    ip,
    meta: { ua },
  });

  console.log("ADMIN 2FA VERIFY OK for:", payload.email);
  return res;
}