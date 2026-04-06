# GitHub Copilot Instructions

## Project Overview

**rawfeed.social** — a social RSS feed aggregator and microblogging platform built with server-rendered HTML, HTMX, and Fastify.

## Tech Stack

| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| Runtime        | Node.js + TypeScript                                              |
| HTTP Framework | Fastify v5                                                        |
| Frontend       | HTMX v2 + `@kitajs/html` JSX templates + Tailwind CSS v4          |
| Database       | MySQL via Knex.js                                                 |
| DB Types       | Kysely (codegen only — not used for query building)               |
| Cache          | Redis (ioredis)                                                   |
| Auth           | JWT (`@fastify/jwt`) + bcrypt + CSRF (`@fastify/csrf-protection`) |
| Storage        | AWS S3 (`@aws-sdk/client-s3`)                                     |
| Email          | AWS SES (`@aws-sdk/client-ses`)                                   |
| Error Tracking | Sentry (`@sentry/node`)                                           |
| Scheduling     | Croner                                                            |
| Validation     | Zod                                                               |
| Testing        | Vitest                                                            |
| Formatting     | Prettier                                                          |
| Commits        | Commitizen (conventional changelog)                               |

## Project Structure

```
src/
  server.tsx          # Fastify app bootstrap, plugin registration, error handlers
  consts.ts           # App-wide constants
  routes/             # Fastify route handlers (.tsx — thin, delegate to services)
  views/              # JSX view components (.tsx)
    layouts/          # Layout wrappers (DefaultLayout, AuthLayout, etc.)
    partials/         # Reusable JSX fragments (FlashMessages, etc.)
    components/       # Shared UI components (see Component Library section)
      auth/           # Auth-specific components
      blog/           # Blog components
      forms/          # Form controls (Button, CsrfToken, FieldError, Textarea, etc.)
      icons/          # SVG icon components
      layout/         # Layout building blocks
      posts/          # Post-related components
      shared/         # General-purpose shared components
      sidebar/        # Sidebar components
      users/          # User-related components
    auth/, posts/, user/, tags/, explore/  # Feature-specific page views
  services/           # Business logic layer (pure functions, no classes)
  helpers/            # Shared utilities (validation, tokens, cache, DTOs, etc.)
  middleware/         # Fastify hooks (auth guard, mode detection, token verification)
  scheduler/          # Background workers (RSS sync, data exports, sitemap)
  db/                 # Knex connection setup
  types/
    database.ts       # Auto-generated Kysely types — do not edit
    relations.ts      # Join/relation types
    shared.ts         # Shared DTOs and interfaces
    custom/           # Fastify module augmentation (generateCsrf, csrfProtection, etc.)
  converters/         # Data transformation utilities
migrations/           # Knex migration files (JS)
seeds/                # Knex seed files
public/               # Static assets (CSS, JS, images)
```

## Architecture & Conventions

### Routes

- Route files live in `src/routes/` as `.tsx` files and export a default `async function (fastify: FastifyInstance)`.
- **No per-file JSX pragma needed** — `jsxImportSource` is set globally in `tsconfig.json`.
- Keep routes thin — validate input, call a service, render a view or redirect.
- Use `useViews()` from `src/helpers/useViews.ts` to get `html`, `base`, `setFlash`, `setState`, and `setValidation` helpers.
- Render views with `reply.html(<MyView {...base()} />)` — `base()` injects all shared props.
- Return 404s as `reply.status(404).html(<NotFound asset={asset} />)`.
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

- JSX view components live in `src/views/` as `.tsx` files.
- Layouts are in `src/views/layouts/`; partials in `src/views/partials/`.
- The `jsxImportSource` is set globally in `tsconfig.json` — **do NOT add `/** @jsxImportSource @kitajs/html \*/` pragma\*\* to individual files.
- All views receive a `BaseProps` object (from `getBaseProps()`) which includes `asset`, `loggedUser`, `mode`, helpers like `sanitize`/`getAvatar`, and flash data (`validation`, `state`).
- Use the `asset` helper (from `src/helpers/asset.ts`) for cache-busted static asset URLs.
- HTMX targets return HTML fragments, not full pages — use `hx-boost`, `hx-swap`, `hx-target` patterns.
- **Always prefer existing components** over writing inline HTML. Check `src/views/components/` before writing new markup. Keep view files thin.

### Component Library

All reusable components live in `src/views/components/`. **Always check here before writing inline HTML in views.**

#### Forms (`components/forms/`)

- **`Button`** — props: `variant` (`auth`|`primary`|`danger`|`ghost`, default `auth`), `type`, `class`, `disabled`, `children`. `auth` = full-width black; `primary` = inline black; `danger` = red; `ghost` = underline.
- **`CsrfToken`** — props: `token: string`. Renders the hidden CSRF input.
- **`FieldError`** — props: `message?: string`. Renders inline validation error; renders nothing when falsy.
- **`Textarea`** — props: `id`, `name`, `value`, `placeholder`, `rows`, `maxlength`, `class`.
- **`LocationSelect`** — locale/timezone dropdown.
- **`FormField`** — labeled input wrapper.

#### Shared (`components/shared/`)

- **`Card`** — props: `class?`, `children`. Base: `bg-white rounded-lg shadow-sm p-6`. Use for white content cards.
- **`InfoNotice`** — props: `title`, `class?`, `children`. Gray info box with info icon.
- **`WarningNotice`** — props: `title`, `class?`, `children`. Red warning box with warning icon.
- **`Alert`** — props: `type` (`info`|`success`|`error`), `children`, `className?`. Colored alert banner.
- **`SettingsPageHeader`** — props: `backHref`, `backLabel`, `title`, `description`. Settings page header with back link.
- **`SettingsNavItem`** — props: `href`, `title`, `children`. Nav card with chevron, for settings index.
- **`DomainStatusBadge`** — props: `status: string|null|undefined`, `variant` (`icon`|`sm`|`md`, default `md`). Shows domain verification status.
- **`ExportStatusBadge`** — export job status pill.
- **`ExportHistoryItem`** — single export row.
- **`ExportHistory`** — export history list card.
- **`RequestExport`** — request export card.
- **`RssSourceBadge`** — RSS source indicator.

#### Users (`components/users/`)

- **`Avatar`** — user avatar image.
- **`BotBadge`** — 🤖 Bot label span.
- **`BotUserCard`** — bot user card for explore pages.
- **`FollowButton`** — follow/unfollow toggle.
- **`FollowStats`** — followers/following counts.
- **`ProfileHeader`** — full profile header block.
- **`RssFeedLink`** — RSS feed button/link.
- **`UserCard`** — user summary card.
- **`UserStatLink`** — single stat with link.

#### Posts (`components/posts/`)

- **`Post`** — full post component.
- **`PostContent`** — post body rendering.
- **`PostStats`** — likes/repost counts.
- **`HashtagLink`**, **`MentionLink`**, **`ExternalLink`** — inline text link components.

#### Icons (`components/icons/`)

25 SVG icon components. Each accepts a `class` prop. Available icons: `ArchiveIcon`, `ArrowsRightLeftIcon`, `ChatBubbleIcon`, `CheckCircleIcon`, `CheckCircleSmallIcon`, `CheckIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `ClipboardIcon`, `ClockCircleSmallIcon`, `DownloadIcon`, `ExclamationTriangleIcon`, `InfoCircleIcon`, `InfoCircleSmallIcon`, `LinkIcon`, `MailIcon`, `MenuIcon`, `RssIcon`, `RssWaveIcon`, `SpinnerIcon`, `TrendingUpIcon`, `UserPlusIcon`, `WarningTriangleSmallIcon`, `XCircleSmallIcon`, `XMarkIcon`.

### Middleware

- Auth guard: `src/middleware/requireAuth.ts` — attach as `preHandler` on protected routes.
- Token verification: `src/middleware/verifyToken.ts`.
- Mode detection hook: registered globally in `server.ts`.

### Types

- `src/types/database.ts` — **auto-generated**, do not edit manually. Regenerate with `npm run types`.
- `src/types/relations.ts` — join/relation types built on top of database types.
- `src/types/shared.ts` — shared DTOs and interfaces.
- `src/types/custom/index.d.ts` — Fastify module augmentation. Declares custom properties on `FastifyInstance` (`csrfProtection`), `FastifyReply` (`generateCsrf`), and `FastifyRequest` (`mode`, `loggedUser`, `domainUser`, `profileUser`). Only edit when adding new custom Fastify properties.

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
- **Always use braces** for `if`, `else`, `for`, and `while` blocks — never omit `{` and `}` for single-line bodies.
- **No classes for services** — use plain exported functions.
- **Async/await** throughout — no callbacks or raw Promises.
- **Named exports** for helpers and services; **default exports** for route registrations and the Fastify server.
- Use `nanoid` for short IDs, `uuid` (v4) for primary keys.
- Sanitize user-generated HTML with `sanitize-html` before storing or rendering.
- All user passwords hashed with `bcrypt` (cost factor 10).
- JWT tokens generated and validated via `src/helpers/tokens.ts`.
- Conventional commits enforced — use `npm run commit` or prefix messages with `feat:`, `fix:`, `chore:`, etc.
