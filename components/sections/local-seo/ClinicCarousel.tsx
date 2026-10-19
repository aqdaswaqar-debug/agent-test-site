"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "./types";

type ClinicCarouselProps = { photos: ImageAsset[]; label: string };

/** Mobile clinic photos: one image at a time, swipe, dot indicator (Figma 45:258). */
export function ClinicCarousel({ photos, label }: ClinicCarouselProps) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", loop: false });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex w-full flex-col items-center gap-4">
      <div ref={viewportRef} className="w-full overflow-hidden rounded-[16px]">
        <ul className="flex gap-3">
          {photos.map((photo, i) => (
            <li
              key={photo.src}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}`}
              className="relative h-[240px] min-w-0 flex-[0_0_100%] overflow-hidden rounded-[16px]"
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="calc(100vw - 48px)" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Show photo ${i + 1}: ${photo.alt}`}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => embla?.scrollTo(i)}
            className="grid h-6 min-w-6 place-items-center focus-visible:outline-2 focus-visible:outline-(--ls-ink)"
          >
            <span
              className={cn(
                "block h-1.5 w-5 origin-center rounded-[3px] transition-[scale,background-color] duration-200 motion-reduce:transition-none",
                i === selected ? "scale-x-100 bg-(--ls-mint)" : "scale-x-[0.3] bg-(--ls-dot)",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
