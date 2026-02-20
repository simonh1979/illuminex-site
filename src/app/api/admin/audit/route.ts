// src/app/api/admin/audit/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAdminSession } from "@/lib/adminAuth";
import { getAuditEvents, logAdminEvent } from "@/lib/adminAudit";

export const runtime = "nodejs";

function getIp(h: Headers) {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const h = await headers();
  const ip = getIp(h);
  const ua = h.get("user-agent") || "";

  // ✅ Deterministic write-test: /api/admin/audit?seed=1
  const url = new URL(req.url);
  if (url.searchParams.get("seed") === "1") {
    await logAdminEvent({
      action: "admin.audit.seed",
      actor: session.email,
      ip,
      meta: { ua },
    });
  }

  const events = await getAuditEvents(50);
  return NextResponse.json({ ok: true, total: events.length, events });
}