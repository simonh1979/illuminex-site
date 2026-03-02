export default function TermsPage() {
  return (
    <main className="page page-terms">
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
            Terms of Use
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
            These Terms of Use govern access to and use of this website.
            By using this website, you agree to comply with these terms.
          </p>

          {/* About Us */}
          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>1. About Us</h3>
            <p>
              This website is operated by Illuminex LTD, a company registered in
              England and Wales under company number 16961631.
            </p>
            <p style={{ marginBottom: 0 }}>
              Registered Office: [To be updated prior to launch]<br />
              Email: hello@illuminex.co.uk
            </p>
          </div>

          {/* Website Purpose */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>2. Purpose of This Website</h3>
            <p style={{ marginBottom: 0 }}>
              This website provides information about our recruitment services,
              current vacancies and professional sectors. It does not constitute
              a binding offer of employment or contractual commitment.
            </p>
          </div>

          {/* Use of Website */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. Acceptable Use</h3>
            <p>
              You agree not to use this website in any way that:
            </p>
            <ul style={{ marginBottom: 0 }}>
              <li>Breaches any applicable law or regulation;</li>
              <li>Introduces malicious or harmful material;</li>
              <li>Attempts unauthorised access to systems or data;</li>
              <li>Interferes with the website’s security or performance.</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. Intellectual Property</h3>
            <p style={{ marginBottom: 0 }}>
              All content on this website, including text, branding, graphics and
              design elements, is the property of Illuminex LTD unless otherwise
              stated. Content may not be reproduced, distributed or reused without
              prior written permission.
            </p>
          </div>

          {/* Accuracy of Information */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. Accuracy of Information</h3>
            <p style={{ marginBottom: 0 }}>
              While we aim to ensure information on this website is accurate and
              up to date, we do not guarantee completeness or reliability. Vacancy
              details and sector information may change without notice.
            </p>
          </div>

          {/* External Links */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. External Links</h3>
            <p style={{ marginBottom: 0 }}>
              This website may contain links to third-party websites. We are not
              responsible for the content, security or privacy practices of
              external sites.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>7. Limitation of Liability</h3>
            <p style={{ marginBottom: 0 }}>
              To the fullest extent permitted by law, Illuminex LTD shall not be
              liable for any loss or damage arising from the use of this website
              or reliance on its content. Nothing in these terms limits liability
              for death or personal injury caused by negligence or any other
              liability that cannot be excluded under UK law.
            </p>
          </div>

          {/* Governing Law */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>8. Governing Law</h3>
            <p style={{ marginBottom: 0 }}>
              These Terms of Use are governed by the laws of England and Wales.
              Any disputes arising in connection with this website shall be
              subject to the exclusive jurisdiction of the courts of England and
              Wales.
            </p>
          </div>

          {/* Changes */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>9. Changes to These Terms</h3>
            <p style={{ marginBottom: 0 }}>
              We may update these Terms of Use periodically. Continued use of
              the website following any updates constitutes acceptance of the
              revised terms.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}