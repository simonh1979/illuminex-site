import Link from "next/link";
import { headers } from "next/headers";
import ApplyFormClient from "@/components/ApplyFormClient";

type Job = {
  id: string;
  jobAdId?: number;
  title: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
};

function getJobIdFromSlug(slugParam: unknown) {
  // slugParam should normally be a string, but let's handle anything safely.
  const slug =
    typeof slugParam === "string"
      ? slugParam
      : Array.isArray(slugParam)
      ? slugParam.join("/")
      : "";

  if (!slug) return null;

  // 1) Preferred: ILX-001 at end
  const endMatch = slug.match(/(ILX-\d+)$/i);
  if (endMatch) return endMatch[1].toUpperCase();

  // 2) Fallback: ILX-001 anywhere in the slug
  const anyMatch = slug.match(/(ILX-\d+)/i);
  if (anyMatch) return anyMatch[1].toUpperCase();

  return null;
}

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";

  // In dev (including viewing from phone/tablet on your network), always use http
  if (process.env.NODE_ENV === "development") {
    return `http://${host}`;
  }

  // In production, respect proxy headers if present
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export const dynamic = "force-dynamic";

export default async function ApplyPage({
  params,
}: {
  params: { slug: string };
}) {

 const { slug } = await params;
const jobId = getJobIdFromSlug(slug);

  if (!jobId) {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Role not found</h3>
              <p className="jobs-muted">This link looks incomplete. Please return to Live Jobs and try again.</p>
              <div style={{ marginTop: 14 }}>
                <Link className="sector-cta" href="/live-jobs">Back to Live Jobs</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const baseUrl = await getBaseUrl();
  let job: Job | null = null;

  try {
    const res = await fetch(`${baseUrl}/api/jobs/${encodeURIComponent(jobId)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (res.ok) job = (await res.json()) as Job;
  } catch {
    job = null;
  }

  if (!job) {
    return (
      <main className="page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Role unavailable</h3>
              <p className="jobs-muted">This vacancy may have been filled or removed. Please return to Live Jobs.</p>
              <div style={{ marginTop: 14 }}>
                <Link className="sector-cta" href="/live-jobs">Back to Live Jobs</Link>
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
          <div className="jobs-shell" style={{ paddingBottom: 40 }}>
           <div className="sector-card apply-card" style={{ gridColumn: "span 12" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <h3 style={{ marginBottom: 8 }}>Apply — {job.title}</h3>
                  <div className="job-meta">
                    <span>{job.location}</span>
                    <span className="job-dot">•</span>
                    <span>{job.sector}</span>
                    <span className="job-dot">•</span>
                    <span>{job.jobType}</span>
                    <span className="job-dot">•</span>
                    <span>{job.experienceLevel}</span>
                  </div>
                  <p className="jobs-muted" style={{ marginTop: 10, maxWidth: 90 + "ch" }}>
                    {job.summary}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Link className="jobs-clear" href={`/live-jobs/${encodeURIComponent(slug)}`}>
                    Back to role
                  </Link>
                  <Link className="jobs-clear" href="/live-jobs">
                    All roles
                  </Link>
                </div>
              </div>

<div className="apply-grid" style={{ marginTop: 18 }}>
  {/* LEFT: Form */}
  <div className="apply-main">
    <h3 style={{ marginBottom: 10 }}>Your details</h3>
<p className="jobs-muted apply-intro" style={{ marginBottom: 16 }}>
  Please complete the form below. You can upload your CV and confirm acceptance of our Terms & Conditions.
</p>

    <ApplyFormClient jobId={job.id} jobTitle={job.title} jobAdId={job.jobAdId} />

  </div>

  {/* RIGHT: Summary panel */}
  <aside className="apply-aside">
    <h3 style={{ marginBottom: 10 }}>Your application</h3>

    <div className="apply-panel">
      <div className="apply-panel-row">
        <span>Role</span>
        <strong>{job.title}</strong>
      </div>
      <div className="apply-panel-row">
        <span>Location</span>
        <strong>{job.location}</strong>
      </div>
      <div className="apply-panel-row">
        <span>Sector</span>
        <strong>{job.sector}</strong>
      </div>
      <div className="apply-panel-row">
        <span>Type</span>
        <strong>{job.jobType}</strong>
      </div>
      <div className="apply-panel-row">
        <span>Level</span>
        <strong>{job.experienceLevel}</strong>
      </div>

      <div className="apply-panel-divider" />

      <p className="jobs-muted" style={{ margin: 0 }}>
        We treat all applications discreetly. If you have questions, use the note field in the form.
      </p>
    </div>
  </aside>
</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

