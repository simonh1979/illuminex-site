export default function ServicesPage() {
  return (
    <main className="page page-services">
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
            Recruitment today. Broader consultancy as we grow.
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
            Illuminex is established as an executive search and specialist recruitment consultancy.
            Over time, the platform will extend to include carefully selected partner services across HR,
            Payroll and Health & Safety. Introductions will be relationship-led and value-driven,
            not directory listings.
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
              <h3>Executive search</h3>
              <p>
                Senior and board-level appointments where discretion, structure and disciplined
                assessment are essential. Retained mandates managed with clarity and pace.
              </p>
              <div className="sector-tag">Retained search</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specialist recruitment</h3>
              <p>
                Mid-senior commercial and technical hires across defined sectors.
                Focused delivery with proper market mapping and brand protection.
              </p>
              <div className="sector-tag">Specialist</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Partner services</h3>
              <p>
                HR, Payroll and Health & Safety support via trusted specialist partners.
                Formal relationships will be introduced selectively where it strengthens client outcomes.
              </p>
              <div className="sector-tag">Consultancy network</div>
            </div>

            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Discuss your requirements</h3>
              <p>
                Whether you are hiring now or planning wider organisational support,
                we will advise on the appropriate structure and introduce the right expertise where required.
              </p>
              <div className="sector-cta-row">
                <a className="sector-cta" href="/contact">
                  Speak with Illuminex
                </a>
                <a className="sector-cta-secondary" href="/clients">
                  Client overview
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}