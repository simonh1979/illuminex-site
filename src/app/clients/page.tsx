import Link from "next/link";

export default function ClientsPage() {
  return (
    <main className="page page-clients">
      <section className="page-hero page-hero--clients">
        <div className="page-hero-inner">
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Appointments that strengthen leadership, not just headcount.
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
            From Sales Director and Commercial leadership to MD/CEO/CFO appointments,
            we run search with pace and discipline. Expect a clear process,
            transparent updates, and shortlists built on evidence, not volume.
          </p>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Retained search</h3>
              <p>
                For senior, confidential or business-critical roles. Structured
                mapping, targeted approach, and rigorous assessment.
              </p>
              <div className="sector-tag">Board + Exec</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Contingency recruitment</h3>
              <p>
                For mid-senior hires where speed matters. We still search
                properly and we still protect your brand.
              </p>
              <div className="sector-tag">Mid-Senior</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Shortlists you can trust</h3>
              <p>
                We screen for sector credibility, commercial outcomes and
                leadership behaviours. Then present succinct, decision-ready profiles.
              </p>
              <div className="sector-tag">Evidence-Led</div>
            </div>

            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Talk through your hire</h3>
              <p>
                If you’re hiring across building materials, construction,
                technical sales, bathrooms, kitchens, education or healthcare.
                We will advise on market conditions, competition and realistic
                timelines, before you commit.
              </p>
              <Link className="sector-cta" href="/contact">
                Start a confidential brief
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}