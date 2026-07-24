// src/app/admin/2fa/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Admin2FAPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [capsOn, setCapsOn] = useState(false);

  function handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    setCapsOn(e.getModifierState("CapsLock"));
  }

  function getErrorMessage(code: string | null) {
    if (code === "server") {
      return "Authentication service unavailable. Please try again.";
    }

    if (code === "expired") {
      return "Your login session expired. Please sign in again.";
    }

    if (code === "1") {
      return "Incorrect verification code.";
    }

    return null;
  }

  const errorMessage = getErrorMessage(error);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>2FA Verification</h3>
        <p className="jobs-muted" style={{ margin: 0 }}>
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      {errorMessage && (
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,50,50,0.12)",
          }}
        >
          ❌ {errorMessage}
        </div>
      )}

      <form
        action="/api/admin/2fa/verify"
        method="post"
        autoComplete="off"
        style={{ display: "grid", gap: 12, maxWidth: 420 }}
      >
        <div className="apply-field">
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
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