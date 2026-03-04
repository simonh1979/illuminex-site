import { NextResponse } from "next/server";
import { getJobsList } from "@/lib/jobsSource";

export const revalidate = 120;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const keyword = (searchParams.get("keyword") ?? "").toLowerCase();
  const sector = searchParams.get("sector") ?? "";
  const location = searchParams.get("location") ?? "";
  const jobType = searchParams.get("jobType") ?? "";
  const experienceLevel = searchParams.get("experienceLevel") ?? "";

  const { jobs: rawJobs, total: rawTotal, source } = await getJobsList();

  let jobs = [...rawJobs];

  if (keyword) {
  jobs = jobs.filter((j) =>
    [j.title, j.summary, j.sector, j.location]
      .join(" ")
      .toLowerCase()
      .includes(keyword)
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
    sectors: Array.from(new Set(rawJobs.map((j) => j.sector))).sort(),
    locations: Array.from(new Set(rawJobs.map((j) => j.location))).sort(),
  };

  return NextResponse.json({
    total: jobs.length,
    jobs,
    facets,
    source,
  });
}