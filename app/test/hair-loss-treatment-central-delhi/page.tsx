import type { Metadata } from "next";
import { centralDelhi as page } from "@/components/sections/local-seo/central-delhi";
import { LocalSeoPageView } from "@/components/sections/local-seo/LocalSeoPageView";
import { buildStructuredData } from "@/components/sections/local-seo/structuredData";
import { getSiteUrl, jsonLd } from "@/lib/site";

const siteUrl = getSiteUrl();
const pageUrl = `${siteUrl}/test/${page.slug}`;

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: page.seo.title,
  description: page.seo.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: page.seo.title,
    description: page.seo.description,
    siteName: "Berkowits Hair & Skin Clinic",
    locale: "en_IN",
    images: [{ url: page.hero.image.src, width: page.hero.image.width, height: page.hero.image.height, alt: page.hero.image.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.seo.title,
    description: page.seo.description,
    images: [page.hero.image.src],
  },
  // Test deployment: keep it out of search results so it never competes with the real berkowits.com page.
  // Remove this when the page moves to the real site.
  robots: { index: false, follow: false },
};

export default function CentralDelhiHairLossPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildStructuredData(page, pageUrl, siteUrl)) }} />
      <LocalSeoPageView page={page} />
    </>
  );
}
