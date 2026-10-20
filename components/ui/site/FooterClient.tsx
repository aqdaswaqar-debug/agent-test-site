"use client";

import { useId, useState, type FormEvent } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ArrowRight, ChevronDown, Loader2, PhoneCall } from "lucide-react";
import toast from "react-hot-toast";
import { normalizeIndianMobile } from "@/lib/lead";
import { cn } from "@/lib/utils";
import { footerLinkCls } from "./site-styles";
import { CALLBACK_CITIES, CALLBACK_TREATMENTS, FOOTER_COLUMNS } from "./site-links";

/* Interactive parts of the footer (forms + mobile link accordions). The rest of the footer is a server component. */

const field =
  "h-10 w-full rounded-[10px] border border-white/12 bg-white/7 px-3 text-[13px] text-white outline-none placeholder:text-white/50 focus:border-(--site-teal) aria-invalid:border-(--site-error-line-dark)";

type Errors = Partial<Record<"name" | "phone" | "treatment" | "city", string>>;

function Select({ id, value, onChange, options, placeholder, invalid, describedBy }: { id: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string; invalid: boolean; describedBy?: string }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(field, "appearance-none pr-8 [&>option]:text-black", !value && "text-white/50")}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown aria-hidden size={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50" />
    </div>
  );
}

/** defaultTreatment preselects the page's treatment (e.g. on a treatment gallery page). */
export function CallbackForm({ defaultTreatment = "" }: { defaultTreatment?: string }) {
  const id = useId();
  const empty = { name: "", phone: "", treatment: defaultTreatment, city: "", company: "" };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!normalizeIndianMobile(values.phone)) next.phone = "Please enter a valid 10-digit mobile number.";
    if (!values.treatment) next.treatment = "Please choose a treatment.";
    if (!values.city) next.city = "Please choose a city.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/callback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await res.json()) as { ok: boolean; errors?: Errors; message?: string };
      if (data.ok) {
        toast.success("Thank you! Our expert will call you back within 24 hours.");
        setValues(empty);
      } else if (data.errors) setErrors(data.errors);
      else toast.error(data.message ?? "Something went wrong. Please try again.");
    } catch {
      toast.error("We couldn't send your request. Please check your connection.");
    } finally {
      setBusy(false);
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="text-[11px] text-(--site-error-on-dark)">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate aria-label="Request a free callback" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_220px] lg:items-start">
      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-name`} className="text-[12px] font-medium text-white/60">Name</label>
        <input id={`${id}-name`} autoComplete="name" value={values.name} onChange={(e) => set("name")(e.target.value)} placeholder="Full name" aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? `${id}-name-err` : undefined} className={field} />
        {err("name")}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-phone`} className="text-[12px] font-medium text-white/60">Contact</label>
        <input id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="+91 XXXXX XXXXX" aria-invalid={!!errors.phone || undefined} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} className={field} />
        {err("phone")}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-treatment`} className="text-[12px] font-medium text-white/60">Treatment</label>
        <Select id={`${id}-treatment`} value={values.treatment} onChange={set("treatment")} options={CALLBACK_TREATMENTS} placeholder="Select treatment" invalid={!!errors.treatment} describedBy={errors.treatment ? `${id}-treatment-err` : undefined} />
        {err("treatment")}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-city`} className="text-[12px] font-medium text-white/60">City</label>
        <Select id={`${id}-city`} value={values.city} onChange={set("city")} options={CALLBACK_CITIES} placeholder="Select city" invalid={!!errors.city} describedBy={errors.city ? `${id}-city-err` : undefined} />
        {err("city")}
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden value={values.company} onChange={(e) => set("company")(e.target.value)} className="hidden" />
      <button
        type="submit"
        disabled={busy}
        className={cn("flex h-10 items-center justify-center gap-2 rounded-[14px] bg-(--site-teal) text-[13px] font-semibold text-(--site-on-teal) shadow-[0_4px_8px_rgba(125,209,184,0.25)] transition-[background-color,scale] active:scale-[0.98] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--site-teal) sm:col-span-2 lg:col-span-1 lg:mt-5 [@media(hover:hover)]:hover:bg-(--site-teal-hover)")}
      >
        {busy ? <Loader2 aria-hidden size={14} className="animate-spin" /> : <PhoneCall aria-hidden size={14} />}
        Request Callback
      </button>
    </form>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim())) {
      toast.error("Please enter a valid email address.", { id: "newsletter" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (data.ok) {
        toast.success("You're subscribed. Welcome to Berkowits!", { id: "newsletter" });
        setEmail("");
      } else toast.error(data.message ?? "Something went wrong.", { id: "newsletter" });
    } catch {
      toast.error("We couldn't subscribe you right now.", { id: "newsletter" });
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <label htmlFor="site-newsletter" className="text-[12px] font-semibold text-white">
        Subscribe to our newsletter
      </label>
      <div className="flex h-10 max-w-[420px]">
        <input
          id="site-newsletter"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 rounded-l-[14px] border border-white/10 bg-white/8 px-4 text-[13px] text-white outline-none placeholder:text-white/50 focus:border-(--site-teal)"
        />
        <button type="submit" disabled={busy} aria-label="Subscribe" className="grid w-12 place-items-center rounded-r-[14px] bg-(--site-teal) text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--site-teal) disabled:opacity-70">
          {busy ? <Loader2 aria-hidden size={16} className="animate-spin" /> : <ArrowRight aria-hidden size={16} />}
        </button>
      </div>
    </form>
  );
}

/** Mobile: the four link columns as accordions (Figma shows the 2×2 closed headings). */
export function FooterMobileNav() {
  return (
    <nav aria-label="Footer" className="flex flex-col divide-y divide-white/8 border-y border-white/8 lg:hidden">
      {FOOTER_COLUMNS.map((col) => (
        <Disclosure key={col.title}>
          {({ open }) => (
            <div>
              <DisclosureButton className="flex w-full items-center justify-between py-3.5 text-[14px] font-semibold focus-visible:outline-2 focus-visible:outline-(--site-teal)">
                {col.title}
                <ChevronDown aria-hidden size={16} className={cn("transition-[rotate] duration-200", open && "rotate-180")} />
              </DisclosureButton>
              <DisclosurePanel as="ul" className="flex flex-col gap-3 pb-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={footerLinkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </nav>
  );
}
