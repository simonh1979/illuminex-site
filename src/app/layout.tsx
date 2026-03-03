// src/app/layout.tsx
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";

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
        <SiteHeader />

        {children}

        <footer className="site-footer">
          <div className="footer-inner">
            <img
              className="footer-emblem"
              src="/Illuminex-logo-emblem-transparent-background-high-res.png"
              alt="Illuminex emblem"
            />

            <div className="footer-center">
              <p className="footer-legal">
                © 2026 Illuminex Ltd. Registered in England &amp; Wales. Company No. 16961631. All rights reserved.
              </p>

              <div className="footer-meta">
                <span>Registered office: To be confirmed</span>
                <span className="footer-dot">•</span>
                <a className="footer-email" href="mailto:hello@illuminex.co.uk">
                  hello@illuminex.co.uk
                </a>
              </div>

              <p className="footer-compliance">
                Illuminex Ltd operates in accordance with UK data protection law and is registered with the ICO. REC
                membership is in progress.
              </p>

              <nav className="footer-links" aria-label="Footer links">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/cookies">Cookies</Link>
              </nav>
            </div>

            <img
              className="footer-emblem footer-emblem--right"
              src="/Illuminex-logo-emblem-transparent-background-high-res.png"
              alt="Illuminex emblem"
            />
          </div>
        </footer>
      </body>
    </html>
  );
}