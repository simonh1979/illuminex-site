export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>

      {/* HERO SECTION */}
      <section style={{
        padding: "120px 20px",
        textAlign: "center",
        background: "linear-gradient(135deg, #0f2f3a 0%, #123f4f 100%)",
        color: "white"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: 600,
          marginBottom: "20px"
        }}>
          Illuminex Executive Search & Consultancy
        </h1>

        <p style={{
          fontSize: "20px",
          maxWidth: "800px",
          margin: "0 auto 30px auto",
          lineHeight: 1.6,
          opacity: 0.9
        }}>
          Executive recruitment and strategic consultancy built on integrity,
          discretion and long-term partnership.
        </p>

        <button style={{
          padding: "14px 28px",
          fontSize: "16px",
          backgroundColor: "#f28c28",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: 600
        }}>
          Partner With Us
        </button>
      </section>

      {/* ABOUT SECTION */}
      <section style={{
        padding: "100px 20px",
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "36px", marginBottom: "30px" }}>
          Integrity at the Core
        </h2>

        <p style={{
          fontSize: "18px",
          lineHeight: 1.7,
          maxWidth: "850px",
          margin: "0 auto",
          color: "#333"
        }}>
          Illuminex was founded on a simple principle: recruitment should elevate,
          not exploit. We work across Construction & Building Materials,
          Education, and Healthcare, partnering with organisations that value
          trust, clarity and long-term growth.
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section style={{
        padding: "100px 20px",
        backgroundColor: "#f4f6f8"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "60px"
          }}>
            Our Services
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px"
          }}>
            <div>
              <h3 style={{ fontSize: "22px", marginBottom: "15px" }}>
                Retained Executive Search
              </h3>
              <p style={{ lineHeight: 1.6 }}>
                Strategic, discreet and relationship-led search for leadership
                and critical hires.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "22px", marginBottom: "15px" }}>
                Contingency Recruitment
              </h3>
              <p style={{ lineHeight: 1.6 }}>
                Permanent and fixed-term recruitment delivered with precision,
                transparency and commitment.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "22px", marginBottom: "15px" }}>
                Business Consultancy
              </h3>
              <p style={{ lineHeight: 1.6 }}>
                HR, payroll, and health & safety partnerships designed to
                strengthen your operational framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: "100px 20px",
        textAlign: "center",
        background: "linear-gradient(135deg, #123f4f 0%, #0f2f3a 100%)",
        color: "white"
      }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Built to Grow With Integrity
        </h2>

        <p style={{
          fontSize: "18px",
          maxWidth: "700px",
          margin: "0 auto 30px auto",
          lineHeight: 1.6,
          opacity: 0.9
        }}>
          We are selective in partnership, deliberate in action,
          and committed to delivering measurable results.
        </p>

        <button style={{
          padding: "14px 28px",
          fontSize: "16px",
          backgroundColor: "#f28c28",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: 600
        }}>
          Start a Conversation
        </button>
      </section>

    </main>
  );
}
