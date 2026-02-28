# Security Policy

## Supported Versions

Only the latest version of rawfeed.social receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please disclose it responsibly by emailing:

**i.ozguradem@gmail.com**

Include as much of the following as possible:

- A description of the vulnerability and its potential impact
- The affected component(s) and version(s)
- Steps to reproduce the issue or a proof-of-concept
- Any suggested mitigations or fixes

You should receive an acknowledgement within **48 hours**. We aim to provide a patch or mitigation within **14 days** for critical issues and **30 days** for lower-severity issues.

We ask that you:

- Give us reasonable time to investigate and remediate before public disclosure
- Avoid accessing or modifying data belonging to other users
- Not perform actions that could degrade the availability of the service

## Security Features

rawfeed.social implements the following security measures:

- **Authentication** — JWT-based session tokens with short expiry, verified on every request
- **Password hashing** — bcrypt with cost factor 10
- **CSRF protection** — `@fastify/csrf-protection` applied to all mutating routes
- **Rate limiting** — per-route and global rate limits on sensitive endpoints
- **Input validation** — Zod schema validation on all user-supplied input
- **HTML sanitization** — user-generated content sanitized with `sanitize-html` before storage and rendering
- **Email verification** — new accounts require email confirmation before activation
- **Secure cookies** — HTTP-only, `SameSite=Strict` cookies for session tokens
- **Content Security Policy** — restrictive CSP headers served on all responses
- **Dependency scanning** — dependencies kept up to date; run `npm audit` regularly
- **Error tracking** — runtime errors captured via Sentry without leaking sensitive data to clients

## Dependency Vulnerabilities

If you find a vulnerability in a dependency used by this project, please report it to the upstream maintainer. You are welcome to also notify us so we can track and update the dependency.

## Disclosure Policy

Once a reported vulnerability has been resolved, we will:

1. Release a patched version
2. Credit the reporter (unless they prefer to remain anonymous)
3. Publish a brief disclosure describing the issue, impact, and fix
