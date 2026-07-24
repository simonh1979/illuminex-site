"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    cookieconsent?: {
      run: (config: Record<string, any>) => void;
    };
  }
}

export default function TermsFeedConsent() {
  useEffect(() => {
    const init = () => {
      if (!window.cookieconsent?.run) return;

      const privacyUrl = `${window.location.origin}/privacy`;

      window.cookieconsent.run({
        notice_banner_type: "simple",
        consent_type: "express",
        palette: "dark",
        language: "en",
        page_load_consent_levels: ["strictly-necessary"],
        notice_banner_reject_button_hide: false,
        preferences_center_close_button_hide: false,
        page_refresh_confirmation_buttons: false,
        website_name: "Illuminex",
        website_privacy_policy_url: privacyUrl,
      });
    };

    // run now
    init();

    // retry briefly in case script loads afterInteractive
    let tries = 0;
    const t = window.setInterval(() => {
      tries += 1;
      init();
      if (window.cookieconsent?.run || tries >= 20) window.clearInterval(t);
    }, 150);

    return () => window.clearInterval(t);
  }, []);

  return (
    <Script
      src="https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js"
      strategy="afterInteractive"
    />
  );
}