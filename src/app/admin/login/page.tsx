export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const showError = typeof sp?.error === "string" && sp.error.length > 0;

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>Admin login</h3>
      <p className="jobs-muted" style={{ marginBottom: 14 }}>
        Directors only. Enter your admin email + password.
      </p>

      {showError && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(180, 30, 30, 0.22)",
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          ❌ Incorrect email or password. Please try again.
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
            placeholder="director@illuminex.co.uk"
            autoComplete="username"
            required
          />
        </div>

        <div className="apply-field">
          <label htmlFor="password">
            Password <span className="apply-req">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="sector-cta" type="submit">
            Sign in
          </button>

          <a className="jobs-clear" href="/">
            Back to site
          </a>
        </div>

        <p className="jobs-muted" style={{ marginTop: 8 }}>
          If you’re already logged in, go to <a href="/admin">/admin</a>.
        </p>
      </form>
    </div>
  );
}