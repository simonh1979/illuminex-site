"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

type Props = {
  onToken: (token: string) => void;
};

let scriptLoading: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.grecaptcha) return Promise.resolve();

  if (!scriptLoading) {
    scriptLoading = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://www.google.com/recaptcha/api.js"]'
      );
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("reCAPTCHA script failed to load")));
        return;
      }

      const s = document.createElement("script");
      s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
      document.head.appendChild(s);
    });
  }

  return scriptLoading;
}

export default function RecaptchaClient({ onToken }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!siteKey) return;

      try {
        await loadRecaptchaScript();
        if (cancelled) return;

        if (!window.grecaptcha || !elRef.current) return;

        // Avoid double-render if React remounts
        if (widgetIdRef.current !== null) {
          setReady(true);
          return;
        }

        widgetIdRef.current = window.grecaptcha.render(elRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });

        setReady(true);
      } catch {
        // swallow – UI will show "not configured" style elsewhere if needed
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [siteKey, onToken]);

  if (!siteKey) {
    return (
      <p style={{ marginTop: 12, opacity: 0.85 }}>
        reCAPTCHA is not configured (missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY).
      </p>
    );
  }

  return (
    <div style={{ marginTop: 18 }}>
      <div ref={elRef} />
      {ready ? null : (
        <p style={{ marginTop: 10, fontSize: "0.9rem", opacity: 0.85 }}>
          Loading verification…
        </p>
      )}

      {/* Disclosure wording */}
      <p style={{ marginTop: 10, fontSize: "0.9rem", opacity: 0.85, lineHeight: 1.5 }}>
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit" }}
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit" }}
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </div>
  );
}