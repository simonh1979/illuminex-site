"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);

    // Honeypot field (should remain empty)
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      setStatus("error");
      setError(data?.error || "Something went wrong. Try again.");
      return;
    }

    setStatus("sent");
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0 }}
        aria-hidden="true"
      />

      <div className="contact-grid">
        <div className="contact-field">
          <label>Your name</label>
          <input name="name" required placeholder="Full name" />
        </div>

        <div className="contact-field">
          <label>Email</label>
          <input name="email" type="email" required placeholder="you@company.com" />
        </div>

        <div className="contact-field">
          <label>Company (optional)</label>
          <input name="company" placeholder="Company name" />
        </div>

        <div className="contact-field">
          <label>Phone (optional)</label>
          <input name="phone" placeholder="Phone number" />
        </div>

        <div className="contact-field contact-field--wide">
          <label>Message</label>
          <textarea name="message" required placeholder="Tell us what you need…" />
        </div>
      </div>

      {status === "error" && <div className="apply-error">{error}</div>}
      {status === "sent" && (
        <div className="apply-success-card">
          <strong>Sent.</strong> We’ll respond shortly.
        </div>
      )}

      <button className="apply-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}