// src/app/jobs/page.tsx
import { Suspense } from "react";
import JobsClient from "./JobsClient";

export const dynamic = "force-dynamic";

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <main className="page page-jobs">
          <section className="page-body">
            <p>Loading roles…</p>
          </section>
        </main>
      }
    >
      <JobsClient />
    </Suspense>
  );
}