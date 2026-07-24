// src/app/admin/(protected)/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const dynamic = "force-dynamic";

type DashboardStats = {
  activeRange: string;
  auditRecentCount: number;
  contactTotal: number;
  contactLast7Days: number;
  contactLast30Days: number;
  candidateTotal: number;
  candidateLast7Days: number;
  candidateLast30Days: number;
  submittedTotal: number;
  submittedLast7Days: number;
  submittedLast30Days: number;
  jobsRefreshTotal: number;
  jobsRefreshLatestTs: number | null;
  topSectors: { sector: string; count: number }[];
  topJobs: { jobId: string; title: string; count: number }[];
  topApplyClicks: { jobId: string; title: string; count: number }[];
  topSubmittedApplications: { jobId: string; title: string; count: number }[];
  repeatJobInterest: { jobId: string; title: string; count: number }[];
  jobPerformanceTable: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
   highIntentJobs: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
  applyDropOffJobs: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
  highConversionJobs: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
  conversionSummary: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
    sectorConversionLeaders: {
    sector: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
  locationConversionLeaders: {
    location: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
  multiSectorInterest: {
    sector: string;
    count: number;
  }[];
  marketHeatScores: {
    sector: string;
    views: number;
    applyClicks: number;
    submitted: number;
    score: number;
  }[];
  applicationTrend: {
    date: string;
    count: number;
  }[];
  applyClickTrend: {
    date: string;
    count: number;
  }[];
  sectorPerformanceChart: {
  sector: string;
  clicks: number;
  submitted: number;
  conversion: number;
}[];
  
};

function fmt(ts?: number | null) {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString("en-GB");
  } catch {
    return "—";
  }
}

function formatUkShortDate(isoDate: string) {
  try {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return isoDate;
  }
}

function formatUkLongDate(isoDate: string) {
  try {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function getRangeLabel(range: string) {
  if (range === "30d") return "Month";
  if (range === "90d") return "Quarter";
  if (range === "6m") return "Half Year";
  if (range === "12m") return "Full Year";
  if (range === "ytd") return "YTD";
  return "Month";
}

function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        display: "grid",
        gap: 8,
      }}
    >
      <div className="jobs-muted" style={{ margin: 0 }}>
        {title}
      </div>

      <div style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1.1 }}>
        {value}
      </div>

      {sub ? (
        <div className="jobs-muted" style={{ margin: 0, fontSize: 14 }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
}

function MetricListCard({
  title,
  emptyText,
  items,
}: {
  title: string;
  emptyText: string;
  items: { label: string; value: number; sub?: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>{title}</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          {emptyText}
        </p>
      ) : (
        items.map((item) => (
          <div
            key={`${item.label}-${item.sub ?? ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "8px 10px",
              borderRadius: 10,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div>{item.label}</div>
              {item.sub ? (
                <div
                  className="jobs-muted"
                  style={{ marginTop: 2, fontSize: 13 }}
                >
                  {item.sub}
                </div>
              ) : null}
            </div>

            <strong>{item.value}</strong>
          </div>
        ))
      )}
    </div>
  );
}

function ConversionSummaryCard({
  items,
}: {
  items: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Conversion summary</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No conversion data recorded yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={`${item.jobId}-${item.title}`}
            style={{
              display: "grid",
              gap: 8,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{item.title}</div>
              <div
                className="jobs-muted"
                style={{ marginTop: 2, fontSize: 13 }}
              >
                {item.jobId}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 10,
                fontSize: 14,
              }}
            >
              <div>
                <div className="jobs-muted" style={{ fontSize: 12 }}>
                  Views
                </div>
                <strong>{item.views}</strong>
              </div>

              <div>
                <div className="jobs-muted" style={{ fontSize: 12 }}>
                  Apply clicks
                </div>
                <strong>{item.applyClicks}</strong>
              </div>

              <div>
                <div className="jobs-muted" style={{ fontSize: 12 }}>
                  Submitted
                </div>
                <strong>{item.submitted}</strong>
              </div>

              <div>
                <div className="jobs-muted" style={{ fontSize: 12 }}>
                  Apply rate
                </div>
                <strong>{item.applyRate}%</strong>
              </div>

              <div>
                <div className="jobs-muted" style={{ fontSize: 12 }}>
                  Submit rate
                </div>
                <strong>{item.submitRate}%</strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function JobPerformanceTable({
  items,
}: {
  items: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Job performance table</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No job performance data recorded yet.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 860,
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: "10px 12px" }}>Job</th>
                <th style={{ padding: "10px 12px" }}>Job ID</th>
                <th style={{ padding: "10px 12px" }}>Views</th>
                <th style={{ padding: "10px 12px" }}>Apply clicks</th>
                <th style={{ padding: "10px 12px" }}>Submitted</th>
                <th style={{ padding: "10px 12px" }}>Apply rate</th>
                <th style={{ padding: "10px 12px" }}>Submit rate</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={`${item.jobId}-${item.title}`}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <td style={{ padding: "12px" }}>{item.title}</td>
                  <td style={{ padding: "12px" }}>{item.jobId}</td>
                  <td style={{ padding: "12px" }}>{item.views}</td>
                  <td style={{ padding: "12px" }}>{item.applyClicks}</td>
                  <td style={{ padding: "12px" }}>{item.submitted}</td>
                  <td style={{ padding: "12px" }}>{item.applyRate}%</td>
                  <td style={{ padding: "12px" }}>{item.submitRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function HighIntentJobsCard({
  items,
}: {
  items: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>High intent job interest</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No high intent job signals detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={`${item.jobId}-${item.title}`}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div
              className="jobs-muted"
              style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}
            >
              <span>{item.jobId}</span>
              <span>Views: {item.views}</span>
              <span>Apply clicks: {item.applyClicks}</span>
              <span>Submitted: {item.submitted}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function ApplyDropOffJobsCard({
  items,
}: {
  items: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Apply drop-off signals</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No apply drop-off signals detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={`${item.jobId}-${item.title}`}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div
              className="jobs-muted"
              style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}
            >
              <span>{item.jobId}</span>
              <span>Views: {item.views}</span>
              <span>Apply clicks: {item.applyClicks}</span>
              <span>Submitted: {item.submitted}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function HighConversionJobsCard({
  items,
}: {
  items: {
    jobId: string;
    title: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>High conversion jobs</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No high conversion jobs detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={`${item.jobId}-${item.title}`}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div
              className="jobs-muted"
              style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}
            >
              <span>{item.jobId}</span>
              <span>Views: {item.views}</span>
              <span>Apply clicks: {item.applyClicks}</span>
              <span>Submitted: {item.submitted}</span>
              <span>Submit rate: {item.submitRate}%</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function SectorConversionLeadersCard({
  items,
}: {
  items: {
    sector: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Sector conversion leaders</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No sector conversion data detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.sector}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.sector}</div>
            <div
              className="jobs-muted"
              style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}
            >
              <span>Views: {item.views}</span>
              <span>Apply clicks: {item.applyClicks}</span>
              <span>Submitted: {item.submitted}</span>
              <span>Apply rate: {item.applyRate}%</span>
              <span>Submit rate: {item.submitRate}%</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function LocationConversionLeadersCard({
  items,
}: {
  items: {
    location: string;
    views: number;
    applyClicks: number;
    submitted: number;
    applyRate: number;
    submitRate: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Location conversion leaders</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No location conversion data detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.location}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.location}</div>
            <div
              className="jobs-muted"
              style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}
            >
              <span>Views: {item.views}</span>
              <span>Apply clicks: {item.applyClicks}</span>
              <span>Submitted: {item.submitted}</span>
              <span>Apply rate: {item.applyRate}%</span>
              <span>Submit rate: {item.submitRate}%</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function MultiSectorInterestCard({
  items,
}: {
  items: {
    sector: string;
    count: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Multi-sector interest</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No multi-sector interest detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.sector}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.sector}</div>
            <strong>{item.count}</strong>
          </div>
        ))
      )}
    </div>
  );
}

function MarketHeatScoresCard({
  items,
}: {
  items: {
    sector: string;
    views: number;
    applyClicks: number;
    submitted: number;
    score: number;
  }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>Market heat scores</strong>

      {items.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No market heat data detected yet.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.sector}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontWeight: 700 }}>{item.sector}</div>
              <strong>{item.score}</strong>
            </div>

            <div
              className="jobs-muted"
              style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}
            >
              <span>Views: {item.views}</span>
              <span>Apply clicks: {item.applyClicks}</span>
              <span>Submitted: {item.submitted}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function ApplicationTrendChart({
  items,
  rangeLabel,
}: {
  items: {
    date: string;
    count: number;
  }[];
  rangeLabel: string;
}) {
  const chartData = items.map((item) => ({
    ...item,
    shortDate: formatUkShortDate(item.date),
    longDate: formatUkLongDate(item.date),
  }));

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>{`Applications over time — ${rangeLabel}`}</strong>

      {chartData.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No application trend data recorded yet.
        </p>
      ) : (
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="shortDate"
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
              />
              <YAxis
                allowDecimals={false}
                label={{
                  value: "Applications",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    fill: "rgba(255,255,255,0.75)",
                    fontSize: 12,
                    textAnchor: "middle",
                  },
                }}
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
              />
              <Tooltip
                formatter={(value) => [`${Number(value)}`, "Applications"]}
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.longDate || String(label)
                }
                contentStyle={{
                  background: "#163f63",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 12,
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff", fontWeight: 700 }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="none"
                fill="#ff8c00"
                fillOpacity={0.12}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff8c00"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function ApplyClickTrendChart({
  items,
  rangeLabel,
}: {
  items: {
    date: string;
    count: number;
  }[];
  rangeLabel: string;
}) {
  const chartData = items.map((item) => ({
    ...item,
    shortDate: formatUkShortDate(item.date),
    longDate: formatUkLongDate(item.date),
  }));

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <strong>{`Apply clicks over time — ${rangeLabel}`}</strong>

      {chartData.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No apply click trend data recorded yet.
        </p>
      ) : (
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="shortDate"
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
              />
              <YAxis
                allowDecimals={false}
                label={{
                  value: "Apply clicks",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    fill: "rgba(255,255,255,0.75)",
                    fontSize: 12,
                    textAnchor: "middle",
                  },
                }}
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
              />
              <Tooltip
                formatter={(value) => [`${Number(value)}`, "Apply clicks"]}
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.longDate || String(label)
                }
                contentStyle={{
                  background: "#163f63",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 12,
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff", fontWeight: 700 }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="none"
                fill="#ff8c00"
                fillOpacity={0.12}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff8c00"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function SectorPerformanceChart({
  items,
}: {
  items: {
    sector: string;
    clicks: number;
    submitted: number;
    conversion: number;
  }[];
}) {
  const chartData = items.filter((item) => item.clicks > 0 || item.submitted > 0);

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <strong>Sector interest vs applications</strong>

        <div
          className="jobs-muted"
          style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#ff8c00",
                display: "inline-block",
              }}
            />
            Apply clicks
          </span>

          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#2ecc71",
                display: "inline-block",
              }}
            />
            Submitted applications
          </span>
        </div>
      </div>

      {chartData.length === 0 ? (
        <p className="jobs-muted" style={{ margin: 0 }}>
          No sector chart data recorded yet.
        </p>
      ) : (
        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="sector"
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
              />
              <YAxis
                allowDecimals={false}
                label={{
                  value: "Number of candidate actions",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    fill: "rgba(255,255,255,0.75)",
                    fontSize: 12,
                    textAnchor: "middle",
                  },
                }}
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const item = props?.payload;
                  if (name === "conversion") {
                    return [`${Number(value)}%`, "Conversion"];
                  }
                  return [Number(value), name];
                }}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;
                  if (!item) return String(label);
                  return `${item.sector} — ${item.conversion}% conversion`;
                }}
                contentStyle={{
                  background: "#163f63",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 12,
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff", fontWeight: 700 }}
              />
              <Bar dataKey="clicks" fill="#ff8c00" name="Apply clicks" />
              <Bar
                dataKey="submitted"
                fill="#2ecc71"
                name="Submitted applications"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="jobs-muted" style={{ margin: 0, fontSize: 13 }}>
        This compares sector-level apply clicks against submitted applications
to s    how which markets are generating real candidate action.
      </p>
    </div>
  );
}

function TrendCard({
  title,
  total,
  last7Days,
  last30Days,
}: {
  title: string;
  total: number;
  last7Days: number;
  last30Days: number;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        display: "grid",
        gap: 10,
      }}
    >
      <strong>{title}</strong>

      <div style={{ fontSize: "1.6rem", fontWeight: 900, lineHeight: 1.1 }}>
        {total}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
          fontSize: 14,
        }}
      >
        <div>
          <div className="jobs-muted" style={{ fontSize: 12 }}>
            Last 7 days
          </div>
          <strong>{last7Days}</strong>
        </div>

        <div>
          <div className="jobs-muted" style={{ fontSize: 12 }}>
            Last 30 days
          </div>
          <strong>{last30Days}</strong>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedRange = searchParams.get("range") || "30d";
  const rangeOptions = [
    { value: "30d", label: "Month" },
    { value: "90d", label: "Quarter" },
    { value: "6m", label: "Half Year" },
    { value: "12m", label: "Full Year" },
    { value: "ytd", label: "YTD" },
  ];

  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  async function loadStats() {
    try {
      const res = await fetch(`/api/admin/dashboard?range=${selectedRange}`, {
        method: "GET",
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed");
      }

      setStats(json.stats);
    } catch {
      setStats(null);
    }
  }

  async function refreshJobs() {
    setMsg(null);
    setBusy(true);

    try {
      const res = await fetch("/api/admin/ops/jobs/refresh", {
        method: "POST",
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed");
      }

      setMsg("✅ Jobs refresh triggered (audit logged).");
      await loadStats();
    } catch (e: any) {
      setMsg(`❌ ${e?.message || "Failed"}`);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, [selectedRange]);

  const activeRangeLabel = getRangeLabel(stats?.activeRange || selectedRange);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div>
        <h3 style={{ marginBottom: 6 }}>Dashboard</h3>
        <p className="jobs-muted" style={{ margin: 0 }}>
          Owner overview for website activity and operational health.
        </p>
      </div>

      {msg && (
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: msg.startsWith("✅")
              ? "rgba(50,255,120,0.10)"
              : "rgba(255,50,50,0.12)",
          }}
        >
          {msg}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        <StatCard
          title="Recent audit events"
          value={stats ? stats.auditRecentCount : "—"}
          sub="Latest recorded activity"
        />

        <StatCard
          title="Contact enquiries"
          value={stats ? stats.contactTotal : "—"}
          sub="Total logged submissions"
        />

        <StatCard
          title="Candidate registrations"
          value={stats ? stats.candidateTotal : "—"}
          sub="Total logged submissions"
        />

        <StatCard
          title="Job cache refreshes"
          value={stats ? stats.jobsRefreshTotal : "—"}
          sub={
            stats
              ? `Last refresh: ${fmt(stats.jobsRefreshLatestTs)}`
              : "Last refresh: —"
          }
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 14,
          alignItems: "start",
        }}
      >
        <TrendCard
          title="Contact enquiry trend"
          total={stats?.contactTotal ?? 0}
          last7Days={stats?.contactLast7Days ?? 0}
          last30Days={stats?.contactLast30Days ?? 0}
        />

        <TrendCard
          title="Candidate registration trend"
          total={stats?.candidateTotal ?? 0}
          last7Days={stats?.candidateLast7Days ?? 0}
          last30Days={stats?.candidateLast30Days ?? 0}
        />

        <TrendCard
          title="Submitted application trend"
          total={stats?.submittedTotal ?? 0}
          last7Days={stats?.submittedLast7Days ?? 0}
          last30Days={stats?.submittedLast30Days ?? 0}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <strong style={{ fontSize: 14 }}>Range</strong>

        {rangeOptions.map((range) => {
          const isActive = selectedRange === range.value;

          return (
            <button
              key={range.value}
              type="button"
              onClick={() => router.push(`/admin?range=${range.value}`)}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: isActive
                  ? "1px solid rgba(255,140,0,0.5)"
                  : "1px solid rgba(255,255,255,0.14)",
                background: isActive
                  ? "rgba(255,140,0,0.12)"
                  : "rgba(255,255,255,0.06)",
                color: isActive ? "#ff8c00" : "rgba(255,255,255,0.88)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {range.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
          alignItems: "start",
        }}
      >
        <ApplicationTrendChart
          items={stats?.applicationTrend ?? []}
          rangeLabel={activeRangeLabel}
        />
        <ApplyClickTrendChart
          items={stats?.applyClickTrend ?? []}
          rangeLabel={activeRangeLabel}
        />
      </div>

        <SectorPerformanceChart
        items={stats?.sectorPerformanceChart ?? []}
        />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
          alignItems: "start",
        }}
      >
        <MetricListCard
          title="Most clicked sectors"
          emptyText="No sector clicks recorded yet."
          items={
            stats?.topSectors?.map((item) => ({
              label: item.sector,
              value: item.count,
            })) ?? []
          }
        />

        <MetricListCard
          title="Top viewed live jobs"
          emptyText="No live job views recorded yet."
          items={
            stats?.topJobs?.map((item) => ({
              label: item.title,
              sub: item.jobId,
              value: item.count,
            })) ?? []
          }
        />

        <MetricListCard
          title="Top apply clicks"
          emptyText="No apply clicks recorded yet."
          items={
            stats?.topApplyClicks?.map((item) => ({
              label: item.title,
              sub: item.jobId,
              value: item.count,
            })) ?? []
          }
        />

        <MetricListCard
          title="Top submitted applications"
          emptyText="No submitted applications recorded yet."
          items={
            stats?.topSubmittedApplications?.map((item) => ({
              label: item.title,
              sub: item.jobId,
              value: item.count,
            })) ?? []
          }
        />
      </div>

      <JobPerformanceTable items={stats?.jobPerformanceTable ?? []} />

      <ConversionSummaryCard items={stats?.conversionSummary ?? []} />

      <HighIntentJobsCard items={stats?.highIntentJobs ?? []} />

      <ApplyDropOffJobsCard items={stats?.applyDropOffJobs ?? []} />

      <HighConversionJobsCard items={stats?.highConversionJobs ?? []} />

      <MarketHeatScoresCard items={stats?.marketHeatScores ?? []} />

      <SectorConversionLeadersCard
        items={stats?.sectorConversionLeaders ?? []}
      />

      <LocationConversionLeadersCard
        items={stats?.locationConversionLeaders ?? []}
      />

      <MultiSectorInterestCard items={stats?.multiSectorInterest ?? []} />

      <div style={{ width: "100%" }}>
        <MetricListCard
          title="Repeat job interest"
          emptyText="No repeat job interest detected yet."
          items={
            stats?.repeatJobInterest?.map((item) => ({
              label: item.title,
              sub: `${item.jobId} • ${item.count} views`,
              value: item.count,
            })) ?? []
          }
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          borderRadius: 18,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          width: "100%",
        }}
      >
        <strong>Operations</strong>

        <p className="jobs-muted" style={{ margin: 0 }}>
          Safe admin operation. This triggers a controlled refresh and records
          the action in the audit log for operational tracking.
        </p>

        <button className="sector-cta" onClick={refreshJobs} disabled={busy}>
          {busy ? "Working..." : "Refresh jobs cache (safe)"}
        </button>

        <p className="jobs-muted" style={{ margin: 0 }}>
          After clicking, check{" "}
          <a
            href="/admin/audit"
            style={{
              color: "#ff8c00",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            /admin/audit
          </a>{" "}
          for the latest jobs refresh event.
        </p>
      </div>
    </div>
  );
}