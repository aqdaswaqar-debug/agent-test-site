"use client";

import { useState, type FormEvent } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Radio, RadioGroup } from "@headlessui/react";
import { ArrowRight, BadgePercent, Check, CircleCheck, Copy, Loader2, MapPin, Plus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { formatINR } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { QtyStepper, Stars, useAddToCart } from "./controls";
import { usePdpSelection } from "./pdp-store";
import type { Pack, PdpContent } from "./types";

type Props = { product: PdpContent["product"] };

export const discountPercent = (pack: Pack) => (pack.mrp > pack.price ? Math.round(((pack.mrp - pack.price) / pack.mrp) * 100) : 0);

/** Shared by the buy box, sticky bar and closing banner: adds the selected pack × quantity. */
export function useBuyActions(product: PdpContent["product"]) {
  const { packId, quantity } = usePdpSelection();
  const addToCart = useAddToCart();
  const pack = product.packs.find((p) => p.id === packId) ?? product.packs[0]!;
  const add = (openCart: boolean) =>
    addToCart(
      { id: `${product.id}:${pack.id}`, name: product.name, variant: pack.label, price: pack.price, image: product.gallery[0]!.src },
      quantity,
      { openCart },
    );
  return { pack, quantity, addToCart: () => add(false), buyNow: () => add(true) };
}

function CouponCard({ coupon }: { coupon: PdpContent["product"]["coupons"][number] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast.success(`Code ${coupon.code} copied`, { id: "coupon" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please note the code down", { id: "coupon" });
    }
  };
  return (
    <li className="w-[280px] shrink-0 snap-start overflow-hidden rounded-[10px] border border-(--pdp-accent) bg-white">
      <div className="flex flex-col gap-1 p-4 text-[14px] leading-5">
        <p className="font-medium text-(--pdp-accent-strong)">{coupon.title}</p>
        <p>{coupon.offer}</p>
        <p>Use Code: {coupon.code}</p>
      </div>
      <div className="flex items-center justify-between border-t border-(--pdp-accent) py-2 pr-2 pl-4">
        <span className="text-[14px] font-medium tracking-wide">{coupon.code}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? `Code ${coupon.code} copied` : `Copy code ${coupon.code}`}
          className="grid size-9 place-items-center rounded-[6px] text-(--pdp-ink) transition-colors focus-visible:outline-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:bg-(--pdp-tint)"
        >
          {copied ? <Check aria-hidden size={16} className="text-(--pdp-success)" /> : <Copy aria-hidden size={16} />}
        </button>
      </div>
    </li>
  );
}

type DeliveryState = { status: "idle" | "loading" } | { status: "ok" | "error"; message: string };

function DeliveryCheck() {
  const [pin, setPin] = useState("");
  const [state, setState] = useState<DeliveryState>({ status: "idle" });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setState({ status: "error", message: "Please enter a valid 6-digit PIN code." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/delivery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin }) });
      const data = (await res.json()) as { ok: boolean; message: string };
      setState({ status: data.ok ? "ok" : "error", message: data.message });
    } catch {
      setState({ status: "error", message: "We couldn't check right now. Please try again." });
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-6">
      <label htmlFor="pdp-pin" className="text-[14px] text-(--pdp-meta)">
        Check for Delivery Details
      </label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <MapPin aria-hidden size={20} className="absolute top-1/2 left-3 -translate-y-1/2 text-[#99a1af]" />
          <input
            id="pdp-pin"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter PIN code"
            aria-invalid={state.status === "error" || undefined}
            aria-describedby={state.status === "ok" || state.status === "error" ? "pdp-pin-msg" : undefined}
            className="h-12 w-full rounded-[10px] border border-[#d1d5dc] bg-white pr-3 pl-10 text-[16px] outline-none placeholder:text-[#30303080] focus:border-(--pdp-accent) aria-invalid:border-(--pdp-error)"
          />
        </div>
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="flex h-12 items-center gap-2 rounded-[10px] bg-(--pdp-tint) px-6 text-[16px] font-medium text-[#303030] transition-[background-color,scale] active:scale-[0.98] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:bg-(--pdp-peach)/40"
        >
          {state.status === "loading" ? <Loader2 aria-hidden size={16} className="animate-spin" /> : null}
          Check
        </button>
      </div>
      <p id="pdp-pin-msg" role="status" className={cn("min-h-4 text-[13px]", state.status === "error" ? "text-(--pdp-error)" : "text-(--pdp-accent-strong)")}>
        {state.status === "ok" || state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}

export function BuyBox({ product }: Props) {
  const { packId, setPack, quantity, setQuantity } = usePdpSelection();
  const { pack, addToCart, buyNow } = useBuyActions(product);
  const off = discountPercent(pack);

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <h1 id="pdp-title" className="text-[36px] leading-[1.25] font-bold text-(--pdp-ink) sm:text-[40px] lg:text-[40px] lg:leading-[1.13] xl:text-[48px]">
          {product.title[0]}
          <br />
          {product.title[1]}
        </h1>
        <p className="text-[14px] leading-[1.6] text-(--pdp-body) lg:text-[17px]">{product.lead}</p>
        <ul className="flex flex-wrap gap-2.5" aria-label="Key benefits">
          {product.chips.map((chip) => (
            <li key={chip} className="rounded-full border border-(--pdp-accent) bg-(--pdp-tint) px-3.5 py-1.5 text-[14px] leading-5 text-(--pdp-accent-strong) lg:bg-white">
              {chip}
            </li>
          ))}
        </ul>
        <a
          href="#reviews"
          className="flex w-fit items-center gap-3 rounded-[6px] pt-1 text-[14px] text-(--pdp-meta) focus-visible:outline-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:text-(--pdp-ink)"
        >
          <Stars value={product.rating.value} />
          <span>{product.rating.label}</span>
        </a>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2 border-y border-[#e7e5e4] py-5">
        <div className="flex flex-wrap items-center gap-3" aria-live="polite">
          <span className="text-[36px] leading-10 text-[#1c1917]">{formatINR(pack.price)}</span>
          {off > 0 ? (
            <>
              <s className="text-[24px] leading-8 text-(--pdp-strike)">
                <span className="sr-only">Was </span>
                {formatINR(pack.mrp)}
              </s>
              <span className="rounded-[4px] bg-(--pdp-tint) px-2 py-1 text-[14px] font-medium text-(--pdp-accent-strong)">{off}% OFF</span>
            </>
          ) : null}
        </div>
        <p className="text-[14px] text-(--pdp-meta)">
          Inclusive of all taxes{pack.units > 1 ? ` · ${formatINR(Math.round(pack.price / pack.units))} per bottle` : ""}
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {product.bankOffers.map((offer) => (
            <li key={offer} className="flex items-center gap-2 text-[14px] text-(--pdp-meta)">
              <CircleCheck aria-hidden size={16} className="shrink-0 text-(--pdp-accent-strong)" />
              {offer}
            </li>
          ))}
        </ul>
      </div>

      {/* Active offers */}
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-[17px] font-medium text-(--pdp-accent-strong) lg:text-[16px] lg:text-black">
          <BadgePercent aria-hidden size={20} className="text-(--pdp-accent-strong)" />
          Active offers
        </p>
        <ul className="pdp-scroll-x -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
          {product.coupons.map((c) => (
            <CouponCard key={c.code} coupon={c} />
          ))}
        </ul>
      </div>

      {/* Pack — placed before the CTAs so the visitor picks what they buy first (Figma shows it after). */}
      <RadioGroup value={packId} onChange={setPack} aria-label="Select size" className="flex flex-col gap-3">
        <p className="text-[14px] tracking-[0.02em] text-(--pdp-meta) uppercase">Select size:</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {product.packs.map((p) => (
            <Radio
              key={p.id}
              value={p.id}
              className="group relative flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-(--pdp-line) bg-white px-2 py-2 text-center text-[14px] leading-5 text-(--pdp-meta) transition-[border-color,background-color,translate] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) data-checked:border-(--pdp-accent) data-checked:bg-(--pdp-tint) data-checked:text-(--pdp-accent-strong) motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-(--pdp-peach)"
            >
              {p.recommended ? (
                <span className="absolute -top-2.5 right-2 rounded-[3px] bg-(--pdp-accent-strong) px-2 text-[10px] leading-[18px] text-white">Recommended</span>
              ) : null}
              <span className="font-medium">{p.label}</span>
              <span className="text-[12px] text-(--pdp-subtle) group-data-checked:text-(--pdp-accent-strong)">
                {formatINR(p.price)}
                {discountPercent(p) > 0 ? ` · Save ${discountPercent(p)}%` : ""}
              </span>
            </Radio>
          ))}
        </div>
      </RadioGroup>

      {/* Quantity + CTAs (observed by the sticky bar) */}
      <div id="pdp-buy-ctas" className="flex flex-col gap-3">
        <div className="flex items-end gap-3 sm:gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.02em] text-(--pdp-meta) uppercase lg:text-[14px]">Quantity:</span>
            <QtyStepper value={quantity} onChange={setQuantity} label="Quantity" />
          </div>
          <button
            type="button"
            onClick={buyNow}
            className="group/cta flex h-14 flex-1 items-center justify-center gap-2 rounded-[10px] bg-(--pdp-accent-strong) text-[18px] font-semibold text-white shadow-[0_10px_8px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)] transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:text-[16px] [@media(hover:hover)]:hover:bg-(--pdp-accent-hover)"
          >
            Buy Now
            <ArrowRight aria-hidden size={18} className="transition-[translate] duration-200 motion-safe:group-hover/cta:translate-x-1 motion-safe:group-focus-visible/cta:translate-x-1" />
          </button>
        </div>
        <button
          type="button"
          onClick={addToCart}
          className="flex h-14 items-center justify-center gap-2 rounded-[10px] border border-(--pdp-accent) bg-(--pdp-tint) text-[18px] font-semibold text-(--pdp-accent-strong) shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:bg-white/80 lg:text-[16px] [@media(hover:hover)]:hover:bg-(--pdp-tint)"
        >
          <ShoppingCart aria-hidden size={20} />
          Add to Cart
        </button>
      </div>

      <DeliveryCheck />

      {/* Reviews / FAQ jump links + detail accordions */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Reviews", href: "#reviews" },
            { label: "FAQ", href: "#faq" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="grid h-[50px] place-items-center rounded-[10px] border border-(--pdp-tint) bg-(--pdp-tint) text-[16px] font-medium text-[#1c1917] transition-[background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) lg:border-[#e7e5e4] [@media(hover:hover)]:hover:bg-(--pdp-peach)/40"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {product.accordions.map((a) => (
            <Disclosure key={a.title} as="div" className="overflow-hidden rounded-[10px] border border-[#e7e5e4]">
              {({ open }) => (
                <>
                  <h2>
                    <DisclosureButton className="flex h-[58px] w-full items-center justify-between bg-(--pdp-tint) px-5 text-left text-[16px] font-medium text-[#1c1917] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--pdp-accent)">
                      {a.title}
                      <Plus aria-hidden size={20} className={cn("text-(--pdp-accent-strong) transition-[rotate] duration-200 lg:text-(--pdp-meta)", open && "rotate-45")} />
                    </DisclosureButton>
                  </h2>
                  <DisclosurePanel
                    unmount={false}
                    transition
                    className="flex flex-col gap-2 px-5 py-4 text-[14px] leading-[1.6] text-(--pdp-body) transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0"
                  >
                    {a.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}
