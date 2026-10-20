import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { BookingCta } from "./BookingCta";
import { ClinicPhotosSection } from "./ClinicPhotosSection";
import { FaqSection } from "./FaqSection";
import { HeroSection } from "./HeroSection";
import { LocalClinicSection } from "./LocalClinicSection";
import { MedicalDirectorSection } from "./MedicalDirectorSection";
import { ProcessSection } from "./ProcessSection";
import { ResultsSection } from "./ResultsSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TreatmentsSection } from "./TreatmentsSection";
import { WhoItIsForSection } from "./WhoItIsForSection";
import { WhySection } from "./WhySection";
import type { LocalSeoPage } from "./types";
import "@/components/ui/motion.css";
import "./local-seo.css";

// Brand font (Figma: Poppins 400/500/600). Loaded here so the shared root layout stays untouched.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

type LocalSeoPageViewProps = { page: LocalSeoPage };

/** Full local SEO page template. P02–P25 reuse this with their own data file. */
export function LocalSeoPageView({ page }: LocalSeoPageViewProps) {
  return (
    <div id="top" className={cn("local-seo min-h-screen antialiased", poppins.className)}>
      <a
        href="#main"
        className="sr-only z-50 rounded-[8px] bg-white px-4 py-2 text-[14px] font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-(--ls-ink)"
      >
        Skip to content
      </a>
      <SiteHeader nav={page.nav} />
      <main id="main">
        <HeroSection hero={page.hero} clinic={page.clinic} />
        <WhoItIsForSection data={page.whoItIsFor} />
        <TreatmentsSection data={page.treatments} />
        <WhySection data={page.why} />
        <ProcessSection data={page.process} />
        <ResultsSection data={page.results} />
        <MedicalDirectorSection data={page.medicalDirector} />
        <LocalClinicSection data={page.local} clinic={page.clinic} />
        <ClinicPhotosSection data={page.photos} />
        <FaqSection title={page.faq.title} intro={page.faq.intro} items={page.faq.items} />
        <BookingCta booking={page.booking} clinic={page.clinic} />
      </main>
      <SiteFooter clinic={page.clinic} disclaimer={page.footer.disclaimer} />
    </div>
  );
}
