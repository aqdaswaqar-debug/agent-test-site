/**
 * Extra phone/tablet scrim for PhotoHero, passed in its `children` slot (positioned against the hero section,
 * painted above the photo, below the copy). PhotoHero's own mobile gradient fades out at 65% height, which
 * leaves tall copy blocks (pills, rotator) or copy over a face below AA. Candidate to fold into PhotoHero.
 */
export const HERO_SCRIM =
  "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(0_0_0/0.6),rgb(0_0_0/0.45)_55%,rgb(0_0_0/0.15))] lg:hidden";
