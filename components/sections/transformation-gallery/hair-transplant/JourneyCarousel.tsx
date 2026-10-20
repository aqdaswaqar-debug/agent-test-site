"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "../ScrollProgress";
import type { Img } from "../types";

type Phase = { n: number; image: Img };

const arrow =
  "grid size-9 place-items-center rounded-full border border-(--tg-line) bg-white text-(--tg-ink) transition-[opacity,scale] duration-150 active:scale-95 disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal-text) [@media(hover:hover)]:hover:border-(--tg-teal)";

/**
 * Phase-by-phase journey (Figma 1161:26766): 1 card + peek on phones, 2 at md, 3 at lg. Swipe/drag, arrow keys
 * on the focused track, prev/next buttons beside the scroll-progress bar. No autoplay. Only phases with a photo render.
 */
export function JourneyCarousel({ phases }: { phases: Phase[] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [nav, setNav] = useState({ prev: false, next: false });

  const sync = useCallback(() => {
    if (!embla) return;
    setNav({ prev: embla.canScrollPrev(), next: embla.canScrollNext() });
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  const scrollable = nav.prev || nav.next;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <Reveal stagger>
        <div
          ref={viewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Hair transplant journey, phase by phase"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") embla?.scrollPrev();
            if (e.key === "ArrowRight") embla?.scrollNext();
          }}
          className="-mx-4 overflow-hidden px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal-text) md:mx-0 md:px-0"
        >
          <ul className="-ml-6 flex lg:-ml-[clamp(32px,4vw,70px)]">
            {phases.map((p) => (
              <li
                key={p.n}
                data-reveal-item
                role="group"
                aria-roledescription="slide"
                aria-label={`Phase ${p.n} of ${phases.length}`}
                className="min-w-0 flex-[0_0_min(352px,86%)] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] lg:pl-[clamp(32px,4vw,70px)]"
              >
                {/* Top/left padding leaves room for the number badge that overhangs the card corner. */}
                <div className="relative pt-7 pl-7 lg:pt-9 lg:pl-9">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 z-10 grid size-[54px] place-items-center rounded-full bg-(--tg-teal) text-[22px] font-medium text-(--tg-on-teal) shadow-[0_18px_13.5px_rgba(0,0,0,0.1),0_7.2px_5.4px_rgba(0,0,0,0.1)] lg:size-[72px] lg:text-[28px]"
                  >
                    {p.n}
                  </span>
                  <figure className={cn("group relative rounded-[14px] bg-white", hoverLift)}>
                    <div className="relative aspect-square overflow-hidden rounded-[14px] border-[1.5px] border-black bg-(--tg-surface)">
                      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 425px, (min-width: 768px) 45vw, 320px" className={cn("object-cover", hoverZoom)} />
                    </div>
                    <figcaption className="absolute top-4 left-4 rounded-full border border-black bg-white/60 px-4 py-1 text-[16px] leading-[1.4] font-medium text-black lg:top-[26px] lg:left-[28px] lg:px-5 lg:text-[24px]">
                      Phase {p.n}
                    </figcaption>
                  </figure>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className={cn("relative flex items-center justify-center gap-4", !scrollable && "hidden")}>
        <ScrollProgress embla={embla} />
        <div className="flex gap-2 sm:absolute sm:right-0">
          <button type="button" className={arrow} onClick={() => embla?.scrollPrev()} disabled={!nav.prev} aria-label="Previous phase">
            <ChevronLeft aria-hidden size={18} />
          </button>
          <button type="button" className={arrow} onClick={() => embla?.scrollNext()} disabled={!nav.next} aria-label="Next phase">
            <ChevronRight aria-hidden size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
