# UniPlanner

UniPlanner is a teaching-grade mobile planning app that helps university students track modules, assessments, and study tasks.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/uniplanner run dev` — run the Expo mobile preview
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Expo, React Native, Expo Router, and TypeScript for the mobile client
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/uniplanner/app/` — Expo Router screens and navigation
- `artifacts/uniplanner/data/plannerData.ts` — Week 1 sample data and domain types
- `artifacts/uniplanner/context/PlannerContext.tsx` — local task progress persistence
- `artifacts/uniplanner/components/PlannerUI.tsx` — shared presentation components
- `docs/TEACHING_NOTES.md` — lecture/workshop guidance for the six-week progression
- `docs/ARCHITECTURE.md` — architecture diagrams and the intended refactoring narrative

## Architecture decisions

- Week 1 deliberately keeps sample data close to the UI so students can learn screens, components, navigation, and state before seeing MVVM or networking.
- Task completion is the first persistent interaction and uses AsyncStorage; the storage boundary is small enough to replace with a repository in Week 2.
- Shared visual components are kept separate from screen files so students can see reuse without introducing a large component framework.
- The app uses Expo Router tabs for four core areas and stack routes for module and assessment details.

## Product

- Dashboard with weekly progress, upcoming assessment, module shortcuts, and focus tasks
- Modules list with lecturer, description, and assessment counts
- Assessment list with status filtering and detail views
- Profile screen with student details, settings, and a resettable sample-data teaching note

## Gotchas

- Expo preview is the source of truth for the mobile layout; the browser preview is useful for a quick smoke check but does not reproduce every native safe-area behavior.
- Keep the Week 1 local data flow working when introducing Week 2 architecture; each weekly version should remain runnable.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
