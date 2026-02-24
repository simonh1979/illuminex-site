"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  cv: File | null;
  website: string; // honeypot
};

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    notes: "",
    cv: null,
    website: "",
  });

  const fileLabel = useMemo(() => {
    if (!form.cv) return "No file selected";
    return `${form.cv.name} (${Math.round(form.cv.size / 1024)} KB)`;
  }, [form.cv]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.email.trim()) return setError("Please enter your email.");
    if (!form.cv) return setError("Please upload your CV (PDF/DOC/DOCX).");

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("notes", form.notes);
      fd.append("website", form.website); // honeypot
      if (form.cv) fd.append("cv", form.cv);

      const res = await fetch("/api/apply", { method: "POST", body: fd });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      const data = await res.json().catch(() => ({}));

      if (!data?.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page page-apply">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.8vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            Apply
          </h1>

          {/* Give this the same class naming convention used elsewhere */}
          <p
            className="apply-intro"
            style={{
              marginTop: 16,
              maxWidth: 980,
              fontSize: "clamp(1.05rem, 1.1vw, 1.2rem)",
              lineHeight: 1.75,
              opacity: 0.92,
            }}
          >
            Send your details and CV. We’ll confirm receipt and come back with next steps.
          </p>

          <div style={{ marginTop: 34, maxWidth: 980 }}>
            {submitted ? (
              <div className="apply-state is-submitted">
                <h3 style={{ marginBottom: 10 }}>Application received</h3>
                <p className="jobs-muted" style={{ marginBottom: 14 }}>
                  Thank you — we’ve received your application and will respond quickly and discreetly.
                </p>

                <div className="apply-success-card">
                  <div className="apply-success-row">
                    <span>Candidate</span>
                    <strong>{form.name}</strong>
                  </div>
                  <div className="apply-success-row">
                    <span>Email</span>
                    <strong>{form.email}</strong>
                  </div>
                </div>

                <div
                  className="apply-success-actions"
                  style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}
                >
                  <a className="jobs-clear" href="/live-jobs">
                    View all roles
                  </a>
                  <a className="jobs-clear" href="/contact">
                    Contact us
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  style={{ position: "absolute", left: "-9999px" }}
                  tabIndex={-1}
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12 }}>
                  <div style={{ gridColumn: "span 6" }}>
                    <label style={labelStyle}>Name *</label>
                    <input
                      name="name"
                      required
                      style={fieldStyle}
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                  </div>

                  <div style={{ gridColumn: "span 6" }}>
                    <label style={labelStyle}>Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      style={fieldStyle}
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                  </div>

                  <div style={{ gridColumn: "span 6" }}>
                    <label style={labelStyle}>Phone</label>
                    <input
                      name="phone"
                      style={fieldStyle}
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                    />
                  </div>

                  <div style={{ gridColumn: "span 6" }}>
                    <label style={labelStyle}>CV (PDF/DOC/DOCX) *</label>
                    <input
                      name="cv"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      style={fieldStyle}
                      onChange={(e) => setField("cv", e.target.files?.[0] ?? null)}
                    />
                    <div style={{ marginTop: 8, opacity: 0.9, fontWeight: 700 }}>{fileLabel}</div>
                  </div>

                  <div style={{ gridColumn: "span 12" }}>
                    <label style={labelStyle}>Notes</label>
                    <textarea
                      name="notes"
                      rows={5}
                      style={{ ...fieldStyle, height: "auto", paddingTop: 12, paddingBottom: 12 }}
                      value={form.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                    />
                  </div>

                  <div style={{ gridColumn: "span 12", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    {error ? <div className="apply-error">{error}</div> : null}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        border: 0,
                        cursor: loading ? "not-allowed" : "pointer",
                        padding: "14px 18px",
                        borderRadius: 999,
                        fontWeight: 950,
                        letterSpacing: "0.05em",
                        color: "#062033",
                        background: "linear-gradient(135deg, #ff7a00, #ff8c00, #ffb347)",
                        boxShadow:
                          "0 14px 30px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.45), inset 0 -2px 0 rgba(0, 0, 0, 0.14)",
                      }}
                    >
                      {loading ? "Sending..." : "Submit application"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  fontWeight: 800,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontSize: "0.74rem",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  height: 46,
  borderRadius: 14,
  border: "1px solid rgba(255, 255, 255, 0.18)",
  background: "rgba(255, 255, 255, 0.14)",
  color: "rgba(255, 255, 255, 0.96)",
  padding: "0 14px",
  outline: "none",
};