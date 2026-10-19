import { ButtonLink } from "@/components/ui/ButtonLink";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { Clinic, LocalSeoPage } from "./types";

type Props = { data: LocalSeoPage["local"]; clinic: Clinic };

const inlineLink =
  "rounded-[4px] underline-offset-2 [@media(hover:hover)]:hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ls-ink)";

/** Decorative stand-in for the static map Figma marks as "to be placed in development". */
function MapPlaceholder() {
  return (
    <div aria-hidden className="ls-map-grid relative hidden h-[240px] overflow-hidden lg:block">
      <span className="absolute top-[110px] left-1/2 grid size-5 place-items-center rounded-full bg-white">
        <span className="size-3 rounded-full bg-(--ls-mint)" />
      </span>
    </div>
  );
}

export function LocalClinicSection({ data, clinic }: Props) {
  const details = [
    { label: "Nearest metro", value: clinic.nearestMetro },
    { label: "Phone", value: clinic.phoneDisplay, href: `tel:${clinic.phoneTel}` },
    { label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
    { label: "Hours", value: clinic.hoursDisplay },
  ];

  return (
    <section id="clinic" aria-labelledby="local-title" className="scroll-mt-4 bg-(--ls-cream) py-11 lg:bg-white lg:py-28">
      <Container className="flex flex-col gap-[18px] lg:flex-row lg:items-start lg:gap-[72px]">
        <div className="flex flex-1 flex-col gap-[18px] lg:gap-6">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 id="local-title" className="text-[26px] leading-[1.2] font-semibold text-(--ls-ink) md:text-[32px] lg:text-[40px] lg:leading-[1.18]">
            {data.title}
          </h2>
          <p className="text-[14px] leading-[1.65] text-(--ls-muted) lg:hidden">{data.mobileParagraph}</p>
          {data.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="hidden text-[16px] leading-[1.65] text-(--ls-muted) lg:block">
              {p}
            </p>
          ))}
          <h3 className="hidden text-[14px] leading-[1.65] font-semibold text-(--ls-ink) lg:block">{data.areasTitle}</h3>
          <ul className="flex flex-wrap gap-2" aria-label={data.areasTitle}>
            {data.areas.map((area) => (
              <li key={area}>
                <Chip className="bg-white lg:bg-(--ls-mint-soft)">{area}</Chip>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="w-full lg:w-[520px] lg:shrink-0">
          <div className="overflow-hidden rounded-[16px] bg-white lg:rounded-[20px] lg:bg-(--ls-cream)">
            <MapPlaceholder />
            <div className="flex flex-col gap-3 px-[18px] py-5 lg:gap-3.5 lg:px-8 lg:pt-7 lg:pb-8">
              <h3 className="text-[17px] leading-[1.5] font-semibold text-(--ls-ink) lg:text-[22px] lg:leading-[1.65] lg:font-medium">
                {clinic.name}
              </h3>
              <p className="text-[13px] leading-[1.6] text-(--ls-muted) lg:text-[15px] lg:leading-[1.65]">{clinic.fullAddress}</p>
              {/* Mobile: compact two lines (Figma). Desktop: label / value rows. */}
              <p className="text-[13px] leading-[1.6] text-(--ls-ink) lg:hidden">
                Metro: {clinic.metroShort} ·{" "}
                <a href={`tel:${clinic.phoneTel}`} className={inlineLink}>
                  {clinic.phoneDisplay}
                </a>
                <br />
                <a href={`mailto:${clinic.email}`} className={inlineLink}>
                  {clinic.email}
                </a>{" "}
                · {clinic.hoursDisplay}
              </p>
              <dl className="hidden flex-col gap-3.5 lg:flex">
                {details.map((d) => (
                  <div key={d.label} className="flex gap-4 text-[14px] leading-[1.65]">
                    <dt className="w-[120px] shrink-0 font-medium text-(--ls-ink)">{d.label}</dt>
                    <dd className="text-(--ls-muted)">
                      {d.href ? (
                        <a href={d.href} className={inlineLink}>
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-1 grid grid-cols-2 gap-2 lg:flex lg:gap-3">
                <ButtonLink href={clinic.mapsUrl} target="_blank" className="px-4 py-3.5 lg:px-7 lg:py-4">
                  Get Directions
                </ButtonLink>
                <ButtonLink href={`tel:${clinic.phoneTel}`} variant="secondary" className="px-4 py-3.5 lg:px-7 lg:py-4">
                  <span className="lg:hidden">Call</span>
                  <span className="hidden lg:inline">Call Clinic</span>
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
