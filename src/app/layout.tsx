import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Illuminex Consultancy",
  description:
    "Strategic Talent Solutions across Construction, Education and Healthcare.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav-container">
            <div className="logo">
              <Link href="/">Illuminex Consultancy</Link>
            </div>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/sectors">Our Sectors</Link>
              <Link href="/solutions">Recruitment Solutions</Link>
              <Link href="/beyond">Beyond Recruitment</Link>
              <Link href="/about">About</Link>
              <Link href="/contact" className="nav-cta">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} Illuminex Consultancy. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
