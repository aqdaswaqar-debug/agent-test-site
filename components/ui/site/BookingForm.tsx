"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { normalizeIndianMobile } from "@/lib/lead";
import { cn } from "@/lib/utils";
import { BERKOWITS, BOOKING_CITIES } from "./site-links";

type Field = "firstname" | "lastname" | "phone" | "email" | "city";
type Errors = Partial<Record<Field, string>>;

const EMPTY = { firstname: "", lastname: "", phone: "", email: "", city: "", company: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validate(v: typeof EMPTY): Errors {
  const e: Errors = {};
  if (!v.firstname.trim()) e.firstname = "First name is required";
  if (!v.lastname.trim()) e.lastname = "Last name is required";
  if (!v.phone.trim()) e.phone = "Phone number is required";
  else if (!normalizeIndianMobile(v.phone)) e.phone = "Please enter a valid 10-digit mobile number";
  if (!v.email.trim()) e.email = "Email is required";
  else if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid email";
  if (!v.city) e.city = "Please select a city";
  return e;
}

const input =
  "h-11 w-full rounded-[12px] border-2 border-(--site-field) bg-white px-4 text-[15px] text-(--site-ink) outline-none transition-colors placeholder:text-(--site-subtle) focus:border-(--site-accent) aria-invalid:border-(--site-error-line)";

/**
 * "Book A Consultation Now!" form, matching the berkowits.com booking popup: first/last name, mobile, email,
 * city (live list), per-field errors plus a summary banner, privacy/terms note. `treatment` is sent as page context.
 */
export function BookingForm({ treatment, onSuccess }: { treatment?: string; onSuccess?: () => void }) {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof EMPTY) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as Field]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, treatment }) });
      const data = (await res.json()) as { ok: boolean; errors?: Errors; message?: string };
      if (data.ok) {
        toast.success("Thank you! Our expert will call you within 24 hours to confirm your consultation.");
        setValues(EMPTY);
        onSuccess?.();
      } else if (data.errors) setErrors(data.errors);
      else toast.error(data.message ?? "Something went wrong. Please try again.");
    } catch {
      toast.error("We couldn't send your request. Please check your connection.");
    } finally {
      setBusy(false);
    }
  };

  const field = (k: Field, props: { placeholder: string; type?: string; autoComplete: string; inputMode?: "tel" | "email" }) => (
    <div className="flex flex-col gap-1">
      <input
        id={`${id}-${k}`}
        name={k}
        type={props.type ?? "text"}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        aria-label={props.placeholder.replace("*", " (required)").replace("Enter your ", "")}
        value={values[k]}
        onChange={(e) => set(k)(e.target.value)}
        aria-invalid={!!errors[k] || undefined}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        className={input}
      />
      {errors[k] ? (
        <p id={`${id}-${k}-err`} className="text-[12px] text-(--site-error)">
          {errors[k]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate aria-label="Book a consultation" className="flex flex-col">
      <div className="flex flex-col gap-4 px-5 pb-5 sm:px-6">
        {hasErrors ? (
          <p role="alert" className="rounded-[12px] border border-(--site-error-soft-line) bg-(--site-error-soft) px-4 py-3 text-[14px] text-(--site-error)">
            Please fill in all required fields correctly.
          </p>
        ) : null}
        <div className="grid grid-cols-2 gap-3">
          {field("firstname", { placeholder: "First Name*", autoComplete: "given-name" })}
          {field("lastname", { placeholder: "Last Name*", autoComplete: "family-name" })}
        </div>
        {field("phone", { placeholder: "Mobile Number*", type: "tel", inputMode: "tel", autoComplete: "tel" })}
        {field("email", { placeholder: "Enter your E-mail*", type: "email", inputMode: "email", autoComplete: "email" })}
        <div className="flex flex-col gap-1">
          <div className="relative">
            <select
              id={`${id}-city`}
              name="city"
              aria-label="City (required)"
              value={values.city}
              onChange={(e) => set("city")(e.target.value)}
              aria-invalid={!!errors.city || undefined}
              aria-describedby={errors.city ? `${id}-city-err` : undefined}
              className={cn(input, "appearance-none pr-10", !values.city && "text-(--site-subtle)")}
            >
              <option value="">Select City</option>
              {BOOKING_CITIES.map((c) => (
                <option key={c} className="text-(--site-ink)">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-(--site-ink)" />
          </div>
          {errors.city ? (
            <p id={`${id}-city-err`} className="text-[12px] text-(--site-error)">
              {errors.city}
            </p>
          ) : null}
        </div>
        {/* Honeypot: hidden from people, filled by bots. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden value={values.company} onChange={(e) => set("company")(e.target.value)} className="hidden" />
      </div>
      <div className="flex flex-col gap-3 border-t border-(--site-field) px-5 pt-4 pb-5 sm:px-6">
        <button
          type="submit"
          disabled={busy}
          className="group/cta flex h-[52px] items-center justify-center gap-2 rounded-full bg-(--site-teal) text-[17px] font-semibold text-(--site-on-teal) transition-[background-color,scale] duration-150 active:scale-[0.98] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--site-accent-strong) [@media(hover:hover)]:hover:bg-(--site-teal-hover)"
        >
          {busy ? <Loader2 aria-hidden size={18} className="animate-spin" /> : null}
          Book My Free Consultation
          <ArrowRight aria-hidden size={18} className="transition-[translate] duration-200 motion-safe:group-hover/cta:translate-x-1" />
        </button>
        <p className="text-center text-[12px] text-(--site-subtle)">
          By submitting this form, you agree to our{" "}
          <a href={`${BERKOWITS}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 [@media(hover:hover)]:hover:text-(--site-ink)">
            privacy policy
          </a>{" "}
          and{" "}
          <a href={`${BERKOWITS}/terms-and-condition`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 [@media(hover:hover)]:hover:text-(--site-ink)">
            terms of service
          </a>
          .
        </p>
      </div>
    </form>
  );
}
