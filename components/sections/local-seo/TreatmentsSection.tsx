import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { LocalSeoPage, Treatment } from "./types";

type Props = { data: LocalSeoPage["treatments"] };
type Grow = LocalSeoPage["treatments"]["grow"];

function TreatmentCard({ item }: { item: Treatment }) {
  return (
    <li className="group flex items-center gap-3.5 border-b border-(--ls-border) py-3 pr-4 pl-3 last:border-b-0 md:flex-col md:items-stretch md:gap-0 md:overflow-hidden md:rounded-[18px] md:border-b-0 md:bg-white md:p-0 md:transition-[transform,box-shadow] md:duration-200 md:ease-out motion-reduce:transition-none md:[@media(hover:hover)]:hover:-translate-y-1 md:[@media(hover:hover)]:hover:shadow-[0_12px_28px_rgba(22,48,43,0.10)]">
      <div className="relative size-[76px] shrink-0 overflow-hidden rounded-[12px] md:h-[210px] md:w-full md:rounded-none">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 76px"
          className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none md:[@media(hover:hover)]:group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-0.5 md:gap-2 md:px-6 md:pt-5 md:pb-6">
        <h4 className="text-[15px] leading-[1.35] font-medium text-(--ls-ink) lg:text-[19px]">{item.name}</h4>
        <p className="text-[12px] leading-[1.5] text-(--ls-muted) lg:text-[14px] lg:leading-[1.65]">
          <span className="md:hidden">{item.mobileSummary}</span>
          <span className="hidden md:inline">{item.summary}</span>
        </p>
      </div>
    </li>
  );
}

function GrowPanel({ grow, className }: { grow: Grow; className?: string }) {
  return (
    <aside
      aria-label={grow.title}
      className={cn("flex flex-col justify-center gap-2.5 rounded-[16px] bg-(--ls-forest) p-5 lg:gap-3.5 lg:rounded-[18px] lg:p-7", className)}
    >
      <p className="text-[11px] leading-[1.55] font-semibold tracking-[0.08em] text-(--ls-forest-accent) uppercase lg:text-[12px]">
        {grow.eyebrow}
      </p>
      <p className="text-[18px] leading-[1.3] font-medium text-white lg:text-[22px]">{grow.title}</p>
      <p className="text-[13px] leading-[1.55] text-(--ls-forest-text) lg:text-[14px] lg:leading-[1.65]">
        <span className="lg:hidden">{grow.mobileBody}</span>
        <span className="hidden lg:inline">{grow.body}</span>
      </p>
      <ButtonLink href={grow.href} target="_blank" variant="inverse" size="sm" className="w-full lg:w-auto lg:self-start">
        {grow.cta}
      </ButtonLink>
    </aside>
  );
}

export function TreatmentsSection({ data }: Props) {
  const [care, clinic] = data.groups;
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="scroll-mt-4 bg-(--ls-mint-soft) py-11 lg:py-28">
      <Container className="flex flex-col gap-4 lg:gap-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-1 flex-col gap-3 lg:gap-4">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 id="treatments-title" className="text-[26px] leading-[1.2] font-semibold text-(--ls-ink) md:text-[32px] lg:text-[40px] lg:leading-[1.18]">
              <span className="lg:hidden">{data.mobileTitle}</span>
              <span className="hidden lg:inline">{data.title}</span>
            </h2>
          </div>
          <p className="text-[14px] leading-[1.55] text-(--ls-muted) lg:w-[500px] lg:shrink-0 lg:text-[16px] lg:leading-[1.65]">
            <span className="lg:hidden">{data.mobileIntro}</span>
            <span className="hidden lg:inline">{data.intro}</span>
          </p>
        </div>

        {[care, clinic].map((group, g) => (
          <div key={group.label} className="flex flex-col gap-4 lg:gap-12">
            <div className="flex items-center gap-4">
              <h3 className="text-[11px] leading-[1.55] font-semibold tracking-[0.08em] text-(--ls-mint-text) uppercase lg:rounded-[8px] lg:bg-white lg:px-3 lg:py-1.5 lg:text-[12px]">
                {group.label}
              </h3>
              <p className="hidden text-[14px] leading-[1.65] text-(--ls-muted) lg:block">{group.note}</p>
            </div>
            <Reveal>
              <ul className="overflow-hidden rounded-[16px] bg-white md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:rounded-none md:bg-transparent lg:grid-cols-3">
                {group.items.map((item) => (
                  <TreatmentCard key={item.name} item={item} />
                ))}
                {g === 0 ? (
                  <li className="hidden md:flex">
                    <GrowPanel grow={data.grow} className="w-full" />
                  </li>
                ) : null}
              </ul>
            </Reveal>
          </div>
        ))}

        <p className="text-[11px] leading-[1.55] text-(--ls-muted) lg:text-[13px] lg:leading-[1.65]">
          <span className="lg:hidden">{data.mobileFootnote}</span>
          <span className="hidden lg:inline">{data.footnote}</span>
        </p>
        <GrowPanel grow={data.grow} className="md:hidden" />
      </Container>
    </section>
  );
}
