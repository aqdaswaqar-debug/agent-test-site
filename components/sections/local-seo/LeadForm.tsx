"use client";

import { useId, useState, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { LEAD_LIMITS, validateLead, type BookableClinic, type LeadErrors, type LeadField } from "@/lib/lead";
import { cn } from "@/lib/utils";

type LeadFormProps = { hours: string; clinic: BookableClinic };

const initial = { name: "", phone: "", concern: "", website: "" };

const labelClass = "text-[11px] leading-[1.6] font-semibold tracking-[0.04em] text-(--ls-ink) uppercase lg:text-[12px]";
const fieldClass =
  "w-full rounded-[10px] border border-(--ls-field) bg-white px-3.5 py-3 text-[13px] leading-[1.6] text-(--ls-ink) placeholder:text-(--ls-placeholder) " +
  "transition-colors duration-150 focus:border-(--ls-mint-text) focus:outline-2 focus:outline-offset-0 focus:outline-(--ls-mint-text) lg:rounded-[12px] lg:px-4 lg:text-[14px] " +
  "aria-[invalid=true]:border-(--ls-error)";

export function LeadForm({ hours, clinic }: LeadFormProps) {
  const id = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof initial, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (field !== "website" && errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const describedBy = (field: LeadField) => (errors[field] ? `${id}-${field}-error` : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const check = validateLead({ ...values, clinic });
    if (!check.ok) {
      if (check.spam) return;
      setErrors(check.errors);
      const first = Object.keys(check.errors)[0];
      if (first) document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, clinic }),
      });
      const data: { ok?: boolean; errors?: LeadErrors; message?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        toast.success("Thank you! Our team will call you shortly to confirm your free consultation.");
        setValues(initial);
        setErrors({});
      } else if (data.errors) {
        setErrors(data.errors);
        toast.error("Please check the highlighted fields.");
      } else {
        toast.error(data.message ?? "Something went wrong. Please try again or call the clinic.");
      }
    } catch {
      toast.error("We couldn't send your request. Please check your connection or call the clinic.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full rounded-[18px] bg-white px-5 py-6 lg:w-[460px] lg:shrink-0 xl:w-[560px] lg:rounded-[24px] lg:p-8 lg:shadow-[0_25px_25px_rgba(0,0,0,0.25)]">
      <Toaster position="top-center" toastOptions={{ duration: 5000, style: { fontSize: "14px" } }} />
      <h3 className="text-[20px] leading-[1.6] font-semibold text-(--ls-ink) lg:text-[24px] lg:leading-[32px]">
        Book Free Consultation
      </h3>
      <p className="mt-1 text-[12px] leading-[1.6] text-(--ls-muted) lg:text-[14px]">Available {hours}</p>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-3.5 lg:mt-6 lg:gap-4" aria-label="Book a free consultation">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-name`} className={labelClass}>
            Full Name *
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LEAD_LIMITS.nameMax}
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${id}-name-error`} className="text-[12px] text-(--ls-error)">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Phone Number *
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={16}
            placeholder="+91 98XXX XXXXX"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={fieldClass}
          />
          {errors.phone ? (
            <p id={`${id}-phone-error`} className="text-[12px] text-(--ls-error)">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-clinic`} className={labelClass}>
            Clinic
          </label>
          <input
            id={`${id}-clinic`}
            name="clinic"
            type="text"
            readOnly
            value={clinic}
            aria-describedby={describedBy("clinic")}
            className={cn(fieldClass, "bg-(--ls-faq) text-(--ls-muted)")}
          />
          {errors.clinic ? (
            <p id={`${id}-clinic-error`} className="text-[12px] text-(--ls-error)">
              {errors.clinic}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-concern`} className={labelClass}>
            Your Concern
          </label>
          <textarea
            id={`${id}-concern`}
            name="concern"
            rows={3}
            maxLength={LEAD_LIMITS.concernMax}
            placeholder="Describe your hair concern (optional)"
            value={values.concern}
            onChange={(e) => update("concern", e.target.value)}
            aria-invalid={errors.concern ? true : undefined}
            aria-describedby={describedBy("concern")}
            className={cn(fieldClass, "min-h-[86px] resize-y")}
          />
          {errors.concern ? (
            <p id={`${id}-concern-error`} className="text-[12px] text-(--ls-error)">
              {errors.concern}
            </p>
          ) : null}
        </div>

        {/* Honeypot: hidden from people and assistive tech, catches simple bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="group mt-0 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] bg-(--ls-mint) text-[15px] font-medium text-(--ls-ink) transition-[background-color,transform,scale] duration-150 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ls-ink) motion-reduce:transition-none lg:rounded-full lg:text-[16px] lg:font-semibold [@media(hover:hover)]:hover:bg-(--ls-mint-hover)"
        >
          {submitting ? "Booking…" : "Book Free Consultation"}
          {!submitting ? (
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 transition-[translate] duration-200 ease-out motion-safe:[@media(hover:hover)]:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
            />
          ) : null}
        </button>
        <p className="text-center text-[11px] leading-[1.6] text-(--ls-muted) lg:text-[12px]">
          No payment required. Your details stay confidential.
        </p>
      </form>
    </div>
  );
}
