"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* Shared by the PDP and the gallery; colours come from --site-accent / --site-accent-strong / --site-peach / --site-dot. */

/* ---------- Stars (partial fill in 10% steps, e.g. 4.9) ---------- */

const FILL = ["w-0", "w-[10%]", "w-[20%]", "w-[30%]", "w-[40%]", "w-1/2", "w-[60%]", "w-[70%]", "w-[80%]", "w-[90%]", "w-full"];

export function Stars({ value, size = "md", className }: { value: number; size?: "sm" | "md"; className?: string }) {
  const box = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span className={cn("inline-flex gap-1", className)} role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const tenths = Math.round(Math.max(0, Math.min(1, value - i)) * 10);
        return (
          <span key={i} className={cn("relative inline-block", box)} aria-hidden>
            <Star className={cn("absolute inset-0 text-(--site-peach)", box)} strokeWidth={1.5} />
            <span className={cn("absolute inset-0 overflow-hidden", FILL[tenths])}>
              <Star className={cn("fill-(--site-accent-strong) text-(--site-accent-strong)", box)} strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ---------- Embla dots ---------- */

export function useEmblaDots(embla: EmblaCarouselType | undefined) {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const sync = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
    setCount(embla.scrollSnapList().length);
  }, [embla]);
  useEffect(() => {
    if (!embla) return;
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);
  return { selected, count, scrollTo: (i: number) => embla?.scrollTo(i) };
}

export function Dots({ count, selected, onSelect, label, className }: { count: number; selected: number; onSelect: (i: number) => void; label: string; className?: string }) {
  if (count < 2) return null;
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`${label} ${i + 1} of ${count}`}
          aria-current={i === selected ? "true" : undefined}
          className="grid h-6 min-w-6 place-items-center focus-visible:outline-2 focus-visible:outline-(--site-accent)"
        >
          <span
            className={cn(
              "block h-2 w-6 origin-center rounded-full transition-[scale,background-color] duration-200 motion-reduce:transition-none",
              i === selected ? "scale-x-100 bg-(--site-accent-strong)" : "scale-x-[0.33] bg-(--site-dot)",
            )}
          />
        </button>
      ))}
    </div>
  );
}
