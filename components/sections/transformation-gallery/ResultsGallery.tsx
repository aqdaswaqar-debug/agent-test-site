"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEmblaDots } from "@/components/ui/carousel-controls";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { BeforeAfterCard } from "./BeforeAfterCard";
import { ScrollProgress } from "./ScrollProgress";
import type { ResultPair } from "./types";

type ResultsGalleryProps = {
  pairs: ResultPair[];
  /** Used for the sr-only captions, e.g. "Botox". */
  label: string;
};

/**
 * Before/after results: 3-up grid from lg, 2-up on tablet, swipe carousel with neighbours peeking and a
 * scroll-progress bar on phones (Figma mobile frames). One pair = a single static card.
 */
export function ResultsGallery({ pairs, label }: ResultsGalleryProps) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "center", loop: pairs.length > 2, breakpoints: { "(min-width: 768px)": { active: false } } });
  const { selected } = useEmblaDots(embla);
  const caption = (i: number) => `${label}, result ${i + 1} of ${pairs.length}: before and after`;
  return (
    <div className="flex flex-col gap-6">
      <Reveal stagger>
        <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 py-4 md:mx-0 md:py-0 md:overflow-visible md:px-0" role="region" aria-roledescription="carousel" aria-label={`${label} results`}>
          <ul className={cn("flex md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-x-16", pairs.length < 3 && "lg:flex lg:justify-center", pairs.length === 1 && "justify-center")}>
            {pairs.map((p, i) => (
              <li key={p.before} data-reveal-item className="min-w-0 flex-[0_0_84%] px-1.5 sm:flex-[0_0_60%] md:flex-none md:px-0 lg:w-full lg:max-w-[427px]">
                {/* Phones: centre-focus carousel (house pattern). md+: plain grid, so the focus classes are phone-only. */}
                <div className={cn("rounded-[10px] transition-[scale] duration-300 ease-out motion-reduce:transition-none md:scale-100", i === selected ? "max-md:shadow-[0_8px_30px_rgba(0,0,0,0.22)]" : "max-md:scale-[0.88]")}>
                  <BeforeAfterCard pair={p} caption={caption(i)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      {pairs.length > 1 ? <ScrollProgress embla={embla} className="md:hidden" /> : null}
    </div>
  );
}
