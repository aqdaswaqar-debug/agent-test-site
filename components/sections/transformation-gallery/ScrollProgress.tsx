"use client";

import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { cn } from "@/lib/utils";

/** Figma's teal/grey pill indicator, built as a scroll-progress track (thumb moves with transform only). */
export function ScrollProgress({ embla, className }: { embla: EmblaCarouselType | undefined; className?: string }) {
  const [state, setState] = useState({ progress: 0, slides: 1, selected: 0 });
  useEffect(() => {
    if (!embla) return;
    const sync = () => setState({ progress: Math.max(0, Math.min(1, embla.scrollProgress())), slides: embla.scrollSnapList().length, selected: embla.selectedScrollSnap() });
    sync();
    embla.on("scroll", sync).on("reInit", sync).on("select", sync);
    return () => {
      embla.off("scroll", sync).off("reInit", sync).off("select", sync);
    };
  }, [embla]);
  if (state.slides < 2) return null;
  const thumb = 1 / state.slides;
  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative h-2.5 w-[219px] overflow-hidden rounded-full bg-(--tg-track)" aria-hidden>
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-(--tg-teal)"
          style={{ width: `${thumb * 100}%`, transform: `translateX(${state.progress * (1 / thumb - 1) * 100}%)` }}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        Slide {state.selected + 1} of {state.slides}
      </p>
    </div>
  );
}
