const MAX_AUTOMATIC_WAIT_MS = 5_000;
const INITIAL_BACKOFF_MS = 1_000;

export type FirefishRateLimitRetryPlan = {
  delayMs: number | null;
  retryAfterSeconds: number | null;
};

function parseRetryAfterMs(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  const seconds = Number(trimmed);

  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds * 1000);
  }

  const retryAt = Date.parse(trimmed);

  if (Number.isNaN(retryAt)) {
    return null;
  }

  return Math.max(0, retryAt - Date.now());
}

export function getFirefishRateLimitRetryPlan(
  response: Response,
  retryCount: number,
  maxRetries: number
): FirefishRateLimitRetryPlan {
  const retryAfterMs = parseRetryAfterMs(
    response.headers.get("retry-after")
  );

  const retryAfterSeconds =
    retryAfterMs === null
      ? null
      : Math.max(1, Math.ceil(retryAfterMs / 1000));

  if (retryCount >= maxRetries) {
    return {
      delayMs: null,
      retryAfterSeconds,
    };
  }

  const exponentialBackoffMs =
    INITIAL_BACKOFF_MS * 2 ** retryCount;

  const delayMs = Math.max(
    retryAfterMs ?? 0,
    exponentialBackoffMs
  );

  if (delayMs > MAX_AUTOMATIC_WAIT_MS) {
    return {
      delayMs: null,
      retryAfterSeconds,
    };
  }

  return {
    delayMs,
    retryAfterSeconds,
  };
}

export async function waitForFirefishRetry(
  delayMs: number
): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
}
