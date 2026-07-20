"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  partnerId?: string;
};

type ConsentLevel = {
  tracking?: boolean;
  targeting?: boolean;
};

declare global {
  interface Window {
    lintrk?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
  }
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function hasLinkedInConsent(): boolean {
  const accepted =
    (getCookie("cookie_consent_user_accepted") || "").toLowerCase() ===
    "true";

  if (!accepted) return false;

  const rawConsent = getCookie("cookie_consent_level");
  if (!rawConsent) return false;

  try {
    const consent = JSON.parse(rawConsent) as ConsentLevel;

    return consent.tracking === true && consent.targeting === true;
  } catch {
    return false;
  }
}

export default function LinkedInInsight({ partnerId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!partnerId) {
      setEnabled(false);
      return;
    }

    const checkConsent = () => {
      setEnabled(hasLinkedInConsent());
    };

    checkConsent();

    // TermsFeed loads after the page becomes interactive, so briefly
    // recheck while the visitor makes or restores their consent choice.
    const interval = window.setInterval(checkConsent, 250);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 10000);

    window.addEventListener("focus", checkConsent);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      window.removeEventListener("focus", checkConsent);
    };
  }, [partnerId]);

  if (!enabled || !partnerId) return null;

  return (
    <>
      <Script id="linkedin-insight-inline" strategy="afterInteractive">
        {`
          window._linkedin_data_partner_ids =
            window._linkedin_data_partner_ids || [];

          if (
            !window._linkedin_data_partner_ids.includes("${partnerId}")
          ) {
            window._linkedin_data_partner_ids.push("${partnerId}");
          }

          (function () {
            if (window.lintrk) return;

            window.lintrk = function (a, b) {
              window.lintrk.q.push([a, b]);
            };

            window.lintrk.q = [];
          })();
        `}
      </Script>

      <Script
        id="linkedin-insight-script"
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
