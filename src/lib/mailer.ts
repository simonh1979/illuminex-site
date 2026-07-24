import "server-only";

type MailAttachment = {
  filename: string;
  content: Buffer | Uint8Array | string;
  contentType?: string;
};

type SendMailOptions = {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: MailAttachment[];
};

type GraphRecipient = {
  emailAddress: {
    address: string;
  };
};

type GraphFileAttachment = {
  "@odata.type": "#microsoft.graph.fileAttachment";
  name: string;
  contentType: string;
  contentBytes: string;
};

let cachedAccessToken: {
  token: string;
  expiresAt: number;
} | null = null;

function requiredEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function splitAddresses(
  value?: string | string[]
): string[] {
  if (!value) {
    return [];
  }

  const values = Array.isArray(value) ? value : [value];

  return values
    .flatMap((entry) => entry.split(/[;,]/))
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function toGraphRecipients(
  value?: string | string[]
): GraphRecipient[] {
  return splitAddresses(value).map((address) => ({
    emailAddress: {
      address,
    },
  }));
}

function attachmentToBase64(
  content: MailAttachment["content"]
): string {
  if (typeof content === "string") {
    return Buffer.from(content).toString("base64");
  }

  return Buffer.from(content).toString("base64");
}

async function getMicrosoftGraphAccessToken(): Promise<string> {
  const now = Date.now();

  if (
    cachedAccessToken &&
    cachedAccessToken.expiresAt > now + 60_000
  ) {
    return cachedAccessToken.token;
  }

  const tenantId = requiredEnvironmentValue(
    "MICROSOFT_TENANT_ID"
  );

  const clientId = requiredEnvironmentValue(
    "MICROSOFT_CLIENT_ID"
  );

  const clientSecret = requiredEnvironmentValue(
    "MICROSOFT_CLIENT_SECRET"
  );

  const tokenBody = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(
      tenantId
    )}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: tokenBody.toString(),
      cache: "no-store",
    }
  );

  const tokenResponse = (await response
    .json()
    .catch(() => null)) as
    | {
        access_token?: string;
        expires_in?: number;
        error?: string;
        error_description?: string;
      }
    | null;

  if (!response.ok || !tokenResponse?.access_token) {
    throw new Error(
      tokenResponse?.error_description ||
        tokenResponse?.error ||
        `Microsoft Graph authentication failed (${response.status}).`
    );
  }

  const expiresInSeconds =
    typeof tokenResponse.expires_in === "number"
      ? tokenResponse.expires_in
      : 3600;

  cachedAccessToken = {
    token: tokenResponse.access_token,
    expiresAt: now + expiresInSeconds * 1000,
  };

  return tokenResponse.access_token;
}

async function sendMailWithMicrosoftGraph(
  options: SendMailOptions
): Promise<void> {
  const senderEmail = requiredEnvironmentValue(
    "MICROSOFT_SENDER_EMAIL"
  );

  const toRecipients = toGraphRecipients(options.to);

  if (toRecipients.length === 0) {
    throw new Error(
      "At least one email recipient is required."
    );
  }

  const attachments: GraphFileAttachment[] = (
    options.attachments ?? []
  ).map((attachment) => ({
    "@odata.type":
      "#microsoft.graph.fileAttachment",
    name: attachment.filename,
    contentType:
      attachment.contentType ||
      "application/octet-stream",
    contentBytes: attachmentToBase64(
      attachment.content
    ),
  }));

  const contentType = options.html ? "HTML" : "Text";
  const content = options.html || options.text || "";

  const message: Record<string, unknown> = {
    subject: options.subject,
    body: {
      contentType,
      content,
    },
    toRecipients,
  };

  const ccRecipients = toGraphRecipients(options.cc);

  if (ccRecipients.length > 0) {
    message.ccRecipients = ccRecipients;
  }

  const bccRecipients = toGraphRecipients(options.bcc);

  if (bccRecipients.length > 0) {
    message.bccRecipients = bccRecipients;
  }

  if (options.replyTo?.trim()) {
    message.replyTo = toGraphRecipients(
      options.replyTo
    );
  }

  if (attachments.length > 0) {
    message.attachments = attachments;
  }

  const accessToken =
    await getMicrosoftGraphAccessToken();

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      senderEmail
    )}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        saveToSentItems: true,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Microsoft Graph email failed (${response.status}): ${
        errorBody || "Unknown Microsoft Graph error."
      }`
    );
  }
}

export function getTransport() {
  return {
    async sendMail(
      options: SendMailOptions
    ): Promise<void> {
      await sendMailWithMicrosoftGraph(options);
    },
  };
}

export function fromAddress(): string {
  return requiredEnvironmentValue(
    "MICROSOFT_SENDER_EMAIL"
  );
}