"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const FIREFISH_JOB_BOARD_BASE_URL = (
  process.env.NEXT_PUBLIC_FIREFISH_JOB_BOARD_BASE_URL ||
  "https://jobs.illuminex.co.uk"
).replace(/\/+$/, "");

type JobPackageItem = {
  label: string;
  value: string;
};

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
  closingDate?: string;
  summary: string;
  description?: string;
  packageItems?: JobPackageItem[];
};

function getJobIdFromSlug(slug: string): string | null {
  if (!slug) {
    return null;
  }

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
 * Example:
 *
 * national-account-manager-building-materials-FF-3
 *
 * becomes:
 *
 * {FIREFISH_JOB_BOARD_BASE_URL}/job/
 * national-account-manager-building-materials-3/apply.aspx
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
    // Continue with the original slug when already decoded.
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
    return "/jobs";
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return "/jobs";
  }
}

function formatDate(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
    if (!job) {
      return;
    }

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
    if (!job) {
      return;
    }

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
    `/jobs/${encodeURIComponent(slug)}/apply` +
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

  const salaryDisplay =
    job.salary?.trim() ||
    "Competitive salary and package, dependent on experience";

  const closingDateDisplay = job.closingDate
    ? formatDate(job.closingDate)
    : "";

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
                style={{
                  marginTop: 22,
                  marginBottom: 26,
                  padding: "22px 24px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <h3 style={{ marginBottom: 18 }}>
                  Vacancy at a glance
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 18,
                  }}
                >
                  <div>
                    <div
                      className="jobs-muted"
                      style={{
                        marginBottom: 4,
                        fontSize: "0.88rem",
                      }}
                    >
                      Salary and package
                    </div>

                    <strong>{salaryDisplay}</strong>
                  </div>

                  <div>
                    <div
                      className="jobs-muted"
                      style={{
                        marginBottom: 4,
                        fontSize: "0.88rem",
                      }}
                    >
                      Location
                    </div>

                    <strong>{job.location}</strong>
                  </div>

                  <div>
                    <div
                      className="jobs-muted"
                      style={{
                        marginBottom: 4,
                        fontSize: "0.88rem",
                      }}
                    >
                      Sector
                    </div>

                    <strong>{job.sector}</strong>
                  </div>

                  <div>
                    <div
                      className="jobs-muted"
                      style={{
                        marginBottom: 4,
                        fontSize: "0.88rem",
                      }}
                    >
                      Employment type
                    </div>

                    <strong>{job.jobType}</strong>
                  </div>

                  <div>
                    <div
                      className="jobs-muted"
                      style={{
                        marginBottom: 4,
                        fontSize: "0.88rem",
                      }}
                    >
                      Experience level
                    </div>

                    <strong>{job.experienceLevel}</strong>
                  </div>

                  {closingDateDisplay && (
                    <div>
                      <div
                        className="jobs-muted"
                        style={{
                          marginBottom: 4,
                          fontSize: "0.88rem",
                        }}
                      >
                        Closing date
                      </div>

                      <strong>{closingDateDisplay}</strong>
                    </div>
                  )}
                </div>

                {job.packageItems && job.packageItems.length > 0 && (
                  <>
                    <hr
                      style={{
                        margin: "22px 0",
                        border: 0,
                        borderTop: "1px solid rgba(255,255,255,0.15)",
                      }}
                    />

                    <h4 style={{ marginBottom: 14 }}>
                      Package &amp; benefits
                    </h4>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: 12,
                      }}
                    >
                      {job.packageItems.map((item) => (
                        <div
                          key={`${item.label}-${item.value}`}
                          style={{
                            padding: "12px 14px",
                            borderRadius: 12,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <div
                            className="jobs-muted"
                            style={{
                              marginBottom: 4,
                              fontSize: "0.8rem",
                            }}
                          >
                            {item.label}
                          </div>

                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
                marginBottom: 16,
                lineHeight: 1.55,
              }}
            >
              <strong>
                Apply securely through the official Illuminex Candidate Portal.
              </strong>

              <br />
              <br />

              Your application, CV and supporting information are submitted directly into
              our recruitment system, where every application is personally reviewed by
              an Illuminex Recruitment Consultant.

              <br />
              <br />

              Existing candidates can simply sign in to continue their application. New
              applicants can create an account in less than a minute.
            </p>

            <a
              className="sector-cta"
              href={applyHref}
              onClick={trackApplyClick}
            >
              Apply Securely
            </a>

            <p
              className="jobs-muted"
              style={{
                marginTop: 18,
                marginBottom: 0,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.12)",
                fontSize: "0.84rem",
                lineHeight: 1.45,
              }}
            >
              🔒 Your CV and personal information are handled confidentially in accordance
              with our{" "}
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
          </aside>
          </div>
        </div>
      </section>
    </main>
  );
}