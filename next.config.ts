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

  async redirects() {
    return [
      {
        source: "/live-jobs",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/live-jobs/:path*",
        destination: "/jobs/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    const imagePreload = (href: string) => [
      {
        key: "Link",
        value: `<${href}>; rel=preload; as=image`,
      },
    ];

    return [
      { source: "/(.*)", headers: securityHeaders },

      {
        source: "/",
        headers: imagePreload("/hero-bg-home1-optimized.jpg"),
      },
      {
        source: "/candidates",
        headers: imagePreload("/hero-bg-candidates.jpg"),
      },
      {
        source: "/clients",
        headers: imagePreload("/hero-bg-clients.jpg"),
      },
      {
        source: "/services",
        headers: imagePreload("/hero-bg-services.jpg"),
      },
      {
        source: "/consultancy",
        headers: imagePreload("/hero-bg-consultancy-optimized.webp"),
      },
      {
        source: "/contact",
        headers: imagePreload("/hero-bg-contact.jpg"),
      },
      {
        source: "/jobs/:path*",
        headers: imagePreload("/hero-bg-home-jobs-hq.jpg"),
      },
      {
        source: "/about",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
      {
        source: "/apply",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
      {
        source: "/candidate-privacy-notice",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
      {
        source: "/privacy",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
      {
        source: "/terms",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
      {
        source: "/cookies",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
      {
        source: "/sectors/:path*",
        headers: imagePreload("/hero-bg-sub1.jpg"),
      },
    ];
  },
};

export default nextConfig;