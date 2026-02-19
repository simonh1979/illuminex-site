import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function GET() {
  const clientId = process.env.JOBADDER_CLIENT_ID;
  const redirectUri = process.env.JOBADDER_REDIRECT_URI;
  const scope = process.env.JOBADDER_SCOPES;

  if (!clientId || !redirectUri || !scope) {
    return new NextResponse(
      "Missing JOBADDER_CLIENT_ID / JOBADDER_REDIRECT_URI / JOBADDER_SCOPES in .env.local",
      { status: 500 }
    );
  }

  // state protects against forgery. We'll store it in a short-lived cookie.
  const state = crypto.randomBytes(16).toString("hex");

  const url = new URL("https://id.jobadder.com/connect/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);

  const res = NextResponse.redirect(url.toString());
  res.cookies.set("ja_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // dev
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return res;
}
