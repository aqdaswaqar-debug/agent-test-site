import { NextResponse, type NextRequest } from "next/server";
import { normalizeIndianMobile } from "@/lib/lead";
import { clientKey, createRateLimiter, readJson } from "@/lib/rate-limit";
import { CALLBACK_CITIES, CALLBACK_TREATMENTS } from "@/components/ui/site/site-links";

/** Mock "Request a Free Callback" endpoint (footer form). Validates on the server; stores and logs nothing. */

const limited = createRateLimiter({ max: 5 });
const MESSAGES = { 400: "Invalid request.", 413: "Request too large.", 415: "Unsupported request." } as const;

export async function POST(req: NextRequest) {
  if (limited(clientKey(req))) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again in a minute." }, { status: 429 });
  }
  const parsed = await readJson(req);
  if ("status" in parsed) return NextResponse.json({ ok: false, message: MESSAGES[parsed.status] }, { status: parsed.status });
  const { name, phone, treatment, city, company } = parsed.body;

  // Honeypot: bots fill the hidden field; answer like a success so they learn nothing.
  if (typeof company === "string" && company.trim() !== "") return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  const cleanName = typeof name === "string" ? name.trim().replace(/\s+/g, " ") : "";
  if (cleanName.length < 2 || cleanName.length > 80 || !/^[\p{L} .'-]+$/u.test(cleanName)) errors.name = "Please enter your full name.";
  if (!normalizeIndianMobile(typeof phone === "string" ? phone : "")) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (typeof treatment !== "string" || !CALLBACK_TREATMENTS.includes(treatment)) errors.treatment = "Please choose a treatment.";
  if (typeof city !== "string" || !CALLBACK_CITIES.includes(city)) errors.city = "Please choose a city.";

  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  return NextResponse.json({ ok: true });
}
