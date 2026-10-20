import { NextResponse, type NextRequest } from "next/server";
import { normalizeIndianMobile } from "@/lib/lead";
import { clientKey, createRateLimiter, readJson } from "@/lib/rate-limit";
import { BOOKING_CITIES, CALLBACK_TREATMENTS } from "@/components/ui/site/site-links";

/** Mock "Book A Consultation Now!" endpoint (popup, same fields as berkowits.com). Validates; stores and logs nothing. */

const limited = createRateLimiter({ max: 5 });
const MESSAGES = { 400: "Invalid request.", 413: "Request too large.", 415: "Unsupported request." } as const;
const NAME = /^[\p{L} .'-]{1,40}$/u;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i;

export async function POST(req: NextRequest) {
  if (limited(clientKey(req))) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again in a minute." }, { status: 429 });
  }
  const parsed = await readJson(req);
  if ("status" in parsed) return NextResponse.json({ ok: false, message: MESSAGES[parsed.status] }, { status: parsed.status });
  const { firstname, lastname, phone, email, city, treatment, company } = parsed.body;

  // Honeypot: bots fill the hidden field; answer like a success so they learn nothing.
  if (typeof company === "string" && company.trim() !== "") return NextResponse.json({ ok: true });

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const errors: Record<string, string> = {};
  if (!NAME.test(str(firstname))) errors.firstname = str(firstname) ? "Please enter a valid first name" : "First name is required";
  if (!NAME.test(str(lastname))) errors.lastname = str(lastname) ? "Please enter a valid last name" : "Last name is required";
  if (!normalizeIndianMobile(str(phone))) errors.phone = str(phone) ? "Please enter a valid 10-digit mobile number" : "Phone number is required";
  if (!EMAIL.test(str(email))) errors.email = str(email) ? "Please enter a valid email" : "Email is required";
  if (!BOOKING_CITIES.includes(str(city))) errors.city = "Please select a city";
  // Optional page context (the treatment page the visitor booked from).
  if (treatment !== undefined && treatment !== "" && !CALLBACK_TREATMENTS.includes(str(treatment))) errors.treatment = "Invalid treatment";

  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  return NextResponse.json({ ok: true });
}
