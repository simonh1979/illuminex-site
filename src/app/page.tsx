export default function Home() {
  return (
    <section className="hero">
      <div className="hero-inner">

        <div className="hero-content">

          <div className="hero-text">
            <h1>
              Strategic Talent. Delivered with Precision.
              Partner with the leaders shaping tomorrow.
            </h1>

            <p>
              Illuminex Consultancy provides premium executive search and specialist recruitment across Construction, Education and Healthcare.
              Delivering reliable mid-to-senior talent through trusted, flexible search solutions
                  </p>
          </div>

          <div className="search-card">
            <h3>
              Find your next <span>Opportunity</span>
            </h3>

            <div className="search-fields">
              <select>
                <option>Select your sector</option>
                <option>Construction & Building Materials</option>
                <option>Education</option>
                <option>Healthcare</option>
              </select>

              <input type="text" placeholder="Location" />
            </div>

            <button className="search-cta">
              Search Opportunities
            </button>
          </div>

        </div>

        <div className="hero-image">
          <img src="/hero.jpg" alt="Illuminex Consultancy" />
        </div>

      </div>
    </section>
  );
}
