import { NextResponse } from "next/server";
import { getJobById } from "@/lib/jobsSource";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const jobId = (id ?? "").trim().toUpperCase();
  if (!jobId) {
    return NextResponse.json(
      { ok: false, message: "Invalid ID", source: "mock", id: jobId },
      { status: 400 }
    );
  }

  const { job, source } = await getJobById(jobId);

  if (!job) {
    return NextResponse.json(
      { ok: false, message: "Role not found", source, id: jobId },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...job, source });
}
