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
  const host = req.headers.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal
    ? "http"
    : (req.headers.get("x-forwarded-proto") ?? "http");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  const ip = getIp(req.headers);
  const ua = req.headers.get("user-agent") || "";
  const base = getBaseUrl(req);

  try {
    console.log("ADMIN LOGIN POST hit");

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

    let enabled2fa = false;

    try {
      enabled2fa = await is2FAEnabled(email);
      console.log("ADMIN LOGIN 2FA enabled:", enabled2fa, "for:", email);
    } catch (err: any) {
      console.error("ADMIN LOGIN 2FA check failed:", err?.message || err);

      await logAdminEvent({
        action: "admin.login.2fa_check_failed",
        actor: email,
        ip,
        meta: {
          ua,
          error: err?.message || "Unknown 2FA check error",
        },
      });

      return NextResponse.redirect(
        new URL("/admin/login?error=2fa", base),
        303
      );
    }

    if (enabled2fa) {
      const preToken = createAdminSessionToken(email);

      const res = NextResponse.redirect(new URL("/admin/2fa", base), 303);
      res.cookies.set(PRE2FA_COOKIE, preToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 5,
      });

      await logAdminEvent({
        action: "admin.login.pre2fa",
        actor: email,
        ip,
        meta: { ua },
      });

      return res;
    }

    const token = createAdminSessionToken(email);

    const res = NextResponse.redirect(new URL("/admin", base), 303);
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    await logAdminEvent({
      action: "admin.login.success",
      actor: email,
      ip,
      meta: { ua, twoFactor: false },
    });

    return res;
  } catch (err: any) {
    console.error("ADMIN LOGIN route failed:", err?.message || err);

    return NextResponse.redirect(
      new URL("/admin/login?error=server", base),
      303
    );
  }
}