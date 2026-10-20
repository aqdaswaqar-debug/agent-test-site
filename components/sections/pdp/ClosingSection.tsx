"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { useBuyActions } from "./BuyBox";
import { InViewVideo } from "./InViewVideo";
import type { PdpContent } from "./types";

/** Full-bleed closing banner over the orange-slice video (Figma 6968:5012 / 7215:4). Buttons use the buy-box selection. */
export function ClosingSection({ data, product }: { data: PdpContent["closing"]; product: PdpContent["product"] }) {
  const { addToCart, buyNow } = useBuyActions(product);
  return (
    <section aria-labelledby="closing-title" className="relative isolate flex min-h-[640px] items-center overflow-hidden px-6 py-12 lg:min-h-[780px] lg:px-20 lg:py-28">
      <div className="absolute inset-0">
        <InViewVideo src={data.video.src} poster={data.video.poster} buttonClassName="z-20" />
        <div aria-hidden className="absolute inset-0 bg-black/30 lg:bg-black/20" />
      </div>
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-6 text-center lg:gap-8">
        <h2 id="closing-title" className="font-(family-name:--font-pdp-display) text-[56px] leading-[1.08] text-white sm:text-[72px] lg:text-[112px] lg:leading-[1.1]">
          {data.title}
        </h2>
        <div className="flex flex-col gap-1 text-[17px] leading-[1.6] text-(--pdp-closing-cream) lg:text-[20px] lg:leading-[1.5]">
          <p className="lg:hidden">{data.mobileBody}</p>
          {data.body.map((line) => (
            <p key={line} className="hidden lg:block">
              {line}
            </p>
          ))}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={buyNow}
            className="group/cta flex items-center justify-center gap-2 rounded-full bg-(--pdp-closing-cream) px-12 py-[18px] text-[16px] font-bold text-(--pdp-accent-hover) transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:py-[22px] lg:text-[18px] [@media(hover:hover)]:hover:bg-white"
          >
            Buy Now
            <ArrowRight aria-hidden size={18} className="transition-[translate] duration-200 motion-safe:group-hover/cta:translate-x-1 motion-safe:group-focus-visible/cta:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={addToCart}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-(--pdp-closing-cream) px-12 py-4 text-[16px] font-bold tracking-[0.03em] text-(--pdp-closing-cream) transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:py-5 lg:text-[18px] [@media(hover:hover)]:hover:bg-white/10"
          >
            <ShoppingCart aria-hidden size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
