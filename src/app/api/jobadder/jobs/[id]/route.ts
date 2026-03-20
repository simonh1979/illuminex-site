// src/app/api/jobadder/jobs/[id]/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getJobAdderBoardId } from "@/lib/jobadderBoard";
import { jobadderFetch } from "@/lib/jobadderClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 500) {
  return NextResponse.json({ ok: false, message }, { status });
}

// Keep this signature because your current Next.js setup expects params as a Promise
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return jsonError("Missing job id.", 400);
    }

    const boardId = await getJobAdderBoardId();

    const res = await jobadderFetch(`/jobboards/${boardId}/ads/${encodeURIComponent(id)}`, {
      method: "GET",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return jsonError(
        text || `JobAdder request failed (${res.status}).`,
        res.status
      );
    }

    const ad = await res.json().catch(() => null);

    if (!ad) {
      return jsonError("Job not found.", 404);
    }

    return NextResponse.json({
      ok: true,
      source: "jobadder",
      boardId,
      job: ad,
    });
  } catch (err: any) {
    return jsonError(err?.message || "JobAdder job detail error.", 500);
  }
}