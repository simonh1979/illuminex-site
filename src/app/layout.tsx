import "./globals.css";
import Link from "next/link";
import { Inter, Sora } from "next/font/google";

export const metadata = {
  title: "Illuminex Consultancy",
  description: "Premium Executive Search & Specialist Recruitment",
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<body className={`${inter.variable} ${sora.variable}`}>

        {/* ================= HEADER ================= */}
        <header className="site-header">
          <div className="header-inner">

<a href="/" className="logo-wrap">
  <img
    src="/illuminex-logo-flat-transparent-background.png"
    alt="Illuminex Consultancy"
    style={{
    }}
  />
</a>

            <nav className="main-nav">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/clients">Clients</Link>
              <Link href="/candidates">Candidates</Link>
              <Link href="/live-jobs">Live Jobs</Link>
              <Link href="/services" className="services-pill">Services</Link>
              <Link href="/contact" className="contact-pill">Contact</Link>

            </nav>

          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        {children}

        {/* ================= FOOTER ================= */}
<footer className="site-footer">
  <div className="footer-inner">

    <img
      src="/illuminex-logo-emblem-transparent-background-high-res.png"
      alt="Illuminex Emblem"
      className="footer-emblem footer-emblem--left"
    />

    <p className="footer-text">
      © {new Date().getFullYear()} Illuminex Consultancy. All rights reserved.
    </p>

    <img
      src="/illuminex-logo-emblem-transparent-background-high-res.png"
      alt="Illuminex Emblem"
      className="footer-emblem footer-emblem--right"
    />

  </div>
</footer>
      </body>
    </html>
  );
}
