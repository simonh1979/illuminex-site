// src/app/api/admin/2fa/setup/route.ts
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { begin2FAEnrollment } from "@/lib/admin2fa";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 401 });
  }

  const setup = await begin2FAEnrollment(session.email);
  return NextResponse.json({ ok: true, setup });
}