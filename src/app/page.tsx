export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1>Strategic Talent Solutions Built on Integrity.</h1>
          <p>
            Illuminex Consultancy partners with organisations and professionals
            across Construction, Education and Healthcare — delivering
            structured, transparent and accountable recruitment solutions.
          </p>
          <div className="hero-buttons">
            <a href="/contact" className="btn-primary">
              For Clients
            </a>
            <a href="/contact" className="btn-secondary">
              For Candidates
            </a>
          </div>
        </div>
      </section>

      {/* SECTORS PREVIEW */}
      <section style={{ padding: "100px 0", background: "#ffffff" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "60px" }}>
            Our Sectors
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px",
            }}
          >
            <div>
              <h3>Construction & Building Materials</h3>
              <p>
                Supporting leadership, commercial and operational growth across
                the built environment.
              </p>
            </div>

            <div>
              <h3>Education</h3>
              <p>
                Delivering trusted recruitment solutions with safeguarding and
                compliance at the forefront.
              </p>
            </div>

            <div>
              <h3>Healthcare</h3>
              <p>
                Partnering with healthcare providers to secure clinical and
                operational leadership talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RECRUITMENT SOLUTIONS */}
      <section
        style={{
          padding: "100px 0",
          background: "var(--light-bg)",
        }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Executive Search & Recruitment Solutions
          </h2>

          <p
            style={{
              textAlign: "center",
              marginBottom: "60px",
              fontWeight: "500",
            }}
          >
            Structured. Transparent. Accountable.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px",
            }}
          >
            <div>
              <h3>Retained Executive Search</h3>
              <p>
                Confidential, research-led assignments focused on senior and
                strategic appointments.
              </p>
            </div>

            <div>
              <h3>Permanent Recruitment</h3>
              <p>
                Targeted sourcing for long-term organisational growth.
              </p>
            </div>

            <div>
              <h3>Fixed-Term & Contract Solutions</h3>
              <p>
                Flexible workforce support for transitional and project-based
                needs.
              </p>
            </div>

            <div>
              <h3>Workforce Strategy & Advisory</h3>
              <p>
                Insight-led guidance on talent structure, succession planning
                and organisational design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEYOND RECRUITMENT */}
      <section
        style={{
          padding: "100px 0",
          background: "#ffffff",
        }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
            Beyond Recruitment
          </h2>

          <p style={{ textAlign: "center", marginBottom: "60px" }}>
            Through strategic partnerships, we provide access to:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
              textAlign: "center",
            }}
          >
            <div>HR Advisory</div>
            <div>Payroll Solutions</div>
            <div>Health & Safety Consultancy</div>
            <div>Workforce Planning Support</div>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "60px",
              fontWeight: "500",
            }}
          >
            Supporting sustainable growth beyond the hire.
          </p>
        </div>
      </section>
    </>
  );
}
