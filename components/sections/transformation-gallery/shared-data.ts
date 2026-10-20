import type { Category, Review, Stat, VideoStory } from "./types";

/** Route base of the gallery (test site). */
export const GALLERY_BASE = "/test/transformation-gallery";
export const galleryUrl = (slug?: string) => (slug ? `${GALLERY_BASE}/${slug}` : GALLERY_BASE);

const card = (file: string, alt: string) => ({ src: `/images/transformation-gallery/hub/${file}`, alt, width: 399, height: 399 });

/** The five treatment galleries, in the hub's order (Figma 191:181). */
export const CATEGORIES: Category[] = [
  { slug: "hair-transplant", label: "Hair Transplant", treatment: "Hair transplant", card: card("section-2-image-1.webp", "Surgeon performing a hair transplant with magnifying loupes") },
  { slug: "hair-replacement", label: "Hair Replacement", treatment: "Hair replacement", card: card("section-2-image-2.webp", "Stylist fitting a non-surgical hair replacement system") },
  { slug: "hair-loss-treatments", label: "Hair Loss Treatments", treatment: "Hair loss", card: card("section-2-image-3.webp", "Doctor giving a scalp treatment for hair loss") },
  { slug: "laser-hair-reduction", label: "Laser Hair Reduction", treatment: "Laser hair reduction", card: card("section-2-image-4.webp", "Laser hair reduction session on the legs") },
  { slug: "skin-treatments", label: "Skin Treatments", treatment: "Skin treatment", card: card("section-2-image-5.webp", "Facial skin treatment at a Berkowits clinic") },
];

/**
 * Default stats strip. Figma labels the 4.9★ item "Grafts Transplanted" (copied from the item before);
 * it is the rating. TODO(content): confirm every figure.
 */
export const DEFAULT_STATS: Stat[] = [
  { value: "38+", label: "Years Legacy" },
  { value: "15k+", label: "Successful Transplants" },
  { value: "45+", label: "Clinics Pan India" },
  { value: "15L+", label: "Happy Clients" },
  { value: "4Lac+", label: "Grafts Transplanted" },
  { value: "4.9", label: "Google Rating", star: true },
];

/** Clinic cities, in Figma's desktop column order (3 × 6). */
export const CITIES = [
  "Bengaluru", "Delhi", "Gurugram", "Faridabad", "Ghaziabad", "Noida",
  "Kolkata", "Ahmedabad", "Mumbai", "Ludhiana", "Bhubaneswar", "Raipur",
  "Pune", "Indore", "Bhopal", "Nagpur", "Patna", "Hyderabad",
];
export const CLINIC_FINDER = "https://app.berkowits.com/cma/";
export const CLINIC_COUNT = "45+";

/**
 * Google reviews (copy confirmed by Berkowits, Figma review frame 197:1463), 5 per treatment.
 * The Skin page uses the laser set, as its Figma carousel does.
 */
export const REVIEWS: Record<"hairTransplant" | "hairReplacement" | "hairLoss" | "laser", Review[]> = {
  hairTransplant: [
    { name: "Rahul Sharma", text: "Very good hair transplant experience. Doctors explained everything clearly and results are looking natural so far.", rating: 5 },
    { name: "Amit Verma", text: "Professional clinic with supportive staff. Entire hair transplant process was smooth and comfortable.", rating: 5 },
    { name: "Karan Mehta", text: "I was nervous initially, but doctors made me comfortable and procedure went very smoothly.", rating: 5 },
    { name: "Rohit Gupta", text: "Detailed consultation and experienced doctors. Overall a great hair transplant experience.", rating: 5 },
    { name: "Ankit Singh", text: "Happy with my hair transplant results. Hairline looks natural and recovery was smooth.", rating: 5 },
  ],
  hairReplacement: [
    { name: "Sandeep Malhotra", text: "Hair replacement looks very natural and comfortable. It really boosted my confidence.", rating: 5 },
    { name: "Vivek Kapoor", text: "Great service and helpful staff. Hair replacement fitting was perfect and looks realistic.", rating: 5 },
    { name: "Manish Arora", text: "Comfortable hair replacement system with natural appearance. Very satisfied with the overall result.", rating: 5 },
    { name: "Deepak Bansal", text: "Professional team and smooth process. Final hair replacement look exceeded expectations.", rating: 5 },
    { name: "Nitin Aggarwal", text: "Good solution for hair loss. Hair replacement looks natural and feels comfortable.", rating: 5 },
  ],
  hairLoss: [
    { name: "Priya Sharma", text: "After treatment here, my hair fall reduced noticeably and hair quality improved.", rating: 5 },
    { name: "Neha Gupta", text: "Doctor diagnosed my hair loss properly and suggested an effective treatment plan.", rating: 5 },
    { name: "Pooja Verma", text: "Friendly staff and effective treatment. My hair fall problem has improved.", rating: 5 },
    { name: "Ritu Singh", text: "After a few sessions, hair fall reduced and overall hair health improved.", rating: 5 },
    { name: "Sneha Kapoor", text: "Knowledgeable doctors who guide properly. I am satisfied with the treatment results.", rating: 5 },
  ],
  laser: [
    { name: "Anjali Mehta", text: "Laser hair reduction treatment was comfortable and effective. I noticed good results.", rating: 5 },
    { name: "Kavita Sharma", text: "Clean clinic and professional staff. Laser treatment worked very well for unwanted hair.", rating: 5 },
    { name: "Simran Kaur", text: "Very satisfied with laser hair reduction. Hair growth reduced significantly after sessions.", rating: 5 },
    { name: "Radhika Verma", text: "Smooth procedure and helpful staff. Entire laser treatment process was explained clearly.", rating: 5 },
    { name: "Shalini Gupta", text: "Safe and effective laser hair reduction treatment with visible results after sessions.", rating: 5 },
  ],
};

/** Hub mix (Figma shows Rohit, Vivek, Priya with Vivek centred; 7 dots → 7 reviews). */
export const HUB_REVIEWS: Review[] = [
  REVIEWS.hairTransplant[3]!, REVIEWS.hairReplacement[1]!, REVIEWS.hairLoss[0]!, REVIEWS.laser[0]!,
  REVIEWS.hairTransplant[0]!, REVIEWS.hairReplacement[0]!, REVIEWS.hairLoss[1]!,
];

/** "Hear It From Them": real videos from the Berkowits YouTube channel (titles as published), played in a popup. */
const yt = (youtubeId: string, title: string): VideoStory => ({
  title,
  youtubeId,
  href: `https://www.youtube.com/watch?v=${youtubeId}`,
  thumb: { src: `/images/transformation-gallery/videos/${youtubeId}.webp`, alt: "", width: 960, height: 540 },
});

const V = {
  maxgroVsFue: yt("umf_sZm-EUE", "FUE vs MaxGro FUE+: which hair transplant gives the best results? Dr. Anupriya Goel"),
  transplantResults: yt("j4PEvL9h0wY", "Hair transplant results you won't believe: Hair Talk ft. Sunil"),
  transplant3d: yt("k25nPSKlPkw", "See your hair before surgery: 3D hair transplant consultation, Dr. Anupriya Goel"),
  scaredOfSurgery: yt("zNNlBM6w9dY", "Scared of hair transplant surgery?"),
  transplantVsReplacement: yt("tN-CvGLNnv0", "Hair transplant vs hair replacement: which is best? CEO Arpit Goel"),
  newFatherStory: yt("rHhADfYzzTg", "Hair patch transformation: why a new father chose hair replacement, a real story"),
  patchSystems: yt("pj24bS1kwDc", "Hair clipping vs taping vs bonding: which hair patch system is best?"),
  patchVsTransplant: yt("XIFWVYfFLCs", "Hair patch vs hair transplant for men: cost, pros and cons"),
  patchQuality: yt("48VRWVaSNjE", "Hair patch quality test: 5 checks before you buy a hair patch"),
  womenHairFall: yt("Ycf1yvT3uZc", "Hair fall in women: 6 common causes you shouldn't ignore"),
  menVsWomen: yt("-0Bk6_FEG0A", "Hair fall in men vs women: causes, treatment and myths, ft. Dr. Anupriya Goel"),
  amtRegrowth: yt("zbAZDpJdvz4", "How to regrow hair with your own cells: AMT technology"),
  hairFallTreatments: yt("M_10UwhpYDo", "The most effective hair fall treatments: PRP, LLLT, hair transplant"),
  laserHairTherapy: yt("YtECI9kk8dM", "How laser hair therapy works: a non-surgical hair fall solution"),
  lhrExplained: yt("YPQnOKhWIMg", "Laser hair removal: how many sessions, pain and results explained"),
  lhrSession: yt("BMDFmn8qJ14", "Laser hair reduction session: see the LHR procedure at Berkowits"),
  lhrClinic: yt("vIVfOx0p2Mk", "Laser hair reduction at Berkowits Hair & Skin Clinic"),
  lhrRemoval: yt("4ClIeyYz2gw", "Laser hair removal at Berkowits"),
  hydrafacial: yt("suaeMgB6-Vs", "HydraFacial step by step: the best skin glow treatment"),
  glutathione: yt("MNN1Oxab8Fw", "Glutathione for skin: is a glutathione drip safe?"),
  botoxVsFillers: yt("Bc6f9ZSyOFo", "Botox vs dermal fillers: which one is right for you?"),
  carbonPeel: yt("mkxABjZTjfQ", "Carbon laser peel treatment: step by step"),
  regenerativeSkin: yt("jmywKsqLks4", "Regenerative skin treatments explained: PRP, PDRN and exosomes"),
  acneScars: yt("C5wbFHS6vF8", "Deep acne scars: the best treatments for pimple marks"),
};

/** Video sets per page (pass to <VideoStories videos={…} />). */
export const VIDEO_SETS = {
  hairTransplant: [V.transplantResults, V.maxgroVsFue, V.transplant3d, V.scaredOfSurgery, V.transplantVsReplacement],
  hairReplacement: [V.newFatherStory, V.patchSystems, V.patchVsTransplant, V.patchQuality, V.transplantVsReplacement],
  hairLoss: [V.womenHairFall, V.menVsWomen, V.amtRegrowth, V.hairFallTreatments, V.laserHairTherapy],
  laser: [V.lhrExplained, V.lhrSession, V.lhrClinic, V.lhrRemoval],
  skin: [V.hydrafacial, V.botoxVsFillers, V.glutathione, V.carbonPeel, V.regenerativeSkin, V.acneScars],
  hub: [V.newFatherStory, V.maxgroVsFue, V.transplantVsReplacement, V.womenHairFall, V.lhrExplained, V.hydrafacial],
};



/**
 * Builds before/after pairs from the converted zip files: /images/transformation-gallery/<page>/section-<n>-before-<i>.webp
 * and …-after-<i>.webp (names normalised on import: "befor" → "before", lower case).
 */
export function zipPairs(page: string, section: number, indexes: number[], alt: (i: number) => string) {
  const base = `/images/transformation-gallery/${page}/section-${section}`;
  return indexes.map((i) => ({ before: `${base}-before-${i}.webp`, after: `${base}-after-${i}.webp`, alt: alt(i) }));
}
