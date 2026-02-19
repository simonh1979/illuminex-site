import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

type LimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // ms timestamp
};

/**
 * In-memory fallback limiter (dev-safe)
 * NOTE: This resets when the server restarts and is per-instance only.
 */
function createInMemorySlidingWindow(limit: number, windowMs: number) {
  const store = new Map<string, number[]>(); // key -> timestamps

  return {
    async limit(key: string): Promise<LimitResult> {
      const now = Date.now();
      const windowStart = now - windowMs;

      const hits = store.get(key) ?? [];
      const fresh = hits.filter((t) => t > windowStart);

      if (fresh.length >= limit) {
        // reset is when the oldest hit drops out of the window
        const oldest = fresh[0];
        const reset = oldest + windowMs;
        store.set(key, fresh);
        return { success: false, limit, remaining: 0, reset };
      }

      fresh.push(now);
      store.set(key, fresh);

      const remaining = Math.max(0, limit - fresh.length);
      // reset is when the oldest hit drops out; if only 1 hit, same logic
      const reset = fresh[0] + windowMs;

      return { success: true, limit, remaining, reset };
    },
  };
}

/**
 * APPLY rate limit
 * - Production: Upstash (distributed + persistent)
 * - Dev without env: In-memory fallback (no crashes)
 */
export const applyRateLimit =
  redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 submits per minute per IP
        analytics: true,
        prefix: "ratelimit:apply",
      })
    : createInMemorySlidingWindow(5, 60_000);
