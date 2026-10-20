"use client";

import { useState } from "react";
import { Pause, Play, Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";
import type { Stat } from "./types";

function Item({ s }: { s: Stat }) {
  return (
    <li className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
      <span className="flex items-center gap-1 font-(family-name:--font-tg-display) text-[34px] leading-none font-medium text-(--tg-teal-text) lg:text-[44px]">
        <CountUp value={s.value} />
        {s.star ? <Star aria-hidden className="size-7 fill-(--tg-teal) text-(--tg-teal) lg:size-8" /> : null}
      </span>
      <span className="text-[16px] text-(--tg-label) lg:text-[20px]">{s.label}</span>
    </li>
  );
}

/**
 * Proof numbers marquee (Figma: the row runs off both edges; berkowits.com animates it the same way, 22s loop).
 * Two copies of the row scroll seamlessly (transform only). It pauses on hover/focus and has a visible
 * pause button (WCAG 2.2.2); with reduced motion it is a static, swipeable row.
 */
export function StatsStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label="Berkowits in numbers" className={cn("relative py-6 lg:py-10", className)}>
      <div className="tg-marquee-wrap tg-scroll-x tg-fade-x overflow-hidden">
        <div className="tg-marquee flex w-max" data-paused={paused || undefined}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="relative flex shrink-0 gap-14 pr-14 lg:gap-24 lg:pr-24">
              {stats.map((s) => (
                <Item key={s.label} s={s} />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play the numbers ticker" : "Pause the numbers ticker"}
        className="tg-marquee-toggle absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white text-(--tg-teal-text) shadow-[0_2px_10px_rgba(0,0,0,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal) lg:right-4"
      >
        {paused ? <Play aria-hidden size={16} className="ml-0.5 fill-current" /> : <Pause aria-hidden size={16} className="fill-current" />}
      </button>
    </section>
  );
}
