import { NextResponse, type NextRequest } from "next/server";
import { validateLead } from "@/lib/lead";

/**
 * Mock lead endpoint for the test site. It validates on the server and returns a result,
 * but stores and forwards nothing (no CRM, no external calls, no logging of personal data).
 */

const MAX_BODY_BYTES = 4_096;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Best-effort, per-instance rate limit. A real deployment should use a shared store.
const hits = new Map<string, number[]>();

const MAX_TRACKED_CLIENTS = 5_000;

function rateLimited(key: string, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.delete(key);
  hits.set(key, recent); // re-insert so Map order stays "least recently seen first"
  if (hits.size > MAX_TRACKED_CLIENTS) evict(now);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

/** Drop expired entries first; if still over the cap, drop the least recently seen clients only. */
function evict(now: number) {
  for (const [k, times] of hits) {
    if (now - (times[times.length - 1] ?? 0) >= WINDOW_MS) hits.delete(k);
  }
  for (const k of hits.keys()) {
    if (hits.size <= MAX_TRACKED_CLIENTS) break;
    hits.delete(k);
  }
}

/** Prefer the proxy-set x-real-ip (Vercel sets it); fall back to the last x-forwarded-for hop. */
function clientKey(req: NextRequest): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const hops = req.headers.get("x-forwarded-for")?.split(",").map((h) => h.trim()).filter(Boolean) ?? [];
  return hops[hops.length - 1] ?? "unknown";
}

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Unsupported request." }, { status: 415 });
  }
  if (rateLimited(clientKey(req), Date.now())) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
  }
  const raw = await req.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const result = validateLead(body as Record<string, unknown>);
  if (!result.ok) {
    // Honeypot hits get a normal-looking success so bots learn nothing.
    if (result.spam) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}
