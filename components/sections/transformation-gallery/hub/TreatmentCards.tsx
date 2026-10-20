import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { CATEGORIES, galleryUrl } from "../shared-data";
import { tgContainer, tgH2, tgSection } from "../styles";

type TreatmentCardsProps = {
  /** Leave out the current page's category ("Explore more" row on a treatment page). */
  exclude?: string;
  title?: string;
};

/**
 * "Witness The Transformation" (Figma 191:181): the hub's navigation to the 5 treatment galleries (3 + 2 centred).
 * Treatment pages reuse it with `exclude` as a 4-up "explore more" row, so every page links to the others.
 */
export function TreatmentCards({ exclude, title = "Witness The Transformation" }: TreatmentCardsProps) {
  const items = CATEGORIES.filter((c) => c.slug !== exclude);
  const four = items.length === 4;
  return (
    <section aria-labelledby="treatments-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col gap-8 lg:gap-16")}>
        <h2 id="treatments-title" className={tgH2}>
          {title}
        </h2>
        <Reveal stagger>
          <ul className={cn("mx-auto flex max-w-[1330px] flex-wrap justify-center gap-x-6 gap-y-8 lg:gap-x-16 lg:gap-y-16", four && "lg:gap-x-8")}>
            {items.map((c) => (
              <li key={c.slug} data-reveal-item className={cn("w-full max-w-[400px] sm:w-[calc((100%-24px)/2)]", four ? "lg:w-[calc((100%-96px)/4)]" : "lg:w-[calc((100%-128px)/3)]")}>
                <Link
                  href={galleryUrl(c.slug)}
                  className="group flex flex-col items-center gap-4 rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--tg-teal-text) lg:gap-7"
                >
                  <span className={cn("block w-full rounded-[12px]", hoverLift)}>
                    <span className="relative block aspect-square overflow-hidden rounded-[12px]">
                      <Image src={c.card.src} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className={cn("object-cover", hoverZoom)} />
                    </span>
                  </span>
                  <h3 className="flex items-center gap-2 text-[20px] font-medium text-(--tg-ink) transition-colors group-hover:text-(--tg-teal-text) lg:text-[28px]">
                    {c.label}
                    <ArrowRight aria-hidden className="size-5 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:size-6" />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
