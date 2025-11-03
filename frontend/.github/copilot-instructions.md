## Quick context

- This is a small React + TypeScript frontend (Vite) for a task manager. Entry: `App.tsx` (rendered from `index.tsx`). UI components live in `components/`. Type definitions and the shared data contract live in `types.ts`.
- Data access is abstracted behind an IDataService (see `types.ts`). Two implementations are provided:
  - `services/storageService.ts` — localStorage backed (used when `serviceMode === 'local'`). Key: `STORAGE_KEY`.
  - `services/apiService.ts` — fetch-based client for a Spring Boot API under `/api`.

## Big-picture architecture

- Single-page React app using Vite. No global state library — state is managed locally with hooks in `App.tsx` and passed down as props.
- Data flow: `App.tsx` selects a data service (local vs API) via `serviceMode` and calls methods defined in `IDataService` (`getTaskLists`, `addTask`, `updateTask`, `toggleTaskCompleted`, `deleteTask`, etc.). Update UI optimistically in handlers (see `handleDeleteList`, `handleToggleTask`) and revert on error.
- API expectations: `apiService` issues REST calls to `/api/task-lists` and related paths (see `apiService.ts`). Responses are JSON; non-2xx responses throw with server body included.

## Developer workflows / commands

- Install: `npm install` (pnpm lockfile present — `pnpm install` also works).
- Dev server: `npm run dev` (runs Vite). Port is set in `vite.config.ts` (server.port: 3000) but Vite default still applies if changed.
- Build: `npm run build`; preview: `npm run preview`.
- Environment: `vite.config.ts` reads `GEMINI_API_KEY` from env. If you need to set env locally, create `.env.local` with `GEMINI_API_KEY=...`.

## Project-specific patterns & conventions (do this in PRs/edits)

- Service abstraction: Always use `IDataService` methods rather than calling `localStorage`/`fetch` directly from components. If adding a new persistence mechanism, implement `IDataService` and switch in `App.tsx`.
- Types-first changes: Update `types.ts` first. Then update both `storageService.ts` and `apiService.ts` to preserve the contract.
- Optimistic UI: `App.tsx` often updates local state before awaiting the service call and restores on error. When modifying handlers, preserve the save/restore pattern to avoid regressions.
- Immutability: Components update lists via mapping/spreading (e.g., setTaskLists(prev => prev.map(...))). Keep that style for safe rerenders.
- UI patterns: Small presentational components in `components/`; prefer prop drilling (current approach) over adding complex global state.

## Integration points & gotchas

- Backend URL: `apiService` prefixes requests with `API_BASE_URL = '/api'`. When testing the API mode, ensure the backend is reachable at that path or change `API_BASE_URL`.
- Local dev vs API mode: Use the Data Source selector in the header (in `App.tsx`) to toggle `local` vs `api`. If backend is not running, use `local` to avoid network errors.
- localStorage format: `storageService` stores an array of `TaskList` objects under the key `react-task-app-data`. Be careful if migrating data shape.

## Useful examples (copy/paste edits)

- To add a new field `priority: 'low'|'med'|'high'` to tasks:

  1. Update `types.ts`: add `priority` to `Task` and update method signatures if needed.
  2. Update `services/storageService.ts` to set a default when creating tasks (`newTask: Task = { ... , priority: 'med' }`).
  3. Update `services/apiService.ts` server contract (POST/PUT bodies) and UI components that render or edit tasks (`components/TaskItem.tsx`, `TaskListDetail.tsx`).

- To debug an API error response: check `apiService.handleResponse` which throws an Error containing server text; errors are surfaced in `App.tsx` via `setError`.

## Files to inspect for common tasks

- Entry / wiring: `index.tsx`, `App.tsx`
- Data contract: `types.ts`
- Services: `services/storageService.ts`, `services/apiService.ts`
- UI: `components/TaskListsOverview.tsx`, `TaskListDetail.tsx`, `TaskListCard.tsx`, `TaskItem.tsx`, `Modal.tsx`
- Build config / env: `vite.config.ts`, `package.json`

## What Copilot agents should prioritize

- Preserve `IDataService` contract when adding features. Update both service implementations.
- Respect optimistic update patterns in `App.tsx` handlers (preserve backup/restore behavior on error).
- Keep UI stateless where possible; add props into `components/` rather than adding global state.
- When adding API calls, follow `apiService.apiRequest` pattern (headers + JSON + handleResponse).

If any area is unclear or you'd like examples expanded (e.g., sample PR showing a new field added end-to-end), tell me which part and I will iterate.
