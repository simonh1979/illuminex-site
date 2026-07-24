// src/app/api/admin/track/sector-click/route.ts
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

    const sector = String((body as any).sector || "").trim();
    const href = String((body as any).href || "").trim();

    if (!sector || !href) {
      return NextResponse.json(
        { ok: false, error: "Missing sector or href" },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const ua = req.headers.get("user-agent") || null;

    await logAdminEvent({
      action: "sector.click",
      ip,
      ua,
      meta: {
        sector,
        href,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Failed to log sector click",
      },
      { status: 500 }
    );
  }
}