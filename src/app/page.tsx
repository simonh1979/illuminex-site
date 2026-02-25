// C:\Users\simon\Documents\illuminex-site\src\app\page.tsx

import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";

export default function Home() {
  return (
    <main className="page-home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-texture" />

        <div className="hero-inner">
          <div className="hero-left">
            <h1>
              Strategic talent, delivered with clarity and precision. Partner with the people shaping tomorrow.
            </h1>

            <p>
              Illuminex Consultancy provides premium executive and specialist recruitment across professional sectors, delivering exceptional
              mid-to-senior talent solutions with integrity and focus.
            </p>
          </div>

          <div className="hero-right">
            <div className="search-card">
              <h3>Search Live Opportunities</h3>
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR SECTORS ================= */}
      <section className="sectors">
        <div className="sectors-inner">
          <div className="sectors-head">
            <div className="kicker">OUR SECTORS</div>

            <h2>Specialist markets. Senior appointments.</h2>

            <p className="sub">
              We work in defined sectors where credibility matters. The focus is simple: strong shortlists, straight advice and long-term
              relationships.
            </p>
          </div>

          <div className="sectors-grid">
            {/* 1) Construction & Building Materials */}
            <Link href="/sectors/construction-building-materials" className="sector-card sector-card--link">
              <h3>Construction &amp; Building Materials</h3>
              <p>Leadership and commercial hiring across manufacturers, distribution, merchants and the wider built environment.</p>
              <span className="sector-tag">UK-wide • Mid-Senior • Executive</span>
              <span className="sector-cta-mini">Explore Construction &amp; Building Materials</span>
            </Link>

            {/* 2) Technical & Commercial Sales */}
            <Link href="/sectors/technical-commercial-sales" className="sector-card sector-card--link">
              <h3>Technical &amp; Commercial Sales</h3>
              <p>Sales Directors, Commercial Directors and senior leadership aligned to complex, consultative markets.</p>
              <span className="sector-tag">High-trust search</span>
              <span className="sector-cta-mini">Explore Technical &amp; Commercial Sales</span>
            </Link>

            {/* 3) Bathrooms & Kitchens */}
            <Link href="/sectors/bathrooms-kitchens" className="sector-card sector-card--link">
              <h3>Bathrooms &amp; Kitchens</h3>
              <p>Specification-led, trade and retail leadership where product knowledge, channel understanding and credibility matter.</p>
              <span className="sector-tag">KBB • Merchant • Manufacturer</span>
              <span className="sector-cta-mini">Explore Bathrooms &amp; Kitchens</span>
            </Link>

            {/* 4) Education */}
            <Link href="/sectors/education" className="sector-card sector-card--link">
              <h3>Education</h3>
              <p>Recruitment delivered with safeguarding at the centre and standards protected throughout the process.</p>

              <div className="sector-card-actions">
                <span className="sector-tag">Compliance-first</span>
                <span className="sector-cta-mini" style={{ marginLeft: "auto" }}>
                  Explore Education
                </span>
              </div>
            </Link>

            {/* 5) Healthcare */}
            <Link href="/sectors/healthcare" className="sector-card sector-card--link">
              <h3>Healthcare</h3>
              <p>Clinical and operational leadership recruitment handled with care, discretion and proper process discipline.</p>

              <div className="sector-card-actions">
                <span className="sector-tag">Confidential search</span>

                <span className="sector-cta-mini" style={{ marginLeft: "auto" }}>
                  Explore Healthcare
                </span>
              </div>
            </Link>

            {/* 6) CTA */}
            <div className="sector-card sector-card--cta">
              <h3>Not sure where your role sits?</h3>
              <p>Tell us what you are hiring for and we will advise on the most sensible route to market.</p>

              <div className="sector-card-actions sector-card-actions--center">
                <Link href="/contact" className="sector-cta">
                  Speak with Illuminex
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}