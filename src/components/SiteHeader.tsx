"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="logo-wrap" aria-label="Illuminex Consultancy Home">
<img
  src="/illuminex-logo-flat-transparent-background.png"
  alt="Illuminex Consultancy"
  className="site-logo"
/>
        </a>

{/* Desktop nav */}
<nav className="main-nav nav-desktop" aria-label="Primary">
  <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
  <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
  <Link href="/clients" aria-current={pathname === "/clients" ? "page" : undefined}>Clients</Link>
  <Link href="/candidates" aria-current={pathname === "/candidates" ? "page" : undefined}>Candidates</Link>
  <Link href="/live-jobs" aria-current={pathname === "/live-jobs" ? "page" : undefined}>Live Jobs</Link>

  <Link
    href="/services"
    className="services-pill"
    aria-current={pathname === "/services" ? "page" : undefined}
  >
    Services
  </Link>

  <Link
    href="/contact"
    className="contact-pill"
    aria-current={pathname === "/contact" ? "page" : undefined}
  >
    Contact
  </Link>
</nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-lines" aria-hidden="true" />
          <span className="nav-toggle-text">Menu</span>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`nav-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Side drawer */}
      <aside className={`nav-drawer ${open ? "is-open" : ""}`} aria-label="Menu">
        <div className="nav-drawer-head">
          <div className="nav-drawer-brand">Illuminex</div>

          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="nav-drawer-links">
  <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
  <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
  <Link href="/clients" aria-current={pathname === "/clients" ? "page" : undefined}>Clients</Link>
  <Link href="/candidates" aria-current={pathname === "/candidates" ? "page" : undefined}>Candidates</Link>
  <Link href="/live-jobs" aria-current={pathname === "/live-jobs" ? "page" : undefined}>Live Jobs</Link>
  <Link href="/services" aria-current={pathname === "/services" ? "page" : undefined}>Services</Link>
  <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
</div>

        <div className="nav-drawer-foot">
          <div className="nav-drawer-note">
            Premium executive search & specialist recruitment.
          </div>
        </div>
      </aside>
    </header>
  );
}
