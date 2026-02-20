import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export type AdminUser = {
  email: string;
  passwordHash: string;
};

export type SessionPayload = {
  email: string;
  issuedAt: number;
};

export const ADMIN_COOKIE_NAME = "admin_session";

/**
 * ADMIN_USERS expected in .env.local:
 * ADMIN_USERS='[{"email":"director@illuminex.co.uk","passwordHash":"$2b$10$..."}]'
 */
function getUsers(): AdminUser[] {
  let raw = process.env.ADMIN_USERS;
  if (!raw) return [];

  raw = raw.trim();

  // allow wrapping quotes
  if (
    (raw.startsWith("'") && raw.endsWith("'")) ||
    (raw.startsWith('"') && raw.endsWith('"'))
  ) {
    raw = raw.slice(1, -1).trim();
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (u) =>
          u &&
          typeof u.email === "string" &&
          typeof u.passwordHash === "string"
      )
      .map((u) => ({
        email: u.email.toLowerCase().trim(),
        passwordHash: u.passwordHash.trim(),
      }));
  } catch {
    return [];
  }
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("hex");
}

export function createAdminSessionToken(email: string): string {
  const payload: SessionPayload = {
    email: email.toLowerCase().trim(),
    issuedAt: Date.now(),
  };

  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, "utf8").toString("base64url");
  const sig = sign(b64);
  return `${b64}.${sig}`;
}

export function verifyAdminSessionToken(token: string): SessionPayload | null {
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;

  const expected = sign(b64);
  if (sig.length !== expected.length) return null;

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }

  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    const payload = JSON.parse(json) as SessionPayload;
    if (!payload?.email || typeof payload.issuedAt !== "number") return null;
    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const users = getUsers();
  const e = (email || "").toLowerCase().trim();
  const u = users.find((x) => x.email === e);
  if (!u) return false;

  // Debug (safe): proves server is using the hash you think it is
  console.log("[adminAuth] Using hash prefix:", u.passwordHash.slice(0, 7));

  return bcrypt.compare(password, u.passwordHash);
}

/**
 * Next 16 cookies() is async in many contexts.
 */
export async function getAdminSession(): Promise<{ email: string } | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyAdminSessionToken(token);
  if (!payload) return null;

  return { email: payload.email };
}

export async function setAdminSession(email: string) {
  const store = await cookies();
  const token = createAdminSessionToken(email);

  const isProd = process.env.NODE_ENV === "production";
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  store.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 0,
  });
}