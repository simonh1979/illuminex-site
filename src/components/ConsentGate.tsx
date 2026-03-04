"use client";

import { useEffect, useState } from "react";

type ConsentLevel =
  | "strictly-necessary"
  | "functionality"
  | "tracking"
  | "targeting";

function getConsentLevels(): ConsentLevel[] {
  try {
    const raw = localStorage.getItem("cookie_consent_level");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as ConsentLevel[];
    return [];
  } catch {
    return [];
  }
}

export default function ConsentGate() {
  const [levels, setLevels] = useState<ConsentLevel[]>([]);

  useEffect(() => {
    // initial read
    setLevels(getConsentLevels());

    // keep in sync when TermsFeed updates consent
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookie_consent_level") {
        setLevels(getConsentLevels());
      }
    };

    window.addEventListener("storage", onStorage);

    // also poll briefly (covers same-tab updates where storage event might not fire)
    let tries = 0;
    const t = window.setInterval(() => {
      tries += 1;
      setLevels(getConsentLevels());
      if (tries > 40) window.clearInterval(t); // ~6 seconds
    }, 150);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(t);
    };
  }, []);

  const hasTracking = levels.includes("tracking") || levels.includes("targeting");

  /**
   * IMPORTANT:
   * You are NOT adding any tracking today.
   * This component is just the "switchboard" so later we can drop scripts in safely.
   */

  return null;
}