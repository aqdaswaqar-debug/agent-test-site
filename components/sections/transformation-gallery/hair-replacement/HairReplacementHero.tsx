import { PhotoHero } from "../PhotoHero";
import { tgContainer } from "../styles";
import { HERO } from "./content";
import { HeroPills } from "../HeroPills";
import { OneHourMark } from "./OneHourMark";

/** Hero (Figma 48:706 / 979:14382): photo, H1 with the "1 HOUR" clock mark, pills, CTA, and the ribbon hanging from the header. */
export function HairReplacementHero() {
  return (
    <PhotoHero
      image={HERO.image}
      focus={HERO.focus}
      cta={HERO.cta}
      title={
        <>
          {/* Desktop: 2 lines as in Figma, clock right after "HAIR IN JUST", hanging down from that line (Figma y+44). */}
          <span className="uppercase">
            {HERO.titleLead[0]}
            <br className="hidden lg:inline" /> {HERO.titleLead[1]}
          </span>{" "}
          <span className="sr-only">{HERO.titleTail}</span>
          <OneHourMark className="ml-1 inline-block w-[88px] align-top lg:-mt-2 lg:ml-2 lg:w-[160px] xl:w-[182px]" />
        </>
      }
      sub={
        <div className="flex flex-col items-center gap-6 lg:items-start lg:gap-8">
          <p className="text-[18px] leading-[1.45] font-medium md:text-[20px] lg:text-[24px]">{HERO.sub}</p>
          <HeroPills items={HERO.pills} className="lg:w-max lg:flex-nowrap" />
        </div>
      }
    >
      {/* Desktop: keeps the left-aligned H1 clear of the ribbon (PhotoHero centres its content vertically). */}
      <span aria-hidden className="order-first hidden lg:block lg:h-28" />
      {/* Ribbon badge hanging from the header (Figma: 153 × 194 desktop, 107 × 173 mobile). Dark text on teal for contrast. */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div className={tgContainer}>
          <p className="flex h-[150px] w-[96px] flex-col items-center justify-between rounded-b-[100px] bg-(--tg-teal) px-2 pt-2 pb-7 text-center text-(--tg-on-teal) shadow-[0_0_29.8px_rgb(20_184_166/0.5)] lg:h-[194px] lg:w-[153px] lg:pb-9 lg:shadow-[0_0_29.8px_var(--tg-mint)]">
            <span className="text-[11px] leading-[1.35] font-semibold lg:text-[16px]">{HERO.ribbon.title}</span>
            <span className="text-[9px] leading-[1.3] lg:text-[12px]">{HERO.ribbon.sub}</span>
          </p>
        </div>
      </div>
    </PhotoHero>
  );
}
