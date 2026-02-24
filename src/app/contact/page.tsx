import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="page page-contact">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 style={{ fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            Let’s keep it simple — tell us what you need.
          </h1>

          <p style={{ marginTop: 16, maxWidth: 980, fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)", lineHeight: 1.75, opacity: 0.92 }}>
            Hiring or exploring a move? Share the basics and we’ll respond quickly with the next sensible step.
            Discretion and integrity are standard.
          </p>

          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Clients</h3>
              <p>
                Role scope, location (UK-wide), and timeline. If it’s retained or confidential, say so — we’ll handle it properly.
              </p>
              <div className="sector-tag">Hiring</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Candidates</h3>
              <p>
                Tell us your sector, leadership level and geography. If you’re moving confidentially, we’ll keep it that way.
              </p>
              <div className="sector-tag">Career</div>
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Send a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}