import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/mockJobs";
import { isJobAdderConnected } from "@/lib/jobsSource";

export const dynamic = "force-dynamic";

function extractJobId(raw: string | undefined) {
  if (!raw) return "";
  const cleaned = decodeURIComponent(raw).trim();
  const match = cleaned.match(/(ILX-\d+)/i);
  return match ? match[1].toUpperCase() : cleaned.toUpperCase();
}

export async function GET(req: Request, ctx: any) {
  // Works whether ctx.params is an object OR a Promise
  const params = await Promise.resolve(ctx?.params);
  const rawId = params?.id as string | undefined;

  console.log("API /api/jobs/[id] params =", params);

  const id = extractJobId(rawId);

  if (!id) {
    return NextResponse.json(
      { ok: false, message: "Invalid ID", source: "mock", id: "" },
      { status: 400 }
    );
  }

  const url = new URL(req.url);
  const connected = await isJobAdderConnected();

  // If JobAdder connected → proxy to JobAdder route
  if (connected) {
    const jaUrl = new URL(
      `/api/jobadder/jobs/${encodeURIComponent(id)}`,
      url.origin
    );
    const res = await fetch(jaUrl.toString(), { cache: "no-store" });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  }

  // Mock fallback
  const job = mockJobs.find((j) => String(j.id).toUpperCase() === id);

  if (!job) {
    return NextResponse.json(
      { ok: false, message: "Role not found", source: "mock", id },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...job, source: "mock" });
}
