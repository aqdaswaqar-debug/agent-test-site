import { GalleryShell } from "@/components/sections/transformation-gallery/GalleryShell";
import { NationwidePresence } from "@/components/sections/transformation-gallery/NationwidePresence";
import { ResultsSection } from "@/components/sections/transformation-gallery/ResultsSection";
import { StatsStrip } from "@/components/sections/transformation-gallery/StatsStrip";
import { Testimonials } from "@/components/sections/transformation-gallery/Testimonials";
import { VideoStories } from "@/components/sections/transformation-gallery/VideoStories";
import { galleryBreadcrumbs, galleryMetadata } from "@/components/sections/transformation-gallery/seo";
import { CATEGORIES, DEFAULT_STATS, REVIEWS, VIDEO_SETS } from "@/components/sections/transformation-gallery/shared-data";
import { ExpectedResults } from "@/components/sections/transformation-gallery/hair-transplant/ExpectedResults";
import { HtHero } from "@/components/sections/transformation-gallery/hair-transplant/HtHero";
import { JourneySection } from "@/components/sections/transformation-gallery/hair-transplant/JourneySection";
import { ProtocolCard } from "@/components/sections/transformation-gallery/hair-transplant/ProtocolCard";
import { WhoItIsFor } from "@/components/sections/transformation-gallery/hair-transplant/WhoItIsFor";
import { HERO, RESULT_PAIRS, RESULTS_TITLE, SLUG } from "@/components/sections/transformation-gallery/hair-transplant/content";
import { jsonLd } from "@/lib/site";

export const dynamic = "force-static";

const category = CATEGORIES.find((c) => c.slug === SLUG)!;

export const metadata = galleryMetadata({
  slug: SLUG,
  title: "Hair Transplant Results & MaxGrow FUE+ | Berkowits Transformation Gallery",
  description:
    "Real Berkowits hair transplant before and after results, the patient journey and the MaxGrow FUE+ protocol, with a 1-year written guarantee. Book a free consultation.",
  image: HERO.image,
});

export default function HairTransplantGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryBreadcrumbs({ slug: SLUG, name: category.label })) }} />
      <GalleryShell category={category}>
        <HtHero />
        <StatsStrip stats={DEFAULT_STATS} />
        <WhoItIsFor />
        <JourneySection />
        <ResultsSection id="results" title={RESULTS_TITLE} label="Hair transplant" pairs={RESULT_PAIRS} />
        <ProtocolCard />
        <VideoStories videos={VIDEO_SETS.hairTransplant} />
        <Testimonials reviews={REVIEWS.hairTransplant} title="What Our Clients Say" />
        <ExpectedResults />
        <NationwidePresence />
      </GalleryShell>
    </>
  );
}
