import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** 1200px content column with mobile/tablet gutters (Figma: 120px side padding at 1440). */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-10 xl:px-0", className)}>{children}</div>;
}
