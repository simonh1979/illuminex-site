// C:\Users\simon\Documents\illuminex-site\src\app\candidates\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import CandidateRegisterFormClient from "@/components/CandidateRegisterFormClient";

export const metadata: Metadata = {
  title: "Candidates | Register Your CV | Illuminex Consultancy (UK)",
  description:
    "Register your CV with Illuminex Consultancy. Executive search and specialist recruitment across UK professional and technical sectors. Discreet, straight communication and roles that make sense.",
  alternates: { canonical: "/candidates" },
  openGraph: {
    title: "Candidates | Register Your CV | Illuminex Consultancy (UK)",
    description:
      "Register your CV with Illuminex Consultancy. Discreet representation and roles aligned to your experience and direction.",
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
            We work with high-calibre candidates across professional and technical sectors, from regional leadership through to executive appointments.
            You can expect clear communication, honest feedback and opportunities that match your experience and direction.
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
                Clear role context and a process that respects your time. If it is not right, we will tell you early and explain why.
              </p>
              <div className="sector-tag">Clarity</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Confidential representation</h3>
              <p>
                For senior moves, discretion matters. We handle approaches carefully and never trade on names. Your information stays confidential.
              </p>
              <div className="sector-tag">Discretion</div>
            </div>

            {/* Candidate registration form (speculative) */}
            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Register your CV</h3>
              <p style={{ marginBottom: 14 }}>
                Not applying for a live role? Register your CV and we will respond discreetly when there is a sensible fit.
              </p>

              <CandidateRegisterFormClient />
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>View live opportunities</h3>
              <p>
                Browse current roles and filter by sector, location and experience level.
              </p>

              <div className="sector-cta-row">
                <Link className="sector-cta" href="/live-jobs">
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