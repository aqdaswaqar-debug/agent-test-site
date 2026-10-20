import { Calendar, Droplet, Shield, Sparkles, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PdpContent } from "./types";

const ICONS = { sparkles: Sparkles, sun: Sun, shield: Shield, droplet: Droplet, calendar: Calendar } as const;

function Item({ item, wrap = false }: { item: PdpContent["trustStrip"][number]; wrap?: boolean }) {
  const Icon = ICONS[item.icon];
  return (
    <li className={cn("flex items-center gap-3", wrap ? "min-w-0 flex-1" : "shrink-0 snap-start")}>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--pdp-blush) text-(--pdp-peach-deep)">
        <Icon aria-hidden size={16} strokeWidth={2} />
      </span>
      <span className={cn("flex flex-col gap-0.5", !wrap && "whitespace-nowrap")}>
        <span className="text-[11px] font-bold tracking-[0.04em] text-(--pdp-ink) uppercase">{item.title}</span>
        <span className="text-[12px] text-(--pdp-body)">{item.text}</span>
      </span>
    </li>
  );
}

/**
 * Five quick claims under the hero (Figma 6969:23455 / 7136:4). Desktop: one spaced row.
 * Below xl the five items don't fit, so they become a swipeable, snap-scrolling row
 * (no auto-moving marquee: it could not be paused by keyboard or touch users).
 */
export function TrustStrip({ items }: { items: PdpContent["trustStrip"] }) {
  return (
    <section aria-label="Why Radiate" className="border-b border-(--pdp-line) bg-white">
      <ul className="mx-auto hidden min-h-[88px] max-w-[1440px] items-center gap-6 px-[100px] py-3 xl:flex">
        {items.map((item) => (
          <Item key={item.title} item={item} wrap />
        ))}
      </ul>
      <div role="region" aria-label="Why Radiate (scrollable)" tabIndex={0} className="pdp-scroll-x overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--pdp-accent) xl:hidden">
        <ul className="flex h-16 w-max snap-x snap-mandatory items-center gap-8 px-4">
          {items.map((item) => (
            <Item key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
