"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCart } from "@/lib/cart-store";

const CartDrawer = dynamic(() => import("./CartDrawer").then((m) => m.CartDrawer), { ssr: false });

/**
 * Restores the saved cart after hydration (so server and client HTML match) and only downloads the
 * drawer the first time it opens, keeping dialog code out of the first page load.
 */
export function LazyCartDrawer() {
  const open = useCart((s) => s.open);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (open) setLoaded(true);
  }, [open]);

  return loaded ? <CartDrawer /> : null;
}
