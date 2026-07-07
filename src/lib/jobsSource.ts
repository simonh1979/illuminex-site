import { mockJobs } from "@/lib/mockJobs";
import { firefishGetJob, firefishListJobs } from "@/lib/firefishJobs";

export type JobsSource = "firefish" | "mock";

export async function getJobsList() {
  try {
    const { jobs, total } = await firefishListJobs();

    return {
      jobs,
      total,
      source: "firefish" as JobsSource,
    };
  } catch {
    // Firefish unavailable → safe fallback
    return {
      jobs: mockJobs,
      total: mockJobs.length,
      source: "mock" as JobsSource,
    };
  }
}

export async function getJobById(id: string) {
  try {
    const job = await firefishGetJob(id);

    if (job) {
      return {
        job,
        source: "firefish" as JobsSource,
      };
    }
  } catch {
    // ignore and fall back
  }

  const fallback = mockJobs.find((j) => j.id === id) ?? null;

  return {
    job: fallback,
    source: "mock" as JobsSource,
  };
}