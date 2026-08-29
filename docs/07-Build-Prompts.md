# 07 — Build Prompts (phase by phase)

**Status:** Ready to use  
**Depends on:** `01`–`06` (all approved)

Use these prompts **in order**. Paste the Master Orchestrator once at the start of an implementation chat. Then paste **one Build Phase prompt** at a time. Wait for approval before the next phase.

Do not paste two build phases in the same turn.

---

# MASTER ORCHESTRATOR PROMPT

```text
You are my Senior Frontend Architect and implementation engineer.

You are building my software engineer portfolio from a frozen specification.

The spec is already approved. You are not allowed to redesign it.

====================================================
SOURCE OF TRUTH (read before writing any code)
====================================================

Read and obey, in this order:

1. docs/01-Design-System.md
2. docs/02-UX-Architecture.md
3. docs/03-Page-Blueprint.md
4. docs/04-Component-System.md
5. docs/05-Implementation-Guide.md
6. docs/06-Polish-and-Finishing.md

If code would contradict a document, the document wins.
If two documents appear to conflict, the earlier numbered phase wins for visual/UX locks; Phase 5 wins for engineering mechanics; Phase 6 wins for polish tightening (example: no image scale on hover).

====================================================
PRODUCT
====================================================

Public site for Manish Jangra.
Minimal monochrome. Typography first. Editorial, not a template.
Light mode canonical. Dark mode first-class.
Home + /work/[slug] + résumé file + 404.
Admin/CMS stays private and must keep working.

This is NOT a restyle of the existing cinematic / 3D / ManishOS site.
Do not import Three.js, R3F, GSAP, Lottie, custom cursors, docks, glass, amber, or bento dashboards on public routes.

====================================================
HARD RULES
====================================================

1. Build ONLY the current Build Phase. Do not start the next phase.
2. Wait for my explicit approval before continuing.
3. Follow Phase 4 folder names and component names exactly.
   primitives/  chrome/  content/  sections/
4. Server Components by default. "use client" only where Phase 5 says so.
5. No raw hex in components. Tokens only (Phase 1 → CSS variables).
6. No new routes, components, or tokens unless the current phase prompt lists them.
7. Do not rewrite the six spec docs unless I ask.
8. Keep /admin and /login working. Do not restyle admin in v1.
9. After each phase: list what you built, what you did not build, and the phase checklist with pass/fail.
10. Verify in the browser when the phase produces visible UI (user rule). Desktop and a mobile width.

====================================================
STACK
====================================================

Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, Geist Sans + Geist Mono, Lucide via Icon only, MongoDB/Mongoose, NextAuth (admin only), Vercel Blob, Zod.

Motion: CSS first. Framer Motion only for CommandMenu enter if needed (Build Phase 5/6).

====================================================
OUTPUT
====================================================

Work in the real repo.
Do not generate a parallel duplicate app.
When a phase is done, stop and wait.

```

---

# Build Phase 1 Prompt — Design system in code

```text
BUILD PHASE 1 of 6

Implement docs/01-Design-System.md as working tokens and primitives.
Do NOT build the full homepage, CMS wiring, command menu, GitHub graph, or case studies.

Read:
- docs/01-Design-System.md (all tokens)
- docs/04-Component-System.md (primitives + Plate only)
- docs/05-Implementation-Guide.md (folder structure, CSS variable naming, fonts)

--------------------------------------------------
DO
--------------------------------------------------

1. Map every Phase 1 token to CSS custom properties in globals.css
   Dots → dashes: --color-bg, --space-8, --type-display-lg, etc.
   Light on :root. Dark on html.dark (or .dark).
   Tailwind v4 theme must reference these variables. No zinc-950 / amber in public UI.

2. Load Geist Sans + Geist Mono via next/font (weights 400 and 500 only).
   Fallbacks exactly as Phase 1. Apply variables on body.

3. Create components/primitives/ exactly:
   Container, Kicker, Hairline, Button, TextLink, IconButton, Icon, Field, Spinner, SkipLink, LiveRegion

4. Create components/content/Plate.tsx (needed to prove media tokens).
   Do not create other content/section components yet.

5. Tiny theme foundation: class on <html> for light/dark so primitives can be checked in both modes.
   A simple ThemeToggle IconButton is allowed so you can QA contrast.
   Full Navbar is NOT this phase.

6. Temporarily render a primitive gallery on the public home OR a route group that does not ship as the real IA.
   Prefer replacing app/page.tsx with a simple well of primitives (Container wide/page/prose, buttons, field, plate, links) so we can visually QA.
   This gallery is throwaway; it will be replaced in Phase 3. Do not add /styleguide as a permanent public route if you can avoid it.

--------------------------------------------------
DO NOT
--------------------------------------------------

- Navbar, Footer, sections, FeaturedProject, ContactForm, CommandMenu
- Mongo fetches, GitHub, contact API
- Three.js or old Cinematic components
- New colors or extra type sizes
- Pill buttons, shadows on cards, Inter font

--------------------------------------------------
DONE WHEN
--------------------------------------------------

- All Phase 1 color/type/space/radius/shadow/motion/z-index tokens exist as CSS variables
- Primitives match Phase 1 + Phase 4 contracts (sizes 32/40/48, focus-visible ring 2/2, Field labels on top)
- Light and dark both work
- npm run lint and typecheck pass (or equivalent)
- Browser: gallery looks like paper/ink, not the old cinematic site

Stop. Show the primitive checklist. Wait for approval.
```

---

# Build Phase 2 Prompt — UX architecture in chrome

```text
BUILD PHASE 2 of 6

Implement docs/02-UX-Architecture.md as SiteShell, navigation, hashes, and landmarks.
Do NOT build Work/Experience/etc. content yet. Main may contain labeled empty section stubs.

Read:
- docs/02-UX-Architecture.md
- docs/03-Page-Blueprint.md (Global chrome only)
- docs/04-Component-System.md (chrome/ except CommandMenu)
- docs/05-Implementation-Guide.md (client islands, route group, theme flash)

--------------------------------------------------
DO
--------------------------------------------------

1. Route group app/(public)/ with layout that wraps SiteShell.
   Admin/login must NOT use SiteShell. NextAuth provider stays on admin.

2. Implement chrome:
   SiteShell, Navbar, NameMark, NavList, ThemeToggle, MobileMenu, Footer, SkipLink already from Phase 1.

3. Nav items exactly: Work, Experience, About, Contact (that order).
   Name mark: "Manish" → /.
   Real <a href="#work"> etc.
   Sticky, height 64/56, hairline after 8px scroll, no hide-on-scroll, no shrink.
   Container well=wide for nav inner (aligns with future hero).

4. Theme: system default, localStorage override, anti-flash inline script in root layout (Phase 5).
   ThemeToggle aria-label is the NEXT theme.

5. Mobile overlay: full-screen, dialog, focus trap, Esc, body scroll lock, opacity 200ms.
   Extra overlay links: Résumé, Email, GitHub (text).

6. Home stubs: <section id="work|experience|capabilities|activity|about|contact"> with scroll-margin-top.
   Empty aside from a muted id label so hash jumps can be tested.
   Footer links as Phase 3.

7. Scroll spy: only the four nav items get aria-current="location".
   Hero at top: no item current.
   Hash updates via replaceState, not extra history entries.
   prefers-reduced-motion: instant jump, no smooth scroll.

8. useReducedMotion, useLockBodyScroll, useFocusTrap, useScrollSpy, replaceHash/scrollToId utilities as needed.

9. Remove or replace the Phase 1 primitive gallery from the default home. Keep primitives in components/.

--------------------------------------------------
DO NOT
--------------------------------------------------

- CommandMenu / CommandTrigger (Build Phase 5)
- Featured project, forms, GitHub graph
- New nav items (Skills, GitHub, Blog, Home)
- Dock, avatar in nav

--------------------------------------------------
DONE WHEN
--------------------------------------------------

- Desktop: four links + theme; skip link works
- Mobile: menu overlay a11y
- Hashes #work #experience #about #contact scroll with nav offset
- Light/dark persist and do not flash
- Browser verification: desktop + ~375px width

Stop. Wait for approval.
```

---

# Build Phase 3 Prompt — Page blueprint (Home geometry)

```text
BUILD PHASE 3 of 6

Implement docs/03-Page-Blueprint.md as the full Home layout with STATIC / constant copy.
Wire sections to Phase 4 section components, but data may come from lib/constants/copy.ts — not Mongo yet.

Read:
- docs/03-Page-Blueprint.md (entire file)
- docs/04-Component-System.md (content + sections except CommandMenu, live form API, GitHub fetch)
- docs/02-UX-Architecture.md (section order, hero copy direction)

--------------------------------------------------
DO
--------------------------------------------------

1. Home section order (mandatory):
   Hero → Work → Experience → Capabilities → Activity → About → Contact → Footer
   Footer already exists from Phase 2.

2. Implement sections + content components needed for geometry:
   HeroSection
   SectionHeader
   FeaturedProject, ProjectRow, YearRail, MetaLine
   ExperienceRow
   CapabilityGroup
   ActivityStat, ContributionGraph (static fake weeks OK), RepoRow optional
   Portrait
   ContactForm (client, UI only — submit may no-op or mock success, no production Mongo required yet)
   ContactDetails, CopyButton
   WorkSection, ExperienceSection, CapabilitiesSection, ActivitySection, AboutSection, ContactSection

3. Geometry locks:
   Wells: wide 1280, page 1120, prose 720, gutters 20/32/48
   Hero: min-height 100dvh (fallback 100vh), upper-third type, left aligned, no photo
   Featured: text then 16:9 plate, not side-by-side
   YearRail 96px shared Work + Experience
   Graph inner height 160/128/112; 26 weeks on mobile
   About portrait 320 square desktop if image provided
   Contact split only ≥1024; form first in DOM
   Headings: Work h2 = thesis; product names h3 at type.h3; featured mass from plate

4. Placeholder content must sound like Phase 2 (name Manish Jangra, product thinking).
   Use Servyq as featured and Dayzo as a row if you need names — or clearly labeled placeholders.
   Images: local public placeholder or existing Blob URLs if available; 16:9 reserved (no CLS).

5. 404: NotFoundSection as Phase 3.

6. Hover: buttons/links/rows per Phase 1. Plate grayscale on (hover:hover) and (pointer:fine) only.
   Coarse pointer: images color at rest (Phase 6 lock — implement now so mobile QA is honest).

--------------------------------------------------
DO NOT
--------------------------------------------------

- Mongo mappers, GitHub token fetch, sitemap, OG, /work/[slug]
- Command menu
- Scroll-reveal (Phase 6) — keep first paint solid
- Restyle admin

--------------------------------------------------
DONE WHEN
--------------------------------------------------

- Home matches the written wireframes at 375, 768, 1024, 1440
- Nav left edge aligns with hero h1
- One primary button in hero; contact has one primary Send
- Browser pass: scroll the whole page, resize, light and dark

Stop. Wait for approval.
```

---

# Build Phase 4 Prompt — Component contracts complete

```text
BUILD PHASE 4 of 6

Audit and finish docs/04-Component-System.md.
Every named public component must exist, with the documented props, a11y, and composition.
Still no requirement to finish CMS/GitHub/SEO (that is Build Phase 5) unless a component cannot exist without a stub.

Read:
- docs/04-Component-System.md in full
- docs/03-Page-Blueprint.md for any geometry you missed
- Rejected components list: do not create Card, Timeline, Tooltip, generic Modal, ProjectCard

--------------------------------------------------
DO
--------------------------------------------------

1. Inventory every component in Phase 4. Create any missing file in the correct folder.
   One component per file. PascalCase matches export.
   Import rule: sections → content/primitives; content → primitives; chrome → primitives; primitives import nothing from content/sections.

2. Icon: only Lucide names listed in Phase 4, only imported inside Icon.

3. Hairlines: list PARENT owns lines, not each row (no 2px joins).

4. FeaturedProject may emit page + wide wells internally (Phase 4 lock).

5. ContributionGraph aria-hidden; ActivityStat + profile link are the accessible story.
   Graph inert; no cell tooltips.

6. ContactForm: controlled Field ×3, no autofocus, loading/success button states, fullWidthSubmit below 1024.
   CopyButton + LiveRegion for copy.

7. CaseStudyLayout, CaseStudyRecap, CaseStudyBody, CaseStudyPager — build the components.
   You MAY add app/(public)/work/[slug]/page.tsx with MOCK data for one slug so the article layout can be QA’d.
   Do not need generateStaticParams from Mongo yet.
   Case study image color at rest. h1 is display.md / display.sm, not 80px.
   SiteShell current=work-page; Work nav aria-current="page"; Work link → /#work.

8. CommandMenu + CommandTrigger + CommandMenuItem: implement UI + keyboard (⌘K / Ctrl+K, Esc, arrows, Enter) with a STATIC item list.
   Code-split the menu. Combobox/listbox a11y as Phase 4.
   Idle prefetch can wait for Phase 6.
   Do not block this phase if you prefer to keep command for Phase 5 — PREFERRED: ship the UI now so Phase 5 only wires dynamic items.

   Lock for this prompt: IMPLEMENT CommandMenu now.

9. Remove any leftover gallery/dev-only UI from production Home.

--------------------------------------------------
DO NOT
--------------------------------------------------

- Add components not in Phase 4
- Connect GitHub API or revalidatePath (Phase 5)
- Playwright suite (Phase 5/6)
- v2 ideas (blog, colophon, Calendly)

--------------------------------------------------
DONE WHEN
--------------------------------------------------

- Phase 4 inventory checklist would pass
- Home + one mock case study + 404 + command menu work in the browser
- Keyboard: skip, nav, command, form fields
- No Card.tsx, no custom cursor

Stop. Wait for approval.
```

---

# Build Phase 5 Prompt — Implementation guide (data, SEO, production path)

```text
BUILD PHASE 5 of 6

Implement docs/05-Implementation-Guide.md.
This is the production wiring phase: CMS, mappers, GitHub cache, contact API, metadata, redirects, performance budget.

Read:
- docs/05-Implementation-Guide.md in full
- docs/02-UX-Architecture.md (SEO, hashes, contact hierarchy)
- docs/04-Component-System.md (props the mappers must satisfy)

--------------------------------------------------
DO
--------------------------------------------------

1. Data
   - Project: slug (unique), kicker, year, role, imageAlt, published, structured caseStudy, exactly one featured (validate in admin or mapper)
   - Settings: capabilities[3], hero fields, location, etc. as Phase 5
   - Mappers: never pass raw Mongoose docs to components
   - Capabilities from Settings, NOT Skill proficiency bars
   - Public ignores Blog; 301 /blog and /blog/[slug] → /

2. Home page.tsx Server Component: getPublicHomeData Promise.all
   GitHub failure must not 500 the Home (Activity status=error)

3. GitHub: server-only GITHUB_TOKEN, revalidate 3600, gray 5-level buckets, ignore language colors
   Prefer no public unauthenticated /api/github for the client

4. POST /api/contact: Zod, honeypot, rate limit, existing inbox model
   revalidatePath('/') (and work slugs) on admin mutations

5. /work/[slug]: generateStaticParams, generateMetadata, notFound()
   /resume route → PDF
   sitemap: / + published slugs only
   robots: disallow /admin /login /api
   JSON-LD Person on Home
   Title/description/canonical/OG per Phase 2/5
   trailingSlash false

6. Public bundle: ZERO imports of three, r3f, drei, gsap, lottie, Cinematic, ManishOS, 3d on public routes
   NextAuth not wrapping public layout

7. Caching: home/case revalidate 60–300s
   Fonts 400/500 only; LCP on / is the h1

8. app/error.tsx public: typographic, Phase 1 voice
   env Zod

9. npm run typecheck + lint + build must pass
   Add Playwright flows 1–10 from Phase 5 if time; minimum CI bar is typecheck + lint + build

--------------------------------------------------
DO NOT
--------------------------------------------------

- Redesign admin visually
- Reintroduce blog as a public nav item
- Add analytics
- Start Phase 6 scroll-reveal until this path is end-to-end real data

--------------------------------------------------
DONE WHEN
--------------------------------------------------

- Home and case studies render from CMS (or seeded data)
- Contact message lands in admin inbox
- GitHub section degrades gracefully
- /blog 301s
- grep public routes: no three.js
- Browser: real content, real form, real case study, light/dark

Stop. Wait for approval.
```

---

# Build Phase 6 Prompt — Polish and finishing

```text
BUILD PHASE 6 of 6

Implement docs/06-Polish-and-Finishing.md.
The site must already work end-to-end (Build Phase 5 approved).
Do not add routes, components, or tokens. Tune, verify, prepare to launch.

Read:
- docs/06-Polish-and-Finishing.md in full
- Micro-interaction table M1–M16 (closed set)

--------------------------------------------------
DO
--------------------------------------------------

1. Motion
   M1–M16 only. CommandMenu is the only scale (0.98→1).
   No image scale. Grayscale + border only.
   Section reveal: IntersectionObserver once, 8px/400ms, max stagger 4, NOT hero, NOT footer, NOT case study.
   If already in view on load, start visible (no opacity 0 flash).
   prefers-reduced-motion: no transforms; contact shows Sending… text not spinner.

2. Hover media: (hover:hover) and (pointer:fine) for grayscale/row underlines.
   (hover:none): featured + portrait color at rest.

3. 100dvh hero, safe-area on mobile overlay/footer.
   Theme anti-flash already from Phase 2 — re-verify.

4. Image decode fade 150ms; reserved aspects (no CLS).

5. Command: idle prefetch; No results row; code-split confirmed.

6. Type: tabular-nums on years/counts; text-wrap balance on display titles; underline-offset 3px; kicker uppercase via CSS.

7. Spacing optical pass: nav/h1 alignment, 96px rails overlay, contact details baseline vs Name label, no off-grid 13/15/18px.

8. Execute QA checklists in Phase 6:
   Visual (light+dark), a11y, performance, SEO, browsers you can run, responsive 320–1440.
   Lighthouse goals: Perf ≥95, a11y 100, SEO 100 on / and one case study (production build).
   Note honestly what you could not verify (e.g. NVDA, physical iPhone).

9. Launch checklist items that are code/content: redirects, metadata, grep dead cinematic imports, résumé filename.
   Do not update LinkedIn/GitHub or production DNS unless I ask.
   Do not git commit unless I ask.

--------------------------------------------------
DO NOT
--------------------------------------------------

- v2 ideas (writing, /now, chatbot, Calendly, custom cursor, WebGL)
- New components
- “Polish” that is actually a redesign

--------------------------------------------------
DONE WHEN
--------------------------------------------------

- Phase 6 checklists filled with pass/fail/skip
- Browser: 5-second hero test, recruiter scan, one case study read, mobile overlay, command menu, contact success
- Reduced motion OS setting checked
- You list remaining launch steps that only I can do (env, domain, LinkedIn)

Stop. Specification implementation is complete pending those human launch steps.
```

---

# How to run this

1. New chat (or this one). Paste **Master Orchestrator**.
2. Paste **Build Phase 1**. Review in the browser. Approve or request fixes.
3. Repeat for Phases 2 → 6. One prompt per turn after approval.
4. If a phase fails QA, stay on that phase. Do not skip ahead.

**If the model drifts:** paste  
`Stop. Re-read docs/0N-…. You are only on Build Phase N. Undo anything that belongs to a later phase.`
