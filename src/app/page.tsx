export default function Home() {
  return (
    <main>

      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-inner">
          <div className="hero-left">
            <h1>
              Executive Search.<br />
              Strategic Recruitment.<br />
              Market Leadership.
            </h1>

            <p>
              Illuminex Consultancy partners with forward-thinking organisations 
              to secure exceptional talent across professional and technical sectors.
            </p>
          </div>

          <div className="hero-right">
            <div className="search-card">
              <h3>Search Opportunities</h3>

              <div className="search-fields">
                <select>
                  <option>Sector</option>
                  <option>Construction</option>
                  <option>Engineering</option>
                  <option>Manufacturing</option>
                </select>

                <select>
                  <option>Location</option>
                  <option>London</option>
                  <option>Manchester</option>
                  <option>Birmingham</option>
                </select>

                <input type="text" placeholder="Keyword or Job Title" />
              </div>

              <button className="search-cta">
                Explore Roles
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
