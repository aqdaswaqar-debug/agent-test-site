"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CountUpProps = { value: string; className?: string; durationMs?: number };

// "38+", "₹20,000", "45+" → prefix / number / suffix. Values like "1:1" or "Free" are left static.
const NUMERIC = /^([^\d]*)(\d[\d,]*)([^\d]*)$/;

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts a stat up from 0 the first time it scrolls into view: fast at the start, settling on the
 * real value. The server HTML always holds the final value (SEO, no-JS), screen readers only ever get
 * the final value, and the width is reserved so nothing shifts. Off for prefers-reduced-motion.
 */
export function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    setDisplay(value);
    const parts = NUMERIC.exec(value);
    if (!el || !parts || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: no flash to 0

    const [, prefix, digits, suffix] = parts;
    const target = Number(digits.replace(/,/g, ""));
    const grouped = digits.includes(",");
    const format = (n: number) => `${prefix}${grouped ? n.toLocaleString("en-IN") : String(n)}${suffix}`;
    let frame = 0;
    setDisplay(format(0));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          setDisplay(format(Math.round(target * easeOutExpo(t))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  if (!NUMERIC.test(value)) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={cn("inline-grid tabular-nums", className)}>
      <span className="sr-only">{value}</span>
      {/* Invisible final value reserves the width so the count never shifts the layout. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {display}
      </span>
    </span>
  );
}
