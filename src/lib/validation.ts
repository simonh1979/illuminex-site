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
