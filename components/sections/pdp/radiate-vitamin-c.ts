import type { PdpContent } from "./types";

/**
 * Radiate Vitamin C Serum PDP.
 * Layout: Figma "Berkowits 2 New Page Design" › PDP Radiate Vitamin C Serum (6969:24943 desktop, 7133:23313 mobile).
 * Copy: "PDP Design Briefs" Google Doc › Radiate Vit C (wins over Figma copy where they differ, e.g. FAQ answers,
 * conservative results wording, no "clinically proven" / "dermatologist formulated" claims).
 * Prices, packs, stock and links: live catalogue on berkowits.com (checked 20 Oct 2026).
 */

const IMG = "/images/pdp/radiate-vitamin-c";
const VID = "/videos/pdp/radiate-vitamin-c";

const video = (name: string, label: string) => ({ src: `${VID}/${name}.mp4`, poster: `${IMG}/${name}-poster.webp`, label });

/** Live price of one 30 ml bottle (berkowits.com, 1 Month Pack). Pack savings are computed against it. */
const UNIT_PRICE = 1211;

export const radiateVitaminC: PdpContent = {
  product: {
    id: "radiate-vitamin-c-serum",
    slug: "radiate-vitamin-c-serum-for-men-women/7540888535130",
    name: "Radiate Vitamin C Serum",
    title: ["Brighten Your Skin.", "Boost Your Radiance."],
    lead: "A lightweight Vitamin C serum designed to brighten dull-looking skin, improve the appearance of uneven tone and support a firmer, more youthful-looking complexion.",
    chips: ["Brightens Dull Skin", "Helps Reduce Dark Spots", "Boosts Radiance", "Lightweight & Non-Oily"],
    // TODO(content): Figma shows "4.8 (5k+ verified reviews)" and "5k+ bought in past month" (copied from the sunscreen PDP).
    // The live product shows 4.9 with no review count, so only the rating is shown until real review data is connected.
    rating: { value: 4.9, label: "4.9 rating" },
    packs: [
      { id: "1-month", label: "1 Month Pack", units: 1, price: UNIT_PRICE, mrp: UNIT_PRICE },
      { id: "3-months", label: "3 Months · 2 pcs", units: 2, price: 2267, mrp: UNIT_PRICE * 2 },
      { id: "6-months", label: "6 Months · 3 pcs", units: 3, price: 3257, mrp: UNIT_PRICE * 3, recommended: true },
      { id: "12-months", label: "12 Months · 6 pcs", units: 6, price: 6227, mrp: UNIT_PRICE * 6 },
    ],
    bankOffers: [
      "Get 10% instant discount on ICICI Credit Cards",
      "Get 5% instant discount on SBI Credit Cards",
      "No Cost EMI on select cards",
    ],
    coupons: [{ title: "First Time Here?", offer: "Get 10% OFF", code: "WELCOME10" }],
    gallery: [
      { src: `${IMG}/product-1.webp`, alt: "Radiate Vitamin C Serum 30 ml pump bottle with its carton", width: 1080, height: 1080 },
      { src: `${IMG}/product-2.webp`, alt: "6 ways Radiate transforms your skin: brightens, firms, hydrates, non-oily, for men and women", width: 1080, height: 1080 },
      { src: `${IMG}/product-3.webp`, alt: "3 simple steps: apply to clean skin, massage in, use morning and night", width: 1080, height: 1080 },
      { src: `${IMG}/product-4.webp`, alt: "Key actives: Hyaluronic Acid and Vitamin C", width: 1080, height: 1080 },
      { src: `${IMG}/product-5.webp`, alt: "Choose your pack: 1, 3, 6 or 12 months", width: 1080, height: 1080 },
      { src: `${IMG}/product-6.webp`, alt: "Radiate Vitamin C Serum on a podium with key features listed", width: 1080, height: 1080 },
    ],
    trustRow: [
      { icon: "payment", label: "Secure Payment" },
      { icon: "return", label: "1-Day Return" },
      { icon: "shipping", label: "Free Shipping" },
    ],
    accordions: [
      {
        title: "Description",
        body: [
          "Vitamin C serum designed to brighten dull-looking skin, improve glow and support a firmer, youthful-looking appearance.",
          "Lightweight and non-oily, it absorbs quickly and suits both men and women.",
        ],
      },
      {
        title: "Ingredients",
        body: [
          "Ethyl Ascorbic Acid (Vitamin C derivative), Niacinamide, Hyaluronic Acid, Centella Asiatica and Alpha Arbutin.",
        ],
      },
      {
        title: "How To Use",
        body: [
          "1. Cleanse your face and apply the serum to clean skin.",
          "2. Apply evenly and gently massage until absorbed.",
          "3. Use twice daily — morning and evening. Follow with sunscreen in the day.",
        ],
      },
      {
        title: "Benefits",
        body: [
          "Brightens dull-looking skin · Helps reduce dark spots · Boosts radiance · Supports firmer-looking skin · Hydrates · Lightweight and non-oily.",
        ],
      },
    ],
  },

  trustStrip: [
    { icon: "sparkles", title: "Brightening Care", text: "Helps improve dull-looking skin" },
    { icon: "sun", title: "Radiance Boost", text: "Supports a fresher, brighter appearance" },
    { icon: "shield", title: "Pigmentation Care", text: "Helps reduce the appearance of dark spots" },
    { icon: "droplet", title: "Hydration", text: "Helps maintain hydrated-looking skin" },
    { icon: "calendar", title: "Daily Use", text: "Designed for morning & evening use" },
  ],

  concerns: {
    eyebrow: "Concern specific",
    title: "Dull Skin? Bring Back Your Radiance.",
    video: video("section-2", "Radiate Vitamin C Serum bottle surrounded by orange peel"),
    items: [
      { title: "Dull-looking skin", ingredients: "Vitamin C + Alpha Arbutin", body: "Helps brighten the appearance of dull skin." },
      { title: "Uneven skin tone", ingredients: "Vitamin C + Niacinamide", body: "Helps improve the appearance of uneven tone." },
      { title: "Dark spots", ingredients: "Vitamin C + Alpha Arbutin", body: "Helps reduce the appearance of pigmentation over time." },
      { title: "Early ageing concerns", ingredients: "Vitamin C + Hyaluronic Acid", body: "Supports a smoother, hydrated, youthful-looking appearance." },
    ],
  },

  benefits: {
    eyebrow: "Efficacy shield",
    title: "6 Ways Vitamin C Supports Your Skin",
    mobileTitle: "6 Ways Vitamin C Supports Skin",
    image: { src: `${IMG}/section-3-image.webp`, alt: "Woman holding Radiate Vitamin C Serum in a warm orange room", width: 941, height: 1672 },
    video: video("section-3-bg", ""),
    items: [
      { title: "Brightens Dull-Looking Skin", mobileTitle: "Brightens Dull Skin", body: "Helps improve the appearance of tired, dull skin.", mobileBody: "Helps improve the appearance of tired, dull skin." },
      { title: "Helps Reduce Dark Spots", mobileTitle: "Helps Reduce Spots", body: "Supports a more even-looking complexion over time.", mobileBody: "Supports a more even-looking complexion." },
      { title: "Boosts Skin Radiance", mobileTitle: "Boosts Radiance", body: "Helps skin appear fresher and more radiant.", mobileBody: "Helps skin appear fresher and more glowing." },
      { title: "Supports Firmer-Looking Skin", mobileTitle: "Supports Firmer Skin", body: "Designed to support a smoother, youthful-looking appearance.", mobileBody: "Designed to support a smooth, bouncy texture." },
      { title: "Deeply Hydrating", mobileTitle: "Deeply Hydrating", body: "Hyaluronic Acid helps maintain skin hydration.", mobileBody: "Hyaluronic Acid helps retain skin moisture." },
      { title: "Lightweight & Non-Oily", mobileTitle: "Lightweight Formula", body: "Absorbs quickly without leaving a greasy or sticky feel.", mobileBody: "Absorbs quickly without sticky residue." },
    ],
  },

  ingredients: {
    eyebrow: "Ingredient biome",
    title: "5 Actives. One Radiance-Focused Formula.",
    mobileTitle: "5 Actives. One Formula.",
    hero: {
      badge: "Hero active ingredient",
      name: "Ethyl Ascorbic Acid",
      subtitle: "Vitamin C Derivative",
      body: "Brightening-focused Vitamin C derivative designed to improve the appearance of dull skin and support a more radiant complexion.",
      video: video("section-4-ethyl-ascorbic-acid", ""),
    },
    supporting: [
      { name: "Niacinamide", role: "Skin barrier support", mobileRole: "Skin barrier support", body: "Helps improve the appearance of uneven skin tone while supporting overall skin condition." },
      { name: "Hyaluronic Acid", role: "Supercharged moisture", mobileRole: "Moisture lock", body: "Helps attract and retain moisture for hydrated, smoother-looking skin." },
      { name: "Centella Asiatica", role: "Skin soother & conditioner", mobileRole: "Skin soother & conditioner", body: "Supports skin comfort and conditioning." },
      { name: "Alpha Arbutin", role: "Intense brightening", mobileRole: "Spot correction", body: "Brightening-focused ingredient that helps improve the appearance of dark spots and uneven tone." },
    ],
  },

  formula: {
    eyebrow: "Efficacy & synergy",
    title: "More Than Just Vitamin C.",
    intro: "A multi-active pathway designed to target dullness from every angle while caring for your skin barrier.",
    stages: [
      { label: "Brighten", active: "Ethyl Ascorbic Acid", secondary: "+ Alpha Arbutin", body: "Brightening-focused actives help improve dullness and the appearance of uneven tone." },
      { label: "Even", active: "Niacinamide", secondary: "+ Alpha Arbutin", body: "Support a more even-looking complexion and pigmentation care." },
      { label: "Hydrate", active: "Hyaluronic Acid", body: "Helps maintain skin hydration for smoother-looking skin." },
      { label: "Soothe & condition", active: "Centella Asiatica", secondary: "Cica Extract", body: "Supports skin comfort and conditioning." },
    ],
  },

  results: {
    eyebrow: "Clinical expectations",
    title: "Your Radiance Builds With Consistency.",
    intro: "Skincare is a journey. Here is what you can expect, week over week, with consistent use.",
    compare: {
      eyebrow: "Visual progression",
      title: "Before vs After 5 Weeks",
      body: "How skin can look at the start and after five weeks of consistent daily use.",
      before: { src: `${IMG}/before.webp`, alt: "Before: dull, uneven-looking skin when starting the serum", width: 1200, height: 800 },
      after: { src: `${IMG}/after.webp`, alt: "After 5 weeks: brighter, more even-looking skin", width: 1200, height: 800 },
      beforeLabel: "Before",
      afterLabel: "After 5 Weeks",
      beforeCaption: "Dull, uneven-looking skin when starting the serum.",
      afterCaption: "Brighter, more even-looking skin after consistent daily use.",
    },
    checkpoints: [
      { week: "2 Weeks", title: "Skin looks brighter" },
      { week: "4 Weeks", title: "Improved-looking tone & texture" },
      { week: "4–6 Weeks", title: "More radiant, even-looking skin" },
    ],
    note: "Individual results may vary. Consistent use is key.",
  },

  howToUse: {
    eyebrow: "Application",
    title: "3 Simple Steps to Radiant Skin",
    steps: [
      { title: "Apply to Clean Skin", body: "Cleanse your face and apply the serum to clean skin.", video: video("section-7-video-1", "Step 1: applying the serum to clean skin") },
      { title: "Gently Massage In", body: "Apply evenly and gently massage until absorbed.", video: video("section-7-video-2", "Step 2: massaging the serum in") },
      { title: "Use Morning & Night", body: "Use twice daily — morning and evening — for best results.", video: video("section-7-video-3", "Step 3: morning and night routine") },
    ],
    callout: { title: "New to Vitamin C or have sensitive skin?", body: "Start once daily and gradually increase as tolerated." },
  },

  morningRoutine: {
    eyebrow: "Daily companion",
    title: "Make Vitamin C Your Morning Essential.",
    intro: "Vitamin C is an antioxidant, which makes it a natural fit for your morning routine — followed by sunscreen.",
    image: { src: `${IMG}/section-8-image.webp`, alt: "Radiate Vitamin C Serum bottle with a serum droplet", width: 941, height: 1672 },
    background: { src: `${IMG}/section-8-bg.webp`, alt: "", width: 1728, height: 1071 },
    // TODO(content): Figma badge says "Shielded with amber glass" but the bottle is frosted clear glass. Neutral copy until confirmed.
    badge: "Your AM core step",
    steps: [
      { label: "AM prep", name: "Cleanse" },
      { label: "Recommended treatment", name: "Radiate Vitamin C Serum", core: true },
      { label: "Lock & hydrate", name: "Moisturise" },
      { label: "UV defence", name: "Protect SPF 50" },
    ],
    note: "Pair with daily sunscreen for a complete daytime skincare routine.",
  },

  amPm: {
    eyebrow: "Chrono-cosmetics",
    title: "One Serum. Two Moments.",
    intro: "Where Radiate fits into your morning and evening skincare.",
    routines: [
      {
        id: "am",
        tab: "Morning Routine",
        title: "Morning Routine",
        badge: "AM",
        steps: [{ name: "Cleanse" }, { name: "Radiate Vitamin C Serum", highlight: true }, { name: "Moisturiser" }, { name: "Sunscreen", highlight: true }],
      },
      {
        id: "pm",
        tab: "Evening Routine",
        title: "Evening Routine",
        badge: "PM",
        steps: [{ name: "Cleanse" }, { name: "Radiate Vitamin C Serum", highlight: true }, { name: "Moisturiser" }],
      },
    ],
    tip: { lead: "Dermatologist tip:", body: "Avoid layering with strong exfoliating acids at the same time unless advised by a dermatologist." },
  },

  ugc: {
    eyebrow: "Community insight",
    title: "See Radiate In Real Routines",
    intro: "Real routines, application and texture, from people using Radiate every day.",
    // TODO(content): names and photos come from the Figma mock. Replace with real, consented UGC (ideally short reels) before launch.
    items: [
      { tag: "Application", name: "Shreya M.", image: { src: `${IMG}/ugc/application.webp`, alt: "Woman applying a serum", width: 560, height: 980 } },
      { tag: "Texture", name: "Close-up swatch", image: { src: `${IMG}/ugc/texture.webp`, alt: "Close-up of serum texture and droplets", width: 560, height: 980 } },
      { tag: "Morning routine", name: "Aman K.", image: { src: `${IMG}/ugc/morning-routine.webp`, alt: "Morning skincare flat-lay with oranges", width: 560, height: 980 } },
      { tag: "Male user", name: "Vikram S.", image: { src: `${IMG}/ugc/male-user.webp`, alt: "Man touching his face after applying serum", width: 560, height: 980 } },
      { tag: "Female user", name: "Nisha R.", image: { src: `${IMG}/ugc/female-user.webp`, alt: "Woman holding a small serum bottle", width: 560, height: 980 } },
    ],
  },

  radianceTimeline: {
    eyebrow: "Journey to glow",
    title: "Your Skin's Radiance Timeline",
    intro: "Consistent application supports a healthy-looking skin barrier and gradually reveals brighter, more radiant-looking skin.",
    progress: 71,
    milestones: [
      { node: "W1", tag: "Routine", title: "Routine Foundation", body: "Serum becomes part of your daily routine.", reached: true },
      { node: "W2", tag: "Brightness", title: "Initial Brightness", body: "Skin looks brighter.", reached: true },
      { node: "W4", tag: "Tone", title: "Tone & Texture", body: "Visible improvement in tone & texture.", reached: true },
      { node: "W6", tag: "Radiance", title: "Lasting Radiance", body: "More radiant, even-looking complexion.", reached: false },
    ],
    note: "Note: Skincare results are subjective. Consistent morning and evening use gives the best experience.",
  },

  authority: {
    eyebrow: "Established in 1986",
    title: "Everyday Skincare. Backed by Hair & Skin Expertise.",
    image: { src: `${IMG}/clinic.webp`, alt: "Reception of a Berkowits Luxe Hair & Skin Clinic", width: 1200, height: 967 },
    body: "Berkowits brings decades of hair & skin expertise into everyday skincare. Radiate is part of the Berkowits skincare range designed around targeted everyday skin concerns.",
    stats: [
      { value: "38+ Years", label: "Clinical Expertise" },
      { value: "45+ Clinics", label: "Nationwide" },
      { value: "Clinic-Backed", label: "Brand" },
      { value: "Specialists", label: "Hair & Skin" },
    ],
  },

  bundle: {
    eyebrow: "Better together",
    title: "Complete Your Vitamin C Routine",
    intro: "Layer complementary formulas designed to prep, treat and defend.",
    mobileIntro: "Bundle the formulas that work best with your serum.",
    cta: "Build your routine",
    items: [
      {
        id: "radiate-facewash",
        step: "Step 01: Cleanse",
        slug: "radiate-skin-brightening-facewash-with-niacinamide-and-shea-butter-for-glowing-and-younger-skin-100gm/7540889747546",
        name: "Radiate Skin Brightening Facewash",
        descriptor: "Cleanse + Prep (100 g)",
        price: 499,
        inStock: false, // berkowits.com shows it out of stock (20 Oct 2026)
        image: { src: "/images/pdp/products/radiate-cleanser.webp", alt: "Radiate facewash pump bottle", width: 900, height: 514 },
      },
      {
        id: "radiate-vitamin-c-serum",
        step: "Step 02: Treat",
        slug: "radiate-vitamin-c-serum-for-men-women/7540888535130",
        name: "Radiate Vitamin C Serum",
        descriptor: "Brighten + Radiance (30 ml)",
        price: UNIT_PRICE,
        image: { src: `${IMG}/product-1.webp`, alt: "Radiate Vitamin C Serum bottle", width: 1080, height: 1080 },
      },
      {
        id: "protect-spf50",
        step: "Step 03: Defend",
        slug: "protect-sunscreen-gel-for-all-skin-types-spf-50-pa-60gm/7540884668506",
        name: "Protect Sunscreen Gel SPF 50",
        descriptor: "Daily UV Protection (60 g)",
        price: 890,
        image: { src: "/images/pdp/products/protect-spf50.webp", alt: "Protect Sunscreen SPF 50 tube", width: 900, height: 514 },
      },
    ],
  },

  details: {
    title: "Product Details",
    video: video("section-14-product-360", "360° view of the Radiate Vitamin C Serum bottle"),
    specs: [
      { label: "Volume", value: "30 ml" },
      { label: "Usage", value: "Twice daily — morning and evening." },
      { label: "Texture", value: "Lightweight and non-oily." },
    ],
    suitableFor: ["Dull skin", "Tired-looking skin", "Uneven skin tone", "Pigmentation concerns", "Early ageing concerns"],
    keyIngredients: ["Ethyl Ascorbic Acid", "Niacinamide", "Hyaluronic Acid", "Centella Asiatica", "Alpha Arbutin"],
    overviewTitle: "Product Overview",
    overview: "Vitamin C serum designed to brighten dull-looking skin, improve glow and support a firmer, youthful-looking appearance.",
  },

  recommendations: {
    eyebrow: "Discover more",
    title: "You May Also Like",
    items: [
      {
        id: "radiate-brightening-serum",
        slug: "radiate-skin-brightening-face-serum-for-glowing-skin-30ml/7540889649242",
        name: "Radiate Skin Brightening Serum",
        descriptor: "For pigmentation + uneven tone",
        price: 1625,
        image: { src: "/images/pdp/products/radiate-skin-brightening-serum.webp", alt: "Radiate Skin Brightening Serum bottle", width: 800, height: 800 },
      },
      {
        id: "protect-spf50",
        slug: "protect-sunscreen-gel-for-all-skin-types-spf-50-pa-60gm/7540884668506",
        name: "Protect Sunscreen Gel SPF 50",
        descriptor: "For daily UV protection",
        price: 890,
        image: { src: "/images/pdp/products/protect-spf50.webp", alt: "Protect Sunscreen SPF 50 tube", width: 900, height: 514 },
      },
      {
        id: "radiate-facewash",
        slug: "radiate-skin-brightening-facewash-with-niacinamide-and-shea-butter-for-glowing-and-younger-skin-100gm/7540889747546",
        name: "Radiate Skin Brightening Facewash",
        descriptor: "For cleansing + routine prep",
        price: 499,
        inStock: false,
        image: { src: "/images/pdp/products/radiate-cleanser.webp", alt: "Radiate facewash pump bottle", width: 900, height: 514 },
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      { question: "What is Berkowits Radiate Vitamin C Serum used for?", answer: "It is used to brighten skin, improve glow, reduce dullness and support collagen for firmer, youthful-looking skin." },
      { question: "Who should use this serum?", answer: "Anyone with dull, tired, uneven skin tone, early ageing signs or pigmentation concerns." },
      { question: "How often should I use the Vitamin C serum?", answer: "Twice daily — morning and evening — on cleansed skin." },
      { question: "Can it be used on sensitive skin?", answer: "Yes, but sensitive-skin users should start once daily and increase gradually." },
      { question: "Does it help with dark spots and pigmentation?", answer: "Yes, it helps lighten dark spots and even out skin tone over time." },
      { question: "Will it make my skin oily or sticky?", answer: "No. It has a lightweight, non-oily texture that absorbs quickly." },
      { question: "Can I use it along with sunscreen?", answer: "Yes. It works best when paired with daily sunscreen use." },
      { question: "Can men use this serum?", answer: "Yes. It is suitable for both men and women." },
      { question: "When will I see visible results?", answer: "Skin looks brighter within 2 weeks, with visible improvement in tone and texture in 4–6 weeks." },
      { question: "Can I use it with other serums or actives?", answer: "Yes, but avoid layering it with strong exfoliating acids at the same time unless advised by a dermatologist." },
    ],
  },

  closing: {
    title: "Your Brightest Skin Starts Today.",
    body: [
      "Powered by 5 actives — Ethyl Ascorbic Acid, Niacinamide, Hyaluronic Acid, Centella Asiatica & Alpha Arbutin.",
      "Brighter, more radiant-looking skin with consistent daily use.",
    ],
    mobileBody: "Powered by 5 actives — Ethyl Ascorbic Acid, Niacinamide, Hyaluronic Acid, Centella Asiatica & Alpha Arbutin.",
    video: video("last-section-bg", ""),
  },
};
