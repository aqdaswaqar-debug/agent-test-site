import { zipPairs } from "../shared-data";
import type { Img, ResultPair, Stat } from "../types";

/** Copy and image data for the Laser Hair Reduction gallery (Figma 108:2597 / 1008:17694). */

export const SLUG = "laser-hair-reduction";
export const NAME = "Laser Hair Reduction";
const dir = `/images/transformation-gallery/${SLUG}`;

export const META = {
  title: "Laser Hair Reduction Results | Transformation Gallery | Berkowits",
  description: "India’s First Permanent Hair Reduction Company. The End of Waxing Pain & Ingrowth. The Start of Effortless Grooming. Real before and after results from Berkowits clinics.",
};

/** Zip Hero-image.png; Figma mirrors it on desktop (therapist left, legs pointing right). */
export const HERO_IMAGE: Img = {
  src: `${dir}/hero-image.webp`,
  alt: "Therapist giving a laser hair reduction session on a client's legs",
  width: 1728,
  height: 870,
};

/** Rotating line above the H1 (Figma 112:2689). `accent` renders in teal. */
export const HERO_PHRASES = [
  { lead: "Smooth ", accent: "Skin" },
  { lead: "Zero Hassle" },
];
export const HERO_TITLE = "India’s First Permanent Hair Reduction Company";
/** Desktop copy used on all screens (mobile Figma drops "& Ingrowth"; brief Q4 default). */
export const HERO_SUB = ["The End of Waxing Pain & Ingrowth.", "The Start of Effortless Grooming."];
export const HERO_CTA = "Book Free Consultation";
/** Mobile-only pills in Figma (1008:17767…); shown on all screens (brief Q4 default). */
export const BENEFITS = ["Pain-Free Sessions", "No Ingrowth Forever", "Long-Term Results", "Safe for All Skin Types"];

/** Figma labels the 4.9★ item "Grafts Transplanted" (copied from the transplant page). TODO(content): confirm figures. */
export const STATS: Stat[] = [
  { value: "38+", label: "Years Legacy" },
  { value: "50+", label: "Treatments" },
  { value: "45+", label: "Clinics Pan India" },
  { value: "15L+", label: "Happy Clients" },
  { value: "4.9", label: "Google Rating", star: true },
];

const [backWoman, , chest] = zipPairs(SLUG, 6, [1, 2, 3], (i) => `Laser hair reduction result ${i}`);
const figma = (area: string, alt: string): ResultPair => ({ before: `${dir}/figma-${area}-before.webp`, after: `${dir}/figma-${area}-after.webp`, alt });

/**
 * The 6 Figma cards in Figma order (user decision: show the full Figma set). Cards 1 and 3 are zip files; cards
 * 2, 4, 5, 6 are rendered from the Figma slots (not in the zip). Zip pair 2 (underarm) is not in the Design frame.
 * Figma-only photos approved by Berkowits.
 */
export const RESULTS: ResultPair[] = [
  { ...backWoman!, alt: "Laser hair reduction on the upper back" },
  figma("back-man", "Laser hair reduction on a man's full back"),
  { ...chest!, alt: "Laser hair reduction on the chest and shoulder" },
  figma("legs", "Laser hair reduction on the lower leg"),
  figma("face", "Laser hair reduction on the cheek"),
  figma("underarm", "Laser hair reduction on the underarm"),
];
export const RESULTS_TITLE = "Witness the Transformation";

export type BodyArea = { id: string; title: string; rows: string[][] };

/** 96px circle cut from the zip panel (section-2/3/4-image-1) at 1x. TODO(asset): 2x originals (brief Q7). */
export const bodyAreaIcon = (label: string) => `${dir}/body-area-${label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}.webp`;

/** Treatable areas, labels verbatim and in Figma's row breaks (Figma S4–S6, flattened panels rebuilt as a grid). */
export const BODY_AREAS: BodyArea[] = [
  {
    id: "face-neck",
    title: "Full Face & Neck",
    rows: [
      ["UPPER LIP", "CHIN", "EXTENDED CHIN", "CHEEKS", "SIDEBURNS"],
      ["FULL FACE", "BEARD", "FRONT OF NECK", "BACK OF NECK"],
    ],
  },
  {
    id: "upper-body",
    title: "Upper Half of Body",
    rows: [
      ["AREOLAS", "UNDERARMS", "STOMACH", "CHEST", "HAPPY TRAIL", "HANDS", "SHOULDERS", "UPPER ARMS"],
      ["LOWER ARMS", "FULL ARMS", "WAISTLINE", "LOWER BACK", "UPPER BACK", "FULL BACK", "TORSO"],
    ],
  },
  {
    id: "lower-body",
    title: "Lower Half of Body",
    rows: [
      ["BIKINI LINE", "EXTENDED BIKINI LINE", "FULL BRAZILIAN", "MANKINI", "BIKINI FRONT", "FEET", "INNER BUTTOCKS", "FULL BUTT"],
      ["KNEES", "INNER THIGHS", "LOWER LEGS", "UPPER LEGS", "FULL LEGS", "ABDOMEN TRAIL"],
    ],
  },
];

export const REVIEWS_TITLE = "What Our Clients Say";
