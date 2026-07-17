import "server-only";

/* ==========================================================
   ILLUMINEX COMPANY EMAIL SETTINGS

   Update company-wide details here only. These values are used
   by every automated and personal Illuminex email signature.
========================================================== */

type EmailSignatureProfile = {
  name?: string;
  role?: string;
  email: string;
  mobileDisplay?: string;
  mobileHref?: string;
  linkedinDisplay: string;
  linkedinUrl: string;
};

const EMAIL_BRAND = {
  companyName: "Illuminex Consultancy",
  legalCompanyName: "Illuminex Limited",

  // UPDATE THE MAIN OFFICE NUMBER HERE.
  telephoneDisplay: "01756 XXXXXX",
  telephoneHref: "+441756XXXXXX",

  websiteDisplay: "www.illuminex.co.uk",
  websiteUrl: "https://www.illuminex.co.uk",

  // UPDATE THE REGISTERED OFFICE HERE.
  registeredOffice:
    "First Floor Embsay Mill, Embsay, Skipton, BD23 6QR",

  logoUrl:
    "https://www.illuminex.co.uk/email-signature/logo.png",
  phoneIconUrl:
    "https://www.illuminex.co.uk/email-signature/phone.png",
  mobileIconUrl:
    "https://www.illuminex.co.uk/email-signature/mobile.png",
  emailIconUrl:
    "https://www.illuminex.co.uk/email-signature/email.png",
  linkedinIconUrl:
    "https://www.illuminex.co.uk/email-signature/linkedin.png",
  websiteIconUrl:
    "https://www.illuminex.co.uk/email-signature/website.png",

  // Company LinkedIn page used by shared mailboxes.
  companyLinkedinDisplay: "Illuminex Consultancy",
  companyLinkedinUrl:
    "https://www.linkedin.com/company/illuminexconsultancy",

  privacyUrl: "https://www.illuminex.co.uk/privacy",
  termsUrl: "https://www.illuminex.co.uk/terms",
  liveJobsUrl: "https://www.illuminex.co.uk/live-jobs",

  primaryBlue: "#0A4D8C",
  deepBlue: "#0A3F68",
  kingfisherOrange: "#FF7A00",
  pageBackground: "#EEF3F7",
  panelBackground: "#F4F7FA",
  softWhite: "#F8F9FB",
  bodyText: "#1A1A1A",
  mutedText: "#4B5560",
  borderColour: "#DCE3E9",
} as const;

/* ==========================================================
   EMAIL SIGNATURE PROFILES — UPDATE STAFF DETAILS HERE

   This is the only section you need to edit when:
   - a mobile number changes;
   - a personal LinkedIn URL changes;
   - a job title changes;
   - a new consultant joins the company.

   To add a new consultant, copy the Simon or Catherine profile,
   give it a new key, and update the values.

   IMPORTANT:
   - mobileDisplay is the readable number shown in the email.
   - mobileHref must use international format with no spaces.
   - Personal LinkedIn rows are hidden until linkedinUrl is set.
========================================================== */

export type IlluminexSignatureProfileKey =
  | "simon"
  | "catherine"
  | "hello"
  | "accounts";

const EMAIL_SIGNATURE_PROFILES: Record<
  IlluminexSignatureProfileKey,
  EmailSignatureProfile
> = {
  simon: {
    name: "Simon Harris",
    role: "Managing Director",
    email: "simon.harris@illuminex.co.uk",

    // UPDATE SIMON'S BUSINESS MOBILE HERE.
    mobileDisplay: "07300 408560",
    mobileHref: "+447300408560",

    // UPDATE SIMON'S PERSONAL LINKEDIN PROFILE URL HERE.
    // Example: https://www.linkedin.com/in/simon-harris-xxxx/
    linkedinDisplay: "Simon Harris",
    linkedinUrl: "",
  },

  catherine: {
    name: "Catherine Hewitt",
    role: "Director",
    email: "catherine.hewitt@illuminex.co.uk",

    // UPDATE CATHERINE'S BUSINESS MOBILE HERE.
    mobileDisplay: "",
    mobileHref: "",

    // UPDATE CATHERINE'S PERSONAL LINKEDIN PROFILE URL HERE.
    // Example: https://www.linkedin.com/in/catherine-hewitt-xxxx/
    linkedinDisplay: "Catherine Hewitt",
    linkedinUrl: "",
  },

  hello: {
    email: "hello@illuminex.co.uk",
    linkedinDisplay: EMAIL_BRAND.companyLinkedinDisplay,
    linkedinUrl: EMAIL_BRAND.companyLinkedinUrl,
  },

  accounts: {
    email: "accounts@illuminex.co.uk",
    linkedinDisplay: EMAIL_BRAND.companyLinkedinDisplay,
    linkedinUrl: EMAIL_BRAND.companyLinkedinUrl,
  },
};

/* ==========================================================
   EMAIL DISCLAIMER

   Amend this wording here once and it updates every email
   using the shared Illuminex signature.
========================================================== */

const EMAIL_DISCLAIMER = `
  <strong>EMAIL DISCLAIMER:</strong>
  Illuminex Consultancy is the trading name of Illuminex Limited
  (Registered in England and Wales, company number 16961631).
  This email is strictly confidential, and its contents and any files
  transmitted with it are intended for the addressee(s) and may be
  legally privileged. Access by any other party is unauthorised without
  the express permission of the sender. If you have received this email
  in error, you may not use or copy the contents, attachments or
  information in any way. If you have received this transmission in
  error, it would be helpful if you could notify us as soon as possible.
  Please note that neither Illuminex Consultancy nor the sender accepts
  any responsibility for viruses, and it is your responsibility to
  protect your computer systems against any possible viruses contained
  in this transmission and/or attachments.
`;

/* ==========================================================
   CONFIGURABLE ILLUMINEX EMAIL SIGNATURE

   Examples:
   buildIlluminexEmailSignature("hello")
   buildIlluminexEmailSignature("accounts")
   buildIlluminexEmailSignature("simon")
   buildIlluminexEmailSignature("catherine")

   Automated website emails deliberately use "hello" unless a
   different profile is explicitly passed to buildEmailLayout.
========================================================== */

export function buildIlluminexEmailSignature(
  profileKey: IlluminexSignatureProfileKey = "hello"
): string {
  const profile = EMAIL_SIGNATURE_PROFILES[profileKey];
  const isPersonal = Boolean(profile.name);

  const mobileRow =
    profile.mobileDisplay && profile.mobileHref
      ? buildSignatureContactRow({
          iconUrl: EMAIL_BRAND.mobileIconUrl,
          iconAlt: "Mobile",
          href: `tel:${profile.mobileHref}`,
          text: profile.mobileDisplay,
          underline: false,
          bottomPadding: 8,
        })
      : "";

  const linkedinRow = profile.linkedinUrl
    ? buildSignatureContactRow({
        iconUrl: EMAIL_BRAND.linkedinIconUrl,
        iconAlt: "LinkedIn",
        href: profile.linkedinUrl,
        text: profile.linkedinDisplay,
        underline: true,
        bottomPadding: 8,
      })
    : "";

  const identityHtml = isPersonal
    ? `
      <div
        style="
          margin:0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:18px;
          line-height:23px;
          font-weight:bold;
          color:${EMAIL_BRAND.primaryBlue};
          mso-line-height-rule:exactly;
        "
      >
        ${escapeHtml(profile.name ?? "")}
      </div>

      <div
        style="
          margin:0 0 10px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:15px;
          line-height:21px;
          color:${EMAIL_BRAND.bodyText};
          mso-line-height-rule:exactly;
        "
      >
        ${escapeHtml(profile.role ?? "")}
      </div>
    `
    : "";

  return `
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        width:100%;
        border-collapse:collapse;
        border-spacing:0;
        margin:30px 0 0 0;
        mso-table-lspace:0pt;
        mso-table-rspace:0pt;
      "
    >
      <tbody>
        <tr>
          <td
            style="
              padding:0 0 18px 0;
              font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
              font-size:16px;
              line-height:24px;
              color:${EMAIL_BRAND.bodyText};
              mso-line-height-rule:exactly;
            "
          >
            Kind regards,
          </td>
        </tr>

        <tr>
          <td style="padding:0;">
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                width:100%;
                max-width:580px;
                border-collapse:collapse;
                border-spacing:0;
                mso-table-lspace:0pt;
                mso-table-rspace:0pt;
              "
            >
              <tbody>
                <tr>
                  <td
                    class="signature-logo-cell"
                    valign="top"
                    width="155"
                    style="width:155px;padding:${isPersonal ? "26px" : "0"} 18px 0 0;"
                  >
                    <a
                      href="${EMAIL_BRAND.websiteUrl}"
                      target="_blank"
                      style="display:inline-block;text-decoration:none;"
                    >
                      <img
                        src="${EMAIL_BRAND.logoUrl}"
                        alt="Illuminex Consultancy"
                        width="137"
                        height="137"
                        border="0"
                        style="
                          display:block;
                          width:137px;
                          height:137px;
                          max-width:137px;
                          border:0;
                          outline:none;
                          text-decoration:none;
                          -ms-interpolation-mode:bicubic;
                        "
                      />
                    </a>
                  </td>

                  <td
                    class="signature-details-cell"
                    valign="top"
                    style="
                      padding:0;
                      font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                    "
                  >
                    ${identityHtml}

                    <div
                      style="
                        margin:0 0 12px 0;
                        font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                        font-size:18px;
                        line-height:24px;
                        font-weight:bold;
                        color:${EMAIL_BRAND.primaryBlue};
                        mso-line-height-rule:exactly;
                      "
                    >
                      ${EMAIL_BRAND.companyName}
                    </div>

                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        border-collapse:collapse;
                        border-spacing:0;
                        mso-table-lspace:0pt;
                        mso-table-rspace:0pt;
                      "
                    >
                      <tbody>
                        ${buildSignatureContactRow({
                          iconUrl: EMAIL_BRAND.phoneIconUrl,
                          iconAlt: "Telephone",
                          href: `tel:${EMAIL_BRAND.telephoneHref}`,
                          text: EMAIL_BRAND.telephoneDisplay,
                          underline: false,
                          bottomPadding: 8,
                        })}

                        ${mobileRow}

                        ${buildSignatureContactRow({
                          iconUrl: EMAIL_BRAND.emailIconUrl,
                          iconAlt: "Email",
                          href: `mailto:${profile.email}`,
                          text: profile.email,
                          underline: true,
                          bottomPadding: 8,
                        })}

                        ${linkedinRow}

                        ${buildSignatureContactRow({
                          iconUrl: EMAIL_BRAND.websiteIconUrl,
                          iconAlt: "Website",
                          href: EMAIL_BRAND.websiteUrl,
                          text: EMAIL_BRAND.websiteDisplay,
                          underline: true,
                          bottomPadding: 0,
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:20px 0 0 0;
              font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
              font-size:13px;
              line-height:21px;
              color:${EMAIL_BRAND.bodyText};
              mso-line-height-rule:exactly;
            "
          >
            <strong>Registered Office:</strong>
            ${EMAIL_BRAND.registeredOffice}
          </td>
        </tr>

        <tr>
          <td style="padding:18px 0 0 0;">
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                width:100%;
                border-collapse:collapse;
                border-spacing:0;
                border-top:1px solid #D9DEE5;
                mso-table-lspace:0pt;
                mso-table-rspace:0pt;
              "
            >
              <tbody>
                <tr>
                  <td
                    style="
                      padding:14px 0 0 0;
                      font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                      font-size:10px;
                      line-height:16px;
                      color:#444444;
                      mso-line-height-rule:exactly;
                    "
                  >
                    ${EMAIL_DISCLAIMER}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;
}

/* ==========================================================
   GENERAL EMAIL WRAPPER

   Uses nested presentation tables and Outlook conditional
   markup for consistent desktop and mobile rendering.
========================================================== */

function buildEmailLayout(input: {
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
  preheader?: string;
  signatureProfile?: IlluminexSignatureProfileKey;
}): string {
  const safeHeading = escapeHtml(input.heading);

  const safePreheader = escapeHtml(
    input.preheader ??
      `${input.heading} — ${EMAIL_BRAND.companyName}`
  );

  const eyebrowHtml = input.eyebrow
    ? `
      <div
        style="
          margin:0 0 8px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:13px;
          line-height:18px;
          font-weight:bold;
          letter-spacing:0.6px;
          text-transform:uppercase;
          color:${EMAIL_BRAND.kingfisherOrange};
          mso-line-height-rule:exactly;
        "
      >
        ${escapeHtml(input.eyebrow)}
      </div>
    `
    : "";

  return `
    <!doctype html>
    <html
      lang="en"
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="x-apple-disable-message-reformatting"
          content=""
        />
        <meta
          name="format-detection"
          content="telephone=no,address=no,email=no,date=no,url=no"
        />

        <title>${safeHeading}</title>

        <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              <o:AllowPNG/>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->

        <style>
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          table,
          td {
            border-collapse: collapse !important;
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
          }

          img {
            border: 0;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          a {
            text-decoration: none;
          }

          a[x-apple-data-detectors],
          #MessageViewBody a,
          u + #body a {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }

          @media only screen and (max-width: 640px) {
            .email-shell {
              width: 100% !important;
            }

            .email-container {
              width: 100% !important;
              max-width: 100% !important;
            }

            .header-cell {
              padding: 22px 22px !important;
            }

            .content-cell {
              padding: 28px 22px 26px !important;
            }

            .footer-cell {
              padding: 16px 18px !important;
            }

            .email-heading {
              font-size: 26px !important;
              line-height: 32px !important;
            }

            .information-label {
              width: 125px !important;
            }

            .signature-logo-cell {
              width: 125px !important;
              padding-right: 14px !important;
            }

            .signature-logo-cell img {
              width: 110px !important;
              height: 110px !important;
            }
          }

          @media only screen and (max-width: 480px) {
            .outer-cell {
              padding: 12px 6px !important;
            }

            .content-cell {
              padding: 24px 18px 22px !important;
            }

            .email-heading {
              font-size: 24px !important;
              line-height: 30px !important;
            }

            .signature-logo-cell,
            .signature-details-cell {
              display: block !important;
              width: 100% !important;
            }

            .signature-logo-cell {
              padding: 0 0 18px 0 !important;
            }

            .information-label,
            .information-value {
              display: block !important;
              width: auto !important;
            }

            .information-label {
              padding-bottom: 3px !important;
              border-bottom: 0 !important;
            }

            .information-value {
              padding-top: 0 !important;
            }

            .mobile-button {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box !important;
              text-align: center !important;
            }
          }
        </style>
      </head>

      <body
        id="body"
        bgcolor="${EMAIL_BRAND.pageBackground}"
        style="
          margin:0;
          padding:0;
          width:100%;
          background-color:${EMAIL_BRAND.pageBackground};
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          color:${EMAIL_BRAND.bodyText};
          -webkit-text-size-adjust:100%;
          -ms-text-size-adjust:100%;
        "
      >
        <div
          style="
            display:none;
            visibility:hidden;
            opacity:0;
            color:transparent;
            height:0;
            width:0;
            overflow:hidden;
            mso-hide:all;
          "
        >
          ${safePreheader}
          &#847;&zwnj;&nbsp;&#8199;&zwnj;&nbsp;&#65279;&zwnj;&nbsp;
          &#847;&zwnj;&nbsp;&#8199;&zwnj;&nbsp;&#65279;&zwnj;&nbsp;
        </div>

        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          bgcolor="${EMAIL_BRAND.pageBackground}"
          class="email-shell"
          style="
            width:100%;
            border-collapse:collapse;
            border-spacing:0;
            background-color:${EMAIL_BRAND.pageBackground};
            mso-table-lspace:0pt;
            mso-table-rspace:0pt;
          "
        >
          <tbody>
            <tr>
              <td
                align="center"
                valign="top"
                class="outer-cell"
                style="padding:28px 14px;"
              >
                <!--[if mso]>
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="680"
                  >
                    <tr>
                      <td>
                <![endif]-->

                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="680"
                  bgcolor="#FFFFFF"
                  class="email-container"
                  style="
                    width:100%;
                    max-width:680px;
                    border-collapse:collapse;
                    border-spacing:0;
                    background-color:#FFFFFF;
                    border:1px solid ${EMAIL_BRAND.borderColour};
                    mso-table-lspace:0pt;
                    mso-table-rspace:0pt;
                  "
                >
                  <tbody>
                    <tr>
                      <td
                        height="5"
                        bgcolor="${EMAIL_BRAND.kingfisherOrange}"
                        style="
                          height:5px;
                          padding:0;
                          font-size:0;
                          line-height:0;
                          background-color:${EMAIL_BRAND.kingfisherOrange};
                        "
                      >
                        &nbsp;
                      </td>
                    </tr>

                    <tr>
                      <td
                        bgcolor="${EMAIL_BRAND.deepBlue}"
                        class="header-cell"
                        style="
                          padding:24px 30px;
                          background-color:${EMAIL_BRAND.deepBlue};
                        "
                      >
                        <a
                          href="${EMAIL_BRAND.websiteUrl}"
                          target="_blank"
                          style="
                            display:inline-block;
                            text-decoration:none;
                          "
                        >
                          <img
                            src="${EMAIL_BRAND.logoUrl}"
                            alt="Illuminex Consultancy"
                            width="96"
                            height="96"
                            border="0"
                            style="
                              display:block;
                              width:96px;
                              height:96px;
                              max-width:96px;
                              border:0;
                              outline:none;
                              text-decoration:none;
                              -ms-interpolation-mode:bicubic;
                            "
                          />
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td
                        class="content-cell"
                        style="
                          padding:34px 32px 30px;
                          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                        "
                      >
                        ${eyebrowHtml}

                        <h1
                          class="email-heading"
                          style="
                            margin:0 0 20px 0;
                            font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                            font-size:30px;
                            line-height:36px;
                            font-weight:bold;
                            color:${EMAIL_BRAND.primaryBlue};
                            mso-line-height-rule:exactly;
                          "
                        >
                          ${safeHeading}
                        </h1>

                        <div
                          style="
                            font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                            font-size:16px;
                            line-height:27px;
                            color:${EMAIL_BRAND.bodyText};
                            mso-line-height-rule:exactly;
                          "
                        >
                          ${input.bodyHtml}
                        </div>

                        ${buildIlluminexEmailSignature(input.signatureProfile ?? "hello")}
                      </td>
                    </tr>

                    <tr>
                      <td
                        align="center"
                        bgcolor="${EMAIL_BRAND.deepBlue}"
                        class="footer-cell"
                        style="
                          padding:16px 24px;
                          background-color:${EMAIL_BRAND.deepBlue};
                          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                          font-size:12px;
                          line-height:18px;
                          color:${EMAIL_BRAND.softWhite};
                          mso-line-height-rule:exactly;
                        "
                      >
                        <a
                          href="${EMAIL_BRAND.privacyUrl}"
                          target="_blank"
                          style="
                            color:${EMAIL_BRAND.softWhite};
                            text-decoration:underline;
                          "
                        >
                          Privacy Policy
                        </a>

                        <span
                          style="
                            color:${EMAIL_BRAND.softWhite};
                          "
                        >
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                        </span>

                        <a
                          href="${EMAIL_BRAND.termsUrl}"
                          target="_blank"
                          style="
                            color:${EMAIL_BRAND.softWhite};
                            text-decoration:underline;
                          "
                        >
                          Terms &amp; Conditions
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!--[if mso]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
}

/* ==========================================================
   INTERNAL CANDIDATE REGISTRATION EMAIL
========================================================== */

export function buildCandidateRegistrationInternalEmail(input: {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
  filename: string;
  fileType: string;
  sizeMb: number;
  candidateRef: number;
  candidateMode: "created" | "existing";
}): string {
  const firefishResult =
    input.candidateMode === "created"
      ? "New Firefish candidate created"
      : "Existing candidate matched by email";

  return buildEmailLayout({
    eyebrow: "Website candidate registration",
    heading: "New speculative candidate",
    preheader: `${input.fullName} has registered a CV through the Illuminex website.`,
    bodyHtml: `
      <p
        style="
          margin:0 0 22px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:16px;
          line-height:27px;
          color:${EMAIL_BRAND.bodyText};
          mso-line-height-rule:exactly;
        "
      >
        A candidate has registered their CV through the Illuminex
        website.
      </p>

      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        bgcolor="${EMAIL_BRAND.panelBackground}"
        style="
          width:100%;
          border-collapse:collapse;
          border-spacing:0;
          background-color:${EMAIL_BRAND.panelBackground};
          border:1px solid ${EMAIL_BRAND.borderColour};
          mso-table-lspace:0pt;
          mso-table-rspace:0pt;
        "
      >
        <tbody>
          ${buildInformationRow("Name", input.fullName)}
          ${buildInformationRow("Email", input.email)}
          ${buildInformationRow("Telephone", input.phone)}
          ${buildInformationRow("LinkedIn", input.linkedin || "-")}
          ${buildInformationRow(
            "Firefish reference",
            String(input.candidateRef)
          )}
          ${buildInformationRow("Firefish result", firefishResult)}
          ${buildInformationRow("CV attached", input.filename)}
          ${buildInformationRow(
            "File details",
            `${input.fileType}, ${input.sizeMb} MB`,
            true
          )}
        </tbody>
      </table>

      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="
          width:100%;
          margin:22px 0 0 0;
          border-collapse:collapse;
          border-spacing:0;
          mso-table-lspace:0pt;
          mso-table-rspace:0pt;
        "
      >
        <tbody>
          <tr>
            <td
              width="5"
              bgcolor="${EMAIL_BRAND.kingfisherOrange}"
              style="
                width:5px;
                padding:0;
                background-color:${EMAIL_BRAND.kingfisherOrange};
                font-size:0;
                line-height:0;
              "
            >
              &nbsp;
            </td>

            <td
              bgcolor="${EMAIL_BRAND.panelBackground}"
              style="
                padding:18px 20px;
                background-color:${EMAIL_BRAND.panelBackground};
                font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
              "
            >
              <div
                style="
                  margin:0 0 8px 0;
                  font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                  font-size:15px;
                  line-height:21px;
                  font-weight:bold;
                  color:${EMAIL_BRAND.primaryBlue};
                  mso-line-height-rule:exactly;
                "
              >
                Candidate message
              </div>

              <div
                style="
                  font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                  font-size:15px;
                  line-height:24px;
                  color:${EMAIL_BRAND.bodyText};
                  white-space:pre-wrap;
                  mso-line-height-rule:exactly;
                "
              >
                ${escapeHtml(input.message || "-")}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    `,
  });
}

/* ==========================================================
   CANDIDATE CONFIRMATION EMAIL
========================================================== */

export function buildCandidateConfirmationEmail(input: {
  firstName: string;
}): string {
  const safeFirstName = escapeHtml(input.firstName);

  return buildEmailLayout({
    eyebrow: "CV registration received",
    heading: "Thank you for registering",
    preheader:
      "Your CV has been received securely by Illuminex Consultancy.",
    bodyHtml: `
      <p
        style="
          margin:0 0 18px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:16px;
          line-height:27px;
          color:${EMAIL_BRAND.bodyText};
          mso-line-height-rule:exactly;
        "
      >
        Hello ${safeFirstName},
      </p>

      <p
        style="
          margin:0 0 18px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:16px;
          line-height:27px;
          color:${EMAIL_BRAND.bodyText};
          mso-line-height-rule:exactly;
        "
      >
        Thank you for registering your CV with Illuminex Consultancy.
      </p>

      <p
        style="
          margin:0 0 18px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:16px;
          line-height:27px;
          color:${EMAIL_BRAND.bodyText};
          mso-line-height-rule:exactly;
        "
      >
        Your details and CV have been received securely and will be
        personally reviewed by an Illuminex Recruitment Consultant.
      </p>

      <p
        style="
          margin:0 0 24px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:16px;
          line-height:27px;
          color:${EMAIL_BRAND.bodyText};
          mso-line-height-rule:exactly;
        "
      >
        We will contact you discreetly when a suitable opportunity
        matches your experience and career direction.
      </p>

      ${buildBulletproofButton({
        href: EMAIL_BRAND.liveJobsUrl,
        text: "View current opportunities",
        width: 245,
      })}

      <p
        style="
          margin:24px 0 0 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:14px;
          line-height:23px;
          color:${EMAIL_BRAND.mutedText};
          mso-line-height-rule:exactly;
        "
      >
        Your personal information will be handled confidentially in
        accordance with our
        <a
          href="${EMAIL_BRAND.privacyUrl}"
          target="_blank"
          style="
            color:${EMAIL_BRAND.primaryBlue};
            text-decoration:underline;
          "
        >
          Privacy Policy
        </a>.
      </p>
    `,
  });
}

/* ==========================================================
   SHARED HELPERS
========================================================== */

function buildSignatureContactRow(input: {
  iconUrl: string;
  iconAlt: string;
  href: string;
  text: string;
  underline: boolean;
  bottomPadding: number;
}): string {
  const safeText = escapeHtml(input.text);
  const safeAlt = escapeHtml(input.iconAlt);

  return `
    <tr>
      <td
        valign="middle"
        width="30"
        style="
          width:30px;
          padding:0 7px ${input.bottomPadding}px 0;
        "
      >
        <img
          src="${input.iconUrl}"
          alt="${safeAlt}"
          width="23"
          height="23"
          border="0"
          style="
            display:block;
            width:23px;
            height:23px;
            border:0;
            outline:none;
            text-decoration:none;
            -ms-interpolation-mode:bicubic;
          "
        />
      </td>

      <td
        valign="middle"
        style="
          padding:0 0 ${input.bottomPadding}px 0;
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:15px;
          line-height:23px;
          color:${EMAIL_BRAND.primaryBlue};
          mso-line-height-rule:exactly;
        "
      >
        <a
          href="${input.href}"
          target="_blank"
          style="
            color:${EMAIL_BRAND.primaryBlue};
            text-decoration:${input.underline ? "underline" : "none"};
          "
        >
          ${safeText}
        </a>
      </td>
    </tr>
  `;
}

function buildInformationRow(
  label: string,
  value: string,
  isLast = false
): string {
  const borderStyle = isLast
    ? "border-bottom:0;"
    : `border-bottom:1px solid ${EMAIL_BRAND.borderColour};`;

  return `
    <tr>
      <td
        valign="top"
        width="170"
        class="information-label"
        style="
          width:170px;
          padding:12px 14px;
          ${borderStyle}
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:13px;
          line-height:20px;
          font-weight:bold;
          color:${EMAIL_BRAND.primaryBlue};
          mso-line-height-rule:exactly;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        valign="top"
        class="information-value"
        style="
          padding:12px 14px;
          ${borderStyle}
          font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
          font-size:14px;
          line-height:21px;
          color:${EMAIL_BRAND.bodyText};
          word-break:break-word;
          overflow-wrap:anywhere;
          mso-line-height-rule:exactly;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

/*
  Outlook desktop uses the VML section.
  Modern clients use the HTML anchor.
*/
function buildBulletproofButton(input: {
  href: string;
  text: string;
  width: number;
}): string {
  const safeText = escapeHtml(input.text);

  return `
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="
        border-collapse:collapse;
        border-spacing:0;
        margin:0;
        mso-table-lspace:0pt;
        mso-table-rspace:0pt;
      "
    >
      <tbody>
        <tr>
          <td align="left" style="padding:0;">
            <!--[if mso]>
              <v:roundrect
                xmlns:v="urn:schemas-microsoft-com:vml"
                xmlns:w="urn:schemas-microsoft-com:office:word"
                href="${input.href}"
                style="
                  height:48px;
                  v-text-anchor:middle;
                  width:${input.width}px;
                "
                arcsize="50%"
                stroke="f"
                fillcolor="${EMAIL_BRAND.kingfisherOrange}"
              >
                <w:anchorlock/>
                <center
                  style="
                    color:${EMAIL_BRAND.deepBlue};
                    font-family:Arial,sans-serif;
                    font-size:15px;
                    font-weight:bold;
                  "
                >
                  ${safeText}
                </center>
              </v:roundrect>
            <![endif]-->

            <!--[if !mso]><!-->
              <a
                href="${input.href}"
                target="_blank"
                class="mobile-button"
                style="
                  display:inline-block;
                  min-width:${input.width}px;
                  padding:14px 22px;
                  border-radius:24px;
                  background-color:${EMAIL_BRAND.kingfisherOrange};
                  font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
                  font-size:15px;
                  line-height:20px;
                  font-weight:bold;
                  color:${EMAIL_BRAND.deepBlue};
                  text-align:center;
                  text-decoration:none;
                  box-sizing:border-box;
                "
              >
                ${safeText}
              </a>
            <!--<![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}