import { redis } from "@/lib/redis";
import { jobadderFetch } from "@/lib/jobadderClient";

/* ------------------------------------------------------------------
   TYPES
------------------------------------------------------------------- */

export type SiteJob = {
  id: string;
  title: string;
  company?: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
  description?: string;
};

/* ------------------------------------------------------------------
   BOARD ID RESOLUTION
------------------------------------------------------------------- */

const CACHE_KEY = "jobadder:boardId";
const CACHE_TTL_SECONDS = 60 * 60 * 6; // 6 hours

export async function getJobAdderBoardId(): Promise<number> {
  const env = process.env.JOBADDER_BOARD_ID;

  if (env && /^\d+$/.test(env)) {
    return Number(env);
  }

  const cached = await redis.get<number>(CACHE_KEY);
  if (typeof cached === "number") return cached;

  const res = await jobadderFetch(`/jobboards`, { method: "GET" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch job boards (${res.status})`);
  }

  const json = await res.json();

  const items = Array.isArray(json)
    ? json
    : Array.isArray(json?.items)
      ? json.items
      : [];

  const first = items?.[0];
  const boardId = first?.boardId ?? first?.id;

  if (!boardId || !Number.isFinite(Number(boardId))) {
    throw new Error("No job boards found.");
  }

  const resolved = Number(boardId);

  await redis.set(CACHE_KEY, resolved, { ex: CACHE_TTL_SECONDS });

  return resolved;
}

/* ------------------------------------------------------------------
   MAPPING
------------------------------------------------------------------- */

function mapAdToSiteJob(ad: any): SiteJob {
  const id = String(ad?.jobAdId ?? ad?.id ?? "");

  const fields: Array<{ fieldName?: string; value?: any }> =
    Array.isArray(ad?.portal?.fields) ? ad.portal.fields : [];

  const getField = (name: string) =>
    fields.find(
      (f) => (f.fieldName || "").toLowerCase() === name.toLowerCase()
    )?.value ?? "";

  const jobTypeRaw =
    String(getField("jobType")) ||
    String(getField("workType")) ||
    "Permanent";

  const expRaw =
    String(getField("experienceLevel")) ||
    String(getField("level")) ||
    "Mid";

  return {
    id,
    title: String(ad?.title ?? ""),
    company: String(getField("company")) || undefined,
    location:
      String(getField("location")) ||
      String(getField("city")) ||
      "—",
    sector:
      String(getField("sector")) ||
      String(getField("classification")) ||
      "—",
    jobType: jobTypeRaw.toLowerCase().includes("contract")
      ? "Contract"
      : "Permanent",
    experienceLevel: expRaw.toLowerCase().includes("exec")
      ? "Executive"
      : expRaw.toLowerCase().includes("senior")
        ? "Senior"
        : "Mid",
    salary: String(getField("salary")) || undefined,
    postedAt:
      String(ad?.postedAt ?? ad?.datePosted ?? new Date().toISOString()),
    summary: String(ad?.summary ?? ad?.teaser ?? ""),
    description: String(ad?.description ?? ad?.body ?? ""),
  };
}

/* ------------------------------------------------------------------
   LIST JOBS
------------------------------------------------------------------- */

export async function jobAdderListJobs(): Promise<{
  jobs: SiteJob[];
  total: number;
}> {
  const boardId = await getJobAdderBoardId();

  const res = await jobadderFetch(
    `/jobboards/${boardId}/ads`,
    { method: "GET" }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch ads (${res.status})`);
  }

  const json = await res.json();

  const items = Array.isArray(json?.items) ? json.items : [];

  return {
    jobs: items.map(mapAdToSiteJob),
    total: Number(json?.total ?? items.length ?? 0),
  };
}

/* ------------------------------------------------------------------
   GET SINGLE JOB
------------------------------------------------------------------- */

export async function jobAdderGetJob(adId: string): Promise<SiteJob | null> {
  const boardId = await getJobAdderBoardId();

  const res = await jobadderFetch(
    `/jobboards/${boardId}/ads/${encodeURIComponent(adId)}`,
    { method: "GET" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return mapAdToSiteJob(json);
}
