import { REVIEWS, VIDEO_SETS, zipPairs } from "../shared-data";
import type { Img, ResultPair, Stat } from "../types";

/** Copy and image data for the Hair Loss Treatments gallery page (Figma 64:1405 / 979:15421). */

const IMG = "/images/transformation-gallery/hair-loss-treatments";

export const SLUG = "hair-loss-treatments";
export const PAGE_NAME = "Hair Loss Treatments";

export const SEO = {
  title: "Hair Loss Treatment Transformations | Berkowits Hair & Skin Clinic",
  description:
    "Real hair regrowth results for men and women at Berkowits: dermatologist-led, scientifically designed treatments for every stage of hair loss.",
};

export const HERO = {
  image: { src: `${IMG}/hero-image.webp`, alt: "Doctor treating a client's hairline with a micro-needle", width: 1728, height: 870 } satisfies Img,
  // Figma mobile crop centres on the needle and hairline; the desktop frame matches the photo ratio.
  focus: "61% 47%",
  title: { desktop: "Advanced Hair Regrowth Solutions", mobile: "Hair Regrowth Transformations at Berkowits" },
  pill: "Backed by Science",
  sub: "Scientifically designed solutions for every stage of hair loss.",
  chips: ["Dermatologist-led", "Advanced Clinical Treatments", "38+ Years Expertise"],
  cta: "Book Consultation",
};

// TODO(content): confirm every figure. Figma's "Grafts Transplanted" label on 4.9★ is a copy slip → "Google Rating".
export const STATS: Stat[] = [
  { value: "38+", label: "Years Legacy" },
  { value: "50+", label: "Treatments" },
  { value: "45+", label: "Clinics Pan India" },
  { value: "15L+", label: "Happy Clients" },
  { value: "4.9", label: "Google Rating", star: true },
];

export const RESULTS_TITLE = "Transformations At Berkowits";

const men = zipPairs(SLUG, 2, [1, 2, 3, 4, 5, 6], (i) => `Hair regrowth in men, result ${i}`);
// Zip names for men pair 2 are swapped: "after-2" is the thinning crown (Before), "before-2" the full crown (After).
const menFixed: ResultPair[] = men.map((p, i) => (i === 1 ? { ...p, before: p.after, after: p.before } : p));

export const RESULT_GROUPS = [
  { id: "men", title: "Hair Regrowth in Men", label: "Hair regrowth in men", pairs: menFixed },
  { id: "women", title: "Hair Regrowth in Women", label: "Hair regrowth in women", pairs: zipPairs(SLUG, 3, [1, 2, 3, 4, 5, 6], (i) => `Hair regrowth in women, result ${i}`) },
];

/** Real Berkowits channel videos on hair fall and regrowth. */
export const STORIES = VIDEO_SETS.hairLoss;

export const REVIEWS_TITLE = "What Our Clients Say";
export const PAGE_REVIEWS = REVIEWS.hairLoss;

export type Treatment = { title: string; items: string[]; image: Img; featured?: boolean };

const photo = (n: number, alt: string): Img => ({ src: `${IMG}/section-6-image-${n}.webp`, alt, width: 432, height: 308 });

export const TREATMENTS = {
  title: "Explore Our Comprehensive Treatment Options",
  intro:
    "We offer a spectrum of clinical, doctor-guided therapies designed to nourish hair roots and stimulate regrowth, categorized by their approach and intensity.",
  cards: [
    {
      title: "Non-Invasive Therapies",
      items: ["LLLT (Low-Level Laser Therapy)", "ANAGAIN (Growth Factor Application)", "ANAGROW (Topical Growth Formula)"],
      image: photo(1, "Client under a red-light laser therapy helmet"),
    },
    {
      title: "Hair Regrowth Treatments",
      items: ["PRP/Bio-PRP (Platelet-Rich Plasma)", "Exosome Therapy", "Injectable Dutasteride", "Mesotherapy/Derma roller"],
      image: photo(2, "Derma pen treatment on the scalp"),
      featured: true,
    },
    {
      title: "Advanced Regenerative Options",
      items: ["AMT (Autologous Micrografting Technology)", "AMT Boost (Enhanced Micrografting)"],
      image: photo(3, "Micrografting procedure steps"),
    },
  ] satisfies Treatment[],
  note: "Each treatment has a unique science, and their combined effect often leads to superior results.",
};
