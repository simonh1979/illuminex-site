// src/lib/adminAudit.ts
import { redis } from "@/lib/redis";

export type AdminAuditEvent = {
  ts: number;
  action: string;

  actorEmail?: string | null;
  actor?: string | null;

  ip?: string | null;
  ua?: string | null;

  meta?: Record<string, unknown> | null;
};

const KEY = "admin:audit:json";
const MAX_EVENTS = 200;

async function readAll(): Promise<AdminAuditEvent[]> {
  if (!redis) return [];
  const existing = await redis.get<AdminAuditEvent[]>(KEY);
  return Array.isArray(existing) ? existing : [];
}

export async function logAdminEvent(evt: Omit<AdminAuditEvent, "ts">) {
  try {
    if (!redis) return;

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
    events.unshift(full);

    if (events.length > MAX_EVENTS) events.length = MAX_EVENTS;

    await redis.set(KEY, events);
  } catch (err) {
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