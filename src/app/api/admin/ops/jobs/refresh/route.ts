// src/app/api/admin/ops/jobs/refresh/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAdminSession } from "@/lib/adminAuth";
import { logAdminEvent } from "@/lib/adminAudit";

export const runtime = "nodejs";

function getIp(h: Headers) {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST() {
  const h = await headers();
  const ip = getIp(h);
  const ua = h.get("user-agent") || "";

  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Placeholder for future “real” refresh (JobAdder pull / cache bust / etc.)
  // For Milestone 6 we only log the operation safely.
  await logAdminEvent({
    action: "admin.ops.jobs.refresh",
    actor: session.email,
    ip,
    meta: { ua },
  });

  return NextResponse.json({ ok: true });
}