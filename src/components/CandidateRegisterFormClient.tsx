"use client";

import { useMemo, useState } from "react";
import RecaptchaClient, { executeRecaptchaV3, RecaptchaDisclosure } from "@/components/RecaptchaClient";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
  terms: boolean;
  privacy: boolean;
  cookies: boolean;
  cvFile: File | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default function CandidateRegisterFormClient() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
    terms: false,
    privacy: false,
    cookies: false,
    cvFile: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const fileLabel = useMemo(() => {
    if (!form.cvFile) return "No file selected";
    return `${form.cvFile.name} (${Math.round(form.cvFile.size / 1024)} KB)`;
  }, [form.cvFile]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (form.fullName.trim().length < 2) return "Please enter your full name.";
    if (!form.email.trim() || !EMAIL_RE.test(form.email)) return "Please enter a valid email address.";
    if (!form.phone.trim()) return "Please enter a phone number.";
    if (!form.cvFile) return "Please upload your CV (PDF/DOC/DOCX).";
    if (!form.terms || !form.privacy || !form.cookies) return "Please accept Terms, Privacy and Cookies.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const err = validate();
    if (err) {
      setSubmitError(err);
      return;
    }

    setSubmitting(true);

    try {
      // ✅ v3 token generated at submit-time (invisible)
      const token = await executeRecaptchaV3("candidate_submit");

      const fd = new FormData();

      // MUST match /api/candidate-register keys
      fd.append("fullName", form.fullName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("linkedin", form.linkedin);
      fd.append("message", form.message);

      fd.append("terms", String(form.terms));
      fd.append("privacy", String(form.privacy));
      fd.append("cookies", String(form.cookies));

      if (form.cvFile) fd.append("cv", form.cvFile);

      // honeypot (keep empty)
      fd.append("website", "");

      // reCAPTCHA v3 token
      fd.append("recaptchaToken", token);

      const res = await fetch("/api/candidate-register", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Request failed (${res.status})`);
      }

      setSubmitted(true);
    } catch (error: any) {
      setSubmitError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="apply-state is-submitted" aria-live="polite">
        <h3 style={{ marginBottom: 10 }}>Registration received</h3>
        <p className="jobs-muted" style={{ marginBottom: 14 }}>
          Thank you — we’ve received your details and CV.
        </p>

        <div className="apply-success-card">
          <div className="apply-success-row">
            <span>Candidate</span>
            <strong>{form.fullName}</strong>
          </div>
          <div className="apply-success-row">
            <span>Email</span>
            <strong>{form.email}</strong>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a className="jobs-clear" href="/live-jobs">
            View roles
          </a>
          <button type="button" className="jobs-clear" onClick={() => window.location.reload()}>
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-state is-form">
      {/* preload v3 script */}
      <RecaptchaClient />

      <form className="apply-form" onSubmit={onSubmit}>
        <div className="apply-form-grid">
          <div className="apply-field">
            <label htmlFor="fullName">
              Full name <span className="apply-req">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="apply-field">
            <label htmlFor="email">
              Email <span className="apply-req">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="apply-field">
            <label htmlFor="phone">
              Phone <span className="apply-req">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+44…"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              autoComplete="tel"
            />
          </div>

          <div className="apply-field">
            <label htmlFor="linkedin">LinkedIn (optional)</label>
            <input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/…"
              value={form.linkedin}
              onChange={(e) => setField("linkedin", e.target.value)}
            />
          </div>

          <div className="apply-field apply-field--wide">
            <label htmlFor="cv">
              CV <span className="apply-req">*</span>{" "}
              <span className="apply-hint">(PDF/DOC/DOCX)</span>
            </label>

            <div className="apply-file">
              <input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setField("cvFile", e.target.files?.[0] ?? null)}
              />
              <div className="apply-file-ui">
                <span className="apply-file-btn">Choose file</span>
                <span className="apply-file-name">{fileLabel}</span>
              </div>
            </div>
          </div>

          <div className="apply-field apply-field--wide">
            <label htmlFor="message">Message (optional)</label>
            <textarea
              id="message"
              placeholder="Optional — brief context helps."
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="apply-foot">
          <label className="apply-check">
            <input type="checkbox" checked={form.terms} onChange={(e) => setField("terms", e.target.checked)} />
            <span>
              I accept the Terms &amp; Conditions <span className="apply-req">*</span>
            </span>
          </label>

          <label className="apply-check">
            <input type="checkbox" checked={form.privacy} onChange={(e) => setField("privacy", e.target.checked)} />
            <span>
              I have read the Privacy Policy <span className="apply-req">*</span>
            </span>
          </label>

          <label className="apply-check">
            <input type="checkbox" checked={form.cookies} onChange={(e) => setField("cookies", e.target.checked)} />
            <span>
              I accept the Cookies Policy <span className="apply-req">*</span>
            </span>
          </label>

          <RecaptchaDisclosure />

          <div className="apply-actions" style={{ marginTop: 12 }}>
            {submitError ? <div className="apply-error">{submitError}</div> : null}

            <button className="apply-submit" type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Register & upload CV"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}