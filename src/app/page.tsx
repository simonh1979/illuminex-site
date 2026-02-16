import HeroSearch from "../components/HeroSearch";

export default function Home() {
  return (
    <main>

      <section className="hero">
<div className="hero-texture" />
        <div className="hero-inner">

          {/* LEFT SIDE */}
          <div className="hero-left">

            <h1>
Strategic talent, delivered with clarity and precision.
Partner with the people shaping tomorrow.
</h1>

<p>
  Illuminex Consultancy provides premium executive and specialist recruitment
  across professional sectors, delivering exceptional mid-to-senior talent
  solutions with integrity and focus.
</p>
          </div>

          {/* RIGHT SIDE SEARCH */}
          <div className="hero-right">

            <div className="search-card">
              <h3>Search Live Opportunities</h3>
              <HeroSearch />
            </div>

          </div>

        </div>

      </section>
{/* ==========================
    SECTION: OUR SECTORS
========================== */}
<section className="sectors">
  <div className="sectors-inner">
    <header className="sectors-head">
      <p className="kicker">Sector Expertise</p>
      <h2>Market authority, built on experience.</h2>
      <p className="sub">
        We operate where leadership, commercial performance and sector knowledge
        intersect — delivering recruitment with integrity and precision.
      </p>
    </header>

    <div className="sectors-grid">
      <article className="sector-card">
        <h3>Building Materials</h3>
        <p>Leadership and commercial hires across manufacturers, distributors and merchant networks.</p>
      </article>

      <article className="sector-card">
        <h3>Construction</h3>
        <p>Supporting growth with senior appointments across contracting, supply chain and the built environment.</p>
      </article>

      <article className="sector-card">
        <h3>Technical Sales</h3>
        <p>Mid-to-senior sales and commercial talent aligned to complex products and consultative selling.</p>
      </article>

      <article className="sector-card">
        <h3>Bathrooms & Kitchens</h3>
        <p>Commercial and operational leadership across retail, trade and specification-led markets.</p>
      </article>

      <article className="sector-card">
        <h3>Education</h3>
        <p>Trusted recruitment with safeguarding, compliance and professionalism at the forefront.</p>
      </article>

      <article className="sector-card">
        <h3>Healthcare</h3>
        <p>Partnering with providers to secure clinical and operational leadership talent with care and rigor.</p>
      </article>
    </div>
  </div>
</section>

    </main>
  );
}
