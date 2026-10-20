# CLAUDE.md — Test repo

Read docs/SOP.md before any task. It overrides anything below on safety.
docs/MAIN-SOP.md is the main SOP: use it for page playbooks (Section 11) and the build brief, review and question-batch templates (Section 16). Where the two disagree (for example, stack choices or branches), docs/SOP.md wins: the main SOP's staging/staging-2 rules do not apply in this test repo.

## Project facts
- Repo: aqdaswaqar-debug/agent-test-site (test repo, no link to the real codebase)
- Branch: `main` only. Plain pushes; never force push, delete branches or rewrite history
- Deploys: Vercel builds every push to `main`; put the preview link in the report
- Next.js 15.4.10, App Router, React 19, TypeScript 5
- Tailwind CSS v4 (tokens in app/globals.css via @theme), Sass available
- npm (package-lock.json). Commands: dev `npm run dev`, build `npm run build`,
  lint `npm run lint`, types `npx tsc --noEmit`. No test framework.
- No `src/` folder; import alias `@/*` → project root

## Where things go
- Pages: app/<route>/page.tsx (test pages under app/test/)
- Sections: components/sections/<page>/
- Shared UI: components/ui/
- Helpers: lib/ (cn() in lib/utils.ts)
- API routes: app/api/<name>/route.ts (mock handlers only)

## Agent may edit
- app/test/**, app/api/** (mock handlers), components/sections/**, components/ui/**, lib/** (new files)
- CLAUDE.md: the `## Lessons` section only, with confirmed lessons

## Never edit without approval
- app/layout.tsx, app/globals.css (@theme), next.config.*, tsconfig.json,
  eslint.config.mjs, postcss.config.mjs, package.json, package-lock.json,
  .claude/**, docs/**, .github/**

## Stack choices for new code
- Motion: Framer Motion or CSS (no GSAP/Lenis)
- Carousel: Embla · Icons: lucide-react · Primitives: Headless UI
- State: local first, Zustand if shared, nuqs for URL state
- Toasts: react-hot-toast · Data: native fetch in Server Components
- Responsive: Tailwind breakpoints / CSS; react-responsive exists but don't add new uses (it causes hydration mismatches)
- Markdown: remark + remark-gfm + remark-rehype + rehype-sanitize + rehype-stringify (always sanitize)
- Present but legacy (don't add new uses): swiper, react-slick, react-icons, Font Awesome (@fortawesome/fontawesome-free CSS), axios
- Server-only (never in 'use client' files): firebase-admin, googleapis, openai, jose, @sparticuz/chromium, dotenv

## Known notes for the developer (flag, don't fix)
- eslint-config-next (15.3.2) is behind next (15.4.10)
- Overlapping libraries: 3 carousel libraries, 3 icon libraries

## Agents
- Subagents in .claude/agents/: design-interpreter, frontend-builder, code-reviewer, qa-visual, security-reviewer
- Skill: .claude/skills/figma-to-nextjs-developer (build standards and checklists)

## Lessons
<!-- Format: [Scope] Lesson. (Source, YYYY-MM) -->
- [Local SEO page] Figma placeholders are instructions to build the real thing: map box → interactive Google Maps embed, static FAQ → +/- accordion on all screens. Run design-intent-and-motion before building. (Tester feedback, 2026-10)
- [Motion] Every section needs its house motion: hover lift + shadow on cards/images, count-up stats, bar fill to value, slow float on overlapping badges, arrows on CTA buttons. A card with overflow-hidden clips its hover shadow. (Tester feedback, 2026-10)
- [PDP / product cards] Cross-sell, bundle and recommendation cards use the real product from berkowits.com: first photo from its PDP, live name, size, price, rating and stock, linked to that PDP. Never ship Figma stock or stand-in packshots. (Tester feedback, 2026-10)
- [Speed / reuse] Build fast by reusing what exists (components/ui/site chrome, carousel-controls, CountUp, Reveal, motion, InViewVideo, transformation-gallery blocks) instead of rebuilding; split page-only sections across parallel builders. (Tester feedback, 2026-10)
- [Lead CTAs / video] "Book Consultation" opens the booking popup (see [Booking popup]); "Hear It From Them" uses real videos from the Berkowits YouTube channel in a popup player. Figma-only/stock images may be used, but never show another clinic's marked results as Berkowits results. (Tester feedback, 2026-10)
- [Figma reading] A row cut off at both frame edges right after the hero is a marquee (berkowits.com runs its stats strip as a 22s CSS loop): build it moving, with hover/focus pause and a visible pause button. Always compare hero photos with the Figma render: a small or washed-out zip export must be replaced by the clean Figma fill, and copy on a photo must sit on a dark scrim in white. (Tester feedback, 2026-10)
- [Booking popup] "Book Consultation" uses the berkowits.com booking modal exactly: First/Last Name, Mobile, Email, City (live list), "Book My Free Consultation", privacy/terms note, per-field errors + banner. Check the live site before building any shared UI. (Tester feedback, 2026-10)
