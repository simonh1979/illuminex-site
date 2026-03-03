"use client";

import { useRef, useState } from "react";
import RecaptchaClient, { executeRecaptchaV3, RecaptchaDisclosure } from "@/components/RecaptchaClient";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const token = await executeRecaptchaV3("contact_submit");

      const formEl = formRef.current;
      if (!formEl) throw new Error("Form not ready.");

      const fd = new FormData(formEl);

      const payload = {
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        company: String(fd.get("company") || ""),
        phone: String(fd.get("phone") || ""),
        message: String(fd.get("message") || ""),
        website: String(fd.get("website") || ""), // honeypot
        recaptchaToken: token,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Try again.");
      }

      setStatus("sent");
      formRef.current?.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="contact-form" noValidate>
      {/* preload v3 script */}
      <RecaptchaClient />

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

      <RecaptchaDisclosure />

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