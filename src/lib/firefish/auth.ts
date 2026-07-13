const FIREFISH_SCOPES = [
  "candidatesAPI-read",
  "candidatesAPI-write",
  "contactsAPI-read",
  "advertsAPI-read",
  "jobsAPI-write",
].join(" ");

type FirefishTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type CachedToken = {
  accessToken: string;
  expiresAt: number;
};

let cachedToken: CachedToken | null = null;
let tokenRequest: Promise<string> | null = null;

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

function tokenIsStillValid(token: CachedToken): boolean {
  const safetyWindowMs = 60_000;

  return Date.now() < token.expiresAt - safetyWindowMs;
}

async function requestNewAccessToken(): Promise<string> {
  const clientId = getRequiredEnvironmentVariable("FIREFISH_CLIENT_ID");
  const clientSecret = getRequiredEnvironmentVariable(
    "FIREFISH_CLIENT_SECRET"
  );

  const body = new URLSearchParams({
    scope: FIREFISH_SCOPES,
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(
      `${getFirefishApiBase()}/authorization/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: body.toString(),
        signal: controller.signal,
        cache: "no-store",
      }
    );

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `Firefish authentication failed with status ${response.status}.`
      );
    }

    let data: FirefishTokenResponse;

    try {
      data = JSON.parse(responseText) as FirefishTokenResponse;
    } catch {
      throw new Error("Firefish returned an invalid authentication response.");
    }

    if (
      !data.access_token ||
      data.token_type?.toLowerCase() !== "bearer" ||
      !Number.isFinite(data.expires_in) ||
      data.expires_in <= 0
    ) {
      throw new Error("Firefish returned an incomplete authentication response.");
    }

    cachedToken = {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return cachedToken.accessToken;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Firefish authentication request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getFirefishAccessToken(): Promise<string> {
  if (cachedToken && tokenIsStillValid(cachedToken)) {
    return cachedToken.accessToken;
  }

  if (!tokenRequest) {
    tokenRequest = requestNewAccessToken().finally(() => {
      tokenRequest = null;
    });
  }

  return tokenRequest;
}

export function clearFirefishAccessToken(): void {
  cachedToken = null;
}