export default function CookiesPage() {
  return (
    <main className="page page-cookies">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 style={{ fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            Cookie Policy
          </h1>

          <p style={{ marginTop: 16, maxWidth: 980, fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)", lineHeight: 1.75, opacity: 0.92 }}>
            This page will be finalised before launch depending on which analytics and tracking tools you enable.
          </p>

          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>Placeholder (pre-launch)</h3>
            <p style={{ marginBottom: 0 }}>
              We’ll confirm your cookie usage (e.g. Google Analytics) and then finalise this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}