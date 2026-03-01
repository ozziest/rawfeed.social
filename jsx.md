# Migration Plan: EJS → JSX (`@kitajs/html`)

## Overview

Replace the EJS view layer with server-side JSX using `@kitajs/html` and its
Fastify adapter `@kitajs/fastify-html-next`. The HTTP framework, all Fastify
plugins, services, middleware, schedulers, and database layer remain unchanged.
Migration is incremental and can be done view-by-view.

---

## Phase 1 — Setup & Infrastructure

1. Install dependencies:
   - Add `@kitajs/html`, `@kitajs/fastify-html-next`
   - Add `@kitajs/ts-html-plugin` (TypeScript LSP plugin for XSS safety checks)
   - Remove `@fastify/view` and `ejs` once migration is complete

2. Update `tsconfig.json`:
   - Add `@kitajs/ts-html-plugin` to `compilerOptions.plugins`
   - Enable `"jsx": "react"` and `"jsxFactory": "Html.createElement"` (or `"jsxImportSource": "@kitajs/html"` for automatic runtime)
   - Add `"jsxFragmentFactory": "Html.Fragment"`

3. Register `@kitajs/fastify-html-next` plugin in `src/server.ts`
   - Keep `@fastify/view` registered in parallel during migration so both old EJS routes and new JSX routes work simultaneously

4. Update `src/helpers/useViews.ts`:
   - Add a new `useJsxViews` helper (mirroring `useViews`) that calls `reply.html(...)` instead of `reply.view(...)`
   - Inject the same global context (loggedUser, domainUser, mode, flash, helpers) into JSX props via a shared `getBaseProps(request, reply)` function
   - Keep the existing `useViews` untouched during the transition

---

## Phase 2 — Shared Infrastructure Components (no route changes yet)

Convert the building blocks that everything else depends on first.

5. Create `views/layouts/DefaultLayout.tsx` — mirrors `views/layouts/default.ejs`
6. Create `views/layouts/BaseLayout.tsx` — mirrors `views/layouts/base.ejs`
7. Create `views/layouts/AuthLayout.tsx` — mirrors `views/layouts/auth.ejs`
8. Create `views/layouts/LandingLayout.tsx` — mirrors `views/layouts/landing.ejs`
9. Create `views/partials/Head.tsx` — mirrors `views/layouts/head.ejs`
10. Create `views/partials/Navbar.tsx`
11. Create `views/partials/Footer.tsx` and `FooterCustom.tsx`
12. Create `views/partials/FlashMessages.tsx`
13. Create `views/partials/Post.tsx` and `Posts.tsx`
14. Create `views/partials/PostStats.tsx`
15. Create `views/partials/Profile.tsx`
16. Create `views/partials/Share.tsx`
17. Create `views/partials/Sidebar.tsx`
18. Create `views/partials/FollowButton.tsx`
19. Create `views/partials/FollowActions.tsx`
20. Create `views/partials/UserCard.tsx`
21. Create `views/partials/UserListItems.tsx`

---

## Phase 3 — Migrate Views by Feature (route-by-route)

Each step below: (a) create the `.tsx` file, (b) update the corresponding route to use `useJsxViews`, (c) smoke-test, (d) delete the old `.ejs` file.

22. **Legal pages** (`src/routes/legal.ts` → 6 views) — simplest, no dynamic data
23. **About page** (`src/routes/about.ts` → `views/about.ejs`)
24. **Blog** (`src/routes/blog.ts` → `views/blog/index.ejs`, `views/blog/post.ejs`)
25. **Auth pages** (`src/routes/auth.ts` → 5 views under `views/auth/`)
26. **Index / feed** (`src/routes/index.ts` → `views/index.ejs`, `views/feed.ejs`)
27. **Tags** (`src/routes/tags.ts` → `views/tags/index.ejs`)
28. **Explore** (`src/routes/explore.ts` → `views/explore/bots.ejs`)
29. **Post routes** (`src/routes/post.ts` → `views/posts/create.ejs`, `views/posts/next.ejs`)
30. **Follow routes** (`src/routes/follow.ts` → partial HTML responses for OOB swaps)
31. **User profile + followers/following** (`src/routes/user.ts` — first half, ~4 views)
32. **User settings** (`src/routes/user.ts` — second half, ~6 settings views)
33. **Error pages** — `views/error.ejs`, `views/error-dev.ejs`, `views/404.ejs`; update error handlers in `src/server.ts`

---

## Phase 4 — Cleanup

34. Remove `@fastify/view` plugin registration from `src/server.ts`
35. Remove `ejs` and `@fastify/view` from `package.json`
36. Remove `prettier-plugin-ejs` from Prettier config
37. Delete all remaining `.ejs` files
38. Remove the old `useViews` helper (or rename `useJsxViews` to `useViews`)
39. Run full test suite (`npm run test:ci`)
40. Build check (`npm run build`) — ensure no TypeScript errors including XSS plugin warnings

---

## Key Technical Notes

- **XSS safety:** `@kitajs/html` escapes `{expr}` by default; use `innerHTML={{ __html: expr }}` only for pre-sanitized content (same places `<%- %>` is currently used, e.g. `formatPostContent` output)
- **HTMX partial responses:** JSX fragments (no layout wrapper) replace EJS partials returned by routes like `/posts/next/:cursor` and follow actions — same pattern, just different syntax
- **OOB swaps** (follow-actions): return two adjacent JSX elements wrapped in a fragment; `@kitajs/html` renders them as a flat HTML string, which is exactly what HTMX expects
- **Flash messages:** the `getFlash`/`setFlash` cookie mechanism in `useViews` is pure Fastify/cookie logic — it carries over unchanged into `useJsxViews`
- **Helper functions** (`sanitize`, `getAvatar`, `asset`, `formatPostContent`): imported directly into `.tsx` files rather than injected as template locals — cleaner than the current approach
- **Layouts:** implemented as JSX wrapper components (`<DefaultLayout title="..." csrfToken={...}>`) rather than the `reply.view(name, params, { layout })` mechanism

---

## Verification (per phase)

- After Phase 1: dev server starts, existing EJS routes still work
- After Phase 2: no runtime check needed (components unused); TypeScript must compile cleanly
- After each Phase 3 step: manually verify the affected page and its HTMX interactions in the browser
- After Phase 4: `npm run build` passes with zero errors, `npm run test:ci` passes, all pages render correctly
