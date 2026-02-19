import { NextResponse } from "next/server";
import { getJobAdderBoardId } from "@/lib/jobadderBoard";
import { jobadderFetch } from "@/lib/jobadderClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebsiteJob = {
  id: string;
  title: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
  description?: string;
};

/**
 * Minimal mapping:
 * JobAdder Job Board API doesn’t always expose the rich fields we use in the UI (sector/type/level etc).
 * So we map what we reliably have and safely default the rest.
 */
function mapAdToWebsiteJob(ad: any): WebsiteJob {
  const reference = ad?.reference ? String(ad.reference) : null;

  return {
    id: reference ?? String(ad?.adId ?? ad?.id ?? "UNKNOWN"),
    title: String(ad?.title ?? "Untitled role"),
    location: "TBC",
    sector: "TBC",
    jobType: "Permanent",
    experienceLevel: "Mid",
    salary: undefined,
    postedAt: String(ad?.postedDate ?? new Date().toISOString()),
    summary: String(ad?.summary ?? ""),
    description: ad?.description ? String(ad.description) : undefined,
  };
}

export async function GET() {
  try {
    const boardId = await getJobAdderBoardId();

    const res = await jobadderFetch(`/jobboards/${boardId}/ads`, {
      method: "GET",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, message: text || `JobAdder error (${res.status})` },
        { status: res.status }
      );
    }

    const json = (await res.json()) as any;
    const items = Array.isArray(json) ? json : Array.isArray(json?.items) ? json.items : [];

    const jobs = items.map(mapAdToWebsiteJob);

    return NextResponse.json({
      ok: true,
      source: "jobadder",
      boardId,
      count: jobs.length,
      jobs,
    });
  } catch (err: any) {
    const msg = err?.message || "JobAdder not connected";
    const status = msg.includes("not connected") ? 503 : 500;

    return NextResponse.json({ ok: false, message: msg }, { status });
  }
}
