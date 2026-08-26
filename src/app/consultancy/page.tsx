import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./consultancy.module.css";

export const metadata: Metadata = {
  title:
    "Consultancy | Building Materials & Construction Products | Illuminex Consultancy",
  description:
    "Specialist commercial consultancy for building materials and construction products, combining commercial strategy, sales leadership, market intelligence and talent insight.",
  alternates: {
    canonical: "/consultancy",
  },
};

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className={styles.sectionEyebrow}>
      <span className={styles.eyebrowLine} aria-hidden="true" />
      <span className={styles.eyebrowText}>{children}</span>
      <span className={styles.eyebrowLine} aria-hidden="true" />
    </div>
  );
}

export default function ConsultancyPage() {
  return (
    <main className={`page page-consultancy ${styles.page}`}>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroPanel}>
            <h1 className={styles.heroTitle}>
              Commercial strategy, leadership and market intelligence for the
              decisions that shape growth.
            </h1>

            <p className={styles.heroText}>
              Illuminex Consultancy works with senior leaders across building
              materials and construction products when growth, route to market,
              strategic accounts, sales structure, leadership or talent
              decisions need experienced commercial judgement and a clear view
              of the market.
            </p>

            <p className={styles.heroHook}>
              Commercial challenges rarely sit in isolation. Neither should the
              thinking used to solve them.
            </p>

            <div className={styles.heroActions}>
              <Link className="sector-cta" href="/contact">
                Discuss Your Commercial Priorities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONSULTANCY BODY ================= */}
      <section className={styles.body}>
        <div className={styles.bodyPanel}>
          {/* ================= THE ILLUMINEX DIFFERENCE ================= */}
          <section className={`${styles.section} ${styles.firstSection}`}>
            <SectionEyebrow>THE ILLUMINEX DIFFERENCE</SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              Commercial decisions are stronger when sector knowledge,
              leadership judgement and market insight come together.
            </h2>

            <p className={styles.sectionIntro}>
              One connected commercial perspective, grounded in how building
              materials and construction products actually reach the market.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Senior Commercial Experience</h3>
                <p>
                  Practical perspective grounded in routes to market, strategic
                  accounts, sales structure, leadership and commercial
                  execution.
                </p>
                <div className="sector-tag">Commercial judgement</div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Building Materials Knowledge</h3>
                <p>
                  Understanding how manufacturers, merchants, distributors,
                  buying groups, specification and direct sales connect across
                  the sector.
                </p>
                <div className="sector-tag">Sector credibility</div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Connected Intelligence</h3>
                <p>
                  Bringing market movement, competitor structures, leadership
                  capability, talent availability and remuneration into the
                  same commercial picture.
                </p>
                <div className="sector-tag">
                  Market &bull; Commercial &bull; Talent
                </div>
              </div>
            </div>
          </section>

          {/* ================= COMMERCIAL STRATEGY ================= */}
          <section className={styles.section}>
            <SectionEyebrow>
              COMMERCIAL STRATEGY{" "}
              <span className={styles.keepTogether}>&amp; GROWTH</span>
            </SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              Turn commercial ambition into sharper choices and stronger
              execution.
            </h2>

            <p className={styles.sectionIntro}>
              From route to market and strategic accounts to sales structure
              and channel priorities, the focus stays on what can genuinely{" "}
              <strong className={styles.highlight}>
                &ldquo;move the needle&rdquo;
              </strong>
              .
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Route to Market &amp; Channel Strategy</h3>
                <p>
                  Clarify where to play, how to reach the market and which
                  channels deserve greater commercial focus.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Merchant, Distribution &amp; Buying Group Strategy</h3>
                <p>
                  Strengthen priorities, relationships and execution across
                  merchant, distributor and buying-group networks.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Specification &amp; Direct Sales Strategy</h3>
                <p>
                  Shape the right balance between specification influence and
                  direct commercial activity.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Strategic &amp; National Accounts</h3>
                <p>
                  Improve customer planning, account focus and the quality of
                  strategic commercial relationships.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Sales Structure, Territories &amp; Accountability</h3>
                <p>
                  Align coverage, ownership and accountability around genuine
                  market and customer opportunity.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Commercial Growth &amp; Execution</h3>
                <p>
                  Turn commercial priorities into clear action, stronger
                  accountability and sustained momentum.
                </p>
              </div>
            </div>
          </section>

          {/* ================= COMMERCIAL LEADERSHIP ================= */}
          <section className={styles.section}>
            <SectionEyebrow>COMMERCIAL LEADERSHIP</SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              Bring experienced commercial leadership into the moments that
              matter most.
            </h2>

            <p className={styles.sectionIntro}>
              Senior support for growth, change and transition, alongside
              practical development for the leaders responsible for turning
              strategy into performance.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div
                className={`sector-card ${styles.card} ${styles.halfCard}`}
              >
                <h3>Fractional Sales &amp; Commercial Leadership</h3>

                <p>
                  Senior commercial support working alongside the existing
                  leadership team when additional perspective, focus or
                  continuity is needed.
                </p>

                <ul>
                  <li>Growth, change and commercial restructure</li>
                  <li>Sales priorities, structure and accountability</li>
                  <li>Key customers, channels and strategic accounts</li>
                  <li>Leadership continuity and permanent-leader transition</li>
                </ul>

                <div className="sector-tag">
                  Growth &bull; Change &bull; Transition
                </div>
              </div>

              <div
                className={`sector-card ${styles.card} ${styles.halfCard}`}
              >
                <h3>Sales Leadership &amp; Commercial Team Development</h3>

                <p>
                  Development centred on the real commercial challenges,
                  customers and priorities leaders and their teams are
                  responsible for delivering.
                </p>

                <ul>
                  <li>Sales Leadership &amp; Management Development</li>
                  <li>Strategic Account Growth &amp; Customer Planning</li>
                  <li>Commercial Negotiation &amp; Preparation</li>
                  <li>Coaching, Accountability &amp; Emerging Leaders</li>
                </ul>

                <div className="sector-tag">
                  Leadership &bull; Accounts &bull; Execution
                </div>
              </div>
            </div>
          </section>

          {/* ================= INTELLIGENCE ================= */}
          <section className={styles.section}>
            <SectionEyebrow>
              COMMERCIAL &amp; TALENT INTELLIGENCE
            </SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              See the market, the leadership landscape and the talent picture
              before you make the call.
            </h2>

            <p className={styles.sectionIntro}>
              Bring market movement, competitor structures, leadership signals
              and talent intelligence together before making an important
              commercial or hiring decision.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Market &amp; Commercial Intelligence</h3>
                <p>
                  Market movement, growth, consolidation, investment, routes to
                  market and changing customer or channel conditions.
                </p>
                <div className="sector-tag">Market direction</div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Competitor &amp; Leadership Intelligence</h3>
                <p>
                  Competitor structures, leadership movement, hiring activity
                  and the commercial signals shaping the sector.
                </p>
                <div className="sector-tag">
                  Structure &amp; leadership
                </div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Talent &amp; Remuneration Intelligence</h3>
                <p>
                  Talent mapping, availability, competitor talent research,
                  remuneration benchmarking and hiring feasibility.
                </p>
                <div className="sector-tag">Talent landscape</div>
              </div>

              <div
                className={`sector-card ${styles.card} ${styles.fullCard} ${styles.bridgeCard}`}
              >
                <h3>When the decision becomes a leadership appointment</h3>

                <p>
                  Where the requirement leads to a new appointment, the same
                  commercial and talent understanding can carry directly into
                  Illuminex Executive Search &amp; Specialist Recruitment.
                </p>
              </div>
            </div>
          </section>

          {/* ================= SECTOR FOCUS ================= */}
          <section className={styles.section}>
            <SectionEyebrow>BUILT FOR THIS MARKET</SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              Commercial perspective shaped by how building materials and
              construction products are bought, sold and specified.
            </h2>

            <p className={styles.sectionIntro}>
              From manufacturers, merchants and distributors to buying groups,
              specification, direct sales and strategic accounts, the advice
              starts with the commercial realities of your market.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Who We Work With</h3>
                <p>
                  Manufacturers, merchants, distributors, buying groups,
                  specialist suppliers and commercial leadership teams.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>How the Market Works</h3>
                <p>
                  Merchant and distribution networks, buying groups,
                  specification, direct sales and strategic and national
                  accounts.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Where We Focus</h3>
                <p>
                  Roofing, insulation, timber, heavyside materials, civils,
                  interiors, KBB and other specialist construction-product
                  categories.
                </p>
              </div>
            </div>
          </section>

          {/* ================= FINAL CTA ================= */}
          <section className={styles.ctaSection}>
            <div
              className={`sector-card sector-card--cta ${styles.ctaCard}`}
            >
              <SectionEyebrow>START A CONVERSATION</SectionEyebrow>

              <div className={styles.ctaLayout}>
                <div className={styles.ctaCopy}>
                  <h2 className={styles.ctaTitle}>
                    Bring the right commercial perspective to the table.
                  </h2>

                  <p className={styles.ctaText}>
                    If there is a commercial challenge, opportunity or
                    important decision on the table, that is the right time to
                    speak to Illuminex.
                  </p>

                  <p className={styles.ctaHook}>
                    The conversation starts with your business, not with a
                    service we are trying to sell.
                  </p>
                </div>

                <div className={`sector-card-actions ${styles.ctaActions}`}>
                  <Link className="sector-cta" href="/contact">
                    Talk to Illuminex Consultancy
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}