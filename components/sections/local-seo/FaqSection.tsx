"use client";

import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { cn } from "@/lib/utils";
import type { Faq } from "./types";

type FaqSectionProps = { title: string; intro: string; items: Faq[] };

const MOBILE_INITIAL = 5;

/** Desktop rows per column (first half of the list goes left, as in Figma). Full class names so Tailwind generates them. */
const DESKTOP_ROWS: Record<number, string> = {
  3: "lg:grid-rows-3",
  4: "lg:grid-rows-4",
  5: "lg:grid-rows-5",
  6: "lg:grid-rows-6",
};

function FaqItem({ item, defaultOpen, hiddenOnMobile }: { item: Faq; defaultOpen: boolean; hiddenOnMobile: boolean }) {
  return (
    <Disclosure
      as="div"
      defaultOpen={defaultOpen}
      className={cn(
        "rounded-[14px] bg-(--ls-faq) px-4 py-3.5 lg:flex lg:h-full lg:flex-col lg:rounded-[20px] lg:p-6",
        hiddenOnMobile && "max-lg:hidden",
      )}
    >
      {({ open }) => (
        <>
          <h3 className="text-[14px] leading-[1.45] font-semibold text-(--ls-ink) lg:text-[18px] lg:leading-normal">
            {/* Mobile: accordion trigger. */}
            <DisclosureButton className="flex w-full items-start gap-3 rounded-[6px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ls-mint-text) lg:hidden">
              <span className="flex-1">{item.question}</span>
              <span aria-hidden className="text-[18px] leading-[1.3] font-medium text-(--ls-mint-text)">
                {open ? "–" : "+"}
              </span>
            </DisclosureButton>
            {/* Desktop: answers are always visible (Figma desktop frame), so no button. */}
            <span className="hidden lg:block">{item.question}</span>
          </h3>
          <DisclosurePanel
            static
            className={cn(
              "mt-2 text-[13px] leading-[1.6] text-(--ls-muted) lg:mt-3 lg:block lg:text-[15px] lg:leading-6",
              !open && "hidden",
            )}
          >
            <ResponsiveText desktop={item.answer} mobile={item.mobileAnswer ?? item.answer} />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export function FaqSection({ title, intro, items }: FaqSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const rows = Math.ceil(items.length / 2);

  return (
    <section id="faqs" aria-labelledby="faqs-title" className="scroll-mt-4 bg-white">
      <div className="mx-auto w-full max-w-[1440px] lg:px-10 xl:px-0">
        <div className="flex flex-col items-center gap-4 px-6 py-11 lg:gap-6 lg:rounded-[24px] lg:border lg:border-(--ls-divider) lg:px-10 lg:py-24 xl:px-[120px]">
          <div className="flex w-full flex-col gap-2 lg:items-center lg:text-center">
            <h2 id="faqs-title" className="text-[26px] leading-[1.2] font-semibold text-(--ls-ink) lg:text-[36px] lg:leading-normal">
              {title}
            </h2>
            <p className="hidden text-[16px] leading-[26px] text-(--ls-muted) lg:block">{intro}</p>
          </div>

          {/* One list: stacked accordion on mobile; two columns (first half left) on desktop. */}
          <div
            className={cn(
              "flex w-full flex-col gap-2.5 lg:grid lg:grid-flow-col lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4",
              DESKTOP_ROWS[rows] ?? "lg:grid-rows-5",
            )}
          >
            {items.map((item, i) => (
              <FaqItem
                key={item.question}
                item={item}
                defaultOpen={i === 0}
                hiddenOnMobile={!showAll && i >= MOBILE_INITIAL}
              />
            ))}
          </div>

          {items.length > MOBILE_INITIAL ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="rounded-[12px] border border-(--ls-border-strong) bg-white px-5 py-3.5 text-[15px] leading-[1.6] font-medium text-(--ls-ink) transition-[border-color,transform] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ls-ink) lg:hidden [@media(hover:hover)]:hover:border-(--ls-ink)"
            >
              {showAll ? "Show fewer questions" : "View more questions"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
