import { NextResponse, type NextRequest } from "next/server";
import { clientKey, createRateLimiter, readJson } from "@/lib/rate-limit";

/**
 * Mock delivery-estimate endpoint for the PDP PIN check. Validates the PIN and returns a date range
 * computed from today (India time). Nothing is stored or logged. Real serviceability needs the courier API.
 */

const limited = createRateLimiter({ max: 10 });
const MESSAGES = { 400: "Invalid request.", 413: "Request too large.", 415: "Unsupported request." } as const;

const fmt = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export async function POST(req: NextRequest) {
  if (limited(clientKey(req))) {
    return NextResponse.json({ ok: false, message: "Too many checks. Please try again in a minute." }, { status: 429 });
  }
  const parsed = await readJson(req);
  if ("status" in parsed) return NextResponse.json({ ok: false, message: MESSAGES[parsed.status] }, { status: parsed.status });

  const pin = typeof parsed.body.pin === "string" ? parsed.body.pin.trim() : "";
  if (!/^[1-9]\d{5}$/.test(pin)) {
    return NextResponse.json({ ok: false, message: "Please enter a valid 6-digit PIN code." }, { status: 422 });
  }

  const now = new Date();
  // Metro PIN zones (1 = Delhi NCR, 4 = Mumbai/West, 5–6 = South, 7 = East) get the faster window.
  const fast = ["1", "4", "5", "6", "7"].includes(pin[0]!);
  const from = addDays(now, fast ? 2 : 4);
  const to = addDays(now, fast ? 4 : 7);

  return NextResponse.json({
    ok: true,
    message: `We deliver to ${pin}. Estimated delivery between ${fmt.format(from)} and ${fmt.format(to)}.`,
  });
}
