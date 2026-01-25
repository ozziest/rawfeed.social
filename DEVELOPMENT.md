# Development Guide

## Quick Start

### Prerequisites

- Node.js 24+
- MySQL 8+ or PostgreSQL

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Required: DATABASE_URL, COOKIE_SECRET, SESSION_SECRET

# Run migrations
npx knex migrate:latest

# Seed database (optional)
npx knex seed:run
```

### Development

```bash
# Start dev server (with auto-reload)
npm run dev

# Watch Tailwind CSS (in separate terminal)
npm run tailwind:watch
```

Visit `http://localhost:3000`

## Tech Stack

### Core

- **Runtime**: Node.js 24
- **Framework**: Fastify (TypeScript)
- **Database**: MySQL (or PostgreSQL) + Knex.js
- **Templates**: EJS
- **Styling**: Tailwind CSS
- **Interactivity**: HTMX

## Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (runs on save)
- **Commits**: Conventional commits enforced
- **Linting**: ESLint (TypeScript recommended rules)

## Contributing Guidelines

1. **Fork & Clone**: Fork the repo, clone your fork
2. **Branch**: Create feature branch (`feat/your-feature`)
3. **Develop**: Make changes, test locally
4. **Commit**: Use `npm run commit` for conventional commits
5. **Push**: Push to your fork
6. **PR**: Open pull request with clear description

### Commit Message Format

```
feat: add hashtag support
fix: prevent XSS in post content
docs: update development guide
refactor: extract RSS generation
perf: add database indexes
test: add validation tests
chore: update dependencies
ci: add Sentry upload
```

Use `npm run commit` for interactive commit builder.

## Troubleshooting

### Tailwind Not Updating

- Restart `npm run tailwind:watch`
- Check `tailwind.config.cjs` content paths
- Clear browser cache

### TypeScript Errors

- Run `npm run build` to see all errors
- Check `tsconfig.json` configuration
- Ensure all dependencies have type definitions

## Additional Resources

- [Fastify Documentation](https://www.fastify.io/)
- [Knex.js Documentation](https://knexjs.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [AGPL-3.0 License Guide](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Need Help?

- Check existing [GitHub Issues](https://github.com/ozziest/rawfeed.social/issues)
- Ask in [GitHub Discussions](https://github.com/ozziest/rawfeed.social/discussions)
- Review the [roadmap](ROADMAP.md) for planned features

---

**Happy coding!** 🚀
