"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const FIREFISH_JOB_BOARD_BASE_URL = (
  process.env.NEXT_PUBLIC_FIREFISH_JOB_BOARD_BASE_URL ||
  "https://illuminex.current.jobs"
).replace(/\/+$/, "");

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
  description?: string;
};

function getJobIdFromSlug(slug: string): string | null {
  if (!slug) return null;

  const firefishEndMatch = slug.match(/(FF-\d+)$/i);
  if (firefishEndMatch) {
    return firefishEndMatch[1].toUpperCase();
  }

  const firefishAnyMatch = slug.match(/(FF-\d+)/i);
  if (firefishAnyMatch) {
    return firefishAnyMatch[1].toUpperCase();
  }

  const illuminexEndMatch = slug.match(/(ILX-\d+)$/i);
  if (illuminexEndMatch) {
    return illuminexEndMatch[1].toUpperCase();
  }

  const illuminexAnyMatch = slug.match(/(ILX-\d+)/i);
  if (illuminexAnyMatch) {
    return illuminexAnyMatch[1].toUpperCase();
  }

  return null;
}

function getFirefishAdvertRef(jobId: string): number | null {
  const match = jobId.match(/^FF-(\d+)$/i);

  if (!match) {
    return null;
  }

  const advertRef = Number(match[1]);

  if (!Number.isInteger(advertRef) || advertRef <= 0) {
    return null;
  }

  return advertRef;
}

/**
 * Builds the exact Firefish native application URL for an FF vacancy.
 *
 * Example slug:
 *
 * national-account-manager-building-materials-FF-3
 *
 * becomes:
 *
 * {FIREFISH_JOB_BOARD_BASE_URL}/job/
 * national-account-manager-building-materials-3/apply.aspx
 *
 * The base domain is controlled by:
 * NEXT_PUBLIC_FIREFISH_JOB_BOARD_BASE_URL
 */
function getFirefishDirectApplyUrl(
  slug: string,
  jobId: string
): string | null {
  const advertRef = getFirefishAdvertRef(jobId);

  if (!advertRef || !slug) {
    return null;
  }

  let decodedSlug = slug;

  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // Continue with the original slug when it is already decoded.
  }

  const firefishSlug = decodedSlug
    .replace(new RegExp(`-FF-${advertRef}$`, "i"), "")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  if (!firefishSlug) {
    return null;
  }

  return (
    `${FIREFISH_JOB_BOARD_BASE_URL}/job/` +
    `${firefishSlug}-${advertRef}/apply.aspx`
  );
}

function safelyDecodeFrom(value: string | null): string {
  if (!value?.trim()) {
    return "/live-jobs";
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return "/live-jobs";
  }
}

function formatDate(iso: string): string {
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

export default function LiveJobDetailClient() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = params?.slug ?? "";

  const jobId = useMemo(() => {
    return getJobIdFromSlug(slug);
  }, [slug]);

  const backHref = safelyDecodeFrom(searchParams.get("from"));
  const encodedFrom = encodeURIComponent(backHref);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    "" | "invalid-link" | "unavailable"
  >("");

  useEffect(() => {
    let cancelled = false;

    async function loadJob() {
      setLoading(true);
      setError("");
      setJob(null);

      if (!jobId) {
        setLoading(false);
        setError("invalid-link");
        return;
      }

      try {
        const response = await fetch(
          `/api/jobs/${encodeURIComponent(jobId)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Job unavailable.");
        }

        const jobResponse = (await response.json()) as Job;

        if (!cancelled) {
          setJob(jobResponse);
        }
      } catch {
        if (!cancelled) {
          setError("unavailable");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadJob();

    return () => {
      cancelled = true;
    };
  }, [jobId]);

  useEffect(() => {
    if (!job) return;

    const currentJob = job;

    async function trackView() {
      try {
        await fetch("/api/admin/track/job-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId: currentJob.id,
            title: currentJob.title,
            slug,
            sector: currentJob.sector,
            location: currentJob.location,
          }),
          keepalive: true,
        });
      } catch {
        // Job-view tracking must never interrupt the page.
      }
    }

    trackView();
  }, [job, slug]);

  async function trackApplyClick() {
    if (!job) return;

    try {
      await fetch("/api/admin/track/job-apply-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.id,
          title: job.title,
          slug,
          sector: job.sector,
          location: job.location,
        }),
        keepalive: true,
      });
    } catch {
      // Apply-click tracking must never interrupt the application journey.
    }
  }

  if (!loading && error === "invalid-link") {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="sector-card">
              <h3>Role not found</h3>

              <p className="jobs-muted">
                This role link looks incomplete. Please return to Live Jobs and
                try again.
              </p>

              <div style={{ marginTop: 14 }}>
                <a className="sector-cta" href={backHref}>
                  ← Back to results
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="job-detail-grid">
              <div className="sector-card job-detail-main jobs-skel" />

              <aside
                className="sector-card job-detail-aside jobs-skel"
                style={{ minHeight: 260 }}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="sector-card">
              <h3>Role unavailable</h3>

              <p className="jobs-muted">
                This vacancy may have been filled or removed. Please return to
                Live Jobs.
              </p>

              <div style={{ marginTop: 14 }}>
                <a className="sector-cta" href={backHref}>
                  ← Back to results
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const firefishAdvertRef = getFirefishAdvertRef(job.id);

  const illuminexApplyHref =
    `/live-jobs/${encodeURIComponent(slug)}/apply` +
    `?from=${encodedFrom}` +
    `&sector=${encodeURIComponent(job.sector || "")}` +
    `&location=${encodeURIComponent(job.location || "")}` +
    `&jobTitle=${encodeURIComponent(job.title || "")}` +
    `&jobId=${encodeURIComponent(job.id || "")}` +
    (firefishAdvertRef
      ? `&jobAdId=${encodeURIComponent(String(firefishAdvertRef))}`
      : "");

  const firefishDirectApplyUrl = getFirefishDirectApplyUrl(slug, job.id);

  const isUsingFirefishPortal = Boolean(firefishDirectApplyUrl);

  const applyHref = firefishDirectApplyUrl ?? illuminexApplyHref;

  return (
    <main className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div style={{ marginBottom: 14 }}>
            <a className="sector-cta" href={backHref}>
              ← Back to results
            </a>
          </div>

          <div className="job-detail-grid">
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

                  <div className="job-date">
                    {formatDate(job.postedAt)}
                  </div>
                </div>
              </div>

              <div
                className="job-description-content"
                style={{
                  marginTop: 16,
                  opacity: 0.96,
                  lineHeight: 1.75,
                }}
              >
                {job.description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.description.replace(
                        "</h2>",
                        '</h2><div style="height: 8px;"></div>'
                      ),
                    }}
                  />
                ) : (
                  <>
                    <h4
                      style={{
                        marginTop: 18,
                        marginBottom: 10,
                      }}
                    >
                      Overview
                    </h4>

                    <p
                      className="jobs-muted"
                      style={{
                        opacity: 0.95,
                      }}
                    >
                      Full job description will appear here when we connect to
                      your ATS feed. For now, this is mock content to validate
                      the layout and user experience.
                    </p>
                  </>
                )}
              </div>
            </div>

            <aside className="sector-card job-detail-aside">
              <h3 style={{ marginBottom: 10 }}>
                Start your application
              </h3>

              <p
                className="jobs-muted"
                style={{
                  marginBottom: 14,
                  lineHeight: 1.7,
                }}
              >
                {isUsingFirefishPortal ? (
                  <>
                    <strong>
                      Apply securely through the official Illuminex Candidate
                      Portal.
                    </strong>

                    <br />
                    <br />

                    Your application, CV and supporting information will be
                    submitted directly into our recruitment system, where every
                    application is personally reviewed by an Illuminex
                    Recruitment Consultant.

                    <br />
                    <br />

                    Existing candidates can simply sign in to continue their
                    application. New applicants can create an account in less
                    than a minute.
                  </>
                ) : (
                  <>
                    Register your interest and we’ll respond quickly and
                    discreetly.
                  </>
                )}
              </p>

              <div
                className="job-salary"
                style={{
                  marginBottom: 12,
                }}
              >
                {job.salary ?? "Salary: DOE"}
              </div>

              <a
                className="sector-cta"
                href={applyHref}
                onClick={trackApplyClick}
              >
                Apply Securely
              </a>

              {isUsingFirefishPortal ? (
                <div
                  style={{
                    marginTop: 18,
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <p
                    className="jobs-muted"
                    style={{
                      margin: 0,
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>🔒 Your information matters</strong>

                    <br />
                    <br />

                    Applications submitted through the official Illuminex
                    Candidate Portal are transferred directly into our
                    recruitment system. Your CV and personal information are
                    handled confidentially and in accordance with our{" "}
                    <a
                      href="/privacy"
                      style={{
                        color: "inherit",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <p
                  className="jobs-muted"
                  style={{
                    marginTop: 14,
                    lineHeight: 1.6,
                  }}
                >
                  The next step includes CV upload, acceptance of our Terms
                  &amp; Conditions and submission directly to an Illuminex
                  Recruitment Consultant.
                </p>
              )}

              <div
                style={{
                  marginTop: 16,
                  opacity: 0.9,
                }}
              >
                <div
                  className="job-meta"
                  style={{
                    gap: 8,
                  }}
                >
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