// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import {
  verifyAdminCredentials,
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/adminAuth";
import { is2FAEnabled } from "@/lib/admin2fa";

export const runtime = "nodejs";

const PRE2FA_COOKIE = "admin_pre2fa";

export async function POST(req: Request) {
  console.log("ADMIN LOGIN POST hit");

  const fd = await req.formData();
  const email = String(fd.get("email") ?? "").toLowerCase().trim();
  const password = String(fd.get("password") ?? "");

  const ok = await verifyAdminCredentials(email, password);

  if (!ok) {
    console.log("ADMIN LOGIN failed for:", email);
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal ? "http" : (h.get("x-forwarded-proto") ?? "http");
  const base = `${proto}://${host}`;

  // If 2FA is enabled for this user, do NOT set full session yet.
  const enabled2fa = await is2FAEnabled(email);

  const store = await cookies();

  if (enabled2fa) {
    const preToken = createAdminSessionToken(email);
    store.set(PRE2FA_COOKIE, preToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 5, // 5 mins
    });

    return NextResponse.redirect(new URL("/admin/2fa", base), 303);
  }

  // No 2FA enabled → normal session
  const token = createAdminSessionToken(email);
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.redirect(new URL("/admin", base), 303);
}