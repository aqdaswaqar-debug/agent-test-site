"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ArrowRight, ChevronDown, Facebook, Instagram, Linkedin, Loader2, Mail, MapPin, Phone, PhoneCall, Youtube } from "lucide-react";
import toast from "react-hot-toast";
import { normalizeIndianMobile } from "@/lib/lead";
import { cn } from "@/lib/utils";
import { CALLBACK_CITIES, CALLBACK_TREATMENTS, FOOTER_COLUMNS, LEGAL, SITE, SOCIAL } from "./site-links";

function XLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M12.19 1.5h2.2L9.57 7.02l5.68 7.51h-4.45L7.65 10.37l-3.6 4.16H1.83l5.17-5.9L.84 1.5H5.4l2.84 3.76L12.19 1.5Zm-.78 11.7h1.23L4.73 2.76H3.42l7.99 10.45Z" />
    </svg>
  );
}

const SOCIAL_ICONS = { instagram: Instagram, youtube: Youtube, facebook: Facebook, linkedin: Linkedin } as const;

const field =
  "h-10 w-full rounded-[10px] border border-white/12 bg-white/7 px-3 text-[13px] text-white outline-none placeholder:text-white/50 focus:border-(--pdp-teal) aria-invalid:border-[#f97066]";

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

function CallbackForm() {
  const id = useId();
  const [values, setValues] = useState({ name: "", phone: "", treatment: "", city: "", company: "" });
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
        setValues({ name: "", phone: "", treatment: "", city: "", company: "" });
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
      <p id={`${id}-${k}-err`} className="text-[11px] text-[#fda29b]">
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
        className="flex h-10 items-center justify-center gap-2 rounded-[14px] bg-(--pdp-teal) text-[13px] font-semibold text-[#0f2027] shadow-[0_4px_8px_rgba(125,209,184,0.25)] transition-[background-color,scale] active:scale-[0.98] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-teal) sm:col-span-2 lg:col-span-1 lg:mt-5 [@media(hover:hover)]:hover:bg-[#2dd4bf]"
      >
        {busy ? <Loader2 aria-hidden size={14} className="animate-spin" /> : <PhoneCall aria-hidden size={14} />}
        Request Callback
      </button>
    </form>
  );
}

function Newsletter() {
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
      <label htmlFor="pdp-newsletter" className="text-[12px] font-semibold text-white">
        Subscribe to our newsletter
      </label>
      <div className="flex h-10 max-w-[420px]">
        <input
          id="pdp-newsletter"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 rounded-l-[14px] border border-white/10 bg-white/8 px-4 text-[13px] text-white outline-none placeholder:text-white/50 focus:border-(--pdp-teal)"
        />
        <button type="submit" disabled={busy} aria-label="Subscribe" className="grid w-12 place-items-center rounded-r-[14px] bg-(--pdp-teal) text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-teal) disabled:opacity-70">
          {busy ? <Loader2 aria-hidden size={16} className="animate-spin" /> : <ArrowRight aria-hidden size={16} />}
        </button>
      </div>
    </form>
  );
}

const linkCls = "text-[13px] text-white/60 transition-colors focus-visible:outline-2 focus-visible:outline-(--pdp-teal) [@media(hover:hover)]:hover:text-white";

export function PdpFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-(--pdp-footer) text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 pt-6 pb-8 md:px-8 lg:gap-12 lg:pt-10 xl:px-[100px]">
        {/* Callback strip */}
        <div className="flex flex-col gap-5 rounded-[10px] border-b border-[rgba(125,209,184,0.14)] bg-[linear-gradient(90deg,rgba(125,209,184,0.13),rgba(125,209,184,0.05))] p-4 lg:px-10 lg:pt-6 lg:pb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-[12px] bg-(--pdp-teal-soft) text-(--pdp-teal-text)">
                <PhoneCall aria-hidden size={15} />
              </span>
              <div>
                <h2 className="text-[14px] font-semibold">Request a Free Callback</h2>
                <p className="text-[12px] text-white/55">Our expert calls you back within 24 hours.</p>
              </div>
            </div>
            <span className="w-fit rounded-full border border-(--pdp-teal) bg-[rgba(20,184,166,0.1)] px-4 py-1 text-[12px] font-semibold text-(--pdp-teal-text)">Free Consultation</span>
          </div>
          <CallbackForm />
        </div>

        {/* Brand + link columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,410px)_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Image src="/images/local-seo/berkowits-logo-white.png" alt="Berkowits Hair & Skin Clinic" width={429} height={101} className="h-9 w-auto self-start lg:h-11" />
            <p className="text-[13px] leading-[1.6] text-white/60">
              Berkowits is a dermatologist-led hair and skin care brand, with clinics across India and formulations designed for everyday concerns.
            </p>
            <Newsletter />
            <ul className="flex gap-3" aria-label="Berkowits on social media">
              {SOCIAL.map((s) => {
                const Icon = s.icon === "x" ? null : SOCIAL_ICONS[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Berkowits on ${s.label} (opens in a new tab)`}
                      className="grid size-9 place-items-center rounded-[14px] bg-(--pdp-teal-soft) text-(--pdp-teal-text) transition-[background-color,color,translate] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-teal) motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-(--pdp-teal) [@media(hover:hover)]:hover:text-white"
                    >
                      {Icon ? <Icon aria-hidden size={16} /> : <XLogo className="size-4" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop columns */}
          <nav aria-label="Footer" className="hidden grid-cols-4 gap-6 lg:grid">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-5">
                <h2 className="text-[14px] font-semibold">{col.title}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={linkCls}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* Mobile accordions (Figma 2×2 closed headings) */}
          <nav aria-label="Footer" className="flex flex-col divide-y divide-white/8 border-y border-white/8 lg:hidden">
            {FOOTER_COLUMNS.map((col) => (
              <Disclosure key={col.title}>
                {({ open }) => (
                  <div>
                    <DisclosureButton className="flex w-full items-center justify-between py-3.5 text-[14px] font-semibold focus-visible:outline-2 focus-visible:outline-(--pdp-teal)">
                      {col.title}
                      <ChevronDown aria-hidden size={16} className={cn("transition-[rotate] duration-200", open && "rotate-180")} />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" className="flex flex-col gap-3 pb-4">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a href={l.href} className={linkCls}>
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
        </div>

        {/* Contact */}
        <address className="grid gap-3 border-t border-white/8 pt-6 not-italic sm:grid-cols-3 sm:gap-6">
          {[
            { icon: MapPin, text: SITE.address, href: SITE.addressMap, external: true },
            { icon: Phone, text: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
            { icon: Mail, text: SITE.email, href: `mailto:${SITE.email}` },
          ].map(({ icon: Icon, text, href, external }, i) => (
            <a
              key={text}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn("flex items-center gap-3 text-[12px] text-white/60 focus-visible:outline-2 focus-visible:outline-(--pdp-teal) [@media(hover:hover)]:hover:text-white", i === 1 && "sm:justify-center", i === 2 && "sm:justify-end")}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-(--pdp-teal-soft) text-(--pdp-teal-text)">
                <Icon aria-hidden size={14} />
              </span>
              {text}
            </a>
          ))}
        </address>
      </div>

      {/* Legal bar */}
      <div className="bg-black/30 lg:bg-(--pdp-teal)">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-4 py-4 text-[11px] text-white/70 sm:flex-row sm:justify-between md:px-8 lg:text-[12px] lg:text-[#0f2027] xl:px-[100px]">
          <p>© {year} Berkowits Hair & Skin Clinic. All Rights Reserved.</p>
          <ul className="flex gap-4 lg:gap-6">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="focus-visible:outline-2 focus-visible:outline-white [@media(hover:hover)]:hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
