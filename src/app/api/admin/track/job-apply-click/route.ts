// src/app/api/admin/track/job-apply-click/route.ts
import { NextResponse } from "next/server";
import { logAdminEvent } from "@/lib/adminAudit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const jobId = String((body as any).jobId || "").trim();
    const title = String((body as any).title || "").trim();
    const slug = String((body as any).slug || "").trim();
    const sector = String((body as any).sector || "").trim();
    const location = String((body as any).location || "").trim();

    if (!jobId || !title || !slug) {
      return NextResponse.json(
        { ok: false, error: "Missing apply tracking fields" },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const ua = req.headers.get("user-agent") || null;

    await logAdminEvent({
      action: "job.apply_click",
      ip,
      ua,
      meta: {
        jobId,
        title,
        slug,
        sector: sector || null,
        location: location || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Failed to log apply click",
      },
      { status: 500 }
    );
  }
}