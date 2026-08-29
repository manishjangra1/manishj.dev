# 03 — Page Blueprint

**Phase:** 3 of 6  
**Document type:** High-fidelity written wireframes  
**Status:** Approved  
**Depends on:** `01-Design-System.md` (approved), `02-UX-Architecture.md` (approved)  
**Downstream documents must conform to:** This file in full. `04-Component-System.md` extracts components from these compositions. `05-Implementation-Guide.md` implements these geometries. `06-Polish-and-Finishing.md` refines motion and QA against these layouts. No later phase may add a section, change section order, introduce a card grid of projects, or alter container widths without a documented amendment here.

This is a **visual blueprint in prose**. It is not code. It contains no React, no Tailwind class strings, and no CSS files. Every measurement uses Phase 1 tokens. Every section exists because Phase 2 put it there.

**Canonical names (Phase 2):** Work, Experience, Capabilities, Activity, About, Contact. Parentheticals in headings map the original brief (Projects, Tech Stack, GitHub) so nothing is lost.

**Pages in this document:**

1. Global chrome (skip link, nav, command menu, mobile overlay)
2. Home `/` — eight sections in order
3. Case study `/work/[slug]`
4. System surfaces (404 only; résumé is a file)

---

# How to read these wireframes

## Breakpoints (from Phase 1)

| Name | Range | Columns in play |
|---|---|---|
| Mobile | ≤767px | 1 column. Gutters `gutter.mobile` (20px) |
| Tablet | 768–1023px | 1 column for most; Contact and About may split at 768 if specified. Gutters `gutter.tablet` (32px) |
| Desktop | 1024–1439px | Splits allowed. Gutters `gutter.desktop` (48px) |
| Wide | ≥1440px | Same as desktop. Content stops at `container.max` (1440). Outer margin grows |

When a section says “Desktop,” it means ≥1024 unless Wide is called out separately (hero type size only).

## Width system (locked)

Three wells, always centered, never full-bleed as an app shell. Outer page background is `color.bg` edge to edge.

| Well | Token | Used for |
|---|---|---|
| Wide | `container.wide` 1280px | Nav inner, Hero, featured Work media, Activity graph |
| Page | `container.page` 1120px | Section title blocks for lists, Work rows, Experience rows, Capabilities, Contact split, Footer inner |
| Prose | `container.prose` 720px | About body copy, case study reading column |

**Alignment contract:** Nav inner and Hero share `container.wide`, so the name mark in the nav sits on the **same left edge** as the hero `h1`. List sections use `container.page`, which is **80px inset per side** from the wide well (1280 − 1120 = 160). That inset is the editorial step-in from “identity/media” to “inventory.” Do not mix: never put Experience rows on `container.wide`; never put the featured 16:9 plate on `container.page`.

On viewports narrower than a well, the well becomes `100%` minus gutters.

## Shared section padding

| | Padding-top | Padding-bottom |
|---|---|---|
| Hero | 160px desktop (`space.40`), 128px tablet (`space.32`), 96px mobile (nav 56 + air) | 128 / 96 / 64 |
| All other Home sections | 96 / 80 / 64 (`space.24` / `space.20` / `space.16`) | same |
| Footer | 64 / 48 / 48 | 64 / 48 / 48 |

Each section except Footer and Hero begins with the **title block** specified in Phase 1:

1. Kicker (`type.kicker`, mono, uppercase, `color.text.muted`)
2. 12px gap
3. Title (`type.h2`, `color.text`) — this is the `h2` and the `aria-labelledby` target
4. 16px gap if a supporting sentence exists
5. Supporting sentence (`type.body`, `color.text.secondary`, max 40em)
6. Then **48px desktop / 32px mobile** before the section’s content

`scroll-margin-top` on every section = nav height + 16px.

## ASCII legend

```
│  │    edge of the active container
[  ]    interactive control
████    media / plate
····    whitespace (intentional)
────    hairline (color.border)
```

Heights in the diagrams are approximate; the numbered specs under each diagram win.

---

# Page rhythm

The homepage is a **magazine with one story**, not a dashboard of equal modules. Rhythm is created by alternating **air** (hero, about, contact) with **density** (work rows, experience rows) and one **media event** (featured plate) plus one **data event** (contribution graph). Those two events must not sit next to each other. Phase 2 already separates them with Experience and Capabilities.

## Density map (Home, top → bottom)

| Section | Density | Optical mass | Why |
|---|---|---|---|
| Nav | Low | Thin bar | Chrome |
| Hero | Very low | Large type, lots of paper | First impression is space |
| Work (featured) | Medium-high | One 16:9 plate | The only picture on the first long scroll |
| Work (rows) | Medium | Hairline list | Scan |
| Experience | Medium | Hairline list, same as work rows | Scan; matching rhythm = same family of proof |
| Capabilities | Low | Short text groups | A breath after two lists |
| Activity | Medium | Graph plate | Second and last media event |
| About | Low | Prose ± portrait | Human; reading speed |
| Contact | Medium | Form is a tool, not a poster | Conversion |
| Footer | Low | Small type, hairline above | Exit |

**Rule:** Two dense lists may follow each other (Work rows → Experience) because they share structure. Two plates may not. Capabilities exists partly as a **palette cleanser** between Experience and Activity.

## Vertical cadence

Think in **viewport chapters**, not in equal 96px sandwiches:

1. **Chapter A — Identity.** Hero fills the first viewport (min-height 100vh). Work must not peek more than a kicker’s worth at the bottom of a 900px-tall laptop window. If the hero is too short, the featured image steals the 5-second window.
2. **Chapter B — Proof.** Featured + rows. This chapter may span 1.5–2.5 viewports. That is correct.
3. **Chapter C — Trust.** Experience + Capabilities. Shorter. Recruiter-skimmable in one viewport on desktop if there are ≤4 roles.
4. **Chapter D — Corroboration.** Activity. Graph is wide but **not tall**: cap the graph row height (see Activity). Do not give it a hero’s air.
5. **Chapter E — Person.** About. Reading pace. Prose column.
6. **Chapter F — Ask.** Contact + Footer. Contact should fit in one desktop viewport with the footer just below, so the form does not feel like a basement.

## Scroll pacing

- Native scroll, no snap, no hijack (Phase 1 / 2).
- The visitor should be able to **stop anywhere and still see one idea** (Phase 1 principle 2). Test: pause at 0%, 25%, 50%, 75%, 100% of the page. Each pause has a single primary object.
- Do not insert extra spacer sections or “between” bands. The section padding *is* the rest.
- Hairlines inside lists create a faster beat (row, row, row). Do not add hairlines between sections — section padding is enough. A section-top hairline is forbidden except Footer.

## Visual balance

- **Left-weighted type.** Headlines, kickers, and lists flush left in their well. Do not center the hero. Centered heroes are templates.
- **Right-weighted chrome.** Nav links live on the right (Phase 2). That counterweights the left-heavy page.
- **One axis of pictures.** All media left edges on `container.wide`. Lists left edges on `container.page`. The 80px step-in is the only “indent” in the product.
- **No equal-column bento.** About’s portrait is the only time a square sits beside prose. Contact’s split is form | details, both text. Never a 2×2 card grid.
- **Optical center of the hero** is the `h1`, not the midpoint of the viewport. The block sits in the upper third after nav clearance.

## Section transitions

Transitions are **spatial, not theatrical**.

- Between sections: paper continues. No color band change, no diagonal, no wave, no overlapping overlap.
- Scroll-reveal (Phase 1): section title block and first content group may fade/rise 8px, 400ms, once, when 20% visible. Hero excluded. Stagger max 4 children (e.g. first 4 work rows; remaining rows static).
- Featured image does not parallax.
- The sticky nav hairline appearing at 8px scroll is the only chrome transition at the top of the journey.
- Route transition to `/work/[slug]`: crossfade 200–500ms (`motion.page` max), no shared-element morph of the featured image into the case study hero. Reduced motion: instant.

## Global background

- `color.bg` for the entire public site.
- No alternating section backgrounds. No `color.surface` full-width bands. Surface is for the graph plate interior and code wells only.
- Selection, scrollbar, and focus as Phase 1.

---

# Global chrome

Present on Home and on case study pages unless noted.

## Skip link

- First focusable node in the document.
- Off-screen until focused; then top-left inside the gutter, `z.skip`, Primary-button contrast or a white plate + border — must meet focus contrast. Label: `Skip to content`. Target: `#main`.

## Navbar

**Purpose:** Persistent wayfinding. Not a brand billboard.

**Width:** Viewport full for the bar background. Inner cluster: `container.wide`.

**Height:** 64px desktop/tablet, 56px mobile. Constant. Not compressed on scroll.

**Grid:** One row, two clusters. Left: name mark. Right: links + utilities. Vertical align center. No center cluster.

**Alignment:** Name mark’s text left-edge = hero `h1` left-edge.

**Spacing:** Inner horizontal = the well’s gutter. Gap between nav links: 24px. Gap in utility cluster: 8px. Gap between last link and first utility: 32px.

**Components:** Name mark (link), Nav links ×4, Command trigger (desktop), Theme icon button, Menu icon button (mobile), optional `⌘K` glyph.

**Visual hierarchy:** Name (`color.text`, 14/500) > current link (`color.text`) > idle links (`color.text.secondary`) > utilities (muted).

**Content placement (desktop):**

```
[ container.wide, 64px tall ]
Manish                          Work    Experience    About    Contact    [⌘K]  [theme]
```

**Interaction:** As Phase 2. Sticky. Hairline after 8px. Real anchors. `replaceState` hashes. Scroll spy only for the four links.

**Scroll behavior:** Bar does not move independently of stickiness. No hide-on-scroll.

**Responsive:**

| | Desktop ≥1024 | Tablet 768–1023 | Mobile ≤767 |
|---|---|---|---|
| Links | Visible | Visible if they fit; else same as mobile | Hidden in overlay |
| ⌘K | Visible | Drop first if overflow | Hidden (key still works) |
| Theme | Visible | Visible | Visible in bar if space; else inside overlay |
| Menu | Hidden | Shown only if links collapsed | Shown |

**Mobile overlay (when open):** Full viewport, `color.bg`, `z.modal`. Padding 32px. Links stacked, `type.h3`, 24px between. Then a hairline, then Résumé, Email, GitHub as `type.body` text links. Close is the menu button transforming to Close (same 40×40). No animation theater; opacity 200ms.

## Command menu

Not a page section. Overlay `z.modal` + `color.overlay` backdrop.

- Width: 560px max, 100% − 40px on mobile.
- Top: ~20% from viewport top, not vertically centered (Linear pattern — it is a tool, not a modal essay).
- Radius `radius.lg`, shadow `shadow.lg`, border `color.border`.
- Input on top, result rows below. Behavior Phase 2 / component Phase 4.

## Main landmark

`main#main` wraps all Home sections including Hero, excluding the site `header` and `footer`. Case study: same.

---

# Home `/`

DOM order = visual order = section order below.

---

# Hero

**id:** (top; no hash required; `#` scrolls here)  
**Landmark:** First child of `main`. Contains the only `h1` on the page.

## Purpose

Deliver Phase 2’s four thoughts in five seconds: taste, name, full-stack products, obvious next action. One idea: **identity**.

## Width

`container.wide`. Text column is left-aligned and **does not stretch**. Lede max 22em. Name may wrap; it may use the full wide well.

## Height

`min-height: 100vh`. Content is **not** vertically centered in the 100vh. After padding-top, the kicker starts. On a 900px-tall desktop window: nav 64 + padding-top 160 + kicker ~14 + gap 8 + display line ~68 + gap 24 + lede ~60 + gap 32 + actions 48 ≈ **content block ~250px** sitting in the upper half, then a large field of paper before Work. That empty field is the luxury. Do not fill it with a scroll chevron, a portrait, or a graph.

If viewport is shorter than ~700px (landscape phones): reduce padding-top to 96px and do **not** force 100vh (min-height auto / fit-content) so Work is reachable without a tiny cramped hero. This is the only hero height exception.

## Grid

One column. Actions in a horizontal cluster (desktop/tablet) that wraps on mobile.

## Alignment

All text left. Actions left. No centered block, no split with an image on the right.

## Spacing (desktop)

- Padding-top: 160px  
- Kicker → name: 8px (`space.2`) — tighter than the standard title block because the name *is* the title, not an `h2` section  
- Name → lede: 24px  
- Lede → actions: 32px  
- Gap between primary and secondary: 16px  
- Tertiary résumé link: 16px further, or on the same row if it fits without wrapping the primary  
- Padding-bottom: 128px  

Tablet: padding 128 / 96. Name `type.display.md` (48).  
Mobile: padding 96 / 64. Name `type.display.sm` (40). Actions stack: primary full-width of the text column only if the column is already narrow; **do not** stretch the primary to 100vw. Keep it intrinsic width, stacked above the text links, 12px gaps.

## Components

Kicker, `h1`, lede paragraph, Primary button `size.lg` (`Get in touch`), Text link (`See selected work`), Text link (`Download résumé`).

## Visual hierarchy

1. Name (`type.display.xl` ≥1440 / `lg` desktop / `md` tablet / `sm` mobile, weight 500, tracking as Phase 1, `color.text`)
2. Lede (`type.body.lg` on desktop, `type.body` on mobile, `color.text.secondary`)
3. Primary button
4. Kicker (read first by scanners who look top-left, but optically quiet)
5. Secondary / tertiary links

## Content placement

```
DESKTOP (container.wide, min 100vh)
················································
SOFTWARE ENGINEER                    ← kicker
Manish Jangra                        ← h1 (one or two lines)
I build full-stack products —        ← lede, 22em
mobile clients, APIs, and the
admin systems that run them.
[ Get in touch ]  See selected work  Download résumé
················································
          (remaining paper to 100vh)
```

Optional muted caption under actions (Phase 2 availability line): 16px below actions, `type.caption`, `color.text.muted`. If unused, omit — do not leave an empty slot.

## Interaction

- `Get in touch` → `#contact` (smooth unless reduced motion)
- `See selected work` → `#work`
- `Download résumé` → `/resume` (file)
- No hover motion on the name. No magnetic button. Primary hover as Phase 1.

## Scroll behavior

Paints in the first frame. No reveal. Hash `#` or none = this block. Skip link lands at `#main`, which is this section.

## Responsive changes

| | Wide ≥1440 | Desktop | Tablet | Mobile |
|---|---|---|---|---|
| Name | 80px | 64px | 48px | 40px |
| Lede | 18px | 18px | 16px | 16px |
| Actions | One row | One row | One row or wrap | Stack, left aligned |
| Photo | Never | Never | Never | Never |
| min-height 100vh | Yes | Yes | Yes | Yes, except short landscape exception |

---

# Work (Projects)

**id:** `work`  
**h2:** Direction `Selected work` (the kicker is also `Selected work` **or** the kicker is `Selected work` and the `h2` is a thesis sentence). **Lock:** Kicker = `Selected work`. H2 = a short thesis, e.g. `Products I have designed and shipped end to end.` If the thesis is not ready, H2 may repeat `Selected work` — never `My Projects`.

## Purpose

Proof. Featured product as the page’s first picture; remaining work as a scannable list (Phase 1 rows, Phase 2 inventory 3–5).

## Width

- Title block: `container.page`
- Featured: text on `container.page`; media plate on `container.wide`
- Rows: `container.page`

## Height

Hug content. Featured media is **16:9** of `container.wide` (1280 × 720 at full well; scales down). Do not use 4:5 or square. Do not crop to a cinematic 21:9 (hides UI).

## Grid

**Desktop featured:** two rows, not two columns. Stack:

1. Text (kicker of the product, title, lede, meta)
2. 24px gap
3. 16:9 plate full wide well

Do **not** put text left and image right. A side-by-side featured block becomes a dashboard card and fights the editorial full-bleed picture.

**Rows:** one 12-ish conceptual row with three zones (see below).

## Alignment

Left. Index/year column is a **fixed 72px** left rail inside `container.page` so titles align across rows. On mobile the rail stacks on top.

## Spacing

- Section padding: standard  
- Title block → featured text: 48px / 32px  
- Featured text internal: product kicker → title 12px; title → lede 16px; lede → meta 16px  
- Featured text → plate: 24px  
- Plate → first list hairline: 64px desktop / 40px mobile (a beat of air so the list is a new thought)  
- Row padding-y: 32px desktop / 24px mobile  
- List has a hairline **above the first row and below the last row**, and between rows (Phase 1)

## Components

Section title block, Featured project (composition), Project row × N, optional “In progress” meta text.

## Visual hierarchy

1. Featured title (`type.h2` or `type.h3` — lock **`type.h2`** so it equals section titles in rank; the product is the point)
2. Featured plate
3. Featured lede
4. Row titles (`type.h4`)
5. Meta, years, stack (mono, muted)

## Content placement — desktop

```
[ container.page ]
SELECTED WORK
Products I have designed and shipped end to end.
(optional supporting sentence, 40em)

Product category kicker          ← e.g. ON-DEMAND SERVICES
Servyq                           ← h2 of this block is the product name;
                                   page h2 remains the section title;
                                   product name is h3 in DOM to preserve
                                   heading order (section h2 → product h3)
Two-sentence problem → outcome.
Full-stack · 2025 · React Native  NestJS  PostgreSQL
[ Live ]  [ Repository ]         ← text links, only if real URLs

[ container.wide ]
████████████████████████████████  16:9 plate, radius.lg, 1px border
████████████ screenshot ████████
████████████████████████████████

[ container.page ]
────────────────────────────────
2024    Dayzo                    Habit platform · Full-stack
        One-sentence outcome.    React Native · NestJS
────────────────────────────────
2024    Another project          …
        One-sentence outcome.
────────────────────────────────
```

**Row columns (desktop ≥1024):**

| Zone | Width | Content |
|---|---|---|
| Left | 72px | Year, `type.mono.sm`, muted, tabular |
| Middle | fluid | Title (`type.h4`, `color.text`) + 8px + one sentence (`type.body.sm`, secondary) |
| Right | min 160px, max 280px, hide if squeezed | Role or 2–3 tech names, `type.mono.sm`, muted, right-aligned |

Tablet: drop the right zone; append tech as a third line in middle.  
Mobile: year above title, then sentence. No right zone. Full-width row still one hit target.

## Interaction

- Featured: primary hit is the title + plate (one accessible name). Live / Repo are extra text links, visually `type.label`, not buttons.
- Plate hover: grayscale 100% → 0%, 400ms, no lift (Phase 1).
- Row hover: title underline, no fill.
- Entire row cursor pointer; one tab stop for the case-study link.

## Scroll behavior

Featured plate may reveal (opacity + 8px) once. Rows: first 4 stagger 60ms; rest static. Native scroll.

## Responsive changes

| | Desktop | Tablet | Mobile |
|---|---|---|---|
| Featured stack | Text then 16:9 | Same | Same |
| Plate radius | `radius.lg` (12) | 12 | 12; avoid `radius.xl` |
| Rows | 3 zones | 2 zones | Stacked |
| Featured h3 size | 32 | 28 | 24 |

Heading-level note (binding): **Section `h2` = “Selected work” or thesis. Product names = `h3`. Row titles = `h3` as well** (they are the same rank of item). Featured product name and row titles are all `h3`. The featured name is just larger via a class-equivalent of `type.h2` size on an `h3` — **do not skip to make the featured an `h2`**. If that size-on-h3 is too clever, keep featured name at `type.h3` size (24) and let the **plate** provide mass. **Lock: featured product name is `h3` at `type.h3` size (24 desktop). Mass comes from the plate.** Section thesis remains the only `h2` in Work.

---

# Experience

**id:** `experience`

## Purpose

Compressed trajectory. Same family as Work rows so the page does not change dialect.

## Width

Title block + list: `container.page`.

## Height

Hug content. No min-height. A 3-role list plus title should fit in one desktop viewport with padding.

## Grid

Identical row geometry to Work rows: 72px year rail | middle | optional right (location).

## Alignment

Left. Year rail aligns with Work’s year rail (same well, same 72px). **This alignment is mandatory.** It is the quiet proof that Work and Experience are one system.

## Spacing

Standard section padding. Title block → list 48/32. Row padding-y 32/24. Hairlines as Work list.

## Components

Section title block, Experience row × N.

## Visual hierarchy

1. Role title (`type.h4`)
2. Company (same line as role, or immediately under: **lock `Role · Company` on one line**, `type.h4` for the whole line, company not bolded separately — use `Role` in `color.text` and `Company` in `color.text.secondary` on the same line, middot between)
3. Scope sentences (`type.body.sm`, secondary)
4. Years (rail)
5. Location (right zone, muted mono)

## Content placement — desktop

```
[ container.page ]
EXPERIENCE
Where the work happened.          ← optional supporting; omit if weak

────────────────────────────────
2023    Full-stack engineer · Acme     Chandigarh
–Now    One or two outcome sentences.
────────────────────────────────
2021    …                              …
–2023
────────────────────────────────
```

Current role: rail shows `2023` on the first line and `Present` on the second, both tabular, or a single `2023 – Present` in the rail (rail may grow to **96px** if needed for `YYYY – Present`; if so, **Work’s year rail must also become 96px**. **Lock: both rails 96px** to fit `2023–Now` without wrapping. Work years stay right-aligned within the rail.

## Interaction

Rows are **not** links by default (Phase 2: no accordion, no company logos). Cursor default. If a role has a dedicated case study, a text link `Related work` may sit under the sentences — optional, not v1 required.

## Scroll behavior

Standard reveal on the title block; rows 1–4 stagger.

## Responsive changes

Same stacking as Work rows. Location moves under company on mobile. Dates above role.

---

# Capabilities (Tech Stack)

**id:** `capabilities`

## Purpose

Palette cleanser and G4: tools used in production, as typography. Not a skill bar, not a logo marquee, not a bento of icons (Phase 1 non-goals, Phase 2 strategy).

## Width

Title block + groups: `container.page`.

## Height

Hug. Should read as **shorter than Experience**. If it looks as tall as Work, there is too much copy.

## Grid

**Desktop ≥1024:** 3 columns inside `container.page`, column gap 48px, one row of groups (or two rows if a fourth group exists). Equal columns. No cards, no borders around groups. Separation is typography and space only.

**Tablet:** 2 columns, gap 32px.

**Mobile:** 1 column, group gap 32px.

## Alignment

Left within each column. Group titles align across columns (top).

## Spacing

Standard section padding. Title block → groups 48/32. Inside a group: kicker-style group label → 12px → list. Between list items: 8px.

## Components

Section title block, Capability group × 3 (or 4). Each group = label + list of names.

## Visual hierarchy

1. Section h2
2. Group labels (`type.kicker` or `type.label`, muted)
3. Names (`type.body`, `color.text`) — not mono, not chips. Mono is for meta; these are words.

## Content placement — desktop

```
[ container.page ]
CAPABILITIES
The tools I actually ship with.

Clients                 Servers                 Platform
React Native            NestJS                  PostgreSQL
Expo                    Node.js                 Prisma
Next.js                 TypeScript              Redis
React                                           Docker
                                                Socket.io
```

**Lock groups (names may be edited in CMS, structure may not):**

1. **Clients** — interfaces people touch  
2. **Servers** — APIs and application backends  
3. **Platform** — data, realtime, infra  

A fourth group is allowed only if it stays on a second row, not a squeezed 4-across. Prefer 3.

## Interaction

None. Names are not links (a logo grid of links is a template). Cursor default. No hover highlight per word.

## Scroll behavior

Title block reveal. Groups may stagger (max 3).

## Responsive changes

As grid above. Do not introduce icons when space is tight.

---

# Activity (GitHub)

**id:** `activity`

## Purpose

Corroboration. Second media event. Must stay **optically smaller than the featured Work plate**.

## Width

Title block: `container.page`.  
Graph plate: `container.wide`.  
Repo rows (optional, max 3): `container.page`.  
Profile link sits in the title block’s supporting area or directly under the graph, left-aligned in `container.page`.

## Height

Graph: **not 16:9**. A contribution graph is a short wide strip. **Lock height: 160px desktop, 128px tablet, 112px mobile** for the cell grid plus month labels. The plate padding: 24px. Total plate ≈ 160 + 48 = **208px** desktop — less than one-third of the 720px featured image. This cap is binding.

## Grid

One column. Graph is a 53×7-ish week grid optically; implementation may wrap weeks on mobile to **a 26-week (6-month) graph** rather than shrinking cells below 8px. **Lock: on mobile, show 26 weeks (half year) with a caption `Last 26 weeks` if space requires; desktop 52–53 weeks `Last year`.** Cells: square, 3px gap, radius `radius.sm` (4) or 2px — **lock 2px radius** so it reads as a graph, not a sticker sheet. Five fill steps from `color.surface` to `color.text`.

## Alignment

Graph left-aligned in the wide well (same left edge as featured image). Caption and number left-aligned to `container.page` so they line up with list titles.

## Spacing

Standard section padding. Title block → number+caption 24px. Number → plate 16px. Plate → profile link 24px. Plate → optional repo rows 48px.

## Components

Section title block, Stat (number + caption), Graph plate, Text link `View GitHub profile`, optional Repo row × ≤3.

## Visual hierarchy

1. Section h2  
2. Number (`type.h3` or `type.h2` size, tabular, `color.text`) — **lock `type.h3`** so it does not rival Work  
3. Graph  
4. Profile link  
5. Optional repo names  

## Content placement — desktop

```
[ container.page ]
ACTIVITY
Recent work on GitHub.

1,234
contributions in the last year

[ container.wide ]
┌──────────────────────────────────────────────┐  plate, radius.lg, border
│  [monochrome week cells                    ] │  height 160
└──────────────────────────────────────────────┘

[ container.page ]
View GitHub profile →

────────────────────────────────                 optional
repo-name     One-line description     TypeScript
────────────────────────────────
```

## Interaction

- Profile link: text link, external, `rel="me"`.
- Graph: not clickable cell-by-cell (that is GitHub’s product). The plate may be wrapped in the same profile link **or** left inert. **Lock: graph is inert (`aria-hidden`), number + text link provide the accessible story.**
- Repo rows: entire row links out to GitHub. External icon 14px, `aria-hidden`.
- Hover on repo rows: same as Work rows (title underline).
- API failure: hide graph and number; show title block + `Activity lives on GitHub` + profile link. Do not show an empty grid.

## Scroll behavior

Standard reveal. Do not animate cells filling in. The graph is complete on first paint of the section (or a static fallback).

## Responsive changes

| | Desktop | Tablet | Mobile |
|---|---|---|---|
| Weeks | ~53 | ~53 if cells ≥8px else 39 | 26 |
| Cell min | 10px | 8px | 8px |
| Repo right meta | visible | hide | hide |

---

# About

**id:** `about`

## Purpose

Human remainder. Reading, not scanning. G6.

## Width

Title block: `container.page`.  
Body: **desktop split** if a portrait exists; **prose well** if not.

## Height

Hug. Portrait plate is **square**, not 16:9, so it cannot compete with Work’s featured image.

## Grid

**Desktop with portrait:** two columns inside `container.page`.

- Left: portrait plate **320×320** (fixed), `radius.lg`, border, grayscale rest.
- Gap: 64px.
- Right: prose, remaining width (~1120 − 320 − 64 = 736, near `container.prose` — good).

**Desktop without portrait:** single `container.prose` left-aligned **inside** `container.page` (left edges match lists, right extra paper). Do not center the prose column.

**Tablet:** if 768–1023, stack: portrait 280×280 above prose, left-aligned. Or hide portrait if it crowds — **lock: keep portrait, stack, 280px**.

**Mobile:** portrait 100% of well, aspect 1:1, then prose. Max portrait width = well width.

## Alignment

Top of portrait aligns with first paragraph, not with the kicker. Title block is full `container.page` above the split.

## Spacing

Standard section padding. Title block → split 48/32. Paragraphs: 16px between. Max 3 paragraphs (Phase 2). No tech-stack repeat (that is Capabilities). No icon row of “principles.” If principles appear, they are **sentences inside the paragraphs**, not a 2×2 icon grid (previous site).

## Components

Section title block, optional Portrait plate, Body copy. No social row here (Contact + Footer own that).

## Visual hierarchy

1. h2  
2. First paragraph (`type.body.lg` desktop, `type.body` mobile)  
3. Remaining paragraphs (`type.body`)  
4. Portrait (supporting)

## Content placement — desktop with photo

```
[ container.page ]
ABOUT
A short thesis, not “Hi I’m.”

████  320        Paragraph 1 (lg)
████  square     Paragraph 2
████             Paragraph 3
```

## Interaction

Portrait hover: grayscale to color, 400ms, same as Work plate. Portrait is **not** a link unless it opens a larger view — **lock: not a link, not a lightbox** (lightbox is extra product).

## Scroll behavior

Standard reveal. Portrait included in the once-reveal with the first paragraph (one unit, no stagger between photo and text).

## Responsive changes

Stack as specified. `type.body.lg` → `type.body` below 1024.

---

# Contact

**id:** `contact`

## Purpose

Conversion. One recommended path (email + form), then alternatives (Phase 2 hierarchy).

## Width

Title block: `container.page`.  
Content: `container.page`, two columns on desktop.

## Height

Hug. Target: title + split fits in one 900px desktop viewport including padding so the form is not below the fold of this chapter. Form textarea min-height 144px (Phase 1).

## Grid

**Desktop ≥1024:** 2 columns, gap 80px.

- Left (~55%): form  
- Right (~45%): address, location, secondary links, résumé  

**Tablet 768–1023:** 2 columns, gap 40px, if the form would crush below 280px then stack (stack if column < 300px). **Lock: stack below 1024** to keep the form comfortable. Tablet = same as mobile: form first, details below.

**Mobile:** stack, form first (conversion), details below with a hairline and 32px gap.

## Alignment

Left. Labels above fields (Phase 1). Right column top aligns with the first field, not the section kicker — **on desktop, the right column’s first line aligns with the Name label**.

## Spacing

Standard section padding. Title block → split 48/32. Form fields: 16px between field groups. 24px before submit. Right column groups: 24px between (email block, location, links).

## Components

Section title block, Input ×2, Textarea, Primary button `Send`, Email display + copy icon button, Location line, Text links (LinkedIn, Résumé, GitHub, optional WhatsApp).

## Visual hierarchy

1. h2 (`Get in touch` / `Email me`)  
2. Form  
3. Email address (`type.h4` or `type.body.lg`, `color.text`)  
4. Secondary links (`type.body`, text)  
5. Location (`type.caption`, muted)

## Content placement — desktop

```
[ container.page ]
CONTACT
Full-time product engineering roles and a small
number of build engagements. The best first step
is email.

Name                    Email
[                  ]    dev.jangramanish@gmail.com  [copy]
                        Chandigarh, India
Email
[                  ]
                        LinkedIn
Message                 Résumé
[                      GitHub
 [ 144px min           WhatsApp     ← quieter, caption size
 [
[ Send ]
```

Submit is intrinsic width, not 100% of the left column on desktop. On mobile, submit may be 100% of the form column (Phase 1).

## Interaction

- Fields and states: Phase 1.  
- Copy: writes clipboard, live region `Copied`.  
- Email address is also a `mailto:` link.  
- Submit: loading width-stable, success `Sent` + helper `Message sent. I will reply by email.` Stay on page.  
- WhatsApp: text link only, no FAB.  
- No map.

## Scroll behavior

Hash `#contact` offsets for nav. **No autofocus** (Phase 2). Title block may reveal; do not stagger fields (a staggering form feels broken).

## Responsive changes

Stack <1024. Copy button remains 40×40 next to the address. Address may wrap.

---

# Footer

**id:** none (not a jump target)

## Purpose

Utility exit. Repeat primary links and legal quiet. No new pitch, no newsletter, no large name.

## Width

Inner: `container.page`. Full-bleed top hairline `color.border`.

## Height

Hug. Desktop ~88–120px content + padding 64. Not a mega-footer.

## Grid

**Desktop:** one row, three clusters: left identity, center or mid primary links, right secondary channels. **Lock two clusters** to avoid a busy three-bar:

- Left: `© {year} Manish Jangra`  
- Right: Work · Experience · About · Contact · Résumé · GitHub · LinkedIn · Email  

Links in a wrapping inline list, 16px gap, `type.caption` or `type.label`, `color.text.muted`, hover `color.text`.

**Mobile:** stack: copyright, then links wrapping, 16px gap, padding 48.

## Alignment

Left copyright, right links on desktop. Both left on mobile.

## Spacing

Padding 64 desktop / 48 tablet+mobile. Top hairline only. No extra section kicker.

## Components

Footer nav (`aria-label="Footer"`), text links, optional `type.micro` line `Built as a product, not a template` — **omit slogans**. **Lock: no tagline.** Year + name + links only.

## Visual hierarchy

Everything is muted. Footer must be the quietest block on the page.

## Content placement — desktop

```
───────────────────────────────────────────────
© 2026 Manish Jangra     Work  Experience  About  Contact  Résumé  GitHub  LinkedIn  Email
```

## Interaction

Same links as Phase 2. External: GitHub, LinkedIn. Email: `mailto:`.

## Scroll behavior

None. No back-to-top floating button (nav is sticky; name mark is back-to-top).

## Responsive changes

Stack. Links wrap. No columns of sitemap.

---

# Case study `/work/[slug]`

Required by Phase 2. Home’s featured plate and rows land here. This page is a **reading layout**, not a second homepage.

## Purpose

Hiring-manager depth. Standalone from a deep link: identity chrome (nav) + project recap + prose + way back + contact.

## Global chrome

Same nav. Work = `aria-current="page"`. Name mark → `/`. No featured graph, no extra sections from Home.

## Width

- Recap band: `container.page` for text; optional hero media `container.wide` 16:9  
- Body: `container.prose`  
- Next project band: `container.page`

## Height

Recap: hug. If media exists, 16:9 below recap text (same stack as Home featured — familiar). Body: hug. Do not force 100vh recap (that delays the problem statement).

## Grid

Single column reading. Meta in recap is a wrapping definition list (Role, Year, Stack, Links), not a sidebar, **except on desktop ≥1280** where a **right rail 200px** inside `container.page` may hold the meta while title+lede take the left. **Lock for v1: single column recap, meta as a row under the lede** (same as featured on Home). Consistency > cleverness. Wide screens still one column for the recap; the picture provides width.

## Alignment

Left. Prose column left-aligned to `container.prose` **centered** in the viewport (classic article). Recap text uses `container.page` left-aligned with Home lists so returning to `/#work` feels like the same grid. **Slight tension:** article centered, recap page-well. **Lock: recap and body both use `container.prose` for text**, media `container.wide`. Case studies are articles. Home is the magazine cover + index.

## Spacing

- Padding-top: 128px desktop (under nav), 96 tablet, 64 mobile  
- Recap: kicker 12px → `h1` (project name, `type.display.sm` or `type.h1`) → 16px lede (`type.body.lg`) → 16px meta → 24px media  
- Body sections: `h2` with 48px top / 16px bottom. Paragraphs 16px. Max one diagram plate per page, 16px caption  
- End band padding 96/64  

## Components

Kicker (`Case study` or product category), `h1`, lede, Meta list, optional Live/Repo text links, Media plate, Prose sections (Problem, Role, Approach, Highlights, Outcome), Next row (previous/next project), Text link `All work`, Text link `Get in touch`.

## Visual hierarchy

1. Project `h1`  
2. Media  
3. Body `h2`s  
4. Lede  
5. Meta  

## Content placement

```
NAV (Work current)

[ container.prose ]
ON-DEMAND SERVICES
Servyq
Two-sentence recap. Stands alone without Home.

Full-stack · 2025 · React Native  NestJS  PostgreSQL
Live  Repository     (omit if missing)

[ container.wide ]
████████ 16:9 product UI, same plate rules ████████

[ container.prose ]
Problem
…

Role and constraints
…

Approach
…  [optional one diagram plate, max width = prose]

Highlights
…  (numbered or short paragraphs, not icon grid)

Outcome
…

[ container.page ]
────────────────────────────────
← Dayzo                 All work                 Get in touch →
────────────────────────────────
```

Prev/next is a single hairline row. If no prev, leave the left empty; do not fake a loop unless there are ≥2 case studies.

## Interaction

Live/Repo external. Get in touch → `/#contact`. All work → `/#work`. Image grayscale hover optional; **lock: case study hero image is color at rest** (the reader is already committed; the grayscale signature is a Home index trick). Still `radius.lg` + border.

## Scroll behavior

No hero 100vh. Immediate reading. Scroll-reveal on body `h2`s optional; prefer **none** on long articles (reveal on every subhead is noisy). Reduced motion: none.

## Responsive changes

Type: `h1` at `type.display.sm` (40) mobile, `type.h1` (40) is the same — on desktop use `type.display.md` (48) for the project name, not 80 (that would parody the Home identity). **Lock: case study `h1` is `type.display.md` desktop, `type.display.sm` mobile.**

---

# 404

Minimal, same chrome.

- `container.prose`, padding-top 160px  
- `type.kicker` `404`  
- `h1` `This page does not exist.` (`type.h2` size — not display xl)  
- Text link `Go home` → `/`  
- No illustrations, no 3D, no jokes required. One dry sentence max.

---

# Shared interaction notes (all Home sections)

- Hover, focus, disabled: Phase 1.  
- Command menu available everywhere.  
- Theme toggle does not change layout, only tokens.  
- Sticky nav offset applies to all hash targets.  
- Do not add floating contact buttons, progress bars, or reading-time widgets on Home.

---

# Measurement summary (implementer cheat sheet)

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Nav inner well | wide 1280 | 100% − 32 | 100% − 20 |
| Nav height | 64 | 64 | 56 |
| Hero well | wide | 100% − 32 | 100% − 20 |
| Hero min-height | 100vh | 100vh | 100vh* |
| Hero padding-top | 160 | 128 | 96 |
| Section padding | 96 | 80 | 64 |
| Title → content | 48 | 48 | 32 |
| List well | page 1120 | 100% − 32 | 100% − 20 |
| Year rail | 96 | 96 | stacked |
| Featured / graph well | wide | 100% − 32 | 100% − 20 |
| Featured aspect | 16:9 | 16:9 | 16:9 |
| Graph inner height | 160 | 128 | 112 |
| About portrait | 320² | 280² | 1:1 of well |
| About / case prose | 720 | 100% − 32 | 100% − 20 |
| Contact split | 2 col @ ≥1024 | stacked | stacked |
| Footer padding | 64 | 48 | 48 |

\*except short landscape: hug content.

---

# Cross-references

| Blueprint choice | Source |
|---|---|
| Section order | Phase 2 IA |
| Nav items and Work-first | Phase 2 |
| Rows vs one featured plate | Phase 1 Cards + Phase 2 Work |
| No skill logos, no GitHub green, no FAB | Phase 1 + 2 |
| Type sizes, radius, motion distances | Phase 1 |
| Hero no photo, 5-second thoughts | Phase 2 Hero |
| Contact fields and no autofocus | Phase 1 Inputs + Phase 2 |
| Case study outline | Phase 2 |
| Capabilities as 3 text groups | Phase 2 G4 + Phase 1 non-goals |
| Graph visually smaller than featured | Phase 2 GitHub strategy |

---

# Checklist

Use this before approving Phase 3 and before starting `04-Component-System.md`.

## Global

- [ ] Width system is locked: wide 1280 (nav, hero, featured media, graph) / page 1120 (lists, contact, footer) / prose 720 (about body, case study text).
- [ ] Nav left edge aligns with hero `h1`. Lists step in 80px from that edge on desktop.
- [ ] No full-bleed app shell, no alternating section backgrounds, no between-section hairlines except footer.
- [ ] Page rhythm: identity (100vh) → proof → trust → corroboration (short graph) → person → ask.
- [ ] Two plates only on Home (featured 16:9, graph short strip). They are not adjacent.
- [ ] Scroll is native; transitions are paper-on-paper; route change is a crossfade, not a morph.
- [ ] Skip link, sticky nav, command menu, mobile overlay are specified.

## Hero

- [ ] min-height 100vh, content upper-third, left aligned, no photo, no chevron.
- [ ] Display type per breakpoint; lede ≤22em; one primary `Get in touch`; secondary work; tertiary résumé.
- [ ] Short landscape exception documented.
- [ ] First paint, no reveal.

## Work / Projects

- [ ] Featured is stacked text then 16:9, not a side-by-side card.
- [ ] Product names are `h3`; section thesis is `h2`; featured mass comes from the plate, not a second `h2`.
- [ ] Rows share a 96px year rail with Experience.
- [ ] 3 zones → 2 → stack across breakpoints.
- [ ] One tab stop per row; Live/Repo extra on featured only if URLs exist.

## Experience

- [ ] Same row language as Work; not links; no logos; no accordion.
- [ ] `YYYY – Present` fits the 96px rail.

## Capabilities / Tech stack

- [ ] 3 text columns, no icons, no bars, no links on names.
- [ ] Shorter than Experience; 3 groups: Clients, Servers, Platform.

## Activity / GitHub

- [ ] Graph height capped (160/128/112 inner).
- [ ] Monochrome 5-step cells; inert graph; number + profile link accessible.
- [ ] Mobile may show 26 weeks; API failure hides the grid.
- [ ] Optional ≤3 repo rows.

## About

- [ ] Portrait optional, square 320, left of prose on desktop; stacked below 1024.
- [ ] Without portrait, prose left-aligned in page well, not centered.
- [ ] ≤3 paragraphs; no principle icon grid.

## Contact

- [ ] Split only ≥1024; form left; details right aligned to first label.
- [ ] Fields: name, email, message; one primary `Send`.
- [ ] Email + copy; location line; WhatsApp text only; no map, no FAB, no autofocus.

## Footer / case study / 404

- [ ] Footer is one hairline + copyright + inline links; no slogan.
- [ ] Case study is an article: recap + 16:9 + prose; `h1` is 48/40 not 80; hero image in color; prev/next row; standalone with nav.
- [ ] 404 is typographic, two lines + home link.

## Process

- [ ] Every section documents purpose, width, height, grid, alignment, spacing, components, hierarchy, content, interaction, scroll, responsive.
- [ ] No React/Tailwind/CSS. Tokens only.
- [ ] Phase 4 may now name every component that appears in these wireframes (Navbar, Button, ProjectRow, FeaturedProject, ExperienceRow, CapabilityGroup, ContributionGraph, ContactForm, Footer, CaseStudyLayout, CommandMenu, etc.) without inventing new layout.

---

**End of Phase 3.**

Approve this document to proceed to **Phase 4: `04-Component-System.md`**. Geometry is now frozen: wells, the 100vh hero, stacked featured work, 96px year rail, 3-column capabilities, capped graph, stacked contact below 1024, and the case-study article. Changing those after Phase 4 breaks the component contracts.
