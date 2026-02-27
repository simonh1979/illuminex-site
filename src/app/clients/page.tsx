// src/app/clients/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients | Executive Search & Specialist Recruitment | Illuminex Consultancy (UK)",
  description:
    "Retained executive search and specialist recruitment for senior commercial and leadership appointments. Clear process, disciplined assessment, and decision-ready shortlists built on evidence.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients | Executive Search & Specialist Recruitment | Illuminex Consultancy (UK)",
    description:
      "Retained executive search and specialist recruitment for senior commercial and leadership appointments. Clear process and evidence-led shortlists.",
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
            A disciplined search process, delivered with integrity.
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
            Illuminex supports organisations making senior commercial and leadership hires where the outcome matters.
            We run search with discipline and discretion, and we present shortlists built on evidence and judgement,
            not volume.
          </p>

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
            <Link className="sector-cta-secondary" href="/live-jobs">
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
    Used for senior, confidential and business-critical appointments where the cost of getting it wrong is high.
    We commit exclusively to the search, map the market properly and approach selectively.
    Assessment is structured, referencing is thorough and the shortlist is deliberate, not inflated.
  </p>
  <p style={{ marginTop: 10 }}>
    You gain clarity on the talent landscape, controlled communication in the market and a process
    that protects your reputation at every stage.
  </p>
  <div className="sector-tag">Board &amp; Executive</div>
</div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specialist strategic recruitment</h3>
              <p>
                For mid to senior hires where speed and precision both matter.
                The commercial structure is different, but the standards are not.
                You still get a disciplined search and a shortlist you can trust.
              </p>
              <div className="sector-tag">Mid–Senior</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Shortlists you can rely on</h3>
              <p>
                We assess beyond CV narrative. Candidates are evaluated against commercial outcomes,
                leadership behaviours, stakeholder impact and decision-making track record.
              </p>
              <div className="sector-tag">Evidence-led</div>
            </div>

            {/* How we work (integrated, not a separate page) */}
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>How we work</h3>
              <p style={{ marginBottom: 0 }}>
                Every search starts with clarity on outcomes, stakeholders and what “good” looks like in the role.
                From there, we map the market properly, approach discreetly and assess against evidence, not narrative.
                The process is structured, but it is never over-engineered.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>Disciplined process</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Market mapping and targeted approach</h3>
              <p style={{ marginBottom: 0 }}>
                We identify the relevant competitor and adjacent markets, then approach candidates selectively with the right context.
                This protects your reputation and keeps the search focused on quality, not noise.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>Defined approach</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Assessment, insight and interview design</h3>
              <p style={{ marginBottom: 0 }}>
                We use structured assessment and, where appropriate, video interviews to give early insight into communication style and credibility.
                We can include personality and behavioural tools when they add value, and we build bespoke interview questions that test what matters:
                commercial judgement, leadership style and stakeholder impact. These are never used to overcomplicate or delay.
                They exist to reduce risk, highlight leadership style and ensure alignment with your company's core values and ethos.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>Substance and fit</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3>Candidate respect and brand protection</h3>
              <p style={{ marginBottom: 0 }}>
                Strong candidates are rarely active applicants.
                They respond to credibility, clarity and trust.
                We handle approaches with care, communicate honestly and ensure feedback is respectful, measured and constructive.
                How you treat people during hiring reflects your leadership.
              </p>
              <div className="sector-tag" style={{ marginTop: 12 }}>Integrity first</div>
            </div>

            {/* Final CTA (remove the blue pill completely) */}
            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Considering a retained or strategic hire?</h3>
              <p>
                Share the brief and the commercial expectations attached to the role.
                We will give you a clear, unvarnished view of the market,
                the level of competition and the most sensible route to secure the right appointment.
              </p>

              <div className="sector-cta-row">
                <Link className="sector-cta" href="/contact">
                  Start a confidential brief
                </Link>
              </div>
            </div>

            {/* Optional: quiet link back to Home (kept subtle) */}
            <p style={{ marginTop: 10, opacity: 0.9 }}>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                ← Back to homepage
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}