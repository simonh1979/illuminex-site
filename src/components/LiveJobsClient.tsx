"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
};

type ApiResponse = {
  total: number;
  jobs: Job[];
  facets: {
    sectors: string[];
    locations: string[];
  };
};

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

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export default function LiveJobsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // Read initial values from URL (so homepage search can deep-link later)
  const [keyword, setKeyword] = useState(sp.get("keyword") ?? "");
  const [sector, setSector] = useState(sp.get("sector") ?? "");
  const [location, setLocation] = useState(sp.get("location") ?? "");
  const [jobType, setJobType] = useState(sp.get("jobType") ?? "");
  const [experienceLevel, setExperienceLevel] = useState(
    sp.get("experienceLevel") ?? ""
  );

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Sync state if URL changes (back/forward nav)
  useEffect(() => {
    setKeyword(sp.get("keyword") ?? "");
    setSector(sp.get("sector") ?? "");
    setLocation(sp.get("location") ?? "");
    setJobType(sp.get("jobType") ?? "");
    setExperienceLevel(sp.get("experienceLevel") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const queryString = useMemo(() => {
    const qs = new URLSearchParams();
    if (keyword.trim()) qs.set("keyword", keyword.trim());
    if (sector.trim()) qs.set("sector", sector.trim());
    if (location.trim()) qs.set("location", location.trim());
    if (jobType.trim()) qs.set("jobType", jobType.trim());
    if (experienceLevel.trim()) qs.set("experienceLevel", experienceLevel.trim());
    return qs.toString();
  }, [keyword, sector, location, jobType, experienceLevel]);

  // Fetch results
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/jobs?${queryString}`, {


          method: "GET",
          headers: { "Accept": "application/json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = (await res.json()) as ApiResponse;

        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [queryString]);

  // Keep URL updated (premium UX + shareable links)
  function applyToUrl() {
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url, { scroll: false });
  }

  useEffect(() => {
    applyToUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

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

  return (
    <div className="jobs-shell">
      <div className="jobs-filters sector-card" style={{ gridColumn: "span 12" }}>
        <div className="jobs-filters-head">
          <div>
            <h3 style={{ marginBottom: 6 }}>Filter live jobs</h3>
            <p className="jobs-muted">
              Use keyword + filters to refine. Links are shareable.
            </p>
          </div>

          <button type="button" className="jobs-clear" onClick={clearAll}>
            Clear filters
          </button>
        </div>

        <div className="jobs-grid">
          <div className="jobs-field">
            <label>Keyword</label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Sales Director, Commercial, Specification…"
            />
          </div>

          <div className="jobs-field">
            <label>Sector</label>
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="">All sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="jobs-field">
            <label>Location</label>
            <input
              list="locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="UK wide, region, city, remote…"
            />
            <datalist id="locations">
              {locations.map((l) => (
                <option key={l} value={l} />
              ))}
            </datalist>
          </div>

          <div className="jobs-field">
            <label>Job Type</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Any</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="jobs-field">
            <label>Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className="jobs-field jobs-cta">
            <button type="button" className="search-cta" onClick={applyToUrl}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="jobs-results">
        <div className="jobs-results-head">
          <div className="jobs-count">
            {loading ? "Loading…" : `${data?.total ?? 0} role(s) found`}
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
            <h3>No matches</h3>
            <p className="jobs-muted">
              Try removing a filter, using a broader location, or clearing keyword.
            </p>
          </div>
        ) : (
          <div className="jobs-list">
            {data!.jobs.map((job) => (
              <article key={job.id} className="sector-card job-card">
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

                <div className="job-bottom">
                  <div className="job-salary">{job.salary ?? "Salary: DOE"}</div>

                  {/* Later: this becomes /live-jobs/[slug] and a JobAdder apply link */}
                  <a
                className="sector-cta"
                href={`/live-jobs/${slugify(job.title)}-${job.id}`}
              >
                View role
              </a>
      
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
