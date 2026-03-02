// src/app/live-jobs/[slug]/apply/page.tsx

import type { Metadata } from "next";
import ApplyFormClient from "@/components/ApplyFormClient";

type Props = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: "Apply | Illuminex Consultancy",
  description:
    "Submit your application confidentially. Executive search and specialist recruitment across UK professional and technical sectors.",
};

export default function ApplyPage({ params }: Props) {
  // Extract jobId from slug (last part after final dash)
  const slugParts = params.slug.split("-");
  const jobId = slugParts[slugParts.length - 1] || "Unknown";

  // Convert slug back to readable title (optional improvement)
  const jobTitle = slugParts
    .slice(0, -1)
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <main className="page page-apply">
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
            Apply for this role
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
            Your application will be handled discreetly and in line with our
            Privacy Policy.
          </p>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div
              className="sector-card sector-card--cta"
              style={{ gridColumn: "span 12" }}
            >
              <ApplyFormClient
                jobId={jobId}
                jobTitle={jobTitle}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}