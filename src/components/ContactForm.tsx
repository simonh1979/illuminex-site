"use client";

import { useRef, useState } from "react";
import RecaptchaClient from "@/components/RecaptchaClient";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    if (!recaptchaToken) {
      setStatus("error");
      setError("Please complete reCAPTCHA.");
      return;
    }

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
      recaptchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error || "Something went wrong. Try again.");
        return;
      }

      setStatus("sent");
      setRecaptchaToken("");

      // Safe reset (never crashes)
      formRef.current?.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="contact-form" noValidate>
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

      <RecaptchaClient onToken={setRecaptchaToken} />

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