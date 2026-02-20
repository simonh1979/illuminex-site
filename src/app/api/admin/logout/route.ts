// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/adminAuth";
import { logAdminEvent } from "@/lib/adminAudit";

export const runtime = "nodejs";

function getIp(h: Headers) {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function GET(req: Request) {
  const h = await headers();
  const ip = getIp(h);
  const ua = h.get("user-agent") || "";

  const session = await getAdminSession();

  const host = h.get("host") ?? "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = isLocal ? "http" : (h.get("x-forwarded-proto") ?? "http");
  const base = `${proto}://${host}`;

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  store.set("admin_pre2fa", "", { path: "/", maxAge: 0 });

  await logAdminEvent({
    action: "admin.logout",
    actorEmail: session?.email,
    ip,
    ua,
  });

  return NextResponse.redirect(new URL("/admin/login", base), 303);
}