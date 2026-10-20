import Image from "next/image";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { cn } from "@/lib/utils";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

type Item = PdpContent["benefits"]["items"][number];

function Benefit({ item, n }: { item: Item; n: number }) {
  return (
    <li data-reveal-item className="flex gap-4 rounded-[12px] bg-(--pdp-ivory) p-3 lg:flex-col lg:gap-2 lg:bg-transparent lg:p-0">
      <div className="flex items-center gap-3">
        <span className="text-[22px] leading-none font-bold text-(--pdp-accent-strong) lg:text-[46px] lg:font-semibold">{String(n).padStart(2, "0")}</span>
        <h3 className="hidden text-[20px] font-bold text-(--pdp-ink) lg:block">{item.title}</h3>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[14px] font-bold text-(--pdp-ink) lg:hidden">{item.mobileTitle}</h3>
        <p className="text-[12px] text-(--pdp-slate) lg:text-[16px] lg:leading-[1.5] lg:font-medium lg:text-(--pdp-body)">
          <ResponsiveText desktop={item.body} mobile={item.mobileBody} />
        </p>
      </div>
    </li>
  );
}

/** "6 Ways" benefits around a centre image over a looping bubbles video (Figma 6969:23527 / 7133:23425). */
export function BenefitsSection({ data }: { data: PdpContent["benefits"] }) {
  const left = data.items.slice(0, 3);
  const right = data.items.slice(3);
  const visual = (
    <div className={cn("group w-full rounded-[22px] shadow-[0_24px_48px_-24px_rgba(28,28,28,0.35)] lg:w-[380px] lg:shrink-0 lg:rounded-[24px]", hoverLift)}>
      <div className="relative aspect-[358/588] overflow-hidden rounded-[inherit] lg:aspect-[380/624]">
        <Image src={data.image.src} alt={data.image.alt} fill sizes="(min-width: 1024px) 380px, 100vw" className={cn("object-cover", hoverZoom)} />
      </div>
    </div>
  );

  return (
    <section aria-labelledby="benefits-title" className="relative isolate overflow-hidden py-8 lg:py-20">
      <div className="absolute inset-0">
        <InViewVideo src={data.video.src} poster={data.video.poster} buttonClassName="z-20" />
        <div aria-hidden className="absolute inset-0 bg-[rgb(250_246_240/0.35)]" />
      </div>
      <PdpContainer className="relative flex flex-col items-center gap-6 lg:gap-14">
        <SectionHeader id="benefits-title" eyebrow={data.eyebrow} title={<ResponsiveText desktop={data.title} mobile={data.mobileTitle} />} titleClassName="lg:font-semibold" />

        {/* Mobile: 3 cards, image, 3 cards. Desktop: left column, centre image, right column. */}
        <Reveal stagger className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-12">
          <ol className="flex flex-col gap-4 lg:flex-1 lg:gap-8">
            {left.map((item, i) => (
              <Benefit key={item.title} item={item} n={i + 1} />
            ))}
          </ol>
          {visual}
          <ol start={4} className="flex flex-col gap-4 lg:flex-1 lg:gap-8">
            {right.map((item, i) => (
              <Benefit key={item.title} item={item} n={i + 4} />
            ))}
          </ol>
        </Reveal>
      </PdpContainer>
    </section>
  );
}
