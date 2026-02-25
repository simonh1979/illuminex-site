// src/lib/redis.ts
import { Redis } from "@upstash/redis";

/**
 * IMPORTANT:
 * Do not throw if env vars are missing.
 * Vercel will import this during build/compile.
 * If Upstash is not configured yet, export `null` so the app can fall back safely.
 */
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis: Redis | null =
  url && token
    ? new Redis({
        url,
        token,
      })
    : null;