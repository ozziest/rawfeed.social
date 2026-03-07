---
title: Why We Migrated from EJS to JSX
date: 2026-03-07
author: Özgür Adem Işıklı
excerpt: Rawfeed started with EJS templates. After a week of migration, we're now using JSX for all server-rendered HTML. Here's why we did it, how it went, and what we learned.
---

## Where We Started

When I first set up Rawfeed, I reached for EJS. It's a familiar choice for Node.js projects. You get plain `.ejs` files, sprinkle in `<%= variable %>` tags, and call `reply.view()` to render a page. It works. No complicated setup, no learning curve.

For a while, that was fine.

## The Problem With EJS at Scale

As the project grew, the cracks started showing. EJS templates are just strings. The engine doesn't know what your variables are, what props a partial expects, or whether you've forgotten to pass something. TypeScript can't help you there — by the time the template renders, you're outside the type system entirely.

The specific problems I kept running into:

- **Refactoring was risky.** Rename a variable in a service? The template will silently break at runtime. No compiler error, no warning, just a blank value on a live page.
- **Partials had no contracts.** You'd call `<%- include('./partials/post', { post }) %>` and hope the partial was expecting exactly what you passed. There was no way to enforce it.
- **IDE support was limited.** Autocompletion inside EJS files was unreliable. You were mostly typing blind.
- **Logic crept in.** EJS is permissive. Over time, small bits of display logic accumulated inside templates that should have stayed in the service layer.

None of these are fatal flaws. But together, they were slowing down development and making the codebase harder to trust.

## Why JSX Without React

The natural alternative for TypeScript developers is JSX — but JSX has a reputation for being tied to React, with a virtual DOM, a runtime, and all the complexity that comes with it.

Rawfeed is a server-rendered app. We use HTMX for interactivity. We have no need for a client-side component tree. What we needed was a way to write typed, composable HTML on the server, without shipping a framework to the browser.

That's exactly what [`@kitajs/html`](https://github.com/kitajs/html) does. It's a JSX library that compiles your components to plain HTML strings at build time. No virtual DOM, no hydration, no JavaScript payload. Just fast, static HTML with full TypeScript support.

It integrates directly with Fastify through `@kitajs/fastify-html-plugin`, so you can do `reply.html(<MyPage />)` and the framework handles the rest.

## What the Migration Looked Like

Every `.ejs` view file became a `.tsx` file. Partials became proper components — functions that accept typed props and return `JSX.Element`. Layouts that relied on EJS `include` directives became wrapper components that accept `children`.

A typical EJS partial that looked like this:

```ejs
<div class="post">
  <p><%= post.content %></p>
  <span><%= post.author %></span>
</div>
```

Became a component like this:

```tsx
type PostProps = {
  post: PostDTO;
};

export function Post({ post }: PostProps) {
  return (
    <div class="post">
      <p>{post.content}</p>
      <span>{post.author}</span>
    </div>
  );
}
```

The JSX syntax is familiar to anyone who's worked with React, but here it's just a convenient way to write HTML strings. The compiler checks your prop types. Your IDE autocompletes. Refactoring is safe.

One important note: because `@kitajs/html` isn't React, a few things are different. You use `class` instead of `className`. Event handlers don't exist on the server. And you set `jsxImportSource` in `tsconfig.json` once, globally — no per-file pragma needed.

## What We Gained

**Type safety end to end.** A route passes a typed DTO to a typed view component. If the shape of the data changes, TypeScript catches it before anything ships.

**Reusable components.** The codebase now has a proper component library under `src/views/components/` — form controls, cards, icons, badges. Adding a new page means composing existing pieces rather than copying HTML blocks.

**Easier to test.** Components are just functions. You can call them directly in a test and inspect the output.

**Better developer experience.** Autocompletion works. Refactoring works. The feedback loop is tighter.

## What to Watch Out For

A few things were initially surprising:

- **XSS safety is your responsibility.** `@kitajs/html` escapes strings by default, but if you use `safe` or `innerHTML`, you need to sanitize manually. We use `sanitize-html` wherever we render user-generated content, and the project has an XSS scanner in CI to catch unsafe patterns.
- **No layout inheritance.** EJS-style block/extend patterns don't exist. Layouts are just wrapper components. Once you're used to it, it's actually simpler.
- **HTML attributes use the HTML naming convention.** `class`, `for`, `tabindex` — not the camelCase React versions.

## Was It Worth It?

Yes. A week of migration work for a significant improvement in confidence and tooling. The codebase is now consistent: everything is TypeScript, components have clear contracts, and the compiler catches mistakes before they reach the browser.

EJS is a fine tool for small projects or quick prototypes. But for a growing product where correctness matters, type-safe JSX on the server is the better foundation.

If you're running a server-rendered Node.js app and feeling the same friction, it's worth a look.
