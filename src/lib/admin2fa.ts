// src/lib/admin2fa.ts
import * as otplib from "otplib";
import { redis } from "@/lib/redis";

const authenticator = (otplib as any).authenticator ?? (otplib as any).default?.authenticator;

const KEY_ACTIVE = (email: string) => `admin2fa:active:${email.toLowerCase()}`;
const KEY_PENDING = (email: string) => `admin2fa:pending:${email.toLowerCase()}`;

const PENDING_TTL_SECONDS = 60 * 10; // 10 mins

export type TwoFASetup = {
  email: string;
  secretBase32: string;
  otpauthUrl: string;
};

export async function is2FAEnabled(email: string): Promise<boolean> {
  const v = await redis.get<string>(KEY_ACTIVE(email));
  return typeof v === "string" && v.length > 0;
}

export async function begin2FAEnrollment(email: string): Promise<TwoFASetup> {
  const e = email.toLowerCase().trim();

  const secretBase32 = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(e, "Illuminex Admin", secretBase32);

  if (!secretBase32 || !otpauthUrl) {
    throw new Error("Failed to generate 2FA secret.");
  }

  await redis.set(KEY_PENDING(e), secretBase32, { ex: PENDING_TTL_SECONDS });

  return { email: e, secretBase32, otpauthUrl };
}

export async function confirm2FAEnrollment(email: string, code: string): Promise<boolean> {
  const e = email.toLowerCase().trim();
  const pending = await redis.get<string>(KEY_PENDING(e));
  if (!pending) return false;

  // allow small clock drift
  authenticator.options = { window: 1 };

  const ok = authenticator.check(String(code || "").trim(), pending);
  if (!ok) return false;

  await redis.set(KEY_ACTIVE(e), pending);
  await redis.del(KEY_PENDING(e));
  return true;
}

export async function verify2FACode(email: string, code: string): Promise<boolean> {
  const e = email.toLowerCase().trim();
  const active = await redis.get<string>(KEY_ACTIVE(e));
  if (!active) return false;

  authenticator.options = { window: 1 };
  return authenticator.check(String(code || "").trim(), active);
}

export async function disable2FA(email: string) {
  const e = email.toLowerCase().trim();
  await redis.del(KEY_ACTIVE(e));
  await redis.del(KEY_PENDING(e));
}