import Image from "next/image";
import Link from "next/link";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "../styles";
import { AUDIENCE, AUDIENCE_TITLE, type Audience } from "./content";

function AudienceTile({ item }: { item: Audience }) {
  const body = (
    <span className="relative block aspect-square overflow-hidden rounded-[10px] bg-(--tg-surface)">
      <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 300px, 46vw" className={cn("object-cover", hoverZoom)} />
      <span className="absolute inset-x-0 bottom-0 flex min-h-12 items-center justify-center bg-(--tg-teal) px-2 py-1.5 text-center text-[13px] leading-[1.3] font-medium text-(--tg-on-teal) sm:text-[14px] lg:min-h-[58px] lg:px-3 lg:text-[18px]">
        {item.label}
      </span>
    </span>
  );
  const card = cn("group block rounded-[10px]", hoverLift);
  return item.href ? (
    <Link href={item.href} className={cn(card, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal-text)")}>
      {body}
    </Link>
  ) : (
    <div className={card}>{body}</div>
  );
}

/** "Who it is for?" (Figma 204:4972 / 979:14447): six audience tiles, 2-up on phones, 3-up from md. Tile 6 jumps to Symbiosis. */
export function WhoItIsFor() {
  return (
    <section aria-labelledby="who-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col items-center gap-6 lg:gap-10")}>
        <h2 id="who-title" className={cn(tgH2, "lg:uppercase")}>
          {AUDIENCE_TITLE}
        </h2>
        <Reveal stagger className="w-full max-w-[940px]">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
            {AUDIENCE.map((item) => (
              <li key={item.label} data-reveal-item>
                <AudienceTile item={item} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
