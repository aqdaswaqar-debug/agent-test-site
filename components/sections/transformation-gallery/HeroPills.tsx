import { cn } from "@/lib/utils";

type HeroPillsProps = {
  items: string[];
  /** "solid": Hair Replacement pills (teal 30%, dark-teal border, SemiBold 16). "outline": Hair Loss chips (teal 10%, teal border, Regular 14). */
  variant?: "solid" | "outline";
  className?: string;
};

/** Short USP pills on the photo heroes (stacked and centred on phones, one row from md). Pill dot is a CSS circle. */
export function HeroPills({ items, variant = "solid", className }: HeroPillsProps) {
  return (
    <ul className={cn("flex flex-col items-center gap-2 md:flex-row md:flex-wrap md:justify-center lg:justify-start", variant === "outline" && "gap-3 md:gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-white",
            variant === "solid"
              ? "border-(--tg-teal-deep) bg-[rgb(20_184_166/0.3)] text-[14px] font-semibold lg:text-[15px] xl:text-[16px]"
              : "min-h-8 border-(--tg-teal) bg-(--tg-tint) text-[14px] font-normal",
          )}
        >
          <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-(--tg-teal)" />
          {item}
        </li>
      ))}
    </ul>
  );
}
