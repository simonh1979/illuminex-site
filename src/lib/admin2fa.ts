// src/lib/admin2fa.ts
import speakeasy from "speakeasy";
import { redis } from "@/lib/redis";

const KEY_ACTIVE = (email: string) => `admin2fa:active:${email.toLowerCase()}`;
const KEY_PENDING = (email: string) => `admin2fa:pending:${email.toLowerCase()}`;

const PENDING_TTL_SECONDS = 60 * 10; // 10 mins

export type TwoFASetup = {
  email: string;
  secretBase32: string;
  otpauthUrl: string;
};

/**
 * Returns true if 2FA is enabled for this user (active secret exists).
 */
export async function is2FAEnabled(email: string): Promise<boolean> {
  const e = (email || "").toLowerCase().trim();
  if (!e) return false;

  const v = await redis.get<string>(KEY_ACTIVE(e));
  return typeof v === "string" && v.length > 0;
}

/**
 * Start 2FA enrollment: generate a secret, store as PENDING (not active yet).
 * The user must confirm with a valid 6-digit code to activate.
 */
export async function begin2FAEnrollment(email: string): Promise<TwoFASetup> {
  const e = (email || "").toLowerCase().trim();
  if (!e) throw new Error("Missing email");

  const secret = speakeasy.generateSecret({
    name: `Illuminex Admin (${e})`,
    length: 20,
  });

  const secretBase32 = secret.base32;
  const otpauthUrl = secret.otpauth_url || "";

  if (!secretBase32 || !otpauthUrl) {
    throw new Error("Failed to generate 2FA secret.");
  }

  await redis.set(KEY_PENDING(e), secretBase32, { ex: PENDING_TTL_SECONDS });

  return { email: e, secretBase32, otpauthUrl };
}

/**
 * Confirm enrollment by verifying code against PENDING secret.
 * If valid, move PENDING → ACTIVE.
 */
export async function confirm2FAEnrollment(email: string, code: string): Promise<boolean> {
  const e = (email || "").toLowerCase().trim();
  if (!e) return false;

  const pending = await redis.get<string>(KEY_PENDING(e));
  if (!pending) return false;

  const ok = speakeasy.totp.verify({
    secret: pending,
    encoding: "base32",
    token: String(code || "").trim(),
    window: 1, // allow small clock drift
  });

  if (!ok) return false;

  await redis.set(KEY_ACTIVE(e), pending);
  await redis.del(KEY_PENDING(e));

  return true;
}

/**
 * Verify a 2FA code for an already-enabled user (ACTIVE secret).
 */
export async function verify2FACode(email: string, code: string): Promise<boolean> {
  const e = (email || "").toLowerCase().trim();
  if (!e) return false;

  const active = await redis.get<string>(KEY_ACTIVE(e));
  if (!active) return false;

  return speakeasy.totp.verify({
    secret: active,
    encoding: "base32",
    token: String(code || "").trim(),
    window: 1,
  });
}

/**
 * Disable 2FA (remove ACTIVE + PENDING secrets).
 */
export async function disable2FA(email: string) {
  const e = (email || "").toLowerCase().trim();
  if (!e) return;

  await redis.del(KEY_ACTIVE(e));
  await redis.del(KEY_PENDING(e));
}