# 06 — Polish and Finishing

**Phase:** 6 of 6  
**Document type:** Polish, QA, launch, and roadmap  
**Status:** Approved  
**Depends on:** `01-Design-System.md` through `05-Implementation-Guide.md` (all approved)  
**Scope lock:** This document may **not** add routes, components, tokens, sections, or personas. It specifies how the already-defined product is tuned, verified, shipped, and later evolved. If a polish idea needs a new component, it is a **version 2** idea, not a v1 task.

This is the pass that turns a correct implementation into a site that feels **inevitable** (Phase 1). Correct means it matches Phases 1–5. Exceptional means a hiring manager cannot find a loose end: hover, focus, copy, spacing, empty GitHub, a slow PDF, a Safari blur bug, a 404 that looks like another product.

Implement polish **after** Phase 5’s end-to-end path works. Do not polish a cinematic leftover.

---

# Micro-interactions

A micro-interaction is a **state change the user caused**, completed in ≤ 400ms, with a named job. If nobody would notice its absence except as a bug, it is not polish — it is a missing spec from Phase 4. If nobody would notice its presence, delete it.

## Inventory (complete for v1)

| ID | Trigger | Response | Job | Duration | Reduced motion |
|---|---|---|---|---|---|
| M1 | Hover Primary button | Fill `color.hover` | Confirm clickability | 150ms | Snap |
| M2 | Press any button | Darker fill / active 80ms | Confirm press | 80ms | Snap |
| M3 | Hover TextLink / row title | Underline ink + color | Confirm navigation | 150ms | Snap |
| M4 | Hover featured Plate | Grayscale 100→0, border strong | Preview the product as real | 400ms | Snap to color (or stay gray — **lock: snap to color**) |
| M5 | Hover About Portrait | Same as M4 | Same signature | 400ms | Snap to color |
| M6 | Focus-visible any control | 2px ring offset 2 | Keyboard location | Instant | Keep (not motion) |
| M7 | Nav scrollY > 8 | Hairline + elevated blur | Separate chrome from content | 150ms | Snap |
| M8 | Open MobileMenu | Overlay opacity 0→1, trap focus | Mode change | 200ms | Instant |
| M9 | Open CommandMenu | Overlay + scale 0.98→1 | Mode change | 200ms | Instant, scale skipped |
| M10 | Command item active | Row `surface.hover` | Keyboard position | Instant | — |
| M11 | Copy email success | Icon copy→check 2s, live region | Confirm | Instant swap | Instant |
| M12 | Form submit | Button width-stable spinner → `Sent` 2s | Confirm network | Spinner 800ms loop | Visible `Sending…` text, no spinner |
| M13 | Theme toggle | Token swap, icon sun/moon | Confirm scheme | Instant class on `html` | Instant (no crossfade of the whole page) |
| M14 | Section enter (not Hero) | Opacity + 8px rise, once | Gentle arrival | 400ms | Skip entirely |
| M15 | List stagger | Items 2–4 delay 60ms | Order, not spectacle | 0–180ms | Skip |
| M16 | External TextLink (Live/Repo) | Color; 14px arrow does **not** independently wiggle | It is a link | 150ms | Snap |

**Do not add:** button translateY, magnetic pull, cursor-follow spotlight, ripple, check-draw animation, confetti on send, haptic (no API on web we will use), sound.

## Quality bar for each micro-interaction

- Reversible: hover out returns in the same 150/400ms (no linger).
- Interruptible: rapid hover in/out does not queue (CSS transitions, not JS animation queues).
- Same in light and dark (tokens, not extra keyframes).
- Does not shift layout (no underline that changes line-height; use `text-underline-offset` 3px as Phase 1).

---

# Motion guidelines

This is the operational layer on Phase 1 Animation Philosophy. Engineers use this table, not taste.

## Curves and times (do not add tokens)

Reuse Phase 1: `motion.instant` 80, `fast` 150, `base` 200, `slow` 400, `page` 500. `ease.out` default. Linear for spinner only.

## Rules of thumb

1. **Opacity + 8px** is the only enter pattern for content.
2. **Color/border** is the only hover pattern for chrome.
3. **Grayscale** is the only hover pattern for photography (Home only; case study image stays color).
4. **Scale** appears once: CommandMenu 0.98→1. Nothing else scales. Featured plate must not scale on hover even at 1.01 if it causes subpixel fuzz on screenshots — **lock polish: no scale on images**; grayscale + border is enough (overrides Phase 1’s optional 1.01).
5. **Never** animate `width`/`height` of sections. Never animate `blur` on content (nav blur is a static scrolled state, not an animation of blur amount).
6. Stagger **max 4**, then the rest appear with the fourth. If a list has 5 rows, row 5 has the same delay as row 4.
7. IntersectionObserver `threshold: 0.2`, `once: true`. Root margin `0px 0px -10% 0px` so things don’t fire while still hidden under the nav. Hero excluded.
8. If a section is **already in view on load** (short laptop + large type), treat as visible immediately — no fade from invisible (that is a flash of empty).
9. Hash navigation: **no** reveal replay. If they jump to `#contact`, the form is opaque from frame one of that scroll.

## Page-level motion

- Route `/` → `/work/[slug]`: prefer **instant RSC** (Phase 5). If a crossfade is implemented, it is 200ms opacity only, not 500ms, and **not** a shared-element image morph.
- Back to Home: land at `#work` when coming from pager “All work”; no reveal replay on Work.

## Debugging

Ship with no motion debug flags. During polish, a query `?motion=off` is allowed locally; strip before launch.

---

# Hover behavior

Canonical matrix. Anything not listed does not hover.

| Target | Pointer | Hover | Cursor |
|---|---|---|---|
| Primary / secondary / ghost button | yes | Phase 1 fills | `pointer` |
| TextLink | yes | underline + ink | `pointer` |
| Nav item | yes | `color.text` | `pointer` |
| NameMark | yes | no underline; stays ink | `pointer` |
| CommandTrigger | yes | ghost hover | `pointer` |
| IconButton | yes | ghost fill | `pointer` |
| Featured plate (link) | yes | M4 | `pointer` |
| ProjectRow | yes | title underline, **no row fill** | `pointer` |
| RepoRow | yes | title underline | `pointer` |
| ExperienceRow | no | none | `default` |
| Capability names | no | none | `default` |
| Contribution cells | no | none | `default` |
| Portrait | not a link | M5 | `default` |
| Case study hero image | not a link | none | `default` |
| Footer links | yes | `color.text` | `pointer` |
| Disabled button | no | none | `not-allowed` |
| Body text | no | none | `auto` |
| Inputs | yes | border muted | `text` |

**Sticky hover on touch:** `:hover` must not stick after tap on iOS. Use `@media (hover: hover) and (pointer: fine)` for grayscale and row underlines. Touch devices: plates stay grayscale until navigated away **or** show color at rest on coarse pointers. **Lock: on `(hover: none)`, featured and portrait images are color at rest** (otherwise mobile users never see the product UI). Desktop fine pointer keeps the grayscale signature.

---

# Loading states

Phase 5 defined strategy. Polish specifies **how it looks**.

## Home

- No skeleton for the whole page.
- No top nprogress bar.
- Images: `Plate` holds aspect box in `color.surface`; image fades in 150ms opacity when decoded (`onLoad` class). Reduced motion: opacity 1 immediately.
- If an image fails: keep the plate, no broken-image icon; optional muted caption `Image unavailable` only on case study, not Home featured (fix the asset instead).

## CommandMenu (code-split)

- First open before chunk loads: **nothing**, or a 40px empty plate the same size as the menu with no spinner (spinner would look like search). Target idle prefetch so this is rare.
- If chunk fails: live region `Command menu failed to load. Use the navigation.`

## Contact

- Submitting: Phase 4 button loading.
- Do not disable the whole page.
- Double-submit: ignore second click while `submitting`.

## Case study `loading.tsx` (if used)

- Nav + footer already from layout (must not unmount).
- Main: kicker line 80×11, title block 60% width × 40px, lede 3 lines, 16:9 plate `color.surface`. All `radius` matching. No shimmer animation (shimmer is template). Static bones only.
- Max shown 1s typical; if always flashing, remove `loading.tsx`.

## Theme

- Anti-flash script (Phase 5) is required polish, not optional. Verify no light-then-dark blink on a dark-OS user.

---

# Empty states

Production Home **must not** ship with empty Work (Phase 2). Empty states still exist for **degraded** and **partial** data.

| Surface | Empty condition | UI |
|---|---|---|
| Work | 0 projects | Do not render a cute empty. **Fail the build or hide the section and drop nav Work** — treat as a content error. Prefer not deploying |
| Experience | 0 roles | Omit section + omit nav item (Phase 2 junior exception). Unlikely for Manish |
| Capabilities | missing groups | Omit section. Do not show “Coming soon” |
| Activity | API error | Title block + `Activity lives on GitHub` + profile TextLink. No empty grid |
| Activity | 0 contributions | Show `0` + caption + graph of empty cells (level 0) + profile link. Honest |
| Repos | 0 optional repos | Omit repo list; keep graph |
| About portrait | no image | Prose-only layout (Phase 3) |
| About copy | missing | Do not ship lorem. Hide section if both paragraphs empty |
| Contact WhatsApp | unset | Omit link |
| Command search | no hits | One row `No results` muted, not clickable |
| 404 | unknown URL | Phase 3 copy only |
| Case study figure | omitted | Body without a plate — do not insert a placeholder rectangle |

**Copy voice:** dry, Phase 1. Never `Nothing here yet ✨`. Never illustrations.

---

# Scroll reveals

Polish pass on Phase 1/5:

1. Hero: never.
2. Each following section’s **header + first content group** as **one** unit (About: portrait+text together).
3. Work rows / Experience rows: first 4 only stagger.
4. Capabilities: 3 groups stagger.
5. Activity graph: part of the section unit, cells do not animate individually.
6. Footer: no reveal.
7. Case study: **no** per-`h2` reveal (Phase 3). Recap may use a single unit if it does not delay LCP text — **lock: case study no reveal at all** (reading page, not a landing).
8. Reveal class must not start at `opacity: 0` in the first paint for content above the fold on large type + small laptop — JS sets `is-visible` before first paint if `getBoundingClientRect` says in view (run observer on mount synchronously).

**QA:** scroll quickly to footer; nothing should still be `opacity: 0` waiting for an observer that missed. Fallback: if `IntersectionObserver` unsupported, all visible.

---

# Cursor interactions

**The system cursor is the product cursor** (Phase 1). Polish is **correct cursor tokens**, not a custom layer.

| Role | CSS cursor |
|---|---|
| Links, buttons, rows that navigate | `pointer` |
| Text inputs / textarea | `text` |
| Default content, experience rows, graph | `auto` / `default` |
| Disabled | `not-allowed` |
| Button loading | `progress` **or** keep `pointer` — **lock: `default` during loading** so it doesn’t feel clickable |
| Horizontal overflow (should not exist) | never `grab` |

**Forbidden:** custom cursor element, mix-blend, trailing dots, view-finder, hiding `cursor` on `body`.

**Selection:** `::selection` uses Phase 1 tokens. Verify in both themes.

**Tap highlight:** `-webkit-tap-highlight-color` transparent **only if** `:active` styles still show; otherwise leave OS highlight. Prefer a brief `active` fill on buttons.

---

# Page transitions

| From | To | Behavior |
|---|---|---|
| Home hash to hash | — | Smooth scroll if no reduced motion; `replaceState` |
| Home → case study | Next navigation | Instant HTML swap; scroll to top of case study |
| Case study → `/#work` | All work | Home loads, then scroll to `#work` (browser hash or client `scrollToId` after paint) |
| Case study → `/#contact` | Get in touch | Same |
| Any → 404 | — | Instant |
| Any → `/resume` | — | Browser download/redirect; no in-app transition |
| Theme change | — | Instant token swap, **not** a page transition |

No progress bar. No “curtain.” No 3D flip.

**Scroll restoration:** case study always starts at top (`scroll={true}` default). Home hash overrides. After Back from case study, restoring Home scroll position is acceptable (browser default); do not fight it.

---

# Typography polish

Implementation often gets type 90% right. This is the last 10%.

## Optical

- Hero name: confirm negative tracking from Phase 1 at each breakpoint. If Geist looks tight on `Jangra`, do not add letter-spacing ad hoc — check font features `kern` on.
- `font-feature-settings`: `"kern" 1`, `"ss01"` only if Geist needs it for a/l distinction — default **off** unless a bug appears.
- Tabular nums on all years, contribution count, command hints.
- Nav `Manish` vs hero `Manish Jangra`: same weight 500, different size. Do not bold the nav.
- Kicker uppercase: use CSS `uppercase`, not CMS yelling.
- Case study `h1` 48/40, never 80.
- Widows: `text-wrap: balance` on hero name, section `h2`, featured title. `pretty` on lede and about paragraphs if supported. Not on long case study body (can over-space).
- Hyphens: body auto on mobile only (`lang=en`).
- Measure: lede 22em, body 40em — **measure in the browser**, not only in CSS intent. About split must not produce 90-character lines.
- Underline offset 3px on TextLinks; thickness 1px. Nav current: **color only**, no underline (Phase 1 preference).

## Copy polish (content, not layout)

Before launch, rewrite until:

- Hero lede has zero stack dump or one short clause (Phase 2 open decision: short clause OK).
- Every project row is one **outcome** sentence.
- Contact support states what he wants (roles / selected freelance).
- No `Let's`, no emoji, no `passionate`, no `cutting-edge`.
- Featured kicker is a category, not `Featured`.

## Font loading

- After swap, no persistent FOUT of Inter/system for >200ms on repeat visits (cache).
- Disable faux bold (only 400/500 loaded).

---

# Spacing polish

The 8px grid is necessary but not sufficient. Optical adjustments allowed **only** as listed — they are still token multiples.

## Pass list

1. **Hero:** On 1440×900, name sits in the upper third, not the geometric center. If it sits low, padding-top is too large — do not exceed `space.40` (160). If it kisses the nav, increase toward 160, never 164.
2. **Featured → rows:** 64px desktop air (Phase 3) must read as a new thought. If it feels like one blob, the plate border is too strong — keep 1px, keep the 64.
3. **Year rails:** Work and Experience 96px, **pixel-aligned** (screenshot overlay both sections). Right-align years.
4. **Nav vs hero left edge:** overlay a vertical guide at the wide well. NameMark and `h1` share it.
5. **Contact desktop:** details column first baseline = Name label, not the section kicker.
6. **Footer:** not vertically cramped; 64 padding. Links 16px gaps. Wrap without a single orphan link on a third row on 1024 if possible — if it wraps, left-align the wrap, don’t justify.
7. **Mobile 20px gutter:** check iPhone SE width (320–375). Hero name wrap is two lines max. Primary button not full viewport; intrinsic.
8. **Safe area:** `env(safe-area-inset-bottom)` on mobile overlay padding and footer, so home-indicator does not cover Close.
9. **Sticky nav overlap:** `scroll-margin-top` = nav height + 16. Click Work: kicker not clipped. Test all hashes.
10. **No leftover 13/15/18px.** Browser computed styles sampled on Container, SectionHeader, rows.

## Optical exceptions (approved)

- Icon-to-label remains 8px even if it looks 1px loose (Phase 1).
- Focus ring 2px outside may overlap a neighbor by 2px — do not add extra margin that breaks the grid; ring can paint over paper.

---

# Visual QA checklist

Run on **light and dark**, production build, not only `next dev`.

## Brand

- [ ] Feels like paper and ink, not a dashboard.
- [ ] No amber, glass, noise overlay, gradient mesh, glow, neon, GitHub green, social brand fills.
- [ ] No dock, no custom cursor, no 3D, no boot screen.
- [ ] At most one primary button in view.
- [ ] Accent used as punctuation, not decoration.

## Layout

- [ ] Wells: 1280 / 1120 / 720 as specified; lists inset vs hero.
- [ ] Hero min-height 100vh (except short landscape).
- [ ] Featured stacked 16:9, not side-by-side.
- [ ] Graph shorter than featured (~208px plate vs ~720 media).
- [ ] Capabilities three text columns, no logos.
- [ ] Contact stacked &lt;1024.
- [ ] Footer: copyright + links, no slogan.

## Type and color

- [ ] Geist only (check computed family).
- [ ] Weights 400/500 only.
- [ ] Selection color matches tokens.
- [ ] Scrollbar 6px, thumb tokens, track transparent.
- [ ] Dark mode borders visible but not a wireframe.

## Media

- [ ] Screenshots are real UI, not logo-on-gradient.
- [ ] Home plates grayscale at rest on fine hover devices; color on coarse.
- [ ] Case study hero color at rest.
- [ ] 16:9 not cropped to 21:9.
- [ ] Portrait 1:1, not squished.

## Chrome

- [ ] Nav 64/56, no hide-on-scroll, no shrink.
- [ ] Hairline after 8px scroll, no shadow.
- [ ] ⌘K hidden on small screens, keyboard still works.
- [ ] Theme persists and matches OS when set to system.

## Bugs to hunt

- [ ] Double hairlines between rows (2px).
- [ ] Horizontal page scroll at any breakpoint 320–1440.
- [ ] Focus ring clipped by `overflow: hidden` on plates/nav.
- [ ] Backdrop-filter sample: if broken, solid elevated bg (Phase 1).
- [ ] `100vh` iOS: hero not jumping when URL bar hides — prefer `100dvh` if it does not break; **lock: `min-height: 100dvh` with fallback `100vh`**.

---

# Accessibility QA

Perform with keyboard, VoiceOver (Safari macOS), NVDA or similar if available, axe, and a 200% zoom.

## Keyboard

- [ ] Skip link first; visible on focus; lands in `#main`.
- [ ] Tab order = visual order through hero, nav (when tabbing from skip or through header — document order: skip, nav, main… as SiteShell).
- [ ] All four nav links are real anchors.
- [ ] Featured: one tab to case study, then Live, then Repo if present.
- [ ] Rows: one tab each.
- [ ] Experience rows not in tab order.
- [ ] ⌘/Ctrl+K opens command; Esc closes; arrows; Enter; focus restore.
- [ ] Mobile menu: Esc, trap, restore, `aria-expanded`.
- [ ] Form: no autofocus; errors tied with `aria-describedby`; success polite live region.
- [ ] Copy announces `Copied`.
- [ ] No `tabindex` > 0.

## Screen reader

- [ ] One `h1` per page.
- [ ] Home outline: h1 name → h2 sections → h3 products/roles/groups.
- [ ] Graph skipped; count + profile link spoken.
- [ ] Current nav announced (`aria-current`).
- [ ] External links: name does not rely on icon.
- [ ] Image alts describe UI, not “screenshot” / “image”.

## Motion and contrast

- [ ] OS reduced motion: no transforms, no staggered fade (or 0ms), hash jump instant, spinner replaced with text.
- [ ] Contrast checker: body, muted (if meaningful), primary button, focus ring vs card and page.
- [ ] Dark theme rechecked, not assumed inverted.

## Other

- [ ] Zoom 200%: no overlapping nav and h1; no trapped text.
- [ ] Hit targets ≥ 40px.
- [ ] `lang=en`.
- [ ] axe: 0 violations on `/` and one case study, both themes.
- [ ] Playwright a11y from Phase 5 still green.

---

# Performance QA

Measure **production** preview, cache-disabled once, then with cache.

## Lighthouse (Phase 5 goals)

- [ ] `/` desktop: Perf ≥ 95, a11y 100, BP ≥ 95, SEO 100
- [ ] `/` mobile: Perf ≥ 95 (if 93–94 from font, fix fonts; do not cheat with `--throttling`)
- [ ] Featured case study: same bars
- [ ] LCP element on `/` is the `h1` (or immediately adjacent text), **not** the featured image
- [ ] CLS &lt; 0.02 (fonts, nav, images reserved)

## Bundle

- [ ] No `three` / R3F / gsap / lottie in Home client graph
- [ ] JS gzip &lt; 120KB first load (Phase 5)
- [ ] CommandMenu not in critical path (or idle-prefetched)
- [ ] NextAuth not on public layout

## Runtime

- [ ] GitHub fetch does not block TTFB of Hero (Activity can be cached/stale)
- [ ] Images: correct `sizes` for 16:9 well (don’t download 1280 for mobile 100vw without sizes)
- [ ] No layout thrash on scroll spy (rAF or CSS only; no setState per pixel)
- [ ] Theme script does not add long tasks &gt; 50ms

## Network

- [ ] Fonts: two families, two weights
- [ ] OG image not 3MB
- [ ] Résumé PDF reasonable (&lt; 1MB if possible)

---

# SEO QA

- [ ] Title Home: `Manish Jangra — Full-Stack Software Engineer`
- [ ] Case study title: `{Project} — Manish Jangra`
- [ ] Description unique and ≤ 155 characters
- [ ] Canonical host matches `NEXT_PUBLIC_SITE_URL` (www vs apex)
- [ ] OG 1200×630 renders name + role on paper; test in Facebook debugger / Twitter card validator
- [ ] JSON-LD Person valid (Rich Results test); `sameAs` GitHub + LinkedIn
- [ ] `robots.txt` disallows `/admin`, `/login`, `/api`; sitemap listed
- [ ] Sitemap: `/` + published slugs only; no `/blog`
- [ ] `/blog` 301 → `/`
- [ ] View source: real `h1`/`h2` and project names without waiting for JS
- [ ] `rel="me"` on GitHub
- [ ] 404 returns 404 status, `noindex`
- [ ] `/work/unknown` 404
- [ ] `html lang="en"`
- [ ] Trailing slash policy consistent

---

# Cross-browser testing

Minimum matrix before launch. Real devices where noted.

| Browser | OS | Priority | Watch |
|---|---|---|---|
| Chrome latest | macOS | P0 | Baseline |
| Safari latest | macOS | P0 | `backdrop-filter`, `dvh`, font features, `:has` if used |
| Safari iOS 17+ | iPhone | P0 | 100vh jump, hover sticky, overlay scroll lock, safe-area, ⌘K N/A |
| Chrome | Android | P0 | Gutter, form zoom (16px inputs — body is 16, good), overlay |
| Firefox latest | macOS | P1 | Scrollbar styling, `:focus-visible` |
| Edge latest | Windows | P1 | ClearType at 500 weight, system fonts fallback if Geist slow |
| Safari 16 | macOS | P2 | If `text-wrap: pretty` missing, ignore |

**Pass criteria:** layout matches Phase 3, no horizontal scroll, forms submit, command works on desktop, theme works, no console errors.

**Safari specifics:** if blur is ugly, disable blur and use solid `color.bg.elevated`. Test `position: sticky` vs `fixed` nav with `dvh` hero.

---

# Responsive QA

Test widths: **320, 375, 390, 768, 1023, 1024, 1280, 1440, 1920**.

## Mobile (≤767)

- [ ] Gutter 20px; no 0-margin full-bleed except background
- [ ] Nav: mark + theme + menu; overlay stacked `h3` links
- [ ] Hero name two lines max; actions stacked; button not 100vw
- [ ] Featured 16:9 readable (UI not postage-stamp)
- [ ] Graph 26 weeks, caption matches, cells ≥ 8px
- [ ] About portrait 1:1 then prose
- [ ] Form first, then details
- [ ] Footer wraps
- [ ] Command keyboard still if hardware keyboard
- [ ] `hover: none` images in color

## Tablet (768–1023)

- [ ] Nav links visible or collapsed per overflow rule; ⌘K dropped first
- [ ] Contact stacked (Phase 3 lock &lt;1024)
- [ ] Year rail 96px; Experience location under company if needed
- [ ] Capabilities 2 columns
- [ ] Hero 48px name

## Desktop (≥1024)

- [ ] Contact two columns, alignment of details to Name
- [ ] Capabilities 3 columns
- [ ] Featured text page well, plate wide well
- [ ] Spy only lights Work/Experience/About/Contact
- [ ] Capabilities/Activity do not fake a current nav item

## Wide (≥1440)

- [ ] Content capped 1440; margins grow
- [ ] Hero name 80px
- [ ] Line lengths still capped (not 1600px sentences)

## Landscape phone

- [ ] Hero does not trap in 100vh cramped (Phase 3 exception)

---

# Final design review

A sitting with the six docs open. Score each **yes/no**. Any no blocks launch.

## Five-second test (Phase 2)

Show Home to someone who does not know Manish, 5 seconds, desktop light mode.

They must say: his name, that he builds products/full-stack, and how they’d contact him. They must **not** say student, designer-only, or “nice animation.”

## Recruiter scan (45s)

Work names readable without opening a case study. Résumé and email findable.

## Hiring manager (8 min)

One case study: problem, ownership, outcome, no stack-as-story. Site craft matches the writing.

## Design principles (Phase 1)

Walk 15 principles. Especially: one idea per viewport, whitespace as material, no template tells.

## Consistency

- Same hover time everywhere (150 / 400).
- Same row language Work vs Experience.
- Same plate language featured vs graph vs portrait (graph is short; others 16:9 or 1:1).

## Intention

- 3–5 projects, one featured.
- WhatsApp not floating.
- Blog gone from public.

## Dark mode

Not a dimmed afterthought. Hairlines hold. Photos still work.

**Sign-off line (record in the PR):** “Phase 6 design review passed, {date}, {name}.”

---

# Launch checklist

Do in order. Do not announce until **15** is done.

1. **Content freeze:** hero, projects, case studies, experience, capabilities, about, contact, résumé PDF, alts, slugs.
2. **Exactly one featured;** case study exists for every Home project.
3. **Admin:** slug uniqueness, `revalidatePath` on save, test a copy edit appears on preview.
4. **Env production:** `NEXT_PUBLIC_SITE_URL`, Mongo, Auth, Blob, `GITHUB_TOKEN`.
5. **Canonical domain** + www/apex redirect.
6. **Redirects:** `/blog` 301, old paths 301.
7. **robots + sitemap** live fetch.
8. **Playwright** Phase 5 flows green against preview.
9. **Lighthouse** goals met on preview **and** production URL.
10. **A11y QA** (this doc) signed.
11. **Visual QA** light+dark, iOS Safari, Chrome.
12. **Contact form** real send to inbox; spam 429; mailto still works.
13. **Résumé** downloads, filename `Manish-Jangra-Resume.pdf`.
14. **OG** debug tools pass.
15. **Remove** public imports of cinematic/3D (grep). Optional: leave files unreferenced for a follow-up delete PR.
16. **Analytics:** none, or privacy tool loaded after idle — **v1 default none**.
17. **Status:** Vercel production deploy, not just preview.
18. **Spot-check** GitHub API remaining rate limit after deploy.
19. **Update LinkedIn / GitHub** profile URL **after** production looks right (not preview).
20. **Watch** contact inbox and error logs 48h.

**Rollback:** previous Vercel production alias. Content-only issues: fix CMS, revalidate, no revert.

---

# Post-launch improvements

First two weeks, in this order, still **within v1 spec** (no new components):

1. Fix any Lighthouse regression on real devices.
2. Tighten copy from real recruiter feedback (lede, row sentences).
3. Replace any weak screenshot (lighting, crop, grayscale source).
4. Confirm featured choice (Servyq vs Dayzo) against the roles being targeted.
5. Trim GitHub `repos` if they look like noise.
6. Admin: make case-study editing less painful if structured fields are clumsy — still same data shape.
7. Delete dead cinematic packages from `package.json` once a week of production is clean.
8. Add Playwright to CI if it was build-only.
9. Monitor 404s (old blog URLs missed in redirects).
10. Optional: `revalidateTag` granularity if full-home revalidate is heavy.

Do **not** post-launch add: chatbot, blog, skill grid, Calendly embed, custom cursor, WebGL “just in the hero.”

---

# Future roadmap

Phased, after v1 is boringly solid.

| Horizon | Theme | Examples |
|---|---|---|
| v1.1 | Craft | Copy, photos, Lighthouse, dead-code removal, admin fields UX |
| v1.2 | Trust | A single optional “Selected press / writing” **row** only if real URLs exist — would need a Phase 2 amendment |
| v2 | Surfaces | See below |
| Later | Platform | i18n, CMS migration, design-system extraction |

Roadmap items that **change IA** require a new 02 amendment, not a silent Phase 6 add.

---

# Ideas for version 2

These are **explicitly not v1**. Capture so they are not “forgotten polish.”

1. **Writing:** `/writing` index, RSS, nav item only after 3+ posts worth keeping. Voice stays Phase 1.
2. **Lab / notes:** short engineering notes, still editorial, not a second blog personality.
3. **Command menu actions:** copy current URL, switch section, maybe print résumé — still no AI chat.
4. **Case study diagrams:** one extra figure max remains; interactive architecture explorers are v2 and dangerous (dashboard).
5. **Availability calendar:** text link to a booking tool, never an embed on Home.
6. **Now page:** `/now` in the footer only, not nav.
7. **Colophon:** how the site is built — footer text link, one prose page, using the same tokens. Good for developers; keep out of primary nav.
8. **High-contrast theme:** extra token set, same components.
9. **Admin visual pass:** reuse public primitives; never leak into public.
10. **Multilingual:** Hindi/English toggle — large IA change.
11. **Passwordless case studies** for private work: gated slug, `noindex`.
12. **OG per project** generated from title + kicker, still typographic.
13. **Idle prefetch** of the next case study on featured hover (perf, not a new UI).
14. **Email copy** in command already in v1; v2 could create `mailto` with subject prefilled from the project last viewed.
15. **Testimonials:** only named, with permission, as a prose quote in About — no logo wall.

**Still banned in v2 unless the brand document is rewritten:** custom cursor, WebGL identity, glassmorphism, skill percentages, floating WhatsApp, AI recruiter bot as chrome.

---

# Polish implementation order

After Phase 5 path works:

1. Hover media query (`hover: hover`) for grayscale.
2. `100dvh` hero + safe-area overlay.
3. Image fade-in; theme anti-flash.
4. Reveal observer + above-the-fold skip + case study no reveal.
5. Command idle prefetch + empty “No results.”
6. Typography wrap/balance, tabular nums, underline offset.
7. Spacing optical pass (nav align, rails, contact baseline).
8. Touch/iOS hover and scroll-lock.
9. QA matrices in this document.
10. Launch checklist.

---

# Cross-references

| Polish topic | Must not contradict |
|---|---|
| Micro-interactions | Phase 1 timings, Phase 4 ownership |
| No custom cursor | Phase 1 / 4 / 5 |
| Empty GitHub | Phase 3/4 Activity error |
| Loading | Phase 5 (no root spinner) |
| Touch color images | New lock, still no extra component |
| Image no-scale | Tightens Phase 1 optional 1.01 |
| Case study no reveal | Phase 3 |
| v2 ideas | Phase 2 non-goals remain until amended |

---

# Checklist

Use this before approving Phase 6 and before calling the **specification** complete. After implementation, reuse as the polish gate before launch.

## Spec integrity

- [ ] No new routes, components, or tokens introduced for v1.
- [ ] Custom cursor still forbidden; cursor matrix uses system cursors only.
- [ ] Micro-interaction inventory is closed (M1–M16); no extras.

## Motion and hover

- [ ] Times 80/150/200/400; CommandMenu is the only scale.
- [ ] Image hover: grayscale + border, **no scale**.
- [ ] `(hover: none)`: featured and portrait in color.
- [ ] Reveals: not Hero, not Footer, not case study; max stagger 4; in-view on load does not fade from 0.
- [ ] Page changes instant; hash smooth only without reduced motion.

## States

- [ ] Loading: no home splash; image plate reserved; contact button rules; optional case skeleton without shimmer.
- [ ] Empty: Work cannot ship empty; Activity error/zero specified; command no-results; no cute empties.

## Type and space

- [ ] Balance/pretty rules, tabular nums, kicker CSS uppercase, case study h1 size, measure verified.
- [ ] Spacing pass: nav/h1 alignment, 96px rails, contact baseline, safe-area, `100dvh`, no off-grid pixels.

## QA and launch

- [ ] Visual, a11y, performance, SEO, browser, and responsive checklists are specific enough to execute.
- [ ] Final design review includes the 5-second test.
- [ ] Launch steps 1–20 are ordered; LinkedIn/GitHub updated after production.
- [ ] Post-launch list does not sneak v2 into v1.
- [ ] Version 2 ideas are captured and banned items restated.

## Process

- [ ] This document contains no React, Tailwind class strings, or CSS files.
- [ ] All six phase documents together are sufficient for another AI or engineer to build, polish, and ship without inventing product decisions.

---

**End of Phase 6.**

This completes the six-document blueprint:

1. `docs/01-Design-System.md` — visual language  
2. `docs/02-UX-Architecture.md` — experience and IA  
3. `docs/03-Page-Blueprint.md` — written wireframes  
4. `docs/04-Component-System.md` — component contracts  
5. `docs/05-Implementation-Guide.md` — engineering handbook  
6. `docs/06-Polish-and-Finishing.md` — polish, QA, launch, v2  

Approve this document to freeze the specification. After approval, implementation follows Phase 5’s build order, then this polish order, then the launch checklist — still without inventing a seventh product direction.
