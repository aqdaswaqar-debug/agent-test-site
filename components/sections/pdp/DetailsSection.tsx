import { hoverLift } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { InViewVideo } from "./InViewVideo";
import { PdpContainer } from "./PdpSection";
import type { PdpContent } from "./types";

/** Spec sheet beside the 360° bottle video (Figma 7069:6068 / 7197:643). */
export function DetailsSection({ data }: { data: PdpContent["details"] }) {
  return (
    <section aria-labelledby="details-title" className="border-y border-(--pdp-line-cool)/50 bg-white py-6 lg:py-24">
      <PdpContainer className="flex flex-col gap-8">
        <h2 id="details-title" className="text-[24px] font-semibold tracking-[-0.025em] text-(--pdp-charcoal) max-lg:sr-only lg:text-[36px]">
          {data.title}
        </h2>
        <div className="flex flex-col gap-6 rounded-[24px] border border-(--pdp-accent) bg-(--pdp-tint-soft) px-4 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)] lg:flex-row lg:items-start lg:gap-12 lg:rounded-[16px] lg:p-8 lg:shadow-none">
          <div className={cn("group rounded-[20px] lg:w-1/2 lg:rounded-[14px]", hoverLift)}>
            <div className="relative aspect-[326/436] overflow-hidden rounded-[inherit] border border-(--pdp-line-cool) bg-(--pdp-studio) lg:aspect-[502/600] lg:border-0">
              <InViewVideo src={data.video.src} poster={data.video.poster} label={data.video.label} />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:w-1/2 lg:gap-10">
            <dl className="grid gap-6 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-8">
              {data.specs.map((s) => (
                <div key={s.label} className="flex flex-col gap-2">
                  <dt className="text-[18px] font-semibold tracking-[-0.025em] text-(--pdp-ink-warm)">{s.label}</dt>
                  <dd className="text-[16px] leading-6 text-(--pdp-meta)">{s.value}</dd>
                </div>
              ))}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <dt className="text-[18px] font-semibold tracking-[-0.025em] text-(--pdp-ink-warm)">Suitable For</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {data.suitableFor.map((item) => (
                      <li key={item} className="rounded-full border border-(--pdp-line-cool) bg-white px-3 py-1.5 text-[14px] text-(--pdp-meta) shadow-[0_1px_1.5px_rgba(0,0,0,0.1)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <dt className="text-[18px] font-semibold tracking-[-0.025em] text-(--pdp-ink-warm)">Key Ingredients</dt>
                <dd className="text-[16px] leading-6 text-(--pdp-meta)">{data.keyIngredients.join(" · ")}</dd>
              </div>
            </dl>
            <div className="flex flex-col gap-3 border-t border-(--pdp-line-soft) pt-6">
              <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-(--pdp-ink-warm)">{data.overviewTitle}</h3>
              <p className="text-[16px] leading-[26px] text-(--pdp-meta)">{data.overview}</p>
            </div>
          </div>
        </div>
      </PdpContainer>
    </section>
  );
}
