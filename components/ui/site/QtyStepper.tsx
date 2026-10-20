"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

/** Quantity stepper shared by the PDP and the cart drawer (colours come from the --site-* tokens). */
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
    "grid shrink-0 place-items-center rounded-[8px] border border-(--site-line-strong) bg-white text-(--site-ink) transition-[background-color,scale] duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--site-accent) [@media(hover:hover)]:enabled:hover:bg-(--site-tint)";
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
