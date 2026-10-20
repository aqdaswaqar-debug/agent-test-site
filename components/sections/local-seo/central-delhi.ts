import type { LocalSeoPage } from "./types";

const IMG = "/images/local-seo";

/** P01 · Central Delhi (Berkowits Bengali Market). Copy is taken verbatim from Figma frames 39:237 / 44:171. */
const MAP_QUERY = "Berkowits Hair & Skin Clinic, Bengali Market, New Delhi";

export const centralDelhi: LocalSeoPage = {
  slug: "hair-loss-treatment-central-delhi",
  areaName: "Central Delhi",
  seo: {
    title: "Hair Loss Treatment in Bengali Market, Near Connaught Place | Berkowits",
    description:
      "Free hair and scalp consultation at Berkowits Bengali Market, near Barakhamba Road metro. PRP, GFC, LLLT, QR678 and more, planned by trichologists. Open 10:00 AM – 7:00 PM.",
  },
  clinic: {
    name: "Berkowits Bengali Market",
    shortName: "Bengali Market",
    streetAddress: "12 Central Lane, near Lalit Hotel, Bengali Market",
    locality: "New Delhi",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110001",
    fullAddress: "12 Central Lane, near Lalit Hotel, Bengali Market, New Delhi, Delhi 110001",
    shortAddress: "12 Central Lane, near Lalit Hotel, New Delhi 110001",
    phoneDisplay: "+91 99996 66699",
    phoneTel: "+919999666699",
    bookingName: "Berkowits Bengali Market, Delhi",
    email: "inquiry@berkowits.in",
    hoursDisplay: "10:00 AM – 7:00 PM",
    opens: "10:00",
    closes: "19:00",
    nearestMetro: "Barakhamba Road (Blue Line)",
    metroShort: "Barakhamba Road",
    // Resolves to the "Berkowits Hair & Skin Clinic" Google listing at Bengali Market (checked by screenshot).
    // TODO(content): the street address above comes from Figma and doesn't match that listing; confirm the real one.
    mapQuery: MAP_QUERY,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  },
  nav: [
    { label: "Who it's for", href: "#who-it-is-for" },
    { label: "Treatments", href: "#treatments" },
    { label: "Your visit", href: "#your-visit" },
    { label: "Results", href: "#results" },
    { label: "Clinic", href: "#clinic" },
    { label: "FAQs", href: "#faqs" },
  ],
  hero: {
    tag: "Berkowits Bengali Market · Central Delhi",
    title: "Hair Loss Treatment in Bengali Market, Near Connaught Place",
    intro:
      "Noticing more hair fall, a thinner crown or a wider parting? Visit Berkowits at Bengali Market, a short walk from Barakhamba Road metro, for a free hair and scalp consultation with our trichologists.",
    mobileIntro:
      "More hair fall, a thinner crown or a wider parting? Visit Berkowits at Bengali Market, near Barakhamba Road metro, for a free hair and scalp consultation.",
    chips: ["Near Barakhamba Road Metro", "Men and women", "Open 10:00 AM – 7:00 PM"],
    mobileChips: ["Near Barakhamba Road Metro", "Men and women", "10:00 AM – 7:00 PM"],
    image: {
      src: `${IMG}/hero-scalp-assessment.webp`,
      alt: "Trichologist in blue gloves examining thinning hair at the crown during a scalp assessment",
      width: 1500,
      height: 1000,
    },
    cardLabel: "Your nearest clinic",
    cardTitle: "12 Central Lane, Bengali Market",
    cardSubtitle: "Near The Lalit · New Delhi 110001",
  },
  whoItIsFor: {
    eyebrow: "Who we see",
    title: "Hair loss doesn't look the same for everyone",
    intro:
      "From office-goers around Connaught Place to students near Mandi House, people visit our Bengali Market clinic with very different concerns. These are the ones we see most often.",
    cards: [
      {
        title: "Receding hairline and crown thinning",
        body: "The gradual pattern most men notice first, often running in families.",
        mobileTitle: "Receding hairline & crown thinning",
        mobileBody: "Gradual, often runs in families.",
      },
      {
        title: "A widening parting",
        body: "Overall thinning along the part line, common in women with hormonal changes or after pregnancy.",
        mobileBody: "Common with hormonal changes or after pregnancy.",
      },
      {
        title: "Sudden shedding",
        body: "Diffuse hair fall a few weeks after illness, stress, a crash diet or childbirth.",
        mobileBody: "Weeks after illness, stress, crash diets or childbirth.",
      },
      {
        title: "Coin-sized bald patches",
        body: "Smooth, round patches on the scalp or beard that can appear suddenly.",
        mobileBody: "Smooth, round patches that appear suddenly.",
      },
    ],
  },
  treatments: {
    eyebrow: "Our hair loss treatments",
    title: "Hair loss treatments at Berkowits Bengali Market",
    mobileTitle: "Hair loss treatments at Berkowits",
    intro:
      "Every plan starts with a scalp assessment. Sometimes a simple change in hair care brings good results; advanced hair loss needs clinical treatment. Your trichologist recommends what suits you — one treatment or a combination.",
    mobileIntro:
      "Sometimes a simple change in hair care helps; advanced hair loss needs clinical treatment. Your trichologist recommends one treatment or a combination.",
    groups: [
      {
        label: "Hair care & at-home",
        note: "For early hair fall and thinning",
        items: [
          {
            name: "RichFeel hair care",
            summary:
              "Targeted RichFeel shampoos, serums and scalp care that help manage hair fall and support healthier hair at home.",
            mobileSummary: "Shampoos, serums and scalp care to help manage hair fall at home.",
            image: {
              src: `${IMG}/treatment-richfeel-hair-care.webp`,
              alt: "Hair serum bottle with a wooden comb and brush",
              width: 800,
              height: 534,
            },
          },
          {
            name: "LLLT (low-level laser therapy)",
            summary: "A non-invasive, light-based hair fall treatment that supports the scalp and hair follicles.",
            mobileSummary: "Non-invasive, light-based support for the scalp and follicles.",
            image: {
              src: `${IMG}/treatment-lllt.webp`,
              alt: "Light-based scalp device being used on a woman's hair",
              width: 800,
              height: 534,
            },
          },
        ],
      },
      {
        label: "Advanced clinic treatments",
        note: "For moderate to advanced hair loss",
        items: [
          {
            name: "PRP hair treatment",
            summary: "Platelet-rich plasma prepared from your own blood and applied to thinning areas of the scalp.",
            mobileSummary: "Platelet-rich plasma from your own blood for thinning areas.",
            image: {
              src: `${IMG}/treatment-prp.webp`,
              alt: "Clinician applying a scalp treatment to a reclining patient",
              width: 800,
              height: 534,
            },
          },
          {
            name: "GFC hair treatment",
            summary: "Growth factor concentrate from your own blood, used for hair thinning and hair fall.",
            mobileSummary: "Growth factor concentrate for hair thinning and hair fall.",
            image: {
              src: `${IMG}/treatment-gfc.webp`,
              alt: "Blood sample tubes in a rack beside a petri dish and syringe",
              width: 800,
              height: 534,
            },
          },
          {
            name: "Bio-PRP",
            summary: "An advanced form of PRP therapy for hair loss, planned after your scalp assessment.",
            mobileSummary: "An advanced form of PRP, planned after your assessment.",
            image: {
              src: `${IMG}/treatment-bio-prp.webp`,
              alt: "Gloved hand placing a sample tube into a centrifuge",
              width: 800,
              height: 534,
            },
          },
          {
            name: "AMT (autologous micro-graft)",
            summary: "A minimally invasive hair loss treatment that uses micro-grafts from your own scalp.",
            mobileSummary: "Uses micro-grafts from your own scalp.",
            image: {
              src: `${IMG}/treatment-amt.webp`,
              alt: "Doctor examining a woman's hair and scalp",
              width: 800,
              height: 534,
            },
          },
          {
            name: "Exosome therapy",
            summary: "An exosome-based scalp treatment for hair thinning, often combined with other therapies.",
            mobileSummary: "Exosome-based scalp treatment, often combined with others.",
            image: {
              src: `${IMG}/treatment-exosome.webp`,
              alt: "Glass serum vial and dropper on a blue background",
              width: 800,
              height: 534,
            },
          },
          {
            name: "QR678 hair treatment",
            summary: "A hair growth factor formulation given as scalp injections for hair fall and thinning.",
            mobileSummary: "Hair growth factor formulation given as scalp injections.",
            image: {
              src: `${IMG}/treatment-qr678.webp`,
              alt: "Clinician giving a scalp treatment to a patient lying down",
              width: 800,
              height: 534,
            },
          },
        ],
      },
    ],
    footnote:
      "Microneedling and injectable techniques may be used along with these treatments. Treatment availability is confirmed at your consultation. Images are illustrative.",
    mobileFootnote:
      "Microneedling and injectable techniques may be used too. Availability confirmed at consultation. Images are illustrative.",
    grow: {
      eyebrow: "Can't visit the clinic right now?",
      title: "Start with an online AI hair analysis",
      body: "Take the Berkowits GROW hair analysis from home, then book your visit when you are ready.",
      mobileBody: "Take the Berkowits GROW hair analysis from home.",
      cta: "Take the online hair analysis",
      // TODO(content): confirm the GROW hair analysis URL; links to the Berkowits site for now.
      href: "https://berkowits.com",
    },
  },
  why: {
    eyebrow: "Why Berkowits",
    title: "Why choose Berkowits for hair loss treatment",
    intro:
      "Hair and skin care since 1988 — with a trichologist-led approach that looks at the cause of your hair loss before recommending anything.",
    stats: [
      { value: "38+", title: "Years of hair care", body: "Helping people with hair and scalp concerns since 1988." },
      { value: "45+", title: "Clinics in 19+ cities", body: "The same assessment-first approach at every Berkowits clinic." },
      { value: "1:1", title: "Trichologist-led assessment", body: "Every plan starts with a close look at your scalp and hair history." },
      { value: "Made for you", title: "No fixed packages", body: "One treatment or a combination, chosen for your hair." },
      {
        value: "RichFeel",
        title: "Care that continues at home",
        body: "Our own hair care range to support your treatment between visits.",
        mobileTitle: "Care continues at home",
      },
      { value: "Free", title: "First consultation", body: "Visit Bengali Market, near Barakhamba Road metro, at no cost." },
    ],
  },
  process: {
    eyebrow: "Your visit",
    title: "What happens at Berkowits Bengali Market",
    mobileTitle: "What happens at Bengali Market",
    steps: [
      {
        title: "Free consultation",
        body: "Talk to a trichologist about your hair history, routine and concerns.",
        mobileBody: "Talk to a trichologist about your hair history and concerns.",
      },
      {
        title: "Scalp & hair analysis",
        body: "A close look at your scalp and hair-loss pattern to understand the likely cause and stage.",
        mobileBody: "Understand the likely cause and stage.",
      },
      {
        title: "Your personalised plan",
        body: "A plan matched to the cause of your hair loss — one treatment or a combination.",
        mobileBody: "One treatment or a combination, made for you.",
      },
      {
        title: "Treatment sessions",
        body: "Done at the clinic, at a pace your trichologist sets for you.",
        mobileBody: "At a pace your trichologist sets.",
      },
      {
        title: "Home care & reviews",
        body: "A simple home-care routine and regular reviews to track how your hair responds.",
        mobileBody: "Track how your hair responds.",
      },
    ],
    costTitle: "Hair loss treatment cost",
    cost: [
      { value: "₹999", label: "starting price" },
      { value: "₹20,000", label: "maximum, depending on plan" },
      { value: "Free", label: "first consultation" },
      { value: "Made for you", label: "one treatment or a combination" },
    ],
    mobileCost: [
      { value: "₹999", label: "starting price" },
      { value: "₹20,000", label: "maximum, by plan" },
      { value: "Custom", label: "plan made for you" },
      { value: "Free", label: "first consultation" },
    ],
    costNote:
      "The final cost depends on the line of treatment chosen for you and the number of sessions. You get a clear estimate after your free consultation.",
    mobileCostNote:
      "Final cost depends on the line of treatment and number of sessions. Clear estimate after your free consultation.",
  },
  results: {
    eyebrow: "What to expect",
    title: "What to expect over the months",
    intro:
      "Hair grows slowly, so change happens step by step. This is how progress often looks when you follow your plan and home care.",
    note:
      "These timelines are indicative. Results vary from person to person and depend on the cause, the stage of hair loss and the treatment plan.",
    mobileNote:
      "Indicative only. Results vary from person to person and depend on the cause, stage and treatment plan.",
    rows: [
      {
        period: "First 1–2 months",
        title: "Settling in",
        body: "Hair fall often starts to slow as your scalp responds. Some people notice change sooner, some later.",
        progress: 33,
        mobilePeriod: "1–2 months",
        mobileTitle: "Hair fall starts to slow",
      },
      {
        period: "Around 3–4 months",
        title: "Early growth",
        body: "Fine new hairs may appear in thinning areas, and hair starts to feel healthier.",
        progress: 66,
        mobilePeriod: "3–4 months",
        mobileTitle: "Early new growth",
      },
      {
        period: "Around 6 months",
        title: "Visible progress",
        body: "Hair can look fuller and thicker with consistent care and regular follow-ups.",
        progress: 100,
        mobileTitle: "Fuller-looking hair",
      },
    ],
  },
  medicalDirector: {
    eyebrow: "Medical leadership",
    title: "Care guided by our Medical Director",
    name: "Dr. Anupriya Goel",
    role: "Medical Director — Berkowits Hair & Skin Clinic",
    badgeTitle: "Hair",
    badgeSubtitle: "Trichologists",
    paragraphs: [
      "Treatment protocols across Berkowits clinics, including Bengali Market, are set under the guidance of our Medical Director, Dr. Anupriya Goel. Every plan starts with a proper assessment, so you understand the cause of your hair loss before any treatment begins.",
      "At Bengali Market, our trichologists follow the same assessment-first approach used at every Berkowits clinic across India.",
    ],
    mobileParagraph:
      "Treatment protocols across Berkowits clinics, including Bengali Market, are set under the guidance of Dr. Anupriya Goel. Every plan starts with a proper assessment, so you understand the cause of your hair loss first.",
    stats: [
      { value: "38+", label: "Years of care", mobileLabel: "Years" },
      { value: "45+", label: "Clinics" },
      { value: "19+", label: "Cities" },
    ],
    image: {
      src: `${IMG}/dr-anupriya-goel.webp`,
      alt: "Dr. Anupriya Goel, Medical Director, Berkowits Hair & Skin Clinic",
      width: 1023,
      height: 1537,
    },
  },
  local: {
    eyebrow: "Central Delhi",
    title: "Hair loss care in Bengali Market, near Connaught Place",
    paragraphs: [
      "Our Central Delhi clinic sits on Central Lane in Bengali Market, near The Lalit hotel and a short walk from Barakhamba Road metro station on the Blue Line. Mandi House metro, on the Blue and Violet lines, is close by too, so the clinic is easy to reach from Connaught Place, Janpath and the offices along Barakhamba Road and Kasturba Gandhi Marg.",
      "Many clients drop in during a lunch break or after work. Long hours, irregular meals and city stress can all play a part in hair fall, so every consultation here starts with understanding your routine as well as your scalp.",
    ],
    mobileParagraph:
      "Our clinic is on Central Lane in Bengali Market, near The Lalit and a short walk from Barakhamba Road metro (Blue Line), with Mandi House (Blue & Violet) close by — easy to reach from Connaught Place, Janpath and the offices on Barakhamba Road and KG Marg. Many clients visit at lunch or after work.",
    areasTitle: "Areas we serve",
    areas: [
      "Connaught Place",
      "Barakhamba Road",
      "Mandi House",
      "Janpath",
      "Gole Market",
      "ITO",
      "Pragati Maidan",
      "Daryaganj",
      "Paharganj",
      "Karol Bagh",
    ],
  },
  photos: {
    eyebrow: "Inside the clinic",
    title: "Our Bengali Market clinic",
    cta: "Book a Visit",
    items: [
      { src: `${IMG}/clinic-reception.webp`, alt: "Reception desk at Berkowits Bengali Market", width: 1120, height: 840 },
      { src: `${IMG}/clinic-waiting-area.webp`, alt: "Waiting area at the Bengali Market clinic", width: 720, height: 539 },
      { src: `${IMG}/clinic-consultation-room.webp`, alt: "Consultation room with desk and chairs", width: 720, height: 539 },
      { src: `${IMG}/clinic-treatment-room.webp`, alt: "Treatment room with treatment bed and equipment", width: 720, height: 539 },
      { src: `${IMG}/clinic-hair-treatment-room.webp`, alt: "Hair treatment room with styling chair and wash basin", width: 720, height: 539 },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    intro:
      "Answers to common questions about hair loss treatment at Berkowits Bengali Market, near Connaught Place.",
    items: [
      {
        question: "Where can I get hair loss treatment near Connaught Place?",
        answer:
          "Berkowits Bengali Market is at 12 Central Lane, near The Lalit hotel, New Delhi 110001 — a short walk from Barakhamba Road metro. The clinic is open 10:00 AM – 7:00 PM.",
        mobileAnswer:
          "Berkowits Bengali Market is at 12 Central Lane, near The Lalit hotel, New Delhi 110001 — a short walk from Barakhamba Road metro. Open 10:00 AM – 7:00 PM.",
      },
      {
        question: "Is the first consultation free?",
        answer:
          "Yes. Your first consultation with our trichologists is free. Call +91 99996 66699 or book online to choose a time that suits you.",
      },
      {
        question: "Who will assess my hair loss?",
        answer:
          "Your scalp and hair are assessed by our trichologists, who focus on hair and scalp concerns and explain the likely cause before suggesting any plan.",
      },
      {
        question: "Which hair loss treatments does Berkowits offer?",
        answer:
          "Berkowits offers RichFeel hair care, LLLT, PRP, GFC, Bio-PRP, AMT, Exosomes and QR678. Your trichologist recommends what suits you — sometimes a combination.",
      },
      {
        question: "How much does hair loss treatment cost?",
        answer:
          "Hair loss treatment starts from ₹999 and can go up to ₹20,000, depending on the line of treatment and the number of sessions. You get a clear estimate after your free consultation.",
      },
      {
        question: "Will I get the same treatment as everyone else?",
        answer:
          "No. Two people with hair loss may need different treatments. Your trichologist recommends one treatment or a combination based on your scalp assessment.",
      },
      {
        question: "When will I see a difference?",
        answer:
          "Many people notice hair fall slowing in the first couple of months and visible change around six months. Results vary from person to person.",
      },
      {
        question: "Is hair loss treatment painful?",
        answer:
          "Most treatments are non-invasive or minimally invasive, and your comfort is taken care of throughout.",
      },
      {
        question: "Do you treat hair loss in women?",
        answer:
          "Yes. We see women with thinning along the parting, hormonal hair fall and hair fall after pregnancy. Every plan is personalised.",
      },
      {
        question: "Is the clinic easy to reach by metro?",
        answer:
          "Yes. Barakhamba Road on the Blue Line is the nearest station, and Mandi House on the Blue and Violet lines is also close by.",
      },
    ],
  },
  booking: {
    title: "Ready to understand your hair loss?",
    intro:
      "Book a free consultation at Berkowits Bengali Market. Our trichologists will assess your scalp, explain the likely cause and walk you through your options.",
    mobileIntro: "Book a free consultation at Berkowits Bengali Market.",
  },
  footer: {
    disclaimer:
      "Medical disclaimer: This page provides general information only and does not replace professional medical advice, diagnosis or treatment. Suitability, risks, recovery and outcomes vary. Consult a qualified clinician for personalized guidance. Images of models and illustrative professionals are not evidence of results or staff identity.",
  },
};
