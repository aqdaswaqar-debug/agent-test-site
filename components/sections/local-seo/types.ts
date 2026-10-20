import type { BookableClinic } from "@/lib/lead";

/** Content model for one local SEO page (Figma "Local SEO Pages", P01–P25 share this template). */

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type Clinic = {
  name: string;
  shortName: string;
  streetAddress: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string;
  fullAddress: string;
  /** Address line used in the footer: street + city + PIN, without the locality. */
  shortAddress: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  hoursDisplay: string;
  opens: string;
  closes: string;
  nearestMetro: string;
  metroShort: string;
  mapsUrl: string;
  /** What the embedded map searches for: the clinic's Google Maps listing (name + area), not a street guess. */
  mapQuery: string;
  /** Clinic value the lead form books (must be in BOOKABLE_CLINICS). */
  bookingName: BookableClinic;
};

export type Treatment = { name: string; summary: string; mobileSummary: string; image: ImageAsset };
export type Card = { title: string; body: string; mobileTitle?: string; mobileBody?: string };
export type Stat = { value: string; title: string; body: string; mobileTitle?: string };
export type Step = { title: string; body: string; mobileBody?: string };
export type TimelineRow = {
  period: string;
  title: string;
  body: string;
  progress: number;
  mobilePeriod?: string;
  mobileTitle?: string;
};
export type Faq = { question: string; answer: string; mobileAnswer?: string };

export type LocalSeoPage = {
  slug: string;
  areaName: string;
  seo: { title: string; description: string };
  clinic: Clinic;
  nav: { label: string; href: string }[];
  hero: {
    tag: string;
    title: string;
    intro: string;
    mobileIntro: string;
    chips: string[];
    mobileChips: string[];
    image: ImageAsset;
    cardLabel: string;
    cardTitle: string;
    cardSubtitle: string;
  };
  whoItIsFor: { eyebrow: string; title: string; intro: string; cards: Card[] };
  treatments: {
    eyebrow: string;
    title: string;
    mobileTitle: string;
    intro: string;
    mobileIntro: string;
    groups: { label: string; note: string; items: Treatment[] }[];
    footnote: string;
    mobileFootnote: string;
    grow: { eyebrow: string; title: string; body: string; mobileBody: string; cta: string; href: string };
  };
  why: { eyebrow: string; title: string; intro: string; stats: Stat[] };
  process: {
    eyebrow: string;
    title: string;
    mobileTitle: string;
    steps: Step[];
    costTitle: string;
    cost: { value: string; label: string }[];
    mobileCost: { value: string; label: string }[];
    costNote: string;
    mobileCostNote: string;
  };
  results: { eyebrow: string; title: string; intro: string; note: string; mobileNote: string; rows: TimelineRow[] };
  medicalDirector: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    badgeTitle: string;
    badgeSubtitle: string;
    paragraphs: [string, string];
    mobileParagraph: string;
    stats: { value: string; label: string; mobileLabel?: string }[];
    image: ImageAsset;
  };
  local: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    mobileParagraph: string;
    areasTitle: string;
    areas: string[];
  };
  photos: { eyebrow: string; title: string; cta: string; items: ImageAsset[] };
  faq: { title: string; intro: string; items: Faq[] };
  booking: { title: string; intro: string; mobileIntro: string };
  footer: { disclaimer: string };
};
