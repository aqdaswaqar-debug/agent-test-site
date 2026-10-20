import Image from "next/image";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { Media, PdpContent } from "./types";

/**
 * Two photo cards, as in Figma. A drag-to-compare slider needs aligned photos (same pose and framing);
 * these two differ, so a slider would look broken. Switch to a slider once aligned result photos exist.
 */
function PhotoCard({ image, label, caption, highlight }: { image: Media; label: string; caption: string; highlight?: boolean }) {
  return (
    <figure
      data-reveal-item
      className={cn(
        "group flex flex-1 flex-col gap-3 rounded-[12px] border bg-white p-3 drop-shadow-[0_6px_9px_rgba(0,0,0,0.05)] lg:rounded-[16px] lg:p-4",
        highlight ? "border-(--pdp-peach-deep)" : "border-(--pdp-line)",
        hoverLift,
      )}
    >
      <div className="relative aspect-[334/160] overflow-hidden rounded-[8px] lg:aspect-[616/320] lg:rounded-[12px]">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className={cn("object-cover lg:object-top", hoverZoom)} />
      </div>
      <figcaption className="flex flex-col gap-1">
        <span className="text-[14px] font-bold text-(--pdp-ink)">{label}</span>
        <span className="text-[12px] leading-[1.4] text-(--pdp-body)">{caption}</span>
      </figcaption>
    </figure>
  );
}

/** Before/after + 2/4/6-week checkpoints (Figma 6969:23708 / 7133:23481). */
export function ResultsSection({ data }: { data: PdpContent["results"] }) {
  return (
    <section aria-labelledby="results-title" className="bg-white py-8 lg:bg-(--pdp-cream) lg:py-24">
      <PdpContainer className="flex flex-col items-center gap-6 lg:gap-14">
        <SectionHeader id="results-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} />

        <div className="flex w-full max-w-[1100px] flex-col gap-4">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-[12px] font-bold tracking-[0.06em] text-(--pdp-accent-strong) uppercase lg:text-[13px]">{data.compare.eyebrow}</p>
            <h3 className="text-[18px] font-semibold text-(--pdp-ink) lg:text-[16px]">{data.compare.title}</h3>
            <p className="text-[14px] leading-[1.4] text-(--pdp-body) lg:text-[13px]">{data.compare.body}</p>
          </div>
          <Reveal stagger className="flex flex-col gap-3 lg:flex-row lg:gap-5">
            <PhotoCard image={data.compare.before} label={data.compare.beforeLabel} caption={data.compare.beforeCaption} />
            <PhotoCard image={data.compare.after} label={data.compare.afterLabel} caption={data.compare.afterCaption} highlight />
          </Reveal>
        </div>

        {/* Timeline: dashed line runs through the dots and draws in; mobile becomes numbered cards. */}
        <Reveal stagger className="relative w-full max-w-[1100px]">
          <div aria-hidden className="absolute top-3 right-[16.66%] left-[16.66%] hidden h-px lg:block">
            <div className="ui-bar h-full origin-left border-t border-dashed border-(--pdp-accent)" />
          </div>
          <ol className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-0">
            {data.checkpoints.map((c, i) => (
              <li
                key={c.week}
                data-reveal-item
                className="flex flex-col gap-3 rounded-[12px] border border-(--pdp-line) bg-white p-4 lg:w-1/3 lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center"
              >
                <div className="flex items-center justify-between lg:flex-col lg:gap-4">
                  <span className="relative grid size-6 place-items-center rounded-full border-4 border-white bg-(--pdp-accent-strong) text-[11px] font-bold text-white shadow-[0_0_0_1px_var(--pdp-peach)] lg:size-6">
                    <span className="lg:hidden">{i + 1}</span>
                  </span>
                  <span className="text-[16px] font-bold text-(--pdp-accent-strong) lg:text-[18px]">{c.week}</span>
                </div>
                <p className="text-[14px] font-semibold text-(--pdp-ink)">{c.title}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="text-center text-[12px] text-(--pdp-subtle) italic">{data.note}</p>
      </PdpContainer>
    </section>
  );
}
