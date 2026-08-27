import { randomUUID } from "node:crypto";
import { redis } from "../redis";
import {
  getFirefishRateLimitRetryPlan,
  waitForFirefishRetry,
} from "./rateLimit";

const FIREFISH_SCOPES = [
  "candidatesAPI-read",
  "candidatesAPI-write",
  "contactsAPI-read",
  "advertsAPI-read",
  "jobsAPI-read",
  "jobsAPI-write",
].join(" ");

const TOKEN_RATE_LIMIT_RETRIES = 2;
const TOKEN_TIMEOUT_MS = 15_000;
const TOKEN_SAFETY_WINDOW_MS = 60_000;

const SHARED_TOKEN_LOCK_TTL_MS = 60_000;
const SHARED_TOKEN_WAIT_INTERVAL_MS = 250;
const SHARED_TOKEN_WAIT_ATTEMPTS = 48;

type FirefishTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type CachedToken = {
  accessToken: string;
  expiresAt: number;
};

type SharedTokenLock = {
  key: string;
  value: string;
};

type SharedTokenLockAttempt =
  | {
      status: "acquired";
      lock: SharedTokenLock;
    }
  | {
      status: "held";
    }
  | {
      status: "unavailable";
    };

export class FirefishAuthenticationError extends Error {
  status: number;
  retryAfterSeconds: number | null;

  constructor(
    message: string,
    status: number,
    retryAfterSeconds: number | null = null
  ) {
    super(message);
    this.name = "FirefishAuthenticationError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

let cachedToken: CachedToken | null = null;
let tokenRequest: Promise<string> | null = null;
let rejectedSharedAccessToken: string | null = null;

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getFirefishApiBase(): string {
  return (
    process.env.FIREFISH_API_BASE?.trim() ||
    "https://api.firefishsoftware.com"
  ).replace(/\/+$/, "");
}

function getSharedTokenKey(clientId: string): string {
  return `firefish:auth:v1:${clientId}:access-token`;
}

function getSharedTokenLockKey(clientId: string): string {
  return `firefish:auth:v1:${clientId}:refresh-lock`;
}

function tokenIsStillValid(token: CachedToken): boolean {
  return (
    Date.now() <
    token.expiresAt - TOKEN_SAFETY_WINDOW_MS
  );
}

async function readSharedAccessToken(
  clientId: string
): Promise<CachedToken | null> {
  if (!redis) {
    return null;
  }

  try {
    const token = await redis.get<CachedToken>(
      getSharedTokenKey(clientId)
    );

    if (
      !token ||
      typeof token.accessToken !== "string" ||
      !token.accessToken ||
      !Number.isFinite(token.expiresAt) ||
      !tokenIsStillValid(token)
    ) {
      return null;
    }

    if (
      rejectedSharedAccessToken &&
      token.accessToken === rejectedSharedAccessToken
    ) {
      return null;
    }

    rejectedSharedAccessToken = null;

    return token;
  } catch {
    return null;
  }
}

async function writeSharedAccessToken(
  clientId: string,
  token: CachedToken
): Promise<void> {
  if (!redis) {
    return;
  }

  const ttlSeconds = Math.floor(
    (
      token.expiresAt -
      Date.now() -
      TOKEN_SAFETY_WINDOW_MS
    ) / 1000
  );

  if (ttlSeconds <= 0) {
    return;
  }

  try {
    await redis.set(
      getSharedTokenKey(clientId),
      token,
      {
        ex: ttlSeconds,
      }
    );

    rejectedSharedAccessToken = null;
  } catch {
    // Redis is an optimisation for shared token reuse.
    // A Redis failure must not prevent Firefish authentication.
  }
}

async function tryAcquireSharedTokenLock(
  clientId: string
): Promise<SharedTokenLockAttempt> {
  if (!redis) {
    return {
      status: "unavailable",
    };
  }

  const lock: SharedTokenLock = {
    key: getSharedTokenLockKey(clientId),
    value: randomUUID(),
  };

  try {
    const result = await redis.set(
      lock.key,
      lock.value,
      {
        nx: true,
        px: SHARED_TOKEN_LOCK_TTL_MS,
      }
    );

    if (result === "OK") {
      return {
        status: "acquired",
        lock,
      };
    }

    return {
      status: "held",
    };
  } catch {
    return {
      status: "unavailable",
    };
  }
}

async function releaseSharedTokenLock(
  lock: SharedTokenLock
): Promise<void> {
  if (!redis) {
    return;
  }

  const releaseScript = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    end

    return 0
  `;

  try {
    await redis.eval(
      releaseScript,
      [lock.key],
      [lock.value]
    );
  } catch {
    // The lock has its own TTL, so a failed release
    // cannot leave a permanent lock behind.
  }
}

async function waitForSharedAccessToken(
  clientId: string
): Promise<CachedToken | null> {
  for (
    let attempt = 0;
    attempt < SHARED_TOKEN_WAIT_ATTEMPTS;
    attempt += 1
  ) {
    await new Promise<void>((resolve) => {
      setTimeout(
        resolve,
        SHARED_TOKEN_WAIT_INTERVAL_MS
      );
    });

    const sharedToken =
      await readSharedAccessToken(clientId);

    if (sharedToken) {
      return sharedToken;
    }
  }

  return null;
}

async function fetchTokenResponse(
  url: string,
  body: string
): Promise<Response> {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    TOKEN_TIMEOUT_MS
  );

  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      throw new FirefishAuthenticationError(
        "Firefish authentication request timed out.",
        408
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function requestNewAccessToken(): Promise<string> {
  const clientId =
    getRequiredEnvironmentVariable(
      "FIREFISH_CLIENT_ID"
    );

  const clientSecret =
    getRequiredEnvironmentVariable(
      "FIREFISH_CLIENT_SECRET"
    );

  const body = new URLSearchParams({
    scope: FIREFISH_SCOPES,
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  }).toString();

  const tokenUrl =
    `${getFirefishApiBase()}/authorization/token`;

  let rateLimitRetryCount = 0;

  while (true) {
    const response = await fetchTokenResponse(
      tokenUrl,
      body
    );

    if (response.status === 429) {
      const retryPlan =
        getFirefishRateLimitRetryPlan(
          response,
          rateLimitRetryCount,
          TOKEN_RATE_LIMIT_RETRIES
        );

      if (retryPlan.delayMs === null) {
        throw new FirefishAuthenticationError(
          "Firefish authentication is temporarily rate limited.",
          429,
          retryPlan.retryAfterSeconds
        );
      }

      await waitForFirefishRetry(
        retryPlan.delayMs
      );

      rateLimitRetryCount += 1;
      continue;
    }

    const responseText = await response.text();

    if (!response.ok) {
      throw new FirefishAuthenticationError(
        `Firefish authentication failed with status ${response.status}.`,
        response.status
      );
    }

    let data: FirefishTokenResponse;

    try {
      data =
        JSON.parse(
          responseText
        ) as FirefishTokenResponse;
    } catch {
      throw new FirefishAuthenticationError(
        "Firefish returned an invalid authentication response.",
        response.status
      );
    }

    if (
      !data.access_token ||
      data.token_type?.toLowerCase() !== "bearer" ||
      !Number.isFinite(data.expires_in) ||
      data.expires_in <= 0
    ) {
      throw new FirefishAuthenticationError(
        "Firefish returned an incomplete authentication response.",
        response.status
      );
    }

    cachedToken = {
      accessToken: data.access_token,
      expiresAt:
        Date.now() + data.expires_in * 1000,
    };

    rejectedSharedAccessToken = null;

    return cachedToken.accessToken;
  }
}

async function refreshAccessTokenWithLock(
  clientId: string,
  lock: SharedTokenLock
): Promise<string> {
  try {
    const existingSharedToken =
      await readSharedAccessToken(clientId);

    if (existingSharedToken) {
      cachedToken = existingSharedToken;
      return existingSharedToken.accessToken;
    }

    const accessToken =
      await requestNewAccessToken();

    if (cachedToken) {
      await writeSharedAccessToken(
        clientId,
        cachedToken
      );
    }

    return accessToken;
  } finally {
    await releaseSharedTokenLock(lock);
  }
}

async function getSharedOrNewAccessToken(): Promise<string> {
  const clientId =
    getRequiredEnvironmentVariable(
      "FIREFISH_CLIENT_ID"
    );

  const sharedToken =
    await readSharedAccessToken(clientId);

  if (sharedToken) {
    cachedToken = sharedToken;
    return sharedToken.accessToken;
  }

  if (!redis) {
    return requestNewAccessToken();
  }

  let lockAttempt =
    await tryAcquireSharedTokenLock(clientId);

  if (lockAttempt.status === "unavailable") {
    return requestNewAccessToken();
  }

  if (lockAttempt.status === "acquired") {
    return refreshAccessTokenWithLock(
      clientId,
      lockAttempt.lock
    );
  }

  const tokenFromOtherInstance =
    await waitForSharedAccessToken(clientId);

  if (tokenFromOtherInstance) {
    cachedToken = tokenFromOtherInstance;
    return tokenFromOtherInstance.accessToken;
  }

  lockAttempt =
    await tryAcquireSharedTokenLock(clientId);

  if (lockAttempt.status === "unavailable") {
    return requestNewAccessToken();
  }

  if (lockAttempt.status === "acquired") {
    return refreshAccessTokenWithLock(
      clientId,
      lockAttempt.lock
    );
  }

  const finalSharedToken =
    await readSharedAccessToken(clientId);

  if (finalSharedToken) {
    cachedToken = finalSharedToken;
    return finalSharedToken.accessToken;
  }

  throw new FirefishAuthenticationError(
    "Firefish authentication refresh is temporarily busy.",
    503,
    2
  );
}

export async function getFirefishAccessToken(): Promise<string> {
  if (
    cachedToken &&
    tokenIsStillValid(cachedToken)
  ) {
    return cachedToken.accessToken;
  }

  if (!tokenRequest) {
    tokenRequest =
      getSharedOrNewAccessToken().finally(() => {
        tokenRequest = null;
      });
  }

  return tokenRequest;
}

export function clearFirefishAccessToken(): void {
  const rejectedToken =
    cachedToken?.accessToken ?? null;

  if (rejectedToken) {
    rejectedSharedAccessToken =
      rejectedToken;
  }

  cachedToken = null;
}
