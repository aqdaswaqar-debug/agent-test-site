"use client";

import Image from "next/image";
import { CloseButton, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ShoppingBag, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { cartCount, cartSubtotal, formatINR, useCart } from "@/lib/cart-store";
import { QtyStepper } from "./QtyStepper";
import { BERKOWITS } from "./site-links";
import { siteThemeClass, type SiteTheme } from "./site-styles";

/** Slide-in mock cart (loaded on first open by LazyCartDrawer). */
export function CartDrawer({ theme }: { theme?: SiteTheme }) {
  const { items, open, setOpen, setQuantity, remove } = useCart();

  const count = cartCount(items);

  return (
    <Dialog open={open} onClose={setOpen} className={cn(siteThemeClass(theme), "relative z-60")}>
      <div aria-hidden className="fixed inset-0 bg-black/35" />
      <DialogPanel className="fixed inset-y-0 right-0 flex w-[min(420px,100vw)] flex-col bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between border-b border-(--site-line) px-5 py-4">
          <DialogTitle className="text-[18px] font-semibold">
            Your cart <span className="font-normal text-(--site-subtle)">({count})</span>
          </DialogTitle>
          <CloseButton className="grid size-10 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-(--site-accent) [@media(hover:hover)]:hover:bg-(--site-tint)" aria-label="Close cart">
            <X aria-hidden size={20} />
          </CloseButton>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag aria-hidden size={40} className="text-(--site-peach)" />
            <p className="text-[16px] font-medium">Your cart is empty</p>
            <CloseButton className="rounded-[8px] bg-(--site-accent-strong) px-5 py-3 text-[14px] font-semibold text-white">Continue shopping</CloseButton>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-(--site-line) overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-[10px] bg-(--site-cream)">
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-[14px] leading-snug font-semibold">{item.name}</p>
                    {item.variant ? <p className="text-[12px] text-(--site-body)">{item.variant}</p> : null}
                    <p className="text-[14px] font-semibold">{formatINR(item.price * item.quantity)}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <QtyStepper size="sm" value={item.quantity} onChange={(n) => setQuantity(item.id, n)} label={`Quantity of ${item.name}`} />
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="grid size-9 place-items-center rounded-full text-(--site-subtle) focus-visible:outline-2 focus-visible:outline-(--site-accent) [@media(hover:hover)]:hover:text-(--site-error)"
                      >
                        <Trash2 aria-hidden size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 border-t border-(--site-line) px-5 pt-4 site-safe-bottom">
              <div className="flex items-center justify-between text-[16px]">
                <span>Subtotal</span>
                <span className="font-semibold">{formatINR(cartSubtotal(items))}</span>
              </div>
              <p className="text-[12px] text-(--site-subtle)">Inclusive of all taxes. Free shipping. Use WELCOME10 for 10% off your first order.</p>
              <button
                type="button"
                onClick={() => toast("This is a test build — orders are placed on berkowits.com.", { id: "checkout", icon: "ℹ️" })}
                className="rounded-[10px] bg-(--site-accent-strong) py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--site-accent) [@media(hover:hover)]:hover:bg-(--site-accent-hover)"
              >
                Checkout
              </button>
              <a href={`${BERKOWITS}/collections`} className="pb-1 text-center text-[13px] font-medium text-(--site-accent-strong) underline-offset-2 hover:underline">
                Continue shopping on berkowits.com
              </a>
            </div>
          </>
        )}
      </DialogPanel>
    </Dialog>
  );
}
