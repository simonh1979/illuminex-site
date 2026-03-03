"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

let scriptLoading: Promise<void> | null = null;

function loadV3Script(siteKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  // Already available
  if (window.grecaptcha) return Promise.resolve();

  // If a v2/explicit script is already on the page, remove it (prevents conflicts)
  document
    .querySelectorAll<HTMLScriptElement>('script[src^="https://www.google.com/recaptcha/api.js"]')
    .forEach((s) => s.remove());

  if (!scriptLoading) {
    scriptLoading = new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
      document.head.appendChild(s);
    });
  }

  return scriptLoading;
}

export async function executeRecaptchaV3(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

  if (!siteKey) throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY");

  await loadV3Script(siteKey);

  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) return reject(new Error("reCAPTCHA not available"));

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action })
        .then((t: string) => resolve(String(t || "")))
        .catch(() => reject(new Error("reCAPTCHA failed to execute")));
    });
  });
}

// Mount this once per page to ensure script is loaded early
export default function RecaptchaClient() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    loadV3Script(siteKey).catch(() => {});
  }, [siteKey]);

  return null;
}

export function RecaptchaDisclosure() {
  return (
    <p style={{ marginTop: 10, fontSize: "0.9rem", opacity: 0.85, lineHeight: 1.5 }}>
      This site is protected by reCAPTCHA and the Google{" "}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
        Privacy Policy
      </a>{" "}
      and{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}