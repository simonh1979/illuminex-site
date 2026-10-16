
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ContactMarket = "uk" | "usa";

type ContactMarketContextValue = {
  market: ContactMarket;
  setMarket: (market: ContactMarket) => void;
};

const ContactMarketContext =
  createContext<ContactMarketContextValue | null>(null);

export function ContactMarketProvider({
  initialMarket,
  children,
}: {
  initialMarket: ContactMarket;
  children: ReactNode;
}) {
  const [market, setMarket] =
    useState<ContactMarket>(initialMarket);

  useEffect(() => {
    setMarket(initialMarket);
  }, [initialMarket]);

  return (
    <ContactMarketContext.Provider
      value={{ market, setMarket }}
    >
      {children}
    </ContactMarketContext.Provider>
  );
}

export function useContactMarket() {
  const context = useContext(ContactMarketContext);

  if (!context) {
    throw new Error(
      "Contact market must be used within ContactMarketProvider."
    );
  }

  return context;
}

export function ContactMarketEmail() {
  const { market } = useContactMarket();

  const email =
    market === "usa"
      ? "hello@illuminexconsultancy.com"
      : "hello@illuminex.co.uk";

  return (
    <a
      className="contact-panel-link"
      href={`mailto:${email}`}
    >
      {email}
    </a>
  );
}
