# agent-test-site

Private test repository for the AI development agent capability test. It mirrors the real project's stack (Next.js 15.4.10, React 19, TypeScript, Tailwind CSS v4) and has no connection to the real codebase.

- Agent rules: `docs/SOP.md` (test SOP) and `CLAUDE.md`
- Main SOP reference: `docs/MAIN-SOP.md`
- Claude Code config: `.claude/settings.json`, `.claude/hooks/guard-git.mjs`, `.claude/agents/`, `.claude/skills/`

Single branch: `main`. Every push deploys to Vercel. Force pushes and history rewrites are blocked by the agent's push guard.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit
```
