import { XMLParser } from "fast-xml-parser";
import type { Job } from "@/lib/mockJobs";

export type FirefishJob = Job & {
  applyUrl?: string;
  advertUrl?: string;
  closingDate?: string;
};

const DEFAULT_FIREFISH_JOB_BOARD_BASE_URL =
  "https://illuminex.current.jobs";

const FIREFISH_JOB_BOARD_BASE_URL = (
  process.env.FIREFISH_JOB_BOARD_BASE_URL ||
  DEFAULT_FIREFISH_JOB_BOARD_BASE_URL
).replace(/\/+$/, "");

const DEFAULT_FIREFISH_RSS_URL =
  `${FIREFISH_JOB_BOARD_BASE_URL}/rss/adverts/latest.aspx`;
  
function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function cleanText(value: unknown): string {
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;

    if (typeof obj.__cdata === "string") {
      return obj.__cdata.trim();
    }

    if (typeof obj["#text"] === "string") {
      return obj["#text"].trim();
    }
  }

  return String(value ?? "").trim();
}

function stripHtml(html: string): string {
  return html
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

function makeSummary(description: string): string {
  const plain = stripHtml(description);
  if (!plain) return "";

  const sentences =
    plain.match(/[^.!?]+[.!?]+(?:\s|$)/g)?.map((s) => s.trim()) ?? [];

  if (sentences.length === 0) {
    return plain;
  }

  return sentences.slice(0, 3).join(" ");
}

function normaliseJobType(value: string): "Permanent" | "Contract" {
  const v = value.toLowerCase();

  if (v.includes("contract") || v.includes("temporary") || v.includes("temp")) {
    return "Contract";
  }

  return "Permanent";
}

function inferExperienceLevel(
  title: string,
  role: string
): "Mid" | "Senior" | "Executive" {
  const text = `${title} ${role}`.toLowerCase();

  if (
    text.includes("director") ||
    text.includes("head of") ||
    text.includes("chief") ||
    text.includes("executive")
  ) {
    return "Executive";
  }

  if (
    text.includes("senior") ||
    text.includes("manager") ||
    text.includes("lead") ||
    text.includes("national account")
  ) {
    return "Senior";
  }

  return "Mid";
}

function formatSalary(item: any): string | undefined {
  const remuneration = cleanText(item["ffAdvert:Remuneration"]);
  if (remuneration) return remuneration;

  const min = Number(item["ffAdvert:MinimumPayment"] ?? 0);
  const max = Number(item["ffAdvert:MaximumPayment"] ?? 0);
  const rate = cleanText(item["ffAdvert:PaymentRate"]);
  const currency = cleanText(item["ffAdvert:Currency"]) || "GBP";

  if (!min && !max) return undefined;

  const symbol = currency === "GBP" ? "£" : `${currency} `;

  if (min && max && min !== max) {
    return `${symbol}${min.toLocaleString("en-GB")} – ${symbol}${max.toLocaleString(
      "en-GB"
    )}${rate ? ` ${rate}` : ""}`;
  }

  const amount = min || max;
  return `${symbol}${amount.toLocaleString("en-GB")}${rate ? ` ${rate}` : ""}`;
}

function mapFirefishItemToJob(item: any): FirefishJob {
  const ref = cleanText(item["ffAdvert:ReferenceNumber"] || item.guid);
  const title = cleanText(item["ffAdvert:Title"] || item.title);
  const role = cleanText(item["ffAdvert:Role"]);
  const description = cleanText(item.description);

  const location =
    cleanText(item["ffAdvert:LocationArea"]) ||
    cleanText(item["ffAdvert:Location"]) ||
    cleanText(item["ffAdvert:Country"]) ||
    "UK Wide";

  const sector =
    cleanText(item["ffAdvert:Discipline"]) ||
    cleanText(item["ffAdvert:Specialisation"]) ||
    "General";

  return {
    id: `FF-${ref}`,
    title,
    company: "Confidential Client",
    location,
    sector,
    jobType: normaliseJobType(cleanText(item["ffAdvert:JobType"])),
    experienceLevel: inferExperienceLevel(title, role),
    salary: formatSalary(item),
    postedAt: cleanText(item["ffAdvert:PostedDate"] || item.pubDate),
    summary: makeSummary(description),
    description,
    applyUrl: cleanText(item["ffAdvert:applyUrl"] || item.applyUrl),
    advertUrl: cleanText(item.link || item.guid),
    closingDate: cleanText(item["ffAdvert:ClosingDate"]),
  };
}

export async function firefishListJobs() {
  const url = process.env.FIREFISH_RSS_URL || DEFAULT_FIREFISH_RSS_URL;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Firefish RSS request failed (${res.status})`);
  }

  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: false,
    trimValues: true,
    cdataPropName: "__cdata",
  });

  const parsed = parser.parse(xml);
  const items = asArray(parsed?.rss?.channel?.item);

  const jobs = items
    .map(mapFirefishItemToJob)
    .filter((job) => job.id && job.title);

  return {
    jobs,
    total: jobs.length,
  };
}

export async function firefishGetJob(id: string) {
  const { jobs } = await firefishListJobs();

  return (
    jobs.find((job) => job.id.toUpperCase() === id.toUpperCase()) ?? null
  );
}