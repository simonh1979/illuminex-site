"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Job = {
  id?: string | number;
  title?: string;
  location?: string;
  sector?: string;
  jobType?: string;
  experienceLevel?: string;
};

function normaliseJobs(input: any): Job[] {
  if (Array.isArray(input)) return input;
  if (input && Array.isArray(input.jobs)) return input.jobs;
  if (input && Array.isArray(input.data)) return input.data;
  return [];
}

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get("keyword") || "";
  const sector = searchParams.get("sector") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/jobs?${searchParams.toString()}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!cancelled) {
          setJobs(normaliseJobs(data));
          setSectors(data.facets?.sectors || []);
          setLocations(data.facets?.locations || []);
        }
      } catch {
        if (!cancelled) setJobs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/jobs?${params.toString()}`);
  };

  if (loading) {
    return (
      <main className="page page-jobs">
        <section className="page-body">
          <p>Loading roles…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page page-jobs">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">Live Jobs</div>
          <h1 className="page-title">Live Opportunities</h1>
          <p className="page-subtitle">
            Browse current roles and refine results using the filters.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="jobs-layout">

          {/* Sidebar Filters */}
          <aside className="jobs-sidebar sector-card">

            <h3>Refine Results</h3>

            <div className="filter-group">
              <label>Keyword</label>
              <input
                defaultValue={keyword}
                onBlur={(e) => updateFilter("keyword", e.target.value)}
                placeholder="Job title or keyword"
              />
            </div>

            <div className="filter-group">
              <label>Sector</label>
              <select
                value={sector}
                onChange={(e) => updateFilter("sector", e.target.value)}
              >
                <option value="">All</option>
                {sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <select
                value={location}
                onChange={(e) => updateFilter("location", e.target.value)}
              >
                <option value="">All</option>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

          </aside>

          <div className="jobs-results-head">

  <div className="jobs-count">
    {jobs.length} role{jobs.length !== 1 && "s"} found
  </div>

  <div className="jobs-active-filters">
{(keyword || sector || location) && (
  <button
    className="filter-clear"
    onClick={() => router.push("/live-jobs")}
  >
    Clear all
  </button>
)}
    {keyword && (
      <button
        className="filter-chip"
        onClick={() => updateFilter("keyword", "")}
      >
        {keyword} ✕
      </button>
    )}

    {sector && (
      <button
        className="filter-chip"
        onClick={() => updateFilter("sector", "")}
      >
        {sector} ✕
      </button>
    )}

    {location && (
      <button
        className="filter-chip"
        onClick={() => updateFilter("location", "")}
      >
        {location} ✕
      </button>
    )}

  </div>

</div>
          {/* Job Results */}
          <div className="jobs-shell">

            {jobs.length === 0 && <p>No roles found.</p>}

            {jobs.map((job, idx) => (
              <div key={(job.id ?? idx).toString()} className="sector-card job-card">

                <h3 className="job-title">{job.title ?? "Untitled role"}</h3>

                <div className="job-meta">
                  {job.location && <span>{job.location}</span>}

                  {job.sector && (
                    <>
                      <span className="job-dot">•</span>
                      <span>{job.sector}</span>
                    </>
                  )}

                  {job.jobType && (
                    <>
                      <span className="job-dot">•</span>
                      <span>{job.jobType}</span>
                    </>
                  )}

                  {job.experienceLevel && (
                    <>
                      <span className="job-dot">•</span>
                      <span>{job.experienceLevel}</span>
                    </>
                  )}
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>
    </main>
  );
}