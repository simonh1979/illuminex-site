// src/app/admin/(protected)/page.tsx
"use client";

import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refreshJobs() {
    setMsg(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/ops/jobs/refresh", {
        method: "POST",
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed");

      setMsg("✅ Jobs refresh triggered (audit logged).");
    } catch (e: any) {
      setMsg(`❌ ${e?.message || "Failed"}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <h3 style={{ marginBottom: 6 }}>Dashboard</h3>
        <p className="jobs-muted" style={{ margin: 0 }}>
          You are logged in. Admin operations + audit trail.
        </p>
      </div>

      {msg && (
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: msg.startsWith("✅")
              ? "rgba(50,255,120,0.10)"
              : "rgba(255,50,50,0.12)",
          }}
        >
          {msg}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          borderRadius: 18,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          maxWidth: 720,
        }}
      >
        <strong>Operations</strong>

        <p className="jobs-muted" style={{ margin: 0 }}>
          Safe admin operation placeholder. This doesn’t change production data yet — it simply
          records an audit event so the pipeline is proven.
        </p>

        <button className="sector-cta" onClick={refreshJobs} disabled={busy}>
          {busy ? "Working..." : "Refresh jobs cache (safe)"}
        </button>

        <p className="jobs-muted" style={{ margin: 0 }}>
          After clicking, check <a href="/admin/audit">/admin/audit</a> for{" "}
          <code>admin.ops.jobs.refresh</code>.
        </p>
      </div>
    </div>
  );
}