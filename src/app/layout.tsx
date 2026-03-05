// src/app/layout.tsx
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import TermsFeedConsent from "../components/TermsFeedConsent";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import CookiePreferencesButton from "../components/CookiePreferencesButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.illuminex.co.uk"),
  title: {
    default: "Illuminex Consultancy",
    template: "%s | Illuminex Consultancy",
  },
  description:
    "Illuminex Consultancy delivers executive search and specialist recruitment across defined UK markets, with a focused, professional approach.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        {/* Cookie banner (site-wide) */}
        <TermsFeedConsent />

        {/* Google Analytics (ONLY loads after tracking consent) */}
        <GoogleAnalytics measurementId="G-ZTZ6KJ6GMT" />

        <SiteHeader />

        {children}

        <footer className="site-footer">
          <div className="footer-inner">
            {/* LEFT EMBLEM */}
            <div className="footer-emblem-wrap footer-emblem-wrap--left">
              <img
                className="footer-emblem"
                src="/Illuminex-logo-emblem-transparent-background-high-res.png"
                alt="Illuminex emblem"
              />
            </div>

            <div className="footer-center">
              <p className="footer-legal">
                © 2026 Illuminex Ltd. Registered in England &amp; Wales. Company
                No. 16961631. All Rights Reserved.
              </p>

              <div className="footer-contact-row" aria-label="Footer contact">
                <a
                  className="footer-contact footer-email"
                  href="mailto:hello@illuminex.co.uk"
                >
                  <span className="footer-contact__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="m6 8 6 5 6-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  hello@illuminex.co.uk
                </a>

                <span className="footer-contact footer-phone">
                  <span className="footer-contact__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.5 3.5h3l1.2 5-2 1.2c1.2 2.4 3.1 4.3 5.5 5.5l1.2-2 5 1.2v3A2.6 2.6 0 0 1 17.9 21C10.2 20.2 3.8 13.8 3 6.1A2.6 2.6 0 0 1 6.5 3.5Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  +44 (0)1234567890
                </span>
              </div>

              <div className="footer-registered">
                Registered Office: 112, Main Street, Unknown Location, City,
                Postcode
              </div>

              <nav className="footer-links" aria-label="Footer links">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/cookies">Cookies</Link>
              </nav>
            </div>

            <CookiePreferencesButton />
            
            {/* RIGHT EMBLEM */}
            <div className="footer-emblem-wrap footer-emblem-wrap--right">
              <img
                className="footer-emblem footer-emblem--right"
                src="/Illuminex-logo-emblem-transparent-background-high-res.png"
                alt="Illuminex emblem"
              />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}