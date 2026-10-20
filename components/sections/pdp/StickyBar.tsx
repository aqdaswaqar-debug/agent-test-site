"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { formatINR } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { discountPercent, useBuyActions } from "./BuyBox";
import { QtyStepper, Stars } from "./controls";
import { usePdpSelection } from "./pdp-store";
import type { PdpContent } from "./types";

/**
 * Bottom add-to-cart bar (Figma 7220:3 / 7220:29). Slides up once the buy-box buttons leave the screen
 * (only after scrolling past them, not above them) and hides again over the closing banner and footer.
 */
export function StickyBar({ product }: { product: PdpContent["product"] }) {
  const { pack, addToCart, buyNow } = useBuyActions(product);
  const setQuantity = usePdpSelection((s) => s.setQuantity);
  const quantity = usePdpSelection((s) => s.quantity);
  const [pastCtas, setPastCtas] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const off = discountPercent(pack);

  useEffect(() => {
    // Position check on scroll (rAF-throttled). An IntersectionObserver alone misses instant jumps
    // (e.g. anchor links or "back to top") that skip straight past the buy buttons.
    const ctas = document.getElementById("pdp-buy-ctas");
    const end = document.getElementById("closing-title")?.closest("section");
    let frame = 0;
    const check = () => {
      frame = 0;
      if (ctas) setPastCtas(ctas.getBoundingClientRect().bottom < 0);
      if (end) setAtEnd(end.getBoundingClientRect().top < window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const visible = pastCtas && !atEnd;

  return (
    <div
      role="region"
      aria-label="Quick buy"
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "pdp-safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-(--pdp-line) bg-white/95 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none lg:py-4",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 lg:justify-between lg:px-[100px]">
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:flex-none">
          <Image src={product.gallery[0]!.src} alt="" width={56} height={56} className="hidden size-14 rounded-[8px] object-cover lg:block" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-[11px] font-bold text-(--pdp-accent-strong) lg:text-[15px] lg:font-semibold lg:text-(--pdp-ink)">
              {product.name} <span className="font-normal text-(--pdp-subtle) max-lg:hidden">· {pack.label}</span>
            </p>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <span className="text-[16px] font-bold text-[#1c1917] lg:text-[18px]">{formatINR(pack.price)}</span>
              {off > 0 ? (
                <>
                  <s className="text-[12px] text-(--pdp-strike) lg:text-[13px]">{formatINR(pack.mrp)}</s>
                  <span className="rounded-[4px] bg-(--pdp-tint) px-1.5 py-0.5 text-[10px] font-medium text-(--pdp-accent-strong) lg:text-[11px]">{off}% OFF</span>
                </>
              ) : null}
              <Stars value={product.rating.value} size="sm" className="ml-2 hidden xl:inline-flex" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[13px] text-(--pdp-meta) uppercase xl:inline">Quantity:</span>
          <QtyStepper size="sm" value={quantity} onChange={setQuantity} label="Quantity" className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-1 lg:border-0 lg:bg-transparent lg:p-0" />
          <button
            type="button"
            onClick={addToCart}
            className="flex h-11 items-center gap-2 rounded-[10px] bg-(--pdp-accent-strong) px-4 text-[13px] font-bold text-white shadow-[0_4px_6px_rgba(205,97,17,0.3)] transition-[background-color,scale] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:h-[52px] lg:justify-center lg:px-6 xl:w-[200px] lg:border lg:border-(--pdp-accent) lg:bg-white/80 lg:text-[15px] lg:text-(--pdp-accent-strong) lg:shadow-[0_4px_6px_rgba(0,0,0,0.1)] [@media(hover:hover)]:hover:bg-(--pdp-accent-hover) lg:[@media(hover:hover)]:hover:bg-(--pdp-tint)"
          >
            <ShoppingCart aria-hidden size={16} className="hidden lg:block" />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="group/cta hidden h-[52px] items-center px-6 xl:w-[200px] xl:px-0 justify-center gap-2 rounded-[10px] bg-(--pdp-accent-strong) text-[15px] font-bold text-white shadow-[0_4px_3px_rgba(0,0,0,0.1)] transition-[background-color,scale] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:flex [@media(hover:hover)]:hover:bg-(--pdp-accent-hover)"
          >
            Buy Now
            <ArrowRight aria-hidden size={16} className="transition-[translate] duration-200 motion-safe:group-hover/cta:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
