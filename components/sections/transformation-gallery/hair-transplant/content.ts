/** Hair Transplant gallery page: copy and image data (Figma 200:2800 desktop / 979:13092 mobile). */
import { zipPairs } from "../shared-data";
import type { Img } from "../types";

export const SLUG = "hair-transplant";
const IMG = `/images/transformation-gallery/${SLUG}`;

/* ---------- Hero (200:2801) ---------- */

export const HERO = {
  pill: "India's Most Trusted",
  title: "Hair Transplant",
  body: "Powered by MaxGrow FUE+, our advanced extraction protocol engineered for higher graft survival, ultra-dense packing and faster healing.",
  cta: "Book Consultation",
  // TODO(content): the zip photo is 842px wide with a white wash baked in; replace with the raw surgeon photo (≥3456w + portrait crop).
  // Clean photo exported from the Figma frame (200:4091); the zip copy is 842px with a white wash baked in.
  image: { src: `${IMG}/hero-surgeon.webp`, alt: "Berkowits surgeon wearing magnifying loupes during a hair transplant", width: 1712, height: 784 } satisfies Img,
  // TODO(content): the zip badge art reads "WRITTEN GURANTEE"; replace with the corrected badge (SVG ideal).
  stamp: { src: `${IMG}/hero-section-stamp-image.webp`, alt: "MaxGrow FUE+ hair transplant technique with 1 year written guarantee", width: 309, height: 241 } satisfies Img,
};

/* ---------- Who it is for (200:4100) ---------- */

export const WHO_TITLE = "Who it is for?";

export const WHO_CARDS: { label: string[]; image: Img }[] = [
  { label: ["Hairline Recession", "(Androgenetic Alopecia)"], image: { src: `${IMG}/section-2-image-1.webp`, alt: "Receding hairline with the planned new hairline drawn on", width: 300, height: 300 } },
  { label: ["Crown Thinning", "(Androgenetic Alopecia)"], image: { src: `${IMG}/section-2-image-2.webp`, alt: "Thinning hair on the crown, seen from above", width: 300, height: 300 } },
  { label: ["Post-Burn or Post-Surgical Hair Loss"], image: { src: `${IMG}/section-2-image-3.webp`, alt: "Scar from a burn or surgery on the scalp", width: 300, height: 300 } },
  { label: ["Beard & Moustache Restoration"], image: { src: `${IMG}/section-2-image-4.webp`, alt: "Patchy beard growth on the chin and jaw", width: 300, height: 300 } },
  { label: ["Eyebrow Restoration"], image: { src: `${IMG}/section-2-image-5.webp`, alt: "Close-up of a sparse eyebrow", width: 300, height: 300 } },
  { label: ["Scarring Alopecia"], image: { src: `${IMG}/section-2-image-6.webp`, alt: "Patchy scalp hair loss from scarring alopecia", width: 300, height: 300 } },
];

/* ---------- Behind the Transformation Journey (200:4059) ---------- */

export const JOURNEY_TITLE = "Behind the Transformation Journey";

/**
 * Only phases with a photo are listed (carousel adapts). Phases 4–5 are the Figma image fills (1161:26768 / 1161:26773),
 * square-cropped; they are low-res (410px / 241px). TODO(content): send full-size originals for Phases 4 and 5.
 */
export const PHASES: { n: number; image: Img }[] = [
  { n: 1, image: { src: `${IMG}/section-3-image-1.webp`, alt: "Phase 1: patient's receding hairline marked before the transplant", width: 425, height: 419 } },
  { n: 2, image: { src: `${IMG}/section-3-image-2.webp`, alt: "Phase 2: grafts placed along the new hairline", width: 441, height: 433 } },
  { n: 3, image: { src: `${IMG}/section-3-image-3.webp`, alt: "Phase 3: transplanted area on the top of the head", width: 425, height: 425 } },
  { n: 4, image: { src: `${IMG}/section-3-image-4.webp`, alt: "Phase 4: new hair growing in along the hairline", width: 410, height: 410 } },
  { n: 5, image: { src: `${IMG}/section-3-image-5.webp`, alt: "Phase 5: the patient's fuller hairline after the transplant", width: 241, height: 241 } },
];

/**
 * Patient story (verbatim). `hl` = phrases set in #245e69 in Figma.
 * TODO(content): confirm consent and add attribution (name/initials, city) if the patient agrees.
 */
export type StoryPart = string | { hl: string };
export const STORY: StoryPart[][] = [
  [
    "“For years I struggled with hair loss around my hairline and crown, which slowly started affecting my confidence. I tried many products but nothing really worked. I was quite confused about getting a hair transplant because there are so many clinics and techniques available. During my consultation here, the doctors explained the ",
    { hl: "Max Grow FUE technique," },
    " which they said delivers more natural and dense results compared to regular procedures and is not performed everywhere. What really gave me confidence was ",
    { hl: "Berkowits’ 1-year hair transplant guarantee," },
    " which made me feel assured about the treatment.",
  ],
  [
    "The procedure was smoother than I expected and the team guided me throughout the process. Over the next few months I started noticing natural hair growth and a fuller hairline. Today, I feel much more confident about my appearance and I’m truly happy that ",
    { hl: "I chose Berkowits and their Max Grow FUE technique for my hair transplant." },
    "”",
  ],
];

/* ---------- Results (200:2878) ---------- */

export const RESULTS_TITLE = "38 Years of Expertise. 1.5 Million+ Lives Changed";
/** Case 5 has white letterbox padding baked in. TODO(content): re-crop case 5 and send 2x exports. */
export const RESULT_PAIRS = zipPairs(SLUG, 4, [1, 2, 3, 4, 5, 6, 7, 8, 9], (i) => `Hair transplant result, case ${i}`);

/* ---------- Max Grow FUE+ Protocol (200:2985) ---------- */

export const PROTOCOL = {
  pill: "Berkowits' Proprietary Protocol",
  title: "Max Grow FUE+ Protocol",
  body: "Not every FUE is equal. MaxGrow FUE+ is Berkowits’ proprietary extraction system designed for maximum graft viability, natural hairline artistry and minimal downtime.",
  checklist: [
    "Higher graft survival rate vs standard FUE",
    "Ultra fine punches for minimal scarring",
    "Micro zigzag natural hair line design",
    "AMT Combo gives 20–30% faster results",
    "Reduced transection for graft retention",
    "All NMC Guidelines followed",
  ],
  video: {
    src: "/videos/transformation-gallery/maxgrow-fue.mp4",
    poster: `${IMG}/maxgrow-fue-poster.webp`,
    label: "Berkowits doctor explaining the MaxGrow FUE+ protocol to a patient",
  },
};

/* ---------- Expected Results (200:3537) ---------- */

export const EXPECTED_TITLE = "Expected results";
export const EXPECTED_STEPS = [
  "Hair shedding of transplanted grafts: 2–4 weeks post-procedure",
  "Visible new growth: 3–4 months",
  "Full growth: 9–12 months",
  "Success rate: 90–95% graft survival",
];
export const EXPECTED_BEFORE: Img = { src: `${IMG}/section-8-image-1.webp`, alt: "Patient before the hair transplant, hairline marked", width: 177, height: 177 };
export const EXPECTED_AFTER: Img = { src: `${IMG}/section-8-image-2.webp`, alt: "Same patient after the hair transplant with a fuller hairline", width: 177, height: 177 };
