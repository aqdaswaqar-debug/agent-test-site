"use client";

import { create } from "zustand";
import { MAX_QUANTITY } from "@/lib/cart-store";

/**
 * Selection shared by the hero buy box, the sticky bar and the closing banner:
 * the chosen pack and quantity must stay in sync wherever the visitor changes them.
 */
type PdpSelection = {
  packId: string;
  quantity: number;
  wishlisted: boolean;
  setPack: (id: string) => void;
  setQuantity: (n: number) => void;
  toggleWishlist: () => boolean;
};

export const usePdpSelection = create<PdpSelection>()((set, get) => ({
  /** Empty = the product's first pack (resolved in useBuyActions), so the store works for any PDP. */
  packId: "",
  quantity: 1,
  wishlisted: false,
  setPack: (packId) => set({ packId }),
  setQuantity: (n) => set({ quantity: Math.max(1, Math.min(MAX_QUANTITY, Math.round(n))) }),
  toggleWishlist: () => {
    const next = !get().wishlisted;
    set({ wishlisted: next });
    return next;
  },
}));
