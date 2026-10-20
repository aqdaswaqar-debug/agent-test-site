import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["process"] };

export function ProcessSection({ data }: Props) {
  return (
    <section id="your-visit" aria-labelledby="visit-title" className="scroll-mt-4 bg-white py-11 lg:py-28">
      <Container className="flex flex-col gap-4 lg:gap-10">
        <div className="flex flex-col gap-3 lg:gap-4">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <SectionTitle id="visit-title" className="lg:max-w-[720px]">
            <ResponsiveText desktop={data.title} mobile={data.mobileTitle} />
          </SectionTitle>
        </div>

        <Reveal stagger>
          <ol className="flex flex-col gap-5 lg:flex-row">
            {data.steps.map((step, i) => (
              <li key={step.title} data-reveal-item className="flex gap-4 lg:flex-1 lg:flex-col lg:gap-4">
                <div className="flex shrink-0 items-center gap-3 self-start lg:w-full lg:self-auto">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-[13px] font-semibold text-(--ls-ink) lg:size-11 lg:text-[16px]",
                      i === 0 ? "bg-(--ls-mint)" : "bg-(--ls-mint-soft)",
                    )}
                  >
                    {i + 1}
                  </span>
                  {i < data.steps.length - 1 ? <span aria-hidden className="hidden h-0.5 flex-1 bg-(--ls-border) lg:block" /> : null}
                </div>
                <div className="flex flex-col gap-1 lg:gap-4">
                  <h3 className="text-[15px] leading-[1.35] font-medium text-(--ls-ink) lg:text-[18px]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-(--ls-muted) lg:text-[14px] lg:leading-[1.65]">
                    <ResponsiveText desktop={step.body} mobile={step.mobileBody} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <h3 className="mt-2 text-[20px] leading-[1.5] font-semibold text-(--ls-ink) lg:mt-0 lg:text-[26px] lg:leading-normal">
          {data.costTitle}
        </h3>
        <Reveal>
          {/* Mobile 2×2 with mobile labels; desktop single row (Figma). */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-[16px] bg-(--ls-forest) p-5 lg:hidden">
            {data.mobileCost.map((c) => (
              <div key={c.value} className="flex flex-col gap-1">
                <dt className="order-2 text-[12px] leading-[1.6] text-(--ls-forest-label)">{c.label}</dt>
                <dd className="order-1 text-[22px] leading-[1.18] font-semibold text-white">{c.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="hidden rounded-[20px] bg-(--ls-forest) px-12 py-9 lg:flex">
            {data.cost.map((c) => (
              <div key={c.value} className="flex flex-1 flex-col gap-1.5">
                <dt className="order-2 text-[14px] leading-[1.65] text-(--ls-forest-label)">{c.label}</dt>
                <dd className="order-1 text-[30px] leading-[1.18] font-semibold text-white">{c.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="text-[12px] leading-[1.6] text-(--ls-muted) lg:text-[13px] lg:leading-[1.65]">
          <ResponsiveText desktop={data.costNote} mobile={data.mobileCostNote} />
        </p>
      </Container>
    </section>
  );
}
