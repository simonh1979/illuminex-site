"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);

    if (typeof window !== "undefined") {
      setHash(window.location.hash);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onCandidatesPage = pathname === "/candidates";
  const onRegisterCvSection =
    pathname === "/candidates" && hash === "#register";

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="/"
          className="logo-wrap protect-image no-context-menu"
          aria-label="Illuminex Consultancy Home"
        >
          <img
            src="/illuminex-logo-flat-transparent-background.png"
            alt="Illuminex Consultancy"
            className="site-logo"
            draggable={false}
          />
        </a>

        <nav className="main-nav nav-desktop" aria-label="Primary">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <Link
            href="/clients"
            aria-current={pathname === "/clients" ? "page" : undefined}
          >
            Clients
          </Link>
          <Link
            href="/candidates"
            aria-current={onCandidatesPage ? "page" : undefined}
          >
            Candidates
          </Link>
          <Link
            href="/live-jobs"
            aria-current={pathname === "/live-jobs" ? "page" : undefined}
          >
            Live Jobs
          </Link>

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

      <div
        className={`nav-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        className={`nav-drawer ${open ? "is-open" : ""}`}
        aria-label="Menu"
      >
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
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <Link
            href="/clients"
            aria-current={pathname === "/clients" ? "page" : undefined}
          >
            Clients
          </Link>
          <Link
            href="/candidates"
            aria-current={
              onCandidatesPage && !onRegisterCvSection ? "page" : undefined
            }
          >
            Candidates
          </Link>
          <Link
            href="/candidates#register"
            className="nav-drawer-register-cv"
            aria-current={onRegisterCvSection ? "page" : undefined}
          >
            Register CV
          </Link>
          <Link
            href="/live-jobs"
            aria-current={pathname === "/live-jobs" ? "page" : undefined}
          >
            Live Jobs
          </Link>
          <Link
            href="/services"
            aria-current={pathname === "/services" ? "page" : undefined}
          >
            Services
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
        </div>

        <div className="nav-drawer-foot">
          <div className="nav-drawer-note">
            <span className="brand-font">Illuminex</span> delivers premium
            executive search &amp; specialist recruitment.
          </div>
        </div>
      </aside>
    </header>
  );
}