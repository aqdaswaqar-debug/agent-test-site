"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

/** Concern → ingredient pairing (Figma 6969:23491 / 7133:23403). Single-open accordion, first row open. */
export function ConcernsSection({ data }: { data: PdpContent["concerns"] }) {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="concerns-title" className="bg-(--pdp-ivory) py-8 lg:bg-white lg:py-20">
      <PdpContainer className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex flex-col gap-6 lg:w-[680px] lg:shrink-0 lg:gap-8">
          <SectionHeader id="concerns-title" eyebrow={data.eyebrow} title={data.title} mobileAlign="left" align="left" titleClassName="max-w-[560px]" />
          <Reveal stagger>
            <ul className="flex flex-col gap-3">
              {data.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li
                    key={item.title}
                    data-reveal-item
                    className={cn(
                      "rounded-[12px] border transition-[border-color,background-color,translate] duration-200",
                      isOpen ? "border-(--pdp-accent) bg-(--pdp-tint) lg:border-(--pdp-peach)" : "border-(--pdp-line-soft) bg-white motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-(--pdp-peach)",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`concern-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`concern-panel-${i}`}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-4 rounded-[12px] p-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--pdp-accent) lg:p-5"
                      >
                        <span className="flex flex-col gap-0.5 lg:gap-1">
                          <span className="text-[14px] font-bold tracking-[0.02em] text-(--pdp-ink) uppercase lg:text-[15px]">{item.title}</span>
                          <span className="text-[12px] font-semibold text-(--pdp-accent-strong) lg:text-[13px]">{item.ingredients}</span>
                        </span>
                        <ChevronDown
                          aria-hidden
                          size={20}
                          className={cn("shrink-0 transition-[rotate] duration-200", isOpen ? "rotate-180 text-(--pdp-accent-strong)" : "text-(--pdp-icon-muted)")}
                        />
                      </button>
                    </h3>
                    <div
                      id={`concern-panel-${i}`}
                      role="region"
                      aria-labelledby={`concern-${i}`}
                      hidden={!isOpen}
                      className="px-4 pb-4 text-[13px] leading-5 text-(--pdp-body) lg:px-5 lg:pb-5 lg:text-[14px] lg:leading-[1.5]"
                    >
                      {item.body}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <div className="group relative aspect-[358/524] w-full overflow-hidden rounded-[12px] lg:aspect-auto lg:h-[580px] lg:flex-1 lg:rounded-[16px]">
          <InViewVideo src={data.video.src} poster={data.video.poster} label={data.video.label} />
        </div>
      </PdpContainer>
    </section>
  );
}
