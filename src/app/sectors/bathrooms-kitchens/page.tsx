import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bathrooms & Kitchens Recruitment | Illuminex Consultancy (UK)",
  description:
    "UK-wide executive search and specialist recruitment for Bathrooms & Kitchens. Senior commercial, specification and leadership appointments delivered with discretion and sector credibility.",
  alternates: { canonical: "/sectors/bathrooms-kitchens" },
  openGraph: {
    title: "Bathrooms & Kitchens Recruitment | Illuminex Consultancy (UK)",
    description:
      "UK-wide executive search and specialist recruitment for Bathrooms & Kitchens.",
    url: "/sectors/bathrooms-kitchens",
    type: "website",
  },
};

export default function BathroomsKitchensSectorPage() {
  return (
    <main className="page page-sector page-sector-kbb">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">SECTOR</div>

          <h1 className="page-title">Bathrooms &amp; Kitchens Recruitment</h1>

          <p style={{ marginTop: 10, opacity: 0.9 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              ← Back to homepage sectors
            </Link>
          </p>

          <p className="sector-hero-text">
            We work with manufacturers, merchants and specialist retailers across
            Bathrooms &amp; Kitchens to appoint senior commercial and leadership
            talent. This is a reputation-led market: growth is won through
            credibility, channel understanding, disciplined account management and
            a clear, consistent route to specification.
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

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Merchant &amp; trade channels</h3>
              <p>
                Regional and national sales leadership across builders’ merchants
                and trade supply networks, covering margin management, range
                discipline and territory performance. Particularly relevant where
                execution in the field needs tightening and growth must be
                delivered profitably.
              </p>
              <div className="sector-tag">Merchant network</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Retail &amp; showroom leadership</h3>
              <p>
                Sales leadership across builders’ merchants and trade supply
                networks, covering margin management, product mix, category
                performance and regional execution. Ideal for businesses that need
                stronger field effectiveness and tighter commercial control.
              </p>
              <div className="sector-tag">Retail</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specification &amp; project sales</h3>
              <p>
                Roles operating across housebuilders, contractors and design
                partners. Requiring confident stakeholder management, technical
                credibility and a structured approach to opportunity. Ideal where
                specification needs to be more repeatable and less dependent on
                individuals.
              </p>
              <div className="sector-tag">Specification</div>
            </div>

            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Planning a senior hire within KBB?</h3>
              <p style={{ marginBottom: 0 }}>
                Share the commercial brief, team structure and what “good” looks
                like. We’ll come back with a clear view of candidate availability,
                realistic timelines and the most effective route to shortlist.
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