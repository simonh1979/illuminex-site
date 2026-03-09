"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  sector: string;
  className?: string;
  children: ReactNode;
};

export default function TrackedSectorLink({
  href,
  sector,
  className,
  children,
}: Props) {
  async function handleClick() {
    try {
      await fetch("/api/admin/track/sector-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sector, href }),
        keepalive: true,
      });
    } catch {
      // fail silently — navigation should never be blocked
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}