import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./consultancy.module.css";

export const metadata: Metadata = {
  title: "Consultancy | Building Materials & Construction Products",

  description:
    "Specialist building materials and construction products consultancy for commercial growth, sales strategy, route to market, leadership and talent decisions.",

  alternates: {
    canonical: "/consultancy",
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/consultancy",
    siteName: "Illuminex Consultancy",
    title:
      "Consultancy | Building Materials & Construction Products | Illuminex Consultancy",
    description:
      "Specialist building materials and construction products consultancy for commercial growth, sales strategy, route to market, leadership and talent decisions.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "Illuminex Consultancy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Consultancy | Building Materials & Construction Products | Illuminex Consultancy",
    description:
      "Specialist building materials and construction products consultancy for commercial growth, sales strategy, route to market, leadership and talent decisions.",
    images: ["/og-image.jpg"],
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
              Illuminex Consultancy works with Managing Directors, Chief
              Executive Officers, Sales Directors, Commercial Directors and
              senior leadership teams across building materials and
              construction products when growth is not where it needs to be,
              sales structures or routes to market need to change, key accounts
              or channels are underperforming, or the business needs stronger
              leadership and the right people around it.
            </p>

            <p className={styles.heroHook}>
              The starting point is simple: understand what is really getting
              in the way, challenge what is not working and focus the business
              on the changes that will genuinely{" "}
              <strong className={styles.highlight}>
                &ldquo;Move The Needle&rdquo;
              </strong>{" "}
              in the right direction, creating stronger, more profitable and
              sustainable growth.
            </p>

            <div className={styles.heroActions}>
              <Link className="sector-cta" href="/contact">
                Discuss Your Commercial Challenge
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
              Commercial problems are rarely about one thing. Sales, structure,
              leadership and people usually overlap.
            </h2>

            <p className={styles.sectionIntro}>
              That is why Illuminex looks at the whole commercial picture. The
              aim is to understand where the problem really sits, what is
              getting in the way and what needs to happen next, rather than
              trying to force every business into the same consultancy model.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Senior Commercial Experience</h3>
                <p>
                  Practical commercial judgement built around sales leadership,
                  routes to market, strategic accounts, customer development
                  and sales structure, with a clear focus on what needs to
                  happen next.
                </p>
                <div className="sector-tag">Commercial judgement</div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Building Materials Knowledge</h3>
                <p>
                  Knowledge of how manufacturers, merchants, distributors,
                  buying groups, specification, direct sales and strategic
                  customers work together across building materials and
                  construction products.
                </p>
                <div className="sector-tag">Sector credibility</div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Commercial &amp; Talent Insight</h3>
                <p>
                  A commercial plan is only as strong as the people expected to
                  deliver it. We look at structure, leadership, capability and
                  recruitment alongside the sales challenge, not after it.
                </p>
                <div className="sector-tag">
                  Commercial &bull; Leadership &bull; Talent
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
              Find what is holding growth back, remove the bottlenecks and give
              the business a clearer commercial direction.
            </h2>

            <p className={styles.sectionIntro}>
              Sometimes the issue is obvious. Often it is not. Sales can look
              busy while profitable growth stalls because account ownership is
              unclear, territories no longer fit, management is stretched, the
              route to market is wrong or too many priorities are competing for
              attention. Illuminex helps identify where the problem really sits
              and what needs to change first.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Route to Market &amp; Channel Strategy</h3>
                <p>
                  Are you selling through the right channels, to the right
                  customers and in the right way? Review where the opportunity
                  really sits and where margin, time or commercial effort may be
                  getting lost.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Merchant, Distribution &amp; Buying Group Strategy</h3>
                <p>
                  Strengthen how the business works with national and regional
                  merchants, distributors, buying groups and branch networks,
                  with clearer priorities around the customers and
                  relationships that can deliver profitable growth.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Specification &amp; Direct Sales Strategy</h3>
                <p>
                  Make sure specification activity and direct sales support the
                  wider commercial plan, with clear target customers, ownership
                  and follow-through from opportunity through to sale.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Strategic &amp; National Accounts</h3>
                <p>
                  Move important accounts beyond maintenance. Understand the
                  real opportunity, strengthen relationships, improve account
                  planning and negotiation, and make sure there is clear
                  ownership of how each customer is going to grow.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Sales Structure, Territories &amp; Accountability</h3>
                <p>
                  Review roles, territories, reporting lines, account ownership
                  and management responsibilities. Find the overlaps, gaps,
                  unclear ownership and bottlenecks before they become accepted
                  as simply how the business works.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Commercial Growth &amp; Market Expansion</h3>
                <p>
                  Assess the opportunity before committing significant time and
                  money. Whether the next move is a new sector, geography,
                  international market or taking a new product or range to
                  market, get clear on the customers, channels, commercial
                  approach and people needed to make it work.
                </p>
              </div>
            </div>
          </section>

          {/* ================= COMMERCIAL LEADERSHIP ================= */}
          <section className={styles.section}>
            <SectionEyebrow>COMMERCIAL LEADERSHIP</SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              When leadership is stretched, responsibilities are blurred or
              management relationships are getting in the way, commercial
              performance suffers.
            </h2>

            <p className={styles.sectionIntro}>
              Growth, change and commercial transition do not always wait for
              the next permanent appointment. Sometimes a business simply needs
              experienced sales and commercial leadership to work alongside the
              existing team, provide additional support and help keep the right
              commercial priorities moving forward.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div
                className={`sector-card ${styles.card} ${styles.halfCard}`}
              >
                <h3>Fractional Sales &amp; Commercial Leadership</h3>

                <p>
                  Senior commercial support when the existing team needs
                  additional experience, challenge and capacity to deal with a
                  defined business issue, improve performance or work through a
                  period of change.
                </p>

                <ul>
                  <li>Reset commercial priorities and restore momentum</li>
                  <li>Clarify roles, responsibilities and accountability</li>
                  <li>
                    Strengthen focus on key customers, channels and strategic
                    accounts
                  </li>
                  <li>
                    Help leadership teams work through change, restructure or
                    succession
                  </li>
                  <li>Bridge to a permanent senior appointment where needed</li>
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
                  Practical development built around the work your people are
                  doing now. Real customers, live accounts, current targets and
                  genuine management challenges provide the focus, rather than
                  an off-the-shelf training course.
                </p>

                <ul>
                  <li>Sales Leadership &amp; Management Development</li>
                  <li>Strategic Account Growth &amp; Customer Planning</li>
                  <li>Commercial Negotiation &amp; Preparation</li>
                  <li>Coaching, Accountability &amp; Performance Management</li>
                  <li>Emerging Leaders &amp; Succession Development</li>
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
              Make important commercial and hiring decisions with a clearer
              view of the market and the people in it.
            </h2>

            <p className={styles.sectionIntro}>
              Before changing a sales structure, entering a market, creating a
              senior role, setting remuneration or starting a search, it pays
              to understand what is happening outside your own business.
              Illuminex brings together public information, market research and
              sector knowledge to give leaders a clearer basis for the
              decision.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Market &amp; Commercial Intelligence</h3>
                <p>
                  Market movement, growth and decline, investment,
                  consolidation, competitor activity and changes in customers
                  or channels that may affect the commercial decisions in front
                  of you.
                </p>
                <div className="sector-tag">Market direction</div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Competitor &amp; Leadership Intelligence</h3>
                <p>
                  Publicly available information on competitor structures,
                  leadership movement, role patterns and hiring activity,
                  considered in the context of the building-materials market.
                </p>
                <div className="sector-tag">
                  Structure &amp; leadership
                </div>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Talent &amp; Remuneration Intelligence</h3>
                <p>
                  Talent mapping, likely source markets, candidate availability,
                  remuneration evidence and hiring feasibility to help test
                  whether the role, structure or salary being considered is
                  realistic.
                </p>
                <div className="sector-tag">Talent landscape</div>
              </div>

              <div
                className={`sector-card ${styles.card} ${styles.fullCard} ${styles.bridgeCard}`}
              >
                <h3>When the problem needs a person, not just a plan</h3>

                <p>
                  Sometimes the answer is a better plan, clearer accountability
                  or stronger leadership. Sometimes the business needs a
                  different person in a key role.
                  <br />
                  <br />
                  If the answer is a senior appointment, Illuminex does not
                  start with a generic job description. We already understand
                  the commercial problem, the market and the outcome the
                  business needs. That understanding can be used to shape the
                  brief, map the right talent and run an exclusive or retained
                  Executive Search with real commercial context from day one.
                </p>

                <div className="sector-card-actions">
                  <Link className="sector-cta" href="/contact">
                    Discuss a Senior Appointment
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTOR FOCUS ================= */}
          <section className={styles.section}>
            <SectionEyebrow>BUILT FOR THIS MARKET</SectionEyebrow>

            <h2 className={styles.sectionTitle}>
              Advice is only useful if it reflects how building materials and
              construction products are actually bought, sold and specified.
            </h2>

            <p className={styles.sectionIntro}>
              This is the market Illuminex knows. Manufacturers, merchants,
              distributors, buying groups, specification and direct sales each
              bring different commercial pressures. Good advice has to reflect
              how those relationships work in practice, not how they look on a
              slide.
            </p>

            <div className={`sectors-grid ${styles.grid}`}>
              <div className={`sector-card ${styles.card}`}>
                <h3>Who We Work With</h3>
                <p>
                  Building materials and construction product manufacturers,
                  merchants, distributors, buying groups, specialist suppliers
                  and the senior sales and commercial leaders responsible for
                  growth.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>How the Market Works</h3>
                <p>
                  National and regional merchants, specialist distribution,
                  buying groups, branch networks, specification, direct sales,
                  strategic and national accounts, and the relationships
                  between suppliers and customers.
                </p>
              </div>

              <div className={`sector-card ${styles.card}`}>
                <h3>Where We Focus</h3>
                <p>
                  Roofing, insulation, timber, heavyside materials, civils,
                  interiors, kitchens and bathrooms, and other specialist
                  construction-product categories where route to market, sales
                  leadership and commercial judgement matter.
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
                    If something is getting in the way of commercial growth,
                    start there.
                  </h2>

                  <p className={styles.ctaText}>
                    It might be sales structure, leadership, strategic
                    accounts, route to market, capability, talent, an
                    underperforming channel, a difficult senior hire, bringing
                    a new product to market or the next stage of expansion into
                    a new sector, geography or international market.
                  </p>

                  <p className={styles.ctaHook}>
                    You do not need to have all the answers before we speak.
                    Tell us where the business is today, where you want it to
                    get to and what is getting in the way. We will work from
                    there.
                  </p>
                </div>

                <div className={`sector-card-actions ${styles.ctaActions}`}>
                  <Link className="sector-cta" href="/contact">
                    Start a Confidential Conversation
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