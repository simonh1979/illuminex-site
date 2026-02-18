import { NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1) Rate limit (best effort by IP)
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
    const fullName = String(fd.get("fullName") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const linkedin = String(fd.get("linkedin") ?? "");
    const message = String(fd.get("message") ?? "");
    const terms = String(fd.get("terms") ?? "");
    const cv = fd.get("cv"); // File | null

    // 3) Server-side required checks
    if (!jobId || !fullName || !email || !phone || terms !== "true") {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 4) Log upload info (no storage yet)
    if (cv && cv instanceof File) {
      console.log("CV upload:", cv.name, cv.type, cv.size);
    } else {
      console.log("No CV uploaded");
    }

    console.log("APPLY:", {
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      linkedin,
      message,
      terms,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
