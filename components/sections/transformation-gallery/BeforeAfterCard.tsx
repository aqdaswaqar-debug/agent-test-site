import Image from "next/image";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import type { ResultPair } from "./types";

/**
 * One result: before and after photos side by side with a teal label bar (Figma ResultPairCard, 427 × 450).
 * The card does not clip (hover shadow on ::after); the inner frame clips the photos.
 */
export function BeforeAfterCard({ pair, caption, className }: { pair: ResultPair; caption: string; className?: string }) {
  return (
    <figure className={cn("group rounded-[10px] bg-white", hoverLift, className)}>
      <div className="overflow-hidden rounded-[10px] border-2 border-(--tg-teal)">
        <div className="grid grid-cols-2 gap-0.5 bg-(--tg-teal)">
          {[pair.before, pair.after].map((src, i) => (
            <div key={src} className="relative aspect-[211/396] overflow-hidden bg-(--tg-surface)">
              <Image
                src={src}
                alt={`${pair.alt}, ${i === 0 ? "before" : "after"} treatment`}
                fill
                sizes="(min-width: 1024px) 211px, (min-width: 768px) 22vw, 42vw"
                className={cn("object-cover", hoverZoom)}
              />
            </div>
          ))}
        </div>
        <div aria-hidden className="grid h-10 grid-cols-2 items-center bg-(--tg-teal) text-center text-[18px] font-medium text-(--tg-on-teal) lg:h-[52px] lg:text-[24px]">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
