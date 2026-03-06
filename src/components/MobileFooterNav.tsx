"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileFooterNav() {
  const pathname = usePathname();

  return (
    <>
      <section className="footer-mobile-section">
        <h3 className="footer-mobile-title">Quick Links</h3>
        <div className="footer-mobile-pill-stack">
          <Link
            href="/"
            className="footer-mobile-pill"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          <Link
            href="/live-jobs"
            className="footer-mobile-pill"
            aria-current={pathname === "/live-jobs" ? "page" : undefined}
          >
            Live Jobs
          </Link>

          <Link
            href="/contact"
            className="footer-mobile-pill"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="footer-mobile-section">
        <h3 className="footer-mobile-title">Legal Bits</h3>
        <div className="footer-mobile-pill-stack">
          <Link
            href="/privacy"
            className="footer-mobile-pill"
            aria-current={pathname === "/privacy" ? "page" : undefined}
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="footer-mobile-pill"
            aria-current={pathname === "/terms" ? "page" : undefined}
          >
            Terms
          </Link>

          <Link
            href="/cookies"
            className="footer-mobile-pill"
            aria-current={pathname === "/cookies" ? "page" : undefined}
          >
            Cookies
          </Link>
        </div>
      </section>
    </>
  );
}