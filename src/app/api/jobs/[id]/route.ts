import { NextResponse } from "next/server";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
  description?: string;
};

const MOCK_JOBS: Job[] = [
  {
    id: "ILX-001",
    title: "Sales Director — Building Materials (National)",
    company: "Confidential Client",
    location: "UK Wide",
    sector: "Building Materials",
    jobType: "Permanent",
    experienceLevel: "Executive",
    salary: "£110,000 + bonus + car",
    postedAt: "2026-02-10",
    summary:
      "Board-level leadership role driving national revenue strategy across a high-performing building materials manufacturer. Strong distributor/merchant relationships and commercial governance essential.",
    description: `
      <h4>Overview</h4>
      <p>Board-level appointment leading national growth across merchant and distribution channels. You’ll set commercial strategy, build high-performance culture, and own revenue and margin delivery.</p>
      <h4>Key responsibilities</h4>
      <ul>
        <li>Lead national sales strategy and commercial governance</li>
        <li>Develop senior relationships across merchants, distributors and key accounts</li>
        <li>Own forecasting, pricing, margin and performance cadence</li>
        <li>Coach and develop a multi-region leadership team</li>
      </ul>
      <h4>What we’re looking for</h4>
      <ul>
        <li>Proven Sales Director / Commercial Director track record</li>
        <li>Strong experience in building materials / construction products</li>
        <li>Credible stakeholder engagement at board/MD level</li>
      </ul>
    `,
  },
  // keep the rest minimal for now (or paste all 8 if you want)
  {
    id: "ILX-002",
    title: "Commercial Director — Construction Products",
    company: "Confidential Client",
    location: "London & South East",
    sector: "Construction",
    jobType: "Permanent",
    experienceLevel: "Executive",
    salary: "£95,000–£120,000 + package",
    postedAt: "2026-02-08",
    summary:
      "Strategic commercial leadership appointment across specification and project channels.",
    description: `<p>Full job description will be provided once the ATS feed is connected.</p>`,
  },
];

export const dynamic = "force-dynamic";

// ✅ Next.js 16: params is a Promise in many places
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params; // ✅ IMPORTANT
  const safeId = (id || "").toUpperCase().trim();

  const job = MOCK_JOBS.find((j) => j.id.toUpperCase() === safeId);

  if (!job) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job, { status: 200 });
}
