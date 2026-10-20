import { GalleryShell } from "@/components/sections/transformation-gallery/GalleryShell";
import { NationwidePresence } from "@/components/sections/transformation-gallery/NationwidePresence";
import { PhotoHero } from "@/components/sections/transformation-gallery/PhotoHero";
import { galleryBreadcrumbs, galleryMetadata } from "@/components/sections/transformation-gallery/seo";
import { CATEGORIES, REVIEWS, VIDEO_SETS } from "@/components/sections/transformation-gallery/shared-data";
import { Testimonials } from "@/components/sections/transformation-gallery/Testimonials";
import { VideoStories } from "@/components/sections/transformation-gallery/VideoStories";
import { SkinGalleries } from "@/components/sections/transformation-gallery/skin-treatments/SkinGalleries";
import {
  GALLERY_TITLE,
  HERO_CTA,
  HERO_IMAGE,
  HERO_IMAGE_MOBILE,
  HERO_SUB,
  HERO_TITLE_ACCENT,
  HERO_TITLE_REST,
  META,
  NAME,
  REVIEWS_TITLE,
  SLUG,
  TREATMENTS,
} from "@/components/sections/transformation-gallery/skin-treatments/content";
import { HERO_SCRIM } from "@/components/sections/transformation-gallery/hero-scrim";
import { jsonLd } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = galleryMetadata({ slug: SLUG, title: META.title, description: META.description, image: HERO_IMAGE });

const category = CATEGORIES.find((c) => c.slug === SLUG)!;

/** No stats strip on this page (Figma has none). */
export default function SkinTreatmentsGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryBreadcrumbs({ slug: SLUG, name: NAME })) }} />
      <GalleryShell treatment={category.treatment}>
        <PhotoHero
          image={HERO_IMAGE}
          mobileImage={HERO_IMAGE_MOBILE}
          focus="70% center"
          cta={HERO_CTA}
          title={
            <>
              <span className="text-(--tg-teal)">{HERO_TITLE_ACCENT}</span>
              {HERO_TITLE_REST}
            </>
          }
          sub={HERO_SUB}
        >
          {/* Phones: the copy sits over the face, above PhotoHero's bottom gradient; this scrim keeps it at AA. */}
          <span aria-hidden className={HERO_SCRIM} />
        </PhotoHero>
        <SkinGalleries title={GALLERY_TITLE} treatments={TREATMENTS} />
        <VideoStories videos={VIDEO_SETS.skin} />
        <Testimonials reviews={REVIEWS.laser} title={REVIEWS_TITLE} startIndex={1} />
        <NationwidePresence />
      </GalleryShell>
    </>
  );
}
