export default function PrivacyPage() {
  return (
    <main className="page page-privacy">
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
            Privacy Policy
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
            This Privacy Policy explains how Illuminex LTD collects, uses and protects
            personal information in accordance with UK data protection legislation,
            including the UK General Data Protection Regulation (UK GDPR) and the
            Data Protection Act 2018.
          </p>

          {/* Who We Are */}
          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>1. Who We Are</h3>
            <p>
              Illuminex LTD is a UK recruitment consultancy specialising in executive
              search and senior commercial appointments.
            </p>
            <p>
              Illuminex LTD is the data controller for the purposes of UK data
              protection legislation.
            </p>
            <p style={{ marginBottom: 0 }}>
              Company Name: Illuminex LTD<br />
              Company Number: 16961631<br />
              Registered Office: [To be updated prior to launch]<br />
              Email: hello@illuminex.co.uk<br />
              ICO Registration Number: [To be inserted prior to launch]
            </p>
          </div>

          {/* Our Commitment */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>2. Our Commitment</h3>
            <p style={{ marginBottom: 0 }}>
              We process personal information lawfully, fairly and transparently.
              We only collect information that is relevant to our recruitment
              services and we do not sell personal data.
            </p>
          </div>

          {/* Information We Collect */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. Information We Collect</h3>

            <p style={{ fontWeight: 700 }}>Candidates</p>
            <p>
              Name and contact details, CV and employment history, qualifications,
              salary expectations, interview notes, references (where appropriate),
              and communications with us.
            </p>

            <p style={{ fontWeight: 700 }}>Clients</p>
            <p>
              Contact details of hiring managers and stakeholders, vacancy briefs,
              interview feedback and related communications.
            </p>

            <p style={{ fontWeight: 700 }}>Website Visitors</p>
            <p style={{ marginBottom: 0 }}>
              Information submitted via contact forms, IP address for security
              purposes, and technical information necessary for website operation,
              including spam prevention systems such as Google reCAPTCHA.
            </p>
          </div>

          {/* Lawful Basis */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. Lawful Basis for Processing</h3>
            <p>
              We process personal data under the following lawful bases:
            </p>
            <ul style={{ marginBottom: 0 }}>
              <li>Legitimate Interests – providing recruitment services</li>
              <li>Contract – taking steps prior to entering into a contract</li>
              <li>Consent – submitting CVs to clients and certain marketing communications</li>
              <li>Legal Obligation – compliance with regulatory requirements</li>
            </ul>
          </div>

          {/* Candidate Information */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. Candidate Information</h3>
            <p>
              Candidate data is used to assess suitability for roles, communicate
              about opportunities and manage recruitment processes.
            </p>
            <p style={{ marginBottom: 0 }}>
              We will not submit your CV to a client without your prior consent.
            </p>
          </div>

          {/* Marketing */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. Marketing Communications</h3>
            <p style={{ marginBottom: 0 }}>
              We may contact candidates regarding relevant roles or industry
              updates. You may opt out at any time by contacting us directly or
              using the unsubscribe mechanism included in communications.
            </p>
          </div>

          {/* Data Storage */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>7. Data Storage and Systems</h3>
            <p>
              Upon launch, candidate and client information will be stored securely
              within our Applicant Tracking System (JobAdder).
            </p>
            <p style={{ marginBottom: 0 }}>
              We may also use secure email hosting, website hosting providers and
              Google reCAPTCHA for spam prevention. Appropriate safeguards are in
              place with all service providers.
            </p>
          </div>

          {/* Retention */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>8. Data Retention</h3>
            <p>
              We retain candidate data for up to 24 months from the date of last
              meaningful contact.
            </p>
            <p style={{ marginBottom: 0 }}>
              After this period, records are reviewed and deleted or anonymised
              where there is no ongoing legitimate reason to retain them.
            </p>
          </div>

          {/* Rights */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>9. Your Rights</h3>
            <p style={{ marginBottom: 0 }}>
              You have the right to access, rectify, erase or restrict the
              processing of your personal data. You may also object to processing
              or request data portability. Requests should be sent to
              hello@illuminex.co.uk.
            </p>
          </div>

          {/* Complaints */}
          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>10. Complaints</h3>
            <p style={{ marginBottom: 0 }}>
              If you have concerns about how your data is handled, please contact
              us in the first instance. You also have the right to lodge a complaint
              with the Information Commissioner’s Office (ICO) at www.ico.org.uk.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}