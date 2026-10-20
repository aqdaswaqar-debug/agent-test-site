import { Container } from "@/components/ui/Container";
import { hoverLift } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["whoItIsFor"] };

export function WhoItIsForSection({ data }: Props) {
  return (
    <section id="who-it-is-for" aria-labelledby="who-title" className="scroll-mt-4 bg-white py-11 lg:py-28">
      <Container className="flex flex-col gap-4 lg:gap-14">
        <SectionHeading id="who-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} introOnMobile={false} />
        <Reveal stagger>
          {/* Mobile: one list card with dividers. Tablet: 2×2. Desktop: four cards. */}
          <ol className="overflow-hidden rounded-[16px] bg-(--ls-cream) md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:bg-transparent lg:grid-cols-4 lg:gap-6">
            {data.cards.map((card, i) => (
              <li
                key={card.title}
                data-reveal-item
                className={cn(
                  "group flex gap-3 border-b border-(--ls-border) px-4 py-4 last:border-b-0 md:flex-col md:gap-3.5 md:rounded-[16px] md:border-b-0 md:bg-(--ls-cream) md:px-7 md:pt-7 md:pb-8",
                  hoverLift,
                )}
              >
                {/* Accent line stretches on hover (transform only). */}
                <span
                  aria-hidden
                  className="hidden h-1 w-10 origin-left rounded-[2px] bg-(--ls-mint) transition-transform duration-300 ease-out motion-reduce:transition-none md:block motion-safe:[@media(hover:hover)]:group-hover:scale-x-[1.8]"
                />
                <span className="w-5 shrink-0 pt-px text-[13px] leading-[1.65] font-semibold text-(--ls-mint-text) md:w-auto md:font-medium md:text-(--ls-muted)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1 md:gap-3.5">
                  <h3 className="text-[15px] leading-[1.35] font-medium text-(--ls-ink) lg:text-[20px]">
                    <ResponsiveText desktop={card.title} mobile={card.mobileTitle} />
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-(--ls-muted) lg:text-[15px] lg:leading-[1.65]">
                    <ResponsiveText desktop={card.body} mobile={card.mobileBody} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
