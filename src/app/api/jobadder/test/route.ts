import { NextResponse } from "next/server";
import { getJobAdderTokens } from "@/lib/jobadderTokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tokens = await getJobAdderTokens();

    // Not connected yet (expected until you have real credentials + complete OAuth)
    if (!tokens?.access_token) {
      return NextResponse.json(
        { ok: false, message: "JobAdder not connected" },
        { status: 200 }
      );
    }

    // Connected (we have tokens saved)
    return NextResponse.json(
      {
        ok: true,
        message: "JobAdder connected",
        tokenPreview: tokens.access_token.slice(0, 8) + "…",
        apiBase: process.env.JOBADDER_API_BASE ?? null,
        expiresIn: tokens.expires_in,
        createdAt: tokens.created_at,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // If something genuinely breaks, show a readable message (still return 200 in dev)
    return NextResponse.json(
      { ok: false, message: "Test route error", detail: String(err?.message || err) },
      { status: 200 }
    );
  }
}
