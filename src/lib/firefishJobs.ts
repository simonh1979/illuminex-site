import { XMLParser } from "fast-xml-parser";
import type { Job } from "@/lib/mockJobs";
import { getAdvertDetails } from "@/lib/firefish/advert";

export type JobPackageItem = {
  label: string;
  value: string;
};

export type FirefishJob = Job & {
  applyUrl?: string;
  advertUrl?: string;
  closingDate?: string;
  packageItems?: JobPackageItem[];
  remoteWorking?: boolean;
};

const DEFAULT_FIREFISH_JOB_BOARD_BASE_URL =
  "https://jobs.illuminex.co.uk";

const FIREFISH_JOB_BOARD_BASE_URL = (
  process.env.FIREFISH_JOB_BOARD_BASE_URL ||
  DEFAULT_FIREFISH_JOB_BOARD_BASE_URL
).replace(/\/+$/, "");

const DEFAULT_FIREFISH_RSS_URL =
  "https://jobs.illuminex.co.uk/rss/adverts/latest.aspx";

const EXECUTIVE_ROLE_TERMS = [
  "managing director",
  "chief executive",
  "chief operating officer",
  "chief financial officer",
  "ceo",
  "coo",
  "cfo",
  "chairman",
  "executive director",
  "group director",
  "board director",
];

const SENIOR_ROLE_TERMS = [
  "national account manager",
  "national sales manager",
  "commercial manager",
  "general manager",
  "head of sales",
  "head of commercial",
  "head of operations",
  "sales director",
  "commercial director",
  "operations director",
  "divisional director",
];

const PACKAGE_HEADING_PATTERN =
  /^(?:package|benefits|package\s*(?:&|and)\s*benefits|salary\s*(?:&|and)\s*benefits|remuneration\s*(?:&|and)\s*benefits|benefits\s*package|rewards|what(?:'|’)?s\s+on\s+offer|what\s+we\s+offer|the\s+offer)$/i;

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function cleanText(value: unknown): string {
  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;

    if (typeof objectValue.__cdata === "string") {
      return objectValue.__cdata.trim();
    }

    if (typeof objectValue["#text"] === "string") {
      return objectValue["#text"].trim();
    }
  }

  return String(value ?? "").trim();
}

function decodeCommonHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&pound;/gi, "£")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&rsquo;/gi, "’")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&ldquo;/gi, "“")
    .replace(/&rdquo;/gi, "”")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"');
}

function stripHtml(html: string): string {
  return decodeCommonHtmlEntities(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeSummary(description: string): string {
  const plainText = stripHtml(description);

  if (!plainText) {
    return "";
  }

  const sentences =
    plainText
      .match(/[^.!?]+[.!?]+(?:\s|$)/g)
      ?.map((sentence) => sentence.trim()) ?? [];

  if (sentences.length === 0) {
    return plainText;
  }

  return sentences.slice(0, 3).join(" ");
}

function normaliseJobType(value: string): "Permanent" | "Contract" {
  const normalisedValue = value.toLowerCase();

  if (
    normalisedValue.includes("contract") ||
    normalisedValue.includes("temporary") ||
    normalisedValue.includes("temp")
  ) {
    return "Contract";
  }

  return "Permanent";
}

function inferExperienceLevel(
  title: string,
  role: string
): "Mid" | "Senior" | "Executive" {
  const classificationSource = role.trim() || title.trim();

  const normalisedRole = classificationSource
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  if (
    EXECUTIVE_ROLE_TERMS.some((term) =>
      normalisedRole.includes(term)
    )
  ) {
    return "Executive";
  }

  if (
    SENIOR_ROLE_TERMS.some((term) =>
      normalisedRole.includes(term)
    )
  ) {
    return "Senior";
  }

  return "Mid";
}

function createPackageItem(
  itemHtml: string
): JobPackageItem | null {
  const strongLabelMatch = itemHtml.match(
    /<strong[^>]*>([\s\S]*?)<\/strong>/i
  );

  if (strongLabelMatch) {
    const label = stripHtml(strongLabelMatch[1])
      .replace(/:\s*$/, "")
      .trim();

    const value = stripHtml(
      itemHtml.replace(strongLabelMatch[0], "")
    )
      .replace(/^:\s*/, "")
      .trim();

    if (label && value) {
      return {
        label,
        value,
      };
    }
  }

  const plainItem = stripHtml(itemHtml);

  if (!plainItem) {
    return null;
  }

  const separatorIndex = plainItem.indexOf(":");

  if (separatorIndex > 0) {
    const label = plainItem
      .slice(0, separatorIndex)
      .trim();

    const value = plainItem
      .slice(separatorIndex + 1)
      .trim();

    if (label && value) {
      return {
        label,
        value,
      };
    }
  }

  return {
    label: "Benefit",
    value: plainItem,
  };
}

function findPackageSection(description: string): string {
  const headingMatches = Array.from(
    description.matchAll(
      /<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi
    )
  );

  for (let index = 0; index < headingMatches.length; index += 1) {
    const headingMatch = headingMatches[index];
    const headingText = stripHtml(headingMatch[2]);

    if (!PACKAGE_HEADING_PATTERN.test(headingText)) {
      continue;
    }

    const sectionStart =
      (headingMatch.index ?? 0) + headingMatch[0].length;

    const nextHeading = headingMatches[index + 1];
    const sectionEnd =
      nextHeading?.index ?? description.length;

    return description.slice(sectionStart, sectionEnd);
  }

  return "";
}

function extractPackageItems(
  description: string
): JobPackageItem[] {
  if (!description.trim()) {
    return [];
  }

  const sectionHtml = findPackageSection(description);

  if (!sectionHtml) {
    return [];
  }

  const listItems = Array.from(
    sectionHtml.matchAll(
      /<li[^>]*>([\s\S]*?)<\/li>/gi
    )
  );

  let items: JobPackageItem[] = [];

  if (listItems.length > 0) {
    items = listItems
      .map((match) => createPackageItem(match[1]))
      .filter(
        (item): item is JobPackageItem => Boolean(item)
      );
  } else {
    const paragraphItems = Array.from(
      sectionHtml.matchAll(
        /<p[^>]*>([\s\S]*?)<\/p>/gi
      )
    );

    items = paragraphItems
      .flatMap((match) =>
        match[1]
          .split(/<br\s*\/?>|\n/gi)
          .map((line) => createPackageItem(line))
      )
      .filter(
        (item): item is JobPackageItem => Boolean(item)
      );
  }

  const uniqueItems = new Map<string, JobPackageItem>();

  for (const item of items) {
    const key =
      `${item.label}|${item.value}`.toLowerCase();

    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, item);
    }
  }

  return Array.from(uniqueItems.values());
}

function addRemoteWorkingPackageItem(
  packageItems: JobPackageItem[],
  remoteWorking: boolean
): JobPackageItem[] {
  if (!remoteWorking) {
    return packageItems;
  }

  const alreadyIncluded = packageItems.some((item) => {
    const combinedText =
      `${item.label} ${item.value}`.toLowerCase();

    return (
      combinedText.includes("remote") ||
      combinedText.includes("working pattern") ||
      combinedText.includes("working arrangement")
    );
  });

  if (alreadyIncluded) {
    return packageItems;
  }

  return [
    {
      label: "Working pattern",
      value: "Remote working",
    },
    ...packageItems,
  ];
}

function formatSalaryFromValues(
  remuneration: string,
  minimumPayment: number,
  maximumPayment: number,
  paymentRate: string,
  currency: string
): string | undefined {
  if (remuneration.trim()) {
    return remuneration.trim();
  }

  if (!minimumPayment && !maximumPayment) {
    return undefined;
  }

  const currencySymbol =
    currency === "GBP" ? "£" : `${currency} `;

  if (
    minimumPayment &&
    maximumPayment &&
    minimumPayment !== maximumPayment
  ) {
    return (
      `${currencySymbol}${minimumPayment.toLocaleString("en-GB")} – ` +
      `${currencySymbol}${maximumPayment.toLocaleString("en-GB")}` +
      `${paymentRate ? ` ${paymentRate}` : ""}`
    );
  }

  const amount = minimumPayment || maximumPayment;

  return (
    `${currencySymbol}${amount.toLocaleString("en-GB")}` +
    `${paymentRate ? ` ${paymentRate}` : ""}`
  );
}

function formatSalary(item: any): string | undefined {
  return formatSalaryFromValues(
    cleanText(item["ffAdvert:Remuneration"]),
    Number(item["ffAdvert:MinimumPayment"] ?? 0),
    Number(item["ffAdvert:MaximumPayment"] ?? 0),
    cleanText(item["ffAdvert:PaymentRate"]),
    cleanText(item["ffAdvert:Currency"]) || "GBP"
  );
}

function mapFirefishItemToJob(item: any): FirefishJob {
  const reference = cleanText(
    item["ffAdvert:ReferenceNumber"] || item.guid
  );

  const title = cleanText(
    item["ffAdvert:Title"] || item.title
  );

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
    id: `FF-${reference}`,
    title,
    company: "Confidential Client",
    location,
    sector,
    jobType: normaliseJobType(
      cleanText(item["ffAdvert:JobType"])
    ),
    experienceLevel: inferExperienceLevel(title, role),
    salary: formatSalary(item),
    postedAt: cleanText(
      item["ffAdvert:PostedDate"] || item.pubDate
    ),
    summary: makeSummary(description),
    description,
    applyUrl: cleanText(
      item["ffAdvert:applyUrl"] || item.applyUrl
    ),
    advertUrl: cleanText(item.link || item.guid),
    closingDate: cleanText(
      item["ffAdvert:ClosingDate"]
    ),
    packageItems: extractPackageItems(description),
    remoteWorking: false,
  };
}

async function enrichJobFromAdvertApi(
  job: FirefishJob
): Promise<FirefishJob> {
  const referenceMatch = job.id.match(/^FF-(\d+)$/i);

  if (!referenceMatch) {
    return job;
  }

  const advertRef = Number(referenceMatch[1]);

  if (!Number.isInteger(advertRef) || advertRef <= 0) {
    return job;
  }

  try {
    const advert = await getAdvertDetails(advertRef);

    const advertDescription =
      advert.AdvertContent?.trim() ||
      job.description ||
      "";

    const extractedPackageItems =
      extractPackageItems(advertDescription);

    const packageItems =
      addRemoteWorkingPackageItem(
        extractedPackageItems,
        Boolean(advert.RemoteWorking)
      );

    const apiSalary = formatSalaryFromValues(
      advert.Remuneration || "",
      Number(advert.MinimumPayment ?? 0),
      Number(advert.MaximumPayment ?? 0),
      advert.PaymentRate || "",
      advert.Currency || "GBP"
    );

    const apiLocation =
      String(advert.LocationArea ?? "").trim() ||
      advert.SubLocation?.trim() ||
      job.location ||
      "UK Wide";

    return {
      ...job,
      title:
        advert.AdvertTitle?.trim() ||
        advert.JobTitle?.trim() ||
        job.title,
      location: apiLocation,
      sector:
        advert.Discipline?.trim() ||
        job.sector,
      jobType: normaliseJobType(
        advert.Type || job.jobType
      ),
      experienceLevel: inferExperienceLevel(
        advert.AdvertTitle || job.title,
        advert.Role || ""
      ),
      salary: apiSalary || job.salary,
      postedAt:
        advert.PostedDate ||
        job.postedAt,
      closingDate:
        advert.ClosingDate ||
        job.closingDate,
      description: advertDescription,
      summary: makeSummary(advertDescription),
      applyUrl:
        advert.ApplyUrl ||
        job.applyUrl,
      advertUrl:
        advert.AdvertURL ||
        job.advertUrl,
      remoteWorking: Boolean(advert.RemoteWorking),
      packageItems,
    };
  } catch {
    return job;
  }
}

export async function firefishListJobs() {
  const url =
    process.env.FIREFISH_RSS_URL ||
    DEFAULT_FIREFISH_RSS_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept:
        "application/rss+xml, application/xml, text/xml",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Firefish RSS request failed (${response.status})`
    );
  }

  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: false,
    trimValues: true,
    cdataPropName: "__cdata",
  });

  const parsed = parser.parse(xml);
  const items = asArray(parsed?.rss?.channel?.item);

  const rssJobs = items
    .map(mapFirefishItemToJob)
    .filter((job) => job.id && job.title);

  const jobs = await Promise.all(
    rssJobs.map(enrichJobFromAdvertApi)
  );

  return {
    jobs,
    total: jobs.length,
  };
}

export async function firefishGetJob(id: string) {
  const { jobs } = await firefishListJobs();

  return (
    jobs.find(
      (job) =>
        job.id.toUpperCase() === id.toUpperCase()
    ) ?? null
  );
}