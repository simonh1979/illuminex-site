import { firefishGetJob, firefishListJobs } from "@/lib/firefishJobs";

export type JobsSource = "firefish" | "unavailable";

export async function getJobsList() {
  try {
    const { jobs, total } = await firefishListJobs();

    return {
      jobs,
      total,
      source: "firefish" as JobsSource,
    };
  } catch {
    // Never expose fictional fallback vacancies if Firefish is unavailable.
    return {
      jobs: [],
      total: 0,
      source: "unavailable" as JobsSource,
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
    // Return no vacancy if Firefish is unavailable.
  }

  return {
    job: null,
    source: "unavailable" as JobsSource,
  };
}