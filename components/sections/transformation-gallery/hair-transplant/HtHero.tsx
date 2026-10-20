import Image from "next/image";
import { ConsultLink } from "../ConsultLink";
import { HERO } from "./content";

/** Thin teal arcs and grid lines over the photo (Figma 200:2802 is not exported; rebuilt as decoration). */
function HeroLines() {
  return (
    <svg aria-hidden viewBox="0 0 1728 800" preserveAspectRatio="xMidYMid slice" fill="none" className="pointer-events-none absolute inset-0 size-full text-(--tg-teal) opacity-30">
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M-120 760 C 300 520, 760 420, 1880 300" />
        <path d="M-60 140 C 420 300, 980 420, 1800 900" />
        <circle cx="1240" cy="420" r="520" />
        <path d="M560 -20 L 980 820" />
        <path d="M0 520 L 1728 520" opacity=".6" />
      </g>
    </svg>
  );
}

/**
 * Page hero (Figma 200:2801 / 979:13145): rounded photo card, floating guarantee stamp, copy left on desktop
 * and centred on phones. The photo is the LCP image (priority, slow settle, never faded).
 * White copy on a dark-left gradient (desktop) / dark scrim (phones) keeps AA over the photo.
 */
export function HtHero() {
  return (
    <section aria-labelledby="hero-title" className="px-4 pt-4 lg:px-0 lg:pt-0">
      <div className="relative isolate overflow-hidden rounded-[10px] bg-(--tg-surface)">
        <div className="absolute inset-0 -z-10">
          <Image src={HERO.image.src} alt={HERO.image.alt} fill priority sizes="100vw" className="ui-settle object-cover object-[64%_center] lg:object-[70%_center]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.25),rgb(0_0_0/0.65))] lg:bg-[linear-gradient(90deg,rgb(0_0_0/0.72)_0%,rgb(0_0_0/0.45)_45%,transparent_75%)]" />
          <HeroLines />
        </div>

        <div className="mx-auto flex min-h-[600px] max-w-[1600px] justify-center flex-col items-center gap-6 px-4 pt-8 pb-10 text-center sm:px-8 lg:min-h-[clamp(600px,46vw,800px)] lg:items-start lg:justify-end lg:px-[5%] lg:pt-[clamp(240px,21vw,377px)] lg:pb-[clamp(56px,4.3vw,74px)] lg:text-left">
          {/* Stamp: in flow and centred on phones; floats over the top-left corner from lg, keeping the Figma tilt on a wrapper. */}
          <div className="lg:absolute lg:top-[clamp(32px,3.5vw,61px)] lg:left-[clamp(16px,2vw,35px)] lg:-rotate-[9.64deg]">
            <Image src={HERO.stamp.src} alt={HERO.stamp.alt} width={HERO.stamp.width} height={HERO.stamp.height} sizes="(min-width: 1024px) 296px, 276px" className="ui-float-slow h-auto w-[276px] lg:w-[clamp(220px,17vw,296px)]" />
          </div>

          <p className="rounded-full bg-(--tg-teal) px-3 py-1.5 text-[14px] leading-none font-medium text-(--tg-on-teal) drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] lg:p-2.5 lg:text-[20px]">{HERO.pill}</p>
          <h1 id="hero-title" className="text-[32px] leading-[1.3] font-bold text-white lg:text-[48px]">
            {HERO.title}
          </h1>
          <p className="max-w-[681px] text-[18px] leading-[1.45] text-white/90 sm:text-[20px] lg:text-[clamp(20px,1.45vw,25px)]">{HERO.body}</p>
          <ConsultLink className="mt-4 h-[58px] w-full max-w-[468px] text-[20px] font-medium lg:h-[60px] lg:text-[clamp(20px,1.45vw,25px)]">{HERO.cta}</ConsultLink>
        </div>
      </div>
    </section>
  );
}
