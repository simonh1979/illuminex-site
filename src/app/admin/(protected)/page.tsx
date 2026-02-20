// src/app/admin/page.tsx
export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: 10 }}>Dashboard</h4>

      <p className="jobs-muted" style={{ marginBottom: 18 }}>
        You are logged in (dev cookie). This area will become the Admin dashboard + 2FA foundation in Milestone 4.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a className="sector-cta" href="/jobadder-status">
          JobAdder status
        </a>

        <a className="jobs-clear" href="/live-jobs">
          View Live Jobs
        </a>

        <a className="jobs-clear" href="/api/admin/logout">
          Logout
        </a>
      </div>
    </div>
  );
}
