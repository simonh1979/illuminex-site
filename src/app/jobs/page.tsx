"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function JobsPageInner() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`/api/jobs?${searchParams.toString()}`);
      const data = await res.json();
      setJobs(data);
    };

    fetchJobs();
  }, [searchParams]);

  return (
    <div style={{ padding: "60px 40px" }}>
      <h1>Current Opportunities</h1>

      {jobs.length === 0 && <p>No roles found.</p>}

      {jobs.map((job) => (
        <div key={job.id} style={{ marginBottom: "20px" }}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.sector}</p>
        </div>
      ))}
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px 40px" }} />}>
      <JobsPageInner />
    </Suspense>
  );
}