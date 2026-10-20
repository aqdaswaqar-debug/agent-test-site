import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import { galleryUrl } from "./shared-data";
import type { Img } from "./types";

/** Metadata for a gallery page (test deployment: noindex so it never competes with berkowits.com). */
export function galleryMetadata({ slug, title, description, image }: { slug?: string; title: string; description: string; image: Img }): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${galleryUrl(slug)}`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Berkowits Hair & Skin Clinic", locale: "en_IN", images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
    robots: { index: false, follow: false },
  };
}

/** BreadcrumbList JSON-LD: Home › Transformation Gallery › <page>. */
export function galleryBreadcrumbs(page?: { slug: string; name: string }) {
  const siteUrl = getSiteUrl();
  const items = [
    { name: "Home", item: "https://berkowits.com/" },
    { name: "Transformation Gallery", item: `${siteUrl}${galleryUrl()}` },
    ...(page ? [{ name: page.name, item: `${siteUrl}${galleryUrl(page.slug)}` }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, ...it })),
  };
}
