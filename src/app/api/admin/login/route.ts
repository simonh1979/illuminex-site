import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyAdminCredentials, setAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("ADMIN LOGIN POST hit");

  const fd = await req.formData();
  const email = String(fd.get("email") ?? "").toLowerCase().trim();
  const password = String(fd.get("password") ?? "");

  const ok = await verifyAdminCredentials(email, password);

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal ? "http" : (h.get("x-forwarded-proto") ?? "http");
  const base = `${proto}://${host}`;

  if (!ok) {
    console.log("ADMIN LOGIN failed for:", email);
    return NextResponse.redirect(new URL("/admin/login?error=1", base), 303);
  }

  await setAdminSession(email);
  console.log("ADMIN LOGIN OK for:", email);

  return NextResponse.redirect(new URL("/admin", base), 303);
}