// C:\Users\simon\Documents\illuminex-site\src\app\api\jobadder\jobs\[id]\route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type JobAdderJob = Record<string, unknown>;

function jsonError(message: string, status = 500) {
  return NextResponse.json({ ok: false, message }, { status });
}

// IMPORTANT:
// Next.js (current types) expects `context.params` to be a Promise in Route Handlers.
// This signature prevents the Vercel TypeScript build failure you’re seeing.
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return jsonError("Missing job id", 400);
    }

    const token = process.env.JOBADDER_API_KEY || process.env.JOBADDER_TOKEN;
    const baseUrl =
      process.env.JOBADDER_BASE_URL ||
      "https://api.jobadder.com/v2"; // safe default

    if (!token) {
      return jsonError("JobAdder API token is not configured", 500);
    }

    // Fetch the job from JobAdder
    const res = await fetch(`${baseUrl}/jobs/${encodeURIComponent(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return jsonError(
        `JobAdder request failed (${res.status}) ${text ? `- ${text}` : ""}`,
        res.status
      );
    }

    const rawJob = (await res.json()) as JobAdderJob;

    // ✅ If you already have a WebsiteJob mapping, keep it here.
    // For now we return the raw job payload so the route works and deploys cleanly.
    const job = rawJob;

    return NextResponse.json({
      ok: true,
      source: "jobadder",
      job,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}