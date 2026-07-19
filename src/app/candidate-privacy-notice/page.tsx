import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Privacy Notice | Illuminex Consultancy",
  description:
    "Read the Illuminex Consultancy Candidate Privacy Notice explaining how candidate and work-seeker information is collected, used, shared, retained and protected.",
  alternates: {
    canonical: "/candidate-privacy-notice",
  },
  openGraph: {
    title: "Candidate Privacy Notice | Illuminex Consultancy",
    description:
      "Read the Illuminex Consultancy Candidate Privacy Notice explaining how candidate and work-seeker information is collected, used, shared, retained and protected.",
    url: "/candidate-privacy-notice",
    type: "website",
  },
};

export default function CandidatePrivacyNoticePage() {
  return (
    <main className="page page-candidate-privacy-notice">
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
            Candidate Privacy Notice
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
            This Candidate Privacy Notice explains how Illuminex Ltd collects,
            uses, shares, stores and protects personal information relating to
            candidates, applicants, prospective candidates and other
            work-seekers.
          </p>

          <p
            style={{
              marginTop: 12,
              maxWidth: 1180,
              fontSize: "1rem",
              lineHeight: 1.7,
              opacity: 0.88,
            }}
          >
            Last updated: 01 July 2026
          </p>

          <div style={{ marginTop: 34 }} className="sector-card">
            <h3>1. Who We Are</h3>

            <p>
              Illuminex Ltd, trading as Illuminex Consultancy, is a recruitment
              and executive-search business providing work-finding services to
              clients and candidates.
            </p>

            <p>
              For the purposes of applicable UK data protection law, Illuminex
              Ltd is the controller of the personal information described in
              this notice.
            </p>

            <p style={{ marginBottom: 0 }}>
              Company Name: Illuminex Ltd
              <br />
              Trading Name: Illuminex Consultancy
              <br />
              Company Number: 16961631
              <br />
              Registered Office: First Floor, Embsay Mill, Embsay, Skipton,
              North Yorkshire, BD23 6QR
              <br />
              Email:{" "}
              <a
                className="global-email-link"
                href="mailto:hello@illuminex.co.uk"
>
                hello@illuminex.co.uk
              </a>
              <br />
              ICO Registration Number: ZC161884
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>2. Scope of This Notice</h3>

            <p>
              This notice applies when we are helping you find work, considering
              you for an opportunity, managing an application, maintaining a
              professional relationship with you, or identifying you as a
              potential candidate through a lawful source.
            </p>

            <p style={{ marginBottom: 0 }}>
              It should be read alongside our general Privacy Policy and Cookie
              Policy. Where this notice provides more specific information
              about candidate and recruitment processing, this notice takes
              priority for that processing.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. Our Privacy Commitment</h3>

            <p>
              We are committed to processing personal information lawfully,
              fairly and transparently under the UK General Data Protection
              Regulation, the Data Protection Act 2018, the Data (Use and
              Access) Act 2025 and other applicable UK legislation.
            </p>

            <p style={{ marginBottom: 0 }}>
              We collect only information that is reasonably relevant to our
              recruitment and work-finding services. We do not sell candidate
              information.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. Personal Information We May Collect</h3>

            <p>Depending on the services involved, we may collect:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>your name, address, email address and telephone number;</li>

              <li>
                your CV, employment history, education, qualifications, skills,
                experience and professional memberships;
              </li>

              <li>
                your current and expected remuneration, notice period,
                availability, location and work preferences;
              </li>

              <li>
                application history, interview information, assessment
                information, client feedback and communications with us;
              </li>

              <li>
                identity, right-to-work, eligibility, reference and suitability
                information;
              </li>

              <li>
                information provided by clients, referees, former employers,
                job boards, professional networks and screening providers;
              </li>

              <li>
                account, login, communication and preference information
                generated through our website, candidate portal or recruitment
                systems;
              </li>

              <li>
                technical information such as IP address, browser, device and
                security information where relevant to the use and protection
                of our online services;
              </li>

              <li>
                information required to comply with legal, regulatory,
                contractual or professional obligations.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. Special Category and Criminal-Offence Information</h3>

            <p>
              Where it is relevant and lawful, we may process special category
              personal information, such as information about health,
              disability, racial or ethnic origin, religious or philosophical
              beliefs, trade-union membership, sexual orientation or other
              diversity information.
            </p>

            <p>
              We may process criminal-conviction or offence information only
              where it is necessary and lawful, including where a role is
              subject to appropriate vetting or safeguarding requirements.
            </p>

            <p style={{ marginBottom: 0 }}>
              We identify an Article 6 lawful basis and, where required, an
              additional Article 9 condition or a condition under Schedule 1 of
              the Data Protection Act 2018 before carrying out this processing.
              We maintain additional safeguards and documentation where the law
              requires them.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. How We Obtain Your Information</h3>

            <p>We may obtain information:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>
                directly from you when you register, apply for a role, upload a
                CV, update your profile or contact us;
              </li>

              <li>
                from job boards, recruitment platforms, professional networking
                services and publicly available professional or corporate
                sources;
              </li>

              <li>
                through referrals, recommendations or talent-search activity;
              </li>

              <li>
                from clients, former employers, referees, qualification bodies
                and screening or verification providers;
              </li>

              <li>
                from your interaction with our website, candidate portal,
                communications and recruitment services.
              </li>
            </ul>

            <p style={{ marginTop: 16, marginBottom: 0 }}>
              Where we obtain your information from another source, we will
              provide or make available the relevant privacy information within
              the period required by law, unless a lawful exemption applies.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>7. Why We Use Your Information</h3>

            <p>We may use candidate information to:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>create, maintain and update your candidate profile;</li>

              <li>
                provide recruitment, executive-search and work-finding services;
              </li>

              <li>
                assess your experience, suitability, availability and
                preferences;
              </li>

              <li>contact you about potentially relevant opportunities;</li>

              <li>process and manage job applications;</li>

              <li>
                discuss opportunities with you and, where agreed, introduce you
                to clients;
              </li>

              <li>
                arrange interviews, obtain feedback and communicate decisions;
              </li>

              <li>
                verify identity, right to work, qualifications, references or
                other suitability information where necessary;
              </li>

              <li>
                maintain accurate recruitment, compliance and communication
                records;
              </li>

              <li>
                respond to enquiries, rights requests, complaints and legal
                claims;
              </li>

              <li>
                protect our systems and prevent or investigate fraud, misuse,
                spam, abuse or unlawful activity;
              </li>

              <li>
                comply with legal, regulatory, contractual and professional
                obligations;
              </li>

              <li>
                improve our recruitment services, systems and candidate
                experience.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>8. Our Lawful Bases</h3>

            <p style={{ fontWeight: 700 }}>
              Contract or steps before entering a contract
            </p>

            <p>
              We may process information where this is necessary to provide
              services you have requested, manage an application or take steps
              connected with a potential engagement.
            </p>

            <p style={{ fontWeight: 700 }}>Legitimate interests</p>

            <p>
              We may process information where this is necessary for our
              legitimate interests in operating a recruitment business,
              maintaining candidate relationships, matching candidates with
              appropriate opportunities, administering and protecting our
              systems, managing our business and improving our services. We
              consider and balance those interests against your rights and
              reasonable expectations.
            </p>

            <p style={{ fontWeight: 700 }}>Legal obligation</p>

            <p>
              We may process information where necessary to comply with
              employment-agency, immigration, tax, equality, safeguarding,
              regulatory or other legal obligations.
            </p>

            <p style={{ fontWeight: 700 }}>Consent</p>

            <p style={{ marginBottom: 0 }}>
              We rely on consent where you are given a genuine and optional
              choice, such as certain email or SMS communications, or where
              explicit consent is an appropriate condition for particular
              special category information. You may withdraw consent at any
              time. Withdrawal does not affect processing already carried out
              lawfully, and we may continue processing where another lawful
              basis applies.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>9. Candidate Introductions and Client Sharing</h3>

            <p>
              We will not send your CV or disclose your identity to a client for
              a specific opportunity without first discussing that opportunity
              with you and obtaining your agreement, unless disclosure is
              required by law.
            </p>

            <p style={{ marginBottom: 0 }}>
              We may use limited or anonymised information when discussing
              general market availability, provided that it does not identify
              you.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>10. Information Required by Law or Contract</h3>

            <p>
              Certain information may be required by law, by a client
              requirement, by contract, or in order to enter into a contract.
              This may include identity, right-to-work, suitability,
              qualification, experience, reference or safeguarding information.
            </p>

            <p style={{ marginBottom: 0 }}>
              Where required information is not provided or cannot be verified,
              we may be unable to introduce you to a client, progress an
              application or provide a particular work-finding service.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>11. Job Alerts, Industry News and Service Messages</h3>

            <p>
              You may separately choose to receive industry news, recruitment
              updates or alerts about potentially relevant roles by email or
              SMS. These choices are optional and are not required in order to
              register, apply for a role or receive our core recruitment
              services.
            </p>

            <p>
              You may withdraw consent or opt out at any time by using any
              unsubscribe facility provided, updating available preferences or
              contacting us at{" "}
              <a
                className="global-email-link"
                href="mailto:hello@illuminex.co.uk"
>
                hello@illuminex.co.uk
              </a>
              .
            </p>

            <p style={{ marginBottom: 0 }}>
              We may still send service messages that are reasonably necessary
              to manage your registration, application, candidate account or an
              active recruitment process.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>12. Who We May Share Information With</h3>

            <p>Where necessary and lawful, we may share information with:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>
                prospective employers and clients in connection with agreed
                opportunities;
              </li>

              <li>
                referees, former employers, qualification bodies and
                professional-registration bodies;
              </li>

              <li>
                identity, right-to-work, background, reference or
                suitability-checking providers;
              </li>

              <li>
                recruitment CRM and applicant-tracking system providers;
              </li>

              <li>
                website, cloud-hosting, email, communications, document-storage,
                analytics, IT-support and cybersecurity providers;
              </li>

              <li>
                professional advisers including accountants, auditors, insurers
                and solicitors;
              </li>

              <li>
                regulators, government bodies, courts, law-enforcement
                organisations and public authorities where required;
              </li>

              <li>
                another organisation involved in a merger, acquisition,
                restructuring or transfer of business, subject to appropriate
                confidentiality and data-protection safeguards.
              </li>
            </ul>

            <p style={{ marginTop: 16, marginBottom: 0 }}>
              We share only information that is reasonably necessary for the
              relevant purpose. We do not sell candidate information.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>13. International Transfers</h3>

            <p>
              Some service providers, clients or systems may process or permit
              access to personal information from outside the United Kingdom.
            </p>

            <p style={{ marginBottom: 0 }}>
              Where this amounts to a restricted international transfer, we
              will use an appropriate lawful mechanism, which may include UK
              adequacy regulations, the UK International Data Transfer
              Agreement, the UK Addendum to approved contractual clauses or
              another permitted safeguard. Where required, we will assess the
              protection available and apply additional safeguards.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>14. Where Candidate Information Is Stored and Protected</h3>

            <p>
              Candidate information held within our recruitment CRM is hosted
              using Microsoft Azure infrastructure in European data centres.
            </p>

            <p>
              The recruitment system uses safeguards including encryption at
              rest, secure HTTPS transport over public networks, access
              controls, restricted administrative access, monitoring and
              backup arrangements.
            </p>

            <p style={{ marginBottom: 0 }}>
              We also apply appropriate organisational measures, including
              restricted user permissions, account security, confidentiality
              requirements and proportionate internal controls. No online or
              information storage system can be guaranteed to be completely
              secure, but we take reasonable steps designed to protect personal
              information against loss, misuse, unauthorised access, alteration
              and disclosure.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>15. How Long We Keep Information</h3>

            <p>
              We retain personal information only for as long as it is reasonably
              necessary for the purposes described in this notice.
            </p>

            <p>
              The appropriate retention period will depend on factors including whether
              we are actively providing recruitment or work-finding services to you, the
              date of our last meaningful contact or recruitment activity, whether your
              information remains accurate and relevant, the nature of any application
              or engagement, and applicable legal, regulatory, contractual, insurance or
              professional requirements.
            </p>

            <p>
              Relevant work-seeker records required under the Conduct of Employment
              Agencies and Employment Businesses Regulations 2003 will be retained for
              at least the applicable statutory minimum period. Certain placement,
              financial, tax, compliance, complaint and legal-claim records may need to
              be retained for longer where required or permitted by law.
            </p>

            <p>
              We periodically review inactive candidate records. Where information is no
              longer needed for a genuine recruitment, legal or compliance purpose, it
              will be deleted, anonymised or otherwise placed beyond normal operational
              use.
            </p>

            <p style={{ marginBottom: 0 }}>
              A candidate record may be retained for longer where we continue to have an
              active professional relationship with you, are providing ongoing
              work-finding services, or have another lawful and documented reason for
              retaining it. You may contact us at any time to ask us to review the
              information we hold about you.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>16. Automated Decision-Making</h3>

            <p>
              We do not currently make recruitment decisions about candidates
              solely through automated processing where the decision would have
              a legal or similarly significant effect.
            </p>

            <p style={{ marginBottom: 0 }}>
              We may use technology to support searching, matching,
              administration or analysis, but material recruitment decisions
              involve human consideration. We will update this notice and
              provide any additional information required by law before
              introducing significant solely automated decision-making.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>17. Your Data Protection Rights</h3>

            <p>
              Depending on the circumstances and the lawful basis being used,
              you may have the right to:
            </p>

            <ul style={{ marginBottom: 0 }}>
              <li>
                be informed about how your personal information is collected and
                used;
              </li>

              <li>request access to your personal information;</li>

              <li>
                request correction of inaccurate or incomplete information;
              </li>

              <li>request erasure in certain circumstances;</li>

              <li>request restriction of processing;</li>

              <li>
                receive certain information in a portable format in applicable
                circumstances;
              </li>

              <li>object to processing based on legitimate interests;</li>

              <li>object to direct marketing at any time;</li>

              <li>withdraw consent at any time;</li>

              <li>
                request information about applicable safeguards for
                international transfers;
              </li>

              <li>
                raise a complaint about how your personal information has been
                handled.
              </li>
            </ul>

            <p style={{ marginTop: 16 }}>
              You have an absolute right to object to direct marketing.
            </p>

            <p style={{ marginBottom: 0 }}>
              To exercise a right, email{" "}
              <a
  className="global-email-link"
  href="mailto:hello@illuminex.co.uk"
>
                hello@illuminex.co.uk
              </a>
              . We may need to verify your identity before responding. Some
              rights are subject to legal conditions and exemptions.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>18. Data Protection Complaints</h3>

            <p>
              You can make a data protection complaint by emailing{" "}
              <a
  className="global-email-link"
  href="mailto:hello@illuminex.co.uk"
>
                hello@illuminex.co.uk
              </a>
              . Please explain what has happened and provide any information
              reasonably needed to investigate the complaint.
            </p>

            <p>We will:</p>

            <ul>
              <li>acknowledge receipt within 30 days;</li>

              <li>
                take appropriate steps to investigate and respond without undue
                delay;
              </li>

              <li>keep you informed where appropriate; and</li>

              <li>
                communicate the outcome of our investigation without undue
                delay.
              </li>
            </ul>

            <p>
              You may also complain to the Information Commissioner&apos;s
              Office.
            </p>

            <p style={{ marginBottom: 0 }}>
              ICO Helpline: 0303 123 1113
              <br />
              ICO Website:{" "}
              <a
                className="candidate-privacy-ico-link"
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Make a complaint to the ICO
              </a>
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>19. Changes to This Notice</h3>

            <p style={{ marginBottom: 0 }}>
              We may update this notice to reflect changes in law, our services,
              our suppliers or the way we process personal information. Where a
              change materially affects how we use candidate information, we
              will take reasonable steps to bring it to your attention before
              beginning the new processing. The latest version will remain
              available on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}