import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { hoverLift } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

/** 4-stage active pathway (Figma 6969:23660 / 7138:19): cards with connectors, revealed in sequence. */
export function FormulaSection({ data }: { data: PdpContent["formula"] }) {
  return (
    <section aria-labelledby="formula-title" className="bg-white py-8 lg:py-24">
      <PdpContainer className="flex flex-col gap-5 lg:gap-14">
        <SectionHeader id="formula-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
        <Reveal stagger>
          <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-4">
            {data.stages.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 ? (
                  <li aria-hidden data-reveal-item className="grid shrink-0 place-items-center text-(--pdp-peach) lg:w-6">
                    <ArrowDown size={18} className="lg:hidden" />
                    <ArrowRight size={18} className="hidden lg:block" />
                  </li>
                ) : null}
                <li data-reveal-item className={cn("flex flex-1 flex-col gap-3 rounded-[14px] border border-(--pdp-accent) bg-(--pdp-blush) p-4 lg:gap-4 lg:rounded-[16px] lg:p-6", hoverLift)}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-bold text-(--pdp-accent-strong)">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[11px] font-bold tracking-[0.06em] text-(--pdp-accent-strong) uppercase">{s.label}</span>
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <h3 className="text-[16px] font-bold text-(--pdp-ink) lg:text-[18px]">{s.active}</h3>
                    {s.secondary ? <p className="text-[12px] font-semibold text-(--pdp-subtle)">{s.secondary}</p> : null}
                  </div>
                  <p className="text-[13px] leading-5 text-(--pdp-body) lg:leading-[1.5]">{s.body}</p>
                </li>
              </Fragment>
            ))}
          </ol>
        </Reveal>
      </PdpContainer>
    </section>
  );
}
