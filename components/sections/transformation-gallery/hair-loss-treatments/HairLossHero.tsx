import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { PhotoHero } from "../PhotoHero";
import { HeroPills } from "../HeroPills";
import { HERO } from "./content";

/** Hero (Figma 205:5115 / 979:15422): H1 copy differs per frame, "Backed by Science" pill on desktop only, chips, CTA. */
export function HairLossHero() {
  return (
    <PhotoHero
      image={HERO.image}
      focus={HERO.focus}
      cta={HERO.cta}
      title={<ResponsiveText desktop={HERO.title.desktop} mobile={HERO.title.mobile} />}
      sub={
        <div className="flex flex-col items-center gap-4 lg:items-start lg:gap-3">
          <p className="hidden rounded-full border border-(--tg-teal) px-4 py-2 text-[24px] leading-[1.4] font-medium lg:block">{HERO.pill}</p>
          <p className="max-w-[632px] text-[20px] leading-[1.4] font-semibold md:text-[24px] lg:text-[32px] lg:leading-[1.3] lg:font-normal xl:text-[36px]">{HERO.sub}</p>
          <HeroPills items={HERO.chips} variant="outline" className="mt-2 lg:mt-5 lg:w-max lg:flex-nowrap" />
        </div>
      }
    />
  );
}
