import LiveJobsClient from "@/components/LiveJobsClient";

export default function LiveJobsPage() {
  return (
    <main className="page page-jobs">
      {/* HERO (top banner content only) */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Live jobs
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 1180,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            Search current opportunities across the UK and filter by sector, location, job type and experience level.
            Once your JobAdder connection is live, this page will pull roles directly via the JobAdder Open API.
          </p>
        </div>
      </section>

      {/* PAGE BODY (filters + results go here, NOT inside page-hero) */}
      <section className="page-body">
        <div className="jobs-shell">
          <LiveJobsClient />
        </div>
      </section>
    </main>
  );
}