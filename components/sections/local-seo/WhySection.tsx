import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["why"] };

export function WhySection({ data }: Props) {
  return (
    <section aria-labelledby="why-title" className="bg-white py-11 lg:py-28">
      <Container className="flex flex-col gap-[18px] lg:gap-14">
        <SectionHeading id="why-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} introOnMobile={false} />
        <Reveal>
          {/* Mobile: 2-col cream tiles. Desktop: one bordered 3×2 grid (Figma). */}
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-0 lg:overflow-hidden lg:rounded-[20px] lg:border lg:border-(--ls-border)">
            {data.stats.map((stat, i) => (
              <div
                key={stat.title}
                className={cn(
                  "flex flex-col gap-2 rounded-[14px] bg-(--ls-cream) p-4 lg:gap-2.5 lg:rounded-none lg:bg-white lg:px-9 lg:pt-9 lg:pb-10",
                  i % 3 !== 2 && "lg:border-r lg:border-(--ls-border)",
                  i < 3 && "lg:border-b lg:border-(--ls-border)",
                )}
              >
                <dt className="order-2 text-[13px] leading-[1.45] font-medium text-(--ls-ink) lg:text-[18px] lg:leading-[1.65]">
                  <ResponsiveText desktop={stat.title} mobile={stat.mobileTitle} />
                </dt>
                <dd className="order-1 text-[20px] leading-[1.18] font-semibold text-(--ls-mint-text) lg:text-[30px]">{stat.value}</dd>
                <dd className="order-3 hidden text-[14px] leading-[1.65] text-(--ls-muted) lg:block">{stat.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
