import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "../styles";
import { WHO_CARDS, WHO_TITLE } from "./content";

/** "Who it is for?" (Figma 200:4100): six 300px concern tiles, 3 × 2 from md, stacked on phones. Not links. */
export function WhoItIsFor() {
  return (
    <section aria-labelledby="who-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col items-center gap-6 lg:gap-8")}>
        <h2 id="who-title" className={cn(tgH2, "uppercase")}>
          {WHO_TITLE}
        </h2>
        <Reveal stagger className="w-full">
          <ul className="mx-auto grid max-w-[944px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-y-8">
            {WHO_CARDS.map((c) => (
              <li key={c.image.src} data-reveal-item className="w-full max-w-[300px]">
                <figure className={cn("group relative rounded-[10px] bg-white", hoverLift)}>
                  {/* Frame clips the photo; the card itself does not clip, so its hover shadow shows. */}
                  <div className="relative aspect-square overflow-hidden rounded-[10px] bg-(--tg-surface)">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width: 768px) 300px, (min-width: 640px) 45vw, 300px"
                      className={cn("object-cover object-top", hoverZoom)}
                    />
                    <span aria-hidden className="absolute inset-0 bg-black/20" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex rounded-b-[10px] min-h-[58px] flex-col items-center justify-center bg-(--tg-teal) px-3 py-1.5 text-center text-[16px] leading-[1.3] font-medium text-(--tg-on-teal) lg:text-[18px]">
                      {c.label.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
