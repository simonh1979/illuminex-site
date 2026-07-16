// C:\Users\simon\Documents\illuminex-site\src\app\api\candidate-register\route.ts
import {
  buildCandidateConfirmationEmail,
  buildCandidateRegistrationInternalEmail,
} from "@/lib/emailTemplates";
import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";
import { logAdminEvent } from "@/lib/adminAudit";
import { candidateRateLimit } from "@/lib/rateLimit";
import {
  cleanText,
  getClientIp,
  isEmail,
  isMultipartRequest,
  isSafeUploadFilename,
  looksLikeSuspiciousUrlSpam,
} from "@/lib/validation";
import {
  createCandidate,
  findCandidateByExactEmail,
  uploadCandidateCv,
} from "@/lib/firefish/candidate";
import { firefishRequest } from "@/lib/firefish/client";

export const runtime = "nodejs";

const RECAPTCHA_ACTION = "candidate_submit";
const MIN_SCORE = 0.5;

const MAX_FILE_MB = 8;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

async function verifyRecaptcha(
  token: string,
  expectedAction: string
): Promise<void> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY not set on server.");
  }

  const body = new URLSearchParams();

  body.set("secret", secret);
  body.set("response", token);

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `reCAPTCHA verification request failed (${response.status}).`
    );
  }

  if (!data?.success) {
    throw new Error("reCAPTCHA verification failed.");
  }

  if (
    typeof data.action === "string" &&
    data.action !== expectedAction
  ) {
    throw new Error("Invalid reCAPTCHA action.");
  }

  const score =
    typeof data.score === "number" ? data.score : 0;

  if (score < MIN_SCORE) {
    throw new Error("reCAPTCHA score too low.");
  }
}

function splitFullName(fullName: string): {
  firstName: string;
  surname: string;
} {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      surname: "Not provided",
    };
  }

  return {
    firstName: parts[0],
    surname: parts.slice(1).join(" "),
  };
}

function buildCandidateSummary(
  message: string,
  linkedin: string
): string {
  const summaryParts = [
    "Speculative candidate registration submitted through the Illuminex website.",
  ];

  if (linkedin) {
    summaryParts.push(`LinkedIn: ${linkedin}`);
  }

  if (message) {
    summaryParts.push(`Candidate message: ${message}`);
  }

  return summaryParts.join("\n\n");
}

function formatSubmissionDate(): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(new Date());
}

function buildFirefishActivityNote(input: {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
  filename: string;
  candidateMode: "created" | "existing";
}): string {
  const candidateResult =
    input.candidateMode === "created"
      ? "A new Firefish candidate profile was created."
      : "An existing Firefish candidate was matched by exact email address.";

  return `SPECULATIVE WEBSITE REGISTRATION

Candidate registered through illuminex.co.uk.

Submitted name:
${input.fullName}

Email:
${input.email}

Telephone:
${input.phone}

LinkedIn:
${input.linkedin || "-"}

Candidate message:
${input.message || "-"}

CV uploaded:
${input.filename}

Firefish result:
${candidateResult}

Source:
Illuminex Website

Submitted:
${formatSubmissionDate()}`;
}

async function addCandidateActivityNote(
  candidateRef: number,
  note: string
): Promise<void> {
  if (!Number.isInteger(candidateRef) || candidateRef <= 0) {
    throw new Error(
      "A valid Firefish candidate reference is required for the activity note."
    );
  }

  if (!note.trim()) {
    throw new Error(
      "A Firefish candidate activity note is required."
    );
  }

  await firefishRequest(
    `/api/v1.0/candidates/${candidateRef}/activity/notes`,
    {
      method: "POST",
      body: {
        Note: note,
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    if (!isMultipartRequest(req)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid content type.",
        },
        {
          status: 400,
        }
      );
    }

    const ip = getClientIp(req);

    const rate = await candidateRateLimit.limit(
      `candidate:${ip}`
    );

    if (!rate.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Try again shortly.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.max(
                1,
                Math.ceil((rate.reset - Date.now()) / 1000)
              )
            ),
          },
        }
      );
    }

    const form = await req.formData();

    const website = cleanText(form.get("website"), 200);

    if (website.length > 0) {
      return NextResponse.json({
        ok: true,
      });
    }

    const recaptchaToken = cleanText(
      form.get("recaptchaToken"),
      4000
    );

    if (!recaptchaToken) {
      return NextResponse.json(
        {
          ok: false,
          error: "Verification missing. Please try again.",
        },
        {
          status: 400,
        }
      );
    }

    await verifyRecaptcha(
      recaptchaToken,
      RECAPTCHA_ACTION
    );

    const fullName = cleanText(
      form.get("fullName"),
      120
    );

    const email = cleanText(
      form.get("email"),
      160
    ).toLowerCase();

    const phone = cleanText(
      form.get("phone"),
      50
    );

    const linkedin = cleanText(
      form.get("linkedin"),
      300
    );

    const message = cleanText(
      form.get("message"),
      3000
    );

    const terms =
      String(form.get("terms") || "") === "true";

    const privacy =
      String(form.get("privacy") || "") === "true";

    const cookies =
      String(form.get("cookies") || "") === "true";

    if (fullName.length < 2) {
      return NextResponse.json(
        {
          ok: false,
          error: "Name is too short.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a phone number.",
        },
        {
          status: 400,
        }
      );
    }

    if (!terms || !privacy || !cookies) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please accept Terms, Privacy and Cookies.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      looksLikeSuspiciousUrlSpam(fullName) ||
      looksLikeSuspiciousUrlSpam(message)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid submission.",
        },
        {
          status: 400,
        }
      );
    }

    const file = form.get("cv");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please attach your CV.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isSafeUploadFilename(file.name)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid CV file name.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: "CV must be PDF or Word (.doc/.docx).",
        },
        {
          status: 400,
        }
      );
    }

    const sizeMb = file.size / (1024 * 1024);

    if (sizeMb > MAX_FILE_MB) {
      return NextResponse.json(
        {
          ok: false,
          error: `CV too large. Max ${MAX_FILE_MB}MB.`,
        },
        {
          status: 400,
        }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "The uploaded CV is empty.",
        },
        {
          status: 400,
        }
      );
    }

    const { firstName, surname } =
      splitFullName(fullName);

    const existingCandidate =
      await findCandidateByExactEmail(email);

    let candidateRef: number;
    let candidateMode: "created" | "existing";

    if (existingCandidate) {
      candidateRef = existingCandidate.Ref;
      candidateMode = "existing";
    } else {
      candidateRef = await createCandidate({
        FirstName: firstName,
        Surname: surname,
        Source:
          process.env.FIREFISH_CANDIDATE_SOURCE?.trim() ||
          "Illuminex Website",
        EmailAddress: email,
        MobileNumber: phone,
        LegalBasis: "consent-provided",
        LinkedIn: linkedin || undefined,
        CandidateSummary: buildCandidateSummary(
          message,
          linkedin
        ),
        PermanentStatus: "actively-looking",

        // Marketing permissions are deliberately false because
        // the current form does not ask for marketing consent.
        EmailMarketing: false,
        SMSMarketing: false,
        PostalMarketing: false,
        HasPreferenceJobAlerts: false,

        OwnerUserEmail:
          process.env.FIREFISH_CANDIDATE_OWNER_EMAIL?.trim() ||
          undefined,
      });

      candidateMode = "created";
    }

    await uploadCandidateCv(
      candidateRef,
      file,
      file.name
    );

    const firefishActivityNote =
      buildFirefishActivityNote({
        fullName,
        email,
        phone,
        linkedin,
        message,
        filename: file.name,
        candidateMode,
      });

    await addCandidateActivityNote(
      candidateRef,
      firefishActivityNote
    );

    const bytes = Buffer.from(
      await file.arrayBuffer()
    );

    const transport = getTransport();

    const companyRecipient =
      process.env.CANDIDATE_TO?.trim();

    const companyCc =
      process.env.CANDIDATE_CC?.trim() || undefined;

    if (!companyRecipient) {
      throw new Error(
        "CANDIDATE_TO is not set on the server."
      );
    }

    await transport.sendMail({
  from: fromAddress(),
  to: companyRecipient,
  cc: companyCc,
  replyTo: email,
  subject: `New candidate registration — ${fullName}`,
  html: buildCandidateRegistrationInternalEmail({
    fullName,
    email,
    phone,
    linkedin,
    message,
    filename: file.name,
    fileType: file.type,
    sizeMb: Math.round(sizeMb * 10) / 10,
    candidateRef,
    candidateMode,
  }),
  text: `New speculative candidate registration:

Name: ${fullName}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin || "-"}

Message:
${message || "-"}

Firefish candidate reference: ${candidateRef}
Firefish result: ${
        candidateMode === "created"
          ? "New candidate created"
          : "Existing candidate matched by email"
      }

Firefish activity note: Created

Attached: ${file.name} (${file.type}, ${
        Math.round(sizeMb * 10) / 10
      }MB)
`,
      attachments: [
        {
          filename: file.name || "cv",
          content: bytes,
          contentType: file.type,
        },
      ],
    });

    await transport.sendMail({
  from: fromAddress(),
  to: email,
  replyTo: companyRecipient,
  subject:
    "We’ve received your CV — Illuminex Consultancy",
  html: buildCandidateConfirmationEmail({
    firstName,
  }),
  text: `Hello ${firstName},

Thank you for registering your CV with Illuminex Consultancy.

Your details and CV have been received securely and will be personally reviewed by an Illuminex Recruitment Consultant.

We will contact you discreetly when a suitable opportunity matches your experience and career direction.

You can also view our current opportunities at:
https://www.illuminex.co.uk/live-jobs

Your personal information will be handled confidentially in accordance with our Privacy Policy:
https://www.illuminex.co.uk/privacy

Kind regards,

Illuminex Consultancy
`,
    });

    await logAdminEvent({
      action: "candidate.register",
      actorEmail: email,
      actor: fullName,
      ip,
      meta: {
        phone,
        linkedin: linkedin || null,
        cvName: file.name,
        cvType: file.type,
        cvSizeMb:
          Math.round(sizeMb * 10) / 10,
        mode: "live",
        firefishCandidateRef: candidateRef,
        firefishCandidateMode: candidateMode,
        firefishActivityNoteCreated: true,
        companyNotificationSentTo:
          companyRecipient,
        companyNotificationCc:
          companyCc || null,
        candidateConfirmationSent: true,
        emailMarketing: false,
        smsMarketing: false,
      },
    });

    return NextResponse.json({
      ok: true,
      firefish: {
        candidateRef,
        mode: candidateMode,
        cvUploaded: true,
        activityNoteCreated: true,
      },
      notifications: {
        company: true,
        candidate: true,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Server error.";

    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}