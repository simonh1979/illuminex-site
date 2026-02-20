// src/app/admin/2fa/page.tsx
export const dynamic = "force-dynamic";

type SP = { error?: string };

export default async function Admin2FAPage({
  searchParams,
}: {
  // Next.js 16: searchParams is a Promise in server components
  searchParams?: Promise<SP> | SP;
}) {
  const sp = searchParams
    ? (typeof (searchParams as any).then === "function"
        ? await (searchParams as Promise<SP>)
        : (searchParams as SP))
    : undefined;

  const showError =
    typeof sp?.error === "string" ? sp.error.length > 0 : Boolean(sp?.error);

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>2FA verification</h3>
      <p className="jobs-muted" style={{ marginBottom: 14 }}>
        Enter the 6-digit code from your authenticator app.
      </p>

      {showError && (
        <div
          style={{
            marginBottom: 14,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,50,50,0.12)",
          }}
        >
          ❌ Incorrect code. Please try again.
        </div>
      )}

      <form
        action="/api/admin/2fa/verify"
        method="post"
        style={{ display: "grid", gap: 12, maxWidth: 420 }}
      >
        <div className="apply-field">
          <label htmlFor="code">
            Code <span className="apply-req">*</span>
          </label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            placeholder="123456"
            required
          />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="sector-cta" type="submit">
            Verify
          </button>

          <a className="jobs-clear" href="/admin/login">
            Back to login
          </a>
        </div>
      </form>
    </div>
  );
}