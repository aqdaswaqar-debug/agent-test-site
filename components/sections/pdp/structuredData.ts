import { BERKOWITS, productUrl } from "@/components/ui/site/site-links";
import type { PdpContent } from "./types";

/**
 * Product + FAQPage + BreadcrumbList JSON-LD. The offer mirrors the live 1 Month Pack price.
 * aggregateRating is left out on purpose: reviews are not shown on this page yet, and Google requires
 * the rating to come from reviews visible to visitors.
 */
export function buildPdpStructuredData(content: PdpContent, pageUrl: string, siteUrl: string) {
  const p = content.product;
  const pack = p.packs[0]!;
  const abs = (path: string) => new URL(path, siteUrl).toString();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: p.name,
        description: p.lead,
        image: p.gallery.slice(0, 3).map((g) => abs(g.src)),
        brand: { "@type": "Brand", name: "Berkowits" },
        sku: p.id,
        url: productUrl(p.slug),
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: pack.price,
          availability: "https://schema.org/InStock",
          url: productUrl(p.slug),
          seller: { "@type": "Organization", name: "Berkowits Hair & Skin Clinic" },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BERKOWITS}/` },
          { "@type": "ListItem", position: 2, name: "Radiate", item: `${BERKOWITS}/collections/radiate` },
          { "@type": "ListItem", position: 3, name: p.name, item: pageUrl },
        ],
      },
    ],
  };
}
