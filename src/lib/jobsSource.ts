import { mockJobs } from "@/lib/mockJobs";
import { jobAdderGetJob, jobAdderListJobs } from "@/lib/jobadderBoard";

export type JobsSource = "jobadder" | "mock";

export async function getJobsList() {
  try {
    const { jobs, total } = await jobAdderListJobs();
    return { jobs, total, source: "jobadder" as JobsSource };
  } catch {
    // Not connected (or API fails) → fallback
    return { jobs: mockJobs, total: mockJobs.length, source: "mock" as JobsSource };
  }
}

export async function getJobById(id: string) {
  try {
    const job = await jobAdderGetJob(id);
    if (job) return { job, source: "jobadder" as JobsSource };
  } catch {
    // ignore and fall back
  }

  const fallback = mockJobs.find((j) => j.id === id) ?? null;
  return { job: fallback, source: "mock" as JobsSource };
}
