import type { NextRequest } from "next/server";

/**
 * Best-effort, per-instance sliding-window rate limit for the mock API routes.
 * A real deployment should use a shared store (e.g. Redis/Upstash); serverless instances don't share memory.
 */
export function createRateLimiter({ windowMs = 60_000, max = 5, maxClients = 5_000 } = {}) {
  const hits = new Map<string, number[]>();

  const evict = (now: number) => {
    for (const [k, times] of hits) {
      if (now - (times[times.length - 1] ?? 0) >= windowMs) hits.delete(k);
    }
    for (const k of hits.keys()) {
      if (hits.size <= maxClients) break;
      hits.delete(k);
    }
  };

  return function limited(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.delete(key);
    hits.set(key, recent); // re-insert so Map order stays "least recently seen first"
    if (hits.size > maxClients) evict(now);
    return recent.length > max;
  };
}

/** Prefer the proxy-set x-real-ip (Vercel sets it); fall back to the last x-forwarded-for hop. */
export function clientKey(req: NextRequest): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const hops = req.headers.get("x-forwarded-for")?.split(",").map((h) => h.trim()).filter(Boolean) ?? [];
  return hops[hops.length - 1] ?? "unknown";
}

const MAX_BODY_BYTES = 4_096;

/** Reads a small JSON body safely. Returns null (and the status to send) when it is not acceptable. */
export async function readJson(req: NextRequest): Promise<{ body: Record<string, unknown> } | { status: 400 | 413 | 415 }> {
  if (!req.headers.get("content-type")?.includes("application/json")) return { status: 415 };
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return { status: 413 };
  // Count bytes as they stream in, so a body without Content-Length is never read past the limit.
  const reader = req.body?.getReader();
  if (!reader) return { status: 400 };
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return { status: 413 };
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.byteLength;
  }
  const raw = new TextDecoder().decode(bytes);
  try {
    const body: unknown = JSON.parse(raw);
    if (typeof body !== "object" || body === null || Array.isArray(body)) return { status: 400 };
    return { body: body as Record<string, unknown> };
  } catch {
    return { status: 400 };
  }
}
