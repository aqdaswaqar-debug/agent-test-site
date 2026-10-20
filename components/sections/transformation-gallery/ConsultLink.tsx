"use client";

import type { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConsult } from "./ConsultProvider";

/**
 * "Book Consultation" CTA: opens the lead popup (ConsultProvider, treatment preselected). Without the provider it
 * scrolls to the footer callback form; without JS it is a plain anchor to `#request-callback`.
 */
export function ConsultLink({ children = "Book Consultation", className }: { children?: string; className?: string }) {
  const consult = useConsult();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (consult) {
      e.preventDefault();
      consult.open();
      return;
    }
    const target = document.getElementById("request-callback");
    if (!target) return;
    e.preventDefault();
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
    target.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    history.replaceState(null, "", "#request-callback");
  };
  return (
    <a
      href="#request-callback"
      onClick={onClick}
      className={cn(
        "group/cta inline-flex items-center justify-center gap-2 rounded-[10px] bg-(--tg-teal) px-6 py-3 text-[16px] font-semibold text-(--tg-on-teal) transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal-text) lg:text-[20px] [@media(hover:hover)]:hover:bg-(--tg-teal-hover)",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden size={20} className="transition-[translate] duration-200 motion-safe:group-hover/cta:translate-x-1 motion-safe:group-focus-visible/cta:translate-x-1" />
    </a>
  );
}
