import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Illuminex Consultancy",
  description:
    "Read the Illuminex Consultancy Privacy Policy explaining how we collect, use, share, retain and protect personal information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Illuminex Consultancy",
    description:
      "Read the Illuminex Consultancy Privacy Policy explaining how we collect, use, share, retain and protect personal information.",
    url: "/privacy",
    type: "website",
  },
};

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
            This Privacy Policy explains how Illuminex Ltd collects, uses,
            shares, stores and protects personal information in accordance with
            applicable UK data protection law.
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
              Illuminex Ltd, trading as Illuminex Consultancy, is a UK
              recruitment and executive-search consultancy providing
              work-finding, talent-search and related business services.
            </p>

            <p>
              For the purposes of applicable UK data protection law, Illuminex
              Ltd is the controller of the personal information described in
              this policy.
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
            <h3>2. Our Privacy Commitment</h3>

            <p>
              We are committed to processing personal information lawfully,
              fairly and transparently under the UK General Data Protection
              Regulation, the Data Protection Act 2018, the Data (Use and
              Access) Act 2025 and other applicable UK legislation.
            </p>

            <p style={{ marginBottom: 0 }}>
              We collect only information that is reasonably relevant to our
              business activities. We do not sell personal information.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>3. The Personal Information We Collect</h3>

            <p style={{ fontWeight: 700 }}>Candidates and Work-Seekers</p>

            <p>
              We may collect your name, contact details, CV, employment history,
              education, qualifications, skills, professional memberships,
              remuneration information, notice period, availability, work
              preferences, application history, interview information,
              assessment information, references, right-to-work information and
              communications with us.
            </p>

            <p>
              More detailed information about how we collect, use, share, retain
              and protect candidate information is available in our{" "}
              <Link
                href="/candidate-privacy-notice"
                className="privacy-candidate-notice-link"
              >
                Candidate Privacy Notice
              </Link>
              .
            </p>

            <p style={{ fontWeight: 700 }}>Clients and Business Contacts</p>

            <p>
              We may collect names, job titles, organisations, business contact
              details, professional interests, vacancy information, briefing
              notes, interview feedback, service requirements, contractual and
              billing information, and communications with us.
            </p>

            <p style={{ fontWeight: 700 }}>
              Website and Online-Service Visitors
            </p>

            <p style={{ marginBottom: 0 }}>
              We may collect information submitted through forms, registration
              or application journeys, together with technical information such
              as IP address, browser type, device information, security logs,
              cookie preferences and website usage information.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>4. How We Obtain Personal Information</h3>

            <p>We may obtain information:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>
                directly from you when you contact us, register, apply for a
                role, upload a CV, provide a briefing or use our services;
              </li>

              <li>
                from job boards, recruitment platforms, professional networking
                services, referrals, recommendations and publicly available
                professional or corporate sources;
              </li>

              <li>
                from clients, former employers, referees, qualification bodies,
                screening providers and other organisations involved in a
                recruitment process;
              </li>

              <li>
                from company websites, professional directories, business
                correspondence and legitimate business-development research;
              </li>

              <li>
                through your use of our website, candidate portal,
                communications and recruitment systems.
              </li>
            </ul>

            <p style={{ marginTop: 16, marginBottom: 0 }}>
              Where we obtain personal information from another source, we will
              provide or make available the relevant privacy information within
              the period required by law, unless a lawful exemption applies.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>5. How We Use Personal Information</h3>

            <p>We may use personal information to:</p>

            <ul style={{ marginBottom: 0 }}>
              <li>respond to enquiries and requests;</li>

              <li>
                provide recruitment, executive-search, work-finding and related
                consultancy services;
              </li>

              <li>
                assess candidate experience, suitability, availability and
                preferences;
              </li>

              <li>
                process applications, arrange interviews and manage recruitment
                activity;
              </li>

              <li>
                understand client requirements and manage client relationships;
              </li>

              <li>
                communicate with candidates, clients, suppliers and business
                contacts;
              </li>

              <li>
                maintain accurate recruitment, service, compliance, contractual
                and communication records;
              </li>

              <li>
                operate, secure, monitor, analyse and improve our website,
                systems and services;
              </li>

              <li>
                prevent or investigate fraud, misuse, spam, abuse or unlawful
                activity;
              </li>

              <li>
                establish, exercise or defend legal claims and respond to rights
                requests or complaints;
              </li>

              <li>
                comply with legal, regulatory, contractual and professional
                obligations.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>6. Our Lawful Bases</h3>

            <p style={{ fontWeight: 700 }}>
              Contract or steps before entering a contract
            </p>

            <p>
              We may process information where this is necessary to provide
              requested services, manage an application, enter into or perform a
              contract, or take steps connected with a potential engagement.
            </p>

            <p style={{ fontWeight: 700 }}>Legitimate interests</p>

            <p>
              We may process information where this is necessary for our
              legitimate interests in operating a recruitment and consultancy
              business, maintaining professional relationships, matching
              candidates with suitable opportunities, developing our services,
              administering and protecting our systems, and managing our
              business. We consider and balance those interests against the
              rights and reasonable expectations of the people concerned.
            </p>

            <p style={{ fontWeight: 700 }}>Legal obligation</p>

            <p>
              We may process information where necessary to comply with
              employment-agency, immigration, tax, equality, safeguarding,
              accounting, regulatory or other legal obligations.
            </p>

            <p style={{ fontWeight: 700 }}>Consent</p>

            <p style={{ marginBottom: 0 }}>
              We rely on consent where you are given a genuine and optional
              choice, including certain marketing, email, SMS, cookie or
              tracking activities, or where explicit consent is an appropriate
              condition for particular special category information. Consent may
              be withdrawn at any time. Withdrawal does not affect processing
              already carried out lawfully, and another lawful basis may still
              apply to other processing.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>7. Candidate Information and Client Introductions</h3>

            <p>
              Candidate information is used to assess suitability for roles,
              communicate about opportunities and manage recruitment processes
              on behalf of clients.
            </p>

            <p style={{ marginBottom: 0 }}>
              We will not send an identifiable CV or disclose a candidate&apos;s
              identity to a client for a specific opportunity without first
              discussing that opportunity with the candidate and obtaining their
              agreement, unless disclosure is required by law.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>8. Client and Business Contact Information</h3>

            <p>
              We use client and business contact information to provide and
              administer services, understand recruitment needs, manage
              professional relationships, prepare proposals, maintain business
              records and communicate about relevant services or market matters.
            </p>

            <p>
              Business contact information may be obtained directly from the
              individual or organisation, through referrals and existing
              relationships, or from public professional and corporate sources.
            </p>

            <p style={{ marginBottom: 0 }}>
              We may send proportionate business-to-business communications
              where permitted by applicable law. A recipient may ask us to stop
              relevant marketing or business-development communications at any
              time by contacting{" "}
              <a
                className="global-email-link"
                href="mailto:hello@illuminex.co.uk"
              >
                hello@illuminex.co.uk
              </a>
              .
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>9. Special Category and Criminal-Offence Information</h3>

            <p>
              Where it is relevant and lawful, we may process special category
              information, such as information about health, disability,
              diversity or other protected characteristics. We may process
              criminal-conviction or offence information only where it is
              necessary and lawful, including for appropriate vetting or
              safeguarding requirements.
            </p>

            <p style={{ marginBottom: 0 }}>
              We identify an Article 6 lawful basis and, where required, an
              additional Article 9 condition or a condition under Schedule 1 of
              the Data Protection Act 2018. We maintain additional safeguards
              and documentation where the law requires them.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>10. Recruitment Systems and Service Providers</h3>

            <p>
              Candidate and client information may be stored and processed
              within specialist recruitment CRM or applicant-tracking systems
              used by Illuminex Ltd.
            </p>

            <p>
              We may also use website and cloud-hosting providers, business
              email and communications systems, document-storage services,
              analytics tools, IT-support providers, cybersecurity services,
              professional advisers and other suppliers necessary to operate our
              business.
            </p>

            <p style={{ marginBottom: 0 }}>
              Where a provider processes personal information on our behalf, we
              take appropriate steps designed to ensure that suitable
              contractual, confidentiality and security safeguards are in place.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>11. Cookies, Analytics and Website Security</h3>

            <p>
              Our website uses cookies and similar technologies for essential
              functionality, consent preferences, analytics, performance and
              security.
            </p>

            <p>
              Where applicable, Google Analytics helps us understand how
              visitors use the website and improve performance and user
              experience. Non-essential analytics tools are activated only where
              the required consent has been provided through our cookie
              controls.
            </p>

            <p style={{ marginBottom: 0 }}>
              We use Google reCAPTCHA and similar security measures to help
              protect forms and online services from spam, abuse and automated
              misuse. Further information is available in our Cookie Policy.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>12. Marketing and Advertising Technologies</h3>

            <p>
              We may use advertising, remarketing or conversion-measurement
              technologies provided by platforms such as LinkedIn, Meta or
              Google in connection with recruitment marketing and business
              development.
            </p>

            <p style={{ marginBottom: 0 }}>
              Where these technologies are deployed on the website, they are
              subject to appropriate consent controls and available preference
              choices in accordance with applicable law.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>13. International Transfers</h3>

            <p>
              Some clients, service providers or systems may process or permit
              access to personal information from outside the United Kingdom.
            </p>

            <p style={{ marginBottom: 0 }}>
              Where this amounts to a restricted international transfer, we use
              an appropriate lawful mechanism, which may include UK adequacy
              regulations, the UK International Data Transfer Agreement, the UK
              Addendum to approved contractual clauses or another permitted
              safeguard. Where required, we assess the protection available and
              apply additional safeguards.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>14. How Long We Keep Personal Information</h3>

            <p>
              We retain personal information only for as long as it is
              reasonably necessary for the purposes for which it was collected.
            </p>

            <p>
              The appropriate period depends on factors including whether we are
              actively providing services, the date of the last meaningful
              contact or activity, whether the information remains accurate and
              relevant, the nature of any application, engagement or client
              relationship, and applicable legal, regulatory, contractual,
              insurance, accounting or professional requirements.
            </p>

            <p>
              Candidate retention is explained in more detail in our{" "}
              <Link
                href="/candidate-privacy-notice"
                className="privacy-candidate-notice-link"
              >
                Candidate Privacy Notice
              </Link>
              . Client and business contact records may be retained while a
              professional relationship remains active or there is a genuine
              ongoing business, legal or compliance reason to keep them.
            </p>

            <p style={{ marginBottom: 0 }}>
              We periodically review inactive records. Where information is no
              longer needed, it will be deleted, anonymised or otherwise placed
              beyond normal operational use, subject to any continuing lawful
              reason for retention.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>15. Security</h3>

            <p>
              We apply appropriate technical and organisational measures
              designed to protect personal information against unauthorised
              access, misuse, loss, alteration or disclosure.
            </p>

            <p style={{ marginBottom: 0 }}>
              Measures may include secure cloud infrastructure, encryption,
              access controls, restricted user permissions, password and account
              security, monitoring, backups, confidentiality requirements and
              proportionate internal controls. No online or storage system can
              be guaranteed to be completely secure.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>16. Automated Decision-Making</h3>

            <p>
              We do not currently make decisions about candidates, clients or
              website users solely through automated processing where the
              decision would have a legal or similarly significant effect.
            </p>

            <p style={{ marginBottom: 0 }}>
              We may use technology to support searching, matching,
              administration, security or analysis, but material recruitment and
              service decisions involve human consideration. We will update our
              privacy information before introducing significant solely
              automated decision-making where the law requires this.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>17. Your Data Protection Rights</h3>

            <p>
              Depending on the circumstances and the lawful basis being used,
              you may have the right to:
            </p>

            <ul style={{ marginBottom: 0 }}>
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
            <h3>18. Children</h3>

            <p style={{ marginBottom: 0 }}>
              Our website and services are generally intended for professional
              and business use. Where we knowingly process information relating
              to a person under 18, we will take age-appropriate steps and apply
              the safeguards required by law.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>19. External Links</h3>

            <p style={{ marginBottom: 0 }}>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices, security or content of
              those websites and encourage users to review the relevant privacy
              information before providing personal information.
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>20. Data Protection Complaints and Contact</h3>

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
                className="privacy-ico-link"
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Make a complaint to the ICO
              </a>
            </p>
          </div>

          <div style={{ marginTop: 18 }} className="sector-card">
            <h3>21. Changes to This Policy</h3>

            <p style={{ marginBottom: 0 }}>
              We may update this policy to reflect changes in law, our services,
              our suppliers or the way we process personal information. Where a
              change materially affects how we use personal information, we will
              take reasonable steps to bring it to the attention of the people
              concerned before beginning the new processing. The latest version
              will remain available on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}