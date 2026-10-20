"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Check, Plus } from "lucide-react";
import { formatINR } from "@/lib/cart-store";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { Dots, useAddToCart, useEmblaDots } from "./controls";
import { OUT_OF_STOCK, productUrl } from "./radiate-vitamin-c";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent, Product } from "./types";

function QuickAdd({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const [added, setAdded] = useState(false);
  const oos = OUT_OF_STOCK.has(product.id);

  if (oos) {
    return (
      <a
        href={productUrl(product.slug)}
        className="rounded-[8px] border border-(--pdp-accent) py-3 text-center text-[14px] font-bold text-(--pdp-accent-strong) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent)"
      >
        Out of stock · View
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image.src });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="group/cta flex items-center justify-center gap-2 rounded-[8px] bg-(--pdp-accent-strong) py-3 text-[14px] font-bold tracking-[0.02em] text-white uppercase transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:bg-(--pdp-accent-hover)"
    >
      {added ? <Check aria-hidden size={16} /> : <Plus aria-hidden size={16} className="transition-[rotate] duration-200 motion-safe:group-hover/cta:rotate-90" />}
      {added ? "Added" : "Quick add"}
      <span className="sr-only"> {product.name}</span>
    </button>
  );
}

/** Cross-sell row (Figma 6969:24095 / 7133:23553): 3-up on desktop, swipe with peek + dots on mobile. */
export function RecommendationsSection({ data }: { data: PdpContent["recommendations"] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", breakpoints: { "(min-width: 1024px)": { active: false } } });
  const { selected, count, scrollTo } = useEmblaDots(embla);

  return (
    <section aria-labelledby="more-title" className="bg-(--pdp-ivory) py-8 lg:bg-(--pdp-blush) lg:py-24">
      <PdpContainer className="flex flex-col gap-6 lg:gap-14">
        <SectionHeader id="more-title" eyebrow={data.eyebrow} title={data.title} titleClassName="lg:text-(--pdp-accent-strong)" />
        <div className="flex flex-col gap-4">
          <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 lg:mx-0 lg:overflow-visible lg:px-0">
            <ul className="flex gap-3 lg:grid lg:grid-cols-3 lg:gap-6">
              {data.items.map((p) => (
                <li key={p.id} className="min-w-0 flex-[0_0_86%] sm:flex-[0_0_46%] lg:flex-none">
                  <article className={cn("group flex h-full flex-col gap-4 rounded-[20px] border-2 border-[#e7e5e4] bg-white p-5 lg:rounded-[16px] lg:border lg:border-(--pdp-line)", hoverLift)}>
                    <a href={productUrl(p.slug)} className="relative block aspect-[357/260] overflow-hidden rounded-[12px] bg-(--pdp-cream) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent)" tabIndex={-1}>
                      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 360px, 86vw" className={cn("object-cover", hoverZoom)} />
                    </a>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <h3 className="truncate text-[18px] font-bold text-(--pdp-ink) lg:text-(--pdp-accent-strong)">
                        <a href={productUrl(p.slug)} className="focus-visible:outline-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:underline">
                          {p.name}
                        </a>
                      </h3>
                      <p className="truncate text-[13px] text-(--pdp-body)">{p.descriptor}</p>
                      <p className="text-[20px] font-bold text-(--pdp-accent-strong)">{formatINR(p.price)}</p>
                    </div>
                    <div className="mt-auto flex flex-col">
                      <QuickAdd product={p} />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
          <Dots count={count} selected={selected} onSelect={scrollTo} label="Product" className="lg:hidden" />
        </div>
      </PdpContainer>
    </section>
  );
}
