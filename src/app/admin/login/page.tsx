// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";

export const dynamic = "force-dynamic";

function EyeIcon({ open }: { open: boolean }) {
  // Simple inline SVG so you don't need any icon libs.
  // open=false = crossed eye, open=true = eye
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 5c5.5 0 9.6 4.1 10.9 6.4a1.2 1.2 0 0 1 0 1.2C21.6 14.9 17.5 19 12 19S2.4 14.9 1.1 12.6a1.2 1.2 0 0 1 0-1.2C2.4 9.1 6.5 5 12 5Zm0 2C7.8 7 4.4 10 3.2 12c1.2 2 4.6 5 8.8 5s7.6-3 8.8-5c-1.2-2-4.6-5-8.8-5Zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Z"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M2.3 3.7a1 1 0 0 1 1.4 0l18.6 18.6a1 1 0 1 1-1.4 1.4l-2.1-2.1A12.7 12.7 0 0 1 12 19C6.5 19 2.4 14.9 1.1 12.6a1.2 1.2 0 0 1 0-1.2A15.5 15.5 0 0 1 6 6.6L2.3 4.9a1 1 0 0 1 0-1.2Zm6.3 6.3A3.5 3.5 0 0 0 12 15.5c.5 0 1-.1 1.5-.3l-1.2-1.2a1.8 1.8 0 0 1-2.5-2.5L8.6 10Zm8.6 8.6-1.6-1.6A5.5 5.5 0 0 1 7 8.4L5.6 7A13.1 13.1 0 0 0 3.2 12c1.2 2 4.6 5 8.8 5c1.9 0 3.7-.6 5.2-1.4Zm-2.1-10.6A5.5 5.5 0 0 1 17.5 12c0 .6-.1 1.2-.3 1.7l4.6 4.6A15 15 0 0 0 20.8 12C19.6 10 16.2 7 12 7c-.7 0-1.4.1-2 .2L8.3 5.5A12.3 12.3 0 0 1 12 5c5.5 0 9.6 4.1 10.9 6.4a1.2 1.2 0 0 1 0 1.2c-.3.6-.7 1.2-1.1 1.8l-1.6-1.6c.2-.3.4-.6.6-.9c-1.2-2-4.6-5-8.8-5c-.5 0-.9 0-1.3.1l4.4 4.4Z"
      />
    </svg>
  );
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const showError = Boolean(searchParams?.error);

  const [capsOn, setCapsOn] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    setCapsOn(e.getModifierState("CapsLock"));
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Admin Login</h3>
        <p className="jobs-muted" style={{ margin: 0 }}>
          Directors only.
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
          ❌ Invalid email or password.
        </div>
      )}

      <form
        action="/api/admin/login"
        method="post"
        style={{ display: "grid", gap: 12, maxWidth: 520 }}
      >
        <div className="apply-field">
          <label htmlFor="email">
            Email <span className="apply-req">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
          />
        </div>

        <div className="apply-field" style={{ position: "relative" }}>
          <label htmlFor="password">
            Password <span className="apply-req">*</span>
          </label>

          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            required
            autoComplete="current-password"
            onKeyUp={handleKeyEvent}
            onKeyDown={handleKeyEvent}
            style={{ paddingRight: 46 }}
          />

          {/* Eye toggle button inside field */}
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            title={showPw ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: 12,
              top: 29, // positions to the right inside input under label
              height: 36,
              width: 36,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.9)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <EyeIcon open={showPw} />
          </button>
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

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="sector-cta" type="submit">
            Login
          </button>

          <a className="jobs-clear" href="/">
            Back to site
          </a>
        </div>
      </form>
    </div>
  );
}