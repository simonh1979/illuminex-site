import Link from "next/link";

export default function BathroomsKitchensSectorPage() {
  return (
    <main className="page page-sector page-sector-kbb">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-kicker">OUR SECTORS</div>

          <h1
  style={{
    fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    lineHeight: 1.12,
  }}
>
  Bathrooms &amp; Kitchens
</h1>

<p style={{ marginTop: 10, opacity: 0.9 }}>
  <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
    ← Back to homepage sectors
  </Link>
</p>

<p className="sector-hero-text">
  We support KBB manufacturers, merchants and specialist retailers with senior commercial and leadership hires.
  This is a market where product credibility, channel understanding and disciplined account management drive sustainable growth.
</p>

          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <Link className="sector-cta" href="/live-jobs">
              View live roles
            </Link>
            <Link className="sector-cta-secondary" href="/contact">
              Speak confidentially
            </Link>
          </div>

          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Merchant &amp; trade channels</h3>
              <p>
                Regional and national sales leadership across builders’ merchants and trade supply networks, focused on margin control and territory performance.
              </p>
              <div className="sector-tag">Merchant network</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Retail &amp; showroom leadership</h3>
              <p>
                Sales and operational leadership in showroom environments where conversion, customer experience and brand standards must align.
              </p>
              <div className="sector-tag">Retail</div>
            </div>

            <div className="sector-card" style={{ gridColumn: "span 4" }}>
              <h3>Specification &amp; project sales</h3>
              <p>
                Roles operating across housebuilders, contractors and design partners, requiring measured stakeholder management and technical confidence.
              </p>
              <div className="sector-tag">Specification</div>
            </div>

            <div className="sector-card sector-card--cta" style={{ gridColumn: "span 12" }}>
              <h3>Planning a senior hire within KBB?</h3>
              <p style={{ marginBottom: 0 }}>
                Outline the brief and commercial expectations. We’ll provide a clear view of candidate availability and the most appropriate route to market.
              </p>

              <div className="sector-cta-row">
  <Link className="sector-cta" href="/contact">
    Speak with Illuminex
  </Link>

  <Link className="sector-cta-secondary" href="/clients">
    How we work with clients
  </Link>
</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}