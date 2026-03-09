// src/app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import {
  countAuditEventsByAction,
  getAuditEvents,
  getLatestAuditEventByAction,
} from "@/lib/adminAudit";

export const dynamic = "force-dynamic";

type JobMetric = {
  jobId: string;
  title: string;
  count: number;
};

export async function GET(req: Request) {
  try {
    const auditRecent = await getAuditEvents(250);

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30d";

    const now = Date.now();

    let rangeStart = now - 30 * 24 * 60 * 60 * 1000;

    if (range === "90d") {
      rangeStart = now - 90 * 24 * 60 * 60 * 1000;
    } else if (range === "6m") {
      rangeStart = now - 183 * 24 * 60 * 60 * 1000;
    } else if (range === "12m") {
      rangeStart = now - 365 * 24 * 60 * 60 * 1000;
    } else if (range === "ytd") {
      const d = new Date();
      rangeStart = new Date(d.getFullYear(), 0, 1).getTime();
    }

    const rangedAudit = auditRecent.filter((e) => e.ts >= rangeStart);

    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    const contactTotal = await countAuditEventsByAction("contact.submit");
    const candidateTotal = await countAuditEventsByAction("candidate.register");
    const submittedTotal = await countAuditEventsByAction("application.submit");
    const jobsRefreshTotal = await countAuditEventsByAction(
      "admin.ops.jobs.refresh"
    );

    const contactLast7Days = auditRecent.filter(
      (e) => e.action === "contact.submit" && e.ts >= sevenDaysAgo
    ).length;

    const contactLast30Days = auditRecent.filter(
      (e) => e.action === "contact.submit" && e.ts >= thirtyDaysAgo
    ).length;

    const candidateLast7Days = auditRecent.filter(
      (e) => e.action === "candidate.register" && e.ts >= sevenDaysAgo
    ).length;

    const candidateLast30Days = auditRecent.filter(
      (e) => e.action === "candidate.register" && e.ts >= thirtyDaysAgo
    ).length;

    const submittedLast7Days = auditRecent.filter(
      (e) => e.action === "application.submit" && e.ts >= sevenDaysAgo
    ).length;

    const submittedLast30Days = auditRecent.filter(
      (e) => e.action === "application.submit" && e.ts >= thirtyDaysAgo
    ).length;

    const latestRefresh = await getLatestAuditEventByAction(
      "admin.ops.jobs.refresh"
    );

    const sectorClicks = rangedAudit
      .filter((e) => e.action === "sector.click")
      .map((e) => (e.meta?.sector as string) || "Unknown");

    const sectorCounts: Record<string, number> = {};

    for (const sector of sectorClicks) {
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    }

    const topSectors = Object.entries(sectorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([sector, count]) => ({ sector, count }));

    const jobCounts: Record<string, JobMetric> = {};
    const applyCounts: Record<string, JobMetric> = {};
    const submittedCounts: Record<string, JobMetric> = {};

    for (const e of rangedAudit) {
      const jobId = String(e.meta?.jobId || "").trim();
      const title = String(e.meta?.title || "").trim();

      if (!jobId || !title) continue;

      const key = `${jobId}__${title}`;

      if (e.action === "job.view") {
        if (!jobCounts[key]) {
          jobCounts[key] = { jobId, title, count: 0 };
        }
        jobCounts[key].count += 1;
      }

      if (e.action === "job.apply_click") {
        if (!applyCounts[key]) {
          applyCounts[key] = { jobId, title, count: 0 };
        }
        applyCounts[key].count += 1;
      }

      if (e.action === "application.submit") {
        if (!submittedCounts[key]) {
          submittedCounts[key] = { jobId, title, count: 0 };
        }
        submittedCounts[key].count += 1;
      }
    }

    const topJobs = Object.values(jobCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topApplyClicks = Object.values(applyCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topSubmittedApplications = Object.values(submittedCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const repeatJobInterest = topJobs.filter((job) => job.count >= 2);

    const conversionSummary = Object.values(jobCounts)
      .map((job) => {
        const key = `${job.jobId}__${job.title}`;
        const applyClicks = applyCounts[key]?.count || 0;
        const submitted = submittedCounts[key]?.count || 0;
        const views = job.count;

        const applyRate =
          views > 0 ? Math.round((applyClicks / views) * 100) : 0;
        const submitRate =
          views > 0 ? Math.round((submitted / views) * 100) : 0;

        return {
          jobId: job.jobId,
          title: job.title,
          views,
          applyClicks,
          submitted,
          applyRate,
          submitRate,
        };
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const jobPerformanceTable = Object.values(jobCounts)
      .map((job) => {
        const key = `${job.jobId}__${job.title}`;
        const applyClicks = applyCounts[key]?.count || 0;
        const submitted = submittedCounts[key]?.count || 0;
        const views = job.count;

        const applyRate =
          views > 0 ? Math.round((applyClicks / views) * 100) : 0;
        const submitRate =
          views > 0 ? Math.round((submitted / views) * 100) : 0;

        return {
          jobId: job.jobId,
          title: job.title,
          views,
          applyClicks,
          submitted,
          applyRate,
          submitRate,
        };
      })
      .sort((a, b) => {
        if (b.submitted !== a.submitted) return b.submitted - a.submitted;
        if (b.applyClicks !== a.applyClicks) {
          return b.applyClicks - a.applyClicks;
        }
        return b.views - a.views;
      });

    const highIntentJobs = jobPerformanceTable
      .filter((job) => job.views >= 2 && job.applyClicks >= 1)
      .slice(0, 8);

    const applyDropOffJobs = jobPerformanceTable
      .filter((job) => job.applyClicks >= 1 && job.submitted === 0)
      .slice(0, 8);

    const highConversionJobs = jobPerformanceTable
      .filter(
        (job) => job.views >= 3 && job.submitted >= 1 && job.submitRate >= 20
      )
      .slice(0, 8);

    const sectorPerformanceMap: Record<
      string,
      {
        sector: string;
        views: number;
        applyClicks: number;
        submitted: number;
        applyRate: number;
        submitRate: number;
      }
    > = {};

    for (const job of jobPerformanceTable) {
      const matchingAudit = rangedAudit.find(
        (e) =>
          (e.action === "job.view" ||
            e.action === "job.apply_click" ||
            e.action === "application.submit") &&
          String(e.meta?.jobId || "").trim() === job.jobId &&
          String(e.meta?.title || "").trim() === job.title
      );

      const sector =
        String(matchingAudit?.meta?.sector || "").trim() || "Unknown";

      if (!sectorPerformanceMap[sector]) {
        sectorPerformanceMap[sector] = {
          sector,
          views: 0,
          applyClicks: 0,
          submitted: 0,
          applyRate: 0,
          submitRate: 0,
        };
      }

      sectorPerformanceMap[sector].views += job.views;
      sectorPerformanceMap[sector].applyClicks += job.applyClicks;
      sectorPerformanceMap[sector].submitted += job.submitted;
    }

    const sectorConversionLeaders = Object.values(sectorPerformanceMap)
      .map((sector) => ({
        ...sector,
        applyRate:
          sector.views > 0
            ? Math.round((sector.applyClicks / sector.views) * 100)
            : 0,
        submitRate:
          sector.views > 0
            ? Math.round((sector.submitted / sector.views) * 100)
            : 0,
      }))
      .sort((a, b) => {
        if (b.submitRate !== a.submitRate) return b.submitRate - a.submitRate;
        if (b.submitted !== a.submitted) return b.submitted - a.submitted;
        return b.views - a.views;
      })
      .slice(0, 8);

    const locationPerformanceMap: Record<
      string,
      {
        location: string;
        views: number;
        applyClicks: number;
        submitted: number;
        applyRate: number;
        submitRate: number;
      }
    > = {};

    for (const job of jobPerformanceTable) {
      const matchingAudit = rangedAudit.find(
        (e) =>
          (e.action === "job.view" ||
            e.action === "job.apply_click" ||
            e.action === "application.submit") &&
          String(e.meta?.jobId || "").trim() === job.jobId &&
          String(e.meta?.title || "").trim() === job.title
      );

      const location =
        String(matchingAudit?.meta?.location || "").trim() || "Unknown";

      if (!locationPerformanceMap[location]) {
        locationPerformanceMap[location] = {
          location,
          views: 0,
          applyClicks: 0,
          submitted: 0,
          applyRate: 0,
          submitRate: 0,
        };
      }

      locationPerformanceMap[location].views += job.views;
      locationPerformanceMap[location].applyClicks += job.applyClicks;
      locationPerformanceMap[location].submitted += job.submitted;
    }

    const locationConversionLeaders = Object.values(locationPerformanceMap)
      .map((location) => ({
        ...location,
        applyRate:
          location.views > 0
            ? Math.round((location.applyClicks / location.views) * 100)
            : 0,
        submitRate:
          location.views > 0
            ? Math.round((location.submitted / location.views) * 100)
            : 0,
      }))
      .sort((a, b) => {
        if (b.submitRate !== a.submitRate) return b.submitRate - a.submitRate;
        if (b.submitted !== a.submitted) return b.submitted - a.submitted;
        return b.views - a.views;
      })
      .slice(0, 8);

    const sectorInterestCounts: Record<string, number> = {};

    for (const e of rangedAudit) {
      if (
        e.action !== "job.view" &&
        e.action !== "job.apply_click" &&
        e.action !== "application.submit"
      ) {
        continue;
      }

      const sector = String(e.meta?.sector || "").trim() || "Unknown";
      sectorInterestCounts[sector] = (sectorInterestCounts[sector] || 0) + 1;
    }

    const multiSectorInterest = Object.entries(sectorInterestCounts)
      .map(([sector, count]) => ({
        sector,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const marketHeatScores = Object.values(sectorPerformanceMap)
      .map((sector) => {
        const score =
          sector.views * 1 + sector.applyClicks * 3 + sector.submitted * 6;

        return {
          sector: sector.sector,
          views: sector.views,
          applyClicks: sector.applyClicks,
          submitted: sector.submitted,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

      const sectorClickMap: Record<string, number> = {};
const sectorSubmitMap: Record<string, number> = {};

for (const e of rangedAudit) {
  const sector = String(e.meta?.sector || "").trim() || "Unknown";

  if (e.action === "job.apply_click") {
    sectorClickMap[sector] = (sectorClickMap[sector] || 0) + 1;
  }

  if (e.action === "application.submit") {
    sectorSubmitMap[sector] = (sectorSubmitMap[sector] || 0) + 1;
  }
}

const sectorPerformanceChart = Object.keys({
  ...sectorClickMap,
  ...sectorSubmitMap,
})
  .map((sector) => {
    const clicks = sectorClickMap[sector] || 0;
    const submitted = sectorSubmitMap[sector] || 0;

    const conversion =
      clicks > 0 ? Math.round((submitted / clicks) * 100) : 0;

    return {
      sector,
      clicks,
      submitted,
      conversion,
    };
  })
  .filter((item) => item.sector !== "Unknown")
  .sort((a, b) => b.clicks - a.clicks);

    const applicationTrendMap: Record<string, number> = {};

    for (const e of rangedAudit) {
      if (e.action !== "application.submit") continue;

      const day = new Date(e.ts).toISOString().slice(0, 10);
      applicationTrendMap[day] = (applicationTrendMap[day] || 0) + 1;
    }

    const applicationTrend = Object.entries(applicationTrendMap)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const applyClickTrendMap: Record<string, number> = {};

    for (const e of rangedAudit) {
      if (e.action !== "job.apply_click") continue;

      const day = new Date(e.ts).toISOString().slice(0, 10);
      applyClickTrendMap[day] = (applyClickTrendMap[day] || 0) + 1;
    }

    const applyClickTrend = Object.entries(applyClickTrendMap)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      ok: true,
      stats: {
        activeRange: range,
        auditRecentCount: auditRecent.length,
        contactTotal,
        contactLast7Days,
        contactLast30Days,
        candidateTotal,
        candidateLast7Days,
        candidateLast30Days,
        submittedTotal,
        submittedLast7Days,
        submittedLast30Days,
        jobsRefreshTotal,
        jobsRefreshLatestTs: latestRefresh?.ts ?? null,
        topSectors,
        topJobs,
        topApplyClicks,
        topSubmittedApplications,
        repeatJobInterest,
        conversionSummary,
        jobPerformanceTable,
        highIntentJobs,
        applyDropOffJobs,
        highConversionJobs,
        sectorConversionLeaders,
        locationConversionLeaders,
        multiSectorInterest,
        marketHeatScores,
        sectorPerformanceChart,
        applicationTrend,
        applyClickTrend,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Failed to load admin dashboard stats",
      },
      { status: 500 }
    );
  }
}