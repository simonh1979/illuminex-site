import "server-only";

import { firefishRequest } from "./client";

type ConsiderCandidateInput = {
  CandidateRef: number;
};

export async function considerCandidateForJob(
  jobRef: number,
  candidateRef: number
): Promise<void> {
  if (!Number.isInteger(jobRef) || jobRef <= 0) {
    throw new Error("A valid Firefish job reference is required.");
  }

  if (!Number.isInteger(candidateRef) || candidateRef <= 0) {
    throw new Error("A valid Firefish candidate reference is required.");
  }

  const body: ConsiderCandidateInput = {
    CandidateRef: candidateRef,
  };

  await firefishRequest(
    `/api/v1.0/jobs/${jobRef}/considerations`,
    {
      method: "POST",
      body,
    }
  );
}