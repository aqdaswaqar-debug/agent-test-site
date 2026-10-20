"use client";

import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

const MOBILE_INITIAL = 5;

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative grid size-5 shrink-0 place-items-center">
      <span className={cn("absolute h-0.5 w-3.5 rounded-full transition-colors", open ? "bg-(--pdp-accent-strong)" : "bg-[#80858c]")} />
      <span
        className={cn(
          "absolute h-3.5 w-0.5 rounded-full bg-[#80858c] transition-transform duration-200 ease-out motion-reduce:transition-none",
          open && "scale-y-0",
        )}
      />
    </span>
  );
}

/** FAQ (Figma 6969:24124 / 7133:23583): two independent columns on desktop, 5 + "View more" on mobile. */
export function PdpFaqSection({ data }: { data: PdpContent["faq"] }) {
  const [showAll, setShowAll] = useState(false);
  const half = Math.ceil(data.items.length / 2);
  const columns = [data.items.slice(0, half), data.items.slice(half)];

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 bg-(--pdp-ivory) py-8 lg:bg-(--pdp-cream) lg:py-24">
      <PdpContainer className="flex flex-col gap-4 lg:gap-14">
        <SectionHeader id="faq-title" eyebrow={data.eyebrow} title={data.title} />
        <div className="grid gap-3 lg:grid-cols-2 lg:items-start lg:gap-5">
          {columns.map((col, c) => (
            <div key={c} className="flex flex-col gap-3">
              {col.map((item, i) => {
                const index = c * half + i;
                return (
                  <Disclosure
                    key={item.question}
                    as="div"
                    defaultOpen={index === 0}
                    className={cn(
                      "rounded-[12px] border border-[#e7e5e4] bg-white transition-[border-color] duration-200 data-open:border-(--pdp-accent) lg:border-(--pdp-line) [@media(hover:hover)]:hover:border-(--pdp-peach)",
                      !showAll && index >= MOBILE_INITIAL && "max-lg:hidden",
                    )}
                  >
                    {({ open }) => (
                      <>
                        <h3>
                          <DisclosureButton className="flex w-full items-center justify-between gap-4 rounded-[12px] p-4 text-left text-[14px] font-bold text-(--pdp-ink) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--pdp-accent) lg:px-5 lg:py-[18px] lg:text-[15px]">
                            <span>
                              {index + 1}. {item.question}
                            </span>
                            <PlusMinus open={open} />
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel
                          unmount={false}
                          transition
                          className="px-4 pb-4 text-[14px] leading-[1.5] text-(--pdp-body) transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0 lg:px-5 lg:pb-5"
                        >
                          {item.answer}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          ))}
        </div>
        {data.items.length > MOBILE_INITIAL ? (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="rounded-[12px] bg-(--pdp-accent-strong) px-6 py-3 text-[14px] font-semibold text-white transition-[background-color,scale] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:hidden"
          >
            {showAll ? "View less" : "View more"}
          </button>
        ) : null}
      </PdpContainer>
    </section>
  );
}
