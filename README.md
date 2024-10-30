<!-- ![hero](image.png) -->

<p align="center">
	<h1 align="center"><b>🌩️ Stratokit</b></h1>
<p align="center">
    An open-source SaaS starter cost $0/mo.
    <br />
    <br />
    <a href="https://stratokit.pages.dev"><strong>Website</strong></a> · 
    <a href="https://github.com/jotyy/stratokit/issues"><strong>Issues</strong></a> · 
    <a href="#whats-included"><strong>What's included</strong></a> ·
    <a href="#prerequisites"><strong>Prerequisites</strong></a> ·
    <a href="#getting-started"><strong>Getting Started</strong></a> ·
    <a href="#how-to-use"><strong>How to use</strong></a>
  </p>
</p>

Everything you need to build a production ready SaaS, it's a opinionated stack based on learnings from building Midday using the latest Next.js framework, it's a monorepo with a focus on code reuse and best practices that will grow with your business.

## What's included

[Cloudflare Pages](https://developers.cloudflare.com/pages) - Deployment<br>
[Cloudflare D1](https://developers.cloudflare.com/d1) - Database<br>
[Cloudflare R2](https://developers.cloudflare.com/r2) - Object storage<br>
[Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai) - AI<br>
[Next.js](https://nextjs.org/) - Framework<br>
[Turborepo](https://turbo.build) - Build system<br>
[Biome](https://biomejs.dev) - Linter, formatter<br>
[TailwindCSS](https://tailwindcss.com/) - Styling<br>
[Shadcn](https://ui.shadcn.com/) - UI components<br>
[TypeScript](https://www.typescriptlang.org/) - Type safety<br>
[Drizzle](https://orm.drizzle.team/) - Database<br>
[Upstash](https://upstash.com/) - Cache and rate limiting<br>
[React Email](https://react.email/) - Email templates<br>
[Resend](https://resend.com/) - Email delivery<br>
[Sentry](https://sentry.io/) - Error handling/monitoring<br>
[Trigger.dev](https://trigger.dev/) - Background jobs<br>
[OpenPanel](https://openpanel.dev/) - Analytics<br>
[Stripe](https://stripe.com/) - Billing (coming soon)<br>
[react-safe-action](https://next-safe-action.dev) - Validated Server Actions<br>
[nuqs](https://nuqs.47ng.com/) - Type-safe search params state manager<br>
[next-themes](https://next-themes-example.vercel.app/) - Theme manager<br>

## Directory Structure

```
.
├── apps                         # App workspace
│    ├── app                     # App - your product
│    ├── web                     # Marketing site
│    └── ...
├── packages                     # Shared packages between apps
│    ├── analytics               # OpenPanel analytics
│    ├── db                      # Drizzle ORM
│    ├── email                   # React email library
│    ├── jobs                    # Trigger.dev background jobs
│    ├── kv                      # Upstash rate-limited key-value storage
│    ├── logger                  # Logger library
│    └── ui                      # Shared UI components (shadcn-ui)
├── tooling                      # are the shared configuration that are used by the apps and packages
│    └── typescript              # Shared TypeScript configuration
├── .cursorrules                 # Cursor rules specific to this project
├── biome.json                   # Biome configuration
├── turbo.json                   # Turbo configuration
├── LICENSE
└── README.md
```

## Prerequisites

### Required

Cloudflare<br>
Bun<br>

### Optional

Upstash<br>
Trigger.dev<br>
Resend<br>
Sentry<br>
OpenPanel<br>

## Getting Started

Clone this repo locally with the following command:

```bash
bunx degit jotyy/stratokit stratokit
```

1. Install dependencies using bun:

```sh
bun i
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
# Copy .env.example to .env for each app
cp apps/api/.env.example apps/api/.env
cp apps/app/.env.example apps/app/.env
cp apps/web/.env.example apps/web/.env
```

4. Start the development server from either bun or turbo:

```ts
bun dev // starts everything in development mode (web, app, api, email)
bun dev:web // starts the web app in development mode
bun dev:app // starts the app in development mode
bun dev:email // starts the email app in development mode

// Database
bun generate // generate the database schema
bun migrate // run migrations
bun seed // run seed
```

## How to use

This boilerplate provides a great starting point for your own project. Thanks to Cloudflare, we can deploy, use D1, R2, Workers AI for free and focus on building the product.

### WIP

## Credits

- [v1](https://v1.run/) - Inspiration from their great work
