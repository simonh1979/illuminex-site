import CookiePreferencesLink from "@/components/CookiePreferencesLink";

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
            This Cookie Policy explains how Illuminex Ltd uses cookies and similar
            technologies on this website in accordance with the Privacy and
            Electronic Communications Regulations (PECR) and applicable UK data
            protection law.
          </p>

          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>1. What Cookies Are</h3>
            <p style={{ marginBottom: 0 }}>
              Cookies are small text files placed on your device when you visit a
              website. They help websites operate properly, remember certain
              preferences, improve security and provide information about how the
              website is used.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>2. How We Use Cookies</h3>
            <p>
              Illuminex Ltd uses cookies and similar technologies to support the
              operation, security and performance of this website.
            </p>
            <p style={{ marginBottom: 0 }}>
              Some cookies are strictly necessary for the website to function.
              Others, such as analytics or future advertising-related cookies,
              will only be used where you have provided the relevant consent
              through our cookie preferences tool.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. Categories of Cookies We Use</h3>
            <p>We may use the following categories of cookies:</p>
            <ul style={{ marginBottom: 0 }}>
              <li>
                <strong>Strictly necessary cookies</strong> – required for the
                core operation, security and stability of the website.
              </li>
              <li>
                <strong>Preference and consent cookies</strong> – used to
                remember your cookie choices and related settings.
              </li>
              <li>
                <strong>Analytics cookies</strong> – used to understand how
                visitors use the website and to improve performance, where
                consent has been given.
              </li>
              <li>
                <strong>Advertising or marketing cookies</strong> – these may be
                used in future in connection with platforms such as LinkedIn or
                Meta, but only where appropriate consent has been obtained.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. Strictly Necessary Cookies</h3>
            <p>
              Strictly necessary cookies are required for the website to function
              correctly. These may include cookies or similar technologies used
              for page delivery, security controls, spam prevention and the
              storage of essential session or consent-related settings.
            </p>
            <p style={{ marginBottom: 0 }}>
              Because these cookies are necessary for the operation of the
              website, they do not require consent under PECR.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. Analytics Cookies</h3>
            <p>
              Where consent has been provided, we may use analytics technologies
              such as Google Analytics to understand how visitors interact with
              the website, including which pages are visited, how long visitors
              remain on the site and how the website performs across devices and
              browsers.
            </p>
            <p style={{ marginBottom: 0 }}>
              Analytics cookies are not activated unless you have positively
              accepted them through our cookie preferences tool.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. Google reCAPTCHA and Security Technologies</h3>
            <p>
              We use Google reCAPTCHA and related security technologies to help
              protect our website and forms from spam, automated abuse and
              malicious activity.
            </p>
            <p style={{ marginBottom: 0 }}>
              These technologies may collect device and interaction data as part
              of their security function. Their use is subject to Google’s own
              terms and privacy documentation.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>7. Future Advertising and Tracking Technologies</h3>
            <p>
              We may in future use advertising, remarketing or conversion
              tracking technologies provided by third-party platforms such as
              LinkedIn or Meta in support of recruitment marketing and business
              development activity.
            </p>
            <p style={{ marginBottom: 0 }}>
              If such technologies are introduced, they will be subject to an
              appropriate consent mechanism and this Cookie Policy will be
              updated accordingly.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>8. Managing Your Cookie Preferences</h3>

            <p>
              You can accept, reject or amend your preferences for non-essential
              cookies using the cookie preferences tool available on this website.
              You may update your preferences at any time by{" "}
              <CookiePreferencesLink />.
            </p>

            <p style={{ marginBottom: 0 }}>
              You can also control cookies through your browser settings. Please
              note that restricting certain cookies may affect website
              functionality and your experience of using the site.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>9. How Long Cookies Remain on Your Device</h3>
            <p>
              Some cookies are deleted when you close your browser session,
              whilst others remain on your device for a defined period or until
              deleted manually.
            </p>
            <p style={{ marginBottom: 0 }}>
              The duration will depend on the specific cookie and its purpose,
              including whether it is required for session management, consent
              storage or analytics.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>10. Changes to This Cookie Policy</h3>
            <p style={{ marginBottom: 0 }}>
              We may update this Cookie Policy from time to time to reflect
              changes in legal requirements, website functionality or the
              technologies we use. The latest version will always be published on
              this page.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>11. Contact</h3>
            <p>
              If you have any questions about our use of cookies or similar
              technologies, please contact us at hello@illuminex.co.uk.
            </p>
            <p style={{ marginBottom: 0 }}>
              Further information about how we handle personal data is available
              in our{" "}
              <a href="/privacy" className="text-link">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}