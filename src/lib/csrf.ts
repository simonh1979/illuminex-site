import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export function generateCSRFToken(): string {
  return randomBytes(32).toString("hex");
}

export async function setCSRFCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("csrf-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

export async function verifyCSRFToken(tokenFromRequest: string): Promise<boolean> {
  const cookieStore = await cookies();
  const stored = cookieStore.get("csrf-token")?.value;

  if (!stored) return false;
  return stored === tokenFromRequest;
}
