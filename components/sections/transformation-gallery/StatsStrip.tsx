import { Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";
import type { Stat } from "./types";

/**
 * Proof numbers row. Figma draws it as a marquee cut off at both edges; built as a swipeable snap row
 * (no auto-scroll, WCAG 2.2.2) that turns into a static centred row once everything fits (xl).
 */
export function StatsStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <section aria-label="Berkowits in numbers" className={cn("py-6 lg:py-10", className)}>
      <ul tabIndex={0} aria-label="Berkowits in numbers, scroll sideways for more" className="tg-scroll-x tg-fade-x relative flex snap-x snap-mandatory gap-10 overflow-x-auto px-[12vw] focus-visible:outline-2 focus-visible:outline-(--tg-teal) md:px-10 xl:justify-center-safe xl:gap-12 xl:px-6">
        {stats.map((s) => (
          <li key={s.label} className="flex shrink-0 snap-center items-baseline gap-2 whitespace-nowrap">
            <span className="flex items-center gap-1 font-(family-name:--font-tg-display) text-[34px] leading-none font-medium text-(--tg-teal-text) lg:text-[44px]">
              <CountUp value={s.value} />
              {s.star ? <Star aria-hidden className="size-7 fill-(--tg-teal) text-(--tg-teal) lg:size-8" /> : null}
            </span>
            <span className="text-[16px] text-(--tg-label) lg:text-[20px]">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
