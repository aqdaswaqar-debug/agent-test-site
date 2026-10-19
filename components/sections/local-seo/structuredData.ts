import type { LocalSeoPage } from "./types";

/** JSON-LD graph for a local SEO page: MedicalClinic + FAQPage + BreadcrumbList (SEO page playbook). */
export function buildStructuredData(page: LocalSeoPage, pageUrl: string, siteUrl: string) {
  const { clinic } = page;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${pageUrl}#clinic`,
        name: clinic.name,
        url: pageUrl,
        telephone: clinic.phoneTel,
        email: clinic.email,
        image: `${siteUrl}${page.photos.items[0]?.src ?? ""}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.streetAddress,
          addressLocality: clinic.locality,
          addressRegion: clinic.region,
          postalCode: clinic.postalCode,
          addressCountry: "IN",
        },
        areaServed: page.local.areas.map((name) => ({ "@type": "Place", name })),
        parentOrganization: { "@type": "Organization", name: "Berkowits Hair & Skin Clinic", url: "https://berkowits.com" },
        hasMap: clinic.mapsUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faq.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: `Hair loss treatment in ${page.areaName}`, item: pageUrl },
        ],
      },
    ],
  };
}
