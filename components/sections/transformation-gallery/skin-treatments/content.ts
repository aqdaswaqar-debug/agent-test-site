import { zipPairs } from "../shared-data";
import type { Img, ResultPair } from "../types";

/** Copy and image data for the Skin Treatments gallery (Figma 112:2790 / 1010:18872). */

export const SLUG = "skin-treatments";
export const NAME = "Skin Treatments";
const dir = `/images/transformation-gallery/${SLUG}`;

export const META = {
  title: "Skin Treatment Results | Transformation Gallery | Berkowits",
  description: "Skin Solutions Backed by Science. Powered by Experts. Before and after results for Botox, chemical peels, pigmentation removal, anti-ageing and more at Berkowits.",
};

/** Figma hero fill 1240:7534 (raw 3164 × 1320, exported 2560w); phones get a portrait crop on the face. */
export const HERO_IMAGE: Img = {
  src: `${dir}/hero-desktop.webp`,
  alt: "Woman with eyes closed touching her glowing skin",
  width: 2560,
  height: 1068,
};
export const HERO_IMAGE_MOBILE: Img = { ...HERO_IMAGE, src: `${dir}/hero-mobile.webp`, width: 644, height: 1320 };

export const HERO_TITLE_ACCENT = "Skin Solutions";
export const HERO_TITLE_REST = " Backed by Science. Powered by Experts";
export const HERO_SUB = "Scientifically designed solutions for pigmentation, acne, ageing & glow";
export const HERO_CTA = "Book Free Consultation";

/** Figma desktop H2 (leading space trimmed; mobile typo "Tranformations" not used). */
export const GALLERY_TITLE = "Transformation At Berkowits";

export type Treatment = { slug: string; title: string; label: string; pairs: ResultPair[] };

const six = [1, 2, 3, 4, 5, 6];

/** Pairs rendered from the Figma slots (not in the zip): /figma-<slug>-<card>-before|after.webp, Figma card numbers. */
const figmaPairs = (slug: string, title: string, cards: number[]): ResultPair[] =>
  cards.map((c) => ({ before: `${dir}/figma-${slug}-${c}-before.webp`, after: `${dir}/figma-${slug}-${c}-after.webp`, alt: `${title} result ${c}` }));

/**
 * The 9 galleries in Figma order. User decision: show Figma's full set, zip file where the zip has the photo,
 * Figma render otherwise (Figma-only photos approved by Berkowits).
 * Chemical Peel cards 3 and 4 are not used: their photos carry third-party watermarks. No placeholders.
 */
const treatment = (slug: string, title: string, pairs: ResultPair[]): Treatment => ({ slug, title, label: title, pairs });
const zip = (section: number, indexes: number[], title: string) => zipPairs(SLUG, section, indexes, (i) => `${title} result ${i}`);

export const TREATMENTS: Treatment[] = [
  treatment("botox", "Botox", [...zip(4, [1, 2], "Botox"), ...figmaPairs("botox", "Botox", [3, 4, 5, 6])]),
  treatment("chemical-peel", "Chemical Peel", [...zip(5, [1], "Chemical Peel"), ...figmaPairs("chemical-peel", "Chemical Peel", [2, 5, 6])]),
  treatment("pigmentation-removal", "Pigmentation Removal", zip(6, six, "Pigmentation Removal")),
  treatment("iv-glutathione", "IV Glutathione", [...zip(7, [1, 2], "IV Glutathione"), ...figmaPairs("iv-glutathione", "IV Glutathione", [1, 2, 3, 4])]),
  treatment("laser-resurfacing", "Laser Resurfacing", zip(8, six, "Laser Resurfacing")),
  treatment("skin-brightening", "Skin Brightening", zip(9, six, "Skin Brightening")),
  treatment("anti-ageing", "Anti-Ageing", zip(11, six, "Anti-Ageing")),
  treatment("q-switched-laser", "Q-Switched Laser", zip(12, six, "Q-Switched Laser")),
  treatment("thread-lift", "Thread Lift", zip(13, six, "Thread Lift")),
];

/** User decision: show the Figma carousel copy (laser reviews) on this page too. TODO(content): real skin reviews. */
export const REVIEWS_TITLE = "What Our Clients Say";
