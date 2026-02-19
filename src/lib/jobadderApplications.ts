import { jobadderFetch } from "@/lib/jobadderClient";
import { getJobAdderBoardId } from "@/lib/jobadderBoard";

export type SubmitApplicationInput = {
  jobId: string;         // your site ID (ILX-001 etc)
  jobAdId?: number;      // JobAdder job ad ID
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

export async function submitJobAdderApplication(
  input: SubmitApplicationInput
) {
  // 🔒 SAFETY: must have a JobAdder jobAdId to submit
  if (typeof input.jobAdId !== "number") {
    throw new Error(
      "Missing jobAdId (JobAdder Job Ad ID) — cannot submit to JobAdder."
    );
  }

  const boardId = await getJobAdderBoardId();
  const { firstName, lastName } = splitName(input.fullName);

  const payload: any = {
    jobAdId: input.jobAdId,
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
}
