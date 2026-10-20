/** Content model shared by the Transformation Gallery hub and its treatment pages. */

export type Img = { src: string; alt: string; width: number; height: number };

/** One before/after result: two separate portrait photos (zip exports are 211 × 396). */
export type ResultPair = { before: string; after: string; alt: string };

export type Stat = { value: string; label: string; star?: boolean };

export type Review = { name: string; text: string; rating: number };

/** A Berkowits YouTube video: plays in a popup player; `href` is the no-JS fallback. */
export type VideoStory = { title: string; youtubeId: string; thumb: Img; href: string };

/** The five gallery categories (hub cards, routes, callback preselect). */
export type Category = {
  slug: string;
  label: string;
  card: Img;
  /** Option preselected in the footer callback form (must exist in CALLBACK_TREATMENTS). */
  treatment: string;
};
