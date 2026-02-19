import { saveJobAdderTokens } from "@/lib/jobadderTokens";

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const storedState = req.cookies.get("ja_oauth_state")?.value;

    if (!code || !state || !storedState || state !== storedState) {
      return new NextResponse("Invalid OAuth state or missing code.", {
        status: 400,
      });
    }

    const clientId = process.env.JOBADDER_CLIENT_ID;
    const clientSecret = process.env.JOBADDER_CLIENT_SECRET;
    const redirectUri = process.env.JOBADDER_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return new NextResponse("Missing JobAdder credentials.", {
        status: 500,
      });
    }

    // Exchange code for token
    const tokenRes = await fetch("https://id.jobadder.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      return new NextResponse(
        `Token exchange failed: ${errorText}`,
        { status: 500 }
      );
    }

    const tokenData = await tokenRes.json();

    await saveJobAdderTokens({
  access_token: tokenData.access_token,
  refresh_token: tokenData.refresh_token,
  token_type: tokenData.token_type,
  expires_in: tokenData.expires_in,
  api: tokenData.api,
  created_at: Date.now(),
});

console.log("JobAdder OAuth Success: tokens saved to Redis");

    return NextResponse.json({
      ok: true,
      message: "JobAdder connected successfully.",
      tokenPreview: {
        expires_in: tokenData.expires_in,
        api: tokenData.api,
      },
    });
  } catch (err) {
    console.error("OAuth callback error:", err);
    return new NextResponse("OAuth callback error.", { status: 500 });
  }
}
