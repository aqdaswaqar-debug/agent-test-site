"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Mock cart for the test site. Shared between the header badge, the buy box, the sticky bar,
 * bundles and recommendations, so it lives in one small Zustand store (CLAUDE.md: Zustand if shared).
 * Nothing is sent anywhere; the cart is kept in this browser's localStorage only.
 */

export type CartItem = {
  /** Unique per product + variant, e.g. "radiate-vitamin-c:pack-3". */
  id: string;
  name: string;
  variant?: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  setOpen: (open: boolean) => void;
};

export const MAX_QUANTITY = 10;

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.round(n)));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      add: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const items = existing
            ? state.items.map((i) => (i.id === item.id ? { ...i, quantity: clamp(i.quantity + quantity) } : i))
            : [...state.items, { ...item, quantity: clamp(quantity) }];
          return { items };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, quantity: clamp(quantity) } : i)) })),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "berkowits-test-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      // Read storage after hydration so server and first client render match (empty cart).
      skipHydration: true,
    },
  ),
);

export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0);
export const cartSubtotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

/** Indian rupee formatting without decimals: 1499 → "₹1,499". */
export const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
