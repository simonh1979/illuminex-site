import { getJobAdderTokens, saveJobAdderTokens } from "./jobadderTokens";

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  api: string;
};

async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const clientId = process.env.JOBADDER_CLIENT_ID;
  const clientSecret = process.env.JOBADDER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing JobAdder client credentials");
  }

  const res = await fetch("https://id.jobadder.com/connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to refresh JobAdder access token");
  }

  return res.json();
}

export async function getValidAccessToken(): Promise<{
  token: string;
  apiBase: string;
}> {
  const tokens = await getJobAdderTokens();

  if (!tokens) {
    throw new Error("JobAdder not connected");
  }

  const now = Date.now();
  const expiresAt = tokens.created_at + tokens.expires_in * 1000;

  // If token is still valid (with 30s buffer)
  if (now < expiresAt - 30_000) {
    return { token: tokens.access_token, apiBase: tokens.api };
  }

  // Otherwise refresh it
  if (!tokens.refresh_token) {
    throw new Error("No refresh token available");
  }

  const refreshed = await refreshAccessToken(tokens.refresh_token);

  const updated = {
    ...refreshed,
    created_at: Date.now(),
  };

  await saveJobAdderTokens(updated);

  return { token: updated.access_token, apiBase: updated.api };
}

/**
 * Fetch helper for JobAdder API.
 * Returns a native Response so callers can decide json/text handling.
 */
export async function jobadderFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const { token, apiBase } = await getValidAccessToken();

  const url = path.startsWith("http") ? path : `${apiBase}${path}`;

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/json");

  // Only set JSON content-type if body exists AND is not FormData
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  if (!isFormData && options.body) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });
}
