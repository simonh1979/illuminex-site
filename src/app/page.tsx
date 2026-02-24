import Link from "next/link";
import HeroSearch from "../components/HeroSearch";

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
              Illuminex Consultancy provides premium executive and specialist recruitment across professional sectors,
              delivering exceptional mid-to-senior talent solutions with integrity and focus.
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

            <h2>Specialist markets. Serious appointments.</h2>

            <p className="sub">
              We focus on defined markets where credibility matters representing clients and candidates with precision,
              discretion and long-term partnership.
            </p>
          </div>

          <div className="sectors-grid">
            {/* ✅ Card is now a clickable Link */}
            <Link href="/sectors/construction-building-materials" className="sector-card sector-card--link">
              <h3>Construction &amp; Building Materials</h3>
              <p>
                Leadership and commercial hiring across manufacturers, distribution, merchants and the built environment.
              </p>

              <span className="sector-tag">UK-wide • Mid–Senior • Executive</span>

              {/* ✅ NEW CTA pill */}
              <span className="sector-cta-mini">Explore Construction &amp; Building Materials</span>
            </Link>

            <div className="sector-card">
              <h3>Technical &amp; Commercial Sales</h3>
              <p>
                Sales Directors, Commercial Directors and senior leadership aligned to complex, consultative markets.
              </p>
              <span className="sector-tag">High-trust search</span>
            </div>

            <div className="sector-card">
              <h3>Bathrooms &amp; Kitchens</h3>
              <p>
                Specification-led, trade and retail leadership — where product knowledge and credibility matter.
              </p>
              <span className="sector-tag">KBB • Merchant • Manufacturer</span>
            </div>

            <div className="sector-card">
              <h3>Education</h3>
              <p>
                Recruitment delivered with safeguarding, compliance and framework awareness, built in not bolted on.
              </p>
              <span className="sector-tag">Compliance-first</span>
            </div>

            <div className="sector-card">
              <h3>Healthcare</h3>
              <p>
                Clinical and operational leadership talent — handled with care, discretion and process discipline.
              </p>
              <span className="sector-tag">Confidential search</span>
            </div>

            <div className="sector-card sector-card--cta">
              <h3>Not sure where your role sits?</h3>
              <p>
                Tell us what you're hiring for, and we’ll advise on retained search or targeted contingency.
              </p>

              <a href="/contact" className="sector-cta">
                Speak with Illuminex
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}