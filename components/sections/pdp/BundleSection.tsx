"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, Check, Minus } from "lucide-react";
import { formatINR, useCart } from "@/lib/cart-store";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { cn } from "@/lib/utils";
import { Dots, QtyStepper, useAddToCart, useEmblaDots } from "./controls";
import { productUrl } from "./site-links";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

type Line = { selected: boolean; quantity: number };

function Checkbox({ checked, indeterminate = false, disabled, onChange, label }: { checked: boolean; indeterminate?: boolean; disabled?: boolean; onChange: (v: boolean) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <span className="relative grid size-6 shrink-0 place-items-center">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
        className="peer size-6 cursor-pointer appearance-none rounded-[4px] border-2 border-(--pdp-accent) bg-white checked:bg-(--pdp-accent-strong) indeterminate:bg-(--pdp-accent-strong) disabled:cursor-not-allowed disabled:border-(--pdp-line-strong) disabled:bg-(--pdp-line) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent)"
      />
      <Check aria-hidden size={14} strokeWidth={3} className="pointer-events-none absolute hidden text-white peer-checked:block" />
      <Minus aria-hidden size={14} strokeWidth={3} className="pointer-events-none absolute hidden text-white peer-indeterminate:block" />
    </span>
  );
}

/** "Complete your routine" bundle (Figma 6969:23985 / 7133:23531): tick products, set quantities, add all at once. */
export function BundleSection({ data }: { data: PdpContent["bundle"] }) {
  const [lines, setLines] = useState<Record<string, Line>>(() =>
    Object.fromEntries(data.items.map((p) => [p.id, { selected: p.inStock !== false, quantity: 1 }])),
  );
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    // Open on the first product that can be bought (the cleanser is out of stock).
    startIndex: Math.max(0, data.items.findIndex((p) => p.inStock !== false)),
    breakpoints: { "(min-width: 1024px)": { active: false } },
  });
  const { selected: slide, count, scrollTo } = useEmblaDots(embla);
  const addToCart = useAddToCart();
  const setCartOpen = useCart((s) => s.setOpen);

  const available = data.items.filter((p) => p.inStock !== false);
  const chosen = available.filter((p) => lines[p.id]?.selected);
  const total = chosen.reduce((sum, p) => sum + p.price * (lines[p.id]?.quantity ?? 1), 0);
  const allSelected = chosen.length === available.length && available.length > 0;
  const update = (id: string, patch: Partial<Line>) => setLines((prev) => ({ ...prev, [id]: { ...prev[id]!, ...patch } }));
  const selectAll = (value: boolean) => available.forEach((p) => update(p.id, { selected: value }));

  const summary = allSelected ? `Selected All (${chosen.length} Products)` : `${chosen.length} of ${available.length} Selected`;

  const buildRoutine = () => {
    chosen.forEach((p) => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image.src }, lines[p.id]?.quantity ?? 1));
    setCartOpen(true);
  };

  return (
    <section id="routine" aria-labelledby="bundle-title" className="scroll-mt-24 bg-white py-8 lg:py-24">
      <PdpContainer className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader
          id="bundle-title"
          eyebrow={data.eyebrow}
          title={data.title}
          intro={<ResponsiveText desktop={data.intro ?? ""} mobile={data.mobileIntro} />}
          mobileAlign="left"
        />

        <div className="flex items-center justify-between gap-3 rounded-[12px] bg-(--pdp-tint) p-3 lg:rounded-none lg:bg-transparent lg:p-0">
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-(--pdp-ink) lg:text-[14px]">
            <Checkbox checked={allSelected} indeterminate={!allSelected && chosen.length > 0} onChange={selectAll} label="Select all available products" />
            {summary}
          </label>
          <p className="text-[15px] font-bold text-(--pdp-accent-strong) lg:text-[18px] lg:text-(--pdp-ink)" aria-live="polite">
            Bundle Price: {formatINR(total)}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 lg:mx-0 lg:overflow-visible lg:px-0">
            <ul className="flex gap-3 lg:grid lg:grid-cols-3 lg:gap-6">
              {data.items.map((p) => {
                const line = lines[p.id]!;
                const oos = p.inStock === false;
                return (
                  <li key={p.id} className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-none">
                    <article
                      className={cn(
                        "group flex h-full flex-col gap-4 rounded-[16px] border border-(--pdp-line) bg-(--pdp-cream) p-4 transition-opacity lg:p-6",
                        !oos && hoverLift,
                        (oos || !line.selected) && "opacity-70",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <Checkbox checked={line.selected} disabled={oos} onChange={(v) => update(p.id, { selected: v })} label={`Include ${p.name}`} />
                        <span className="text-[12px] font-bold tracking-[0.04em] text-(--pdp-accent-strong) uppercase">{p.step}</span>
                      </div>
                      <a href={productUrl(p.slug)} tabIndex={-1} aria-hidden className="relative block aspect-[349/200] overflow-hidden rounded-[12px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent)">
                        <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 350px, 88vw" className={cn("object-contain", hoverZoom)} />
                        {oos ? <span className="absolute top-3 left-3 rounded-full bg-(--pdp-ink) px-2.5 py-1 text-[11px] font-semibold text-white">Out of stock</span> : null}
                      </a>
                      <div className="flex min-w-0 flex-col gap-1.5">
                        <h3 className="truncate text-[18px] font-bold text-(--pdp-ink)">
                          <a href={productUrl(p.slug)} className="focus-visible:outline-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:text-(--pdp-accent-strong)">
                            {p.name}
                          </a>
                        </h3>
                        <p className="truncate text-[13px] text-(--pdp-body)">{p.descriptor}</p>
                        <p className="text-[20px] font-bold text-(--pdp-ink)">{formatINR(p.price)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="text-[13px] text-(--pdp-body)">Quantity</span>
                        {oos ? (
                          <span className="text-[13px] font-semibold text-(--pdp-subtle)">Unavailable</span>
                        ) : (
                          <QtyStepper size="sm" value={line.quantity} onChange={(n) => update(p.id, { quantity: n })} label={`Quantity of ${p.name}`} />
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
          <Dots count={count} selected={slide} onSelect={scrollTo} label="Product" className="lg:hidden" />
        </div>

        <button
          type="button"
          onClick={buildRoutine}
          disabled={chosen.length === 0}
          className="group/cta flex items-center justify-center gap-3 self-stretch rounded-[8px] bg-(--pdp-accent-strong) px-12 py-3.5 text-[14px] font-bold tracking-[0.02em] text-white uppercase transition-[background-color,scale] duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:self-center lg:py-4 lg:text-[18px] [@media(hover:hover)]:enabled:hover:bg-(--pdp-accent-hover)"
        >
          {data.cta} • {formatINR(total)}
          <ArrowRight aria-hidden size={18} className="transition-[translate] duration-200 motion-safe:group-hover/cta:translate-x-1 motion-safe:group-focus-visible/cta:translate-x-1" />
        </button>
      </PdpContainer>
    </section>
  );
}
