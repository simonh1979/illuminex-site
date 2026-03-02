export default function CookiesPage() {
  return (
    <main className="page page-cookies">
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
            Cookie Policy
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
            This Cookie Policy explains how Illuminex LTD uses cookies and similar
            technologies on this website in accordance with the Privacy and
            Electronic Communications Regulations (PECR).
          </p>

          {/* What Are Cookies */}
          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>1. What Are Cookies</h3>
            <p style={{ marginBottom: 0 }}>
              Cookies are small text files placed on your device when you visit a
              website. They help websites function properly and improve user
              experience. Some cookies are essential for site operation, while
              others are used for analytics or marketing purposes.
            </p>
          </div>

          {/* How We Use Cookies */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>2. How We Use Cookies</h3>
            <p>
              At present, this website uses only essential cookies and security
              technologies required for the proper functioning of the site.
            </p>
            <p style={{ marginBottom: 0 }}>
              We do not use advertising cookies, tracking pixels or third-party
              marketing technologies.
            </p>
          </div>

          {/* Essential Cookies */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. Essential Cookies</h3>
            <p>
              Essential cookies enable core website functionality, including page
              navigation and secure form submission. These cookies do not require
              consent under PECR as they are necessary for the operation of the
              website.
            </p>
            <p style={{ marginBottom: 0 }}>
              Disabling essential cookies may affect how the website functions.
            </p>
          </div>

          {/* reCAPTCHA */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. Google reCAPTCHA</h3>
            <p>
              We use Google reCAPTCHA to protect our website from spam and
              automated abuse. This service may collect hardware and software
              information, including device and application data, and send it to
              Google for analysis.
            </p>
            <p style={{ marginBottom: 0 }}>
              Use of reCAPTCHA is subject to Google’s Privacy Policy and Terms of
              Service.
            </p>
          </div>

          {/* Future Changes */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. Future Changes</h3>
            <p>
              If we introduce analytics or non-essential cookies in the future,
              we will implement an appropriate consent mechanism in line with
              PECR requirements before such technologies are activated.
            </p>
            <p style={{ marginBottom: 0 }}>
              This Cookie Policy will be updated accordingly.
            </p>
          </div>

          {/* Managing Cookies */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. Managing Cookies</h3>
            <p style={{ marginBottom: 0 }}>
              Most web browsers allow you to control cookies through your browser
              settings. You can usually modify your browser to decline cookies or
              notify you when a cookie is set. However, disabling essential cookies
              may affect site functionality.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}