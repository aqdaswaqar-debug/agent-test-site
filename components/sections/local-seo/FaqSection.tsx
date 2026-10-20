"use client";

import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { cn } from "@/lib/utils";
import type { Faq } from "./types";

type FaqSectionProps = { title: string; intro: string; items: Faq[] };

/** Mobile shows this many questions until "View more questions" is pressed. */
const MOBILE_INITIAL = 5;

/** Plus that turns into a minus: the vertical bar folds away (transform only). */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-200 lg:size-8",
        open ? "bg-(--ls-mint) text-(--ls-ink)" : "bg-white text-(--ls-mint-text) ring-1 ring-(--ls-border)",
      )}
    >
      <span className="absolute h-0.5 w-3 rounded-full bg-current lg:w-3.5" />
      <span
        className={cn(
          "absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-200 ease-out motion-reduce:transition-none lg:h-3.5",
          open && "scale-y-0",
        )}
      />
    </span>
  );
}

function FaqItem({ item, defaultOpen, hiddenOnMobile }: { item: Faq; defaultOpen: boolean; hiddenOnMobile: boolean }) {
  return (
    <Disclosure
      as="div"
      defaultOpen={defaultOpen}
      className={cn(
        "rounded-[14px] bg-(--ls-faq) transition-colors duration-200 lg:rounded-[20px] has-focus-visible:bg-(--ls-mint-soft) [@media(hover:hover)]:hover:bg-(--ls-mint-soft)",
        hiddenOnMobile && "max-lg:hidden",
      )}
    >
      {({ open }) => (
        <>
          <h3 className="text-[14px] leading-[1.45] font-semibold text-(--ls-ink) lg:text-[18px] lg:leading-normal">
            <DisclosureButton className="flex w-full items-center gap-3 rounded-[14px] px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--ls-mint-text) lg:gap-4 lg:rounded-[20px] lg:p-6">
              <span className="flex-1">{item.question}</span>
              <PlusMinus open={open} />
            </DisclosureButton>
          </h3>
          {/* Closed answers stay in the HTML (hidden), so the page content still matches the FAQ schema. */}
          <DisclosurePanel
            unmount={false}
            transition
            className="px-4 pb-4 text-[13px] leading-[1.6] text-(--ls-muted) transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0 motion-reduce:transition-none lg:px-6 lg:pb-6 lg:text-[15px] lg:leading-6"
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
  // Two independent columns on desktop (first half left, as in Figma), so opening one answer
  // never stretches the card next to it. On mobile the columns simply stack in order.
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

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

          <div className="flex w-full flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
            {columns.map((column, c) => (
              <div key={c} className="flex flex-col gap-2.5 lg:gap-4">
                {column.map((item, i) => {
                  const index = c * half + i;
                  return (
                    <FaqItem
                      key={item.question}
                      item={item}
                      defaultOpen={index === 0}
                      hiddenOnMobile={!showAll && index >= MOBILE_INITIAL}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {items.length > MOBILE_INITIAL ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="rounded-[12px] border border-(--ls-border-strong) bg-white px-5 py-3.5 text-[15px] leading-[1.6] font-medium text-(--ls-ink) transition-[border-color,transform,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ls-ink) lg:hidden [@media(hover:hover)]:hover:border-(--ls-ink)"
            >
              {showAll ? "Show fewer questions" : "View more questions"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
