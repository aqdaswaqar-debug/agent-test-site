import { CircleCheck, FileText } from "lucide-react";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { Reveal } from "@/components/ui/Reveal";
import { tgContainer, tgSection } from "../styles";
import { PROTOCOL } from "./content";

/**
 * "Max Grow FUE+ Protocol" (Figma 200:2985 / 979:13375). Desktop: shadowed card, copy left, looping clip right.
 * Phones/tablet: no card chrome, stacked and centred, clip last. The clip (converted from the 45.8MB GIF) plays only
 * in view and has a visible pause button (WCAG 2.2.2); reduced motion stays on the poster.
 */
export function ProtocolCard() {
  return (
    <section aria-labelledby="protocol-title" className={tgSection}>
      <div className={tgContainer}>
        <Reveal className="mx-auto grid max-w-[1416px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-10 lg:rounded-[10px] lg:bg-white lg:p-4 lg:shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:gap-6 lg:py-6 lg:pl-[42px] lg:text-left xl:pl-[42px]">
            <p className="rounded-full bg-(--tg-teal) px-3 py-2 text-[14px] leading-none font-medium text-(--tg-on-teal) drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] lg:p-2.5 lg:text-[16px]">{PROTOCOL.pill}</p>
            <h2 id="protocol-title" className="text-[24px] leading-[1.4] font-semibold text-black md:text-[32px] lg:max-w-[431px] lg:text-[40px] lg:leading-[1.3]">
              {PROTOCOL.title}
            </h2>
            <p className="max-w-[627px] text-[16px] leading-[1.5] text-black lg:font-medium">{PROTOCOL.body}</p>

            <Reveal stagger className="w-full max-w-[400px] lg:max-w-none">
              <ul className="grid gap-4 text-left lg:gap-y-5 lg:pt-4 xl:grid-cols-[repeat(2,minmax(0,360px))] xl:gap-x-10 xl:gap-y-8">
                {PROTOCOL.checklist.map((item) => (
                  <li key={item} data-reveal-item className="flex items-center gap-2.5 text-[14px] font-medium text-black lg:text-[16px]">
                    <CircleCheck aria-hidden className="size-6 shrink-0 text-(--tg-teal-text) lg:size-7" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="w-full max-w-[758px]">
              <div className="flex items-center gap-3 rounded-[10px] border-2 border-(--tg-teal) bg-(--tg-tint) px-3 py-3 text-left lg:gap-5 lg:px-6 lg:py-6">
                <FileText aria-hidden className="size-7 shrink-0 text-(--tg-teal-text) lg:size-12 xl:size-[60px]" strokeWidth={1.5} />
                {/* TODO(content): link the guarantee T&Cs if a page exists (legal claim). */}
                <div className="flex flex-col gap-0.5 lg:gap-1">
                  <p className="text-[16px] leading-[1.3] font-semibold text-black lg:text-[22px] xl:text-[28px]">
                    1-Year <span className="uppercase">Written Guarantee</span>
                  </p>
                  <p className="text-[13px] leading-[1.4] text-black lg:text-[17px] xl:text-[22px]">
                    India’s <span className="uppercase">first</span> clinic to offer a written guarantee on hair transplant result.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative mx-auto aspect-[541/698] w-full max-w-[560px] overflow-hidden rounded-[10px] bg-(--tg-surface) lg:aspect-auto lg:h-full lg:min-h-[520px] lg:max-w-none">
            <InViewVideo src={PROTOCOL.video.src} poster={PROTOCOL.video.poster} label={PROTOCOL.video.label} className="object-[35%_center]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
