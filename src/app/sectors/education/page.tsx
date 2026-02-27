import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Education Recruitment & Leadership Search | Illuminex Consultancy (UK)",
  description:
    "UK-wide recruitment and leadership search across education. Senior operational, commercial and leadership appointments delivered with a clear process, safeguarding awareness and discretion.",
  alternates: { canonical: "/sectors/education" },
  openGraph: {
    title: "Education Recruitment & Leadership Search | Illuminex Consultancy (UK)",
    description:
      "UK-wide recruitment and leadership search across education, structured, discreet and safeguarding-aware.",
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
            We support education organisations with senior and leadership hiring delivered properly. Safeguarding-aware,
            process-led and discreet. From operational leadership through to commercial and support functions, we focus
            on appointments that protect standards, strengthen delivery, and stand up to scrutiny.
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
                A professional process that respects safeguarding requirements and handles sensitive information with
                care. Clear expectations, proper documentation, and disciplined referencing where appropriate.
              </p>
              <div className="sector-tag">Safeguarding</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Leadership &amp; operations</h3>
              <p>
                Senior operational and leadership appointments where structure, stakeholder management and calm
                decision-making matter day to day. Practical leaders who keep standards high and delivery consistent.
              </p>
              <div className="sector-tag">Operations</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Commercial &amp; support functions</h3>
              <p>
                Commercial, HR, finance and support hires that make organisations run well. Capable people with sound
                judgement who can operate across multiple sites and stakeholder groups.
              </p>
              <div className="sector-tag">Support functions</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Operations Director • Head of Operations • Regional Manager • Business Manager • Finance Director • HR
                Lead • Safeguarding Lead • People Partner • Commercial Manager • Partnerships Manager
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* UK wide */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>UK-wide coverage</h3>
              <p>
                UK-wide and regional hiring across England, Scotland, Wales and Northern Ireland, including multi-site
                organisations and distributed teams.
              </p>
              <div className="sector-tag">UK National</div>
            </div>
          </div>

          {/* Process */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                1) Define the role, context and what good looks like • 2) Map the market and approach carefully • 3)
                Evidence-led assessment and referencing • 4) Present a clear shortlist • 5) Support the offer process
                and close.
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
            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Hiring within Education?</h3>

              <p>
                Share the brief and the standards that matter. We’ll give you a clear view of the market and the most
                sensible route to appoint well, without compromising on safeguarding or quality.
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