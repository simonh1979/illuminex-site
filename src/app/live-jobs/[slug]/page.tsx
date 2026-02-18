"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
  description?: string; // HTML string (later from JobAdder)
};

function getJobIdFromSlug(slug: string) {
  if (!slug) return null;

  // 1) Preferred: ILX-001 at end
  const endMatch = slug.match(/(ILX-\d+)$/i);
  if (endMatch) return endMatch[1].toUpperCase();

  // 2) Fallback: ILX-001 anywhere in the slug
  const anyMatch = slug.match(/(ILX-\d+)/i);
  if (anyMatch) return anyMatch[1].toUpperCase();

  return null;
}


function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function LiveJobDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug as string) ?? "";
  const jobId = useMemo(() => getJobIdFromSlug(slug), [slug]);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"" | "invalid-link" | "unavailable">("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError("");
      setJob(null);

      if (!jobId) {
        setLoading(false);
        setError("invalid-link");
        return;
      }

      try {
        const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("unavailable");
        const json = (await res.json()) as Job;

        if (!cancelled) setJob(json);
      } catch {
        if (!cancelled) setError("unavailable");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  // Invalid slug / missing ID
  if (!loading && error === "invalid-link") {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="sector-card">
              <h3>Role not found</h3>
              <p className="jobs-muted">
                This role link looks incomplete. Please return to Live Jobs and try again.
              </p>
              <div style={{ marginTop: 14 }}>
                <a className="sector-cta" href="/live-jobs">
                  Back to Live Jobs
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Loading skeleton
  if (loading) {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="job-detail-grid">
              <div className="sector-card job-detail-main jobs-skel" />
              <aside className="sector-card job-detail-aside jobs-skel" style={{ minHeight: 260 }} />
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Couldn’t fetch job
  if (!job) {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="sector-card">
              <h3>Role unavailable</h3>
              <p className="jobs-muted">
                This vacancy may have been filled or removed. Please return to Live Jobs.
              </p>
              <div style={{ marginTop: 14 }}>
                <a className="sector-cta" href="/live-jobs">
                  Back to Live Jobs
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="job-detail-grid">
            {/* LEFT: Job details */}
            <div className="sector-card job-detail-main">
              <div className="job-top">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span>{job.location}</span>
                    <span className="job-dot">•</span>
                    <span>{job.sector}</span>
                    <span className="job-dot">•</span>
                    <span>{job.jobType}</span>
                    <span className="job-dot">•</span>
                    <span>{job.experienceLevel}</span>
                  </div>
                </div>

                <div className="job-side">
                  <div className="job-id">{job.id}</div>
                  <div className="job-date">{formatDate(job.postedAt)}</div>
                </div>
              </div>

              <p className="job-summary">{job.summary}</p>

              <div style={{ marginTop: 16, opacity: 0.96, lineHeight: 1.75 }}>
                {job.description ? (
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />
                ) : (
                  <>
                    <h4 style={{ marginTop: 18, marginBottom: 10 }}>Overview</h4>
                    <p className="jobs-muted" style={{ opacity: 0.95 }}>
                      Full job description will appear here when we connect to your ATS feed.
                      For now, this is mock content to validate the layout and UX.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT: Apply panel */}
            <aside className="sector-card job-detail-aside">
              <h3 style={{ marginBottom: 10 }}>Apply now</h3>
              <p className="jobs-muted" style={{ marginBottom: 14 }}>
                Register your interest and we’ll respond quickly and discreetly.
              </p>

              <div className="job-salary" style={{ marginBottom: 12 }}>
                {job.salary ?? "Salary: DOE"}
              </div>

              <a className="sector-cta" href={`/live-jobs/${encodeURIComponent(slug)}/apply`}>
  Apply / Enquire
</a>

              <p className="jobs-muted" style={{ marginTop: 14 }}>
                Next step will include CV upload + acceptance of T&amp;Cs.
              </p>

              <div style={{ marginTop: 16, opacity: 0.9 }}>
                <div className="job-meta" style={{ gap: 8 }}>
                  <span>Location: {job.location}</span>
                  <span className="job-dot">•</span>
                  <span>Sector: {job.sector}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
