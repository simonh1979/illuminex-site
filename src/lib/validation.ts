import { z } from "zod";

/**
 * Shared schema for your homepage job search inputs.
 * This is used later by API routes so nothing unsafe gets through.
 */
export const JobSearchSchema = z.object({
  keyword: z.string().trim().max(80).optional().default(""),
  sector: z.string().trim().max(60).optional().default(""),
  location: z.string().trim().max(60).optional().default(""),
  jobType: z.enum(["Permanent", "Contract"]).optional(),
  experienceLevel: z.string().trim().max(60).optional().default(""),
});

export type JobSearchInput = z.infer<typeof JobSearchSchema>;

export function parseJobSearch(input: unknown): JobSearchInput {
  return JobSearchSchema.parse(input);
}

/* =========================================================
   Shared security / form validation helpers
========================================================= */

export function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function looksLikeSuspiciousUrlSpam(value: string) {
  const text = value.toLowerCase();

  const indicators = [
    "http://",
    "https://",
    "www.",
    ".ru",
    ".cn",
    "telegram",
    "whatsapp",
    "bitcoin",
    "crypto",
    "viagra",
    "casino",
  ];

  return indicators.some((item) => text.includes(item));
}

export function isSafeUploadFilename(name: string) {
  if (!name) return false;

  const trimmed = name.trim();

  if (trimmed.length < 1 || trimmed.length > 180) return false;

  if (
    trimmed.includes("/") ||
    trimmed.includes("\\") ||
    trimmed.includes("..") ||
    trimmed.startsWith(".")
  ) {
    return false;
  }

  return true;
}

export function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function isJsonRequest(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  return contentType.toLowerCase().includes("application/json");
}

export function isMultipartRequest(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  return contentType.toLowerCase().includes("multipart/form-data");
}