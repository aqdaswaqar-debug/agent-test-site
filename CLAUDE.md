# CLAUDE.md — Test repo

Read docs/SOP.md before any task. It overrides anything below on safety.
docs/MAIN-SOP.md is the main SOP: use it for page playbooks (Section 11) and the build brief, review and question-batch templates (Section 16). Where the two disagree (for example, stack choices), docs/SOP.md wins.

## Project facts
- Repo: <test-account>/agent-test-site (private test repo, no link to the real codebase)
- Work branch: staging-2 only. Protected: main, staging
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
- Present but legacy (don't add new uses): swiper, react-slick, react-icons, Font Awesome, axios
- Server-only (never in 'use client' files): firebase-admin, googleapis, openai, jose

## Known notes for the developer (flag, don't fix)
- eslint-config-next (15.3.2) is behind next (15.4.10)
- Overlapping libraries: 3 carousel libraries, 3 icon libraries

## Agents
- Subagents in .claude/agents/: design-interpreter, frontend-builder, code-reviewer, qa-visual, security-reviewer
- Skill: .claude/skills/figma-to-nextjs-developer (build standards and checklists)

## Lessons
<!-- Format: [Scope] Lesson. (Source, YYYY-MM) -->
