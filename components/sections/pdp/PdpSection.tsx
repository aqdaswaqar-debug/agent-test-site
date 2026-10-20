import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page container: 1240px content at 1440 (Figma 1488 at ×1.2), 16px gutters on phones. */
export function PdpContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-[100px]", className)}>{children}</div>;
}

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Mobile alignment; desktop is centred unless `align="left"`. */
  mobileAlign?: "left" | "center";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

/** Eyebrow + H2 (+ intro). The H2 carries the id used by aria-labelledby on the section. */
export function SectionHeader({ id, eyebrow, title, intro, mobileAlign = "center", align = "center", className, titleClassName }: SectionHeaderProps) {
  const centred = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-2 lg:gap-3",
        mobileAlign === "center" ? "items-center text-center" : "items-start text-left",
        centred ? "lg:items-center lg:text-center" : "lg:items-start lg:text-left",
        className,
      )}
    >
      <p className="text-[12px] leading-normal font-bold tracking-[0.08em] text-(--pdp-accent-strong) uppercase lg:text-[13px]">{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "text-[24px] leading-[1.2] font-bold text-(--pdp-ink) md:text-[30px] lg:text-[38px] lg:leading-[1.2]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn("max-w-[720px] text-[14px] leading-[1.5] text-(--pdp-body) lg:text-[16px]", centred && "lg:mx-auto")}>{intro}</p>
      ) : null}
    </div>
  );
}
