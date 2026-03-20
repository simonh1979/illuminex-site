"use client";

export default function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => {
        const btn = document.getElementById("open_preferences_center");
        if (btn) btn.click();
      }}
      className="text-link"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      clicking here
    </button>
  );
}