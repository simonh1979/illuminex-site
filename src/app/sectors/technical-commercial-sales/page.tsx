import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technical & Commercial Sales Executive Search | Illuminex Consultancy (UK)",
  description:
    "UK-wide executive search and specialist recruitment for Technical & Commercial Sales. Senior commercial leadership and high-performing sales appointments delivered with discretion and rigour.",
  alternates: { canonical: "/sectors/technical-commercial-sales" },
  openGraph: {
    title: "Technical & Commercial Sales Executive Search | Illuminex Consultancy (UK)",
    description:
      "UK-wide executive search and specialist recruitment for Technical & Commercial Sales.",
    url: "/sectors/technical-commercial-sales",
    type: "website",
  },
};

export default function TechnicalCommercialSalesSectorPage() {
  return (
    <main className="page page-sector page-sector-tech-sales">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">SECTOR</div>

          <h1 className="page-title">Technical &amp; Commercial Sales</h1>

          <p style={{ marginTop: 10, opacity: 0.9 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              ← Back to homepage sectors
            </Link>
          </p>

          <p className="page-subtitle">
            We appoint senior commercial leaders across technically led markets where credibility is earned, not assumed.
            These roles sit at the intersection of product, revenue and long term customer relationships. We focus on
            commercial judgement, sector depth and leaders capable of operating confidently at board level.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="sector-cta" href="/live-jobs">
              View live roles
            </Link>
            <Link className="sector-cta-secondary" href="/contact">
              Speak confidentially
            </Link>
          </div>

          {/* Key areas */}
          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Senior commercial leadership</h3>
              <p>
                Sales Directors, Commercial Directors and Heads of Sales accountable for revenue strategy,
                pricing discipline and national performance. Leaders who understand margin, pipeline health and
                how to create repeatable growth rather than short term uplift.
              </p>
              <div className="sector-tag">Director level</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>National and regional sales management</h3>
              <p>
                National Sales Managers, Regional Sales Managers and senior account leaders responsible for
                territory structure, team performance and sustainable account growth across the UK.
              </p>
              <div className="sector-tag">UK-wide</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Consultative and technical roles</h3>
              <p>
                Sales and specification professionals operating in complex buying environments where product
                knowledge, commercial clarity and stakeholder management are essential.
              </p>
              <div className="sector-tag">Technical markets</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Sales Director • Commercial Director • Head of Sales • National Sales Manager • Regional Sales Manager •
                National Account Manager • Key Account Manager • Business Development Director • Commercial Manager
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* How we work */}
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                We begin with clarity on outcomes, stakeholder expectations and commercial context. We map the market
                thoroughly, approach discreetly and assess against evidence, not impression. You receive a shortlist
                built on substance and relevance, not volume.
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
              <h3>Hiring in Technical &amp; Commercial Sales?</h3>
              <p>
                Share the brief, the commercial expectations and what success genuinely looks like.
                We will give you a straight view of the market, realistic timelines and the right
                approach for the level of hire.
              </p>

              <div className="sector-cta-row">
                <Link className="sector-cta" href="/contact">
                  Speak with Illuminex
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