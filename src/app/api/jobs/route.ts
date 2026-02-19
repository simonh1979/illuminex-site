import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/mockJobs";
import { isJobAdderConnected } from "@/lib/jobsSource";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const connected = await isJobAdderConnected();

  // ============================================================
  // If JobAdder connected → proxy to JobAdder jobs endpoint
  // ============================================================
  if (connected) {
    const jaUrl = new URL("/api/jobadder/jobs", url.origin);
    jaUrl.search = url.search; // preserve filters

    const res = await fetch(jaUrl.toString(), { cache: "no-store" });
    const data = await res.json().catch(() => null);

    return NextResponse.json(data, { status: res.status });
  }

  // ============================================================
  // Otherwise → use existing mock logic (unchanged)
  // ============================================================

  const { searchParams } = url;

  const keyword = (searchParams.get("keyword") ?? "").toLowerCase();
  const sector = searchParams.get("sector") ?? "";
  const location = searchParams.get("location") ?? "";
  const jobType = searchParams.get("jobType") ?? "";
  const experienceLevel = searchParams.get("experienceLevel") ?? "";

  let jobs = [...mockJobs];

  if (keyword) {
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(keyword) ||
        j.summary.toLowerCase().includes(keyword) ||
        j.sector.toLowerCase().includes(keyword) ||
        j.location.toLowerCase().includes(keyword)
    );
  }

  if (sector) jobs = jobs.filter((j) => j.sector === sector);
  if (location)
    jobs = jobs.filter((j) =>
      j.location.toLowerCase().includes(location.toLowerCase())
    );
  if (jobType) jobs = jobs.filter((j) => j.jobType === jobType);
  if (experienceLevel)
    jobs = jobs.filter((j) => j.experienceLevel === experienceLevel);

  const facets = {
    sectors: Array.from(new Set(mockJobs.map((j) => j.sector))).sort(),
    locations: Array.from(new Set(mockJobs.map((j) => j.location))).sort(),
  };

  return NextResponse.json({
    total: jobs.length,
    jobs,
    facets,
    source: "mock",
  });
}
