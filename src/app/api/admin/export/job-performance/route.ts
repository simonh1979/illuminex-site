import { NextResponse } from "next/server";
import { getAuditEvents } from "@/lib/adminAudit";

export const dynamic = "force-dynamic";

type JobMetric = {
  jobId: string;
  title: string;
  views: number;
  applyClicks: number;
  submitted: number;
};

export async function GET() {
  try {
    const auditRecent = await getAuditEvents(1000);

    const jobCounts: Record<string, JobMetric> = {};

    for (const e of auditRecent) {
      const jobId = String(e.meta?.jobId || "").trim();
      const title = String(e.meta?.title || "").trim();

      if (!jobId || !title) continue;

      const key = `${jobId}__${title}`;

      if (!jobCounts[key]) {
        jobCounts[key] = {
          jobId,
          title,
          views: 0,
          applyClicks: 0,
          submitted: 0,
        };
      }

      if (e.action === "job.view") jobCounts[key].views += 1;
      if (e.action === "job.apply_click") jobCounts[key].applyClicks += 1;
      if (e.action === "application.submit") jobCounts[key].submitted += 1;
    }

    const rows = Object.values(jobCounts).map((job) => {
      const applyRate =
        job.views > 0 ? Math.round((job.applyClicks / job.views) * 100) : 0;

      const submitRate =
        job.views > 0 ? Math.round((job.submitted / job.views) * 100) : 0;

      return {
        ...job,
        applyRate,
        submitRate,
      };
    });

    const header = [
      "Job ID",
      "Title",
      "Views",
      "Apply Clicks",
      "Submitted Applications",
      "Apply Rate %",
      "Submit Rate %",
    ];

    const csvRows = rows.map((r) => [
      r.jobId,
      r.title,
      r.views,
      r.applyClicks,
      r.submitted,
      r.applyRate,
      r.submitRate,
    ]);

    const csv = [header, ...csvRows]
      .map((row) => row.join(","))
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          "attachment; filename=job-performance-report.csv",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}