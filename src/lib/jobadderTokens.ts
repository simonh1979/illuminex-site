// src/lib/jobadderTokens.ts
import { redis } from "@/lib/redis";

export type JobAdderTokenSet = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  api?: string;          // <-- allow api (used by callback/test/client)
  created_at: number;    // <-- required so jobadderClient can compute expiry
};

const KEY = "jobadder:tokens";

/**
 * Save tokens to Redis.
 * Safe on Vercel builds: if Redis isn't configured, we simply no-op.
 */
export async function saveJobAdderTokens(tokens: JobAdderTokenSet) {
  if (!redis) return;
  await redis.set(KEY, tokens);
}

/**
 * Read tokens from Redis.
 * Safe on Vercel builds: if Redis isn't configured, return null.
 */
export async function getJobAdderTokens(): Promise<JobAdderTokenSet | null> {
  if (!redis) return null;
  const v = await redis.get<JobAdderTokenSet>(KEY);
  return v ?? null;
}