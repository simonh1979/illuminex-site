import "./globals.css";
import SiteHeader from "../components/SiteHeader";
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
        <SiteHeader />

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

    <div className="footer-center">
      <p className="footer-text">
        © {new Date().getFullYear()} Illuminex Consultancy. All rights reserved.
        Registered address and company number to be added pre-launch.
      </p>

      <p className="footer-links">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/cookies">Cookies</a>
      </p>
    </div>

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
