import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

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
                    Internal control &amp; operations
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link className="jobs-clear" href="/admin">
                    Dashboard
                  </Link>
                  <Link className="jobs-clear" href="/jobadder-status">
                    JobAdder status
                  </Link>
                  <Link className="jobs-clear" href="/live-jobs">
                    Live Jobs
                  </Link>
                  <a className="jobs-clear" href="/api/admin/logout">
                    Logout
                  </a>
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