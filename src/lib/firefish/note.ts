import "server-only";

import { firefishRequest } from "./client";

type AddCandidateNoteInput = {
  note: string;
};

export async function addCandidateNote(
  candidateRef: number,
  note: string
): Promise<void> {
  if (!Number.isInteger(candidateRef) || candidateRef <= 0) {
    throw new Error("A valid Firefish candidate reference is required.");
  }

  const cleanNote = note.trim();

  if (!cleanNote) {
    throw new Error("Candidate note text is required.");
  }

  const body: AddCandidateNoteInput = {
    note: cleanNote,
  };

  await firefishRequest(
    `/api/v1.0/candidates/${candidateRef}/activity/notes`,
    {
      method: "POST",
      body,
    }
  );
}