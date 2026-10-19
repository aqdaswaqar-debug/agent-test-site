import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionHeading";
import type { LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["results"] };

const PROGRESS_WIDTH: Record<number, string> = { 33: "w-1/3", 66: "w-2/3", 100: "w-full" };

export function ResultsSection({ data }: Props) {
  return (
    <section id="results" aria-labelledby="results-title" className="scroll-mt-4 bg-(--ls-sand) py-11 lg:py-28">
      <Container className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-24">
        <div className="flex flex-col gap-3 lg:w-[400px] lg:shrink-0 lg:gap-5">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <SectionTitle id="results-title">
            {data.title}
          </SectionTitle>
          <p className="hidden text-[16px] leading-[1.65] text-(--ls-muted) lg:block">{data.intro}</p>
          <p className="hidden text-[13px] leading-[1.65] text-(--ls-muted) lg:block">{data.note}</p>
        </div>

        <Reveal className="flex flex-1 flex-col gap-4">
          <ol className="flex flex-col gap-3 lg:gap-4">
            {data.rows.map((row) => (
              <li
                key={row.period}
                className="flex flex-col gap-3 rounded-[14px] bg-white px-4 py-3.5 lg:flex-row lg:items-center lg:gap-8 lg:rounded-[16px] lg:px-8 lg:py-7"
              >
                <div className="flex flex-col gap-1 lg:w-[200px] lg:shrink-0">
                  <p className="text-[11px] leading-[1.6] font-semibold tracking-[0.08em] text-(--ls-mint-text) uppercase lg:text-[13px] lg:leading-[1.65]">
                    <ResponsiveText desktop={row.period} mobile={row.mobilePeriod} />
                  </p>
                  <h3 className="text-[15px] leading-[1.3] font-medium text-(--ls-ink) lg:text-[20px]">
                    <ResponsiveText desktop={row.title} mobile={row.mobileTitle} />
                  </h3>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <p className="hidden text-[15px] leading-[1.65] text-(--ls-muted) lg:block">{row.body}</p>
                  <div
                    className="h-1.5 overflow-hidden rounded-[3px] bg-(--ls-track)"
                    role="img"
                    aria-label={`Indicative progress: ${row.progress}%`}
                  >
                    <div className={`h-full rounded-[3px] bg-(--ls-mint) ${PROGRESS_WIDTH[row.progress] ?? "w-full"}`} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[12px] leading-[1.6] text-(--ls-muted) lg:hidden">{data.mobileNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
