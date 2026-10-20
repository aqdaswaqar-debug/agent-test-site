import { REVIEWS, VIDEO_SETS, zipPairs } from "../shared-data";
import type { Img, Stat } from "../types";

/** Copy and image data for the Hair Replacement (Non-Surgical) gallery page (Figma 48:639 / 979:14338). */

const IMG = "/images/transformation-gallery/hair-replacement";

export const SLUG = "hair-replacement";
export const PAGE_NAME = "Hair Replacement";

export const SEO = {
  title: "Hair Replacement Transformations | Berkowits Hair & Skin Clinic",
  description:
    "Real before and after results of non-surgical hair replacement at Berkowits: medical-grade hair systems with a natural look and a weightless fit.",
};

/** Zip hero has the Figma gradient baked in (raw fill not exported). */
export const HERO = {
  image: { src: `${IMG}/hero-image-1.webp`, alt: "Stylist fitting a non-surgical hair replacement system", width: 1728, height: 874 } satisfies Img,
  // Desktop and mobile Figma crops both centre on the patch; the frame ratio matches the photo on desktop.
  focus: "58% 45%",
  // TODO(content): confirm "India's First Hair Replacement Company", "since 1988" and the "1 hour" claim.
  ribbon: { title: "India’s First Hair Replacement Company", sub: "berkowits hair and skin clinic since 1988" },
  /** Figma desktop breaks after "of"; the clock follows "hair in just". */
  titleLead: ["Get a full head of", "hair in just"] as const,
  titleTail: "1 hour",
  sub: "Medical-grade hair systems crafted for a completely natural look, a weightless fit, and the confidence to wear it everywhere — every day",
  pills: ["100% Natural Look", "Lightweight, Breathable Bases", "38+ Years of Expertise"],
  cta: "Book Consultation",
};

// TODO(content): confirm 50k+ bonding sessions, 6 Lac+ units, 15L+ clients and the 4.9 Google rating.
export const STATS: Stat[] = [
  { value: "38+", label: "Years Legacy" },
  { value: "50k+", label: "Hair Bonding Sessions Yearly" },
  { value: "45+", label: "Clinics Pan India" },
  { value: "15L+", label: "Happy Clients" },
  { value: "6Lac+", label: "Hair Units Sold Yearly" },
  { value: "4.9", label: "Google Rating", star: true },
];

export type Audience = { label: string; image: Img; href?: string };

export const AUDIENCE_TITLE = "Who it is for?";

// Tiles 3 and 6 use "-clean" copies: another clinic's tagline (tile 3) and a stock watermark (tile 6) blurred with PIL.
const who = (n: number, alt: string, clean = false): Img => ({ src: `${IMG}/section-2-image-${n}${clean ? "-clean" : ""}.webp`, alt, width: 300, height: 300 });

export const AUDIENCE: Audience[] = [
  { label: "Progressive or advanced thinning", image: who(1, "Crown with advanced hair thinning") },
  { label: "Complete baldness", image: who(2, "Fully bald scalp") },
  { label: "Low donor availability", image: who(3, "Scalp with a thin donor area at the back", true) },
  { label: "Medical/scarring-related alopecia", image: who(4, "Scalp with patchy scarring alopecia") },
  { label: "Immediate cosmetic restoration", image: who(5, "Woman with full, styled hair") },
  // TODO(legal): confirm image rights (celebrity photo).
  { label: "Post-transplant enhancement (Symbiosis Technique)", image: who(6, "Celebrity with a full head of hair", true), href: "#symbiosis" },
];

export const RESULTS = {
  id: "results",
  title: "Transformations At Berkowits",
  label: "Non-surgical hair replacement",
  pairs: zipPairs(SLUG, 3, [1, 2, 3, 4, 5, 6], (i) => `Hair replacement client ${i}`),
};

export const SYMBIOSIS = {
  id: "symbiosis",
  title: "Symbiosis Technique",
  chip: "Bollywood's Best-Kept Secret for Complete Hair Restoration",
  body: "The ultimate fusion of science and artistry — the Symbiosis Technique is Berkowits' proprietary hybrid protocol that pairs the precision of Hair Transplant with the instant transformation of Hair Replacement.",
  accent: "Crafted for those who refuse to wait — or compromise.",
  madeForTitle: "Made for:",
  madeFor: [
    "Advanced baldness stages where transplant alone falls short",
    "Low donor density requiring a smarter, dual approach",
    "Those who want a full head of hair today, with natural growth that follows",
  ],
  closing:
    "The Hair Replacement system delivers red-carpet-ready coverage from day one. Meanwhile, transplanted hair quietly takes root, maturing over months into permanent, natural growth — giving you the best of both worlds, seamlessly.",
  highlights: ["Full coverage", "Lasting results", "No compromise"],
  // TODO(legal): confirm image rights (celebrity photo). Figma desktop fill (blazer), so it doesn't repeat the vest photo used in "Who it is for".
  image: { src: `${IMG}/symbiosis.webp`, alt: "Celebrity with a full head of hair, in a dark blazer", width: 1024, height: 1320 } satisfies Img,
};

/** Real Berkowits channel videos; the first is the "new father" story from the Figma row. */
export const STORIES = VIDEO_SETS.hairReplacement;

export const REVIEWS_TITLE = "What Our Clients Say";
export const PAGE_REVIEWS = REVIEWS.hairReplacement;
