import { NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rateLimit";
import { submitJobAdderApplication } from "@/lib/jobadderApplications";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1) Rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rl = await applyRateLimit.limit(`apply:${ip}`);

    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    // 2) Parse form
    const fd = await req.formData();

    const jobId = String(fd.get("jobId") ?? "");
    const jobTitle = String(fd.get("jobTitle") ?? "");
    const jobAdIdRaw = fd.get("jobAdId");
    const jobAdId =
      typeof jobAdIdRaw === "string" && /^\d+$/.test(jobAdIdRaw)
        ? Number(jobAdIdRaw)
        : undefined;

    const fullName = String(fd.get("fullName") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const linkedin = String(fd.get("linkedin") ?? "");
    const message = String(fd.get("message") ?? "");
    const terms = String(fd.get("terms") ?? "");
    const cv = fd.get("cv");

    // 3) Required checks
    if (!jobId || !fullName || !email || !phone || terms !== "true") {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 4) Log CV (still local for now)
    if (cv && cv instanceof File) {
      console.log("CV upload:", cv.name, cv.type, cv.size);
    }

    // 5) Attempt JobAdder submit (if jobAdId exists later)
    try {
      await submitJobAdderApplication({
        jobId,
        jobAdId,
        fullName,
        email,
        phone,
        linkedin,
        message,
      });

      console.log("APPLY → JobAdder OK", { jobId, jobAdId, email });

      return NextResponse.json({ ok: true, destination: "jobadder" });
    } catch {
      // Fallback until fully live
      console.log("APPLY (fallback/local):", {
        jobId,
        jobTitle,
        jobAdId,
        fullName,
        email,
        phone,
        linkedin,
        message,
        terms,
      });

      return NextResponse.json({ ok: true, destination: "local" });
    }
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
