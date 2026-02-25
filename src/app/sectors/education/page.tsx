import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Education Recruitment & Leadership Search | Illuminex Consultancy (UK)",
  description:
    "UK-wide recruitment and leadership search across education. Senior operational, commercial and leadership appointments delivered with clear process, safeguarding awareness and discretion.",
  alternates: { canonical: "/sectors/education" },
  openGraph: {
    title: "Education Recruitment & Leadership Search | Illuminex Consultancy (UK)",
    description:
      "UK-wide recruitment and leadership search across education — structured, discreet and safeguarding-aware.",
    url: "/sectors/education",
    type: "website",
  },
};

export default function EducationSectorPage() {
  return (
    <main className="page page-sector page-sector-education">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">OUR SECTORS</div>

          <h1 className="page-title">Education</h1>
<p style={{ marginTop: 10, opacity: 0.9 }}>
  <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
    ← Back to homepage sectors
  </Link>
</p>
          <p className="page-subtitle">
            We support education organisations with senior and leadership hiring delivered properly — safeguarding-aware, process-led and discreet.
            From operational leadership to commercial and support functions, we focus on appointments that protect standards and improve outcomes.
          </p>

          {/* Top CTAs */}
          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="sector-cta" href="/live-jobs">
              View live roles
            </Link>
            <Link className="sector-cta-secondary" href="/contact">
              Speak confidentially
            </Link>
          </div>

          {/* Core cards */}
          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Safeguarding-aware recruitment</h3>
              <p>
                Clear expectations, careful handling and a recruitment process that respects safeguarding requirements and protects reputation.
              </p>
              <div className="sector-tag">Compliance-first</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Leadership &amp; operations</h3>
              <p>
                Senior operational and leadership appointments where structure, stakeholder management and delivery matter day-to-day.
              </p>
              <div className="sector-tag">Operational leadership</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Commercial &amp; support functions</h3>
              <p>
                Commercial, HR and support hires that keep organisations running well — practical, capable people with the right judgement.
              </p>
              <div className="sector-tag">Senior support</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Operations Director • Head of Operations • Regional Manager • Business Manager • Finance Director • HR Lead • Safeguarding Lead • People Partner • Commercial Manager • Partnerships Manager
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* UK wide */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>UK-wide coverage</h3>
              <p>
                We support UK national and regional hiring across England, Scotland, Wales and Northern Ireland — including multi-site and distributed teams.
              </p>
              <div className="sector-tag">UK National</div>
            </div>
          </div>

          {/* Process */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                1) Define the role and success outcomes → 2) Map the market and approach carefully → 3) Evidence-led assessment and references → 4) Shortlist presentation → 5) Offer support and close.
              </p>
              <div className="sector-tag">Disciplined process</div>
            </div>
          </div>

       {/* CTA */}
<div
  style={{
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 18,
  }}
>
  <div
    className="sector-card sector-card--cta"
    style={{ gridColumn: "span 12" }}
  >
    <h3>Hiring within Education?</h3>

    <p>
      If you share the brief and what good looks like, we’ll give you a clear
      view of the market and the most sensible route to hire well without
      compromising standards.
    </p>

    <div className="sector-cta-row">
      <Link className="sector-cta" href="/contact">
        Start a confidential brief
      </Link>

      <Link className="sector-cta-secondary" href="/clients">
        How we work with clients
      </Link>
    </div>
  </div>
</div>

        </div>
      </section>
    </main>
  );
}   