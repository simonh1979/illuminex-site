export type Job = {
  id: string;                 // Your public website ID (ILX-001)
  jobAdId?: number;           // JobAdder JobAd ID (when live)
  title: string;
  company: string;
  location: string;
  sector: string;
  jobType: "Permanent" | "Contract";
  experienceLevel: "Mid" | "Senior" | "Executive";
  salary?: string;
  postedAt: string;
  summary: string;
  description?: string; // HTML allowed (we’ll sanitise later when JobAdder is live)
};

export const mockJobs: Job[] = [
  {
    id: "ILX-001",
    jobAdId: 100001,
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
      <h4>Role overview</h4>
      <p>Lead national revenue strategy across key channels, owning growth, margin and commercial governance.</p>
      <h4>What you’ll be doing</h4>
      <ul>
        <li>Set and deliver national sales strategy</li>
        <li>Develop and lead senior commercial teams</li>
        <li>Own key account performance and forecasting</li>
      </ul>
      <h4>What we’re looking for</h4>
      <ul>
        <li>Senior leadership in building materials or adjacent products</li>
        <li>Strong distributor / merchant network experience</li>
        <li>Commercial governance and board-level communication</li>
      </ul>
    `,
  },
  {
    id: "ILX-002",
    jobAdId: 100002,
    title: "Commercial Director — Construction Products",
    company: "Confidential Client",
    location: "London & South East",
    sector: "Construction",
    jobType: "Permanent",
    experienceLevel: "Executive",
    salary: "£95,000–£120,000 + package",
    postedAt: "2026-02-08",
    summary:
      "Strategic commercial leadership appointment across specification and project channels. Ownership of margin, forecasting, and team performance with a focus on major contractor and consultant engagement.",
    description: `
      <h4>Role overview</h4>
      <p>Own margin, performance and strategic growth across project / specification channels.</p>
      <h4>Key responsibilities</h4>
      <ul>
        <li>Commercial strategy across spec, contractor and consultant channels</li>
        <li>Forecasting, margin, pipeline governance</li>
        <li>Leadership of commercial teams</li>
      </ul>
    `,
  },
  {
    id: "ILX-003",
    jobAdId: 100003,
    title: "National Account Manager — KBB Retail & Trade",
    company: "Confidential Client",
    location: "Midlands",
    sector: "Kitchens",
    jobType: "Permanent",
    experienceLevel: "Senior",
    salary: "£55,000–£70,000 + bonus + car",
    postedAt: "2026-02-06",
    summary:
      "Manage and grow key national retail and trade accounts within the KBB space. Strong commercial negotiation, range reviews, and relationship-led growth across multiple stakeholders.",
    description: `
      <h4>Role overview</h4>
      <p>Lead growth across retail & trade partners, managing commercial negotiation and range performance.</p>
    `,
  },
  {
    id: "ILX-004",
    jobAdId: 100004,
    title: "Specification Sales Manager — Bathrooms",
    company: "Confidential Client",
    location: "North West",
    sector: "Bathrooms",
    jobType: "Permanent",
    experienceLevel: "Senior",
    salary: "£50,000–£60,000 + bonus + car",
    postedAt: "2026-02-05",
    summary:
      "Specification-led sales role covering consultants, local authorities and contractors. Focus on project pipelines, product advocacy, CPDs, and winning frameworks for long-term revenue.",
    description: `
      <h4>Role overview</h4>
      <p>Win and develop project pipelines across consultants, contractors and frameworks.</p>
    `,
  },
  {
    id: "ILX-005",
    jobAdId: 100005,
    title: "Regional Sales Manager — Technical Sales (HVAC/MEP)",
    company: "Confidential Client",
    location: "Remote",
    sector: "Technical Sales",
    jobType: "Permanent",
    experienceLevel: "Senior",
    salary: "£60,000–£75,000 + bonus + car",
    postedAt: "2026-02-03",
    summary:
      "Lead regional growth in a consultative technical sales environment. Strong competence in complex solution selling with excellent internal collaboration across operations and project teams.",
  },
  {
    id: "ILX-006",
    jobAdId: 100006,
    title: "Business Development Manager — Education (Frameworks)",
    company: "Confidential Client",
    location: "UK Wide",
    sector: "Education",
    jobType: "Permanent",
    experienceLevel: "Mid",
    salary: "£45,000–£55,000 + bonus",
    postedAt: "2026-02-02",
    summary:
      "Develop new opportunities with education buyers and approved supplier networks. Experience working with procurement routes, tenders, and stakeholder mapping is highly advantageous.",
  },
  {
    id: "ILX-007",
    jobAdId: 100007,
    title: "Operations Manager — Healthcare Services",
    company: "Confidential Client",
    location: "London & South East",
    sector: "Healthcare",
    jobType: "Permanent",
    experienceLevel: "Senior",
    salary: "£55,000–£70,000",
    postedAt: "2026-01-30",
    summary:
      "Operational leadership appointment delivering performance and compliance across healthcare services. Strong process discipline, stakeholder management and continuous improvement mindset required.",
  },
  {
    id: "ILX-008",
    jobAdId: 100008,
    title: "Senior Sales Manager — Construction Distribution",
    company: "Confidential Client",
    location: "North West",
    sector: "Construction",
    jobType: "Permanent",
    experienceLevel: "Senior",
    salary: "£65,000–£85,000 + bonus + car",
    postedAt: "2026-01-28",
    summary:
      "Senior sales leadership role across distribution/merchant channels. Responsible for team direction, pipeline quality, commercial performance and strategic account development.",
  },
];
