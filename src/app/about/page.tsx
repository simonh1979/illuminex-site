export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 style={{ fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            Built for high-stakes hiring where reputation matters.
          </h1>

          <p style={{ marginTop: 16, maxWidth: 920, fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)", lineHeight: 1.75, opacity: 0.92 }}>
            Illuminex Consultancy delivers premium executive search and specialist recruitment across professional and technical sectors.
            We work with pace, discretion and integrity. We stay close to the detail, because the details decide outcomes.
          </p>

          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Search, not CV-sifting</h3>
              <p>
                We lead with market intelligence, mapping and targeted outreach, then validate fit, motivation and delivery history before you ever meet.
              </p>
              <div className="sector-tag">Executive + Specialist</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Clarity from day one</h3>
              <p>
                Role scope, target companies, compensation, and selection process. Aligned early to keep momentum and protect your employer brand.
              </p>
              <div className="sector-tag">Process + Precision</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Integrity is non-negotiable</h3>
              <p>
                Straight advice, honest feedback, and confidentiality throughout. We represent you properly and we treat candidates as long-term relationships.
              </p>
              <div className="sector-tag">Trust + Discretion</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>UK-wide coverage</h3>
              <p>
                National, regional and remote roles across the UK. We move quickly, but quality and integrity is our benchmark.
              </p>
              <div className="sector-tag">UK-Wide</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

