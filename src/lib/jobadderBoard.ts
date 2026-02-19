import { redis } from "@/lib/redis";
import { jobadderFetch } from "@/lib/jobadderClient";

/**
 * Board ID resolution:
 * - Prefer env JOBADDER_BOARD_ID (when you know it)
 * - Otherwise fetch /jobboards and cache the first boardId in Redis
 */
const CACHE_KEY = "jobadder:boardId";
const CACHE_TTL_SECONDS = 60 * 60 * 6; // 6 hours

export async function getJobAdderBoardId(): Promise<number> {
  const env = process.env.JOBADDER_BOARD_ID;
  if (env && /^\d+$/.test(env)) return Number(env);

  // Try cache
  const cached = await redis.get<number>(CACHE_KEY);
  if (typeof cached === "number") return cached;

  // Fetch boards
  const res = await jobadderFetch(`/jobboards`, { method: "GET" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch job boards (${res.status})`);
  }

  const json = (await res.json()) as any;

  // The API commonly returns { items: [...] } or an array depending on endpoint style
  const items = Array.isArray(json) ? json : Array.isArray(json?.items) ? json.items : [];

  const first = items?.[0];
  const boardId = first?.boardId ?? first?.id;

  if (!boardId || !Number.isFinite(Number(boardId))) {
    throw new Error("No job boards found (cannot resolve boardId).");
  }

  const resolved = Number(boardId);

  // Cache it so we don’t fetch every time
  await redis.set(CACHE_KEY, resolved, { ex: CACHE_TTL_SECONDS });

  return resolved;
}
