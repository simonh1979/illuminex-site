const requests = new Map<string, { count: number; lastReset: number }>();

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;

export function rateLimit(ip: string) {
  const now = Date.now();
  const record = requests.get(ip);

  if (!record) {
    requests.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > WINDOW_SIZE) {
    requests.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}
