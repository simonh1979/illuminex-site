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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SiteHeader />
        {children}

        {/* Footer (CSS already exists in globals.css: .site-footer etc) */}
        <footer className="site-footer">
          <div className="footer-inner">
            <img
              className="footer-emblem"
              src="/Illuminex-logo-emblem-transparent-background-high-res.png"
              alt="Illuminex emblem"
            />

            <div className="footer-center">
              <p className="footer-text">© {new Date().getFullYear()} Illuminex Consultancy. All rights reserved.</p>

              <div className="footer-links">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/cookies">Cookies</Link>
              </div>
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