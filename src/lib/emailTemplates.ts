import "server-only";

/* ==========================================================
   ILLUMINEX EMAIL BRAND SETTINGS

   Amend company telephone numbers, addresses and wording here.
   All automated website emails should use these shared values.
========================================================== */

const EMAIL_BRAND = {
  companyName: "Illuminex Ltd",
  tradingName: "Illuminex Consultancy",

  telephoneDisplay: "01756 XXXXXX",
  telephoneHref: "+441756XXXXXX",

  email: "hello@illuminex.co.uk",
  websiteDisplay: "www.illuminex.co.uk",
  websiteUrl: "https://www.illuminex.co.uk",

  registeredOffice:
    "First Floor Embsay Mill, Embsay, Skipton, BD23 6QR",

  logoUrl:
    "https://www.illuminex.co.uk/email-signature/logo.png",

  phoneIconUrl:
    "https://www.illuminex.co.uk/email-signature/phone.png",

  emailIconUrl:
    "https://www.illuminex.co.uk/email-signature/email.png",

  websiteIconUrl:
    "https://www.illuminex.co.uk/email-signature/website.png",

  privacyUrl:
    "https://www.illuminex.co.uk/privacy",

  termsUrl:
    "https://www.illuminex.co.uk/terms",

  liveJobsUrl:
    "https://www.illuminex.co.uk/live-jobs",

  primaryBlue: "#0a4d8c",
  deepBlue: "#0a3f68",
  kingfisherOrange: "#ff7a00",
  softWhite: "#f8f9fb",
  bodyText: "#1a1a1a",
} as const;

/* ==========================================================
   EMAIL DISCLAIMER

   Amend this wording here once and it updates every email using
   the shared Illuminex signature.
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
   SHARED COMPANY SIGNATURE
========================================================== */

export function buildIlluminexEmailSignature(): string {
  return `
    <div
      style="
        margin-top:32px;
        font-family:Aptos,Calibri,'Segoe UI',Arial,sans-serif;
        color:${EMAIL_BRAND.bodyText};
      "
    >
      <p
        style="
          margin:0 0 18px;
          font-size:16px;
          line-height:1.5;
        "
      >
        Kind regards,
      </p>

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
          margin:0;
        "
      >
        <tbody>
          <tr>
            <td
              valign="top"
              width="150"
              style="
                width:150px;
                padding:0 16px 0 0;
              "
            >
              <img
                src="${EMAIL_BRAND.logoUrl}"
                alt="Illuminex Consultancy"
                width="137"
                style="
                  display:block;
                  width:137px;
                  max-width:137px;
                  height:auto;
                  border:0;
                  outline:none;
                  text-decoration:none;
                "
              />
            </td>

            <td
              valign="top"
              style="
                padding:0;
                font-family:Aptos,Calibri,'Segoe UI',Arial,sans-serif;
              "
            >
              <div
                style="
                  margin:0 0 12px;
                  font-size:18px;
                  line-height:1.35;
                  font-weight:700;
                  color:${EMAIL_BRAND.primaryBlue};
                "
              >
                ${EMAIL_BRAND.companyName}
              </div>

              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse:collapse;"
              >
                <tbody>
                  <tr>
                    <td
                      width="30"
                      style="width:30px;padding:0 7px 7px 0;"
                    >
                      <img
                        src="${EMAIL_BRAND.phoneIconUrl}"
                        alt="Telephone"
                        width="23"
                        style="
                          display:block;
                          width:23px;
                          height:auto;
                          border:0;
                        "
                      />
                    </td>

                    <td style="padding:0 0 7px;">
                      <a
                        href="tel:${EMAIL_BRAND.telephoneHref}"
                        style="
                          font-size:15px;
                          color:${EMAIL_BRAND.primaryBlue};
                          text-decoration:none;
                        "
                      >
                        ${EMAIL_BRAND.telephoneDisplay}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td
                      width="30"
                      style="width:30px;padding:0 7px 7px 0;"
                    >
                      <img
                        src="${EMAIL_BRAND.emailIconUrl}"
                        alt="Email"
                        width="23"
                        style="
                          display:block;
                          width:23px;
                          height:auto;
                          border:0;
                        "
                      />
                    </td>

                    <td style="padding:0 0 7px;">
                      <a
                        href="mailto:${EMAIL_BRAND.email}"
                        style="
                          font-size:15px;
                          color:${EMAIL_BRAND.primaryBlue};
                          text-decoration:underline;
                        "
                      >
                        ${EMAIL_BRAND.email}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td
                      width="30"
                      style="width:30px;padding:0 7px 0 0;"
                    >
                      <img
                        src="${EMAIL_BRAND.websiteIconUrl}"
                        alt="Website"
                        width="23"
                        style="
                          display:block;
                          width:23px;
                          height:auto;
                          border:0;
                        "
                      />
                    </td>

                    <td>
                      <a
                        href="${EMAIL_BRAND.websiteUrl}"
                        style="
                          font-size:15px;
                          color:${EMAIL_BRAND.primaryBlue};
                          text-decoration:underline;
                        "
                      >
                        ${EMAIL_BRAND.websiteDisplay}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <p
        style="
          margin:20px 0 0;
          font-size:13px;
          line-height:1.6;
          color:${EMAIL_BRAND.bodyText};
        "
      >
        <strong>Registered Office:</strong>
        ${EMAIL_BRAND.registeredOffice}
      </p>

      <p
        style="
          margin:18px 0 0;
          padding-top:14px;
          border-top:1px solid #d9dee5;
          font-size:10px;
          line-height:1.55;
          color:#444444;
        "
      >
        ${EMAIL_DISCLAIMER}
      </p>
    </div>
  `;
}

/* ==========================================================
   GENERAL EMAIL WRAPPER
========================================================== */

function buildEmailLayout(input: {
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
}): string {
  const eyebrowHtml = input.eyebrow
    ? `
      <div
        style="
          margin-bottom:8px;
          font-size:13px;
          line-height:1.4;
          font-weight:700;
          letter-spacing:0.05em;
          text-transform:uppercase;
          color:${EMAIL_BRAND.kingfisherOrange};
        "
      >
        ${input.eyebrow}
      </div>
    `
    : "";

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <title>${input.heading}</title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#eef3f7;
          font-family:Aptos,Calibri,'Segoe UI',Arial,sans-serif;
          color:${EMAIL_BRAND.bodyText};
        "
      >
        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="
            width:100%;
            border-collapse:collapse;
            background:#eef3f7;
          "
        >
          <tbody>
            <tr>
              <td align="center" style="padding:28px 14px;">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="
                    width:100%;
                    max-width:680px;
                    border-collapse:collapse;
                    background:#ffffff;
                    border:3px solid ${EMAIL_BRAND.kingfisherOrange};
                    border-radius:22px;
                    overflow:hidden;
                  "
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          padding:24px 30px;
                          background:${EMAIL_BRAND.deepBlue};
                          border-bottom:5px solid ${EMAIL_BRAND.kingfisherOrange};
                        "
                      >
                        <img
                          src="${EMAIL_BRAND.logoUrl}"
                          alt="Illuminex Consultancy"
                          width="96"
                          style="
                            display:block;
                            width:96px;
                            max-width:96px;
                            height:auto;
                            border:0;
                          "
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:34px 32px 30px;">
                        ${eyebrowHtml}

                        <h1
                          style="
                            margin:0 0 20px;
                            font-size:30px;
                            line-height:1.18;
                            color:${EMAIL_BRAND.primaryBlue};
                          "
                        >
                          ${input.heading}
                        </h1>

                        <div
                          style="
                            font-size:16px;
                            line-height:1.7;
                            color:${EMAIL_BRAND.bodyText};
                          "
                        >
                          ${input.bodyHtml}
                        </div>

                        ${buildIlluminexEmailSignature()}
                      </td>
                    </tr>

                    <tr>
                      <td
                        align="center"
                        style="
                          padding:16px 24px;
                          background:${EMAIL_BRAND.deepBlue};
                          color:${EMAIL_BRAND.softWhite};
                          font-size:12px;
                          line-height:1.5;
                        "
                      >
                        <a
                          href="${EMAIL_BRAND.privacyUrl}"
                          style="
                            color:${EMAIL_BRAND.softWhite};
                            text-decoration:underline;
                          "
                        >
                          Privacy Policy
                        </a>

                        &nbsp;&nbsp;|&nbsp;&nbsp;

                        <a
                          href="${EMAIL_BRAND.termsUrl}"
                          style="
                            color:${EMAIL_BRAND.softWhite};
                            text-decoration:underline;
                          "
                        >
                          Terms & Conditions
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
    bodyHtml: `
      <p style="margin:0 0 22px;">
        A candidate has registered their CV through the Illuminex
        website.
      </p>

      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="
          width:100%;
          border-collapse:collapse;
          background:#f4f7fa;
          border:1px solid #dce3e9;
          border-radius:14px;
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
            `${input.fileType}, ${input.sizeMb} MB`
          )}
        </tbody>
      </table>

      <div
        style="
          margin-top:22px;
          padding:18px 20px;
          background:#f4f7fa;
          border-left:5px solid ${EMAIL_BRAND.kingfisherOrange};
          border-radius:8px;
        "
      >
        <strong
          style="
            display:block;
            margin-bottom:8px;
            color:${EMAIL_BRAND.primaryBlue};
          "
        >
          Candidate message
        </strong>

        <div style="white-space:pre-wrap;">
          ${escapeHtml(input.message || "-")}
        </div>
      </div>
    `,
  });
}

/* ==========================================================
   CANDIDATE CONFIRMATION EMAIL
========================================================== */

export function buildCandidateConfirmationEmail(input: {
  firstName: string;
}): string {
  return buildEmailLayout({
    eyebrow: "CV registration received",
    heading: "Thank you for registering",
    bodyHtml: `
      <p style="margin:0 0 18px;">
        Hello ${escapeHtml(input.firstName)},
      </p>

      <p style="margin:0 0 18px;">
        Thank you for registering your CV with Illuminex Consultancy.
      </p>

      <p style="margin:0 0 18px;">
        Your details and CV have been received securely and will be
        personally reviewed by an Illuminex Recruitment Consultant.
      </p>

      <p style="margin:0 0 24px;">
        We will contact you discreetly when a suitable opportunity
        matches your experience and career direction.
      </p>

      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        style="border-collapse:collapse;margin:0 0 24px;"
      >
        <tbody>
          <tr>
            <td
              style="
                border-radius:999px;
                background:${EMAIL_BRAND.kingfisherOrange};
              "
            >
              <a
                href="${EMAIL_BRAND.liveJobsUrl}"
                style="
                  display:inline-block;
                  padding:14px 24px;
                  font-size:15px;
                  font-weight:700;
                  color:${EMAIL_BRAND.deepBlue};
                  text-decoration:none;
                "
              >
                View current opportunities
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <p style="margin:0;font-size:14px;line-height:1.65;color:#4b5560;">
        Your personal information will be handled confidentially in
        accordance with our
        <a
          href="${EMAIL_BRAND.privacyUrl}"
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

function buildInformationRow(
  label: string,
  value: string
): string {
  return `
    <tr>
      <td
        valign="top"
        style="
          width:170px;
          padding:12px 14px;
          border-bottom:1px solid #dce3e9;
          font-size:13px;
          font-weight:700;
          color:${EMAIL_BRAND.primaryBlue};
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        valign="top"
        style="
          padding:12px 14px;
          border-bottom:1px solid #dce3e9;
          font-size:14px;
          color:${EMAIL_BRAND.bodyText};
          word-break:break-word;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
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