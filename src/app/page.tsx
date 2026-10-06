import type { Metadata } from "next";
import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import TrackedSectorLink from "@/components/TrackedSectorLink";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="page-home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-texture protect-image no-context-menu" />

        <div className="hero-inner">
          <div className="hero-left protect-content no-context-menu">
            <h1>
              Commercial strategy and specialist recruitment, shaped by real
              industry experience.
            </h1>

            <p>
              Illuminex Consultancy partners with businesses across the building
              materials and construction products sector in the UK and Eastern USA, bringing more than 20 years of sales and commercial
              leadership experience to commercial challenges, leadership
              decisions and critical appointments.
              <br />
              <br />
              Our work spans consultancy and market insight, executive search
              and specialist recruitment. We help businesses make stronger
              commercial decisions, support leadership capability and deliver
              exceptional mid-to-senior and executive talent with integrity,
              precision and sector insight.
            </p>
          </div>

          <div className="hero-right">
            <div className="search-card">
              <h2>Search Live Opportunities</h2>

              <HeroSearch />

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/candidates"
                  className="sector-cta"
                  style={{
                    fontSize: 16,
                    padding: "18px 28px",
                    lineHeight: 1.4,
                    textAlign: "center",
                  }}
                >
                  Not Seeing The Right Role?
                  <br />
                  Register Your CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR SECTORS ================= */}
      <section className="sectors">
        <div className="sectors-inner">
          <div className="sectors-head protect-content no-context-menu">
            <div className="kicker">OUR SECTORS</div>

            <h2>Specialist markets. Commercial expertise.</h2>

            <p className="sub">
              We work across the building materials and construction products
              sector, partnering with manufacturers, merchants, distributors,
              buying groups and specialist suppliers. Our approach combines
              sector knowledge, commercial understanding and trusted long-term
              relationships.
            </p>
          </div>

          <div className="sectors-grid">
            {/* 1) Construction & Building Materials */}
            <TrackedSectorLink
              href="/sectors/construction-building-materials"
              sector="Construction & Building Materials"
              className="sector-card sector-card--link"
            >
              <h3>Construction &amp; Building Materials</h3>

              <p>
                Commercial leadership, specialist recruitment and consultancy
                across the building materials and construction products sector.
              </p>

              <span className="sector-tag">
                UK • Eastern USA • Mid to Senior • Executive
              </span>

              <span className="sector-cta-mini">
                Explore Construction &amp; Building Materials
              </span>
            </TrackedSectorLink>

            {/* 2) Technical & Commercial Sales */}
            <TrackedSectorLink
              href="/sectors/technical-commercial-sales"
              sector="Technical & Commercial Sales"
              className="sector-card sector-card--link"
            >
              <h3>Technical &amp; Commercial Sales</h3>

              <p>
                Senior sales and commercial leadership across technical,
                specification-led and consultative markets.
              </p>

              <span className="sector-tag">
                Sales • Commercial • Leadership
              </span>

              <span className="sector-cta-mini">
                Explore Technical &amp; Commercial Sales
              </span>
            </TrackedSectorLink>

            {/* 3) Bathrooms & Kitchens */}
            <TrackedSectorLink
              href="/sectors/bathrooms-kitchens"
              sector="Bathrooms & Kitchens"
              className="sector-card sector-card--link"
            >
              <h3>Bathrooms &amp; Kitchens</h3>

              <p>
                Commercial and sales leadership across bathroom and kitchen
                markets, spanning merchant, distribution, specification and
                retail channels.
              </p>

              <span className="sector-tag">
                KBB • Merchant • Distribution • Specification
              </span>

              <span className="sector-cta-mini">
                Explore Bathrooms &amp; Kitchens
              </span>
            </TrackedSectorLink>

            {/* 4) Client CTA */}
            <Link
              href="/contact"
              className="sector-card sector-card--cta sector-card--link"
            >
              <h3>Not sure where your role sits?</h3>

              <p>
                Tell us what you are hiring for and we will advise on the most
                sensible route to market. Whether the need is recruitment,
                commercial leadership or consultancy, we can help you decide the
                right next step.
              </p>

              <div className="sector-card-actions sector-card-actions--center">
                <span className="sector-cta">Speak with Illuminex</span>
              </div>
            </Link>

            {/* 5) Candidate Registration CTA */}
            <Link
              href="/candidates"
              className="sector-card candidate-register-cta sector-card--link homepage-candidate-cta"
              style={{
                padding: "28px 24px",
                display: "grid",
                gap: 18,
                justifyItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <div className="kicker">CANDIDATE REGISTRATION</div>

              <h3 style={{ margin: 0 }}>
                Not seeing the right opportunity?
              </h3>

              <p
                className="candidate-register-cta__text"
                style={{
                  margin: 0,
                  width: "100%",
                  lineHeight: 1.7,
                }}
              >
                Many of our senior searches are confidential and may not appear
                on the live jobs page straight away. Register your CV with
                Illuminex and we can contact you when a relevant opportunity
                becomes available.
              </p>

              <div
                className="sector-card-actions sector-card-actions--center candidate-register-cta__actions"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <span className="sector-cta candidate-register-cta__button">
                  Register Your CV
                </span>
              </div>

              <p className="candidate-register-trust">
                100% confidential. No CVs are shared without your permission.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}