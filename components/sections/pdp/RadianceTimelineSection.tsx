import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

/** Week 1 → 6 expectations (Figma 6969:23929 / 7205:4). The track fills to its level when it scrolls in. */
export function RadianceTimelineSection({ data }: { data: PdpContent["radianceTimeline"] }) {
  return (
    <section
      aria-labelledby="timeline-title"
      className="bg-[linear-gradient(249deg,#fdf0eb_25%,#faf6f2_75%)] py-8 lg:bg-[linear-gradient(204deg,#fdf0eb_25%,#faf6f2_75%)] lg:py-24"
    >
      <PdpContainer className="flex flex-col gap-6 lg:gap-14">
        <SectionHeader id="timeline-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} />

        <Reveal stagger className="flex flex-col gap-4 lg:gap-10">
          {/* Track: 71% on desktop, 67% on mobile as drawn (W6 still "to come"). */}
          <div className="flex flex-col gap-3 lg:px-[100px]">
            <div
              role="img"
              aria-label="Progress through the 6-week timeline"
              className="h-1.5 overflow-hidden rounded-full bg-(--pdp-line)"
            >
              <div className="ui-bar h-full w-[67%] origin-left rounded-full bg-(--pdp-accent-strong) lg:w-[71%]" />
            </div>
            <div className="flex justify-between text-[12px] font-bold text-(--pdp-accent-strong) lg:hidden">
              <span>Week 1</span>
              <span>Week 6</span>
            </div>
          </div>

          <ol className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-16">
            {data.milestones.map((m) => (
              <li
                key={m.node}
                data-reveal-item
                className="flex flex-col gap-3 rounded-[12px] border border-(--pdp-line) bg-white p-4 lg:flex-1 lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center"
              >
                <div className="flex items-center justify-between lg:justify-center">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-[12px] font-bold lg:size-9 lg:text-[14px]",
                      m.reached ? "bg-(--pdp-accent-strong) text-white" : "bg-(--pdp-line) text-(--pdp-body)",
                    )}
                  >
                    {m.node}
                  </span>
                  <span className={cn("text-[11px] font-bold tracking-[0.06em] uppercase lg:hidden", m.reached ? "text-(--pdp-accent-strong)" : "text-(--pdp-body)")}>{m.tag}</span>
                </div>
                <div className="flex flex-col gap-1 lg:gap-1.5">
                  <h3 className="text-[18px] font-bold text-(--pdp-ink)">{m.title}</h3>
                  <p className="text-[14px] leading-[1.4] text-(--pdp-body)">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="text-center text-[12px] text-(--pdp-subtle) italic">{data.note}</p>
      </PdpContainer>
    </section>
  );
}
