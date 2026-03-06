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
            By accessing or using this site, you agree to comply with these terms.
            If you do not agree with these terms, you should not use the website.
          </p>

          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>1. About Us</h3>
            <p>
              This website is operated by Illuminex Ltd, a company registered in
              England and Wales under company number 16961631.
            </p>
            <p style={{ marginBottom: 0 }}>
              Registered Office: To be confirmed prior to launch
              <br />
              Email: hello@illuminex.co.uk
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>2. Purpose of This Website</h3>
            <p style={{ marginBottom: 0 }}>
              This website provides information regarding the services offered by
              Illuminex Ltd, including recruitment and executive search services,
              sector insights and professional opportunities. The content on this
              website is provided for general information purposes only and does
              not constitute an offer of employment, contractual commitment or
              professional advice.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. Acceptable Use</h3>
            <p>
              You agree to use this website only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use of
              the website.
            </p>

            <p>You must not:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>breach any applicable law or regulation;</li>
              <li>introduce malicious software, viruses or harmful material;</li>
              <li>attempt to gain unauthorised access to any part of the website or related systems;</li>
              <li>interfere with the security, performance or availability of the website.</li>
            </ul>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. Intellectual Property</h3>
            <p style={{ marginBottom: 0 }}>
              Unless otherwise stated, all intellectual property rights in the
              content of this website, including text, branding, design,
              graphics and layout, are owned by or licensed to Illuminex Ltd.
              Content may not be copied, reproduced, republished or distributed
              without prior written permission.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. Accuracy of Information</h3>
            <p style={{ marginBottom: 0 }}>
              While we endeavour to ensure that information on this website is
              accurate and up to date, we do not guarantee the completeness,
              accuracy or reliability of any content. Vacancy details, service
              descriptions and other information may change without notice.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. External Links</h3>
            <p style={{ marginBottom: 0 }}>
              This website may contain links to third-party websites for
              convenience or informational purposes. Illuminex Ltd has no control
              over the content, policies or security of external sites and accepts
              no responsibility for them.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>7. Limitation of Liability</h3>
            <p style={{ marginBottom: 0 }}>
              To the fullest extent permitted by law, Illuminex Ltd shall not be
              liable for any loss or damage arising from the use of, or reliance
              upon, this website or its content. Nothing in these Terms excludes
              or limits liability for death or personal injury caused by
              negligence, fraud, or any liability which cannot lawfully be
              excluded under applicable law.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>8. Website Availability</h3>
            <p style={{ marginBottom: 0 }}>
              We aim to ensure that the website remains accessible and operates
              smoothly. However, we do not guarantee that the website will always
              be available or free from errors, interruptions or technical issues.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>9. Governing Law</h3>
            <p style={{ marginBottom: 0 }}>
              These Terms of Use are governed by and construed in accordance with
              the laws of England and Wales. Any disputes arising in connection
              with the website shall be subject to the exclusive jurisdiction of
              the courts of England and Wales.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>10. Changes to These Terms</h3>
            <p style={{ marginBottom: 0 }}>
              We may update these Terms of Use from time to time. Continued use of
              the website after changes are published constitutes acceptance of
              the revised terms.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}