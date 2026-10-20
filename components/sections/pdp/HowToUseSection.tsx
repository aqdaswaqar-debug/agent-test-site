import { ShieldAlert } from "lucide-react";
import { hoverLift } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

/** 3 steps with demo clips (Figma 6969:23736 / 7133:23514). Clips play muted in view; the round button pauses/plays. */
export function HowToUseSection({ data }: { data: PdpContent["howToUse"] }) {
  return (
    <section id="how-to-use" aria-labelledby="how-title" className="scroll-mt-24 bg-(--pdp-ivory) py-8 lg:bg-white lg:py-24">
      <PdpContainer className="flex flex-col gap-6 lg:gap-14">
        <SectionHeader id="how-title" eyebrow={data.eyebrow} title={data.title} />
        <Reveal stagger>
          <ol className="grid gap-4 md:grid-cols-3 lg:gap-10">
            {data.steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal-item
                className={cn("flex flex-col gap-4 rounded-[16px] border border-(--pdp-accent) bg-white p-4 drop-shadow-[0_8px_12px_rgba(0,0,0,0.05)] lg:p-6", hoverLift)}
              >
                <div className="group relative aspect-[326/240] overflow-hidden rounded-[12px] lg:aspect-[339/240]">
                  <InViewVideo src={step.video.src} poster={step.video.poster} label={step.video.label} control="center" />
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[32px] leading-none font-bold text-(--pdp-accent-strong)">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-0.5 w-8 bg-(--pdp-accent-strong)" />
                </div>
                <h3 className="text-[18px] font-bold text-(--pdp-ink)">{step.title}</h3>
                <p className="text-[14px] leading-[1.5] text-(--pdp-body)">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <aside className="flex items-center gap-4 rounded-[12px] border border-(--pdp-accent) bg-(--pdp-tint) p-5 lg:p-6">
          <ShieldAlert aria-hidden size={24} className="shrink-0 text-(--pdp-accent-strong)" />
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-bold text-(--pdp-ink)">{data.callout.title}</p>
            <p className="text-[13px] text-(--pdp-body)">{data.callout.body}</p>
          </div>
        </aside>
      </PdpContainer>
    </section>
  );
}
