import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import type { LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["medicalDirector"] };

export function MedicalDirectorSection({ data }: Props) {
  return (
    <section aria-labelledby="director-title" className="bg-white py-11 lg:py-24">
      <Container className="flex flex-col gap-4 lg:gap-16">
        <div className="flex flex-col gap-3 lg:items-center lg:gap-4 lg:text-center">
          <p className="w-fit text-[11px] leading-[1.6] font-semibold tracking-[0.1em] text-(--ls-mint-text) uppercase lg:rounded-full lg:border lg:border-(--ls-mint)/30 lg:bg-(--ls-mint-soft) lg:px-4 lg:py-1.5 lg:text-[12px] lg:leading-4">
            {data.eyebrow}
          </p>
          <SectionTitle id="director-title" className="lg:leading-[48px]">
            {data.title}
          </SectionTitle>
        </div>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              {/* Card lifts with a deeper shadow on hover; the badge rides along and drifts slowly. */}
              <div
                className={cn(
                  "group rounded-[16px] bg-(--ls-mint-soft) lg:rounded-[34px] lg:shadow-[0_28px_36px_-7px_rgba(0,0,0,0.1),0_11px_14px_-8px_rgba(0,0,0,0.1)]",
                  hoverLift,
                )}
              >
                <figure className="relative overflow-hidden rounded-[inherit]">
                  <div className="relative h-[200px] overflow-hidden md:h-[320px] lg:h-[365px]">
                    <Image
                      src={data.image.src}
                      alt={data.image.alt}
                      fill
                      sizes="(min-width: 1024px) 560px, calc(100vw - 48px)"
                      className={cn("object-cover object-[50%_32%]", hoverZoom)}
                    />
                  </div>
                  <figcaption className="flex flex-col gap-0.5 px-4 py-4 lg:px-6 lg:pt-8 lg:pb-8">
                    <span className="text-[18px] leading-[1.5] font-semibold text-(--ls-ink) lg:text-[22px] lg:leading-8">{data.name}</span>
                    <span className="text-[13px] leading-5 font-medium text-(--ls-mint-text) lg:text-[14px]">{data.role}</span>
                  </figcaption>
                </figure>
                {/* Badge overlaps the photo's bottom-right corner on desktop. Ink on mint for contrast. */}
                <div className="ls-float-slow absolute top-[302px] right-5 hidden w-[173px] flex-col items-center rounded-[22px] bg-(--ls-mint) px-6 py-3 text-(--ls-ink) shadow-[0_14px_11px_rgba(0,0,0,0.1),0_6px_4px_rgba(0,0,0,0.1)] lg:flex">
                  <span className="text-[26px] leading-10 font-semibold">{data.badgeTitle}</span>
                  <span className="text-[17px] leading-[23px] font-medium">{data.badgeSubtitle}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col">
            <p className="text-[15px] leading-[1.6] text-(--ls-muted) lg:text-[18px] lg:leading-[29px]">
              <ResponsiveText desktop={data.paragraphs[0]} mobile={data.mobileParagraph} />
            </p>
            <p className="hidden pt-6 text-[16px] leading-[26px] text-(--ls-muted) lg:block">{data.paragraphs[1]}</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 lg:mt-8 lg:gap-6 lg:border-t lg:border-(--ls-divider) lg:pt-8">
              {data.stats.map((s) => (
                <div key={s.value} className="flex flex-col items-center gap-1 rounded-[14px] bg-(--ls-cream) py-4 lg:bg-transparent lg:py-0">
                  <dt className="order-2 text-[12px] leading-4 font-medium text-(--ls-muted)">
                    <ResponsiveText desktop={s.label} mobile={s.mobileLabel} />
                  </dt>
                  <dd className="order-1 text-[22px] leading-8 font-semibold text-(--ls-mint-text) lg:text-[36px] lg:leading-10">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
