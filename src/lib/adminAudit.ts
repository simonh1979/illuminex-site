// src/lib/adminAudit.ts
import { redis } from "@/lib/redis";

export type AdminAuditEvent = {
  ts: number;
  action: string;

  // Optional identity fields (use whichever you have available)
  actorEmail?: string | null;
  actor?: string | null;

  // Context
  ip?: string | null;
  ua?: string | null;

  // Extra details if needed later
  meta?: Record<string, unknown> | null;
};

const KEY = "admin:audit:json";
const MAX_EVENTS = 200; // keep last 200

async function readAll(): Promise<AdminAuditEvent[]> {
  const existing = await redis.get<AdminAuditEvent[]>(KEY);
  return Array.isArray(existing) ? existing : [];
}

/**
 * Append an audit event (stored as a JSON array).
 * This avoids Redis LIST ops (lpush/lrange), which are not working in your setup.
 */
export async function logAdminEvent(evt: Omit<AdminAuditEvent, "ts">) {
  try {
    const full: AdminAuditEvent = {
      ts: Date.now(),
      action: evt.action,

      actorEmail: evt.actorEmail ?? null,
      actor: evt.actor ?? null,

      ip: evt.ip ?? null,
      ua: evt.ua ?? null,

      meta: evt.meta ?? null,
    };

    const events = await readAll();

    // newest first
    events.unshift(full);

    // cap size
    if (events.length > MAX_EVENTS) events.length = MAX_EVENTS;

    await redis.set(KEY, events);
  } catch (err) {
    // Audit logging must never break auth flows
    console.warn("[adminAudit] log failed:", err);
  }
}

export async function getAuditEvents(limit = 50): Promise<AdminAuditEvent[]> {
  try {
    const events = await readAll();
    return events.slice(0, Math.max(0, limit));
  } catch (err) {
    console.warn("[adminAudit] read failed:", err);
    return [];
  }
}