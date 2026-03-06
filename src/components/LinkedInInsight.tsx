"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  partnerId?: string;
};

declare global {
  interface Window {
    lintrk?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
  }
}

export default function LinkedInInsight({ partnerId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hasConsent =
      typeof window !== "undefined" &&
      localStorage.getItem("illuminex_cookie_consent") === "accepted";

    setEnabled(Boolean(partnerId && hasConsent));
  }, [partnerId]);

  if (!enabled || !partnerId) return null;

  return (
    <>
      <Script id="linkedin-insight-inline" strategy="afterInteractive">
        {`
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push("${partnerId}");
          (function(){
            if (window.lintrk) return;
            window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
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