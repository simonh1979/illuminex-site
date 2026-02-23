import LiveJobsClient from "@/components/LiveJobsClient";

export default function LiveJobsPage() {
  return (
    <main className="page page-jobs">
      {/* HERO (only the top banner content) */}
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
            Live Jobs
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 980,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            Search and filter live opportunities across the UK. This page is
            JobAdder-ready — we’ll replace the mock feed with JobAdder Open API
            once you’re set up.
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