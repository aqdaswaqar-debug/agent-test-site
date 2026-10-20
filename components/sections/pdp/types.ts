/** Content model for a Berkowits product detail page (Figma "Berkowits 2 New Page Design", PDP template). */

export type Media = { src: string; alt: string; width: number; height: number };
export type Video = { src: string; poster: string; label: string };

export type Pack = {
  id: string;
  label: string;
  /** Number of bottles in the pack (multiplies price and MRP). */
  units: number;
  price: number;
  mrp: number;
  recommended?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Short line under the name on cards. */
  descriptor: string;
  price: number;
  image: Media;
};

export type HeadingCopy = { eyebrow: string; title: string; mobileTitle?: string; intro?: string; mobileIntro?: string };

export type PdpContent = {
  product: {
    id: string;
    slug: string;
    name: string;
    title: [string, string];
    lead: string;
    chips: string[];
    rating: { value: number; label: string; boughtLabel: string };
    packs: Pack[];
    bankOffers: string[];
    coupons: { title: string; offer: string; code: string }[];
    gallery: Media[];
    trustRow: { icon: "payment" | "return" | "shipping"; label: string }[];
    accordions: { title: string; body: string[] }[];
    volume: string;
  };
  trustStrip: { icon: "sparkles" | "sun" | "shield" | "droplet" | "calendar"; title: string; text: string }[];
  concerns: HeadingCopy & {
    video: Video;
    items: { title: string; ingredients: string; body: string }[];
  };
  benefits: HeadingCopy & { image: Media; video: Video; items: { title: string; mobileTitle: string; body: string; mobileBody: string }[] };
  ingredients: HeadingCopy & {
    hero: { badge: string; name: string; subtitle: string; body: string; video: Video };
    supporting: { name: string; role: string; mobileRole: string; body: string }[];
  };
  formula: HeadingCopy & { stages: { label: string; active: string; secondary?: string; body: string }[] };
  results: HeadingCopy & {
    compare: { eyebrow: string; title: string; body: string; before: Media; after: Media; beforeLabel: string; afterLabel: string; beforeCaption: string; afterCaption: string };
    checkpoints: { week: string; title: string }[];
    note: string;
  };
  howToUse: HeadingCopy & {
    steps: { title: string; body: string; video: Video }[];
    callout: { title: string; body: string };
  };
  morningRoutine: HeadingCopy & {
    image: Media;
    background: Media;
    badge: string;
    steps: { label: string; name: string; core?: boolean }[];
    note: string;
  };
  amPm: HeadingCopy & {
    routines: { id: "am" | "pm"; tab: string; title: string; badge: string; steps: { name: string; highlight?: boolean }[] }[];
    tip: { lead: string; body: string };
  };
  ugc: HeadingCopy & { items: { tag: string; name: string; image: Media }[] };
  radianceTimeline: HeadingCopy & {
    progress: number;
    milestones: { node: string; tag: string; title: string; body: string; reached: boolean }[];
    note: string;
  };
  authority: HeadingCopy & { image: Media; body: string; stats: { value: string; label: string }[] };
  bundle: HeadingCopy & { items: (Product & { step: string })[]; cta: string };
  details: {
    title: string;
    video: Video;
    specs: { label: string; value: string }[];
    suitableFor: string[];
    keyIngredients: string[];
    overviewTitle: string;
    overview: string;
  };
  recommendations: HeadingCopy & { items: Product[] };
  faq: HeadingCopy & { items: { question: string; answer: string }[] };
  closing: { title: string; body: string[]; mobileBody: string; video: Video };
};
