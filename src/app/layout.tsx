import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

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
      </body>
    </html>
  );
}