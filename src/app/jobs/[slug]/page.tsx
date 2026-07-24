import type { Metadata } from "next";
import { getJobById } from "@/lib/jobsSource";
import LiveJobDetailClient from "./LiveJobDetailClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type StructuredJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
  description?: string;
  applyUrl?: string;
  advertUrl?: string;
  closingDate?: string;
};

function getJobIdFromSlug(slug: string): string | null {
  if (!slug) {
    return null;
  }

  const firefishEndMatch = slug.match(/(FF-\d+)$/i);

  if (firefishEndMatch) {
    return firefishEndMatch[1].toUpperCase();
  }

  const firefishAnyMatch = slug.match(/(FF-\d+)/i);

  if (firefishAnyMatch) {
    return firefishAnyMatch[1].toUpperCase();
  }

  const illuminexEndMatch = slug.match(/(ILX-\d+)$/i);

  if (illuminexEndMatch) {
    return illuminexEndMatch[1].toUpperCase();
  }

  const illuminexAnyMatch = slug.match(/(ILX-\d+)/i);

  if (illuminexAnyMatch) {
    return illuminexAnyMatch[1].toUpperCase();
  }

  return null;
}

function safeIsoDate(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function plainText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "’")
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/\s+/g, " ")
    .trim();
}

function createMetadataDescription(job: StructuredJob): string {
  const text = plainText(job.summary || job.description || "");

  if (!text) {
    return `${job.title} opportunity through Illuminex Consultancy.`;
  }

  return text.slice(0, 160).trim();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const jobId = getJobIdFromSlug(slug);

  if (!jobId) {
    return {
      title: "Role Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { job } = await getJobById(jobId);

  if (!job) {
    return {
      title: "Role Unavailable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const structuredJob = job as StructuredJob;
  const description = createMetadataDescription(structuredJob);
  const canonicalUrl = `/jobs/${slug}`;

  return {
    title: structuredJob.title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: "en_GB",
      url: canonicalUrl,
      siteName: "Illuminex Consultancy",
      title: `${structuredJob.title} | Illuminex Consultancy`,
      description,
      images: [
        {
          url: "/og-image.jpg",
          alt: "Illuminex Consultancy",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${structuredJob.title} | Illuminex Consultancy`,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LiveJobDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const jobId = getJobIdFromSlug(slug);

  let jobPostingJsonLd: Record<string, unknown> | null = null;

  if (jobId) {
    const { job, source } = await getJobById(jobId);

    if (job && source === "firefish") {
      const structuredJob = job as StructuredJob;

      const datePosted = safeIsoDate(structuredJob.postedAt);
      const validThrough = safeIsoDate(structuredJob.closingDate);

      jobPostingJsonLd = {
        "@context": "https://schema.org",
        "@type": "JobPosting",

        title: structuredJob.title,

        description:
          structuredJob.description || structuredJob.summary,

        identifier: {
          "@type": "PropertyValue",
          name: "Illuminex Consultancy",
          value: structuredJob.id,
        },

        ...(datePosted
          ? {
              datePosted,
            }
          : {}),

        ...(validThrough
          ? {
              validThrough,
            }
          : {}),

        employmentType:
          structuredJob.jobType === "Contract"
            ? "CONTRACTOR"
            : "FULL_TIME",

        hiringOrganization: {
          "@type": "Organization",
          name:
            structuredJob.company === "Confidential Client"
              ? "confidential"
              : structuredJob.company,
        },

        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressRegion: structuredJob.location,
            addressCountry: "GB",
          },
        },

        url: `https://www.illuminex.co.uk/jobs/${slug}`,
      };
    }
  }

  return (
    <>
      {jobPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobPostingJsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      <LiveJobDetailClient />
    </>
  );
}