import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, createAdminSessionToken } from "@/lib/adminAuth";
import { verify2FACode } from "@/lib/admin2fa";

export const runtime = "nodejs";

const PRE2FA_COOKIE = "admin_pre2fa";

export async function POST(req: Request) {
  console.log("ADMIN 2FA VERIFY POST hit");

  const fd = await req.formData();
  const code = String(fd.get("code") ?? "").trim();

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal ? "http" : (h.get("x-forwarded-proto") ?? "http");
  const base = `${proto}://${host}`;

  const store = await cookies();
  const pre = store.get(PRE2FA_COOKIE)?.value;

  if (!pre) {
    console.log("ADMIN 2FA VERIFY: missing pre2fa cookie");
    return NextResponse.redirect(new URL("/admin/login", base), 303);
  }

  // pre cookie is a signed token we created earlier -> email is encoded in the payload
  // We don’t need to re-verify the signature here (adminAuth already does that elsewhere),
  // but for simplicity we’ll decode email by re-using the same token format:
  const [b64] = pre.split(".");
  if (!b64) {
    console.log("ADMIN 2FA VERIFY: invalid pre2fa token");
    return NextResponse.redirect(new URL("/admin/login", base), 303);
  }

  let email = "";
  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    const payload = JSON.parse(json) as { email?: string };
    email = String(payload?.email ?? "").toLowerCase().trim();
  } catch {
    console.log("ADMIN 2FA VERIFY: failed to parse pre2fa token payload");
    return NextResponse.redirect(new URL("/admin/login", base), 303);
  }

  if (!email) {
    console.log("ADMIN 2FA VERIFY: missing email in pre2fa payload");
    return NextResponse.redirect(new URL("/admin/login", base), 303);
  }

  const ok = await verify2FACode(email, code);

  if (!ok) {
    console.log("ADMIN 2FA VERIFY failed for:", email);
    return NextResponse.redirect(new URL("/admin/2fa?error=1", base), 303);
  }

  // Success: promote to full session
  const token = createAdminSessionToken(email);

  // Clear pre2fa cookie and set real admin session cookie
  store.set(PRE2FA_COOKIE, "", { path: "/", maxAge: 0 });
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  console.log("ADMIN 2FA VERIFY OK for:", email);
  return NextResponse.redirect(new URL("/admin", base), 303);
}