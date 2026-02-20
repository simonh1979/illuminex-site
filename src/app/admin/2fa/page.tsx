// src/app/admin/2fa/page.tsx
"use client";

import { useState } from "react";

export const dynamic = "force-dynamic";

export default function Admin2FAPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const showError = Boolean(searchParams?.error);
  const [capsOn, setCapsOn] = useState(false);

  function handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    setCapsOn(e.getModifierState("CapsLock"));
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>2FA Verification</h3>
        <p className="jobs-muted" style={{ margin: 0 }}>
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      {showError && (
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,50,50,0.12)",
          }}
        >
          ❌ Incorrect code.
        </div>
      )}

      <form
        action="/api/admin/2fa/verify"
        method="post"
        style={{ display: "grid", gap: 12, maxWidth: 420 }}
      >
        <div className="apply-field">
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            required
            onKeyUp={handleKeyEvent}
            onKeyDown={handleKeyEvent}
          />
        </div>

        {capsOn && (
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,165,0,0.15)",
              fontSize: 14,
            }}
          >
            ⚠️ Caps Lock is ON
          </div>
        )}

        <button className="sector-cta" type="submit">
          Verify
        </button>
      </form>
    </div>
  );
}