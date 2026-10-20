import { GalleryShell } from "@/components/sections/transformation-gallery/GalleryShell";
import { NationwidePresence } from "@/components/sections/transformation-gallery/NationwidePresence";
import { galleryBreadcrumbs, galleryMetadata } from "@/components/sections/transformation-gallery/seo";
import { DEFAULT_STATS, HUB_REVIEWS, VIDEO_SETS } from "@/components/sections/transformation-gallery/shared-data";
import { StatsStrip } from "@/components/sections/transformation-gallery/StatsStrip";
import { Testimonials } from "@/components/sections/transformation-gallery/Testimonials";
import { VideoStories } from "@/components/sections/transformation-gallery/VideoStories";
import { HubHero } from "@/components/sections/transformation-gallery/hub/HubHero";
import { TreatmentCards } from "@/components/sections/transformation-gallery/hub/TreatmentCards";
import { jsonLd } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = galleryMetadata({
  title: "Transformation Gallery: Real Hair & Skin Results | Berkowits",
  description:
    "Real before and after results from Berkowits clinics: hair transplant, hair replacement, hair loss treatments, laser hair reduction and skin treatments. 38+ years, 45+ clinics.",
  image: { src: "/images/transformation-gallery/hub/hero-after.webp", alt: "Berkowits client after hair restoration", width: 554, height: 1066 },
});

export default function TransformationGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryBreadcrumbs()) }} />
      <GalleryShell>
        <HubHero />
        <StatsStrip stats={DEFAULT_STATS} />
        <TreatmentCards />
        <VideoStories videos={VIDEO_SETS.hub} />
        <Testimonials reviews={HUB_REVIEWS} startIndex={1} />
        <NationwidePresence />
      </GalleryShell>
    </>
  );
}
