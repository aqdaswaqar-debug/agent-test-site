import Image from "next/image";
import { Droplets, ShieldCheck, Sun } from "lucide-react";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

/** AM routine with the serum as the core step (Figma 6969:23764 / 7201:4). Figma's iOS status icons are replaced with meaningful ones. */
export function MorningRoutineSection({ data }: { data: PdpContent["morningRoutine"] }) {
  return (
    <section aria-labelledby="morning-title" className="relative isolate overflow-hidden bg-(--pdp-dawn) py-8 lg:py-20">
      {/* Orange-slice "C": full bleed on desktop, oversized bottom-right corner on mobile (Figma). */}
      <div aria-hidden className="absolute right-0 bottom-0 -z-10 h-[38%] w-[180%] opacity-30 lg:inset-0 lg:h-full lg:w-full">
        <Image src={data.background.src} alt="" fill sizes="(min-width: 1024px) 100vw, 180vw" className="object-cover object-right lg:object-center" />
      </div>
      <PdpContainer className="flex flex-col gap-6 lg:gap-14">
        <SectionHeader id="morning-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} mobileAlign="left" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-12">
          <div className={cn("group w-full rounded-[28px] lg:w-[370px] lg:shrink-0 lg:rounded-[24px]", hoverLift)}>
            <div className="relative flex aspect-[358/506] items-end overflow-hidden rounded-[inherit] border-[5px] border-(--pdp-accent) p-6 lg:aspect-[370/516] lg:border-[3px] lg:p-8">
              <Image src={data.image.src} alt={data.image.alt} fill sizes="(min-width: 1024px) 370px, 100vw" className={cn("object-cover", hoverZoom)} />
              <div aria-hidden className="absolute inset-0 bg-[rgb(28_28_28/0.15)]" />
              <p className="ui-float-slow relative flex flex-1 items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-[14px] font-bold text-(--pdp-accent-strong) lg:flex-none lg:text-[12px]">
                <ShieldCheck aria-hidden size={18} />
                {data.badge}
              </p>
            </div>
          </div>

          <Reveal stagger className="flex-1">
            <ol className="flex flex-col gap-3 lg:gap-6">
              {data.steps.map((step, i) =>
                step.core ? (
                  <li key={step.name} data-reveal-item className="flex items-center gap-3 rounded-[14px] border-2 border-(--pdp-accent) bg-(--pdp-tint) p-3 lg:gap-4 lg:rounded-[16px] lg:p-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--pdp-accent-strong) text-white lg:size-10">
                      <Droplets aria-hidden size={18} />
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[11px] font-bold tracking-[0.04em] text-(--pdp-accent-strong) uppercase">{step.label}</span>
                      <span className="text-[18px] font-bold text-black">
                        <span className="sr-only">Step {i + 1}, core step: </span>
                        {step.name}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-[4px] bg-(--pdp-accent-strong) px-2.5 py-1 text-[11px] font-bold text-white">CORE STEP</span>
                  </li>
                ) : (
                  <li
                    key={step.name}
                    data-reveal-item
                    className="flex items-center gap-3 rounded-[12px] border border-[#4a5565]/60 bg-white p-3 transition-[translate] duration-200 motion-safe:[@media(hover:hover)]:hover:translate-x-1 lg:gap-4 lg:p-4"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--pdp-cream) text-[14px] font-bold text-(--pdp-accent-strong) lg:size-10 lg:text-[16px]">
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-bold tracking-[0.04em] text-(--pdp-accent-strong) uppercase">{step.label}</span>
                      <span className="text-[16px] font-bold text-(--pdp-ink)">{step.name}</span>
                    </span>
                  </li>
                ),
              )}
            </ol>
          </Reveal>
        </div>

        <p className="flex items-start gap-2 text-[14px] leading-[1.5] font-semibold text-(--pdp-body) lg:items-center lg:justify-center lg:text-[13px]">
          <Sun aria-hidden size={16} className="mt-0.5 shrink-0 text-(--pdp-accent-strong) lg:mt-0" />
          {data.note}
        </p>
      </PdpContainer>
    </section>
  );
}
