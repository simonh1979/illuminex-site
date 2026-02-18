import Link from "next/link";

export default function CandidatesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 style={{ fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            Serious roles. Proper representation.
          </h1>

          <p style={{ marginTop: 16, maxWidth: 980, fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)", lineHeight: 1.75, opacity: 0.92 }}>
            We work with high-calibre candidates across professional and technical sectors. From regional leadership through to executive appointments.
            You’ll get straight communication, honest feedback and opportunities that make sense for your trajectory.
          </p>

          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>What you can expect</h3>
              <p>
                Clear role context and a process that respects your time. If it’s not right, we’ll tell you early.
              </p>
              <div className="sector-tag">Clarity</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Confidential search</h3>
              <p>
                For senior moves, discretion is essential. We handle approaches carefully and never trade on names. Integrity for us will always be our benchmark.
              </p>
              <div className="sector-tag">Discretion</div>
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Ready to explore live roles?</h3>
              <p>
                View current opportunities and filter by sector, location, job type and experience level.
              </p>
              <Link className="sector-cta" href="/live-jobs">Search Live Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
