"use client";

import useEmblaCarousel from "embla-carousel-react";
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
  const [viewportRef, embla] = useEmblaCarousel({ align: "center", containScroll: "trimSnaps", breakpoints: { "(min-width: 768px)": { active: false } } });
  const caption = (i: number) => `${label}, result ${i + 1} of ${pairs.length}: before and after`;
  return (
    <div className="flex flex-col gap-6">
      <Reveal stagger>
        <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 md:mx-0 md:overflow-visible md:px-0" role="region" aria-roledescription="carousel" aria-label={`${label} results`}>
          <ul className={cn("flex gap-6 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-x-16", pairs.length < 3 && "lg:flex lg:justify-center", pairs.length === 1 && "justify-center")}>
            {pairs.map((p, i) => (
              <li key={p.before} data-reveal-item className="min-w-0 flex-[0_0_84%] sm:flex-[0_0_60%] md:flex-none lg:w-full lg:max-w-[427px]">
                <BeforeAfterCard pair={p} caption={caption(i)} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      {pairs.length > 1 ? <ScrollProgress embla={embla} className="md:hidden" /> : null}
    </div>
  );
}
