import { GalleryShell } from "@/components/sections/transformation-gallery/GalleryShell";
import { NationwidePresence } from "@/components/sections/transformation-gallery/NationwidePresence";
import { ResultsSection } from "@/components/sections/transformation-gallery/ResultsSection";
import { galleryBreadcrumbs, galleryMetadata } from "@/components/sections/transformation-gallery/seo";
import { CATEGORIES } from "@/components/sections/transformation-gallery/shared-data";
import { StatsStrip } from "@/components/sections/transformation-gallery/StatsStrip";
import { Testimonials } from "@/components/sections/transformation-gallery/Testimonials";
import { VideoStories } from "@/components/sections/transformation-gallery/VideoStories";
import { HERO, PAGE_NAME, PAGE_REVIEWS, RESULTS, REVIEWS_TITLE, SEO, SLUG, STATS, STORIES } from "@/components/sections/transformation-gallery/hair-replacement/content";
import { HairReplacementHero } from "@/components/sections/transformation-gallery/hair-replacement/HairReplacementHero";
import { Symbiosis } from "@/components/sections/transformation-gallery/hair-replacement/Symbiosis";
import { WhoItIsFor } from "@/components/sections/transformation-gallery/hair-replacement/WhoItIsFor";
import { jsonLd } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = galleryMetadata({ slug: SLUG, title: SEO.title, description: SEO.description, image: HERO.image });

const category = CATEGORIES.find((c) => c.slug === SLUG)!;

export default function HairReplacementGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryBreadcrumbs({ slug: SLUG, name: PAGE_NAME })) }} />
      <GalleryShell treatment={category.treatment}>
        <HairReplacementHero />
        <StatsStrip stats={STATS} />
        <WhoItIsFor />
        <ResultsSection id={RESULTS.id} title={RESULTS.title} label={RESULTS.label} pairs={RESULTS.pairs} />
        <Symbiosis />
        <VideoStories videos={STORIES} />
        <Testimonials reviews={PAGE_REVIEWS} title={REVIEWS_TITLE} />
        <NationwidePresence />
      </GalleryShell>
    </>
  );
}
