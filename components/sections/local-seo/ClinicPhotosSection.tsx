import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionHeading";
import { ClinicCarousel } from "./ClinicCarousel";
import type { LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["photos"] };

export function ClinicPhotosSection({ data }: Props) {
  const [main, ...rest] = data.items;
  return (
    <section aria-labelledby="photos-title" className="bg-(--ls-mint-soft) py-11 lg:py-28">
      <Container className="flex flex-col gap-4 lg:gap-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-3 lg:gap-4">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <SectionTitle id="photos-title">
              {data.title}
            </SectionTitle>
          </div>
          <ButtonLink href="#book-form" className="hidden shrink-0 md:inline-flex">
            {data.cta}
          </ButtonLink>
        </div>

        <div className="md:hidden">
          <ClinicCarousel photos={data.items} label={data.title} />
        </div>

        <Reveal className="hidden md:block">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-[560px_1fr] lg:gap-5">
            <div className="relative h-[320px] overflow-hidden rounded-[16px] lg:h-[420px]">
              <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 560px, 50vw" className="object-cover" />
            </div>
            <ul className="grid grid-cols-2 gap-4 lg:gap-5">
              {rest.map((photo) => (
                <li key={photo.src} className="relative h-[152px] overflow-hidden rounded-[16px] lg:h-[200px]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 300px, 25vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ButtonLink href="#book-form" className="w-full px-5 py-3.5 md:hidden">
          {data.cta}
        </ButtonLink>
      </Container>
    </section>
  );
}
