/**
 * Lead (consultation booking) validation, shared by the form and the API route.
 * No validation library is installed (SOP Section 7.4), so this is a small typed validator.
 */

export const LEAD_LIMITS = { nameMax: 80, concernMax: 500 } as const;

/** Clinics this template can book for. The server only accepts these values. */
export const BOOKABLE_CLINICS = ["Berkowits Bengali Market, Delhi"] as const;
export type BookableClinic = (typeof BOOKABLE_CLINICS)[number];

export type LeadInput = {
  name: string;
  phone: string;
  clinic: string;
  concern: string;
  /** Honeypot: real users never see or fill this field. */
  website: string;
};

export type Lead = { name: string; phone: string; clinic: BookableClinic; concern: string };
export type LeadField = "name" | "phone" | "clinic" | "concern";
export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadResult = { ok: true; lead: Lead } | { ok: false; errors: LeadErrors; spam?: boolean };

const NAME_PATTERN = /^[\p{L}][\p{L} .'-]*$/u;

/** Accepts 10-digit Indian mobile numbers with optional +91 / 91 / 0 prefix; returns +91XXXXXXXXXX. */
export function normalizeIndianMobile(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, "").replace(/^\+/, "");
  const local = digits.replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(local) ? `+91${local}` : null;
}

function isBookableClinic(value: string): value is BookableClinic {
  return (BOOKABLE_CLINICS as readonly string[]).includes(value);
}

export function validateLead(input: Partial<Record<keyof LeadInput, unknown>>): LeadResult {
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = text(input.name).replace(/\s+/g, " ");
  const phone = text(input.phone);
  const clinic = text(input.clinic);
  const concern = text(input.concern);
  const website = text(input.website);

  if (website) return { ok: false, errors: {}, spam: true };

  const errors: LeadErrors = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > LEAD_LIMITS.nameMax) errors.name = `Please keep your name under ${LEAD_LIMITS.nameMax} characters.`;
  else if (!NAME_PATTERN.test(name)) errors.name = "Please use letters only.";

  const normalizedPhone = normalizeIndianMobile(phone);
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!normalizedPhone) errors.phone = "Please enter a valid 10-digit mobile number.";

  if (!isBookableClinic(clinic)) errors.clinic = "Please choose a clinic.";
  if (concern.length > LEAD_LIMITS.concernMax)
    errors.concern = `Please keep this under ${LEAD_LIMITS.concernMax} characters.`;

  if (Object.keys(errors).length > 0 || !normalizedPhone || !isBookableClinic(clinic)) return { ok: false, errors };
  return { ok: true, lead: { name, phone: normalizedPhone, clinic, concern } };
}
