import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Construction & Building Materials Executive Search | Illuminex Consultancy (UK)",
  description:
    "UK-wide executive search and specialist recruitment for Construction & Building Materials. Senior commercial leadership, sales and board-level appointments delivered with discretion and precision.",
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

          <p className="page-subtitle">
            UK-wide executive search and specialist recruitment across manufacturers, merchants, distribution and the wider built environment.
            We deliver leadership and commercial hires with discretion, pace and properly tested shortlists.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="sector-cta" href="/live-jobs">
              View live roles
            </Link>
            <Link className="jobs-clear" href="/contact">
              Speak confidentially
            </Link>
          </div>

          {/* Authority cards */}
          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Executive search</h3>
              <p>
                Board and senior leadership appointments where confidentiality matters. Structured mapping, targeted approach and disciplined assessment.
              </p>
              <div className="sector-tag">Retained</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Commercial leadership</h3>
              <p>
                Sales and commercial roles that move the dial — national and regional footprints, key accounts and revenue strategy.
              </p>
              <div className="sector-tag">Revenue-led</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Credible shortlists</h3>
              <p>
                Evidence-led selection focused on outcomes: sector credibility, stakeholder impact, leadership behaviours and commercial track record.
              </p>
              <div className="sector-tag">Assessment</div>
            </div>
          </div>

          {/* Typical appointments */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Typical appointments</h3>
              <p>
                Sales Director • Commercial Director • Managing Director (MD) • CEO • CFO • Operations Director • National Sales Manager • National Account Manager • Regional Sales Manager • Regional Account Manager • Key Account Manager • Business Development Director
              </p>
              <div className="sector-tag">Mid–Senior • Executive</div>
            </div>
          </div>

          {/* UK-wide coverage */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>UK-wide coverage</h3>
              <p>
                National, regional and multi-site hiring across England, Scotland, Wales and Northern Ireland — covering key regions and the commercial hubs that matter.
              </p>
              <div className="sector-tag">UK National</div>
            </div>
          </div>

          {/* Process */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we run search</h3>
              <p>
                1) Role definition and success outcomes → 2) Market mapping and targeted approach → 3) Structured assessment and evidence → 4) Shortlist presentation → 5) Offer support, referencing and close.
              </p>
              <div className="sector-tag">Disciplined process</div>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>FAQ</h3>

              <p style={{ marginTop: 10, fontWeight: 900 }}>Do you work retained or contingency?</p>
              <p style={{ opacity: 0.92 }}>
                Both. Retained tends to suit senior or confidential hires; contingency can work well for mid-senior roles where momentum is key. Either way, the process stays structured and brand-safe.
              </p>

              <p style={{ marginTop: 14, fontWeight: 900 }}>Can candidates register without applying for a live job?</p>
              <p style={{ opacity: 0.92 }}>
                Yes — register your CV on the Candidates page. If there’s a sensible fit, we’ll come back to you discreetly.
              </p>

              <p style={{ marginTop: 14, fontWeight: 900 }}>Are you UK-wide?</p>
              <p style={{ opacity: 0.92 }}>
                Yes. We support UK national and regional hiring and can cover multi-site operations.
              </p>

              <div className="sector-tag" style={{ marginTop: 12 }}>Clear answers</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Hiring in Construction &amp; Building Materials?</h3>
              <p>
                Send a confidential brief and we’ll give you a straight view on the market, the competition and realistic timelines — before you commit.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                <Link className="sector-cta" href="/contact">
                  Start a confidential brief
                </Link>
                <Link className="jobs-clear" href="/clients">
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