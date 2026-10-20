/** Header and footer navigation, pointing at the live berkowits.com pages (collected 20 Oct 2026). */

/** Live store the test pages link to. */
export const BERKOWITS = "https://berkowits.com";
const B = BERKOWITS;

export const productUrl = (slug: string) => `${B}/products/${slug}`;

export const SITE = {
  home: B,
  phoneDisplay: "+91 77388 78880",
  phoneTel: "+917738878880",
  email: "inquiry@berkowits.in",
  // TODO(content): the Figma footer shows "AAA House 64, near Modi Mill…" without city/PIN; confirm the full address.
  address: "AAA House 64, near Modi Mill, Okhla Phase III, Okhla Industrial Estate, New Delhi",
  addressMap: "https://www.google.com/maps/search/?api=1&query=AAA%20House%2064%2C%20Okhla%20Phase%20III%2C%20New%20Delhi",
  login: `${B}/`,
};

export const NAV = [
  { label: "AI Tools", href: `${B}/ai-tools` },
  { label: "Products", href: `${B}/collections`, active: true },
  { label: "Concerns", href: `${B}/concerns` },
  { label: "Treatments", href: `${B}/treatments` },
  { label: "Contact Us", href: `${B}/contact-us` },
];

/** Footer columns follow the Figma/live footer labels; targets are the live berkowits.com pages. */
export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Clinic Near By", href: "https://app.berkowits.com/cma/" },
      { label: "Careers", href: "https://in.linkedin.com/company/berkowits-clinic" },
      { label: "Blog", href: `${B}/blogs` },
      { label: "AI Tools", href: `${B}/ai-tools` },
      { label: "Contact Us", href: `${B}/contact-us` },
    ],
  },
  {
    title: "Hair Care",
    links: [
      { label: "Hair Fall Control", href: `${B}/collections/shop-hair` },
      { label: "Anti-Dandruff", href: `${B}/collections/shop-hair` },
      { label: "Hair Growth", href: `${B}/collections/shop-hair` },
      { label: "Scalp Care", href: `${B}/collections/shop-hair` },
      { label: "Hair Clinics", href: `${B}/location?category=hair` },
    ],
  },
  {
    title: "Skin Care",
    links: [
      { label: "Face Serums", href: `${B}/collections/face-serums` },
      { label: "Moisturisers", href: `${B}/collections/creams-moisturizers` },
      { label: "Sunscreen", href: `${B}/collections/sun-protection` },
      { label: "Body Care", href: `${B}/collections/body-care` },
      { label: "Skin Clinics", href: `${B}/location?category=skin` },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Returns Policy", href: `${B}/return-and-replacement-policy` },
      { label: "Refund Policy", href: `${B}/refund-policy` },
      { label: "Shipping Info", href: `${B}/shipping-policy` },
      { label: "FAQ", href: "#faq" },
      { label: "Consultation", href: `${B}/contact-us` },
    ],
  },
];

export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/berkowitsclinic/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@BerkowitsClinic", icon: "youtube" },
  { label: "Facebook", href: "https://www.facebook.com/BerkowitsHairAndSkinClinic/", icon: "facebook" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/berkowits-clinic", icon: "linkedin" },
  { label: "X", href: "https://x.com/BerkowitsClinic", icon: "x" },
] as const;

export const LEGAL = [
  { label: "Privacy Policy", href: `${B}/privacy-policy` },
  { label: "Terms of Use", href: `${B}/terms-and-condition` },
  { label: "Cookie Policy", href: `${B}/cookie-policy` },
];

/** Callback form options. TODO(content): confirm the treatment and city lists (Figma dropdowns are empty). */
export const CALLBACK_TREATMENTS = ["Hair loss", "Hair transplant", "Dandruff & scalp", "Acne & scars", "Pigmentation", "Skin brightening", "Anti-ageing", "Other"];
export const CALLBACK_CITIES = ["Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Other"];
