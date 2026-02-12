export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>
              Partner with the leaders shaping tomorrow.
            </h1>

            <p>
              Illuminex Consultancy works with ambitious organisations across
              Construction, Education and Healthcare to secure exceptional
              leadership and specialist talent aligned to long-term growth.
            </p>

            <div className="hero-buttons">
              <a href="/contact" className="btn-primary">
                Start a Strategic Conversation
              </a>
              <a href="/contact" className="btn-secondary">
                Explore Opportunities
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img src="/hero.jpg" alt="Illuminex Consultancy" />
          </div>
        </div>
      </section>
    </>
  );
}
