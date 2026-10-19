import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = { children: ReactNode; className?: string };

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[8px] px-3 py-1.5 text-[12px] leading-[1.6] font-medium text-(--ls-ink) lg:px-3.5 lg:py-2 lg:text-[13px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
