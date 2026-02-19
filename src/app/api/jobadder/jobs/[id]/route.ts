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

/**
 * Accepts:
 * - numeric adId (preferred)
 * - reference string (fallback: scan ads and match reference)
 */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const boardId = await getJobAdderBoardId();
    const id = decodeURIComponent(params.id || "").trim();

    if (!id) {
      return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
    }

    // If numeric, treat as adId
    if (/^\d+$/.test(id)) {
      const res = await jobadderFetch(`/jobboards/${boardId}/ads/${id}`, { method: "GET" });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        return NextResponse.json(
          { ok: false, message: text || `JobAdder error (${res.status})` },
          { status: res.status }
        );
      }

      const ad = await res.json();
      return NextResponse.json({ ok: true, source: "jobadder", job: mapAdToWebsiteJob(ad) });
    }

    // Otherwise treat as "reference": scan board ads and match reference
    const listRes = await jobadderFetch(`/jobboards/${boardId}/ads`, { method: "GET" });
    if (!listRes.ok) {
      const text = await listRes.text().catch(() => "");
      return NextResponse.json(
        { ok: false, message: text || `JobAdder error (${listRes.status})` },
        { status: listRes.status }
      );
    }

    const json = (await listRes.json()) as any;
    const items = Array.isArray(json) ? json : Array.isArray(json?.items) ? json.items : [];

    const found = items.find((x: any) => String(x?.reference ?? "").toUpperCase() === id.toUpperCase());

    if (!found?.adId) {
      return NextResponse.json(
        { ok: false, message: "Not found in JobAdder board ads (by reference)." },
        { status: 404 }
      );
    }

    const res = await jobadderFetch(`/jobboards/${boardId}/ads/${found.adId}`, { method: "GET" });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, message: text || `JobAdder error (${res.status})` },
        { status: res.status }
      );
    }

    const ad = await res.json();
    return NextResponse.json({ ok: true, source: "jobadder", job: mapAdToWebsiteJob(ad) });
  } catch (err: any) {
    const msg = err?.message || "JobAdder not connected";
    const status = msg.includes("not connected") ? 503 : 500;

    return NextResponse.json({ ok: false, message: msg }, { status });
  }
}
