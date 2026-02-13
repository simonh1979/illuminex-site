import Image from "next/image";
import Link from "next/link";

<Link href="/" className="logo">
  <Image
    src="/logo.png"
    alt="Illuminex Consultancy"
    width={220}
    height={70}
    priority
  />
</Link>

import { Inter, Manrope } from "next/font/google";

const headingFont = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

import "./globals.css";
import type { Metadata } from "next";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <div className="hero-left">
            <h1>
              Strategic talent, delivered with clarity and precision.  <br />
              Partner with the people shaping tomorrow.
            </h1>

            <p>
              Illuminex Consultancy provides premium executive search 
              and specialist recruitment across Construction, Education and Healthcare.
              Delivering reliable mid-to-senior talent through trusted, flexible search solutions.
            </p>
          </div>

          <div className="hero-right">
            {/* YOUR SEARCH BOX COMPONENT HERE */}
          </div>
        </div>
      </section>

      {/* 🔥 PHASE 7 TRUST STRIP — PASTE IT HERE */}
      <section className="trust-strip">
        <div className="trust-inner">
          <span>Trusted by leading organisations</span>
        </div>
      </section>

    </>
  );
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <body className={`${headingFont.variable} ${inter.variable}`}>
        <header className="site-header">
          <div className="container nav-container">
            <div className="logo">
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
