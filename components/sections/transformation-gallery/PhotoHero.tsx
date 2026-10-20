import type { CSSProperties, ReactNode } from "react";
import Image, { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { ConsultLink } from "./ConsultLink";
import { tgContainer } from "./styles";
import type { Img } from "./types";

type PhotoHeroProps = {
  image: Img;
  /** Optional portrait crop for phones. */
  mobileImage?: Img;
  title: ReactNode;
  sub?: ReactNode;
  cta?: string;
  /** Extra content under the CTA (pills, badges). */
  children?: ReactNode;
  /** CSS object-position for the desktop photo, e.g. "70% center". */
  focus?: string;
  /** Mirror the desktop photo (Figma flips some hero fills). */
  flip?: boolean;
};

/**
 * Full-bleed photo hero with the copy on the left (all 5 treatment pages). LCP image: priority + slow settle,
 * never faded. A dark gradient keeps white copy at AA over any photo.
 */
export function PhotoHero({ image, mobileImage, title, sub, cta = "Book Free Consultation", children, focus = "center", flip = false }: PhotoHeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-(--tg-ink) lg:min-h-[640px] lg:items-center xl:min-h-[760px]">
      <div className="absolute inset-0 -z-10">
        {mobileImage ? (
          <ArtDirectedImage image={image} mobileImage={mobileImage} focus={focus} flip={flip} />
        ) : (
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectPosition: focus }} className={cn("ui-settle object-cover", flip && "md:-scale-x-100")} />
        )}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.7),transparent_65%)] lg:bg-[linear-gradient(90deg,rgb(0_0_0/0.62),rgb(0_0_0/0.25)_55%,transparent)]" />
      </div>
      <div className={cn(tgContainer, "flex flex-col items-center gap-5 pt-40 pb-10 text-center text-white lg:items-start lg:gap-8 lg:py-24 lg:text-left")}>
        <h1 id="hero-title" className="max-w-[780px] text-[26px] leading-[1.35] font-bold lg:text-[48px] lg:leading-[1.3]">
          {title}
        </h1>
        {sub ? <div className="max-w-[680px] text-[17px] leading-[1.5] font-medium lg:text-[28px] lg:font-normal">{sub}</div> : null}
        <ConsultLink>{cta}</ConsultLink>
        {children}
      </div>
    </section>
  );
}

/** Phone crop + desktop photo in one <picture>, so each viewport downloads (and prioritises) only its own file. */
function ArtDirectedImage({ image, mobileImage, focus, flip }: { image: Img; mobileImage: Img; focus: string; flip: boolean }) {
  const common = { fill: true, sizes: "100vw" } as const;
  const desktop = getImageProps({ ...common, src: image.src, alt: image.alt }).props;
  const { style, ...mobile } = getImageProps({ ...common, src: mobileImage.src, alt: mobileImage.alt, priority: true }).props;
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      <img
        {...mobile}
        alt={mobileImage.alt}
        style={{ ...style, "--hero-focus": focus } as CSSProperties}
        className={cn("ui-settle object-cover md:object-(--hero-focus)", flip && "md:-scale-x-100")}
      />
    </picture>
  );
}
