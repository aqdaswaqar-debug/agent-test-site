import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[12px] font-medium leading-[1.65] whitespace-nowrap " +
  "transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ls-ink)";

const variants: Record<Variant, string> = {
  // Figma component rule: "Ink text on mint" (also keeps WCAG AA contrast).
  primary: "bg-(--ls-mint) text-(--ls-ink) [@media(hover:hover)]:hover:bg-(--ls-mint-hover)",
  secondary:
    "border border-(--ls-border-strong) bg-white text-(--ls-ink) [@media(hover:hover)]:hover:border-(--ls-ink)",
  inverse: "bg-white text-(--ls-ink) [@media(hover:hover)]:hover:bg-(--ls-mint-soft)",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-4 text-[15px]",
  sm: "px-5 py-3 text-[14px]",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
};

/** Anchor styled as a button: used for in-page jumps, tel: links and external links. */
export function ButtonLink({ children, variant = "primary", size = "md", className, ...rest }: ButtonLinkProps) {
  const external = rest.target === "_blank";
  return (
    <a
      {...rest}
      rel={external ? "noopener noreferrer" : rest.rel}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
