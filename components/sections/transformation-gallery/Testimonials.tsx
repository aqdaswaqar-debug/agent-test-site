"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Dots, Stars, useEmblaDots } from "@/components/ui/carousel-controls";
import { focusSlide } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "./styles";
import type { Review } from "./types";

/**
 * Google review carousel (Figma 192:203): centred card raised, neighbours peek, dots from the slide count,
 * swipe/drag and arrow keys. No autoplay.
 */
export function Testimonials({ reviews, title = "Testimonials", startIndex = 0 }: { reviews: Review[]; title?: string; startIndex?: number }) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: reviews.length > 3, align: "center", startIndex });
  const { selected, count, scrollTo } = useEmblaDots(embla);
  if (!reviews.length) return null;
  return (
    <section aria-labelledby="reviews-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col gap-8 lg:gap-14")}>
        <h2 id="reviews-title" className={tgH2}>
          {title}
        </h2>
        <div
          ref={viewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") embla?.scrollPrev();
            if (e.key === "ArrowRight") embla?.scrollNext();
          }}
          className="-mx-4 overflow-hidden px-4 py-6 focus-visible:outline-2 focus-visible:outline-(--tg-teal) lg:-mx-2 lg:px-2"
        >
          <ul className="flex">
            {reviews.map((r, i) => (
              <li key={r.name} className="min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_55%] lg:flex-[0_0_33.333%] lg:pl-10">
                <article
                  className={cn("flex h-full flex-col gap-4 rounded-[20px] border-2 border-(--tg-line) bg-white p-5 lg:gap-5 lg:p-8", focusSlide(i === selected))}
                >
                  <header className="flex items-center justify-between gap-3">
                    <h3 className="text-[16px] font-semibold text-(--tg-ink) lg:text-[18px]">{r.name}</h3>
                    <Image src="/images/transformation-gallery/shared/google-g.svg" alt="Google review" width={32} height={32} className="size-6 lg:size-8" />
                  </header>
                  <blockquote className="flex-1 text-[15px] leading-[1.6] text-(--tg-body) italic lg:text-[18px]">{r.text}</blockquote>
                  <p className="flex items-center gap-2 text-[14px] text-(--tg-muted)">
                    <Stars value={r.rating} />
                    {r.rating.toFixed(1)}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <Dots count={count} selected={selected} onSelect={scrollTo} label="Review" />
      </div>
    </section>
  );
}
