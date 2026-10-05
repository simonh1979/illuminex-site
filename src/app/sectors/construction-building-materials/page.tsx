import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Materials & Construction Products Recruitment",
  description:
    "Specialist recruitment across building materials and construction products, supporting mid-to-senior and board-level sales, commercial and leadership appointments in the UK and USA East Coast.",
  alternates: {
    canonical: "/sectors/construction-building-materials",
  },
  openGraph: {
    title:
      "Building Materials & Construction Products Recruitment | Illuminex Consultancy",
    description:
      "Specialist recruitment across building materials and construction products, supporting mid-to-senior and board-level sales, commercial and leadership appointments in the UK and USA East Coast.",
    url: "/sectors/construction-building-materials",
    type: "website",
  },
};

export default function ConstructionBuildingMaterialsPage() {
  return (
    <main className="page page-sector page-sector-construction">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">SECTOR</div>

          <h1 className="page-title">
            Construction &amp; Building Materials
          </h1>

          <p style={{ marginTop: 10, opacity: 0.9 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              ← Back to homepage sectors
            </Link>
          </p>

          <p className="page-subtitle">
            We work with manufacturers, merchants, distributors, buying groups
            and specialist suppliers across building materials and construction
            products, bringing sector knowledge and commercial understanding to
            leadership, growth and critical appointments. From commercial
            strategy and market insight to executive search and specialist
            recruitment, our approach is focused, discreet and grounded in real
            industry experience.
          </p>

          <div
            style={{
              marginTop: 22,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link className="sector-cta" href="/jobs">
              View live roles
            </Link>
            <Link className="sector-cta-secondary" href="/contact">
              Speak confidentially
            </Link>
          </div>

          {/* Authority cards */}
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
                Senior leadership appointments where confidentiality matters.
                We begin with structured market mapping, a targeted approach,
                and a disciplined assessment process that stands up to scrutiny.
              </p>
              <div className="sector-tag">Retained</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Commercial leadership</h3>
              <p>
                Commercial and sales leadership that genuinely changes outcomes.
                National and regional remit, key accounts, pricing and margin
                discipline, and the operating rhythm required to deliver.
              </p>
              <div className="sector-tag">Revenue-led</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Credible shortlists</h3>
              <p>
                Evidence-led selection focused on impact. Sector credibility,
                stakeholder management, leadership behaviours and a track
                record that matches your route to market and growth plan.
              </p>
              <div className="sector-tag">Assessment</div>
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
                Sales Director • Commercial Director • Managing Director • Chief
                Executive Officer • Chief Financial Officer • Operations
                Director • Head of Sales • National Sales Manager • National
                Account Manager • Regional Sales Manager • Regional Account
                Manager • Key Account Manager • Business Development Director
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* UK and USA East Coast coverage */}
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>UK &amp; USA East Coast</h3>
              <p>
                Our focus spans the UK and USA East Coast, supporting national,
                regional and field-based commercial requirements across the
                building materials and construction products sector.
              </p>
              <div className="sector-tag">UK • USA East Coast</div>
            </div>
          </div>

          {/* Process */}
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
                1) Define the role, context and what success looks like • 2) Map
                the market and agree target profiles • 3) Approach and qualify
                candidates discreetly • 4) Structured assessment with evidence
                • 5) Present a clear shortlist, then support the offer,
                referencing and close.
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
              <h3>Hiring in Construction &amp; Building Materials?</h3>

              <p>
                Send a confidential brief and we’ll give you a straight,
                practical view of the market, the competitive landscape and
                realistic timelines before you commit.
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