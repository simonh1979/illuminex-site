import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  // Don’t crash builds, but route handlers will error clearly if missing.
}

export function getTransport() {
  const port = Number(SMTP_PORT || 587);
  const secure = port === 465;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export function fromAddress() {
  return process.env.SMTP_FROM || "no-reply@example.com";
}