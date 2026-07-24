import "server-only";

import {
  clearFirefishAccessToken,
  getFirefishAccessToken,
} from "./auth";

const DEFAULT_TIMEOUT_MS = 20_000;

type FirefishRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  timeoutMs?: number;
};

export class FirefishApiError extends Error {
  status: number;
  endpoint: string;

  constructor(message: string, status: number, endpoint: string) {
    super(message);
    this.name = "FirefishApiError";
    this.status = status;
    this.endpoint = endpoint;
  }
}

function getFirefishApiBase(): string {
  return (
    process.env.FIREFISH_API_BASE?.trim() ||
    "https://api.firefishsoftware.com"
  ).replace(/\/+$/, "");
}

function buildUrl(endpoint: string): string {
  const normalisedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return `${getFirefishApiBase()}${normalisedEndpoint}`;
}

function prepareRequestBody(
  body: unknown,
  headers: Headers
): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  if (
    typeof body === "string" ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function parseResponse<T>(response: Response): Promise<T | null> {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new FirefishApiError(
        "Firefish returned invalid JSON.",
        response.status,
        response.url
      );
    }
  }

  return text as T;
}

function getSafeErrorMessage(status: number): string {
  if (status === 400) {
    return "Firefish rejected the request because some information was invalid.";
  }

  if (status === 401) {
    return "Firefish authentication failed.";
  }

  if (status === 403) {
    return "The Firefish API profile does not have permission for this action.";
  }

  if (status === 404) {
    return "The requested Firefish record could not be found.";
  }

  if (status === 409) {
    return "Firefish reported a duplicate or conflicting record.";
  }

  if (status === 429) {
    return "Firefish is temporarily rate limiting requests.";
  }

  if (status >= 500) {
    return "Firefish is temporarily unavailable.";
  }

  return `Firefish request failed with status ${status}.`;
}

async function executeRequest<T>(
  endpoint: string,
  options: FirefishRequestOptions,
  retryAfterAuthenticationFailure: boolean
): Promise<T | null> {
  const accessToken = await getFirefishAccessToken();
  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("Accept", "application/json");

  const requestBody = prepareRequestBody(options.body, headers);

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  );

  const url = buildUrl(endpoint);

  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers,
      body: requestBody,
      signal: controller.signal,
      cache: "no-store",
    });

    if (response.status === 401 && retryAfterAuthenticationFailure) {
      clearFirefishAccessToken();

      return executeRequest<T>(endpoint, options, false);
    }

    if (!response.ok) {
      throw new FirefishApiError(
        getSafeErrorMessage(response.status),
        response.status,
        endpoint
      );
    }

    return parseResponse<T>(response);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new FirefishApiError(
        "The Firefish request timed out.",
        408,
        endpoint
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function firefishRequest<T>(
  endpoint: string,
  options: FirefishRequestOptions = {}
): Promise<T | null> {
  return executeRequest<T>(endpoint, options, true);
}