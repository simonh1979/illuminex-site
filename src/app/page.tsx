export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Strategic Talent. Structured Delivery. Lasting Impact.</h1>
          <p>
            Illuminex Consultancy partners with organisations and professionals
            across Construction, Education and Healthcare — delivering
            accountable, relationship-led recruitment solutions.
          </p>
          <div className="hero-buttons">
            <a href="/contact" className="btn-primary">
              Partner With Us
            </a>
            <a href="/contact" className="btn-secondary">
              Explore Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* OUR SECTORS */}
      <section className="section section-light">
        <div className="container">
          <h2>Our Sectors</h2>

          <div className="card-grid">
            <div className="card">
              <h3>Construction & Building Materials</h3>
              <p>
                Supporting leadership, commercial and operational growth across
                the built environment.
              </p>
            </div>

            <div className="card">
              <h3>Education</h3>
              <p>
                Delivering trusted recruitment solutions with safeguarding and
                compliance at the forefront.
              </p>
            </div>

            <div className="card">
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
      <section className="section section-soft">
        <div className="container">
          <h2>Executive Search & Recruitment Solutions</h2>

          <p className="section-intro">
            Structured. Transparent. Accountable.
          </p>

          <div className="card-grid">
            <div className="card">
              <h3>Retained Executive Search</h3>
              <p>
                Confidential, research-led assignments focused on senior and
                strategic appointments.
              </p>
            </div>

            <div className="card">
              <h3>Permanent Recruitment</h3>
              <p>
                Targeted sourcing for long-term organisational growth.
              </p>
            </div>

            <div className="card">
              <h3>Fixed-Term & Contract Solutions</h3>
              <p>
                Flexible workforce support for transitional and project-based
                needs.
              </p>
            </div>

            <div className="card">
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
      <section className="section section-light">
        <div className="container">
          <h2>Beyond Recruitment</h2>

          <p className="section-intro">
            Through strategic partnerships, we provide access to:
          </p>

          <div className="card-grid">
            <div className="card">
              <h3>HR Advisory</h3>
            </div>

            <div className="card">
              <h3>Payroll Solutions</h3>
            </div>

            <div className="card">
              <h3>Health & Safety Consultancy</h3>
            </div>

            <div className="card">
              <h3>Workforce Planning Support</h3>
            </div>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "60px",
              fontWeight: 500,
            }}
          >
            Supporting sustainable growth beyond the hire.
          </p>
        </div>
      </section>
    </>
  );
}
