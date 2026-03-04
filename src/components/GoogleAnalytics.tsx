// src/components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  measurementId: string; // e.g. "G-ZTZ6KJ6GMT"
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

// cookie_consent_level is URL encoded JSON (from your screenshot)
function parseConsentLevelCookie(): any | null {
  const raw = getCookie("cookie_consent_level");
  if (!raw) return null;

  try {
    // raw will look like: %7B%22strictly-necessary%22%3Atrue%2C...
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function hasTrackingConsent(): boolean {
  // 1) Basic “accepted” flag (you have this cookie)
  const accepted = (getCookie("cookie_consent_user_accepted") || "").toLowerCase();
  const isAccepted = accepted === "true" || accepted === "1" || accepted === "yes";
  if (!isAccepted) return false;

  // 2) Ensure they actually enabled tracking (or targeting) in preferences
  const level = parseConsentLevelCookie();

  // If TermsFeed hasn’t written structured levels yet, be conservative: NO tracking
  if (!level || typeof level !== "object") return false;

  // Keys commonly present in your preferences centre:
  // "tracking" and "targeting"
  return level["tracking"] === true || level["targeting"] === true;
}

export default function GoogleAnalytics({ measurementId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => setEnabled(hasTrackingConsent());
    check();

    // Re-check after preference changes (simple + safe)
    const t = window.setInterval(check, 800);
    return () => window.clearInterval(t);
  }, []);

  if (!measurementId) return null;
  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}