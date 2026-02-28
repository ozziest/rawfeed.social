# Copilot instructions — Rawfeed (rawfeed.social)

Purpose

- Help contributors and Copilot generate code consistent with this repository's architecture, conventions, and security constraints.

Quick commands (dev & maintenance)

- Start dev server: `npm run dev`
- Build: `npm run build`
- Format: `npm run format`
- Run DB migrations: `npm run migrate:latest`
- Create a migration: `npm run migrate:make <name>`
- Regenerate DB types after schema change: `npm run types`
- Run tests: `npm test:ci`
- Watch tests: `npm run test`
- Test coverage: `npm run coverage`

Project summary (short)

- Tech stack: `TypeScript` + `Fastify` (server-side rendered), `EJS` views, `HTMX` progressive enhancement, `Knex` migrations, Tailwind CSS.
- Philosophy: chronological, server-rendered, text-first microblogging (keep UI/UX simple, no client SPA or algorithmic feed).

Repository conventions (use these exactly)

- Language & format: TypeScript (`strict: true` in `tsconfig.json`), Prettier for formatting (`npm run format`).
- Folder responsibilities:
  - `src/routes/` — HTTP route handlers (register routes with Fastify here)
  - `src/services/` — business logic and DB access
  - `src/helpers/` — utilities used across services/routes
  - `src/middleware/` — Fastify hooks / middleware
  - `views/` — server-side EJS templates and `views/partials/` for fragments
  - `migrations/` — knex migration files
  - `src/types/` — generated DB types (run `npm run types` after migrations)
- Naming: `*.service.ts` for service modules; route files match the URL (e.g. `post.ts` for `/post`); exported types use `PascalCase`.

Coding style & best practices

- Follow existing patterns in `src/*` (explicit error handling, small focused services, EJS partials for HTMX fragments).
- Validation: use `zod` for runtime validation of inputs and DTOs.
- Sanitization: sanitize any user-provided HTML/text with `sanitize-html` before rendering or saving.
- Types: prefer explicit types on exported functions/interfaces where it improves clarity.
- Errors: surface friendly messages for web responses; use Sentry for production error reporting (already wired).
- Security: preserve CSRF protection and cookie signing; never log secrets or leak environment variables.

How to add a feature (typical workflow)

1. Add DB changes via a knex migration in `migrations/`.
2. Run `npm run migrate:latest` locally and `npm run types` to update `src/types/database.ts`.
3. Add service logic in `src/services/` and unit tests (if present).
4. Add route in `src/routes/` to wire the HTTP endpoint.
5. Add EJS view or partial under `views/` for server-rendered pages or HTMX fragments.
6. Format (`npm run format`) and use `npm run commit` (commitizen — conventional commits).

HTMX & view rules

- Prefer server-side fragments for HTMX endpoints — return only the partial HTML fragment from `views/partials/`.
- Keep partials small and reusable (use `views/partials/post.ejs` as pattern).
- Ensure endpoints set the right `Content-Type` (views are rendered via Fastify's `reply.view`).

Database & types

- Always add a migration file for schema changes (do not edit past migrations).
- After running migrations, run `npm run types` so `src/types/database.ts` stays up-to-date.
- Use parameterized queries via Knex/Kysely patterns in `src/services` — avoid string-building SQL.

Testing & CI

- Test runner: **Vitest** (TypeScript-first, Node environment).
- Locations & naming:
  - Put tests under `src/**/*.test.ts` or `src/__tests__/`.
  - Use the `*.test.ts` suffix for both unit and integration tests.
  - Example test: `src/helpers/common.test.ts` (uses `describe/it/expect`).
- Running tests:
  - Run all tests: `npm test`
  - Watch mode: `npm run test:watch`
  - Coverage: `npm run coverage`
- TypeScript & globals:
  - `tsconfig.json` includes `types: ["vitest/globals"]` so you can use `describe`, `it`, `expect`, etc. without explicit imports.
- Conventions:
  - Unit tests: target `src/services/*` and `src/helpers/*`; mock DB and external calls with `vi.mock`.
  - Integration tests: exercise Fastify routes using `server.inject()` or `supertest` against a test DB or mocked datastore.
  - Keep tests fast and deterministic; avoid relying on network or external services in unit tests.
  - Use `vi.useFakeTimers()` for time-based logic and `vi.clearAllMocks()` in hooks when needed.
- CI guidance:
  - Add `npm test` (and optionally `--coverage`) to CI; fail the pipeline on test failures.
  - Upload coverage reports when required by your CI provider.
- Example Copilot prompt:
  - "Add Vitest unit tests for `src/services/post.service.ts` (mock DB with `vi.mock`), include edge-case assertions, and add coverage."

Commit messages

- Use Conventional Commits (repository uses `commitizen`). Run `npm run commit` to create compliant messages.

Do / Don't (quick)

- ✅ Do: follow existing file locations and naming conventions.
- ✅ Do: validate input with `zod` and sanitize output with `sanitize-html`.
- ✅ Do: return EJS partials for HTMX handlers.
- ❌ Don't: add a heavy client-side SPA or change feed behavior to algorithmic.
- ❌ Don't: change DB schema without a migration and updating generated types.

Example prompts for Copilot (good templates)

- "Add a new GET route `GET /tags/:tag` that returns an HTMX partial listing posts for the tag — create route, service method, DB query, EJS partial, and unit test."
- "Create a migration that adds `external_id` to `posts` and update `src/services/post.service.ts` to handle the new column. Regenerate DB types."
- "Write a `zod` schema and request validator for the post creation form, sanitize HTML in the service, and add server-side tests for validation failures."

Files to update when making changes

- API/logic → `src/services/*`, `src/routes/*`.
- Views → `views/` (and `views/partials/` for fragments).
- DB schema → `migrations/` + run `npm run types`.
- Documentation → `README.md` and `CONTRIBUTING.md` if workflow or CLI changes.

If unsure, prefer the existing patterns in `src/` over suggesting a new architecture.

Contact / extra context

- Look at `CONTRIBUTING.md` and existing code in `src/` for implementation examples.

Thank you — follow these rules when generating or editing code for Rawfeed. Keep changes small, tested, and consistent with the project's server-rendered, HTMX-first approach.
