import type { Metadata } from "next";
import { PdpPageView } from "@/components/sections/pdp/PdpPageView";
import { radiateVitaminC as content } from "@/components/sections/pdp/radiate-vitamin-c";
import { buildPdpStructuredData } from "@/components/sections/pdp/structuredData";
import { getSiteUrl, jsonLd } from "@/lib/site";

const siteUrl = getSiteUrl();
const pageUrl = `${siteUrl}/test/products/radiate-vitamin-c-serum`;
const title = "Radiate Vitamin C Serum for Men & Women – 30 ml | Berkowits";
const description =
  "Lightweight Vitamin C serum with Ethyl Ascorbic Acid, Niacinamide, Hyaluronic Acid, Centella Asiatica and Alpha Arbutin to brighten dull-looking skin and boost radiance.";
const ogImage = content.product.gallery[0]!;

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title,
    description,
    siteName: "Berkowits Hair & Skin Clinic",
    locale: "en_IN",
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.src] },
  // Test deployment: keep it out of search results so it never competes with the live berkowits.com product page.
  robots: { index: false, follow: false },
};

export default function RadiateVitaminCSerumPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildPdpStructuredData(content, pageUrl, siteUrl)) }} />
      <PdpPageView content={content} />
    </>
  );
}
