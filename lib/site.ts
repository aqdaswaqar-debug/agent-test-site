/**
 * Absolute site URL for canonical links, Open Graph and JSON-LD.
 * Order: explicit NEXT_PUBLIC_SITE_URL → Vercel's production domain (system env, build time) → local dev.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Serialise JSON-LD safely for a <script> tag (escapes "<" so content can't close the tag). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
