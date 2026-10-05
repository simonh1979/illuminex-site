// C:\Users\simon\Documents\illuminex-site\src\app\about\page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Building Materials & Construction Products",
  description:
    "Learn about Illuminex Consultancy, combining real building materials and construction products experience with commercial consultancy, executive search and specialist recruitment across the UK and USA East Coast.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About | Building Materials & Construction Products | Illuminex Consultancy",
    description:
      "Learn about Illuminex Consultancy, combining real building materials and construction products experience with commercial consultancy, executive search and specialist recruitment across the UK and USA East Coast.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="page page-about">
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
            Built on real industry experience, where commercial judgement and reputation matter.
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 920,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            Illuminex was created from inside the industry, not looking in
            from the outside. Bringing real sector experience to the decisions
            that matter most. We understand the pressures behind growth,
            leadership, customer strategy and senior appointments because
            those challenges are familiar territory. Our role is to bring
            clear judgement, commercial perspective and a practical
            understanding of the building materials and construction products
            market to every assignment.
          </p>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Search, not CV sifting</h3>
              <p>
                We lead with market intelligence, mapping and targeted
                outreach, then assess capability, motivation and long-term fit
                before you ever meet.
              </p>
              <div className="sector-tag">Executive &amp; Specialist</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Commercial experience, not theory</h3>
              <p>
                Our perspective is shaped by more than 20 years working in
                sales and commercial leadership across building materials and
                construction products. That experience informs how we approach
                strategy, leadership, talent and growth.
              </p>
              <div className="sector-tag">Sector experience</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Integrity is non-negotiable</h3>
              <p>
                Straight advice, honest feedback and confidentiality
                throughout. We represent you properly and treat candidates as
                long-term relationships.
              </p>
              <div className="sector-tag">Trust &amp; discretion</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>UK &amp; USA East Coast</h3>
              <p>
                Our focus spans the UK and USA East Coast, supporting
                businesses across building materials and construction products
                with commercial consultancy, leadership and specialist
                recruitment requirements.
              </p>
              <div className="sector-tag">UK • USA East Coast</div>
            </div>

            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Discuss a current or upcoming hire</h3>
              <p>
                Share the outline of the role and what success looks like. We
                will provide a clear view of the market and the most
                appropriate way to approach the search.
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