// C:\Users\simon\Documents\illuminex-site\src\app\live-jobs\[slug]\apply\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import ApplyFormClient from "@/components/ApplyFormClient";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    from?: string;
    sector?: string;
    location?: string;
    jobTitle?: string;
    jobId?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Apply | Illuminex Consultancy",
  description:
    "Submit your application confidentially. Executive search and specialist recruitment across UK professional and technical sectors.",
};

function getFallbackJobIdFromSlug(slug: string) {
  if (!slug) return "Unknown";

  const endMatch = slug.match(/(ILX-\d+)$/i);
  if (endMatch) return endMatch[1].toUpperCase();

  const anyMatch = slug.match(/(ILX-\d+)/i);
  if (anyMatch) return anyMatch[1].toUpperCase();

  const slugParts = slug.split("-");
  return slugParts[slugParts.length - 1] || "Unknown";
}

function getFallbackTitleFromSlug(slug: string) {
  const slugParts = slug.split("-");
  return slugParts
    .slice(0, -1)
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default async function ApplyPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const from =
    typeof sp.from === "string" && sp.from.trim() ? sp.from : "/live-jobs";

  const jobId =
    typeof sp.jobId === "string" && sp.jobId.trim()
      ? sp.jobId
      : getFallbackJobIdFromSlug(slug);

  const jobTitle =
    typeof sp.jobTitle === "string" && sp.jobTitle.trim()
      ? sp.jobTitle
      : getFallbackTitleFromSlug(slug);

  const sector =
    typeof sp.sector === "string" && sp.sector.trim() ? sp.sector : "";

  const location =
    typeof sp.location === "string" && sp.location.trim() ? sp.location : "";

  return (
    <main className="page page-apply">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div style={{ marginBottom: 18 }}>
            <Link className="sector-cta" href={from}>
              ← Back to results
            </Link>
          </div>

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
                sector={sector}
                location={location}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}