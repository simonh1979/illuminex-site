import { redis } from "@/lib/redis";

export type JobAdderTokenSet = {
  access_token: string;
  refresh_token?: string;
  token_type: string; // "Bearer"
  expires_in: number; // seconds
  api: string; // e.g. https://api.jobadder.com/v2
  created_at: number; // unix ms timestamp
};

const KEY = "jobadder:tokens";

export async function saveJobAdderTokens(tokens: JobAdderTokenSet) {
  await redis.set(KEY, tokens);
}

export async function getJobAdderTokens(): Promise<JobAdderTokenSet | null> {
  const t = await redis.get<JobAdderTokenSet>(KEY);
  return t ?? null;
}

export async function clearJobAdderTokens() {
  await redis.del(KEY);
}
