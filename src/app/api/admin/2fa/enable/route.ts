// src/app/api/admin/2fa/enable/route.ts
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { confirm2FAEnrollment } from "@/lib/admin2fa";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 401 });
  }

  const fd = await req.formData();
  const code = String(fd.get("code") ?? "").trim();

  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ ok: false, error: "Invalid code" }, { status: 400 });
  }

  const ok = await confirm2FAEnrollment(session.email, code);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Incorrect code" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}