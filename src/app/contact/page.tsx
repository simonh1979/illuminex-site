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
            Whether you are hiring or considering a move, share the essentials and we will come back to you promptly with
            the most sensible next step. Discretion and integrity are standard.
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
                Share the role scope, location (UK wide if relevant) and timeline. If the hire is retained or confidential,
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

              {/* Contact details panel */}
              <div className="contact-panel" aria-label="Contact details">
                <div className="contact-panel-inner">
                  <div className="contact-panel-head">
                    <div>
                      <div className="contact-panel-kicker">Contact details</div>
                      <div className="contact-panel-title">Illuminex Ltd</div>
                    </div>

                    <span
                      className="contact-linkedin"
                      aria-label="LinkedIn page coming soon"
                    >
                      <img
                        src="/linkedin-blue-white-logo.png"
                        alt="LinkedIn"
                        className="contact-linkedin-icon"
                      />
                    </span>
                  </div>

                  <div className="contact-panel-grid">
                    <div className="contact-panel-item">
                      <div className="contact-panel-label">
                        <span className="contact-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path
                              d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                            <path
                              d="m6.5 7.5 5.15 4.12a1.6 1.6 0 0 0 2 0L18.5 7.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        Email
                      </div>
                      <div className="contact-panel-value">
                        <a className="contact-panel-link" href="mailto:hello@illuminex.co.uk">
                          hello@illuminex.co.uk
                        </a>
                      </div>
                    </div>

                    <div className="contact-panel-item">
                      <div className="contact-panel-label">
                        <span className="contact-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path
                              d="M7.5 3.5h2.2c.6 0 1.1.4 1.2 1l.6 3c.1.5-.2 1.1-.7 1.3l-1.6.7a13.2 13.2 0 0 0 5.3 5.3l.7-1.6c.2-.5.8-.8 1.3-.7l3 .6c.6.1 1 .6 1 1.2v2.2c0 .7-.5 1.3-1.2 1.4-9 .9-16.2-6.3-15.3-15.3.1-.7.7-1.2 1.4-1.2Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        Phone
                      </div>
                      <div className="contact-panel-value">To be confirmed</div>
                    </div>

                    <div className="contact-panel-item">
                      <div className="contact-panel-label">
                        <span className="contact-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path
                              d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 10.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </span>
                        Registered office
                      </div>
                      <div className="contact-panel-value">To be confirmed</div>
                    </div>

                    <div className="contact-panel-item">
                      <div className="contact-panel-label">Company No.</div>
                      <div className="contact-panel-value">16961631</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Contact details panel */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}