import Image from "next/image";
import { hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { tgContainer, tgSection } from "../styles";
import { SYMBIOSIS } from "./content";

/** Symbiosis Technique feature card (Figma 203:4209 / 979:14518): copy left, photo right; stacked, centred copy on phones. */
export function Symbiosis() {
  const s = SYMBIOSIS;
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={cn(tgSection, "scroll-mt-28")}>
      <div className={tgContainer}>
        <Reveal>
          <article className="group grid gap-6 rounded-[22px] bg-white p-3 shadow-[0_0_12.5px_rgb(0_0_0/0.25)] sm:p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,541px)] lg:gap-8 lg:rounded-[10px] lg:shadow-[0_4px_20px_rgb(0_0_0/0.25)]">
            <div className="flex flex-col items-center gap-5 px-2 pt-6 text-center text-[16px] leading-[1.5] text-(--tg-ink) lg:items-start lg:justify-center lg:py-14 lg:pl-10 lg:text-left xl:py-20 xl:pl-12">
              <h2 id={`${s.id}-title`} className="text-[24px] leading-[1.4] font-semibold md:text-[32px] lg:text-[40px] lg:leading-[1.3]">
                {s.title}
              </h2>
              <p className="rounded-full border border-(--tg-teal) bg-(--tg-tint) px-3 py-2 text-[14px] leading-[1.4] font-medium lg:text-[16px]">{s.chip}</p>
              <p className="max-w-[520px] font-medium">
                {s.body}
                <strong className="mt-1 block font-bold text-(--tg-teal-text)">{s.accent}</strong>
              </p>
              <div className="flex w-full flex-col items-center gap-3 lg:items-start">
                <h3 className="text-[18px] font-bold">{s.madeForTitle}</h3>
                <ul className="flex max-w-[560px] list-disc flex-col gap-3 pl-5 text-left marker:text-(--tg-teal)">
                  {s.madeFor.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <p className="max-w-[640px]">{s.closing}</p>
              <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1 rounded-[10px] border-2 border-(--tg-teal) bg-(--tg-tint) px-4 py-3 text-[15px] leading-[1.5] text-(--tg-ink) lg:justify-between lg:gap-x-4 lg:px-5 lg:text-[18px] lg:font-semibold xl:text-[20px] 2xl:text-[22px]">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-current lg:size-2" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[541/698] w-full overflow-hidden rounded-[8px] bg-(--tg-surface) lg:rounded-[10px]">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 541px, 92vw" className={cn("object-cover", hoverZoom)} />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
