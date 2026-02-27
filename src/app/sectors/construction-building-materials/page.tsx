import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Construction & Building Materials Executive Search | Illuminex Consultancy (UK)",
  description:
    "UK-wide executive search and specialist recruitment for Construction & Building Materials. Senior commercial leadership, sales and board-level appointments delivered with discretion and rigour.",
  alternates: { canonical: "/sectors/construction-building-materials" },
  openGraph: {
    title: "Construction & Building Materials Executive Search | Illuminex Consultancy (UK)",
    description:
      "UK-wide executive search and specialist recruitment for Construction & Building Materials.",
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

          <h1 className="page-title">Construction &amp; Building Materials</h1>

          <p style={{ marginTop: 10, opacity: 0.9 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              ← Back to homepage sectors
            </Link>
          </p>

          <p className="page-subtitle">
            We support manufacturers, merchants, distribution and wider built environment businesses with senior hires
            that improve commercial performance. Expect a calm, discreet process, clear advice on the market, and
            properly tested shortlists you can appoint from with confidence.
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
              <h3>Executive search</h3>
              <p>
                Senior leadership appointments where confidentiality matters. We begin with structured market mapping,
                a targeted approach, and a disciplined assessment process that stands up to scrutiny.
              </p>
              <div className="sector-tag">Retained</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Commercial leadership</h3>
              <p>
                Commercial and sales leadership that genuinely changes outcomes. National and regional remit, key
                accounts, pricing and margin discipline, and the operating rhythm required to deliver.
              </p>
              <div className="sector-tag">Revenue-led</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Credible shortlists</h3>
              <p>
                Evidence-led selection focused on impact. Sector credibility, stakeholder management, leadership
                behaviours and a track record that matches your route to market and growth plan.
              </p>
              <div className="sector-tag">Assessment</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Sales Director • Commercial Director • Managing Director (MD) • CEO • CFO • Operations Director •
                National Sales Manager • National Account Manager • Regional Sales Manager • Regional Account Manager •
                Key Account Manager • Business Development Director
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* UK-wide coverage */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>UK-wide coverage</h3>
              <p>
                UK-wide delivery across England, Scotland, Wales and Northern Ireland. We cover national remits and
                regional hiring across the commercial hubs that matter, including multi-site networks and field-based
                teams.
              </p>
              <div className="sector-tag">UK National</div>
            </div>
          </div>

          {/* Process */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                1) Define the role, context and what success looks like • 2) Map the market and agree target profiles •
                3) Approach and qualify candidates discreetly • 4) Structured assessment with evidence • 5) Present a
                clear shortlist, then support the offer, referencing and close.
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
              <h3>Hiring in Construction &amp; Building Materials?</h3>

              <p>
                Send a confidential brief and we’ll give you a straight, practical view of the market, the competitive
                landscape and realistic timelines before you commit.
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