import { GalleryShell } from "@/components/sections/transformation-gallery/GalleryShell";
import { NationwidePresence } from "@/components/sections/transformation-gallery/NationwidePresence";
import { galleryBreadcrumbs, galleryMetadata } from "@/components/sections/transformation-gallery/seo";
import { CATEGORIES } from "@/components/sections/transformation-gallery/shared-data";
import { StatsStrip } from "@/components/sections/transformation-gallery/StatsStrip";
import { Testimonials } from "@/components/sections/transformation-gallery/Testimonials";
import { VideoStories } from "@/components/sections/transformation-gallery/VideoStories";
import { HERO, PAGE_NAME, PAGE_REVIEWS, REVIEWS_TITLE, SEO, SLUG, STATS, STORIES } from "@/components/sections/transformation-gallery/hair-loss-treatments/content";
import { HairLossHero } from "@/components/sections/transformation-gallery/hair-loss-treatments/HairLossHero";
import { RegrowthResults } from "@/components/sections/transformation-gallery/hair-loss-treatments/RegrowthResults";
import { TreatmentOptions } from "@/components/sections/transformation-gallery/hair-loss-treatments/TreatmentOptions";
import { jsonLd } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = galleryMetadata({ slug: SLUG, title: SEO.title, description: SEO.description, image: HERO.image });

const category = CATEGORIES.find((c) => c.slug === SLUG)!;

export default function HairLossTreatmentsGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryBreadcrumbs({ slug: SLUG, name: PAGE_NAME })) }} />
      <GalleryShell treatment={category.treatment}>
        <HairLossHero />
        <StatsStrip stats={STATS} />
        <RegrowthResults />
        <VideoStories videos={STORIES} />
        <Testimonials reviews={PAGE_REVIEWS} title={REVIEWS_TITLE} />
        <TreatmentOptions />
        <NationwidePresence />
      </GalleryShell>
    </>
  );
}
