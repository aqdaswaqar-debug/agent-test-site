import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = { children: ReactNode; className?: string };

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] leading-[1.6] font-semibold tracking-[0.12em] text-(--ls-mint-text) uppercase lg:text-[12px]",
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionTitleProps = { id: string; children: ReactNode; className?: string };

/** The page's standard H2. Carries the id used by aria-labelledby on the section. */
export function SectionTitle({ id, children, className }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-[26px] leading-[1.2] font-semibold text-(--ls-ink) md:text-[32px] lg:text-[40px] lg:leading-[1.18]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** "split" = title left, intro right on desktop (Figma "Header split"). */
  layout?: "split" | "stack";
  /** false = intro only from lg up (Figma mobile frames often drop it). */
  introOnMobile?: boolean;
  className?: string;
  titleClassName?: string;
};

/** Eyebrow + H2 (+ optional intro). The H2 carries the id used by aria-labelledby on the section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  layout = "split",
  introOnMobile = true,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        layout === "split" && intro && "lg:flex-row lg:items-end lg:gap-20",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-3 lg:gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle id={id} className={titleClassName}>
          {title}
        </SectionTitle>
      </div>
      {intro ? (
        <p
          className={cn(
            "text-[14px] leading-[1.6] text-(--ls-muted) lg:text-[16px] lg:leading-[1.65]",
            layout === "split" && "lg:w-[480px] lg:shrink-0",
            !introOnMobile && "hidden lg:block",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
