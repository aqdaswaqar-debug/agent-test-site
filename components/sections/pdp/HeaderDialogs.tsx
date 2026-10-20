"use client";

import { useMemo, useState } from "react";
import { CloseButton, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Phone, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconBtn } from "./header-styles";
import { NAV, SITE } from "./site-links";

/* Loaded on first open only (next/dynamic), so Headless UI's dialog code stays out of the first page load. */

const B = "https://berkowits.com";

/** Quick links offered by the search panel (live berkowits.com pages). */
const SEARCH_LINKS = [
  { label: "Radiate Vitamin C Serum", href: `${B}/products/radiate-vitamin-c-serum-for-men-women/7540888535130` },
  { label: "Radiate Skin Brightening Serum", href: `${B}/products/radiate-skin-brightening-face-serum-for-glowing-skin-30ml/7540889649242` },
  { label: "Protect Sunscreen Gel SPF 50", href: `${B}/products/protect-sunscreen-gel-for-all-skin-types-spf-50-pa-60gm/7540884668506` },
  { label: "Radiate range", href: `${B}/collections/radiate` },
  { label: "Face serums", href: `${B}/collections/face-serums` },
  { label: "Sun protection", href: `${B}/collections/sun-protection` },
  { label: "Pigmentation & uneven tone", href: `${B}/collections/pigmentation-uneven-tone` },
  { label: "Skin brightening & glow", href: `${B}/collections/skin-brightening-glow` },
  { label: "Shop hair", href: `${B}/collections/shop-hair` },
  { label: "Skin treatments", href: `${B}/treatments/skin` },
  { label: "AI hair assessment", href: `${B}/ai-tools/ai-hair-assessment` },
];


export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? SEARCH_LINKS.filter((l) => l.label.toLowerCase().includes(q)) : SEARCH_LINKS.slice(0, 6);
  }, [query]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-60">
      <div aria-hidden className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-x-0 top-0 p-3 sm:p-6">
        <DialogPanel className="mx-auto w-full max-w-[640px] rounded-[16px] bg-white p-4 shadow-[0_24px_48px_rgba(0,0,0,0.18)] sm:p-6">
          <DialogTitle className="sr-only">Search Berkowits</DialogTitle>
          <div className="flex items-center gap-3 rounded-[12px] border border-(--pdp-line-strong) px-3 focus-within:border-(--pdp-accent)">
            <Search aria-hidden size={18} className="text-(--pdp-subtle)" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, concerns, treatments"
              aria-label="Search"
              className="h-12 flex-1 bg-transparent text-[15px] outline-none placeholder:text-(--pdp-subtle)"
            />
            <CloseButton className="grid size-9 place-items-center rounded-full text-(--pdp-body) focus-visible:outline-2 focus-visible:outline-(--pdp-accent)" aria-label="Close search">
              <X aria-hidden size={18} />
            </CloseButton>
          </div>
          <p className="mt-4 mb-2 text-[12px] font-semibold tracking-[0.08em] text-(--pdp-subtle) uppercase">{query ? "Results" : "Popular on Berkowits"}</p>
          {results.length ? (
            <ul className="flex flex-col">
              {results.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="block rounded-[8px] px-2 py-2.5 text-[15px] text-(--pdp-ink) focus-visible:outline-2 focus-visible:outline-(--pdp-accent) [@media(hover:hover)]:hover:bg-(--pdp-tint)">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-2 py-3 text-[14px] text-(--pdp-body)">
              No quick match.{" "}
              <a className="font-medium text-(--pdp-accent-strong) underline" href={`${B}/collections`}>
                Browse all products
              </a>
            </p>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
      
      <Dialog open={open} onClose={onClose} className="relative z-60 lg:hidden">
        <div aria-hidden className="fixed inset-0 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 left-0 flex w-[min(320px,86vw)] flex-col gap-6 bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[16px] font-semibold">Menu</DialogTitle>
            <CloseButton className={iconBtn} aria-label="Close menu">
              <X aria-hidden size={20} />
            </CloseButton>
          </div>
          <nav aria-label="Main">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={cn(
                      "block border-b border-(--pdp-line) py-3.5 text-[16px] focus-visible:outline-2 focus-visible:outline-(--pdp-accent)",
                      item.active ? "font-semibold text-(--pdp-accent-strong)" : "text-(--pdp-ink)",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-3 text-[15px] text-(--pdp-ink)">
              <Phone aria-hidden size={18} className="text-(--pdp-accent-strong)" /> {SITE.phoneDisplay}
            </a>
            <a href={SITE.login} className="rounded-[8px] bg-(--pdp-accent-strong) py-3 text-center text-[15px] font-medium text-white">
              Login/signup
            </a>
          </div>
        </DialogPanel>
      </Dialog>
  );
}
