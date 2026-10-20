import { Calendar, Droplet, Shield, Sparkles, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PdpContent } from "./types";

const ICONS = { sparkles: Sparkles, sun: Sun, shield: Shield, droplet: Droplet, calendar: Calendar } as const;

function Item({ item, wrap = false }: { item: PdpContent["trustStrip"][number]; wrap?: boolean }) {
  const Icon = ICONS[item.icon];
  return (
    <li className={cn("flex items-center gap-3", wrap ? "min-w-0 flex-1" : "shrink-0")}>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--pdp-blush) text-[#e59e74]">
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
 * Below xl the five items don't fit, so they glide as a slow marquee (pauses on hover/touch, still for reduced motion).
 */
export function TrustStrip({ items }: { items: PdpContent["trustStrip"] }) {
  return (
    <section aria-label="Why Radiate" className="overflow-hidden border-b border-(--pdp-line) bg-white">
      <ul className="mx-auto hidden min-h-[88px] max-w-[1440px] items-center gap-6 px-[100px] py-3 xl:flex">
        {items.map((item) => (
          <Item key={item.title} item={item} wrap />
        ))}
      </ul>
      {/* Scrollable as well, so reduced-motion users (no marquee) can still reach every item. */}
      <div className="pdp-scroll-x flex h-16 items-center overflow-x-auto xl:hidden">
        <div className="ui-marquee flex w-max">
          <ul className="flex gap-10 pr-10">
            {items.map((item) => (
              <Item key={item.title} item={item} />
            ))}
          </ul>
          {/* Second copy makes the loop seamless; hidden from assistive tech and from reduced-motion users. */}
          <ul className="flex gap-10 pr-10 motion-reduce:hidden" aria-hidden>
            {items.map((item) => (
              <Item key={item.title} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
