# GitHub Copilot Instructions

## Project Overview

**rawfeed.social** — a social RSS feed aggregator and microblogging platform built with server-rendered HTML, HTMX, and Fastify.

## Tech Stack

| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| Runtime        | Node.js + TypeScript                                              |
| HTTP Framework | Fastify v5                                                        |
| Frontend       | HTMX v2 + EJS templates + Tailwind CSS v4                         |
| Database       | MySQL via Knex.js                                                 |
| DB Types       | Kysely (codegen only — not used for query building)               |
| Cache          | Redis (ioredis)                                                   |
| Auth           | JWT (`@fastify/jwt`) + bcrypt + CSRF (`@fastify/csrf-protection`) |
| Storage        | AWS S3 (`@aws-sdk/client-s3`)                                     |
| Email          | Resend                                                            |
| Error Tracking | Sentry (`@sentry/node`)                                           |
| Scheduling     | Croner                                                            |
| Validation     | Zod                                                               |
| Testing        | Vitest                                                            |
| Formatting     | Prettier + `prettier-plugin-ejs`                                  |
| Commits        | Commitizen (conventional changelog)                               |

## Project Structure

```
src/
  server.ts           # Fastify app bootstrap, plugin registration, error handlers
  consts.ts           # App-wide constants
  routes/             # Fastify route handlers (thin — delegate to services)
  services/           # Business logic layer (pure functions, no classes)
  helpers/            # Shared utilities (validation, tokens, cache, DTOs, etc.)
  middleware/         # Fastify hooks (auth guard, mode detection, token verification)
  scheduler/          # Background workers (RSS sync, data exports, sitemap)
  db/                 # Knex connection setup
  types/              # TypeScript types (database.ts auto-generated, relations.ts, shared.ts)
  converters/         # Data transformation utilities
views/
  layouts/            # EJS layout files
  partials/           # Reusable EJS fragments
  auth/, posts/, user/, tags/, explore/  # Feature-specific views
migrations/           # Knex migration files (JS)
seeds/                # Knex seed files
public/               # Static assets (CSS, JS, images)
```

## Architecture & Conventions

### Routes

- Route files live in `src/routes/` and export a default `async function (fastify: FastifyInstance)`.
- Keep routes thin — validate input, call a service, render a view or redirect.
- Use `useViews` / `useAuthContext` helpers to get `view`, `setState`, and `setValidation` helpers.
- Apply `preHandler: fastify.csrfProtection` on all mutating POST routes.
- Apply per-route rate limits via `config.rateLimit` when exposing sensitive endpoints.

### Services

- Service files live in `src/services/` and export plain named functions (no classes).
- Each service is responsible for one domain (e.g., `user.service.ts`, `post.service.ts`).
- Database access goes through `getKnex()` from `src/db/connection.ts`.
- Use `cache` helper (`src/helpers/cache.ts`) for Redis-backed caching.

### Validation

- Define Zod schemas in `src/helpers/validations.ts`.
- Use the `validate(SCHEMA, body)` helper which returns `{ isNotValid, errors }`.
- Input DTOs are typed in `src/helpers/dtos.ts`.

### Database

- Use **Knex** for all query building — not Kysely.
- Kysely is only used for auto-generated TypeScript types (`npm run types`).
- Migrations are plain JS files in `migrations/` (`npm run migrate:make <name>`).
- Always include `created_at` and `updated_at` timestamps on inserts.

### Views

- EJS templates live in `views/`.
- Layouts are in `views/layouts/`; partials in `views/partials/`.
- Use the `asset` helper (from `src/helpers/useViews.ts`) in views for cache-busted static asset URLs.
- HTMX targets return HTML fragments, not full pages — use `hx-boost`, `hx-swap`, `hx-target` patterns.

### Middleware

- Auth guard: `src/middleware/requireAuth.ts` — attach as `preHandler` on protected routes.
- Token verification: `src/middleware/verifyToken.ts`.
- Mode detection hook: registered globally in `server.ts`.

### Types

- `src/types/database.ts` — **auto-generated**, do not edit manually. Regenerate with `npm run types`.
- `src/types/relations.ts` — join/relation types built on top of database types.
- `src/types/shared.ts` — shared DTOs and interfaces.

### Schedulers

- Background jobs live in `src/scheduler/` and are initialized in `server.ts` after the server starts.
- Use `croner` for cron expressions.

## Development Commands

```bash
npm run dev          # Start dev server + Tailwind watch (concurrently)
npm run build        # Compile TypeScript
npm run start        # Run compiled output
npm run test         # Vitest in watch mode
npm run test:ci      # Vitest single run
npm run migrate:make <name>   # Create a new migration
npm run migrate:latest        # Run pending migrations
npm run migrate:rollback      # Roll back last migration
npm run types                 # Regenerate Kysely DB types from MySQL schema
npm run format               # Prettier format
npm run commit               # Commitizen interactive commit
```

## Code Style

- **TypeScript strict mode** — avoid `any` unless absolutely necessary.
- **No classes for services** — use plain exported functions.
- **Async/await** throughout — no callbacks or raw Promises.
- **Named exports** for helpers and services; **default exports** for route registrations and the Fastify server.
- Use `nanoid` for short IDs, `uuid` (v4) for primary keys.
- Sanitize user-generated HTML with `sanitize-html` before storing or rendering.
- All user passwords hashed with `bcrypt` (cost factor 10).
- JWT tokens generated and validated via `src/helpers/tokens.ts`.
- Conventional commits enforced — use `npm run commit` or prefix messages with `feat:`, `fix:`, `chore:`, etc.
