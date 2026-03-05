"use client";

export default function CookiePreferencesButton() {
  return (
    <button
      id="open_preferences_center"
      aria-label="Cookie preferences"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "none",
        background: "#f59e0b",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
      }}
    >
      ⚙
    </button>
  );
}