import { ButtonLink } from "@/components/ui/ButtonLink";
import { LeadForm } from "./LeadForm";
import type { Clinic, LocalSeoPage } from "./types";

type BookingCtaProps = { booking: LocalSeoPage["booking"]; clinic: Clinic };

export function BookingCta({ booking, clinic }: BookingCtaProps) {
  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-4 bg-(image:--ls-gradient)">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:gap-12 xl:gap-20 lg:px-10 lg:py-24 xl:px-[120px]">
        <div className="flex min-w-0 flex-1 flex-col gap-5 text-white">
          <div className="flex flex-col gap-6 lg:gap-2">
            <h2 id="book-title" className="text-[24px] leading-[1.6] font-semibold lg:text-[36px] lg:leading-[1.3]">
              {booking.title}
            </h2>
            <p className="text-[14px] leading-[1.6] text-(--ls-on-gradient) lg:hidden">{booking.mobileIntro}</p>
            <p className="hidden text-[16px] leading-[26px] lg:block">{booking.intro}</p>
          </div>
          <div className="hidden flex-wrap items-center gap-4 lg:flex">
            <ButtonLink href="#book-form" size="sm" icon="arrow" className="rounded-full px-6 py-3.5 text-[15.6px] leading-normal">
              Book Free Consultation
            </ButtonLink>
            <ButtonLink
              href={`tel:${clinic.phoneTel}`}
              variant="inverse"
              size="sm"
              icon="phone"
              className="rounded-full px-6 py-3.5 text-[15.6px] leading-normal"
            >
              Call {clinic.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
        <div id="book-form" className="w-full scroll-mt-4 lg:w-auto">
          <LeadForm hours={clinic.hoursDisplay} clinic={clinic.bookingName} />
        </div>
      </div>
    </section>
  );
}
