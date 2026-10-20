import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { CITIES, CLINIC_COUNT, CLINIC_FINDER } from "./shared-data";
import { tgContainer, tgSection } from "./styles";

/**
 * Clinic network card (Figma 18:133 / 979:12919). The India map is a decorative graphic, not a map embed
 * (no single location). Cities are plain items; one link opens the live clinic finder.
 */
export function NationwidePresence() {
  return (
    <section aria-labelledby="presence-title" className={tgSection}>
      <div className={tgContainer}>
        <Reveal className="relative isolate grid overflow-hidden rounded-[10px] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.25)] xl:grid-cols-[minmax(0,460px)_1fr] lg:p-8 xl:gap-8">
          <Image src="/images/transformation-gallery/shared/india-map.webp" alt="" width={1012} height={1128} sizes="(min-width: 1024px) 500px, 100vw" className="absolute inset-y-0 left-0 -z-10 h-full w-full object-contain opacity-20 xl:w-[460px] xl:opacity-30" />
          <div className="flex flex-col items-center gap-3 py-4 text-center xl:items-start xl:justify-center xl:py-16 xl:pl-16 xl:text-left">
            <h2 id="presence-title" className="text-[26px] leading-[1.3] font-semibold text-(--tg-ink) lg:text-[40px]">
              Nationwide
              <br /> Presence
            </h2>
            <span aria-hidden className="h-px w-[290px] max-w-full bg-(--tg-ink) lg:w-[398px]" />
            <p className="text-[16px] lg:text-[24px]">
              <CountUp value={CLINIC_COUNT} /> Clinics in <CountUp value="15+" /> Cities
            </p>
            <a href={CLINIC_FINDER} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[15px] font-semibold text-(--tg-teal-text) underline-offset-4 focus-visible:outline-2 focus-visible:outline-(--tg-teal) [@media(hover:hover)]:hover:underline">
              Find a clinic near you <ArrowUpRight aria-hidden size={16} />
            </a>
          </div>
          <Reveal stagger>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-4 md:grid-cols-3 xl:grid-flow-col xl:grid-rows-6 lg:gap-y-7 lg:py-10">
              {CITIES.map((c, i) => (
                <li key={c} data-reveal-item className={cn("flex items-center gap-3 text-[16px] lg:gap-5 lg:text-[20px] 2xl:text-[22px]", i >= 6 && "xl:border-l xl:border-(--tg-line) xl:pl-8")}>
                  <span className="flex flex-col items-center gap-1">
                    <MapPin aria-hidden className="size-5 text-(--tg-teal) lg:size-8" strokeWidth={1.75} />
                    <span aria-hidden className="h-0.5 w-5 rounded-full bg-(--tg-teal) lg:w-8" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
