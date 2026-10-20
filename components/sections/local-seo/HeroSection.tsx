import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { hoverLift, hoverZoom } from "@/components/ui/motion";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { cn } from "@/lib/utils";
import type { Clinic, LocalSeoPage } from "./types";

type HeroSectionProps = { hero: LocalSeoPage["hero"]; clinic: Clinic };

export function HeroSection({ hero, clinic }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-title" className="bg-(--ls-sand)">
      <Container className="grid gap-4 pt-8 pb-11 lg:grid-cols-[minmax(0,1fr)_520px] lg:grid-rows-[auto_auto] lg:content-center lg:gap-x-16 lg:gap-y-7 lg:pt-[72px] lg:pb-[88px] xl:gap-x-16">
        {/* Copy (row 1 on desktop) */}
        <div className="flex flex-col gap-4 lg:self-end lg:gap-7">
          <p className="flex items-center gap-2 text-[12px] leading-[1.6] font-medium text-(--ls-ink) lg:gap-2.5 lg:text-[14px] lg:leading-[1.65]">
            <span aria-hidden className="size-[7px] rounded-full bg-(--ls-mint) lg:size-2" />
            {hero.tag}
          </p>
          <h1 id="hero-title" className="text-[32px] leading-[1.2] font-semibold text-(--ls-ink) md:text-[44px] lg:text-[54px] lg:leading-[1.16]">
            {hero.title}
          </h1>
          <p className="text-[15px] leading-[1.6] text-(--ls-muted) lg:text-[18px] lg:leading-[1.65]">
            <ResponsiveText desktop={hero.intro} mobile={hero.mobileIntro} />
          </p>
        </div>

        {/* Image: between copy and actions on mobile, right column spanning both rows on desktop */}
        {/* Outer frame lifts with a soft shadow on hover; inner frame clips the photo, which zooms. */}
        <div
          className={cn(
            "group rounded-[16px] shadow-[0_14px_34px_-18px_rgba(22,48,43,0.35)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:rounded-[20px]",
            hoverLift,
          )}
        >
          <div className="relative h-[200px] overflow-hidden rounded-[inherit] md:h-[340px] lg:h-[600px]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
              className={cn("ui-settle object-cover", hoverZoom)}
            />
          </div>
          <div className="ui-float absolute bottom-6 left-6 hidden flex-col gap-1.5 rounded-[14px] bg-white px-5 py-4 leading-[1.65] shadow-[0_8px_24px_rgba(0,0,0,0.1)] lg:flex">
            <p className="text-[12px] font-medium text-(--ls-muted)">{hero.cardLabel}</p>
            <p className="text-[16px] font-semibold text-(--ls-ink)">{hero.cardTitle}</p>
            <p className="text-[13px] text-(--ls-muted)">{hero.cardSubtitle}</p>
          </div>
        </div>

        {/* Actions + chips (row 2 on desktop) */}
        <div className="flex flex-col gap-4 lg:self-start lg:gap-7">
          <div className="flex flex-col gap-2.5 sm:flex-row lg:gap-3">
            <ButtonLink href="#book-form" icon="arrow" className="w-full px-5 py-3.5 sm:w-auto lg:px-7 lg:py-4">
              Book Free Consultation
            </ButtonLink>
            <ButtonLink href={`tel:${clinic.phoneTel}`} variant="secondary" icon="phone" className="w-full px-5 py-3.5 sm:w-auto lg:px-7 lg:py-4">
              Call {clinic.phoneDisplay}
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-1.5 lg:gap-2" aria-label="Clinic highlights">
            {hero.chips.map((chip, i) => (
              <li key={chip}>
                <Chip className="bg-white">
                  <ResponsiveText desktop={chip} mobile={hero.mobileChips[i] ?? chip} />
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
