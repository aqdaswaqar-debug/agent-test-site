"use client";

import Image from "next/image";
import { CloseButton, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

type SiteHeaderProps = { nav: { label: string; href: string }[] };

const navLink =
  "rounded-[6px] text-[12px] font-medium text-(--ls-ink) transition-colors duration-150 " +
  "[@media(hover:hover)]:hover:text-(--ls-mint-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ls-ink)";

export function SiteHeader({ nav }: SiteHeaderProps) {
  return (
    <header className="relative z-30 border-b border-(--ls-line) bg-white">
      <div className="mx-auto flex h-[104px] w-full max-w-[1440px] items-center justify-between px-6 lg:h-[128px] lg:px-10 xl:px-[120px]">
        <a href="#top" aria-label="Berkowits Hair & Skin Clinic — back to top" className="shrink-0 rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ls-ink)">
          <Image src="/images/local-seo/berkowits-logo-dark.png" alt="Berkowits Hair & Skin Clinic" width={143} height={34} />
        </a>

        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href="#book" size="sm" className="hidden px-6 py-2 leading-[22px] lg:inline-flex">
          Book Free Consultation
        </ButtonLink>

        <Popover className="flex items-center gap-4 lg:hidden">
          <ButtonLink href="#book" size="sm" className="px-6 py-2 leading-[22px]">
            Book
          </ButtonLink>
          <PopoverButton
            aria-label="Open menu"
            className="group grid size-10 place-items-center rounded-[8px] text-(--ls-ink) focus-visible:outline-2 focus-visible:outline-(--ls-ink)"
          >
            <Menu aria-hidden className="size-6 group-data-[open]:hidden" strokeWidth={1.5} />
            <X aria-hidden className="hidden size-6 group-data-[open]:block" strokeWidth={1.5} />
          </PopoverButton>
          <PopoverPanel
            transition
            className="absolute inset-x-0 top-full border-b border-(--ls-line) bg-white px-6 pt-2 pb-6 shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 motion-reduce:transition-none"
          >
            <nav aria-label="Page sections">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <CloseButton
                      as="a"
                      href={item.href}
                      className="block border-b border-(--ls-border) py-3.5 text-[15px] font-medium text-(--ls-ink) focus-visible:outline-2 focus-visible:outline-(--ls-ink)"
                    >
                      {item.label}
                    </CloseButton>
                  </li>
                ))}
              </ul>
            </nav>
          </PopoverPanel>
        </Popover>
      </div>
    </header>
  );
}
