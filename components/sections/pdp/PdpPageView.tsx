import { Suspense } from "react";
import { Bodoni_Moda, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LazyCartDrawer } from "@/components/ui/site/LazyCartDrawer";
import { SiteFooter } from "@/components/ui/site/SiteFooter";
import { SiteHeader } from "@/components/ui/site/SiteHeader";
import { cn } from "@/lib/utils";
import { AmPmSection } from "./AmPmSection";
import { AuthoritySection } from "./AuthoritySection";
import { BenefitsSection } from "./BenefitsSection";
import { BundleSection } from "./BundleSection";
import { ClosingSection } from "./ClosingSection";
import { ConcernsSection } from "./ConcernsSection";
import { DetailsSection } from "./DetailsSection";
import { FormulaSection } from "./FormulaSection";
import { HeroSection } from "./HeroSection";
import { HowToUseSection } from "./HowToUseSection";
import { IngredientsSection } from "./IngredientsSection";
import { MorningRoutineSection } from "./MorningRoutineSection";
import { PdpFaqSection } from "./PdpFaqSection";
import { RadianceTimelineSection } from "./RadianceTimelineSection";
import { RecommendationsSection } from "./RecommendationsSection";
import { ResultsSection } from "./ResultsSection";
import { StickyBar } from "./StickyBar";
import { TrustStrip } from "./TrustStrip";
import { UgcSection } from "./UgcSection";
import { WishlistButton } from "./WishlistButton";
import type { PdpContent } from "./types";
import "@/components/ui/motion.css";
import "@/components/ui/site/site.css";
import "./pdp.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-pdp" });
// Figma uses "Orange Avenue DEMO" (a demo licence) for the closing headline; Bodoni Moda is the licensed stand-in.
// Not preloaded: it is only used in the closing banner, far below the fold.
const display = Bodoni_Moda({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-pdp-display", preload: false });

/** Berkowits PDP template. Section order follows Figma (and the brief's CRO architecture). */
export function PdpPageView({ content }: { content: PdpContent }) {
  return (
    <div className={cn("pdp min-h-dvh", poppins.className, poppins.variable, display.variable)}>
      <a
        href="#main"
        className="sr-only z-70 rounded-[8px] bg-(--pdp-ink) px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader theme="orange" activeNav="Products" wishlist={<WishlistButton productName={content.product.name} className="hidden lg:grid" />} />
      <main id="main">
        <HeroSection product={content.product} />
        <TrustStrip items={content.trustStrip} />
        {/* Suspense boundaries let React hydrate below-the-fold sections in separate, smaller tasks,
            so the first fold becomes interactive (and paints) sooner. Server HTML is unchanged. */}
        <Suspense>
          <ConcernsSection data={content.concerns} />
          <BenefitsSection data={content.benefits} />
          <IngredientsSection data={content.ingredients} />
        </Suspense>
        <Suspense>
          <FormulaSection data={content.formula} />
          <ResultsSection data={content.results} />
          <HowToUseSection data={content.howToUse} />
          <MorningRoutineSection data={content.morningRoutine} />
        </Suspense>
        <Suspense>
          <AmPmSection data={content.amPm} />
          <UgcSection data={content.ugc} />
          <RadianceTimelineSection data={content.radianceTimeline} />
          <AuthoritySection data={content.authority} />
        </Suspense>
        <Suspense>
          <BundleSection data={content.bundle} />
          <DetailsSection data={content.details} />
          <RecommendationsSection data={content.recommendations} />
        </Suspense>
        <Suspense>
          <PdpFaqSection data={content.faq} />
          <ClosingSection data={content.closing} product={content.product} />
        </Suspense>
      </main>
      <Suspense>
        <SiteFooter />
      </Suspense>
      <StickyBar product={content.product} />
      <LazyCartDrawer theme="orange" />
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontSize: "14px" } }} />
    </div>
  );
}
