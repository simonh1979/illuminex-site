import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function JobAdderStatusPage() {
  let status: any = null;

  try {

    const h = await headers();
const host = h.get("host") ?? "localhost:3000";
const baseUrl = `http://${host}`;

const res = await fetch(`${baseUrl}/api/jobadder/test`, {
  cache: "no-store",
});

    status = await res.json().catch(() => null);
  } catch {
    status = { ok: false, message: "Could not reach /api/jobadder/test" };
  }

  return (
    <main className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="jobs-shell" style={{ paddingBottom: 40 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <h3 style={{ marginBottom: 10 }}>JobAdder Connection</h3>

              <p className="jobs-muted" style={{ marginBottom: 14 }}>
                Current status:{" "}
                <strong style={{ opacity: 0.98 }}>
                  {status?.ok ? "CONNECTED ✅" : "NOT CONNECTED ⚠️"}
                </strong>
              </p>

              <div style={{ marginBottom: 14 }}>
                <pre
                  style={{
                    margin: 0,
                    padding: 14,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    overflowX: "auto",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {JSON.stringify(status, null, 2)}
                </pre>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="sector-cta" href="/api/jobadder/auth">
                  Connect JobAdder
                </a>

                <Link className="jobs-clear" href="/live-jobs">
                  Back to Live Jobs
                </Link>
              </div>

              <p className="jobs-muted" style={{ marginTop: 14 }}>
                You’ll only show “CONNECTED” after JobAdder API access is enabled and you complete OAuth approval.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
