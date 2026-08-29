# 02 — UX Architecture

**Phase:** 2 of 6  
**Document type:** User experience and information architecture specification  
**Status:** Approved  
**Depends on:** `01-Design-System.md` (approved)  
**Downstream documents must conform to:** This file in full, and must not contradict Phase 1. `03-Page-Blueprint.md` draws every section, breakpoint, and interaction from the IA, journeys, and strategies defined here. `04-Component-System.md` names components to serve these jobs. `05-Implementation-Guide.md` maps routes, metadata, and data to this structure. `06-Polish-and-Finishing.md` polishes these flows — it does not add new ones.

This is not a UX pass on the existing cinematic portfolio. The previous information architecture (seven icon-led nav items, Skills as a destination, GitHub as a spectacle, About before proof, a dock, a command palette as theater, WhatsApp as a peer of email) is retired. This document defines a new product experience.

No visual tokens are invented here. Color, type, space, motion, and component atoms are already specified in Phase 1. When this document says “row,” “plate,” “kicker,” “primary button,” or “command menu,” it means those Phase 1 objects.

---

# User Personas

Four audiences use this site. They are not equally important. Design for the first two; do not exclude the last two.

Time-on-site assumptions are recruiter-realistic, not optimistic.

## 1. Recruiter

**Who:** In-house or agency recruiter filling a full-stack, frontend-leaning full-stack, or product-engineer role. They have 15–40 tabs open. They found Manish via LinkedIn, GitHub, a referral, or a job-application link.

**Context:** They need to decide *fast* whether to pass this profile to a hiring manager. They are scanning, not reading.

**Knows:** Job req (React / Next.js / Node / TypeScript / “full stack”). Maybe location (India / remote / Chandigarh).

**Does not know:** Dayzo, Servyq, or whether “full stack” here means WordPress + CSS or NestJS + React Native + payments.

**Constraints:**
- 30–90 seconds on the first visit.
- Often on a laptop, sometimes on a phone between calls.
- Will look for: name, current role-shaped headline, 2–3 proof points, location/timezone signal, a résumé, a way to email.
- Will bounce if the page is slow, theatrical, or makes them hunt for the work.

**Success for them:** They can honestly tell a hiring manager: “Full-stack engineer, ships real products (mobile + backend), based in Chandigarh, here’s the site, here’s the résumé.”

**Failure for them:** They remember a 3D scene and not a single project name.

## 2. Hiring Manager

**Who:** Engineering manager, staff engineer, or founder who will actually work with Manish. Arrives from a recruiter packet, a cold application, or a peer.

**Context:** They have 5–12 minutes. They are testing taste, depth, and whether the work is real.

**Knows:** What “good” looks like in production systems. They can smell a tutorial project and a case-study that is only a stack list.

**Looks for:**
- What was actually built (problem, constraints, architecture, outcome).
- Whether Manish owned the system or implemented tickets.
- Communication quality (writing = how he will write design docs and PRs).
- Judgment (what he chose to show, what he left out).
- Signals of production: payments, auth, realtime, mobile, ops — not just CRUD.

**Success for them:** They open at least one case study, understand a system Manish designed, and feel the site itself is evidence of the same standards.

**Failure for them:** Homepage of logos and screenshots, case study that reads like a README feature list, no way to see depth without a call.

## 3. Client (founder / product lead)

**Who:** Someone with a product to build (often mobile + API + admin). May be local (Chandigarh / India) or remote. Arrives from referral, LinkedIn, or Google.

**Context:** They are buying capability and reliability, not a résumé. Trust and scope-fit matter more than years-at-company.

**Looks for:** Relevant shipped products (marketplace, social/productivity, realtime, payments), a clear way to start a conversation, professionalism that suggests he will not vanish.

**Success for them:** “He has built things like what I need. Emailing him feels safe and fast.”

**Failure for them:** Only employment history, no product stories; contact buried; WhatsApp as the only obvious channel (unprofessional for some international clients; fine as secondary).

## 4. Developer (peer, open source, future colleague)

**Who:** An engineer browsing because the site was shared, or because they hit a GitHub profile that linked here.

**Context:** Curious, often more patient, but still allergic to fluff. They will keyboard-navigate, open `⌘K`, view source mentally, check the contribution graph, click through to repos.

**Looks for:** Honest GitHub (not a skin), stack specifics, whether the portfolio itself is well-made, whether case studies admit tradeoffs.

**Success for them:** They respect the craft of the site and click through to GitHub or a case study. They might share the URL.

**Failure for them:** Fake-looking stats, rainbow language charts, a graph that is the hero of the site.

## Persona priority (binding)

When a decision helps one persona and hurts another:

1. **Hiring manager** wins on depth (case studies, IA of `/work/[slug]`).
2. **Recruiter** wins on first 5 seconds and scanability (hero, work list, résumé, email).
3. **Client** wins on contact friction and relevant proof.
4. **Developer** wins on keyboard, GitHub honesty, and not dumbing down.

The homepage is a **recruiter + hiring-manager scan**. Case study pages are a **hiring-manager + client read**. GitHub section is a **developer + hiring-manager corroboration**, never the lead.

---

# User Goals

Goals are jobs to be done. The site must complete each without a tour.

| # | Goal | Primary persona | Completes when |
|---|---|---|---|
| G1 | Identify who this is and what they do | Recruiter | Name, role, one-line scope, and location-or-availability are visible without scrolling on desktop; on mobile, name + role are visible and the lede is one swipe away |
| G2 | Judge whether the work is real and relevant | Hiring manager, client | At least two shipped products are named with a problem/outcome line; one can be opened into a case study |
| G3 | Judge seniority and trajectory | Hiring manager, recruiter | Experience list shows role, company, dates, and one line of scope per role |
| G4 | Confirm technical range without a skill-bar | All | A short capabilities section names the actual stack used in production (React Native, Next.js, NestJS, PostgreSQL, etc.) as text, after the work |
| G5 | Corroborate that he still builds | Developer, hiring manager | GitHub section shows recent activity in the Phase 1 gray ramp, plus a link to the profile — not a vanity dashboard |
| G6 | Form a human picture | All, secondary | About answers who he is and how he works in ≤ 3 short paragraphs + optional portrait |
| G7 | Start a conversation | Recruiter, client, hiring manager | Email is copyable and clickable; a short form exists; résumé is downloadable; LinkedIn is one click. All of this is in the nav’s reach (Contact) and in the hero as one primary action |
| G8 | Move at engineer speed | Developer, hiring manager | `⌘K` searches sections and projects; skip link works; hashes work; the page is instant |
| G9 | Share a specific proof point | Recruiter, hiring manager | Every case study has a stable URL. The homepage has a clean URL. Sections have hashes (`/#work`) |
| G10 | Trust the site itself | All | The experience matches Phase 1: fast, quiet, accessible, no theater |

Non-goals (user goals we will **not** optimize for):

- Entertaining a visitor who has no hiring or hiring-adjacent intent.
- Teaching web development.
- Building a personal brand as an influencer (no newsletter capture, no tweet embeds).
- Replacing LinkedIn or GitHub. The site points at them; it does not clone them.

---

# Business Goals

“Business” here is Manish’s professional funnel. The site has one job: **create qualified conversations**.

| # | Business goal | UX implication |
|---|---|---|
| B1 | Be shortlisted for full-stack / product-engineer roles at companies that care about taste and systems | Homepage must read as a product, not a template. Work must lead. Case studies must exist |
| B2 | Convert recruiter curiosity into a forwarded packet | Résumé download + email + LinkedIn within one decision. Copy that a recruiter can paste |
| B3 | Convert hiring-manager interest into an interview | Depth pages that survive a skeptical read. The site’s craft is a silent reference |
| B4 | Convert client interest into a scoped conversation | Contact is calm and professional. Email first. WhatsApp secondary, not peer to email on the primary surface |
| B5 | Control the narrative | Selected work, not an inventory. Three to five projects, ordered. No “also I did this in college” unless it is still the best proof |
| B6 | Stay cheap to update | Content is data (as the current CMS already is). Adding a project must not require a layout invention. Phase 5 will keep a CMS; this phase forbids layouts that only work for exactly two projects |
| B7 | Rank for name and a small set of role queries | Real content, real titles, real case studies. No blog-as-SEO-farm in v1 |
| B8 | Do not waste time on surfaces that do not convert | No primary-nav Blog, Skills playground, 3D demo, or AI chatbot in v1. Admin remains private |

**Primary conversion** (in order of value):

1. Hiring manager reads a case study **and** emails or books a call.
2. Recruiter downloads résumé **and** emails / InMails.
3. Client emails with a relevant brief.

**Secondary conversion:** GitHub follow, LinkedIn connect, sharing the URL.

**North-star metric (conceptual):** Qualified inbound messages per month. Not bounce rate, not time-on-site, not GitHub star count.

---

# Information Architecture

## Product shape

The public product is a **short marketing site with a long homepage and a small set of depth pages**.

It is not an app. It is not a blog platform. It is not an OS. It is not a dashboard.

```
Public
├── /                          Home (single page, sectioned)
│   ├── Hero
│   ├── Work                   Selected work (featured + rows)
│   ├── Experience
│   ├── Capabilities           Tech stack as typography (not a skill grid)
│   ├── Activity               GitHub (corroboration)
│   ├── About
│   ├── Contact
│   └── Footer
├── /work/[slug]               Project case study
├── /work/[slug]#…             Optional in-page case-study anchors
└── /resume                    Redirect or direct file to the PDF (not a designed HTML résumé)

Private (exist in the product, invisible to public IA)
├── /login
└── /admin/…                   CMS / CRM (out of public UX)

System
├── /404
└── /robots.txt, /sitemap.xml  Machine IA, not human
```

**v1 does not include:** `/blog`, `/blog/[slug]`, a `/projects` index separate from `/#work`, or a `/github` page. If a blog is revived, it is a Phase 6+ / version-2 route and must not enter the primary nav without a new IA pass.

The current site’s blog, skills CRUD, and cinematic sections are **content sources**, not destinations.

## Page hierarchy

| Level | Route | Purpose | Parent |
|---|---|---|---|
| 0 | `/` | Entire argument, in order | — |
| 1 | `/work/[slug]` | One project, in full | `/` (Work) |
| 1 | `/resume` | File, not a page | `/` (Hero, Contact, Footer) |
| — | `#` hashes on `/` | Jump to a section | `/` |

Case studies are **children of Work**, not peers of Home. The nav never lists individual projects (that is the command menu’s job).

## Navigation hierarchy

**Primary navigation** (always visible on desktop; overlay on mobile) — exactly four items, in this order:

1. **Work** → `/#work`
2. **Experience** → `/#experience`
3. **About** → `/#about`
4. **Contact** → `/#contact`

This set is a deliberate revision of the Phase 1 example order (`About, Work, Experience, Contact`). **Work is first** because G2 and B1 outrank G6. About remains in the nav because hiring managers and clients look for it by name; it is not first.

**Not in primary nav:** Home (the name mark is Home), Capabilities, Activity/GitHub, Blog, Skills, Resume (Resume is a button/link in Hero, Contact, Footer, and `⌘K`).

**Name mark:** `Manish` → `/` (or `/#` if already on home: scroll to top). Specified in Phase 1.

**Utility cluster (right of nav, not named as nav items):**
- Command trigger (`⌘K`) — desktop; keyboard-only below 768px if it does not fit
- Theme toggle
- Mobile: Menu

**Footer navigation:**
- Same four primary links
- Résumé
- GitHub, LinkedIn, Email (text, not icon-only — Phase 1)
- Optional: X
- Not: WhatsApp as a footer peer. WhatsApp may appear once in Contact as a secondary line for local/client convenience

**Command menu destinations** (complete list — Phase 4 will spec the component):

| Query target | Action |
|---|---|
| Work, Experience, Capabilities, Activity, About, Contact | Scroll to section |
| Each project title | Go to `/work/[slug]` |
| Résumé | Download or open PDF |
| Email | Copy address + optional `mailto:` |
| GitHub / LinkedIn | Open external |
| Theme | Toggle |
| Home | Scroll top |

## Section order on Home

Exact order. Do not reorder in Phase 3.

| # | Section id | Kicker (copy direction) | Heading (copy direction) | Why this position |
|---|---|---|---|---|
| 1 | `hero` | Role, not a cute label | Name as `h1` | G1. Identity before proof. First paint. No reveal animation (Phase 1) |
| 2 | `work` | `Selected work` | A sentence, not “My Projects” | G2, B1, B5. Proof immediately after identity. Recruiters who only scroll once must hit work |
| 3 | `experience` | `Experience` | Optional one-line frame (“Where the work happened”) | G3. Trajectory after artifacts. Employment is trust; it is not more interesting than the products |
| 4 | `capabilities` | `Capabilities` | Not “Tech stack” as a flex | G4. Stack after proof so it reads as tools used, not a keyword dump for ATS (the résumé handles ATS) |
| 5 | `activity` | `Activity` | GitHub, named as such in the supporting line | G5. Corroboration. After capabilities so the graph is evidence, not a hero |
| 6 | `about` | `About` | Name or a short thesis | G6. The person after the professional case. Putting About higher recreates the template “Hi I’m…” page that delays proof |
| 7 | `contact` | `Contact` | Direct ask | G7, B2–B4. The conversion surface. Last on purpose: they arrive having seen the argument |
| 8 | `footer` | — | — | Utility, legal, secondary links. Not a ninth content pitch |

**Why Skills is not a section:** Skill grids and logo marquees were banned in Phase 1. Capabilities replaces them as a readable list grouped by layer (see Tech / Capabilities strategy).

**Why GitHub is not higher:** A contribution graph without shipped products is a student tell. Manish has shipped Dayzo and Servyq. Those lead.

**Why About is not higher:** The hero already says who. About is depth of character, not identification.

**Why Contact is not in the hero as a full form:** A form in the hero competes with identity (Phase 1: one idea per viewport). The hero has **one** primary button to Contact (smooth scroll to `#contact`) and a secondary text link to Work or Résumé.

## URL and hash contract

| Hash | Section |
|---|---|
| (none) or `#` | Hero / top |
| `#work` | Selected work |
| `#experience` | Experience |
| `#capabilities` | Capabilities |
| `#activity` | GitHub |
| `#about` | About |
| `#contact` | Contact |

On load with a hash, scroll to that section **after** layout, accounting for sticky nav offset (`nav.height` from Phase 1). Do not play the hero as if it were a first visit.

Case study slugs are stable, lowercase, hyphenated, derived from product names: `dayzo`, `servyq`, and others as added. Do not use auto-ids. Changing a slug is a broken share link (B/G9).

## What is not a page

- Individual experience roles
- Individual GitHub repos (link out)
- Tags / tech filter pages
- Testimonials (none unless real and later added as a row in About — not v1)
- A dedicated “links” page

---

# User Journey

One canonical path, then variants. Times are sequential on a first visit to `/`.

## 0. Arrival

**Sources:** LinkedIn, GitHub profile, résumé URL, recruiter forward, Google `{name}`.

**Expectations by source:**
- LinkedIn: they already have a photo and a headline. The site must be *better written and better designed* than the LinkedIn About, or it is redundant.
- GitHub: they expect to see the same human, plus product narrative GitHub cannot tell.
- Recruiter forward: they land cold. Hero must work with zero prior knowledge.

**State:** Light or dark from OS, unless a previous visit stored a preference (Phase 1). No loading screen, no boot sequence, no splash. First paint is the hero.

## 1. First impression (0–5 seconds)

See **Hero Strategy**. If this fails, later stages do not happen.

**Allowed actions in this window:** read, scroll a little, hit the primary button, hit Work in the nav, press `⌘K`.

**Forbidden in this window:** waiting for a 3D scene, watching a typewriter, dismissing a modal, guessing what the site is.

## 2. Discovery (5–30 seconds)

The visitor scrolls or clicks **Work**.

They see:
- One featured project as a media plate + title + problem/outcome lede (Phase 1 Cards).
- Remaining projects as rows: title, one line, year/role meta.

They should be able to answer: “He builds full products — mobile and backend — not landing pages.”

**Primary next step:** click the featured project (hiring manager) or keep scanning rows (recruiter).

**Escape hatch:** nav to Contact or Experience if they already believe the work and need logistics.

## 3. Trust (30–90 seconds)

Trust is assembled from three stacked proofs, in this order:

1. **Artifacts** — Work looks specific (product names, real constraints).
2. **Trajectory** — Experience shows continuity, not a single hobby project.
3. **Corroboration** — Capabilities names the same stack the case studies use; Activity shows the practice is ongoing.

If Work is thin, Experience cannot save it. If Experience is empty, Work must be even more specific (dates, role, “solo / team”).

**About** is a trust *amplifier*, not the trust foundation. Portrait optional (Phase 1 grayscale plate). Copy must not repeat the hero lede.

## 4. Projects (depth)

Entering `/work/[slug]` is a **mode change**: from scan to read.

Journey on a case study:
1. Recap (title, one-line, meta: role, year, stack, live/repo links).
2. Problem.
3. Approach / architecture (as writing and one diagram max — diagrams are images, not interactive 3D).
4. What he owned.
5. Outcome (honest: shipped, in production, in progress — never fake metrics).
6. Close: next project + back to Work + Contact.

If they bounce from a case study in <15 seconds, the recap failed (too much hero chrome, too little sentence).

## 5. Experience

They scan years and titles. They do not want a wall of bullets on the homepage.

Homepage experience = **résumé compression**: company, role, dates, location, 1–2 lines of scope.

Full bullets live in the PDF résumé and may be restated in case studies when a project happened at that company.

## 6. Contact

They arrive from: hero primary button, nav, footer, end of a case study, or `⌘K` → Email.

They should not have to choose among six equal channels. **One recommended path, then alternatives.**

Recommended path: **Email** (form *or* `mailto` + copy).  
Alternatives: LinkedIn, Résumé, GitHub.  
Tertiary: WhatsApp (clients in India), X.

After submit: stay on the page, polite live region, button state “Sent” (Phase 1). Do not navigate to a thank-you URL (extra bounce, lost context).

## Journey variants

**Recruiter, 45 seconds, desktop:** Hero → Work rows (no click) → Experience glance → Footer résumé + email. Case study optional.

**Hiring manager, 8 minutes, desktop:** Hero → Featured work → Case study (scroll all) → Back → Second case study or Experience → About → Contact or LinkedIn.

**Client, mobile:** Hero → Work (featured image matters) → Contact (email or WhatsApp). Experience skipped.

**Developer, keyboard:** `Tab` skip link → `⌘K` → type a project or “github” → leave for github.com. They may never touch the mouse.

**Return visitor with `#contact`:** Skip hero narrative. Hash scroll. Form focused or at least in view.

**Deep link to `/work/servyq`:** Case study must stand alone: name of the author, way home, way to contact, without requiring the homepage first. Logo/name in the same nav.

---

# Hero Strategy

The hero is the only section that may use `type.display.*`. It has no photograph by default (a photo in the hero competes with the name; the portrait belongs in About). It has no background illustration.

## The first 5 seconds — exact thoughts

If the visitor is a recruiter or hiring manager, they should think these thoughts, in this order, without effort:

1. **“This is a real person with taste.”**  
   Triggered by: first paint of paper, type, space. Not by a claim.

2. **“His name is Manish Jangra.”**  
   Triggered by: `h1` = `Manish Jangra` (full name, not `MANISH` as a poster, not a handle). Display size from Phase 1. Sentence case, not all caps (all caps is the previous site).

3. **“He’s a full-stack engineer who ships products.”**  
   Triggered by: one lede sentence under the name, `type.body.lg`, max `measure.lede.max` (22em). The sentence must include **scope** (interfaces + systems) and **not** a stack laundry list.

4. **“I know what to do next.”**  
   Triggered by: one primary button (`Get in touch` → `#contact`) and one secondary text link (`See selected work` → `#work` or `Résumé`). Not two primary buttons. Not “Learn more.”

Thoughts they must **not** have in 5 seconds:

- “What is this waiting on?”
- “Is this a Three.js demo?”
- “Cool. What does he actually do?”
- “I need to open the menu to understand this.”
- “This looks like every other developer landing page.” (gradient, spinning logos, `I BUILD THINGS` with a blinking cursor)

## Hero content model (implementation-ready)

| Slot | Content rules | Example direction (not final copy lock, but close) |
|---|---|---|
| Kicker | `type.kicker`, mono, muted. Role, not “Portfolio” | `Software engineer` |
| H1 | Full name | `Manish Jangra` |
| Lede | 1–2 sentences, specific, present tense. No stack dump. No “passionate.” Location may be clause two | `I build full-stack products — mobile clients, APIs, and the admin systems that run them.` Second sentence optional: `Currently in Chandigarh, working on production systems in React Native, Next.js, and NestJS.` — if the second sentence names stack, it must be *short*; the Capabilities section exists so the hero does not become a keyword field |
| Primary action | Phase 1 Primary, `size.lg` allowed only here | `Get in touch` |
| Secondary action | Phase 1 Text or Secondary | `See selected work` |
| Tertiary | Optional: `Download résumé` as text link | Visible on desktop; on mobile may wrap under |

**Availability line (optional, muted, caption):** e.g. `Available for full-time roles and selected freelance`. Only if true. Do not put a fake “Open to work” badge.

**What the hero never contains:** portrait, social icon row, tech logo row, scroll-down chevron bounce, video background, count-up stats (`12 projects`, `50k lines`).

## Hero success test (use in Phase 6 QA)

Show the hero for 5 seconds to someone who does not know Manish. They must be able to say: name, discipline, that there is work below, and how they would contact him. If they say “designer” or “frontend only” or “student,” the lede is wrong.

---

# Content Hierarchy

Everything on the public site falls on this ladder. If two items compete for the same visual weight, the higher one wins. If something is not on this ladder, it does not ship in v1.

## Most important → least important

1. **Name**  
   Identity. `h1` on Home. Nav mark is a quiet echo.

2. **Professional frame (lede)**  
   What he does, at the level of products and systems.

3. **Selected work (titles + outcomes)**  
   The argument. Featured project is the only element allowed to rival the hero in visual mass, and only *after* a scroll.

4. **A way to contact (email + form + résumé)**  
   Always reachable. Never visually louder than the work except in the Contact section, where it is the point.

5. **Case study depth**  
   Off-home. Highest *information* importance for hiring managers; not on the homepage ladder because it would destroy scan.

6. **Experience (role / company / dates)**  
   Trust. Compressed.

7. **Capabilities (tools in production)**  
   Confirms the work. Never a competing hero.

8. **GitHub activity**  
   Corroboration. Graph is medium; the profile link is the action.

9. **About (biography + portrait)**  
   Human remainder. Portrait is optional; if present, plate + grayscale rest (Phase 1).

10. **Secondary channels**  
    LinkedIn, GitHub, X, WhatsApp.

11. **Utility**  
    Theme, command menu, footer legal, last-updated.

12. **Decorative remainder**  
    Hairlines, kickers, hover grayscale. These support; they never introduce new meaning.

## What is more important than it looks

- **Writing quality** of the one-line project descriptions. A hiring manager will quote these internally.
- **Honesty of status** (`Shipped`, `In production`, `In progress`). Fake polish destroys 3–10.
- **The featured project choice.** Dayzo and Servyq are both system-level products. The featured slot should be the one most like the role Manish wants next. Default recommendation: the most complete, most “product + platform” piece. If both are equal, **Servyq** if targeting marketplace / realtime / payments roles; **Dayzo** if targeting consumer / social / mobile craft. Only one featured. The other is the first row.

## What is less important than the current site treats it

- GitHub language colors and repo star counts
- Skill percentages
- Blog
- AI guide / chatbot
- WhatsApp as a primary node
- Location as a large card (one muted line is enough)
- Admin / CMS (invisible)

## Copy length budget (homepage)

| Surface | Max |
|---|---|
| Hero lede | 2 sentences |
| Featured project lede | 2 sentences |
| Project row description | 1 sentence |
| Experience row | 2 sentences |
| Capabilities | Grouped names, not paragraphs |
| About | 3 short paragraphs |
| Contact supporting | 1–2 sentences |

If a section needs more, it belongs on `/work/[slug]` or in the PDF.

---

# Navigation Behavior

Tokens: `nav.height.mobile` 56, `nav.height.desktop` 64, `z.sticky` 10, sticky always, hairline on scroll > 8px, no hide-on-scroll (Phase 1). This section specifies **behavior and IA**, not restyling.

## Desktop (≥1024)

- Masthead full width, inner content `container.page` or `container.wide` aligned with the page well (Phase 3 will pick one; it must match hero alignment).
- Left: name mark.
- Center: empty. Do not center the links (that is a marketing-site cliché and fights the name). Links sit in the **right cluster, before utilities**, 24px apart.
- Current section: `aria-current="location"`, `color.text`. Updated by scroll spy.
- Scroll spy: the section whose top has crossed a line `nav.height + space.6` from the viewport top. When at the very top (hero), **no** item is current (hero is not a nav item). When in Capabilities or Activity, still no forced fake current — those are not in the nav. Only Work, Experience, About, Contact light up. Footer lights nothing new (Contact may still be current if the spy hasn’t left it).
- Click: smooth scroll to hash, offset for sticky nav. Update the URL hash without adding a history entry per section (`replaceState`) so the back button leaves the site, not the last five sections.
- Command menu: `⌘K` / `Ctrl+K` from anywhere except when a form field is capturing those keys (in inputs, do not steal `K`; `⌘K` is still standard even in inputs on Linear — follow Linear: it opens from inputs too). Esc closes.

## Tablet (768–1023)

- Same as desktop if all four links + utilities fit with ≥ 8px breathing room.
- If the name + four labels + `⌘K` + theme overflow, **drop the `⌘K` visual** first (keyboard still works), then drop to the mobile overlay pattern. Never shrink labels to 10px.

## Mobile (≤767)

- Name mark + menu button + theme (theme may sit inside the overlay if cramped; prefer it visible).
- Menu button: `aria-expanded`, label Menu / Close.
- Overlay: full viewport, `color.bg`, `z.modal`, four links at `type.h3`, plus Résumé, Email, GitHub as quieter text links below a hairline. No social icon soup.
- Open: focus moves to Close or the first link. Trap focus. Esc closes. Restore focus to the menu button.
- Opening the overlay **locks body scroll**.
- Choosing a link: close overlay, then scroll (wait one frame after close so height is correct).
- `⌘K` hint is not shown. Hardware keyboards may still open the command menu.

## Sticky behavior

- Always sticky (`position: sticky` or `fixed` with padding compensation on `body`/`main` — Phase 5).
- At scrollY ≤ 8px: background = page, no bottom border.
- At scrollY > 8px: `color.bg.elevated` at 80% + blur 12px + bottom `color.border`. No shadow (Phase 1).
- Does not compress in height on scroll. Height is constant (no shrink-on-scroll). Shrinking nav is motion without a job.

## Scroll behavior

- Native scrolling. **No scroll-jacking, no snap on the whole page** (Phase 1).
- `html` may use `scroll-behavior: smooth` for hash/nav clicks. Users with `prefers-reduced-motion` get instant jumps.
- Anchor offset: CSS `scroll-margin-top` on each section = nav height + `space.4`.
- Hero does not snap. Sections do not auto-advance.

## On case study pages

- Same nav component.
- Name mark → `/`.
- Work is `aria-current="page"` (not location) because we left home.
- Clicking Work goes to `/#work` (home, work section), not to the top of the current case study.
- Contact still goes to `/#contact`.
- No extra “case study” nav item.

---

# Project Showcase Strategy

## Role in the argument

Work is the product. Everything else is context. The showcase must answer, at scan speed: **what it is, who it was for, what Manish did, whether it shipped.**

## Inventory rules (B5)

- Homepage shows **3–5** projects, not everything.
- One **featured**. The rest are **rows**.
- Order is **editorial**, not chronological by default. Featured first, then remaining by relevance to the target role, then recency.
- Currently-working may get a muted meta label `In progress` — never a pulsing live dot (previous site).

Known candidates from existing material (content, not layout):

| Project | Why it belongs | Suggested slot |
|---|---|---|
| Servyq | Marketplace, realtime, payments, dual-role mobile, NestJS | Featured **or** first row |
| Dayzo | Consumer mobile, social/gamification, realtime, admin | Featured **or** first row |
| This portfolio (v2) | Only if the case study is about the system (CMS, IA, performance), not “I redesigned my site” vanity | Last row at most, or omit from homepage and keep as a case study linked from About |
| Others | Include only if they show a different axis (e.g. pure backend, open source) | Row |

Do not feature the portfolio itself.

## Homepage featured

- Media plate `container.wide`, 16:9, grayscale → color on hover (Phase 1).
- Image: a real product UI, not a logo on a gradient, not a mockup-on-a-fake-iPhone collage with reflections.
- Kicker: product category (`On-demand services`, `Habit platform`) not `Featured project`.
- Title: product name, `type.h2` or `type.h3`.
- Lede: problem → outcome, 1–2 sentences. Stack is not the lede.
- Meta row: Role (e.g. `Full-stack`), Year, 3–5 tech names as mono text, not chips with fills.
- Whole block is one link to `/work/[slug]`. Optional extra text links: Live, Repo — only if they do not create extra tab stops (Phase 1: one tab stop for the row; for featured, one tab stop for the main hit, Live/Repo can be separate links **after** the title in the tab order, visually quieter).

## Homepage rows

- Hairline list (Phase 1 Row).
- Columns: index or year | title + one sentence | meta (role or stack truncated).
- Entire row is the hit target to the case study.
- No thumbnails in the row.
- No hover lift. Title underline (Phase 1).

## Filtering and search

- **No** tech filter chips on the homepage. They turn Work into a dashboard.
- Command menu searches titles.
- If the list grows past 5, it still does not become a filterable app; it becomes a stricter editorial cut.

## Case study page (depth strategy)

Every public project in the homepage list **must** have a case study page. A row that only goes to GitHub is a leak of narrative.

Minimum case study outline (content IA, not layout — layout is Phase 3):

1. Recap band (title, lede, meta, links)
2. Problem
3. Role and constraints
4. Approach (architecture in words; at most one diagram image)
5. Highlights (3–5, written, not icon grid)
6. Outcome and status
7. Next / more work

Writing voice: Phase 1 brand voice. Lead with problem and outcome. Stack appears as a short meta list, not as the story.

**Live and repo links:** If there is no public live URL, omit it. Do not put a dead `Coming soon`. If the repo is private, say `Private repository` as text, not a broken link.

## Empty and loading

- Work with zero projects: do not ship the site. This section cannot have an empty state in production.
- Loading: if data is async, show the section title and 3 row skeletons that match row height — no spinner in the middle of the page. Prefer server-rendered content (Phase 5) so public visitors never see skeletons.

---

# Experience Strategy

## Role in the argument

Experience answers: **this is not only side projects.** It is compressed résumé, not a LinkedIn clone.

## Homepage presentation

- Reverse-chronological.
- Each role is a **Row**: years (tabular, muted, mono) | role + company | location muted | 1–2 lines of scope.
- `current` role: end date rendered `Present`.
- **No logos.** Company names as text. Logos are dashboard chrome and fail in dark/light unless every file is perfect.
- **No expand/collapse** on the homepage. If there is more to say, it belongs in the PDF or a case study. Accordions hide the thing recruiters skim for.
- 3–6 roles. If more exist, still show 3–6; the PDF has the rest.

## What each line must contain

- Role title (as it would appear on a résumé)
- Company
- Start–end (`YYYY` or `Mon YYYY` — pick one format site-wide: **`YYYY`** on homepage for calm; PDF may be more precise)
- One outcome-shaped sentence (“Shipped … / Built … / Led …”), not “Responsible for …”

## Relation to Work

If a project was built at a company, the project row’s meta may name the company. The experience row does not need to list every project. Cross-link in the case study, not with a web of chips here.

## Empty state

A junior site without experience can omit the section and drop **Experience** from the nav. Manish has experience: the section stays. Do not omit.

---

# Github Strategy

Rename in UI to **Activity**, with GitHub named in the supporting sentence. The word “GitHub” is still used in links and SEO. The section id is `activity` so we do not build a shrine.

## Role in the argument

Corroboration: **he still writes software.** It is not proof of product sense (Work is). It is not a skills section (language percentages lie).

## What to show

1. **Contribution graph**, last 12 months, **five intensity steps of `color.text` ink on `color.surface`** (Phase 1). No GitHub greens. No weekday labels theater beyond a minimal month axis.
2. **One number:** total contributions in that window, tabular, with a caption `contributions in the last year`. No count-up animation.
3. **A text link:** `View GitHub profile` → `https://github.com/manishjangra1` (external, `rel="me"`).
4. **Optionally, 3 pinned or recently pushed repos** as **rows**: name, one-line description from GitHub or override, language as **text**, not a colored dot. Star counts: omit unless genuinely non-trivial; small star counts look worse than none.

## What not to show

- Language pie / constellation / rainbow bars (previous site)
- Follower counts as a flex
- A clone of the GitHub profile header (avatar, bio, org soup)
- Live “commit ticker” or activity feed that moves
- Contribution graph as the largest object on the homepage (cap its visual mass below the featured project)

## Failure and privacy

- If the API fails: show the profile link and a one-line fallback (`Activity lives on GitHub`). Do not show a broken empty grid.
- Do not impersonate contribution levels. Do not screenshot a graph and fake dates.

## Relationship to identity

The GitHub avatar is **not** the nav mark (Phase 1). It may appear in About as the portrait if no custom portrait exists — still as a plate, grayscale rest.

---

# Contact Strategy

## Role in the argument

Contact is the **conversion surface**. It should feel like writing to a colleague, not submitting a lead to a marketing team.

## Channel hierarchy (binding)

| Priority | Channel | Presentation |
|---|---|---|
| 1 | Email | Visible address `dev.jangramanish@gmail.com` (or settings override), `mailto:`, copy-to-clipboard control with `aria-label`, and a form that sends to the same inbox via the existing CRM |
| 2 | Form | Name, email, message. Same fields as Phase 1 Inputs. Submit is the only primary button in this section |
| 3 | LinkedIn | Text link, for recruiters who will not email first |
| 4 | Résumé | Download, labeled `Résumé` (accent: American or `CV` — pick **Résumé** and use it everywhere) |
| 5 | GitHub | For engineers |
| 6 | WhatsApp | One text link, for local/client convenience. Not a floating button. Not a QR. Not equal visual weight to email |
| 7 | X | Footer-level only unless he actively uses it for work |

**There is no floating WhatsApp orb, no chat widget, no Calendly embed in v1.** If a calendar is added later, it is a text link.

## Form intent

The form is for people who will not open a mail client. It is not a CRM demo. Success copy: `Message sent. I will reply by email.` Errors are inline (Phase 1). Store in the existing contact inbox (Phase 5).

Do not ask for phone, company, budget, or “how did you hear.” Extra fields kill conversions and feel like a marketing site.

## Copy

Heading: direct. Direction: `Email me` or `Get in touch` — not `Let’s Build Together`, not `Let’s connect`, not `Say hello 👋`.

Supporting: 1–2 sentences stating **what he wants** (roles / selected freelance) so the wrong people self-select. Example direction: `Full-time product engineering roles and a small number of build engagements. The best first step is email.`

## Location

`Chandigarh, India` as a muted line, for timezone. Not a map. Not a large pin icon card.

## Hero relationship

Hero primary button scrolls here. It does not `mailto:` directly — the Contact section is the composed ask (form + address + résumé). Power users use `⌘K` → Email.

---

# SEO Strategy

SEO is a **name and proof** strategy, not a content mill.

## Primary queries to win

1. `Manish Jangra` (and `Manish Jangra` + engineer / Chandigarh)
2. Exact project names: `Dayzo`, `Servyq` (as they become public) — case studies are the landing pages
3. Long-tail only if true: `full stack engineer Chandigarh`, `React Native NestJS` — these are bonuses from real copy, not pages built for them

Do not build location landing pages or “top 10 React” blog posts.

## On-page (Home)

- `title`: `Manish Jangra — Full-Stack Software Engineer`
- `description`: one sentence matching the hero lede, ~150 characters, no keyword stuffing
- One `h1`: the name
- `h2` per section matching visible titles
- Canonical `https://{production-domain}/`
- Open Graph: light-mode screenshot of the hero or a designed 1200×630 **typographic** image (name + role, Phase 1 colors). Not a 3D render. Not a face unless it also appears on the site
- `twitter:card` = `summary_large_image`
- `lang="en"`
- JSON-LD `Person`: name, jobTitle, url, sameAs (GitHub, LinkedIn), addressLocality Chandigarh, email

## On-page (Case study)

- `title`: `{Project} — Manish Jangra`
- `description`: the one-line outcome
- `h1`: project name
- Canonical per slug
- OG image: product UI crop, grayscale-safe

## Technical

- Server-render public pages (Phase 5). The previous WebGL approach hurt indexability and performance; this IA assumes HTML content is in the document
- `sitemap.xml`: `/`, each `/work/[slug]`, not admin, not login, not hash URLs
- `robots.txt`: allow public, disallow `/admin`, `/login`, `/api`
- Trailing slash policy: pick one in Phase 5 and canonicalize
- Images: real `alt`, width/height reserved, no LCP image lazy-loaded in the hero (hero has no image) — featured work image may be LCP for visitors who land mid-page; for `/` LCP is the `h1`

## Hash URLs

Hashes are not separate SEO documents. Do not advertise `#work` as a canonical. Internal links may use hashes; external share links for work should be `/work/slug`.

## Content duplication

Case study vs GitHub README vs this repo’s markdown case studies: the **site is canonical**. Do not publish three conflicting stories. CMS content should be the edited, shorter, voice-correct version.

## Blog

Out of v1 public IA. If old blog URLs exist, 301 them to `/` or to a single archive later — decide in Phase 5. Do not leave soft-404s.

---

# Accessibility Strategy

Phase 1 already specified contrast, focus, reduced motion, semantics, hit targets, skip link, and live regions. This section specifies **UX-level a11y** so journeys work with assistive tech.

## Reading order = visual order = DOM order

Home DOM follows section order in this document. No visually-reordered grids that scramble screen-reader flow. Featured work: image then text, or text then image, but the heading must come before the lede in the DOM.

## Landmarks

- `header` (nav)
- `main#main`
- `section` per block with `aria-labelledby` → visible `h2` (hero’s `h1` is inside the first section or a `header` inside main — one `h1` only)
- `footer`

## Nav and spy

- Desktop links are `a href="#work"` (real anchors), not buttons that only scroll. Shareable, crawlable, right-clickable.
- `aria-current` updates with scroll spy; do not also add visually hidden “(current)” if `aria-current` is set.
- Mobile overlay is a `dialog` (or `role="dialog"`) with `aria-modal="true"` and a label.

## Command menu

- `role="dialog"`, listbox or combobox pattern (Phase 4 will pick one and implement it correctly — do not fake it with divs).
- Announces result count.
- Does not trap the rest of the page incorrectly when closed.

## Work list

- Featured: the title is the accessible name of the primary link.
- Rows: one link wrapping the accessible name `Project title — one sentence` or title with description as sibling not inside the link if that duplicates. Prefer: link text = title, description outside the link but associated. If the whole row is clickable, use a single overlay link with `aria-labelledby` pointing at title+description ids (Phase 4).

## Contact

- Form labels as Phase 1.
- Copy-email button: announce `Copied` via live region.
- Success: `aria-live="polite"`.
- Do not auto-focus the first field on page load (hostile on Home). Do not auto-focus on hash `#contact` either (scroll is enough). Exception: none.

## Case studies

- Headings descend without skipping (h1 → h2 → h3).
- Diagrams: `alt` that states the architectural claim, or a short text equivalent below.
- Code blocks: not required on v1 case studies; if present, Phase 1 code colors.

## Motion

- Hash smooth-scroll off when reduced motion.
- Graph is a static table or image with a text alternative: `{n} contributions in the last year`. The grid is `aria-hidden` if the number and link duplicate it.

## Language

- `lang="en"` on `html`.
- Project names stay as proper nouns.

## Keyboard map (complete)

| Key | Action |
|---|---|
| Tab / Shift+Tab | Move focus, visual order |
| Enter / Space | Activate focused control |
| Cmd/Ctrl+K | Open command menu |
| Esc | Close menu, overlay, dialog |
| Arrow up/down | Command menu options |
| / | Do **not** steal for search on Home (conflicts with find-in-page). Command menu is enough |

---

# Cross-references to Phase 1 (consistency lock)

| Topic | Phase 1 rule this UX obeys |
|---|---|
| Personality | Calm, precise, editorial; no theater in journeys |
| One idea per viewport | Hero ≠ form ≠ graph |
| Content is the interface | Rows and writing, not card grids |
| Nav | Sticky masthead, four items, no dock |
| Cards | Featured plate + rows; no thumbnail grid |
| GitHub color | Gray ramp only |
| Motion | No custom cursor, no WebGL, hero paints immediately |
| Contact inputs | Labels on top, three fields, no extra |
| Command menu | Engineer-speed utility, not a gimmick |
| Intention over inventory | 3–5 projects, no blog in v1 nav |
| Accent | Not used to “badge” Open to Work or live status |

---

# Open decisions (do not block Phase 3)

These can be answered during copywriting. Phase 3 should assume the defaults in **bold**.

1. Featured project: **Servyq** vs Dayzo — default **leave to Manish**; Phase 3 layouts both the same.  
2. Hero second sentence stack mention: **include a short clause** vs keep stack only in Capabilities.  
3. WhatsApp in Contact: **one secondary text link** vs omit.  
4. Blog 301 vs keep privately: **Phase 5**.  
5. Résumé file naming: `Manish-Jangra-Resume.pdf`.

None of these change section order, nav, or journeys.

---

# Checklist

Use this before approving Phase 2 and before starting `03-Page-Blueprint.md`. Every item must be true.

## Personas and goals

- [ ] Four personas exist; hiring manager and recruiter outrank client and developer when they conflict.
- [ ] Ten user goals (G1–G10) are testable (“completes when”).
- [ ] Business goals point at qualified conversations, not vanity metrics.
- [ ] Non-goals explicitly kill blog-as-SEO, chatbot, and 3D demo as v1 work.

## Information architecture

- [ ] Public product is Home + case studies + résumé file. No `/blog` in v1.
- [ ] Primary nav is exactly **Work, Experience, About, Contact** (Work first).
- [ ] Home section order is Hero → Work → Experience → Capabilities → Activity → About → Contact → Footer.
- [ ] The order has a written why; Skills and GitHub-as-hero are gone.
- [ ] Hashes are contracted (`#work`, `#experience`, `#capabilities`, `#activity`, `#about`, `#contact`).
- [ ] Case study slugs are stable (`dayzo`, `servyq`, …).
- [ ] Admin/login are private and out of public IA.

## Journeys and hero

- [ ] First 5 seconds produce the four thoughts: taste, name, full-stack products, obvious next action.
- [ ] Hero: full name as `h1`, sentence case, one primary (`Get in touch`), no photo, no logo row, no typewriter.
- [ ] Discovery hits Work before About.
- [ ] Trust order is artifacts → trajectory → corroboration.
- [ ] Case studies stand alone from a deep link.
- [ ] Recruiter can succeed without opening a case study; hiring manager cannot fully succeed without one.

## Content hierarchy

- [ ] Name → lede → work → contact reachability → case study depth → experience → capabilities → GitHub → about → secondary channels.
- [ ] Homepage copy budgets are specified.
- [ ] Featured vs row rules match Phase 1 (one plate, otherwise rows, 3–5 items).

## Navigation behavior

- [ ] Sticky, no hide-on-scroll, no shrink, hairline after 8px.
- [ ] Desktop: links right-aligned with utilities; scroll spy only for the four nav items.
- [ ] Hash updates use `replaceState`.
- [ ] Mobile: full-screen text overlay, focus trap, body scroll lock.
- [ ] Tablet drops `⌘K` visual before shrinking type.
- [ ] Case study nav: Work is current page; Work link returns to `/#work`.

## Section strategies

- [ ] Projects: editorial order, case study required, no filter chips, no empty production state.
- [ ] Experience: rows, no logos, no accordion, `Present` for current, YYYY dates on Home.
- [ ] GitHub: called Activity, gray graph, one number, profile link, API failure fallback, no rainbow languages.
- [ ] Contact: email + form lead; LinkedIn/résumé next; WhatsApp not floating; no Calendly; location is a line; success stays on page.
- [ ] Capabilities replaces Skills: typography, after proof.

## SEO and accessibility

- [ ] Title/description/JSON-LD/Person/sameAs specified; OG is typographic, not 3D.
- [ ] Sitemap excludes admin/login/api; hashes are not canonical documents.
- [ ] Anchors are real `a href="#…"`.
- [ ] Keyboard map is complete; `/` is not stolen.
- [ ] Graph has a text alternative; form live region specified; no autofocus on load.
- [ ] Reduced motion disables smooth scroll.

## Consistency and process

- [ ] Every strategy uses Phase 1 tokens and components (rows, plates, buttons, kickers, command menu).
- [ ] No new colors, typefaces, or motion character.
- [ ] This document contains no React, Tailwind, or CSS — only UX specification.
- [ ] Phase 3 may now draw written wireframes for Hero, Work, Experience, Capabilities, Activity, About, Contact, Footer, and `/work/[slug]`, at desktop, tablet, and mobile, using this IA.

---

**End of Phase 2.**

Approve this document to proceed to **Phase 3: `03-Page-Blueprint.md`**. If the nav order, section order, featured-project policy, or the decision to drop Blog/Skills from public IA is wrong, say so now. Phase 3 will freeze these as geometry.
