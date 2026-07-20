"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  packageItems?: JobPackageItem[];
  remoteWorking?: boolean;
};

type ApiResponse = {
  total: number;
  jobs: Job[];
  facets: {
    sectors: string[];
    locations: string[];
  };
};

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

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

function formatSalary(raw?: string): string {
  if (!raw) {
    return "";
  }

  return raw
    .replace(/\s*[-–—]\s*/g, " – ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function shortenSummary(summary: string, maximumLength = 260): string {
  const cleanSummary = summary.trim();

  if (cleanSummary.length <= maximumLength) {
    return cleanSummary;
  }

  const shortened = cleanSummary.slice(0, maximumLength);
  const finalSpace = shortened.lastIndexOf(" ");

  return `${shortened.slice(
    0,
    finalSpace > 0 ? finalSpace : maximumLength
  )}…`;
}

function LiveJobsClientInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(
    searchParams.get("keyword") ?? ""
  );

  const [sector, setSector] = useState(
    searchParams.get("sector") ?? ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") ?? ""
  );

  const [jobType, setJobType] = useState(
    searchParams.get("jobType") ?? ""
  );

  const [experienceLevel, setExperienceLevel] = useState(
    searchParams.get("experienceLevel") ?? ""
  );

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setKeyword(searchParams.get("keyword") ?? "");
    setSector(searchParams.get("sector") ?? "");
    setLocation(searchParams.get("location") ?? "");
    setJobType(searchParams.get("jobType") ?? "");
    setExperienceLevel(
      searchParams.get("experienceLevel") ?? ""
    );
  }, [searchParams]);

  const queryString = useMemo(() => {
    const query = new URLSearchParams();

    if (keyword.trim()) {
      query.set("keyword", keyword.trim());
    }

    if (sector.trim()) {
      query.set("sector", sector.trim());
    }

    if (location.trim()) {
      query.set("location", location.trim());
    }

    if (jobType.trim()) {
      query.set("jobType", jobType.trim());
    }

    if (experienceLevel.trim()) {
      query.set("experienceLevel", experienceLevel.trim());
    }

    return query.toString();
  }, [keyword, sector, location, jobType, experienceLevel]);

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/jobs?${queryString}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const result = (await response.json()) as ApiResponse;

        if (!cancelled) {
          setData(result);
        }
      } catch (loadError: unknown) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Something went wrong"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  function applyToUrl() {
    const url = queryString
      ? `${pathname}?${queryString}`
      : pathname;

    router.replace(url, {
      scroll: false,
    });
  }

  useEffect(() => {
    applyToUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  useEffect(() => {
  const banner = document.querySelector<HTMLElement>(
    ".jobs-register-banner"
  );

  const copy = document.querySelector<HTMLElement>(
    ".jobs-register-copy"
  );

  if (!banner || !copy) {
    return;
  }

  const textContainer = copy.parentElement;

  if (!textContainer) {
    return;
  }

  let animationFrame = 0;

  const updateRegisterBanner = () => {
    window.cancelAnimationFrame(animationFrame);

    animationFrame = window.requestAnimationFrame(() => {
      const isMobile = window.innerWidth <= 768;

      banner.style.setProperty("display", "grid", "important");

      banner.style.setProperty(
        "grid-template-columns",
        isMobile
          ? "minmax(0, 1fr)"
          : "minmax(0, 1fr) auto",
        "important"
      );

      banner.style.setProperty(
        "column-gap",
        isMobile ? "0" : "32px",
        "important"
      );

      banner.style.setProperty(
        "row-gap",
        isMobile ? "20px" : "0",
        "important"
      );

      banner.style.setProperty(
        "text-align",
        isMobile ? "center" : "left",
        "important"
      );

      textContainer.style.setProperty(
        "width",
        "100%",
        "important"
      );

      textContainer.style.setProperty(
        "max-width",
        "none",
        "important"
      );

      textContainer.style.setProperty(
        "min-width",
        "0",
        "important"
      );

      copy.style.setProperty(
        "display",
        "block",
        "important"
      );

      copy.style.setProperty(
        "width",
        "100%",
        "important"
      );

      copy.style.setProperty(
        "max-width",
        "none",
        "important"
      );

      copy.style.setProperty(
        "overflow-wrap",
        "normal",
        "important"
      );

      copy.style.setProperty(
        "word-break",
        "normal",
        "important"
      );

      copy.style.setProperty(
        "white-space",
        isMobile ? "normal" : "nowrap",
        "important"
      );

      if (
        !isMobile &&
        copy.scrollWidth > copy.clientWidth + 1
      ) {
        copy.style.setProperty(
          "white-space",
          "normal",
          "important"
        );
      }
    });
  };

  updateRegisterBanner();

  window.addEventListener(
    "resize",
    updateRegisterBanner
  );

  return () => {
    window.cancelAnimationFrame(animationFrame);

    window.removeEventListener(
      "resize",
      updateRegisterBanner
    );
  };
}, []);

  function clearAll() {
    setKeyword("");
    setSector("");
    setLocation("");
    setJobType("");
    setExperienceLevel("");
  }

  const sectors = data?.facets.sectors ?? [
    "Building Materials",
    "Construction",
    "Technical Sales",
    "Bathrooms",
    "Kitchens",
    "Education",
    "Healthcare",
  ];

  const locations = data?.facets.locations ?? [
    "UK Wide",
    "North West",
    "Midlands",
    "London & South East",
    "Remote",
  ];

  const currentResultsUrl = queryString
    ? `${pathname}?${queryString}`
    : pathname;

  return (
    <div className="jobs-shell">
      <div
        className="jobs-filters sector-card"
        style={{ gridColumn: "span 12" }}
      >
        <div className="jobs-filters-head">
          <div>
            <h3 style={{ marginBottom: 6 }}>
              Filter live jobs
            </h3>

            <p className="jobs-muted">
              Use keyword + filters to refine. Links are shareable.
            </p>
          </div>

          <button
            type="button"
            className="jobs-clear"
            onClick={clearAll}
          >
            Clear filters
          </button>
        </div>

        <div className="jobs-grid">
          <div className="jobs-field">
            <label>Keyword</label>

            <input
              value={keyword}
              onChange={(event) =>
                setKeyword(event.target.value)
              }
              placeholder="e.g. Sales Director, Commercial, Specification…"
            />
          </div>

          <div className="jobs-field">
            <label>Sector</label>

            <select
              value={sector}
              onChange={(event) =>
                setSector(event.target.value)
              }
            >
              <option value="">All sectors</option>

              {sectors.map((sectorOption) => (
                <option
                  key={sectorOption}
                  value={sectorOption}
                >
                  {sectorOption}
                </option>
              ))}
            </select>
          </div>

          <div className="jobs-field">
            <label>Location</label>

            <input
              list="locations"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              placeholder="UK wide, region, city, remote…"
            />

            <datalist id="locations">
              {locations.map((locationOption) => (
                <option
                  key={locationOption}
                  value={locationOption}
                />
              ))}
            </datalist>
          </div>

          <div className="jobs-field">
            <label>Job Type</label>

            <select
              value={jobType}
              onChange={(event) =>
                setJobType(event.target.value)
              }
            >
              <option value="">Any</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="jobs-field">
            <label>Experience Level</label>

            <select
              value={experienceLevel}
              onChange={(event) =>
                setExperienceLevel(event.target.value)
              }
            >
              <option value="">Any</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className="jobs-field jobs-cta">
            <button
              type="button"
              className="search-cta"
              onClick={applyToUrl}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div
        className="sector-card jobs-register-banner"
        style={{
          gridColumn: "span 12",
          marginTop: 18,
          marginBottom: 24,
          padding: "18px 26px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          alignItems: "center",
          columnGap: 32,
          borderRadius: 24,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "none",
            minWidth: 0,
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: 8,
              fontSize: "1.55rem",
              lineHeight: 1.25,
            }}
          >
            Not Seeing The Right Role?
          </h3>

          <p
            className="jobs-muted jobs-register-copy"
            style={{
              margin: 0,
              width: "100%",
              maxWidth: "none",
              lineHeight: 1.5,
              fontSize: "0.98rem",
            }}
          >
            Register your CV with Illuminex and we’ll contact you when suitable
            opportunities become available. Your details will always be handled
            confidentially.
          </p>
        </div>

        <a
          className="sector-cta"
          href="/candidates"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          Register Your CV
        </a>
      </div>

      <div className="jobs-results">
        <div className="jobs-results-head">
          <div className="jobs-count">
            {loading
              ? "Loading…"
              : `${data?.total ?? 0} role(s) found`}
          </div>
        </div>

        {error ? (
          <div className="jobs-error sector-card">
            <h3>Couldn’t load jobs</h3>
            <p className="jobs-muted">{error}</p>
          </div>
        ) : loading ? (
          <div className="jobs-skeleton">
            <div className="sector-card jobs-skel" />
            <div className="sector-card jobs-skel" />
            <div className="sector-card jobs-skel" />
          </div>
        ) : (data?.jobs?.length ?? 0) === 0 ? (
          <div className="jobs-empty sector-card">
            <h3>{queryString ? "No matches" : "No live vacancies currently available"}</h3>

            <p className="jobs-muted">
              {queryString
                ? "Try removing a filter, using a broader location, or clearing keyword."
                : "We are always interested in hearing from talented professionals across our specialist sectors. Register your CV and we will contact you when a suitable opportunity becomes available."}
            </p>
          </div>
        ) : (
          <div className="jobs-list">
            {data!.jobs.map((job) => {
              const salaryDisplay = job.salary
                ? formatSalary(job.salary)
                : "Competitive package, dependent on experience";

              const packageHighlights =
                job.packageItems?.slice(0, 3) ?? [];

              return (
                <article
                  key={job.id}
                  className="sector-card job-card"
                >
                  <div className="job-top">
                    <div>
                      <h3 className="job-title">
                        {job.title}
                      </h3>

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

                  <p className="job-summary">
                    {shortenSummary(job.summary)}
                  </p>

                  <div
                    style={{
                      marginTop: 16,
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.06)",
                      border:
                        "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 9,
                      }}
                    >
                      <span
                        className="sector-tag"
                        title="Salary"
                        style={{ marginTop: 0 }}
                      >
                        {salaryDisplay}
                      </span>

                      <span
                        className="sector-tag"
                        title="Employment type"
                        style={{ marginTop: 0 }}
                      >
                        {job.jobType}
                      </span>

                      <span
                        className="sector-tag"
                        title="Experience level"
                        style={{ marginTop: 0 }}
                      >
                        {job.experienceLevel}
                      </span>

                      {job.closingDate && (
                        <span
                          className="sector-tag"
                          title="Closing date"
                          style={{ marginTop: 0 }}
                        >
                          Closing {formatDate(job.closingDate)}
                        </span>
                      )}

                      {packageHighlights.map((item) => (
                        <span
                          key={`${item.label}-${item.value}`}
                          className="sector-tag"
                          title={`${item.label}: ${item.value}`}
                          style={{ marginTop: 0 }}
                        >
                          {item.value}
                        </span>
                      ))}
                    </div>

                    <div
                      className="job-bottom"
                      style={{
                        marginTop: 16,
                      }}
                    >
                      <div />

                      <a
                        className="sector-cta"
                        href={
                          `/live-jobs/${slugify(
                            job.title
                          )}-${job.id}` +
                          `?from=${encodeURIComponent(
                            currentResultsUrl
                          )}`
                        }
                      >
                        View role
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveJobsClient() {
  return (
    <Suspense fallback={null}>
      <LiveJobsClientInner />
    </Suspense>
  );
}
