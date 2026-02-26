import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="page page-contact">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Tell us what you need and we’ll take it from there.
          </h1>

          <p
            style={{
              marginTop: 16,
              maxWidth: 1180,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            Whether you are hiring or considering a move, share the essentials and we will come back to you promptly
            with the most sensible next step. Discretion and integrity are standard.
          </p>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 18,
            }}
          >
            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Clients</h3>
              <p>
                Share the role scope, location (UK-wide if relevant) and timeline. If the hire is retained or confidential,
                simply flag it and we will handle it properly.
              </p>
              <div className="sector-tag">Hiring</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 6" }}>
              <h3>Candidates</h3>
              <p>
                Tell us your sector, leadership level and preferred geography. If your search needs to remain confidential,
                we will treat it that way from the outset.
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