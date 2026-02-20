// src/app/admin/login/layout.tsx
export const dynamic = "force-dynamic";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="page"
      style={{
        paddingTop: "140px",
        paddingBottom: "80px",
      }}
    >
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="jobs-shell" style={{ paddingBottom: 40 }}>
            <div
              className="sector-card"
              style={{
                gridColumn: "span 12",
                padding: "40px",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
