import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Materials Executive Search & Recruitment | Illuminex Consultancy",
  description:
    "UK-wide executive search and specialist recruitment for the building materials sector. Commercial leadership hires across sales, key accounts, regional and national leadership.",
  alternates: { canonical: "/building-materials" },
  openGraph: {
    title: "Building Materials Executive Search & Recruitment | Illuminex Consultancy",
    description:
      "UK-wide executive search and specialist recruitment for the building materials sector. Commercial leadership hires across sales, key accounts, regional and national leadership.",
    url: "/building-materials",
    type: "website",
  },
};

export default function BuildingMaterialsPage() {
  return (
    <main className="page page-building-materials">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Building Materials Executive Search & Specialist Recruitment (UK)
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 980,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            UK-wide recruitment for commercial and leadership appointments in building materials.
            From Regional Sales Manager to Sales Director, National Sales Manager and MD/CEO.
            Search-led, discreet, and evidence-based.
          </p>

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
                Senior and confidential hires with structured mapping, targeted approach and rigorous assessment.
              </p>
              <div className="sector-tag">Retained</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specialist recruitment</h3>
              <p>
                Fast, focused delivery for mid-senior commercial roles, without compromising quality or brand.
              </p>
              <div className="sector-tag">Contingency</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Commercial leadership</h3>
              <p>
                Proven hires across Sales, Key Accounts, Regional/National leadership and General Management.
              </p>
              <div className="sector-tag">UK Wide</div>
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Typical roles we support</h3>
              <p style={{ marginBottom: 10 }}>
                Sales Director · National Sales Manager · National Account Manager · Regional Sales Manager ·
                Key Account Manager · Commercial Director · Managing Director · CEO · CFO (where relevant)
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="sector-cta" href="/contact">
                  Start a confidential brief
                </Link>
                <Link className="jobs-clear" href="/live-jobs">
                  View live roles
                </Link>
              </div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Why Illuminex</h3>
              <p>
                Clear process. Transparent updates. Shortlists built on evidence, not volume.
                Discretion and integrity are standard.
              </p>
              <div className="sector-tag">Process-led</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>UK coverage</h3>
              <p>
                National delivery with regional market understanding. From major hubs to hard-to-fill territories.
              </p>
              <div className="sector-tag">All regions</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}