// src/app/admin/(protected)/security/page.tsx
"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

type Setup = {
  email: string;
  secretBase32: string;
  otpauthUrl: string;
};

export default function AdminSecurityPage() {
  const [setup, setSetup] = useState<Setup | null>(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function startSetup() {
    setMsg(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/2fa/setup", { cache: "no-store" });
      const json = await res.json();
      if (!json?.ok) throw new Error(json?.error || "Failed to start 2FA setup");
      setSetup(json.setup);
    } catch (e: any) {
      setMsg(e?.message || "Failed to start 2FA setup");
    } finally {
      setBusy(false);
    }
  }

  async function confirmEnable(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("code", code);

      const res = await fetch("/api/admin/2fa/enable", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Incorrect code");
      }

      setMsg("✅ 2FA enabled. Log out and log in again to test the 2FA prompt.");
      setCode("");
    } catch (err: any) {
      setMsg(`❌ ${err?.message || "Enable failed"}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Security</h3>
        <p className="jobs-muted" style={{ margin: 0, maxWidth: "90ch" }}>
          Enable 2FA for your director account. Once enabled, login will redirect to the 2FA screen.
        </p>
      </div>

      {msg && (
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: msg.startsWith("✅")
              ? "rgba(50,255,120,0.10)"
              : "rgba(255,50,50,0.12)",
          }}
        >
          {msg}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          borderRadius: 18,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <strong>2FA setup</strong>

        {!setup ? (
          <>
            <p className="jobs-muted" style={{ margin: 0 }}>
              Click to generate a 2FA secret (stored temporarily). You will then confirm it with a 6-digit code.
            </p>

            <button className="sector-cta" onClick={startSetup} disabled={busy}>
              {busy ? "Working..." : "Generate 2FA setup"}
            </button>
          </>
        ) : (
          <>
            <p className="jobs-muted" style={{ margin: 0 }}>
              Add this account in your authenticator app (Google Authenticator / Authy / Microsoft Authenticator).
            </p>

            <div style={{ display: "grid", gap: 8 }}>
              <div className="jobs-muted">Manual secret (Base32):</div>
              <pre
                style={{
                  margin: 0,
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  overflowX: "auto",
                  fontSize: 13,
                }}
              >
                {setup.secretBase32}
              </pre>

              <div className="jobs-muted">otpauth URL:</div>
              <pre
                style={{
                  margin: 0,
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  overflowX: "auto",
                  fontSize: 13,
                }}
              >
                {setup.otpauthUrl}
              </pre>
            </div>

            <form onSubmit={confirmEnable} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
              <div className="apply-field">
                <label htmlFor="code">
                  Confirm code <span className="apply-req">*</span>
                </label>
                <input
                  id="code"
                  name="code"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <button className="sector-cta" type="submit" disabled={busy}>
                {busy ? "Working..." : "Enable 2FA"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}