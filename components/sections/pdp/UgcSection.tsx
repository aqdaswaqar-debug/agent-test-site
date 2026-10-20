"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { Dots, useEmblaDots } from "./controls";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

type Item = PdpContent["ugc"]["items"][number];

function UgcCard({ item, liked, onLike }: { item: Item; liked: boolean; onLike: () => void }) {
  return (
    <article className={cn("group h-full rounded-[16px]", hoverLift)}>
      <div className="relative flex aspect-[358/520] flex-col justify-between overflow-hidden rounded-[inherit] p-4 lg:aspect-[232/380] lg:p-5">
        <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 240px, 90vw" className={cn("object-cover", hoverZoom)} />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,28,28,0.05)_40%,rgba(28,28,28,0.55)_100%)]" />
        <span className="relative w-fit rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold tracking-[0.04em] text-(--pdp-accent-strong) uppercase">{item.tag}</span>
        <div className="relative flex items-center justify-between gap-2">
          <span className="text-[14px] font-bold text-white">{item.name}</span>
          <button
            type="button"
            onClick={onLike}
            aria-pressed={liked}
            aria-label={`${liked ? "Unlike" : "Like"} ${item.tag.toLowerCase()} post by ${item.name}`}
            className="grid size-9 place-items-center rounded-full bg-white/85 text-(--pdp-peach-deep) transition-[scale] duration-150 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Star aria-hidden size={15} className={cn("transition-colors", liked && "fill-(--pdp-accent-strong) text-(--pdp-accent-strong)")} />
          </button>
        </div>
      </div>
    </article>
  );
}

/** Community tiles (Figma 6969:23846 / 7203:3): 5-up row on desktop, swipeable single card with dots on mobile. */
export function UgcSection({ data }: { data: PdpContent["ugc"] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", breakpoints: { "(min-width: 1024px)": { active: false } } });
  const { selected, count, scrollTo } = useEmblaDots(embla);
  const [liked, setLiked] = useState<Set<number>>(() => new Set());
  const toggle = (i: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="reviews" aria-labelledby="ugc-title" className="scroll-mt-24 bg-(--pdp-cream) py-8 lg:py-24">
      <PdpContainer className="flex flex-col gap-6 lg:gap-14">
        <SectionHeader id="ugc-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} mobileAlign="left" />
        <div className="flex flex-col gap-4">
          <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 lg:mx-0 lg:overflow-visible lg:px-0">
            <ul className="flex gap-3 lg:grid lg:grid-cols-5 lg:gap-5">
              {data.items.map((item, i) => (
                <li key={item.name} className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_46%] lg:flex-none">
                  <UgcCard item={item} liked={liked.has(i)} onLike={() => toggle(i)} />
                </li>
              ))}
            </ul>
          </div>
          <Dots count={count} selected={selected} onSelect={scrollTo} label="Post" className="lg:hidden" />
        </div>
      </PdpContainer>
    </section>
  );
}
