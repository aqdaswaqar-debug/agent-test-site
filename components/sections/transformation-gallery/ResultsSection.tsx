import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ResultsGallery } from "./ResultsGallery";
import { tgContainer, tgH2, tgSection } from "./styles";
import type { ResultPair } from "./types";

type ResultsSectionProps = {
  id: string;
  title: string;
  /** Short name for captions ("Hair transplant"). */
  label: string;
  pairs: ResultPair[];
  intro?: ReactNode;
  /** h2 for a standalone section, h3 when grouped under a parent heading (Skin page). */
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Heading + before/after gallery. Renders nothing without pairs (never show empty galleries). */
export function ResultsSection({ id, title, label, pairs, intro, headingLevel = "h2", className }: ResultsSectionProps) {
  if (!pairs.length) return null;
  const Heading = headingLevel;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(tgSection, "scroll-mt-28", className)}>
      <div className={cn(tgContainer, "flex flex-col gap-6 lg:gap-10")}>
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading id={`${id}-title`} className={cn(tgH2, headingLevel === "h3" && "text-[22px] font-medium md:text-[28px] lg:text-[32px] lg:font-semibold")}>
            {title}
          </Heading>
          {intro ? <div className="max-w-[760px] text-[15px] leading-[1.6] text-(--tg-body) lg:text-[18px]">{intro}</div> : null}
        </div>
        <ResultsGallery pairs={pairs} label={label} />
      </div>
    </section>
  );
}
