"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { useCart, type CartItem } from "@/lib/cart-store";

/* ---------- Quantity stepper (shared) ---------- */

export { QtyStepper } from "@/components/ui/site/QtyStepper";

/* ---------- Stars, Embla dots (shared) ---------- */

export { Dots, Stars, useEmblaDots } from "@/components/ui/carousel-controls";

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
