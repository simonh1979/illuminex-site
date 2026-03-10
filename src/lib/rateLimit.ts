import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

type LimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // ms timestamp
};

function createInMemorySlidingWindow(limit: number, windowMs: number) {
  const store = new Map<string, number[]>();

  return {
    async limit(key: string): Promise<LimitResult> {
      const now = Date.now();
      const windowStart = now - windowMs;

      const hits = store.get(key) ?? [];
      const fresh = hits.filter((t) => t > windowStart);

      if (fresh.length >= limit) {
        const oldest = fresh[0];
        const reset = oldest + windowMs;
        store.set(key, fresh);
        return { success: false, limit, remaining: 0, reset };
      }

      fresh.push(now);
      store.set(key, fresh);

      const remaining = Math.max(0, limit - fresh.length);
      const reset = fresh[0] + windowMs;

      return { success: true, limit, remaining, reset };
    },
  };
}

function createSlidingWindowLimiter(
  prefix: string,
  limit: number,
  duration: `${number} s` | `${number} m` | `${number} h`,
  windowMs: number
) {
  return redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, duration),
        analytics: true,
        prefix,
      })
    : createInMemorySlidingWindow(limit, windowMs);
}

export const contactRateLimit = createSlidingWindowLimiter(
  "ratelimit:contact",
  6,
  "1 m",
  60_000
);

export const candidateRateLimit = createSlidingWindowLimiter(
  "ratelimit:candidate",
  4,
  "1 m",
  60_000
);

export const applyRateLimit = createSlidingWindowLimiter(
  "ratelimit:apply",
  5,
  "1 m",
  60_000
);