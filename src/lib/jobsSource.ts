import { getJobAdderTokens } from "@/lib/jobadderTokens";

/**
 * Returns true if we have JobAdder tokens stored (OAuth completed).
 * This is the ONLY condition for switching the site to JobAdder.
 */
export async function isJobAdderConnected(): Promise<boolean> {
  const tokens = await getJobAdderTokens();
  return !!tokens?.access_token;
}
