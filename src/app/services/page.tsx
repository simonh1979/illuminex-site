
export default function ServicesPage() {
  return (
    <main className="page page-services">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 style={{ fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            Recruitment now. Broader consultancy as we grow.
          </h1>

          <p style={{ marginTop: 16, maxWidth: 980, fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)", lineHeight: 1.75, opacity: 0.92 }}>
            Illuminex is built to become a wider consultancy platform. In time, we’ll connect clients to trusted partner specialists across
            HR, Payroll and Health & Safety — through established relationships, not directories.
          </p>


          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Executive search</h3>
              <p>Senior appointments, confidential hires and leadership builds — structured, mapped and assessed.</p>
              <div className="sector-tag">Retained</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specialist recruitment</h3>
              <p>Mid-senior commercial talent across technical and professional markets — fast, focused and credible.</p>
              <div className="sector-tag">Contingency</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Partner services</h3>
              <p>HR / Payroll / H&amp;S support via specialist partners — introduced only when it adds real value.</p>
              <div className="sector-tag">Future</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}