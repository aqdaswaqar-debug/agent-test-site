"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = { children: ReactNode; className?: string };

type RevealState = "idle" | "pending" | "shown";

/**
 * Fade + small rise the first time a block scrolls into view (SOP motion standard: once, ≤600ms).
 * Content is visible in the server HTML; the effect is only armed on the client for blocks that are
 * still below the fold, and never when the user prefers reduced motion.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: leave as is

    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        state === "pending" && "translate-y-4 opacity-0",
        state === "shown" && "translate-y-0 opacity-100 transition-[opacity,transform] duration-500 ease-out",
        className,
      )}
    >
      {children}
    </div>
  );
}
