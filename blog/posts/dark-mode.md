---
title: Dark Mode Is Here
date: 2026-03-30
author: Özgür Adem Işıklı
excerpt: Rawfeed now supports dark mode, light mode, and system preference detection. Your preference is remembered across sessions, the server renders the correct theme before the first byte of CSS is parsed, and there is no flash of the wrong colour on load. Your eyes will thank you.
---

## A Long Time Coming

If you've spent any time on Rawfeed after sunset, you know the problem. White background, full brightness, the kind of contrast that makes you squint. Dark mode has been one of the most consistently requested features since the project went public, and it's finally here.

As of today, Rawfeed fully supports dark mode.

## How It Works

The theme system has three states:

- **System**: follows your operating system's appearance preference. If your OS switches to dark at night, Rawfeed switches with it. This is the default.
- **Dark**: always dark, regardless of what your OS says.
- **Light**: always light.

You cycle through them using the icon in the top navigation bar. One click moves to the next state. Your preference is saved across cookies, so there's no flash of the wrong theme when you load a new page.

## No Flash, No Hydration Tricks

Most dark mode implementations have a well-known problem: when the page loads, it briefly renders in the wrong theme before JavaScript runs and corrects it. You see a white flash before the dark background appears, or a dark flash before the light background. It's jarring.

Rawfeed avoids this by storing your preference in a cookie. The server reads that cookie before generating the HTML response, so the correct theme class is already present on the `<html>` element before a single byte of CSS is parsed. There's nothing to correct after the fact. The first rendered frame is already correct.

This matters on Rawfeed more than on most sites because we don't ship a client-side framework. Pages are server-rendered HTML. There's no React hydration cycle, no client-side router, no JavaScript running before paint. The server does the right thing upfront.

## Where It Applies

Dark mode covers the full site:

- All feed and post views
- Profile pages and user settings
- Authentication flows (login, register, password reset)
- The explore page and tag feeds
- All settings pages, including data export, domain setup, and account management
- Legal pages (privacy policy, terms, cookie policy, and the rest)
- Blog posts, including this one
- Error pages and rate limit pages

Every surface that carries colour has been audited and updated. If you find something we missed, open an issue.

## Implementation Notes

For those curious about the technical side: the theme is a Tailwind CSS custom variant defined as `.dark` class-based, not `prefers-color-scheme` media query-based. A `@custom-variant dark` rule in the global stylesheet ensures all `dark:` utilities respond to the presence of the `.dark` class on the `<html>` element rather than the OS media query directly.

The system preference mode is handled in JavaScript: when the stored theme is `system`, a `matchMedia('(prefers-color-scheme: dark)')` listener updates the `.dark` class in real time if you change your OS appearance while the page is open.

The toggle button itself carries no inline event handlers. The click is handled by an event listener in the main script file, keeping the content security policy clean.

## That's It

Dark mode is live. Use it, break it, and let us know if something looks off.
