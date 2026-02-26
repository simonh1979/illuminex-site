// C:\Users\simon\Documents\illuminex-site\src\app\clients\page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients | Executive Search & Specialist Recruitment | Illuminex Consultancy (UK)",
  description:
    "Retained search and specialist recruitment for senior commercial and leadership appointments. Clear process, disciplined assessment, and shortlists built on evidence.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients | Executive Search & Specialist Recruitment | Illuminex Consultancy (UK)",
    description:
      "Retained search and specialist recruitment for senior commercial and leadership appointments. Clear process and evidence-led shortlists.",
    url: "/clients",
    type: "website",
  },
};

export default function ClientsPage() {
  return (
    <main className="page page-clients">
      <section className="page-hero page-hero--clients">
        <div className="page-hero-inner">
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Appointments that strengthen leadership, not just headcount.
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
            From Sales Director and commercial leadership to MD, CEO and CFO appointments, we run search with pace and discipline.
            Expect a clear process, transparent updates, and shortlists built on evidence, not volume.
          </p>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Retained search</h3>
              <p>
                For senior, confidential or business-critical roles. Structured market mapping, a targeted approach and rigorous assessment.
              </p>
              <div className="sector-tag">Board &amp; Exec</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Contingency recruitment</h3>
              <p>
                For mid-senior hires where speed matters. We still search properly and we still protect your brand.
              </p>
              <div className="sector-tag">Mid-Senior</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Shortlists you can trust</h3>
              <p>
                We screen for sector credibility, commercial outcomes and leadership behaviours, then present succinct, decision-ready profiles.
              </p>
              <div className="sector-tag">Evidence-led</div>
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Talk through your hire</h3>
              <p>
                If you’re hiring across building materials, construction, technical sales, bathrooms and kitchens, education or healthcare,
                we’ll advise on market conditions, competition and realistic timelines before you commit.
              </p>

              <div className="sector-cta-row">
                <Link className="sector-cta" href="/contact">
                  Start a confidential brief
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