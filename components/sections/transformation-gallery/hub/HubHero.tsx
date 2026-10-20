import Image from "next/image";
import { cn } from "@/lib/utils";
import { ConsultLink } from "../ConsultLink";
import { tgContainer } from "../styles";

const PHOTOS = {
  before: { src: "/images/transformation-gallery/hub/hero-before.webp", alt: "Berkowits client before hair restoration: thinning crown and receding hairline" },
  after: { src: "/images/transformation-gallery/hub/hero-after.webp", alt: "The same client after hair restoration at Berkowits: full, styled hair" },
};
const W = 554;
const H = 1066;

const label = "font-(family-name:--font-tg-display) leading-none font-medium text-(--tg-teal-text)";

/**
 * Hub hero (Figma 3:50 / 979:12074): copy left, before/after pair right. Desktop tilts the two photo cards
 * 19.35° along a teal diagonal; phones stand them upright side by side. Photos are real client photos from Figma.
 * No `priority` preload: each layout is hidden on the other viewport, so the visible "after" photo gets
 * fetchPriority="high" instead and the hidden one is never downloaded (lazy + display:none).
 */
export function HubHero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip">
      <div className={cn(tgContainer, "grid items-center gap-8 pt-10 pb-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:gap-6 lg:py-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,660px)]")}>
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:gap-10 lg:text-left">
          <h1 id="hero-title" className="text-[32px] leading-[1.3] font-bold text-(--tg-ink) lg:text-[48px]">
            <span className="block">Real Transformations</span>
            <span className="block">Real People</span>
            <span className="block">Real Results.</span>
          </h1>
          <p className="max-w-[760px] text-[20px] leading-[1.4] font-medium lg:text-[32px] lg:leading-[1.5] lg:font-normal lg:tracking-[-0.01em]">
            38+ years of clinical excellence. Thousands of success stories across hair &amp; skin treatments.
          </p>
          <ConsultLink />
        </div>

        {/* Phones and tablets: upright cards side by side. */}
        <figure className="relative mx-auto grid w-full max-w-[420px] grid-cols-2 gap-6 pt-12 pb-14 lg:hidden">
          <span aria-hidden className="tg-line-in absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-(--tg-teal)" />
          <div className="relative mt-[30%] self-start">
            <span aria-hidden className={cn(label, "absolute -top-12 left-0 text-[40px]")}>Before</span>
            <span aria-hidden className="absolute inset-0 -translate-x-1 translate-y-1 rounded-[4px] rounded-bl-[50%_25%] bg-(--tg-teal)" />
            <Image src={PHOTOS.before.src} alt={PHOTOS.before.alt} width={W} height={H} sizes="(min-width: 768px) 200px, 45vw" className="ui-settle relative aspect-[140/283] w-full rounded-[4px] rounded-bl-[50%_25%] object-cover" />
          </div>
          <div className="relative self-start">
            <span aria-hidden className="absolute inset-0 translate-x-1 -translate-y-1 rounded-[4px] rounded-tr-[47%_23%] bg-(--tg-teal)" />
            <Image src={PHOTOS.after.src} alt={PHOTOS.after.alt} width={W} height={H} sizes="(min-width: 768px) 200px, 45vw" fetchPriority="high" className="ui-settle relative aspect-[140/283] w-full rounded-[4px] rounded-tr-[47%_23%] object-cover" />
            <span aria-hidden className={cn(label, "absolute -bottom-12 left-1/4 text-[40px]")}>After</span>
          </div>
        </figure>

        {/* Desktop: the tilted composition, positioned in a 960 × 1000 box (Figma coordinates). */}
        <figure className="relative hidden aspect-[960/1000] w-full lg:block">
          <span aria-hidden className="tg-line-in absolute top-1/2 left-[49%] h-[105%] w-1 -translate-1/2 rotate-[19.35deg] rounded-full bg-(--tg-teal)" />
          {(
            [
              { key: "before", left: "28.9%", top: "53.3%", radius: "rounded-[10px] rounded-bl-[50%_25%]", back: "-translate-x-3 translate-y-1.5", delay: "[animation-delay:80ms]" },
              { key: "after", left: "71%", top: "42.1%", radius: "rounded-[10px] rounded-tr-[47%_23%]", back: "translate-x-3 -translate-y-1.5", delay: "" },
            ] as const
          ).map((c) => (
            <div key={c.key} className="absolute h-[66.1%] w-[34.2%] -translate-1/2 rotate-[19.35deg]" style={{ left: c.left, top: c.top }}>
              <div className={cn("group relative size-full transition-transform duration-300 ease-out motion-safe:[@media(hover:hover)]:hover:-translate-y-1.5")}>
                <span aria-hidden className={cn("absolute inset-0 bg-(--tg-teal)", c.radius, c.back)} />
                <Image
                  src={PHOTOS[c.key].src}
                  alt={PHOTOS[c.key].alt}
                  fill
                  fetchPriority={c.key === "after" ? "high" : undefined}
                  sizes="(min-width: 1280px) 230px, 18vw"
                  className={cn("ui-settle object-cover", c.radius, c.delay)}
                />
              </div>
            </div>
          ))}
          <span aria-hidden className={cn(label, "absolute top-[7%] left-[35.4%] text-[clamp(36px,3.2vw,54px)]")}>Before</span>
          <span aria-hidden className={cn(label, "absolute top-[78.8%] left-[49.6%] text-[clamp(36px,3.2vw,54px)]")}>After</span>
        </figure>
      </div>
    </section>
  );
}
