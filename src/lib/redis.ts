// src/lib/redis.ts
import { Redis } from "@upstash/redis";

// IMPORTANT:
// Do not throw if env vars are missing.
// Vercel builds will import this file during compilation.
// If Redis is not configured yet, we export `null` and the app uses fallbacks.

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis: Redis | null =
  url && token
    ? new Redis({
        url,
        token,
      })
    : null;