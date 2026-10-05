// C:\Users\simon\Documents\illuminex-site\src\app\candidates\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import CandidateRegisterFormClient from "@/components/CandidateRegisterFormClient";

export const metadata: Metadata = {
  title: "Candidates | Building Materials Recruitment",
  description:
    "Register your CV and explore sales, commercial and leadership opportunities across building materials and construction products in the UK and USA East Coast, with discreet representation and straight communication.",
  alternates: {
    canonical: "/candidates",
  },
  openGraph: {
    title:
      "Candidates | Building Materials Recruitment | Illuminex Consultancy",
    description:
      "Register your CV and explore sales, commercial and leadership opportunities across building materials and construction products in the UK and USA East Coast, with discreet representation and straight communication.",
    url: "/candidates",
    type: "website",
  },
};

export default function CandidatesPage() {
  return (
    <main className="page page-candidates">
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
            Serious roles. Proper representation.
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
            We work with experienced sales, commercial and leadership
            professionals across building materials and construction products
            in the UK and USA East Coast, from established mid-level managers
            through to board and executive appointments. You can expect
            straight communication, honest feedback and a clear understanding
            of the market, the role and whether the opportunity genuinely makes
            sense for you.
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
              <h3>What you can expect</h3>
              <p>
                Clear role context, realistic expectations and a process that
                respects your time. If the opportunity is not right, we will
                tell you early and explain why.
              </p>
              <div className="sector-tag">Clarity</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Confidential representation</h3>
              <p>
                For senior moves, discretion matters. We handle approaches
                carefully, keep conversations confidential and never circulate
                your CV without permission.
              </p>
              <div className="sector-tag">Discretion</div>
            </div>

            {/* Candidate registration form (speculative) */}
            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>Register your CV</h3>
              <p style={{ marginBottom: 14 }}>
                Not applying for a live role? Register your CV and we can
                contact you discreetly when a relevant opportunity becomes
                available.
              </p>

              <CandidateRegisterFormClient />
            </div>

            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <h3>View live opportunities</h3>
              <p>
                Browse current roles across the UK and USA East Coast and refine
                your search by sector, location, job type and experience level.
              </p>

              <div className="sector-cta-row">
                <Link className="sector-cta" href="/jobs">
                  Search live jobs
                </Link>
                <Link className="sector-cta-secondary" href="/contact">
                  Speak confidentially
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}