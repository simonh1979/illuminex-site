import type { Metadata } from "next";
import LiveJobsClient from "@/components/LiveJobsClient";

export const metadata: Metadata = {
  title: "Live Jobs",
  description:
    "Search current UK opportunities through Illuminex Consultancy across executive, specialist, professional and technical appointments.",
  alternates: {
    canonical: "/jobs",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/jobs",
    siteName: "Illuminex Consultancy",
    title: "Live Jobs | Illuminex Consultancy",
    description:
      "Search current UK opportunities through Illuminex Consultancy across executive, specialist, professional and technical appointments.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "Illuminex Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Jobs | Illuminex Consultancy",
    description:
      "Search current UK opportunities through Illuminex Consultancy across executive, specialist, professional and technical appointments.",
    images: ["/og-image.jpg"],
  },
};

export default function LiveJobsPage() {
  return (
    <main className="page page-jobs">
      {/* HERO (top banner content only) */}
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
            Live jobs
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
            Illuminex works on retained and confidential mandates across defined sectors.
            Some appointments may not be advertised publicly. Search current
            opportunities across the UK or refine your search by sector, location, job
            type and experience level.
          </p>
        </div>
      </section>

      {/* PAGE BODY (filters + results go here, NOT inside page-hero) */}
      <section className="page-body">
        <div className="jobs-shell">
          <LiveJobsClient />
        </div>
      </section>
    </main>
  );
}