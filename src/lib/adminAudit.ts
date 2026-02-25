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

/**
 * Read all stored audit events.
 * If Redis is not configured, return empty safely.
 */
async function readAll(): Promise<AdminAuditEvent[]> {
  if (!redis) return [];

  try {
    const existing = await redis.get(KEY);

    if (!existing || !Array.isArray(existing)) {
      return [];
    }

    return existing as AdminAuditEvent[];
  } catch (err) {
    console.warn("[adminAudit] read failed:", err);
    return [];
  }
}

/**
 * Append an audit event (JSON array storage).
 * Never throws — auth flows must not break.
 */
export async function logAdminEvent(
  evt: Omit<AdminAuditEvent, "ts">
): Promise<void> {
  if (!redis) return;

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

    if (events.length > MAX_EVENTS) {
      events.length = MAX_EVENTS;
    }

    await redis.set(KEY, events);
  } catch (err) {
    console.warn("[adminAudit] log failed:", err);
  }
}

/**
 * Retrieve recent audit events.
 */
export async function getAuditEvents(
  limit = 50
): Promise<AdminAuditEvent[]> {
  try {
    const events = await readAll();
    return events.slice(0, Math.max(0, limit));
  } catch (err) {
    console.warn("[adminAudit] get failed:", err);
    return [];
  }
}