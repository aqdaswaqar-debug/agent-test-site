import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, PhoneCall, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { CallbackForm, FooterMobileNav, Newsletter } from "./FooterClient";
import { footerLinkCls } from "./pdp-styles";
import { FOOTER_COLUMNS, LEGAL, SITE, SOCIAL } from "./site-links";

function XLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M12.19 1.5h2.2L9.57 7.02l5.68 7.51h-4.45L7.65 10.37l-3.6 4.16H1.83l5.17-5.9L.84 1.5H5.4l2.84 3.76L12.19 1.5Zm-.78 11.7h1.23L4.73 2.76H3.42l7.99 10.45Z" />
    </svg>
  );
}

const SOCIAL_ICONS = { instagram: Instagram, youtube: Youtube, facebook: Facebook, linkedin: Linkedin } as const;

/** Site footer (Figma 7078:6115 / 7197:692). Server component: the year is rendered once at build. */
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
              Berkowits brings decades of hair and skin clinic expertise into everyday care, with clinics across India and formulations designed for everyday concerns.
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
                      <a href={l.href} className={footerLinkCls}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <FooterMobileNav />
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
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-4 py-4 text-[11px] text-white/70 sm:flex-row sm:justify-between md:px-8 lg:text-[12px] lg:text-(--pdp-on-teal) xl:px-[100px]">
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
