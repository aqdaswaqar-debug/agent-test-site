"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Minus, Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { MAX_QUANTITY, useCart, type CartItem } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

/* ---------- Quantity stepper ---------- */

type QtyStepperProps = {
  value: number;
  onChange: (n: number) => void;
  label: string;
  size?: "sm" | "md";
  min?: number;
  className?: string;
};

export function QtyStepper({ value, onChange, label, size = "md", min = 1, className }: QtyStepperProps) {
  const btn =
    "grid shrink-0 place-items-center rounded-[8px] border border-(--pdp-line-strong) bg-white text-(--pdp-ink) transition-[background-color,scale] duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:enabled:hover:bg-(--pdp-tint)";
  const box = size === "sm" ? "size-8" : "size-10";
  return (
    <div role="group" aria-label={label} className={cn("flex items-center gap-2", className)}>
      <button type="button" className={cn(btn, box)} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus aria-hidden size={size === "sm" ? 14 : 16} />
      </button>
      <output aria-live="polite" className={cn("min-w-8 text-center font-semibold tabular-nums", size === "sm" ? "text-[14px]" : "text-[18px]")}>
        {value}
      </output>
      <button type="button" className={cn(btn, box)} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label="Increase quantity">
        <Plus aria-hidden size={size === "sm" ? 14 : 16} />
      </button>
    </div>
  );
}

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
            <Star className={cn("absolute inset-0 text-(--pdp-peach)", box)} strokeWidth={1.5} />
            <span className={cn("absolute inset-0 overflow-hidden", FILL[tenths])}>
              <Star className={cn("fill-(--pdp-accent-strong) text-(--pdp-accent-strong)", box)} strokeWidth={1.5} />
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
          className="grid h-6 min-w-6 place-items-center focus-visible:outline-2 focus-visible:outline-(--pdp-accent)"
        >
          <span
            className={cn(
              "block h-2 w-6 origin-center rounded-full transition-[scale,background-color] duration-200 motion-reduce:transition-none",
              i === selected ? "scale-x-100 bg-(--pdp-accent-strong)" : "scale-x-[0.33] bg-(--pdp-dot)",
            )}
          />
        </button>
      ))}
    </div>
  );
}

/* ---------- Add to cart (mock) ---------- */

/** Adds to the local mock cart, confirms with a toast and opens the cart drawer when asked. */
export function useAddToCart() {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  return useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1, options: { openCart?: boolean } = {}) => {
      add(item, quantity);
      toast.success(`${item.name}${item.variant ? ` (${item.variant})` : ""} added to cart`, { id: `add-${item.id}` });
      if (options.openCart) setOpen(true);
    },
    [add, setOpen],
  );
}
