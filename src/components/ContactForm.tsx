
"use client";

import { useRef, useState } from "react";
import { useContactMarket } from "@/components/ContactMarket";
import RecaptchaClient, {
  executeRecaptchaV3,
  RecaptchaDisclosure,
} from "@/components/RecaptchaClient";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const { market, setMarket } = useContactMarket();

  const enquiryEmail =
    market === "usa"
      ? "hello@illuminexconsultancy.com"
      : "hello@illuminex.co.uk";

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
        market,
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        company: String(fd.get("company") || ""),
        phone: String(fd.get("phone") || ""),
        message: String(fd.get("message") || ""),
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

  if (status === "sent") {
    return (
      <div className="contact-success">
        <strong>Message sent successfully.</strong>
        <br />
        Thank you for contacting Illuminex. We will review your message and
        respond shortly.
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="contact-form"
      noValidate
    >
      {/* Preload reCAPTCHA v3 */}
      <RecaptchaClient />

      {/* UK / Eastern USA enquiry market selection */}
      <div
        style={{
          background: "#244e6e",
          borderRadius: 8,
          padding: 16,
          marginBottom: 18,
          color: "#ffffff",
        }}
      >
        <fieldset
          style={{
            border: 0,
            padding: 0,
            margin: 0,
            minWidth: 0,
          }}
        >
          <legend
            className="contact-panel-label"
            style={{
              padding: 0,
              marginBottom: 12,
              color: "#ffffff",
            }}
          >
            Which market is your enquiry about?
          </legend>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#ffffff",
                cursor: "pointer",
                textTransform: "none",
              }}
            >
              <input
                type="radio"
                name="market"
                value="uk"
                checked={market === "uk"}
                onChange={() => setMarket("uk")}
                style={{
                  appearance: "auto",
                  width: 16,
                  height: 16,
                  padding: 0,
                  margin: 0,
                  flex: "0 0 auto",
                  accentColor: "#ff7a00",
                  cursor: "pointer",
                }}
              />
              United Kingdom
            </label>

            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#ffffff",
                cursor: "pointer",
                textTransform: "none",
              }}
            >
              <input
                type="radio"
                name="market"
                value="usa"
                checked={market === "usa"}
                onChange={() => setMarket("usa")}
                style={{
                  appearance: "auto",
                  width: 16,
                  height: 16,
                  padding: 0,
                  margin: 0,
                  flex: "0 0 auto",
                  accentColor: "#ff7a00",
                  cursor: "pointer",
                }}
              />
              Eastern USA
            </label>
          </div>
        </fieldset>

        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <div>
            Enquiries will be directed to:
          </div>

          <a
            className="contact-panel-link"
            href={`mailto:${enquiryEmail}`}
            style={{
              display: "inline-block",
              marginTop: 8,
              overflowWrap: "anywhere",
            }}
          >
            {enquiryEmail}
          </a>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-field">
          <label>Your name</label>
          <input
            name="name"
            required
            placeholder="Full name"
          />
        </div>

        <div className="contact-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </div>

        <div className="contact-field">
          <label>Company (optional)</label>
          <input
            name="company"
            placeholder="Company name"
          />
        </div>

        <div className="contact-field">
          <label>Phone (optional)</label>
          <input
            name="phone"
            placeholder="Phone number"
          />
        </div>

        <div className="contact-field contact-field--wide">
          <label>Message</label>
          <textarea
            name="message"
            required
            placeholder="Tell us what you need…"
          />
        </div>
      </div>

      <RecaptchaDisclosure />

      {status === "error" && (
        <div className="apply-error">{error}</div>
      )}

      <button
        className="apply-submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
