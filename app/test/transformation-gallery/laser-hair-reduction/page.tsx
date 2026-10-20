import { GalleryShell } from "@/components/sections/transformation-gallery/GalleryShell";
import { NationwidePresence } from "@/components/sections/transformation-gallery/NationwidePresence";
import { PhotoHero } from "@/components/sections/transformation-gallery/PhotoHero";
import { ResultsSection } from "@/components/sections/transformation-gallery/ResultsSection";
import { StatsStrip } from "@/components/sections/transformation-gallery/StatsStrip";
import { Testimonials } from "@/components/sections/transformation-gallery/Testimonials";
import { galleryBreadcrumbs, galleryMetadata } from "@/components/sections/transformation-gallery/seo";
import { CATEGORIES, REVIEWS, VIDEO_SETS } from "@/components/sections/transformation-gallery/shared-data";
import { VideoStories } from "@/components/sections/transformation-gallery/VideoStories";
import { BenefitPills } from "@/components/sections/transformation-gallery/laser-hair-reduction/BenefitPills";
import { BodyAreas } from "@/components/sections/transformation-gallery/laser-hair-reduction/BodyAreas";
import { HeadlineRotator } from "@/components/sections/transformation-gallery/laser-hair-reduction/HeadlineRotator";
import {
  BENEFITS,
  BODY_AREAS,
  HERO_CTA,
  HERO_IMAGE,
  HERO_PHRASES,
  HERO_SUB,
  HERO_TITLE,
  META,
  NAME,
  RESULTS,
  RESULTS_TITLE,
  REVIEWS_TITLE,
  SLUG,
  STATS,
} from "@/components/sections/transformation-gallery/laser-hair-reduction/content";
import { HERO_SCRIM } from "@/components/sections/transformation-gallery/hero-scrim";
import { jsonLd } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = galleryMetadata({ slug: SLUG, title: META.title, description: META.description, image: HERO_IMAGE });

const category = CATEGORIES.find((c) => c.slug === SLUG)!;

export default function LaserHairReductionGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryBreadcrumbs({ slug: SLUG, name: NAME })) }} />
      <GalleryShell category={category}>
        <PhotoHero
          image={HERO_IMAGE}
          flip
          focus="center 40%"
          cta={HERO_CTA}
          title={
            <>
              <HeadlineRotator phrases={HERO_PHRASES} />
              <span className="mt-3 block lg:mt-6">{HERO_TITLE}</span>
            </>
          }
          sub={
            <>
              <span className="sr-only">{HERO_PHRASES.map((p) => `${p.lead}${p.accent ?? ""}`.trim()).join(". ")}. </span>
              {HERO_SUB[0]}
              <br />
              {HERO_SUB[1]}
            </>
          }
        >
          <BenefitPills items={BENEFITS} />
          {/* Phones: the copy block is taller than PhotoHero's bottom gradient; this scrim keeps it at AA. */}
          <span aria-hidden className={HERO_SCRIM} />
        </PhotoHero>
        <StatsStrip stats={STATS} />
        <ResultsSection id="results" title={RESULTS_TITLE} label="Laser hair reduction" pairs={RESULTS} />
        <BodyAreas areas={BODY_AREAS} />
        <VideoStories videos={VIDEO_SETS.laser} />
        <Testimonials reviews={REVIEWS.laser} title={REVIEWS_TITLE} startIndex={1} />
        <NationwidePresence />
      </GalleryShell>
    </>
  );
}
