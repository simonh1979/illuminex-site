"use client";

import { useMemo, useState } from "react";

type Props = {
  jobId: string;
  jobTitle: string;
  jobAdId?: number; // JobAdder JobAd ID (when available)
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
  terms: boolean;
  cvFile: File | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default function ApplyFormClient({ jobId, jobTitle, jobAdId }: Props) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
    terms: false,
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
    if (!form.fullName.trim()) return "Please enter your full name.";
    if (!form.email.trim() || !EMAIL_RE.test(form.email)) return "Please enter a valid email address.";
    if (!form.phone.trim()) return "Please enter a phone number.";
    if (!form.cvFile) return "Please upload your CV (PDF/DOC/DOCX).";
    if (!form.terms) return "Please confirm acceptance of the Terms & Conditions.";
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
      const fd = new FormData();
      fd.append("jobId", jobId);
      fd.append("jobTitle", jobTitle);
      fd.append("fullName", form.fullName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("linkedin", form.linkedin);
      fd.append("message", form.message);
      fd.append("terms", String(form.terms));
      if (form.cvFile) fd.append("cv", form.cvFile);

      if (typeof jobAdId === "number") {
        fd.append("jobAdId", String(jobAdId));
      }

      const res = await fetch("/api/apply", { method: "POST", body: fd });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      setSubmitted(true);
    } catch (error: any) {
      setSubmitError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ✅ IMPORTANT: className matches your CSS :has() rule in globals.css
  if (submitted) {
    return (
      <div className="apply-state is-submitted" aria-live="polite">
        <h3 style={{ marginBottom: 10 }}>Application received</h3>
        <p className="jobs-muted" style={{ marginBottom: 14 }}>
          Thank you, we’ve received your application and will respond quickly and discreetly.
        </p>

        <div className="apply-success-card">
          <div className="apply-success-row">
            <span>Role</span>
            <strong>{jobTitle}</strong>
          </div>
          <div className="apply-success-row">
            <span>Candidate</span>
            <strong>{form.fullName}</strong>
          </div>
          <div className="apply-success-row">
            <span>Email</span>
            <strong>{form.email}</strong>
          </div>
        </div>

        <div className="apply-success-actions" style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a className="jobs-clear" href="/live-jobs">View all roles</a>
          <button
            type="button"
            className="jobs-clear"
            onClick={() => window.history.back()}
          >
            Back to role
          </button>
        </div>
      </div>
    );
  }

  // ✅ Optional: also wrap the form in apply-state for consistency (not required, but tidy)
  return (
    <div className="apply-state is-form">
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
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setField("terms", e.target.checked)}
            />
            <span>
              I confirm I have read and accept the T&amp;Cs and consent to being contacted about this role.{" "}
              <span className="apply-req">*</span>
            </span>
          </label>

          <div className="apply-actions">
            {submitError ? <div className="apply-error">{submitError}</div> : null}

            <button className="apply-submit" type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit application"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}