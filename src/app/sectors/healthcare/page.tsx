import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare Executive Search & Senior Recruitment | Illuminex Consultancy (UK)",
  description:
    "UK-wide executive search and senior recruitment in Healthcare. Operational leadership, commercial leadership and senior appointments delivered with discretion and a disciplined process.",
  alternates: { canonical: "/sectors/healthcare" },
  openGraph: {
    title: "Healthcare Executive Search & Senior Recruitment | Illuminex Consultancy (UK)",
    description:
      "UK-wide executive search and senior recruitment in Healthcare.",
    url: "/sectors/healthcare",
    type: "website",
  },
};

export default function HealthcareSectorPage() {
  return (
    <main className="page page-sector page-sector-healthcare">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">OUR SECTORS</div>

          <h1 className="page-title">Healthcare</h1>
<p style={{ marginTop: 10, opacity: 0.9 }}>
  <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
    ← Back to homepage sectors
  </Link>
</p>
          <p className="page-subtitle">
            We support healthcare organisations with senior and operational leadership hires across clinical,
            service and commercial functions. This is a people-and-standards environment — so we prioritise
            credibility, care, and decision-making that holds up under pressure.
          </p>

          {/* Top CTAs */}
          <div className="sector-cta-row">
            <Link className="sector-cta" href="/live-jobs">
              View live roles
            </Link>
            <Link className="sector-cta-secondary" href="/contact">
              Speak confidentially
            </Link>
          </div>

          {/* Authority cards */}
          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Senior operational leadership</h3>
              <p>
                Operational Directors, Heads of Service and senior leaders accountable for performance,
                patient experience, delivery standards and governance.
              </p>
              <div className="sector-tag">Leadership</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Clinical leadership</h3>
              <p>
                Clinical leaders who bring calm authority — balancing outcomes, people leadership and
                the realities of service delivery.
              </p>
              <div className="sector-tag">Clinical</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Structured, discreet search</h3>
              <p>
                A disciplined approach with evidence-led shortlists. We manage sensitive approaches carefully
                and keep your brand protected throughout.
              </p>
              <div className="sector-tag">Confidential</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Operations Director • Clinical Director • Head of Service • Service Manager • Regional Manager •
                Quality &amp; Governance Lead • Director of Care • Commercial Director • Business Development Director
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* UK-wide coverage */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>UK-wide coverage</h3>
              <p>
                National, regional and multi-site hiring across England, Scotland, Wales and Northern Ireland —
                with an emphasis on leadership that fits both the service model and local realities.
              </p>
              <div className="sector-tag">UK National</div>
            </div>
          </div>

          {/* Process */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                1) Role definition and success outcomes → 2) Market mapping and targeted approach → 3) Structured assessment and evidence →
                4) Shortlist presentation → 5) Offer support, referencing and close.
              </p>
              <div className="sector-tag">Disciplined process</div>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>FAQ</h3>

              <p style={{ marginTop: 10, fontWeight: 900 }}>Do you support confidential replacements?</p>
              <p style={{ opacity: 0.92 }}>
                Yes. We handle sensitive searches discreetly and keep communication tight. You’ll get clarity on approach,
                messaging and who is contacted — before anything moves.
              </p>

              <p style={{ marginTop: 14, fontWeight: 900 }}>Do you work retained or contingency?</p>
              <p style={{ opacity: 0.92 }}>
                Both. Retained is often the right fit for senior or sensitive appointments; contingency can work for roles where speed is key.
                Either way, the shortlist is evidence-led and properly referenced.
              </p>

              <p style={{ marginTop: 14, fontWeight: 900 }}>Can candidates register without applying?</p>
              <p style={{ opacity: 0.92 }}>
                Yes — register your CV on the Candidates page. If there’s a sensible fit, we’ll come back to you discreetly.
              </p>

              <div className="sector-tag" style={{ marginTop: 12 }}>Clear answers</div>
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
    <h3>Hiring within Healthcare?</h3>

    <p>
      Share the brief and the expectations for the role, and we’ll come back with
      a clear view of the market, realistic timelines and the best route to hire
      properly.
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