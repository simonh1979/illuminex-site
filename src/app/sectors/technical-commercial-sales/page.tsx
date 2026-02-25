import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technical & Commercial Sales Executive Search | Illuminex Consultancy (UK)",
  description:
    "UK-wide executive search and specialist recruitment for Technical & Commercial Sales. Senior commercial leadership, sales directors and high-performing account management hires, handled with discretion and proper process.",
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
            We recruit senior commercial leadership across technically-led markets where credibility matters. These are roles that sit across product, revenue and long-term customer relationships. We focus on commercial judgement, sector understanding and leaders who can operate at board level.
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
          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Senior commercial leadership</h3>
              <p>
                Sales Directors, Commercial Directors and Heads of Sales accountable for revenue strategy, pricing discipline and national performance.
              </p>
              <div className="sector-tag">Director level</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>National and regional sales management</h3>
              <p>
                National Sales Managers, Regional Sales Managers and senior account leaders responsible for territory growth, margin and team performance.
              </p>
              <div className="sector-tag">UK-wide</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Consultative and technical roles</h3>
              <p>
                Sales and specification professionals operating in complex buying environments where product knowledge and commercial clarity are essential.
              </p>
              <div className="sector-tag">Technical markets</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Sales Director • Commercial Director • Head of Sales • National Sales Manager • Regional Sales Manager • National Account Manager • Key Account Manager • Business Development Director • Commercial Manager
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* How we work */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                We start with outcomes and stakeholder expectations, map the market properly, approach discreetly, then assess against evidence. You receive a shortlist you can trust, not a volume exercise.
              </p>
              <div className="sector-tag">Disciplined process</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Hiring in Technical &amp; Commercial Sales?</h3>
              <p>
                Share the brief and what good looks like. We’ll give you a clear view of the market, realistic timelines and the right approach for your level of hire.
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