import { NextResponse, type NextRequest } from "next/server";
import { clientKey, createRateLimiter, readJson } from "@/lib/rate-limit";

/** Mock newsletter signup (footer). Validates the email on the server; stores and logs nothing. */

const limited = createRateLimiter({ max: 5 });
const MESSAGES = { 400: "Invalid request.", 413: "Request too large.", 415: "Unsupported request." } as const;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

export async function POST(req: NextRequest) {
  if (limited(clientKey(req))) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again in a minute." }, { status: 429 });
  }
  const parsed = await readJson(req);
  if ("status" in parsed) return NextResponse.json({ ok: false, message: MESSAGES[parsed.status] }, { status: parsed.status });
  const email = typeof parsed.body.email === "string" ? parsed.body.email.trim() : "";
  if (email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 422 });
  }
  return NextResponse.json({ ok: true });
}
