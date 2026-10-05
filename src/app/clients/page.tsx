// src/app/clients/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients | Executive Search & Specialist Recruitment",
  description:
    "Executive search and specialist recruitment for mid-to-senior and board-level sales, commercial and leadership appointments across building materials and construction products in the UK and USA East Coast.",
  alternates: {
    canonical: "/clients",
  },
  openGraph: {
    title:
      "Clients | Executive Search & Specialist Recruitment | Illuminex Consultancy",
    description:
      "Executive search and specialist recruitment for mid-to-senior and board-level sales, commercial and leadership appointments across building materials and construction products in the UK and USA East Coast.",
    url: "/clients",
    type: "website",
  },
};

export default function ClientsPage() {
  return (
    <main className="page page-clients">
      <section className="page-hero page-hero--clients">
        <div className="page-hero-inner">
          <div className="page-kicker">CLIENTS</div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            The right appointment deserves more than a recruitment process. It
            deserves to be delivered with integrity and commercial insight.
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 1180,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            When the person you appoint will influence customers, teams and
            commercial performance, the search needs to go beyond the CV.
            Illuminex brings first-hand knowledge of the building materials and
            construction products market to every assignment, helping clients
            assess the commercial judgement, leadership capability and sector
            credibility behind the individual. The aim is simple: to secure
            people who can help move the business forward and genuinely “move
            the needle” in the right direction.
          </p>

          <div
            className="sector-tag"
            style={{
              marginTop: 14,
              width: "fit-content",
            }}
          >
            UK • USA East Coast
          </div>

          {/* Top CTAs */}
          <div
            style={{
              marginTop: 22,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link className="sector-cta" href="/contact">
              Start a confidential brief
            </Link>
            <Link className="sector-cta-secondary" href="/jobs">
              View live roles
            </Link>
          </div>

          {/* Offer blocks */}
          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Exclusive retained executive search</h3>
              <p>
                Used for senior, confidential and business-critical
                appointments where the cost of getting it wrong is high. We
                commit fully to the search, map the market properly and
                approach selectively. Assessment is structured, referencing is
                thorough and the shortlist is deliberate, not inflated.
              </p>
              <p style={{ marginTop: 10 }}>
                You gain clarity on the talent landscape, controlled
                communication in the market and a process that protects your
                reputation at every stage.
              </p>
              <div className="sector-tag">Board &amp; Executive</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specialist strategic recruitment</h3>
              <p>
                For mid-to-senior sales and commercial appointments where
                sector knowledge, pace and precision all matter. The commercial
                model may differ from retained search, but the standard does
                not. We define the brief properly, search the right market and
                present candidates with the experience, judgement and
                credibility to perform in the role.
              </p>
              <div className="sector-tag">Mid–to–Senior</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Shortlists you can rely on</h3>
              <p>
                We look beyond job titles and CV history. Candidates are
                assessed against the commercial outcomes they have delivered,
                the decisions they have made, the relationships they have built
                and the way they lead and influence others. The aim is a
                shortlist with substance, not simply people who look right on
                paper.
              </p>
              <div className="sector-tag">Evidence-led</div>
            </div>

            {/* How we work */}
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we work</h3>
              <p style={{ marginBottom: 0 }}>
                Every search starts with clarity on the role, the commercial
                expectations behind it and what success will look like. From
                there, we map the market properly, approach discreetly and
                assess against evidence, not narrative. The process is
                structured, focused and designed to keep the right people
                moving through it.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>
                Disciplined process
              </div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Market mapping and targeted approach</h3>
              <p style={{ marginBottom: 0 }}>
                We identify the relevant competitor and adjacent markets,
                understand where the strongest talent is likely to sit and
                approach selectively with the right context. This gives clients
                a clearer view of the market, protects their reputation and
                keeps the search focused on quality rather than volume.
              </p>
              <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div className="sector-tag">Defined approach</div>
              <div className="sector-tag">UK • USA East Coast</div>
            </div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Assessment, insight and interview design</h3>
              <p style={{ marginBottom: 0 }}>
                We use structured assessment and, where appropriate, video
                interviews to give early insight into communication style,
                credibility and commercial judgement. Personality and
                behavioural tools can be included where they add value,
                alongside bespoke interview questions designed around the
                demands of the role. The aim is to help clients make a
                stronger, better-informed decision with less uncertainty.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>
                Substance and fit
              </div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Candidate respect and brand protection</h3>
              <p style={{ marginBottom: 0 }}>
                Strong candidates are often not actively looking. They respond
                to credibility, clarity and trust. We handle approaches
                carefully, represent the opportunity properly and keep
                communication honest throughout the process. That matters
                because every candidate interaction shapes how your business is
                seen in the market.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>
                Integrity first
              </div>
            </div>

            {/* Final CTA */}
            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Considering a retained or strategic hire?</h3>
              <p>
                Share the brief, the commercial expectations attached to the
                role and what success needs to look like. We will give you a
                clear view of the market, the likely competition for the right
                people and the most sensible route to securing the appointment.
              </p>

              <div className="sector-cta-row">
                <Link className="sector-cta" href="/contact">
                  Start a confidential brief
                </Link>
              </div>
            </div>

            {/* Back to homepage */}
            <div style={{ marginTop: 18 }}>
              <Link className="sector-cta" href="/">
                ← Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}