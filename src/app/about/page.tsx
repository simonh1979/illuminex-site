// C:\Users\simon\Documents\illuminex-site\src\app\about\page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Executive Search & Specialist Recruitment | Illuminex Consultancy (UK)",
  description:
    "Illuminex Consultancy provides executive search and specialist recruitment for senior commercial and leadership roles. UK-wide delivery with discretion, pace and clear process.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Executive Search & Specialist Recruitment | Illuminex Consultancy (UK)",
    description:
      "Executive search and specialist recruitment for senior commercial and leadership roles. UK-wide delivery with discretion, pace and clear process.",
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
            Built for high-stakes hiring where reputation matters.
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
            Illuminex Consultancy delivers executive search and specialist recruitment across professional and technical sectors.
            We work with pace, discretion and integrity. We stay close to the detail, because the detail decides outcomes.
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
              <h3>Search, not CV-sifting</h3>
              <p>
                We lead with market intelligence, mapping and targeted outreach, then validate fit, motivation and delivery history before you ever meet.
              </p>
              <div className="sector-tag">Executive &amp; Specialist</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Clarity from day one</h3>
              <p>
                Role scope, target companies, compensation and selection process. Alignment early on maintains momentum and protects your employer brand.
              </p>
              <div className="sector-tag">Process &amp; precision</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Integrity is non-negotiable</h3>
              <p>
                Straight advice, honest feedback and confidentiality throughout. We represent you properly and treat candidates as long-term relationships.
              </p>
              <div className="sector-tag">Trust &amp; discretion</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>UK-wide coverage</h3>
              <p>
                National, regional and remote roles across the UK. We move with urgency, but quality and integrity remain the benchmark.
              </p>
              <div className="sector-tag">UK-wide</div>
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Discuss a current or upcoming hire</h3>
              <p>
                Share the outline of the role and what success looks like. We will provide a clear view of the market and the most appropriate way to approach the search.
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