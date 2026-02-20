import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { clearAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET() {
  await clearAdminSession();

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal ? "http" : (h.get("x-forwarded-proto") ?? "http");
  const base = `${proto}://${host}`;

  return NextResponse.redirect(new URL("/admin/login", base), 303);
}