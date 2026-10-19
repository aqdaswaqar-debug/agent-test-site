import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Clinic } from "./types";

type SiteFooterProps = { clinic: Clinic; disclaimer: string };

const footerLink =
  "rounded-[4px] underline-offset-4 [@media(hover:hover)]:hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function SiteFooter({ clinic, disclaimer }: SiteFooterProps) {
  return (
    <footer className="bg-(image:--ls-gradient) text-[12px] leading-[1.65] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-6 py-14 text-center lg:items-start lg:px-10 lg:py-20 lg:text-left xl:px-[120px]">
        <div className="h-px w-full bg-white lg:bg-(--ls-line)" aria-hidden />
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <Image
            src="/images/local-seo/berkowits-logo-white.png"
            alt="Berkowits Hair & Skin Clinic"
            width={143}
            height={34}
            className="shrink-0"
          />
          <p className="lg:max-w-[775px]">{disclaimer}</p>
        </div>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center">
          <address className="flex-1 not-italic">
            <p>
              {clinic.name} · {clinic.shortAddress}
            </p>
            <p>
              <a href={`tel:${clinic.phoneTel}`} className={footerLink}>
                {clinic.phoneDisplay}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${clinic.email}`} className={footerLink}>
                {clinic.email}
              </a>{" "}
              · {clinic.hoursDisplay}
            </p>
            <p>© Berkowits Hair &amp; Skin Clinic</p>
          </address>
          <ul className="flex flex-1 justify-center gap-5 lg:justify-start">
            {/* TODO(content): confirm Privacy Policy and Terms URLs on the live site. */}
            <li>
              <a href="https://berkowits.com" target="_blank" rel="noopener noreferrer" className={footerLink}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://berkowits.com" target="_blank" rel="noopener noreferrer" className={footerLink}>
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col items-center gap-3 p-4 lg:hidden">
          <ButtonLink href="#book" size="sm" className="w-full py-4 leading-[22px]">
            Book Free Consultation
          </ButtonLink>
          <a href={`tel:${clinic.phoneTel}`} className={footerLink}>
            Call {clinic.phoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
