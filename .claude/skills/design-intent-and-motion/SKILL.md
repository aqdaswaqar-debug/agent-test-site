---
name: design-intent-and-motion
description: Read a Figma page the way a senior frontend developer would - work out what the page is for, turn design placeholders and static frames into the real working features, apply the standard motion for each kind of element, and stop at the human guidance gate when a call is not yours to make. Use on every page or section build, right after the Figma frames are read and before any code is written.
---

# Design intent, real-world behavior and motion

Figma is a picture of one moment. It cannot show a map you can drag, an answer that opens, a number that counts up or a card that lifts under the mouse. Designers leave placeholders and static states for the developer to make real. **Build what the design means, not only what it shows.**

Run the four steps below and put the result in the build brief (sections INTENT, PLACEHOLDERS → REAL, MOTION PLAN, GATE in the design-interpreter output).

## 1. Understand the page before building it
Answer in three lines:
- **What page is this?** (local SEO landing page, service page, product page, blog, lead/ad landing…)
- **Who lands here and what must they do?** (e.g. someone near Connaught Place with hair fall → book a free consultation, call, or get directions)
- **What makes them trust it?** (doctor, years, clinics, results, real clinic photos, map, FAQs)

Every decision below should help that visitor do that action. If a design element works against it (CTA hidden on mobile, phone not tappable, map that cannot be opened), fix it and report the decision.

## 2. Placeholder and static-frame scan
Go section by section and ask: *"On a real website, how does this behave?"* Use this table; anything not in it, reason the same way.

| Seen in Figma | What it really is | How to build it here |
| --- | --- | --- |
| Grey/grid box, pin, "map", "to be placed in development" | Interactive map of the business | Google Maps embed by **listing query** (`maps?q=<business, area>&output=embed`), `loading="lazy"`, `title`, map-grid background as loading state; shown on mobile too; "Get Directions" opens the same query in a new tab. Check the pin lands on the real listing (screenshot). |
| FAQ list with all answers printed | Accordion | Headless UI Disclosure at **every** breakpoint, +/- icon (plus folds into minus), first item open, closed answers kept in the HTML (`unmount={false}`) so FAQPage schema matches the page, independent columns on desktop so opening one never stretches its neighbor. Mobile: first 5 + "View more questions". |
| Big numbers (38+, 45+, ₹ prices, %) | Animated stats | `CountUp`: counts from 0 when scrolled in, fast then settling; server HTML and screen readers get the final value; width reserved; non-numeric values ("Free", "1:1") stay static. |
| Progress/timeline bars | Fill-on-scroll | Bar scales from 0 (`.ls-bar`, `origin-left`) and stops at its level, one after another. |
| Small card sitting on a big photo/card (badge, "nearest clinic") | Floating accent | `.ls-float` / `.ls-float-slow`: slow up-and-down drift (6–7.5s, 10px). |
| Cards, photo tiles, profile card | Hover target | `hoverLift` (lift + soft shadow on a `::after` layer) and `hoverZoom` on the image inside a clipping frame. **The card itself must not have `overflow-hidden`**, or the shadow is clipped. |
| Rows/grids of cards, steps | Entrance | `<Reveal stagger>` with `data-reveal-item` on each item. |
| Buttons | Clear affordance | `ButtonLink icon`: `arrow` for in-page/next step, `external` for new tab, `phone` for `tel:`. Icon nudges on hover. |
| One tab/slide/dot shown "active" | Working tabs/carousel | Headless UI Tabs / Embla with real state, keyboard and swipe. |
| Hero photo | First impression | `.ls-settle` slow zoom-in on load (no opacity, so LCP is not delayed) + hover lift/zoom. |
| Play icon on an image | Video | Lightbox or inline video, poster, `muted playsInline`, lazy. |
| Reviews/ratings | Real reviews only | Show only real data or flag; never invent testimonials. |
| Address, phone, prices, doctor names | Business facts | Use as given but verify they look real; sample-looking data → `TODO(content)` + gate question. |
| Form | Working form | Validation, error/loading/success states, honeypot/rate limit, toast, mock API. |

## 3. Motion plan (house defaults)
Every section gets motion appropriate to its job; nothing loops except small floating accents.

| Element | Motion | Timing |
| --- | --- | --- |
| Section blocks below the fold | rise + fade once | 500–560ms, ease-out |
| Card lists | staggered rise | +90ms per item |
| Cards / images (hover devices) | lift 6px + shadow fade-in; image zoom 1.05 | 300ms / 500ms |
| Stat numbers | count-up | ~1.4s, ease-out-expo |
| Progress bars | fill to value | 1.1s, +250ms per bar |
| Floating badges | translateY 0 → -10px → 0 | 6–7.5s loop |
| Accordion | icon morph + answer fade/slide | 200ms |
| Button icon | nudge in its direction | 200ms |

Rules (non-negotiable):
- Animate `transform` and `opacity` only. Shadows fade on a pseudo-element; never animate `box-shadow`, `width` or `height`. Tailwind v4 `scale-*`/`translate-*` set the `scale`/`translate` properties: transition those (`transition-[scale]`) or use `transition-transform`.
- Hover effects inside `[@media(hover:hover)]`; every hover has a `focus-visible` twin.
- `prefers-reduced-motion: reduce` turns all of it off (CSS media query + JS checks).
- Never hide above-the-fold content waiting for JS; reveal effects arm only for content still below the fold. Never fade the LCP image.
- Server HTML always contains the final content (numbers, answers) for SEO and no-JS users.
- Implementation lives in: `components/ui/Reveal.tsx` (stagger), `components/ui/CountUp.tsx`, `components/ui/motion.ts` (`hoverLift`, `hoverZoom`), `components/ui/ButtonLink.tsx` (`icon`), keyframes in the page CSS (`ls-rise`, `ls-fill`, `ls-float`, `ls-settle`). Reuse them; don't add GSAP/Lenis.

## 4. Human guidance gate (G-intent)
Decide yourself, build it, and list it under **Decisions I made** when the behavior is industry standard, reversible, and has no cost, legal or data impact (everything in the tables above).

Ask the human (one batch, each question with your recommended default; keep building on the default) when:
- a third-party service needs an account, API key, payment or raises privacy questions (paid map API, chat widget, analytics, booking system);
- real business facts are missing or look like samples (address, map pin, prices, phone, doctor, hours, review data);
- the change alters brand (colors, fonts, logo), adds or removes content, or contradicts the design;
- you are unsure how the real website behaves and two reasonable answers lead to different builds.

Stop and wait (build nothing for that part) when the change is hard to undo or touches protected files, packages, auth, payments or shared layout.

If a skill, library, reference site or repo would make the result better, say exactly what you need and why in the gate batch (e.g. "brand motion guidelines", "Google Maps place ID for the clinic").

## 5. QA additions
Prove the behavior, not just the layout (Playwright, production build):
- count-up shows a mid value shortly after scroll and the final value after; `sr-only` holds the final value;
- bars: `transform` scales during the fill and widths match their levels at the end;
- floating badge `transform` changes over time; hover → card `::after` opacity 1, card not `overflow: hidden`;
- accordion: `aria-expanded` toggles, panels hide/show, closed answers still in the DOM;
- reduced motion: no animations, final values shown;
- map iframe loads and the pin lands on the right place (screenshot);
- third-party iframes keep the network busy: don't wait for `networkidle` after they are on screen, use a fixed wait.
