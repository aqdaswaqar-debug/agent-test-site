"use client";

import { useEffect, useState } from "react";

type Phrase = { lead: string; accent?: string };

type HeadlineRotatorProps = {
  phrases: Phrase[];
  /** Hold time per phrase. */
  intervalMs?: number;
};

/**
 * Visual-only rotating line (Figma 112:2689, two phrases in a clip window). It runs one full cycle and settles
 * back on the first phrase within 5s (WCAG 2.2.2, so no pause control is needed); static under reduced motion.
 * The server HTML shows phrase 1. Screen readers get the phrases from sr-only text placed by the page.
 */
export function HeadlineRotator({ phrases, intervalMs = 2500 }: HeadlineRotatorProps) {
  const [step, setStep] = useState(0);
  const maxSteps = phrases.length; // one cycle: 0 → 1 → … → 0
  const index = step % phrases.length;

  useEffect(() => {
    if (phrases.length < 2 || step >= maxSteps) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), intervalMs);
    return () => window.clearTimeout(t);
  }, [step, maxSteps, intervalMs, phrases.length]);

  const phrase = phrases[index];
  if (!phrase) return null;
  return (
    <span aria-hidden className="relative block h-[1.4em] overflow-hidden text-[24px] leading-[1.4] font-normal md:text-[32px] lg:text-[48px]">
      {/* Re-keyed on each change so the CSS slide-in replays (transform/opacity only; off for reduced motion). */}
      <span key={index} className={`absolute inset-x-0 top-0 whitespace-nowrap ${step > 0 ? "tg-swap-in" : ""}`}>
        {phrase.lead}
        {phrase.accent ? <span className="text-(--tg-teal)">{phrase.accent}</span> : null}
      </span>
    </span>
  );
}
