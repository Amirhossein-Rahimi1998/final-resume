## Quick orientation for automated coding agents

This repository is a Next.js (App Router) monorepo-style project with a main site and a nested demo "social-app" under `app/introduction-projects/social-app`. The goal of this document is to point an AI coding agent to the small set of rules and files that matter for making safe, correct edits quickly.

Key facts (high level)
- Framework: Next.js App Router (see `app/layout.tsx`, `app/page.tsx`).
- Secondary demo app: `app/introduction-projects/social-app` — it has its own `(root)` and `(auth)` layouts and API routes.
- Auth: Clerk (server + client). See `middleware.ts` and `app/introduction-projects/social-app/(root)/layout.tsx`.
- File uploads: UploadThing (server route + react helpers). See `app/**/api/uploadthing/*` and `lib/uploadthing.ts`.
- Database: MongoDB via Mongoose. Connection helper at `lib/MongoDbForSocialApp/mongoose.ts` and models under `lib/models`.
- Webhooks: Svix verification for Clerk webhooks at `app/api/webhooks/clerk/route.ts` and the social-app equivalent.

Where to make API changes
- App Router API routes live under `app/api/*` and also under `app/introduction-projects/social-app/api/*` for the demo. Examples:
  - UploadThing route: `app/api/uploadthing/core.ts` + `app/api/uploadthing/route.ts` (also mirrored under the social-app path).
  - Clerk webhook: `app/api/webhooks/clerk/route.ts` (verify with `WEBHOOK_SECRET`).

Important developer workflows / commands
- Local dev server: `npm run dev` (runs `next dev`). Use this to get fast feedback at http://localhost:3000.
- Build / start: `npm run build` then `npm run start` (production Next.js server).
- Lint: `npm run lint` (project runs `eslint` but note next.config.ts sets `eslint.ignoreDuringBuilds: true`).

Essential environment variables (set in `.env.local` or CI):
- MONGODB_URL — used by `lib/MongoDbForSocialApp/mongoose.ts` to connect to MongoDB.
- WEBHOOK_SECRET — used by `app/api/webhooks/clerk/route.ts` to verify Svix payloads.
- UPLOADTHING_TOKEN — used by UploadThing routes/helpers (see `app/**/api/uploadthing/*` and `lib/uploadthing.ts`).
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY and various `NEXT_PUBLIC_CLERK_*` values — used across Clerk client/server code and middleware.
  (Search `process.env.` to see where others are referenced.)

Project-specific conventions and patterns
- App Router + Server/Client split:
  - Files with `"use client"` at top are client components (look in `components/socialApp/*`).
  - Server code uses server-only helpers (e.g., `currentUser` from `@clerk/nextjs/server`). See `app/introduction-projects/social-app/(root)/layout.tsx`.
- Two parallel API namespaces: the main app API (under `app/api`) and the demo social-app API (under `app/introduction-projects/social-app/api`). Keep routes and router handlers in the correct folder.
- Mongoose connection helper is a singleton-style connector: prefer calling `connectToDB()` from server API handlers before DB operations (see `lib/MongoDbForSocialApp/mongoose.ts`).
- UploadThing pattern: define `ourFileRouter` in `app/.../api/uploadthing/core.ts`, export route handler in `route.ts`, and generate React helpers in `lib/uploadthing.ts`. Client components call `useUploadThing('media')` (see `components/socialApp/forms/AccountProfile.tsx`).
- Clerk: middleware is enabled via `middleware.ts` (uses `clerkMiddleware()` and a matcher). Layouts wrap parts of the app with `ClerkProvider` (see `app/introduction-projects/social-app/(root)/layout.tsx` and `(auth)/layout.tsx`).

Integration points to be careful about
- Clerk (auth) — many pages call `currentUser()` from server; changing Clerk usage or config requires checking `middleware.ts`, layouts, and `.env.local` keys.
- Webhooks — endpoints verify payloads with `WEBHOOK_SECRET` using `svix`. Tests or changes to the webhook handler must preserve verification and error handling (see `app/api/webhooks/clerk/route.ts`).
- Uploads — UploadThing server middleware enforces authentication in `core.ts` and returns metadata consumed by client callbacks. Do not remove `middleware` checks.
- Server bundling — `next.config.ts` includes `serverExternalPackages: ['mongoose']` to avoid bundling server-only packages into Edge builds. When adding server-only libs, follow this pattern.

Quick file map (examples)
- App root: `app/layout.tsx`, `app/page.tsx`
- Social demo root: `app/introduction-projects/social-app/(root)/layout.tsx`, `(auth)/layout.tsx` and pages under that tree
- UploadThing: `app/**/api/uploadthing/core.ts`, `app/**/api/uploadthing/route.ts`, `lib/uploadthing.ts`
- Webhooks: `app/**/api/webhooks/clerk/route.ts`
- Mongo helper: `lib/MongoDbForSocialApp/mongoose.ts` and models in `lib/models` (e.g. `lib/models/user.model.ts`)
- Clerk middleware: `middleware.ts`

Testing & debugging notes for an agent
- Hot dev: run `npm run dev` and use browser to exercise UI flows. For auth flows use Clerk dashboard keys or local keyless mode.
- Webhooks: to test webhook handlers locally, either use svix/test tools or send a signed request that mimics Clerk headers; the handler requires `svix-id`, `svix-timestamp`, and `svix-signature` headers.
- DB: the repo expects a live `MONGODB_URL`. For isolated changes, mock or stub `connectToDB` or run a disposable Mongo instance.

Notes / restrictions
- This file documents only discoverable patterns and files. Don't invent hidden infra or other secrets. Avoid changing build flags (e.g., `typescript.ignoreBuildErrors` or `eslint.ignoreDuringBuilds`) without confirming intent — they are project-level decisions.

If anything in this summary is unclear or you need more detail about a particular area (auth flows, upload flow, or DB models), tell me which part to expand and I'll update this file.
