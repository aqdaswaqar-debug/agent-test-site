import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { PdpContent } from "./types";

/** Clinic-backed authority (Figma 6969:23965 / 7197:573). Numbers count up as they scroll in. */
export function AuthoritySection({ data }: { data: PdpContent["authority"] }) {
  const image = (
    <div className={cn("group rounded-[12px] lg:w-[580px] lg:shrink-0 lg:rounded-[20px]", hoverLift)}>
      <div className="relative aspect-[350/200] overflow-hidden rounded-[inherit] lg:aspect-[580/480] lg:border-l-[10px] lg:border-(--pdp-accent)">
        <Image src={data.image.src} alt={data.image.alt} fill sizes="(min-width: 1024px) 580px, 100vw" className={cn("object-cover object-[center_55%]", hoverZoom)} />
      </div>
    </div>
  );

  return (
    <section aria-labelledby="authority-title" className="bg-white py-10 lg:border-y lg:border-(--pdp-line) lg:bg-(--pdp-cream) lg:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 md:px-8 lg:flex-row lg:items-center lg:gap-20 xl:px-[100px]">
        <div className="hidden lg:block">{image}</div>
        <div className="flex flex-1 flex-col gap-6 lg:gap-10">
          <div className="flex flex-col gap-1.5 lg:gap-4">
            <p className="text-[12px] font-bold tracking-[0.08em] text-(--pdp-accent-strong) uppercase lg:text-[13px]">{data.eyebrow}</p>
            <h2 id="authority-title" className="text-[24px] leading-[1.2] font-bold text-(--pdp-ink) lg:text-[38px]">
              {data.title}
            </h2>
          </div>
          <div className="lg:hidden">{image}</div>
          <p className="text-[15px] leading-[1.6] text-(--pdp-body)">{data.body}</p>
          <Reveal stagger>
            <dl className="grid grid-cols-2 gap-3 lg:gap-6">
              {data.stats.map((s) => (
                <div
                  key={s.value}
                  data-reveal-item
                  className={cn("flex flex-col items-center justify-center gap-1 rounded-[12px] border border-(--pdp-accent) bg-(--pdp-paper) p-4 text-center lg:min-h-[100px] lg:rounded-[10px] lg:bg-white", hoverLift)}
                >
                  <dt className="order-2 text-[12px] text-(--pdp-meta) lg:text-[14px] lg:font-semibold lg:text-(--pdp-ink)">{s.label}</dt>
                  <dd className="order-1 text-[16px] font-bold text-(--pdp-accent-strong) lg:text-[30px]">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
