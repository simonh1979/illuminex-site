import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Admin2FALayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="jobs-shell" style={{ paddingBottom: 40 }}>
            <div className="sector-card" style={{ gridColumn: "span 12" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <div>
                  <h3 style={{ marginBottom: 6 }}>Admin</h3>
                  <p className="jobs-muted" style={{ margin: 0 }}>
                    2FA verification
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link className="jobs-clear" href="/admin/login">
                    Back to login
                  </Link>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}