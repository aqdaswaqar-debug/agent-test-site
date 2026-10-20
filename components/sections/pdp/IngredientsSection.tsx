"use client";

import useEmblaCarousel from "embla-carousel-react";
import { hoverLift } from "@/components/ui/motion";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { cn } from "@/lib/utils";
import { Dots, useEmblaDots } from "./controls";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

/** Hero active + 4 supporting actives (Figma 6969:23565 / 7133:23460). Supporting cards swipe on mobile, grid on desktop. */
export function IngredientsSection({ data }: { data: PdpContent["ingredients"] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", breakpoints: { "(min-width: 1024px)": { active: false } } });
  const { selected, count, scrollTo } = useEmblaDots(embla);

  return (
    <section id="ingredients" aria-labelledby="ingredients-title" className="scroll-mt-24 bg-(--pdp-ivory) py-8 lg:bg-white lg:py-24">
      <PdpContainer className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader id="ingredients-title" eyebrow={data.eyebrow} title={<ResponsiveText desktop={data.title} mobile={data.mobileTitle} />} mobileAlign="left" />

        {/* Hero active */}
        <article className="flex flex-col gap-4 rounded-[16px] border-[1.5px] border-(--pdp-accent) bg-white p-4 lg:flex-row lg:items-center lg:gap-12 lg:rounded-[20px] lg:border lg:bg-(--pdp-tint) lg:p-8">
          <div className="relative aspect-[326/180] w-full overflow-hidden rounded-[10px] border-l-[3px] border-(--pdp-accent) lg:aspect-auto lg:h-[468px] lg:w-[609px] lg:shrink-0 lg:rounded-[12px] lg:border-l-8">
            <InViewVideo src={data.hero.video.src} poster={data.hero.video.poster} label="" />
          </div>
          <div className="flex flex-col gap-2 lg:gap-4">
            <span className="w-fit rounded-[4px] bg-(--pdp-accent-strong) px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white uppercase lg:rounded-full lg:px-2.5 lg:py-1 lg:text-[12px]">
              {data.hero.badge}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] font-bold tracking-[0.02em] text-(--pdp-ink) uppercase lg:text-[28px]">{data.hero.name}</h3>
              <p className="hidden text-[14px] font-semibold text-(--pdp-accent-strong) lg:block">{data.hero.subtitle}</p>
            </div>
            <p className="text-[15px] leading-[1.5] text-(--pdp-body) lg:text-[15px] lg:leading-[1.6]">{data.hero.body}</p>
          </div>
        </article>

        {/* Supporting actives */}
        <div className="flex flex-col gap-4">
          <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 lg:mx-0 lg:overflow-visible lg:px-0">
            <ul className="flex gap-3 lg:grid lg:grid-cols-4 lg:gap-5">
              {data.supporting.map((s) => (
                <li
                  key={s.name}
                  className={cn(
                    "flex min-w-0 flex-[0_0_280px] flex-col gap-1 rounded-[12px] border border-(--pdp-line-soft) bg-white p-4 lg:gap-3.5 lg:rounded-[16px] lg:border-(--pdp-accent) lg:p-6",
                    hoverLift,
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[13px] font-bold tracking-[0.02em] text-(--pdp-ink) uppercase lg:text-[16px]">{s.name}</h3>
                    <p className="text-[11px] font-semibold tracking-[0.04em] text-(--pdp-accent-strong) uppercase lg:text-[12px]">
                      <ResponsiveText desktop={s.role} mobile={s.mobileRole} />
                    </p>
                  </div>
                  <p className="text-[12px] leading-[1.4] text-(--pdp-body) lg:text-[13px] lg:leading-[1.5]">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Dots count={count} selected={selected} onSelect={scrollTo} label="Ingredient" className="lg:hidden" />
        </div>
      </PdpContainer>
    </section>
  );
}
