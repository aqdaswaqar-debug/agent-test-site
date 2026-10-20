import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "sm";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-[12px] font-medium leading-[1.65] whitespace-nowrap " +
  "transition-[background-color,border-color,transform,scale] duration-150 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 " +
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

/** arrow = go somewhere on/off the page, external = opens a new tab, phone = tel: link. */
type Icon = "arrow" | "external" | "phone" | "none";

const ICONS = { arrow: ArrowRight, external: ArrowUpRight, phone: Phone } as const;

// Icon nudges in its own direction on hover (transform only).
// Named group so a button inside a hoverable card only reacts to its own hover/focus.
const iconMotion: Record<Exclude<Icon, "none">, string> = {
  arrow: "motion-safe:[@media(hover:hover)]:group-hover/btn:translate-x-1 motion-safe:group-focus-visible/btn:translate-x-1",
  external:
    "motion-safe:[@media(hover:hover)]:group-hover/btn:translate-x-0.5 motion-safe:[@media(hover:hover)]:group-hover/btn:-translate-y-0.5 " +
    "motion-safe:group-focus-visible/btn:translate-x-0.5 motion-safe:group-focus-visible/btn:-translate-y-0.5",
  phone: "motion-safe:[@media(hover:hover)]:group-hover/btn:-rotate-12 motion-safe:group-focus-visible/btn:-rotate-12",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
};

/** Anchor styled as a button: used for in-page jumps, tel: links and external links. */
export function ButtonLink({ children, variant = "primary", size = "md", icon = "none", className, ...rest }: ButtonLinkProps) {
  const external = rest.target === "_blank";
  const IconComponent = icon === "none" ? null : ICONS[icon];
  const leading = icon === "phone"; // phone sits before the label, arrows after it
  const iconEl =
    icon === "none" || !IconComponent ? null : (
      <IconComponent
        aria-hidden
        size={leading ? 16 : 18}
        strokeWidth={2}
        className={cn("shrink-0 transition-[translate,rotate] duration-200 ease-out", iconMotion[icon])}
      />
    );
  return (
    <a
      {...rest}
      rel={external ? "noopener noreferrer" : rest.rel}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {leading ? iconEl : null}
      {children}
      {leading ? null : iconEl}
    </a>
  );
}
