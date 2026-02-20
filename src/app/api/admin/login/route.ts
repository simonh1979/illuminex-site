// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/adminAuth";
import { is2FAEnabled } from "@/lib/admin2fa";
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
  // In dev this will usually be correct
  const host = req.headers.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal ? "http" : (req.headers.get("x-forwarded-proto") ?? "http");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  console.log("ADMIN LOGIN POST hit");

  const ip = getIp(req.headers);
  const ua = req.headers.get("user-agent") || "";
  const base = getBaseUrl(req);

  const fd = await req.formData();
  const email = String(fd.get("email") ?? "").toLowerCase().trim();
  const password = String(fd.get("password") ?? "");

  const ok = await verifyAdminCredentials(email, password);

  if (!ok) {
    await logAdminEvent({
      action: "admin.login.failed",
      actor: email,
      ip,
      meta: { ua },
    });

    console.log("ADMIN LOGIN failed for:", email);
    return NextResponse.redirect(new URL("/admin/login?error=1", base), 303);
  }

  const enabled2fa = await is2FAEnabled(email);

  if (enabled2fa) {
    const preToken = createAdminSessionToken(email);

    const res = NextResponse.redirect(new URL("/admin/2fa", base), 303);
    res.cookies.set(PRE2FA_COOKIE, preToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 5, // 5 mins
    });

    await logAdminEvent({
      action: "admin.login.pre2fa",
      actor: email,
      ip,
      meta: { ua },
    });

    return res;
  }

  // No 2FA → set full session cookie
  const token = createAdminSessionToken(email);

  const res = NextResponse.redirect(new URL("/admin", base), 303);
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  await logAdminEvent({
    action: "admin.login.success",
    actor: email,
    ip,
    meta: { ua },
  });

  return res;
}