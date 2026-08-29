# 05 — Implementation Guide

**Phase:** 5 of 6  
**Document type:** Developer handbook  
**Status:** Approved  
**Depends on:** `01-Design-System.md`, `02-UX-Architecture.md`, `03-Page-Blueprint.md`, `04-Component-System.md` (all approved)  
**Downstream:** `06-Polish-and-Finishing.md` may refine motion, empty/loading cosmetics, and QA. It may not change routes, data shapes, folder names, or component contracts.

This is the handbook for building the public portfolio specified in Phases 1–4. It is **not application source**. It tells another engineer exactly how to implement: where files live, what is a Server Component, how content is stored, how the page scores 95+ on Lighthouse, and how git should look.

This is a **from-scratch public site** on top of a **kept backend**. MongoDB, NextAuth, the contact inbox, blob storage, and the admin app remain. Three.js, the cinematic engine, ManishOS, custom cursors, GSAP, Lottie, and the public blog/skills destinations do not.

**Stack (locked for v1 public):**

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript strict | Already the repo; SSR/SEO required by Phase 2 |
| Styling | Tailwind CSS v4 driven **only** by Phase 1 tokens (CSS custom properties) | Utility CSS is allowed in implementation; ad-hoc values are not |
| Fonts | Geist Sans + Geist Mono via `next/font` (or the Geist package) | Phase 1 |
| Icons | Lucide through `Icon` only | Phase 4 |
| Motion | CSS transitions for hover/nav/reveal; no WebGL; Framer Motion **optional** and only for `CommandMenu` enter if CSS cannot express scale 0.98→1 without overshoot. If Framer is kept, it must read `prefers-reduced-motion` | Phase 1 |
| Data | MongoDB + Mongoose | Existing CMS |
| Auth | NextAuth credentials, `/admin` only | Existing |
| Files | Vercel Blob for project/about images and résumé PDF | Existing |
| Validation | Zod on all public mutations and env | |
| Hosting | Vercel | Natural for this stack |

**Remove from the public client bundle (do not import on `/` or `/work/*`):** `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lottie-react`, cinematic/ManishOS/3d component trees. They may stay in `package.json` until a cleanup PR; they must not ship to visitors.

---

# Folder structure

Target tree after the public rebuild. Admin may keep its current files under `app/admin` until a later pass. Public files **replace** `app/page.tsx` and the cinematic tree; they do not sit beside a second homepage.

```
app/
  layout.tsx                 Root: fonts, tokens class, metadata defaults, providers
  page.tsx                   Home (Server Component): fetch all public data, render sections
  not-found.tsx              NotFoundSection inside SiteShell
  robots.ts
  sitemap.ts
  opengraph-image.tsx        Optional generated OG (typographic); or a static file in public/
  globals.css                Tokens + reset only (no component styles dumped here)
  work/
    [slug]/
      page.tsx               Case study (Server Component)
  resume/
    route.ts                 GET: redirect or stream the PDF
  login/                     Unchanged conceptually (private)
  admin/                     Unchanged conceptually (private)
  api/
    contact/route.ts         POST public form (Zod + rate limit)
    github/route.ts          Server-side GitHub GraphQL (cached)
    …                        Existing admin CRUD remains private

components/
  primitives/                Phase 4 list, one file per component
  chrome/
  content/
  sections/

lib/
  db.ts                      Mongo connect (existing pattern)
  models/                    See Data structure — prune public use of Skill/Blog
  content/                   Mappers: DB document → Phase 4 props
  github/                    fetch + normalize contribution weeks
  seo/                       JSON-LD builders
  utils/                     cn, clipboard, dates, hashes
  validation/                Zod schemas (contact, env)
  constants/                 nav items, section ids, site URL

hooks/                       Client-only: useScrollSpy, useHashReplace, useCommandMenu, useTheme, useMediaQuery, useReducedMotion, useLockBodyScroll, useFocusTrap

contexts/
  ThemeProvider.tsx          class on html, localStorage, prefers-color-scheme
  LiveRegionProvider.tsx     single polite region

public/
  resume/                    not the source of truth if Blob is used; Blob URL in settings
  fonts/                     only if self-hosting Geist files

docs/
  01-Design-System.md
  02-UX-Architecture.md
  03-Page-Blueprint.md
  04-Component-System.md
  05-Implementation-Guide.md
  06-Polish-and-Finishing.md   (next)

scripts/
  create-admin.js
  seed.js                    Seed Settings, Projects, Experience, Capabilities — not Skills-as-bars
```

**Do not recreate:** `components/Cinematic/`, `components/ManishOS/`, `components/3d/`, `components/sections/` from the old site (old Hero/Projects/Skills). New `components/sections/` is Phase 4 only.

**Path alias:** `@/` → repo root, as today.

---

# App Router architecture

## Rendering model

| Route | Type | Data | Client islands |
|---|---|---|---|
| `/` | Server Component page | Mongo (settings, projects, experience, capabilities) + GitHub (cached) in parallel | SiteShell chrome: nav scroll, menu, command, theme, contact form, copy |
| `/work/[slug]` | Server Component page | One project by slug; 404 if missing | Same chrome; no form unless reused |
| `/resume` | Route handler | Settings.resumeUrl | None |
| 404 | Server | None | Chrome |
| `/admin/*` | As today, client-heavy | CRUD | Out of public design |

**Default to Server Components.** Add `"use client"` only when the file uses state, effects, browser APIs, or event handlers. Push the client boundary **down**: `HeroSection` can be a Server Component that renders a client `Button` if needed — or Hero stays server because `Button` with `href="#contact"` is a link and needs no JS.

**Client boundary map (binding):**

| Must be client | Why |
|---|---|
| `ThemeProvider`, `ThemeToggle` | localStorage + class |
| `Navbar` (or a `NavbarClient` wrapper) | scroll listener, menu, spy |
| `MobileMenu` | trap, lock scroll |
| `CommandMenu`, `CommandTrigger` | keyboard, query |
| `ContactForm` | controlled fields, submit |
| `CopyButton` | clipboard |
| `LiveRegion` provider | announcements |
| `Plate` if grayscale is CSS-only | **can stay server** — hover via CSS |
| Sections | **server** if they only compose; wrap tiny clients inside |

**Prefer CSS :hover** for Plate grayscale so featured work is server-rendered HTML + CSS, no JS for the signature interaction.

## Root layout

- `html lang="en"` `class` includes font variables and no forced `dark` until theme script runs.
- **Theme flash:** a tiny inline script in root layout (before paint) reads localStorage + `prefers-color-scheme` and sets `class` on `html`. This is the one allowed exception to “no extra theater.” Without it, light canonical still flashes if the user saved dark.
- `body`: `color.bg`, Geist, antialiased. **No `scroll-smooth` on `html` by default** if it fights reduced motion; apply smooth only on user-initiated hash clicks via a small helper, or use `scroll-behavior: smooth` inside `@media (prefers-reduced-motion: no-preference)`.
- Providers: Theme, LiveRegion, SessionProvider only around admin (do not wrap the entire public tree in NextAuth if it pulls client JS — keep SessionProvider in `app/admin/layout.tsx`).
- `SiteShell` wraps `{children}` for public routes. **Admin layout must not use `SiteShell`.** Split: `app/(public)/layout.tsx` with SiteShell vs `app/admin/layout.tsx`. Use a route group `(public)` for `/`, `/work`, 404.

**Route groups:**

```
app/
  (public)/
    layout.tsx          SiteShell + public providers
    page.tsx
    work/[slug]/page.tsx
    not-found.tsx
  (admin)/              or keep app/admin as today
    admin/...
    login/
  api/
```

If moving files is too risky in one PR, `app/layout.tsx` can branch: if pathname starts with `/admin` or `/login`, skip SiteShell. Prefer route groups.

## Home page data flow

1. `page.tsx` (server) calls `getPublicHomeData()` (cached).
2. Maps documents → Phase 4 props via `lib/content/*`.
3. Renders sections in Phase 2 order with no extra wrappers.
4. Passes `commandItems` (projects + static destinations) into SiteShell.

`getPublicHomeData` uses `Promise.all` for settings, projects, experience, GitHub. One failure in GitHub must not fail the page (Activity `status=error`). Mongo failure: error boundary / 500.

## Case study

- `generateStaticParams` from project slugs if the set is small (3–5) — **lock: ISR or static** with `revalidate` 60–300s so CMS edits appear without rebuild. `dynamic = 'force-static'` plus revalidate is acceptable.
- `generateMetadata` per slug (Phase 2 titles).
- Unknown slug: `notFound()`.

## Hash routing

- Home sections have `id` per Phase 2.
- `scroll-margin-top` on sections.
- Navbar clicks: `replaceState` hash (Phase 2). Implement in the client nav helper, not via Next.js `<Link scroll>` adding history entries per section.
- Deep link `/#contact`: native hash on load + `scroll-margin`. After hydration, Navbar spy catches up. No autofocus.

## Middleware

- Keep: protect `/admin/:path*`.
- Do **not** protect `/api/contact` (public POST) or `/api/github` if it remains public GET — **prefer GitHub fetched only on the server in `page.tsx`, delete public `/api/github` from the client.** If the route stays for admin previews, require auth or cache it server-only.
- Add rate limiting for POST `/api/contact` (see Error handling).

---

# Naming conventions

Extends Phase 4.

| Kind | Convention | Example |
|---|---|---|
| Component file | PascalCase, matches export | `ProjectRow.tsx` |
| Hook | `use` + camelCase | `useScrollSpy.ts` |
| Mapper | `to` + Component props | `toFeaturedProjectProps(doc)` |
| Zod schema | camelCase + `Schema` | `contactFormSchema` |
| Env | `SCREAMING_SNAKE` | `NEXT_PUBLIC_SITE_URL` |
| CSS variables | `--` + Phase 1 token with dots → dashes | `--color-bg`, `--type-display-lg`, `--space-8` |
| Section ids | Phase 2 hashes | `work`, `experience`, `capabilities`, `activity`, `about`, `contact` |
| Slugs | lowercase hyphen | `dayzo`, `servyq` |
| Boolean props | `is` / `has` | `isScrolled` |
| Collections | plural nouns | `projects`, `roles` |

**Functions:** verb first (`getProjectBySlug`, `buildPersonJsonLd`).  
**Do not prefix** components with `Public` or `New`.

**CSS:** No extra class names like `bento-card`, `glass`, `accent-amber`. If a name is not a token or a component, it does not exist.

---

# State management

**Content is not client state.** Projects, copy, experience, and GitHub weeks are fetched on the server and passed as props. No Zustand store of portfolio content. Delete the old `experience-store` section machine from the public site.

## Server state

- Mongo reads in `lib/content` / `lib/models` with Next `cache` / `revalidate`.
- GitHub: `fetch` with `next: { revalidate: 3600 }` (1 hour) and `GITHUB_TOKEN` server env.

## Client state (minimal)

| State | Owner | Persistence |
|---|---|---|
| Theme | `ThemeProvider` | localStorage key `theme` = `light` \| `dark` \| `system` (default **system**, visual default light when system is light — Phase 1 canonical light when OS is light) |
| Mobile menu open | Navbar | Memory only |
| Command menu open, query, activeIndex | CommandMenu | Memory; `⌘K` global listener |
| Contact form fields/status | ContactForm | Memory; reset on success after 2s label revert |
| Live region message | LiveRegionProvider | Memory, clear after 2s |
| Nav `isScrolled` | Navbar | Memory, scrollY > 8 |
| Scroll spy current | `useScrollSpy` | Memory |

**Zustand:** allowed for a single `useUiStore` **only if** it is smaller than three contexts. Prefer React context colocated in chrome to keep the public bundle obvious. Do not add Redux, TanStack Query on the public home (SSR already has the data). TanStack Query may remain in admin.

## Derived, not stored

- Command items = static list + project titles from **props** (pass from server page into SiteShell).
- `fullWidthSubmit` = viewport &lt; 1024 (match or CSS). Prefer CSS for button width; do not store breakpoint in JS unless necessary.
- Contribution week slice (53 vs 26): compute on server with a hint, **or** pass full 53 weeks and let CSS/grid hide — Phase 3 lock is 26 weeks on mobile. **Lock: pass 53 weeks from server; `ContributionGraph` slices to 26 when viewport &lt; 768** (client graph **or** CSS overflow hidden with 26 weeks duplicated). Simplest a11y: server sends 53; a tiny client wrapper slices. Caption must match: `useMediaQuery` updates ActivityStat caption. Alternative: always show 53 weeks with horizontally scrollable plate on mobile — **rejected** (Phase 3 specified 26 weeks). So: `ContributionGraph` is a client component that slices, **or** CSS container queries. Client slice is OK; the rest of ActivitySection stays server.

---

# Data structure

Mappers convert DB → props. The public site never receives raw Mongoose documents.

## Project (Mongo, evolved)

Keep the existing collection. **Add** `slug` (unique, required). **Add** `caseStudy` structured fields (or keep `content` markdown and parse into Phase 4 `sections` in the mapper — structured is safer for heading levels).

| Field | Kind | Public use |
|---|---|---|
| `title` | string | Featured/row/case `h1` |
| `slug` | string | `/work/[slug]` |
| `description` | string | Lede / row summary (1–2 sentences) |
| `image` | url | Plate 16:9 |
| `technologies` | string[] | MetaLine (show 3–5) |
| `liveUrl` | url? | Omit link if empty |
| `githubUrl` | url? | Omit if empty; do not 404 |
| `featured` | boolean | Exactly one featured; mapper throws in dev if 0 or 2+ |
| `isCurrentlyWorking` | boolean | `status: in-progress` |
| `order` | number | Editorial order after featured |
| `role` | string? | e.g. `Full-stack` — **add if missing** |
| `year` | string? | `2025` — **add** or derive from `createdAt` (prefer explicit) |
| `kicker` | string? | Category `On-demand services` |
| `caseStudy` | object or markdown | See below |
| timestamps | | sitemap lastModified |

**Case study object (preferred):**

```
caseStudy.problem: string[]          paragraphs
caseStudy.role: string[]
caseStudy.approach: string[]
caseStudy.highlights: string[]
caseStudy.outcome: string[]
caseStudy.figure: { src, alt, caption }?
```

Mapper turns these into `CaseStudyBody` `sections` with headings Problem, Role and constraints, Approach, Highlights, Outcome.

If only `content` markdown exists during migration, a parser may split on `##` headings. New writes in admin should use structured fields.

## Experience

Existing fields map cleanly:

| Field | Props |
|---|---|
| `role`, `company` | ExperienceRow |
| `startDate` | `startYear` YYYY |
| `endDate` / `current` | `endYear` `Present` or YYYY |
| `location` | location |
| `description[]` | Join first 1–2 sentences into `summary` (homepage compression). Do not dump five bullets on Home |
| `logo` | **ignored on public** |
| `order` | sort, reverse-chronological as default sort key = startDate desc |

## Settings (site copy)

Extend, do not invent a second CMS.

| Field | Use |
|---|---|
| `siteTitle` / `siteDescription` | Fallback metadata; prefer hardcoded Phase 2 title formula |
| `heroKicker` | default `Software engineer` — **add** |
| `heroName` | default `Manish Jangra` |
| `heroText` | lede |
| `heroAvailability` | optional caption |
| `aboutTitle` / `aboutText` / `aboutText2` | About paragraphs (concat to max 3) |
| `aboutImage` | Portrait |
| `showAboutImage` | hasPortrait |
| `contactHeading` | Contact h2 |
| `contactDescription` | support |
| `resumeUrl` | tertiary + footer + `/resume` |
| `socialLinks.email` | Contact + mailto |
| `socialLinks.github` | Activity + footer |
| `socialLinks.linkedin` | Contact + footer |
| `socialLinks.whatsapp` | optional ContactDetails |
| `socialLinks.twitter` | footer only if present |
| `location` | default `Chandigarh, India` — **add** if not present |
| `workHeader` / `experienceHeader` / … | optional CMS for SectionHeader; else constants in `lib/constants/copy.ts` |

**Capabilities:** do **not** use Skill proficiency. Add `settings.capabilities`:

```
{ label: "Clients", items: string[] }
{ label: "Servers", items: string[] }
{ label: "Platform", items: string[] }
```

Exactly three. Seed from Phase 3 example names. Admin: three list fields, not a skill bar UI. The Skill collection may remain for admin legacy but **must not** feed the public page.

## Contact message

Unchanged: `name`, `email`, `message`, `read`. POST from public form.

## GitHub (not Mongo)

Normalized type:

```
profileUrl
totalContributions: integer
weeks: { date, count }[][]   // 53×7
repos?: { name, description, language, href }[]  // ≤3
```

Ignore GitHub `color` fields. Bucket counts into 5 levels in the mapper.

## Command items (built on server)

Static: Work, Experience, Capabilities, Activity, About, Contact, Home, Résumé, Email (copy), GitHub, LinkedIn, Toggle theme.  
Dynamic: one item per project title → `/work/slug`.

## Env (Zod at boot)

Required: `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `GITHUB_TOKEN` (server).  
Optional: Blob token (existing), `CONTACT_RATE_LIMIT`.  
Never expose `GITHUB_TOKEN` or Mongo to the client.

---

# Content management

## Public vs admin

- **Public** is read-only except `POST /api/contact`.
- **Admin** continues to edit projects, experience, settings, contact inbox, résumé upload, about image.
- Admin v1 **does not** need a visual redesign to ship the public site. It must gain: project `slug`, `kicker`, `year`, `role`, structured case study fields, capabilities editor, featured uniqueness check.
- Blog admin: hide from nav or keep but **no public routes**. Old `/blog` and `/blog/[slug]` **301** to `/` (Phase 2).
- Skills admin: optional deprecation; public ignores it.

## Editorial rules enforced in admin validation (Zod)

- Exactly one `featured: true` project.
- 3–5 published projects (a `published` boolean — **add**; unpublished do not appear). If the old model has no `published`, treat all as published until added.
- Slug unique, matches `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- Featured image required for featured project.
- Case study required before a project can appear on Home (row must not link to GitHub only).

## Copy constants vs CMS

Hero lede, section kickers, and nav labels can start as `lib/constants/copy.ts` matching Phase 2/3, with CMS overrides when settings fields are non-empty. **Nav labels are never CMS** (IA lock).

## Images

- Upload via existing Blob flow.
- Store HTTPS URLs only.
- Alt text: add `imageAlt` on Project (required). Portrait alt is the name.

## Seed

`scripts/seed.js` creates settings + Servyq + Dayzo + experience stubs + three capability groups so a fresh env can render Home. Do not seed fake GitHub weeks.

---

# Image optimization

- Use `next/image` for all photographs (featured, portrait, case study, diagram).
- **LCP on `/`:** the `h1`, not an image. Do not `priority` a below-fold featured image.
- **LCP on `/work/[slug]`:** project `h1` or the 16:9 if it is in the first viewport — if the image is immediately under recap, set `priority` on that image only.
- Aspect: 16:9 featured/case; 1:1 portrait. Reserve aspect boxes in `Plate` so no CLS.
- Formats: AVIF/WebP via Next defaults. Quality 75 (existing config). Add `qualities` including 75 and 90 if needed for screenshots (UI shots suffer at 10).
- Remote patterns: keep Blob + any known host; **remove Unsplash** if unused (reduces accidental stock photos).
- Grayscale: CSS `filter` on the `img`, not a second asset.
- SVG diagrams: if used, `Image` or inline; alt still required.
- OG image: 1200×630, light paper + name + role, no screenshot of 3D. Generate with `opengraph-image` or a static PNG in `public/og.png`.
- Résumé: PDF, not an image. `/resume` redirects to Blob URL with `Content-Disposition` optional.

---

# Performance strategy

The site must feel instant because Phase 1 made performance a brand promise.

## Budgets (public `/`)

| Metric | Goal |
|---|---|
| LCP | &lt; 1.8s on simulated Slow 4G (Lighthouse) |
| INP | &lt; 200ms |
| CLS | &lt; 0.02 |
| TBT | &lt; 150ms |
| JS transferred (gzip, first load, home) | **&lt; 120 KB** JS; stretch &lt; 90 KB |
| Fonts | 2 families, weights 400+500 only |

## How to hit the JS budget

- Server-render Home HTML (sections as RSC).
- No Three.js, no GSAP, no Lottie, no whole Framer tree on every section.
- If Framer is used, import only in `CommandMenu`.
- Lucide: import icons through `Icon` switch so unused icons tree-shake.
- No `zustand` on Home if context suffices.
- NextAuth not on public layout.
- Analyze with `@next/bundle-analyzer` in CI optional; locally before launch.

## Fonts

- `next/font` Geist, `latin` subset, `display: swap` or `optional` for body (Phase 1).
- Preload only the 400/500 files actually used.
- Fallback metrics if Geist package provides them (reduce CLS).

## CSS

- Tailwind v4 with a token theme (CSS variables on `:root` and `.dark`).
- Do not ship unused cinematic CSS (noise overlays, amber).
- Scrollbar tokens as specified.

## Caching

- Home: `revalidate` 60–300 seconds.
- GitHub fetch: 3600 seconds.
- Case studies: same revalidate; `generateStaticParams`.
- Contact POST: `dynamic`.

## Runtime

- Edge not required. Node runtime for Mongo.
- Streaming: optional `loading.tsx` for case study only; **Home should not show a site-wide spinner** (Phase 2). If Mongo is slow, a static shell is better than a branded loader.

---

# Animation strategy

Implementation of Phase 1 philosophy + Phase 4 ownership.

| Interaction | Technique |
|---|---|
| Button/link/nav color | CSS `transition` `motion.fast` 150ms `ease.out` |
| Nav hairline/background | CSS 150ms |
| Plate grayscale | CSS 400ms on `:hover` / `:focus-within` |
| Mobile overlay | CSS opacity 200ms; reduced motion: 0 |
| Command menu | CSS or Framer: opacity + scale 0.98–1, 200ms, no overshoot |
| Section reveal | CSS `@media (prefers-reduced-motion: no-preference)` with a tiny IntersectionObserver **or** CSS `animation-timeline` if baseline is enough. **Lock: IntersectionObserver once, add class `is-visible`, CSS handles 8px/400ms.** Only first 4 list children get `transition-delay` 0/60/120/180ms. Hero has no observer |
| Route change | Optional `template.tsx` fade 200ms; skip if it causes flicker. Prefer instant RSC navigation |
| Spinner | CSS rotate; hide for reduced motion, show text |

**Global:** `useReducedMotion` hook for JS paths. CSS media query for CSS paths. Both required if any JS motion exists.

**Forbidden to implement:** scrolljack, snap, parallax, count-up, typing, magnetic, custom cursor, page morph.

---

# SEO implementation

## Metadata

**Root defaults (`layout` or public layout):**

- `title.template`: `%s` — actually Phase 2 Home is exact: `Manish Jangra — Full-Stack Software Engineer` (no extra site suffix on Home). Template for children: `%s · Manish Jangra`.
- `description`: hero lede, ≤155 characters.
- `metadataBase`: `NEXT_PUBLIC_SITE_URL`.
- `alternates.canonical` per page.
- `openGraph`: type website, locale `en_US`, siteName `Manish Jangra`, images 1200×630.
- `twitter.card`: `summary_large_image`.
- `robots`: index follow on public; admin `noindex` via admin layout metadata.

**Home:** title as Phase 2. Canonical `/`.

**Case study:** `{Project} — Manish Jangra`. Description = one-line outcome. Canonical `/work/slug`. OG image: product crop or fallback typographic.

**404:** `noindex`.

## JSON-LD

On Home, a single `<script type="application/ld+json">` `Person`:

- `name`: Manish Jangra  
- `jobTitle`: Full-Stack Software Engineer  
- `url`: site URL  
- `email`  
- `address`: `{ addressLocality: Chandigarh, addressCountry: IN }`  
- `sameAs`: GitHub, LinkedIn, X if present  

On case study: `CreativeWork` or `SoftwareApplication` with `name`, `description`, `author` Person. Keep it honest (no fake ratings).

## robots.ts

- Allow `/`
- Disallow `/admin`, `/login`, `/api`
- Sitemap URL from `NEXT_PUBLIC_SITE_URL`

## sitemap.ts

- `/`
- Each published `/work/[slug]` with `lastModified` from `updatedAt`
- **Do not** include `/blog`, hashes, `/resume` (file), `/login`, `/admin`

## Trailing slashes

**Lock: no trailing slash** (`trailingSlash: false`, Next default). Canonical without slash.

## Redirects (`next.config`)

- `/blog`, `/blog/:slug` → `/` 301  
- `/projects` → `/#work` is a hash; **redirect `/projects` → `/` 301** (hash not in 301). Optionally `/projects/:x` → `/work/:x` if old slugs exist  
- Old cinematic-only paths: 301 `/`  

## Headings and crawl

- HTML from RSC: crawlers see `h1`/`h2`/`h3` and project text without executing WebGL.
- Real `<a href>` for nav and case studies.
- `rel="me"` on GitHub profile link.

---

# Accessibility implementation

Phase 1 + 2 + 4, as engineering tasks:

1. Landmark structure from `SiteShell`.
2. Skip link first in DOM.
3. Focus ring utility on all interactive elements (`:focus-visible` only).
4. `aria-current` from spy / case study.
5. Command combobox pattern (Phase 4) — test with keyboard only.
6. Mobile dialog + trap + restore + `Esc`.
7. Form: labels, `aria-invalid`, `aria-describedby`, live region on success/copy.
8. Featured/row: single tab stop, labelled by title+summary.
9. Graph `aria-hidden`; stat text required.
10. `prefers-reduced-motion` on CSS and JS.
11. Hit targets 40px (IconButton compact uses padding).
12. `lang="en"`.
13. Contrast: use tokens only; do not introduce new grays.
14. Automated: `eslint-plugin-jsx-a11y` (via eslint-config-next). CI: axe on Home and one case study (Playwright).

Manual pass is Phase 6. This phase requires the hooks and attributes to exist.

---

# Loading strategy

| Surface | Behavior |
|---|---|
| Home first visit | Full HTML from server. Fonts swap. No splash, no boot, no top progress bar |
| Home GitHub slow | Page ships with Activity `error` or with cached graph; never block Hero |
| Case study navigation | Instant RSC; optional `loading.tsx` = recap skeleton matching layout (title lines + 16:9 gray plate `color.surface`). No spinner in the center of the viewport |
| Images | `next/image` lazy except priority cases above |
| Command menu | Code-split: `dynamic()` import `CommandMenu` so first load can omit it until `⌘K` or idle prefetch. **Lock: prefetch on idle after load** so the first ⌘K is instant |
| Contact submit | Button loading state only |
| Admin | Unchanged |

**No `loading.tsx` at the root public layout** (would replace the whole shell including nav).

---

# Error handling

| Error | User-facing | Engineer |
|---|---|---|
| Mongo down on Home | `app/error.tsx` in `(public)`: typographic, `Something went wrong`, TextLink retry / home. Same tokens. No stack | Log server-side |
| Project slug missing | `notFound()` → 404 section | |
| GitHub API fail | Activity error fallback (Phase 3/4) | Log, do not throw Home |
| Contact validation | Field errors from Zod | 400 |
| Contact spam | 429 + helper `Please try again in a minute` | Rate limit by IP (Upstash or in-memory Map on a single instance; Vercel: prefer @upstash/ratelimit if already in ecosystem, else a simple token bucket in KV). **Minimum:** honeypot field `website` unused, time-trap, Zod max lengths (name 80, message 5000) |
| Contact server fail | Form status `error`, helper `Could not send. Email me directly.` | 500 log |
| Clipboard fail | LiveRegion `Copy failed` | |
| Blob image 404 | `onError` not required if URLs valid; Plate empty state = surface well, no broken icon soup | |

`ErrorBoundary` class from the old app may wrap public children; keep it quiet (Phase 1 voice).

**Admin errors:** stay as they are.

---

# Deployment

- **Platform:** Vercel, production branch `main`.
- **Env:** set all Zod-required vars in Production and Preview. Preview may use a separate Mongo DB.
- **Build:** `next build` must pass lint + typecheck. Add `"typecheck": "tsc --noEmit"` and run it in CI.
- **Node:** 20+.
- **Domains:** `NEXT_PUBLIC_SITE_URL` must match the canonical host (www vs apex — pick one, redirect the other in Vercel).
- **GitHub token:** fine-grained, read user + contributions; rotate if leaked.
- **Analytics:** none in v1, or a privacy-friendly optional later (Phase 6). No heavy GTM on first paint.
- **Headers:** default Next; add `referrerPolicy` origin-when-cross-origin in metadata. Security headers in `next.config` (`X-Frame-Options` DENY, `X-Content-Type-Options` nosniff). CSP optional v1; if added, must allow fonts and Blob images.
- **ISR:** revalidate as above; on-demand revalidate webhook from admin save is a nice-to-have (`revalidatePath('/')` after settings/project PUT). **Lock: implement `revalidatePath` on admin mutations** so CMS edits appear without waiting 5 minutes.

---

# Testing

## Layers

| Layer | Tool | What |
|---|---|---|
| Unit | Node/Vitest or Jest — **lock Vitest if adding; else skip and test utils with a few Node asserts.** Prefer **Playwright + tsc + lint** as the v1 bar | `lib/content` mappers, GitHub level bucketing, Zod contact, year formatting |
| Component | Not required v1 | |
| E2E | Playwright | See flows |
| A11y | Playwright + axe-core | Home, case study, open menu, open command |
| Visual | Optional later (Phase 6) | |

## Playwright flows (must pass before launch)

1. Home 200: `h1` is `Manish Jangra`; nav has four items in order.
2. Click Work: hash `#work`, featured heading visible.
3. Click featured: `/work/{slug}`, `h1` product name, All work link.
4. Keyboard: Tab to skip link, Enter, focus in main.
5. `Control+k` or `Meta+k` opens command; type project; Enter navigates.
6. Contact: invalid submit shows errors; valid mock (intercept API) shows success text.
7. Reduced motion: prefers-reduced-motion, no transform on hero (already none).
8. 404: unknown `/work/not-a-real-slug`.
9. `/blog` 301 to `/`.
10. Mobile viewport: menu opens, trap Tab, Esc closes.

Admin E2E is out of v1 launch bar.

## Commands

- `npm run lint`
- `npm run typecheck`
- `npm run test:e2e` (Playwright)
- `npm run build`

CI (GitHub Actions): install, typecheck, lint, build. Playwright on `main` and PRs (or build-only if runners are slow; **lock: CI at least typecheck + lint + build**).

---

# Lighthouse goals

Run Lighthouse (desktop **and** mobile) on production preview of `/` and `/work/{featured}`.

| Category | Home | Case study |
|---|---|---|
| Performance | **≥ 95** | ≥ 95 |
| Accessibility | **100** | **100** |
| Best practices | ≥ 95 | ≥ 95 |
| SEO | **100** | **100** |

**Non-negotiable:** Accessibility 100 and SEO 100. Performance 95 with JS budget. If a 95 fail is font-display or a third-party, fix tokens/fonts first, do not add a preload theater of 12 resources.

Additional: axe violations = 0. Tab order matches visual order. Color contrast on both themes.

---

# Reusable utilities

| Utility | Job |
|---|---|
| `cn` | class merge (existing `clsx` + `tailwind-merge`) |
| `getSiteUrl` | `NEXT_PUBLIC_SITE_URL` no trailing slash |
| `formatYear` | Date → `YYYY` |
| `formatYearRange` | `2023 – Present` |
| `sliceContributionWeeks` | 53 → 26 |
| `bucketContribution` | count → 0–4 level |
| `buildCommandItems` | settings + projects → command list |
| `navItems` | constant four links |
| `copyToClipboard` | async, returns boolean |
| `isValidSlug` | regex |
| `scrollToId` | offset + reduced motion |
| `replaceHash` | `history.replaceState` |
| `buildPersonJsonLd` | object |
| `contactFormSchema` | Zod |
| `env` | parsed env |

Do not add `utils/whatsapp.ts` as a floating button helper. A `toWhatsAppUrl` mapper for a text link is enough (existing util may stay).

---

# Future scalability

v1 is a **short site**. When extending:

| Change | Do |
|---|---|
| More projects | Still 3–5 on Home; extra `published` but `listedOnHome: false` with case study URL only from command/sitemap if needed — **prefer not listing** (Phase 2 inventory) |
| Blog | New route group, new Phase 2 amendment, RSS, not a nav item until IA says so |
| i18n | Not planned; `lang=en` only |
| i18n later | `app/[locale]` would rewrite all wells — out of v1 |
| MDX case studies in git | Allowed as an alternative CMS; still map to `CaseStudyBody` |
| Monorepo | Unnecessary |
| Edge CMS (Sanity) | Only if Mongo admin is dropped; keep the mapper layer so UI does not care |
| Second theme (high contrast) | Extra token set, same components |
| Admin redesign | Separate project; reuse primitives |

**API versioning:** public surface is HTML, not a public JSON API (except contact POST). Do not publish `/api/projects` without auth.

---

# Coding standards

## TypeScript

- `strict: true`.
- No `any`. `unknown` + narrow.
- Props types named `{Component}Props` matching Phase 4.
- Server-only modules: import `server-only` in `lib/models` usage files and GitHub token fetch.

## React

- Server by default.
- No `useEffect` for data fetching on public pages.
- Keys: `slug` / `_id` strings, not array index.
- No barrel `components/index.ts` that re-exports everything (hurts tree-shake and creates cycles). Subfolder barrels optional and shallow.

## Tailwind / tokens

- Map every Phase 1 token to CSS variables in `globals.css`.
- Tailwind theme references those variables (`bg-background` → `var(--color-bg)`). Name Tailwind colors after tokens, not `zinc-950`.
- **No raw hex in components** except inside the token file.
- Spacing: only token scale (`p-6` must equal `space.6` 24px — configure theme accordingly).
- Do not use `shadow-lg` unless it is `shadow.md/lg` tokens.

## Comments

- No narrating comments. Comment only Phase lock deviations (there should be zero).

## Imports

- Order: react/next, third party, `@/` absolute, relative.
- `Icon` is the only Lucide importer.

## A11y

- No `div` with `onClick` that should be `a` or `button`.
- Nav section links are `<a href="#work">`.

## Privacy

- Do not log message bodies in client consoles.
- Do not commit `.env*.local`.

---

# Git strategy

## Branches

- `main`: production. Protected. No force-push.
- `feat/public-v1` (or similar): implementation of this spec.
- Short-lived `feat/*`, `fix/*`, `chore/*` off that branch or off `main`.
- Preview deploys on PRs.

## What not to commit

- `.env`, secrets, `node_modules`, OS files, Blob credentials.
- Large binaries; PDFs live on Blob.
- Generated `.next`.

## PR bar

- Typecheck, lint, build pass.
- No Three.js imports on public routes (grep in review).
- Docs in `docs/` updated only if a lock changes (then amend Phase 3/4, do not silently diverge).

## Cleanup PRs

Separate from UI: remove unused `components/Cinematic` after the new Home ships, so revert is possible.

---

# Commit conventions

**Conventional Commits**, imperative, focus on why.

```
type(scope): short summary
```

**Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `perf`, `test`, `style` (formatting only).

**Scopes:** `hero`, `work`, `activity`, `contact`, `a11y`, `seo`, `admin`, `content`, `chrome`, `tokens`.

**Examples:**

- `feat(work): render featured plate and project rows from CMS`
- `feat(activity): add monochrome contribution graph with API fallback`
- `fix(contact): announce send success in live region`
- `perf(home): drop three.js from public bundle`
- `docs: add implementation guide phase 5`
- `chore(admin): add project slug uniqueness validation`

**Rules:**

- One concern per commit when practical.
- Do not commit generated secrets.
- Do not use `--no-verify`.
- No `WIP` on `main`.
- Case study copy in CMS is data, not a commit, unless seeded.

---

# Implementation order (recommended)

Build in this sequence so the page is always honest:

1. Tokens in `globals.css` + fonts + `Container` + `SiteShell` empty main.
2. `Navbar` / `Footer` / theme (no command yet).
3. `HeroSection` with constants.
4. `SectionHeader`, `ProjectRow`, `FeaturedProject`, `WorkSection` with mock then CMS.
5. Experience, Capabilities, About.
6. Contact form + API.
7. Activity + GitHub cache.
8. Case study route + metadata + sitemap.
9. Command menu (code-split).
10. Redirects, OG, JSON-LD, Playwright, Lighthouse, delete public cinematic imports.

Do not start polish (Phase 6) before this path renders end-to-end.

---

# Cross-references

| Handbook topic | Source |
|---|---|
| Tokens, type, motion | Phase 1 |
| Routes, hashes, nav, SEO copy | Phase 2 |
| Wells, padding, graph height | Phase 3 |
| Component names, client vs CSS hover | Phase 4 |
| Mongo/admin existing | Current repo, kept |

---

# Checklist

Use this before approving Phase 5 and before writing application code (or before Phase 6 if code has started). Every item must be true of the **plan**; after implementation, reuse this as an engineering QA gate.

## Structure and router

- [ ] Folder tree matches `app/(public)`, Phase 4 component folders, `lib/content` mappers.
- [ ] Home and case study are Server Components; client islands listed and minimal.
- [ ] Admin/login stay outside `SiteShell`; NextAuth not on public layout.
- [ ] `/resume` is a file/redirect; `/blog` 301; sitemap only `/` + work slugs.
- [ ] Hashes, `replaceState`, `scroll-margin`, no root `loading.tsx`.

## Data and CMS

- [ ] Public props come from mappers, not raw Mongoose.
- [ ] Project has slug, kicker, year, role, imageAlt, structured case study; exactly one featured.
- [ ] Capabilities are three groups on Settings, not Skill bars.
- [ ] GitHub token server-only; Activity cannot bring down Home.
- [ ] Contact Zod + rate limit + honeypot; inbox model unchanged.
- [ ] Env validated with Zod.

## Performance, SEO, a11y

- [ ] Public bundle excludes Three/GSAP/Lottie/cinematic.
- [ ] Fonts 400/500 Geist only; LCP is `h1` on Home.
- [ ] Metadata, canonical, JSON-LD Person, robots disallow admin/api, OG 1200×630 typographic.
- [ ] A11y tasks 1–14 assigned to components/hooks.
- [ ] Lighthouse goals: Perf ≥95, a11y 100, SEO 100.

## Motion, loading, errors

- [ ] CSS-first motion; Framer only if needed for CommandMenu; reduced motion on both CSS and JS.
- [ ] CommandMenu code-split + idle prefetch.
- [ ] Public error UI is typographic; GitHub and contact have specified fallbacks.

## Quality bar

- [ ] Playwright flows 1–10 defined; CI typecheck + lint + build.
- [ ] Tokens only in CSS variables; no hex in components.
- [ ] Conventional commits; `main` protected; `revalidatePath` on admin writes.

## Process

- [ ] This document contains no React components, no Tailwind class strings as implementation, no CSS file body — only the handbook.
- [ ] Phase 6 may now specify micro-interactions, empty/loading cosmetics, visual QA, launch, and v2 ideas **without new routes or components**.

---

**End of Phase 5.**

Approve this document to proceed to **Phase 6: `06-Polish-and-Finishing.md`**. After Phase 6, the specification is complete and implementation can follow the order above without inventing product decisions.
