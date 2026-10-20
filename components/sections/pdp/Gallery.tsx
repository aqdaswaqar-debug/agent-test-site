"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, CreditCard, PackageCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dots, useEmblaDots } from "./controls";
import type { PdpContent } from "./types";

type Props = { images: PdpContent["product"]["gallery"]; trustRow: PdpContent["product"]["trustRow"]; name: string };

const TRUST_ICONS = { payment: CreditCard, return: Truck, shipping: PackageCheck } as const;

const arrow =
  "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-(--pdp-ink) shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] transition-[scale,opacity] duration-150 active:scale-95 disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:size-12";

/** Product gallery (Figma 6986:5344 / mobile 7132:261): swipe, arrows, keyboard, thumbnail rail on desktop, dots on mobile. */
export function Gallery({ images, trustRow, name }: Props) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: false, align: "start" });
  const { selected, count, scrollTo } = useEmblaDots(embla);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const syncArrows = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    syncArrows();
    embla.on("select", syncArrows).on("reInit", syncArrows);
    return () => {
      embla.off("select", syncArrows).off("reInit", syncArrows);
    };
  }, [embla, syncArrows]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      embla?.scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      embla?.scrollNext();
    }
  };

  return (
    <div className="flex gap-5 lg:sticky lg:top-[120px]">
      {/* Thumbnail rail (desktop) */}
      <ul className="hidden w-24 shrink-0 flex-col gap-3 lg:flex" aria-label="Product images">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Show image ${i + 1}: ${img.alt}`}
              aria-current={i === selected ? "true" : undefined}
              className={cn(
                "relative block size-24 overflow-hidden rounded-[10px] border-2 bg-white p-0.5 transition-[border-color,translate,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5",
                i === selected
                  ? "border-(--pdp-accent) shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
                  : "border-[#e7e5e4] [@media(hover:hover)]:hover:border-(--pdp-peach)",
              )}
            >
              <Image src={img.src} alt="" width={96} height={96} sizes="96px" className="size-full rounded-[8px] object-cover" />
            </button>
          </li>
        ))}
      </ul>

      {/* Main card */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-[linear-gradient(125deg,#fff_0%,#fafaf9_100%)] lg:border-(--pdp-tint)">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={`${name} images`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--pdp-accent)"
        >
          <div ref={viewportRef} className="overflow-hidden">
            <ul className="flex">
              {images.map((img, i) => (
                <li
                  key={img.src}
                  className="relative aspect-square min-w-0 flex-[0_0_100%] bg-[#f9fafb]"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${images.length}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1440px) 470px, (min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className={cn(arrow, "left-4")} onClick={() => embla?.scrollPrev()} disabled={!canPrev} aria-label="Previous image">
            <ChevronLeft aria-hidden size={24} />
          </button>
          <button type="button" className={cn(arrow, "right-4")} onClick={() => embla?.scrollNext()} disabled={!canNext} aria-label="Next image">
            <ChevronRight aria-hidden size={24} />
          </button>
          <span aria-hidden className="absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white tabular-nums lg:hidden">
            {selected + 1} / {count || images.length}
          </span>
        </div>
        <Dots count={count} selected={selected} onSelect={scrollTo} label="Image" className="pt-3 lg:hidden" />

        <ul className="grid grid-cols-3 border-t border-[#e7e5e4] px-2 py-6 lg:py-7">
          {trustRow.map((t) => {
            const Icon = TRUST_ICONS[t.icon];
            return (
              <li key={t.label} className="flex flex-col items-center gap-3 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-(--pdp-tint) text-(--pdp-accent-strong) lg:size-16">
                  <Icon aria-hidden size={28} strokeWidth={1.75} />
                </span>
                <span className="text-[13px] leading-5 font-medium text-(--pdp-meta) lg:text-[14px]">{t.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
