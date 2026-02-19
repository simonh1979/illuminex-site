import { jobadderFetch } from "@/lib/jobadderClient";
import { getJobAdderBoardId } from "@/lib/jobadderBoard";

/**
 * IMPORTANT:
 * JobAdder has "Core API" endpoints and "Job Board API" endpoints.
 * Your OpenAPI doc includes Job Board API: Job Applications.
 *
 * This file is written so it can be activated later with:
 * - OAuth connection (tokens saved)
 * - boardId resolved (env or auto-detected)
 * - real JobAdder JobAd id mapping (we’ll do that in the next step)
 */

export type SubmitApplicationInput = {
  jobId: string; // your website job ID (ILX-001 now; later this will map to JobAdder jobAdId)
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  message?: string;
};

function splitName(fullName: string) {
  const cleaned = (fullName || "").trim().replace(/\s+/g, " ");
  const parts = cleaned.split(" ");
  const firstName = parts.shift() || cleaned;
  const lastName = parts.join(" ") || " ";
  return { firstName, lastName };
}

/**
 * Submits an application to JobAdder Job Board API.
 * NOTE: The exact payload fields depend on JobAdder's endpoint schema.
 * This function is structured for easy adjustment once you have real credentials + a sample response.
 */
export async function submitJobAdderApplication(input: SubmitApplicationInput) {
  // 1) Need a boardId (env JOBADDER_BOARD_ID, or auto-resolve from /jobboards)
  const boardId = await getJobAdderBoardId();

  // 2) TODO NEXT STEP: map your input.jobId -> JobAdder jobAdId
  // For now we throw, because we don’t have JobAdder IDs yet.
  // Once live, we’ll store jobAdId on each job coming from JobAdder.
  throw new Error("JobAdder jobAdId mapping not configured yet");

  // Example code for later (DO NOT REMOVE, we’ll enable it when ready):
  /*
  const { firstName, lastName } = splitName(input.fullName);

  const payload: any = {
    boardId,
    // jobAdId: <real JobAdder job ad id>,
    applicant: {
      firstName,
      lastName,
      email: input.email,
      phone: input.phone,
      linkedinUrl: input.linkedin || undefined,
    },
    coverLetter: input.message || undefined,
  };

  const res = await jobadderFetch(`/jobboards/${boardId}/applications`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `JobAdder apply failed (${res.status})`);
  }

  return res.json();
  */
}
