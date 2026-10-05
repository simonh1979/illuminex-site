import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Specialist Partner Network",
  description:
    "Access carefully selected specialist business support through the Illuminex Partner Network, including HR, payroll, accountancy, Health & Safety, business insurance and legal support.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title:
      "Services | Specialist Partner Network | Illuminex Consultancy",
    description:
      "Access carefully selected specialist business support through the Illuminex Partner Network, including HR, payroll, accountancy, Health & Safety, business insurance and legal support.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="page page-services">
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
            Specialist business support, through trusted partners.
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 1380,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            Running and growing a business often brings challenges that sit
            outside one area of expertise. The Illuminex Specialist Partner
            Network is being developed to give clients access to carefully
            selected professionals across the business-critical services they
            may need, without having to start the search from scratch.
            <br />
            <br />
            Every relationship will be chosen selectively. We will only
            introduce a specialist where we are comfortable putting the
            Illuminex name behind the relationship and believe they are the
            right fit for the client and the requirement.
          </p>

                    <div
            style={{
              marginTop: 24,
              display: "inline-flex",
              width: "fit-content",
              padding: "9px 16px",
              borderRadius: 999,
              fontSize: "0.98rem",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "0.025em",
              color: "rgba(255,255,255,0.96)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            UK • USA East Coast
          </div>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div
              className="sector-card"
              style={{ gridColumn: "span 4" }}
            >
              <h3>HR &amp; People</h3>

              <p>
                Access to specialist HR support for businesses that need
                practical help with people, policies, employee relations,
                organisational change and wider people-management requirements.
              </p>

              <div className="sector-tag">
                People • HR • Employment Support
              </div>
            </div>

            <div
              className="sector-card"
              style={{ gridColumn: "span 4" }}
            >
              <h3>Payroll</h3>

              <p>
                Trusted payroll support for businesses looking for accurate,
                dependable and professionally managed payroll services, whether
                supporting an established workforce or a growing team.
              </p>

              <div className="sector-tag">
                Payroll • Compliance • Support
              </div>
            </div>

            <div
              className="sector-card"
              style={{ gridColumn: "span 4" }}
            >
              <h3>Accountancy &amp; Tax</h3>

              <p>
                Introductions to experienced accountancy and tax specialists
                who can support businesses with financial reporting, taxation,
                planning and the wider financial responsibilities that come
                with running and growing a company.
              </p>

              <div className="sector-tag">
                Accounts • Tax • Business Finance
              </div>
            </div>

            <div
              className="sector-card"
              style={{ gridColumn: "span 4" }}
            >
              <h3>Health &amp; Safety</h3>

              <p>
                Access to specialist Health &amp; Safety support for businesses
                that need practical guidance around compliance, risk,
                documentation, training and safer working practices.
              </p>

              <div className="sector-tag">
                Compliance • Risk • Safety
              </div>
            </div>

            <div
              className="sector-card"
              style={{ gridColumn: "span 4" }}
            >
              <h3>Business Insurance</h3>

              <p>
                Introductions to trusted commercial insurance specialists who
                can help businesses understand their risks and put appropriate
                cover in place as their activities, people and responsibilities
                develop.
              </p>

              <div className="sector-tag">
                Commercial Cover • Risk • Protection
              </div>
            </div>

            <div
              className="sector-card"
              style={{ gridColumn: "span 4" }}
            >
              <h3>Legal &amp; Commercial Support</h3>

              <p>
                Access to appropriately qualified legal and commercial
                specialists where a business needs support around contracts,
                employment matters, commercial agreements or other areas
                requiring professional advice.
              </p>

              <div className="sector-tag">
                Legal • Contracts • Commercial
              </div>
            </div>

            <div
              className="sector-card"
              style={{
                gridColumn: "span 12",
                marginTop: 2,
              }}
            >
              <h3>The Illuminex Specialist Partner Network</h3>

              <p>
                This network is being built carefully rather than quickly.
                Partner businesses will be selected on the quality of their
                work, the way they treat clients and whether we are genuinely
                comfortable associating them with the Illuminex name.
              </p>

              <p style={{ marginTop: 14 }}>
                As relationships are established, individual partner details
                will be added here, giving clients the choice to contact a
                specialist directly or ask Illuminex to make a personal
                introduction and help explain the requirement.
              </p>

              <div className="sector-tag">
                Selected • Trusted • Personally Introduced
              </div>
            </div>

            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Looking for specialist business support?</h3>

              <p>
                Tell us what you need help with. If we have a trusted specialist
                within the Illuminex Partner Network who is right for the
                requirement, we can make the introduction and help get the
                conversation started.
              </p>

              <div className="sector-cta-row">
                <a className="sector-cta" href="/contact">
                  Ask Illuminex
                </a>
              </div>

              <p
                style={{
                  marginTop: 22,
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  opacity: 0.72,
                }}
              >
                Specialist partner services are delivered by independent
                businesses and professionals selected by Illuminex. Availability
                and service coverage will vary by partner, location and
                requirement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}