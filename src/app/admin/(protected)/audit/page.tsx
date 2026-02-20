// src/app/admin/(protected)/audit/page.tsx
import Link from "next/link";
import { getAuditEvents } from "@/lib/adminAudit";

export const dynamic = "force-dynamic";

function fmt(ts: number) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

export default async function AdminAuditPage() {
  const events = await getAuditEvents(50);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ marginBottom: 6 }}>Audit log</h3>
          <p className="jobs-muted" style={{ margin: 0 }}>
            Security + admin actions captured server-side.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="jobs-clear" href="/admin">
            Back to dashboard
          </Link>
          <a
            className="jobs-clear"
            href="/api/admin/audit"
            target="_blank"
            rel="noreferrer"
          >
            Open JSON
          </a>
        </div>
      </div>

      {events.length === 0 ? (
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <strong>No audit events yet.</strong>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 10,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {events.map((e, idx) => (
            <div
              key={`${e.ts}-${e.action}-${idx}`}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.12)",
              }}
            >
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <strong>{e.action}</strong>
                <span className="jobs-muted">{fmt(e.ts)}</span>
              </div>

              <div className="jobs-muted" style={{ marginTop: 6 }}>
                {e.actor ? (
                  <>
                    Actor: <strong>{e.actor}</strong>
                  </>
                ) : (
                  <>Actor: —</>
                )}
                {e.ip ? (
                  <>
                    {" "}
                    • IP: <strong>{e.ip}</strong>
                  </>
                ) : null}
              </div>

              {e.meta ? (
                <pre
                  style={{
                    marginTop: 8,
                    marginBottom: 0,
                    padding: 10,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    overflowX: "auto",
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(e.meta, null, 2)}
                </pre>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}