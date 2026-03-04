// C:\Users\simon\Documents\illuminex-site\next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const TERMSFEED = "https://www.termsfeed.com";
const RECAPTCHA_1 = "https://www.google.com/recaptcha/";
const RECAPTCHA_2 = "https://www.gstatic.com/recaptcha/";
const GA_TAGMANAGER = "https://www.googletagmanager.com";
const GA_ANALYTICS = "https://www.google-analytics.com";

const csp = isProd
  ? [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      // NOTE: TermsFeed + reCAPTCHA + GA4
      // (no 'unsafe-eval' in prod)
      `script-src 'self' 'unsafe-inline' ${TERMSFEED} ${GA_TAGMANAGER} ${GA_ANALYTICS} ${RECAPTCHA_1} ${RECAPTCHA_2}`,
      `connect-src 'self' https: ${GA_TAGMANAGER} ${GA_ANALYTICS} ${RECAPTCHA_1} ${RECAPTCHA_2}`,
      `frame-src 'self' ${RECAPTCHA_1} https://recaptcha.google.com/recaptcha/`,
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ")
  : [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      // Dev needs 'unsafe-eval' for Next/React dev tooling
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${TERMSFEED} ${GA_TAGMANAGER} ${GA_ANALYTICS} ${RECAPTCHA_1} ${RECAPTCHA_2}`,
      `connect-src 'self' http: https: ws: wss: ${GA_TAGMANAGER} ${GA_ANALYTICS} ${RECAPTCHA_1} ${RECAPTCHA_2}`,
      `frame-src 'self' ${RECAPTCHA_1} https://recaptcha.google.com/recaptcha/`,
      "form-action 'self'",
    ].join("; ");

const securityHeaders = [
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.165"],

  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;