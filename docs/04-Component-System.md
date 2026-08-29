# 04 — Component System

**Phase:** 4 of 6  
**Document type:** Engineering blueprint (component contracts)  
**Status:** Approved  
**Depends on:** `01-Design-System.md` (approved), `02-UX-Architecture.md` (approved), `03-Page-Blueprint.md` (approved)  
**Downstream documents must conform to:** This file in full. `05-Implementation-Guide.md` maps these contracts onto App Router folders, data, and coding standards. `06-Polish-and-Finishing.md` may add micro-interaction detail but may not add components, props, or variants that are not listed here.

This document names **every public-site component**. It does not contain React, Tailwind, or CSS. Props are contracts: names, kinds, and rules. Visual values live in Phase 1. Geometry lives in Phase 3. If a prop would change a Phase 3 lock (wells, 16:9 featured, 96px rail, graph height), the prop is forbidden.

Admin / login / CMS screens are **out of this system**. They may reuse primitives (`Button`, `Field`) in Phase 5’s private app shell. They may not leak dashboard patterns onto the public site.

---

# Conventions

## Naming

| Thing | Rule | Examples |
|---|---|---|
| Component | PascalCase, noun | `ProjectRow`, `ContributionGraph` |
| File | Same as component, one component per file | `ProjectRow.tsx` (Phase 5) |
| Variant prop | `variant` or a specific noun, never `type` (reserved) | `Button` `variant`: `primary` \| `secondary` \| `ghost` \| `text` |
| Size prop | `size`: `sm` \| `md` \| `lg` as Phase 1 | |
| Boolean | `is` / `has` prefix | `isCurrent`, `hasPortrait` |
| Handlers | `on` prefix | `onSubmit`, `onCopy` |
| Slots / children | `children` only for true layout wrappers (`Container`, `SiteShell`). Content components take named props (`title`, `lede`), not soup of children |
| CSS hooks | Token names from Phase 1, never ad-hoc | |

**Forbidden names:** `Card`, `ProjectCard`, `Bento`, `Timeline`, `SkillBar`, `Dock`, `Glass*`, `Navbar` as `Header` (the landmark is `header`; the component is `Navbar`), `CommandPalette` (canonical: `CommandMenu`), `GithubGraph` (canonical: `ContributionGraph`).

## Folder location (public)

Phase 5 may add `app/` route files. Component files live here:

```
components/
  primitives/     tokens made tangible: Button, Field, Container, Kicker, Icon, Hairline, Spinner, SkipLink, TextLink, IconButton, LiveRegion
  chrome/         site-wide: Navbar, Footer, SiteShell, MobileMenu, CommandMenu, ThemeToggle, CommandTrigger, NameMark
  content/        domain blocks reused across pages: Plate, MetaLine, YearRail, Portrait, SectionHeader, FeaturedProject, ProjectRow, ExperienceRow, CapabilityGroup, ContributionGraph, RepoRow, ContactForm, ContactDetails, CaseStudyPager
  sections/       page assemblies: HeroSection, WorkSection, ExperienceSection, CapabilitiesSection, ActivitySection, AboutSection, ContactSection, CaseStudyLayout, NotFoundSection
```

**Rule:** `sections/` may import `content/` and `primitives/`. `content/` may import `primitives/` and `chrome` only for `TextLink` / `IconButton`. `primitives/` import nothing from `content/` or `sections/`. `chrome/` may import `primitives/` only.

## Component hierarchy (binding)

```
SiteShell
├── SkipLink
├── Navbar
│   ├── NameMark
│   ├── NavList (desktop)
│   ├── CommandTrigger
│   ├── ThemeToggle
│   └── MobileMenu
│       └── NavList (stacked)
├── CommandMenu
│   └── CommandMenuItem × N
├── main#main
│   ├── Home:
│   │   ├── HeroSection
│   │   ├── WorkSection
│   │   │   ├── SectionHeader
│   │   │   ├── FeaturedProject
│   │   │   │   ├── Kicker
│   │   │   │   ├── MetaLine
│   │   │   │   ├── TextLink (Live, Repo)
│   │   │   │   └── Plate
│   │   │   └── ProjectRow × N
│   │   ├── ExperienceSection
│   │   │   ├── SectionHeader
│   │   │   └── ExperienceRow × N
│   │   ├── CapabilitiesSection
│   │   │   ├── SectionHeader
│   │   │   └── CapabilityGroup × 3
│   │   ├── ActivitySection
│   │   │   ├── SectionHeader
│   │   │   ├── ActivityStat
│   │   │   ├── ContributionGraph
│   │   │   ├── TextLink (profile)
│   │   │   └── RepoRow × ≤3
│   │   ├── AboutSection
│   │   │   ├── SectionHeader
│   │   │   ├── Portrait?
│   │   │   └── body copy
│   │   └── ContactSection
│   │       ├── SectionHeader
│   │       ├── ContactForm
│   │       │   ├── Field × 2
│   │       │   ├── Field (textarea)
│   │       │   └── Button (primary)
│   │       └── ContactDetails
│   │           ├── CopyButton
│   │           └── TextLink × N
│   └── Case study:
│       └── CaseStudyLayout
│           ├── CaseStudyRecap
│           ├── Plate (color at rest)
│           ├── CaseStudyBody
│           └── CaseStudyPager
├── Footer
└── LiveRegion (global polite)
```

## Reusability ranks

| Rank | Meaning | Examples |
|---|---|---|
| P0 Primitive | Used in many places, no domain knowledge | `Button`, `Field`, `Container` |
| P1 Chrome | One instance per page, shared across routes | `Navbar`, `Footer`, `CommandMenu` |
| P2 Content | Domain, reused 2+ times or on two routes | `ProjectRow`, `Plate`, `SectionHeader` |
| P3 Section | One instance per Home (or one per case study) | `HeroSection`, `WorkSection` |

Do not “make it reusable” by adding variants that exist for a hypothetical third page. v1 has Home, case study, 404.

## Shared behavior every interactive component obeys

- Hit target ≥ 40px (Phase 1).
- `:focus-visible` 2px ring, 2px offset, `color.focus`.
- `prefers-reduced-motion`: durations → 0 for transforms; see Phase 1.
- No custom cursor.
- Color from tokens only.

## Data kinds used in props

Described in English, not a type language:

- **string**, **string?** (optional)
- **url** — string that is a URL
- **id** — slug or hash target (`work`, `dayzo`)
- **enum** — closed list
- **list of X**
- **boolean**
- **integer**
- **handler** — user action callback
- **node** — reserved for `children` on layout primitives only
- **contribution week** — list of 7 integers (counts per day)
- **rich text** — plain paragraphs for v1 About/case study; markdown allowed only inside `CaseStudyBody` as a string the page already resolved

---

# Rejected components (do not build)

| Tempting name | Why rejected | Use instead |
|---|---|---|
| `Card` | Phase 1: cards are rows or plates | `ProjectRow`, `Plate` |
| `ProjectCard` | Implies thumbnail grid | `FeaturedProject` + `ProjectRow` |
| `Timeline` | Vertical line + dots is dashboard | `ExperienceRow` |
| `Modal` generic | Only two overlays exist | `CommandMenu`, `MobileMenu` |
| `Tooltip` | No tooltip in Phase 3 | Visible text, `aria-label` on icon buttons |
| `Accordion` | Phase 2 forbids experience expand | Full text in the row |
| `Tabs` / `FilterChips` | No project filters | Command menu search |
| `Avatar` in nav | Phase 1 forbids | `NameMark` text |
| `Marquee` / `LogoCloud` | Phase 1 non-goal | `CapabilityGroup` |
| `CustomCursor` | Phase 1 ban | System cursor |
| `Toast` | Phase 1: prefer inline live region | `LiveRegion` + form helper |
| `WhatsAppFloat` | Phase 2 ban | `TextLink` in `ContactDetails` |
| `SkillBar` | Phase 2 | `CapabilityGroup` |
| `LanguagePie` | Phase 2 | Nothing; language is text on `RepoRow` |

---

# Primitives

## Container

**Purpose.** Enforce the three wells (wide / page / prose) and gutters. The only component allowed to set max-width.

**Folder.** `components/primitives/Container`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `well` | enum: `wide` \| `page` \| `prose` | yes | Maps to 1280 / 1120 / 720 |
| `children` | node | yes | |
| `as` | enum: `div` \| `section` \| `article` \| `nav` \| `header` \| `footer` | no | Default `div`. Landmark components should pass the right element rather than wrapping extra |

**States.** None.

**Variants.** The `well` enum is the variant.

**Responsive.** Below the well width, 100% minus gutter tokens (20 / 32 / 48). Centered. Horizontal padding is the gutter, not extra.

**Accessibility.** If `as` is a landmark, the parent must still supply labels (`Navbar` does, not `Container`).

**Animation.** None.

**Composition.** Wraps any section inner. Does not nest a `Container` inside a `Container` of the same well. Featured media: parent `Container well=wide`. Lists: `well=page`.

**Reusability.** P0. Every section uses it.

**Dependencies.** Design tokens only.

**Naming.** Not `MaxWidth`, not `Shell`.

---

## Kicker

**Purpose.** Section or product overline. Mono, uppercase, tracked, muted (Phase 1 `type.kicker`).

**Folder.** `components/primitives/Kicker`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `children` | string | yes | Already intended as display text. Component uppercases visually; **pass sentence or uppercase, do not double-manage in callers** — **lock: component applies uppercase + tracking**. Callers pass `Selected work` |
| `as` | enum: `p` \| `span` | no | Default `p`. Never `h*` |

**States.** None.

**Variants.** None.

**Responsive.** Same size at all breakpoints (11px).

**Accessibility.** Not a heading. Decorative hierarchy only.

**Animation.** None of its own.

**Composition.** First child of `SectionHeader` and `FeaturedProject` / `CaseStudyRecap`.

**Reusability.** P0.

**Dependencies.** None.

---

## Hairline

**Purpose.** 1px `color.border` rule. Lists and footer.

**Folder.** `components/primitives/Hairline`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `tone` | enum: `default` \| `subtle` | no | `default` = `color.border`, `subtle` = `color.border.subtle`. Footer and list rows use `default` |

**States.** None.

**Variants.** `tone`.

**Responsive.** Full width of parent.

**Accessibility.** `aria-hidden`. Meaning comes from list structure, not the line.

**Animation.** None.

**Composition.** Rendered by list parents (`WorkSection` draws a line above the first row and below the last, and rows do not each draw a double line). **Lock: the list parent owns hairlines**, not each row (avoids 2px joins).

**Reusability.** P0.

**Dependencies.** None.

---

## Button

**Purpose.** Primary actions. Phase 1 Buttons, in full.

**Folder.** `components/primitives/Button`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `variant` | enum: `primary` \| `secondary` \| `ghost` | yes | `text` is **not** this component — use `TextLink` |
| `size` | enum: `sm` \| `md` \| `lg` | no | Default `md`. `lg` only in `HeroSection` |
| `href` | url? | no | If set, renders as a link visually identical to a button. Used for hash/file. Submit must **not** set `href` |
| `type` | enum: `button` \| `submit` | no | Default `button`. Form submit: `submit` |
| `label` | string | yes | Visible label. Sentence case |
| `icon` | enum of Lucide names? | no | Optional trailing or leading. **Lock: leading only if needed; default no icon on Primary** |
| `state` | enum: `rest` \| `loading` \| `success` \| `disabled` | no | Default rest. Loading/success only on contact submit |
| `fullWidth` | boolean | no | True only on Contact submit below 1024 |
| `onPress` | handler? | no | |

**States.** Rest, hover, focus-visible, active, disabled, loading, success — Phase 1 table. Loading: spinner + visually hidden status; width stable.

**Variants.** `primary` `secondary` `ghost` × `sm` `md` `lg`.

**Responsive.** `fullWidth` at mobile form. `lg` stays `lg` on mobile (hero).

**Accessibility.** Disabled not in tab order if truly disabled. Loading: `aria-busy`. Success: does not steal live region (form helper does). If `href`, it is a link; if submit, it is a button.

**Animation.** 150ms color; 80ms active; spinner 800ms linear. No scale.

**Composition.** Used by Hero, ContactForm. Not used for nav links.

**Reusability.** P0.

**Dependencies.** `Spinner`, `Icon`.

**Naming.** Not `CTA`.

---

## TextLink

**Purpose.** Phase 1 “Text (link-button)”: underline, no plate. In-page hashes, external text, footer, Live/Repo.

**Folder.** `components/primitives/TextLink`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `href` | url or hash | yes | |
| `label` | string | yes | |
| `external` | boolean | no | If true: `rel` `noopener noreferrer`, optional `rel=me` via `relMe` |
| `relMe` | boolean | no | GitHub profile |
| `tone` | enum: `default` \| `muted` | no | Footer uses `muted` |
| `showExternalIcon` | boolean | no | 14px arrow, `aria-hidden`, only when `external` and not footer (footer is text-only — Phase 1). **Lock: icon on Live/Repo/GitHub rows; no icon in footer or nav** |

**States.** Rest, hover, focus-visible.

**Variants.** `tone`.

**Responsive.** Wraps. Do not truncate.

**Accessibility.** Link text is the accessible name. Icon hidden.

**Animation.** 150ms color/underline.

**Composition.** Everywhere a control looks like a sentence.

**Reusability.** P0.

**Dependencies.** `Icon` (optional).

---

## IconButton

**Purpose.** Theme, menu, close, copy, command (if not using `CommandTrigger` chrome).

**Folder.** `components/primitives/IconButton`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `label` | string | yes | `aria-label`, required |
| `icon` | Lucide name | yes | 16px default |
| `size` | enum: `sm` \| `md` | no | `sm` is 32 visual / 40 hit |
| `pressed` | boolean? | no | For theme: `aria-pressed` if two-state |
| `onPress` | handler | yes | |

**States.** Ghost hover/active/focus. `pressed` does not change icon color beyond `color.text`.

**Variants.** Size only.

**Responsive.** Always 40px hit.

**Accessibility.** `aria-label` only (no visible text). Theme label includes next state: `Switch to dark theme` / `Switch to light theme`.

**Animation.** 150ms.

**Composition.** Navbar, ContactDetails copy, MobileMenu close (or the same menu button toggles).

**Reusability.** P0.

**Dependencies.** `Icon`.

---

## Icon

**Purpose.** Single Lucide access point: stroke 1.5, sizes 14/16/20/24, `currentColor`.

**Folder.** `components/primitives/Icon`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `name` | closed list of Lucide icons actually used | yes | v1 list: `search` (if needed), `sun`, `moon`, `menu`, `x`, `copy`, `check`, `arrow-up-right`, `arrow-left`, `arrow-right` |
| `size` | enum: `sm` \| `md` \| `lg` \| `xl` | no | 14/16/20/24 |
| `decorative` | boolean | no | Default true (`aria-hidden`). False only if it is the sole content of an `IconButton` (the button already has the label) |

**States.** None.

**Variants.** Size.

**Responsive.** None.

**Accessibility.** Decorative unless documented.

**Animation.** None.

**Composition.** Never next to section titles (Phase 1).

**Reusability.** P0.

**Dependencies.** Lucide.

**Naming conventions.** Do not import Lucide from random files; only `Icon` may.

---

## Field

**Purpose.** Label + control + helper/error. Contact only on public site.

**Folder.** `components/primitives/Field`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `id` | id | yes | |
| `label` | string | yes | |
| `required` | boolean | no | Appends `(required)` muted on the label |
| `control` | enum: `text` \| `email` \| `textarea` | yes | |
| `value` | string | yes | Controlled |
| `onChange` | handler | yes | |
| `placeholder` | string? | no | Never a substitute for label |
| `autocomplete` | string | yes | `name`, `email`, `off` for message |
| `spellcheck` | boolean | no | On for message |
| `error` | string? | no | Replaces helper; sets invalid |
| `helper` | string? | no | |
| `name` | string | yes | Form field name |

**States.** Rest, hover, focus, error, disabled — Phase 1 Inputs. Textarea min-height 144px, vertical resize only.

**Variants.** `control`.

**Responsive.** Full width of form column.

**Accessibility.** Label `for=id`. `aria-invalid`, `aria-describedby` on error/helper ids. Required announced via text, not `*` alone.

**Animation.** None on the field chrome.

**Composition.** Only inside `ContactForm`.

**Reusability.** P0 (also admin later).

**Dependencies.** None.

**Naming.** Not `Input` as the public component — `Field` is the unit. Inner native control is an implementation detail.

---

## Spinner

**Purpose.** 16px arc, 1.5 stroke, `color.text.inverse` on primary buttons, `color.text` elsewhere.

**Folder.** `components/primitives/Spinner`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `label` | string | yes | Visually hidden: `Sending…` |

**States.** Spinning.

**Variants.** None.

**Responsive.** None.

**Accessibility.** Hidden text; parent `aria-busy`.

**Animation.** 800ms linear rotate. Continues under reduced motion **only if** the parent also exposes text (Phase 1). Prefer hiding spinner when reduced motion and showing the word `Sending…` visible.

**Composition.** `Button` loading.

**Reusability.** P0.

**Dependencies.** None.

---

## SkipLink

**Purpose.** First focusable; Skip to content.

**Folder.** `components/primitives/SkipLink`

**Props.** None. `href="#main"`, label `Skip to content`.

**States.** Invisible until focus.

**Variants.** None.

**Responsive.** Top-left gutter.

**Accessibility.** First in DOM. `z.skip`.

**Animation.** None.

**Composition.** First child of `SiteShell`.

**Reusability.** P1 (one).

**Dependencies.** None.

---

## LiveRegion

**Purpose.** Polite announcements: copied, message sent, command result count if needed.

**Folder.** `components/primitives/LiveRegion`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `message` | string | yes | Empty = silent |
| `politely` | boolean | no | Default true (`polite`). Never `assertive` on this site |

**States.** None visual.

**Variants.** None.

**Responsive.** Visually hidden.

**Accessibility.** `aria-live="polite"` `aria-atomic="true"`.

**Animation.** None.

**Composition.** One global instance in `SiteShell`. Callers set message via a tiny store or context (Phase 5). Do not mount five live regions.

**Reusability.** P1.

**Dependencies.** Phase 5 state.

---

# Chrome

## SiteShell

**Purpose.** Skip link, nav, main slot, footer, command menu, live region. Shared by Home, case study, 404.

**Folder.** `components/chrome/SiteShell`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `children` | node | yes | Main content |
| `current` | enum: `none` \| `work` \| `experience` \| `about` \| `contact` \| `work-page` | yes | `work-page` = case study (`aria-current=page` on Work) |
| `hashCurrent` | enum of the four nav ids or `none` | yes | Scroll spy on Home; `none` on case study except Work page current |

**States.** None.

**Variants.** None.

**Responsive.** Defers to children.

**Accessibility.** Owns `header` / `main#main` / `footer` landmarks.

**Animation.** None.

**Composition.** See hierarchy.

**Reusability.** P1.

**Dependencies.** All chrome children.

---

## Navbar

**Purpose.** Sticky masthead. Phase 1 + 3.

**Folder.** `components/chrome/Navbar`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `isScrolled` | boolean | yes | Parent or internal: scrollY > 8 |
| `current` | same as SiteShell `current` / spy | yes | |
| `onOpenCommand` | handler | yes | |
| `theme` | enum: `light` \| `dark` | yes | |
| `onToggleTheme` | handler | yes | |
| `menuOpen` | boolean | yes | |
| `onToggleMenu` | handler | yes | |

**States.** Unscrolled (no hairline, page bg) vs scrolled (elevated 80% + blur + hairline). Menu open (mobile).

**Variants.** None.

**Responsive.** Phase 3 table: drop ⌘K visual before collapsing links; mobile overlay.

**Accessibility.** `nav aria-label="Primary"`. Menu button `aria-expanded`. Current `aria-current="location"` on Home spy; `aria-current="page"` on Work when `work-page`.

**Animation.** 150ms background/border. No height change. Overlay opacity 200ms.

**Composition.** `Container well=wide` inner. `NameMark` | spacer | `NavList` | `CommandTrigger` | `ThemeToggle` | menu `IconButton`. `MobileMenu` sibling portal.

**Reusability.** P1.

**Dependencies.** primitives + `NameMark`, `NavList`, `CommandTrigger`, `ThemeToggle`, `MobileMenu`.

---

## NameMark

**Purpose.** `Manish` → `/` or scroll top. Not a logo.

**Folder.** `components/chrome/NameMark`

**Props.** None required. Optional `href` default `/`.

**States.** Hover: no underline theater; color stays `color.text`.

**Variants.** None.

**Responsive.** Always visible.

**Accessibility.** Accessible name `Manish, home`.

**Animation.** None.

**Composition.** Left of Navbar.

**Reusability.** P1.

**Dependencies.** None (plain link).

---

## NavList

**Purpose.** The four links in order: Work, Experience, About, Contact.

**Folder.** `components/chrome/NavList`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `layout` | enum: `inline` \| `stack` | yes | Inline desktop; stack overlay |
| `current` | id or `none` | yes | |
| `onNavigate` | handler | yes | Closes menu; hash or route |

**States.** Idle / current.

**Variants.** `layout`.

**Responsive.** Parent decides which layout to mount.

**Accessibility.** Real `a href="#work"` on Home; on case study Work points to `/#work`, Experience `/#experience`, etc.

**Animation.** None.

**Composition.** Four `TextLink`-like items but **nav styled as Phase 1 labels** (no underline at rest). Do not reuse footer muted style. This is a dedicated nav item look: `type.label`, 24px gap inline, `type.h3` + 24px gap stacked.

**Reusability.** P1. Used twice (bar + overlay).

**Dependencies.** None.

---

## CommandTrigger

**Purpose.** Visible `⌘K` control. Opens command menu.

**Folder.** `components/chrome/CommandTrigger`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `onOpen` | handler | yes | |
| `visible` | boolean | yes | False below 768 or when tablet overflow |

**States.** Ghost + 1px border (Phase 1). Hover.

**Accessibility.** `aria-label="Open command menu"`. Visible text `⌘K` / `Ctrl+K` based on platform (detect, default `⌘K` on unknown).

**Animation.** 150ms.

**Composition.** Navbar right cluster.

**Reusability.** P1.

**Dependencies.** `IconButton` or a small bordered ghost; **lock: bordered ghost with mono `⌘K`, not a naked icon**.

---

## ThemeToggle

**Purpose.** Light/dark override.

**Folder.** `components/chrome/ThemeToggle`

**Props.** `theme`, `onToggle` as Navbar.

**States.** Icon sun in dark (action = go light), moon in light (action = go dark).

**Accessibility.** Label is the **next** theme.

**Animation.** None on the icon swap (instant).

**Composition.** `IconButton`.

**Reusability.** P1.

**Dependencies.** `IconButton`.

---

## MobileMenu

**Purpose.** Full-screen overlay. Phase 3.

**Folder.** `components/chrome/MobileMenu`

**Props.** `open`, `onClose`, `current`, `onNavigate`. Extra links: Résumé, Email, GitHub.

**States.** Closed (unmounted or inert). Open: focus trap, body scroll lock.

**Variants.** None.

**Responsive.** Only mounted as UI below the collapse breakpoint. Esc closes.

**Accessibility.** `role="dialog"` `aria-modal="true"` `aria-label="Menu"`. Focus to close or first link. Restore focus to menu button.

**Animation.** Opacity 200ms. No slide-from-left.

**Composition.** `NavList layout=stack`, `Hairline`, extra `TextLink`s.

**Reusability.** P1.

**Dependencies.** `NavList`, `TextLink`, `Hairline`.

---

## CommandMenu

**Purpose.** Engineer-speed jump: sections, projects, résumé, email copy, theme, external.

**Folder.** `components/chrome/CommandMenu`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `open` | boolean | yes | |
| `onClose` | handler | yes | |
| `query` | string | yes | |
| `onQuery` | handler | yes | |
| `items` | list of command items | yes | Built in Phase 5 from routes + project titles |
| `activeIndex` | integer | yes | |
| `onMove` | handler | yes | |
| `onRun` | handler | yes | |

**Command item (data).** `id`, `label`, `hint?` (e.g. `Section`), `action` kind: `hash` \| `route` \| `external` \| `copy` \| `theme` \| `download`.

**States.** Closed. Open empty query (default list). Open filtered. No results (`No results` row, not a cartoon).

**Variants.** None.

**Responsive.** Width 560 / `100% − 40px`. Top ~20% (Phase 3). Same component on mobile (opened by keyboard).

**Accessibility.** `role="dialog"` `aria-label="Command menu"`. Combobox pattern: input `role="combobox"` `aria-expanded` `aria-controls` listbox, options `role="option"` `aria-selected`. Focus in input on open. Esc closes. Arrow/Enter. Restore focus to trigger if the trigger was used; if opened by keyboard globally, focus returns to `document.body` or the previously focused node.

**Animation.** Opacity + scale 0.98→1, spring without overshoot, `motion.base` 200ms. Reduced motion: instant.

**Composition.** Backdrop (`color.overlay`, click closes) + plate (`radius.lg`, `shadow.lg`, border) + field (unlabeled visually, `aria-label="Search"`) + `CommandMenuItem` list.

**Reusability.** P1.

**Dependencies.** `CommandMenuItem`, `Hairline` optional, `LiveRegion` for result count optional (`{n} results`).

---

## CommandMenuItem

**Purpose.** One result row. Height 32–40, `size.sm` density.

**Folder.** `components/chrome/CommandMenuItem`

**Props.** `label`, `hint?`, `isActive`, `onPointer` (hover moves active), `onRun`.

**States.** Rest / active (surface.hover fill).

**Variants.** None.

**Responsive.** Full width of menu.

**Accessibility.** `role="option"`.

**Animation.** None.

**Composition.** Label left, hint right muted mono.

**Reusability.** P2.

**Dependencies.** None.

---

## Footer

**Purpose.** Copyright + inline links. No slogan.

**Folder.** `components/chrome/Footer`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `year` | integer | yes | |
| `links` | list of `{ label, href, external? }` | yes | Phase 3 order |

**States.** None.

**Variants.** None.

**Responsive.** Row vs stack (Phase 3).

**Accessibility.** `nav aria-label="Footer"` + copyright `p`.

**Animation.** None.

**Composition.** `Container well=page`, top `Hairline`, `TextLink tone=muted` with no external icons.

**Reusability.** P1.

**Dependencies.** `Container`, `Hairline`, `TextLink`.

---

# Content

## SectionHeader

**Purpose.** Phase 1 title block: kicker, h2, optional support.

**Folder.** `components/content/SectionHeader`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `kicker` | string | yes | |
| `title` | string | yes | The visible `h2` |
| `titleId` | id | yes | For `aria-labelledby` on the section |
| `support` | string? | no | Max ~40em; omit if empty |

**States.** None.

**Variants.** None.

**Responsive.** Title `type.h2` desktop, 28 tablet, 24 mobile (Phase 1 scale).

**Accessibility.** Renders `h2` with `id=titleId`. Kicker not a heading.

**Animation.** Parent section may reveal this as one unit.

**Composition.** `Kicker` + `h2` + optional `p`.

**Reusability.** P2. Used by every Home section except Hero and Footer.

**Dependencies.** `Kicker`.

---

## Plate

**Purpose.** Media frame: border, `radius.lg`, overflow hidden. Featured image, graph well, portrait, case study image.

**Folder.** `components/content/Plate`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `aspect` | enum: `16:9` \| `1:1` \| `graph` | yes | `graph` = height 160/128/112 inner, width 100% |
| `padding` | enum: `none` \| `md` | no | Graph uses `md` (24px). Images `none` |
| `grayscaleHover` | boolean | no | Default true for link images; **false for case study hero** (Phase 3 lock) |
| `href` | url? | no | If set, plate is a link (featured). Graph: no href |
| `alt` | string | yes if image | Empty forbidden for product UI; describe the UI |
| `src` | url? | no | Image plates |
| `children` | node? | no | Graph cells, not both src and graph |
| `radius` | enum: `lg` \| `xl` | no | Default `lg`. Featured may use `lg` only (Phase 3 lock, not xl) |

**States.** Rest / hover (border strong + grayscale if enabled).

**Variants.** `aspect`, `padding`, `grayscaleHover`.

**Responsive.** Width 100% of parent well. Graph inner heights by breakpoint. Portrait sizes are parent-controlled (320/280/full).

**Accessibility.** Image: real alt. Graph children: parent sets `aria-hidden` on the graph.

**Animation.** Grayscale 400ms `ease.out`. No lift. Optional image scale 1.01 clipped.

**Composition.** Child of FeaturedProject, ActivitySection, AboutSection, CaseStudyLayout.

**Reusability.** P2.

**Dependencies.** None.

**Naming.** Not `Card`, not `MediaCard`.

---

## MetaLine

**Purpose.** Role · year · stack as mono/muted text, middots or 16px gaps. No filled chips.

**Folder.** `components/content/MetaLine`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `items` | list of strings | yes | e.g. `Full-stack`, `2025`, `React Native` |
| `separator` | enum: `middot` \| `gap` | no | Default middot |

**States.** None.

**Variants.** None.

**Responsive.** Wraps.

**Accessibility.** A single text string or a list; if list, `ul` with no bullets. Prefer one `p` with middots for simplicity.

**Animation.** None.

**Composition.** FeaturedProject, CaseStudyRecap, ProjectRow right zone may use a shorter MetaLine.

**Reusability.** P2.

**Dependencies.** None.

---

## YearRail

**Purpose.** 96px left column, tabular mono muted, right-aligned. Shared by Work rows and Experience.

**Folder.** `components/content/YearRail`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `primary` | string | yes | `2024` or `2023` |
| `secondary` | string? | no | `Present` on a second line |

**States.** None.

**Variants.** None.

**Responsive.** On mobile the parent stacks and this is full-width left-aligned, not 96px.

**Accessibility.** Part of the row’s text. Dates in a `time` if a full date exists; year-only as text.

**Animation.** None.

**Composition.** `ProjectRow`, `ExperienceRow` only.

**Reusability.** P2. **Do not** reuse for Capabilities.

**Dependencies.** None.

---

## FeaturedProject

**Purpose.** Home’s only large work unit: text stack + 16:9 plate. Mass from the plate. Title is `h3` at `type.h3` (Phase 3).

**Folder.** `components/content/FeaturedProject`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `kicker` | string | yes | Category, not `Featured` |
| `title` | string | yes | Product name |
| `slug` | id | yes | `/work/{slug}` |
| `lede` | string | yes | 1–2 sentences |
| `meta` | list of strings | yes | |
| `imageSrc` | url | yes | |
| `imageAlt` | string | yes | |
| `liveUrl` | url? | no | Omit if absent |
| `repoUrl` | url? | no | Omit if private/missing |
| `status` | enum: `shipped` \| `in-progress`? | no | If in-progress, muted text `In progress`, no pulse |

**States.** Image plate hover grayscale. Links hover.

**Variants.** None. Only one featured.

**Responsive.** Always stacked (text then plate). Wells: text in page, plate in wide — **parent `WorkSection` owns the two Containers**; FeaturedProject is the inner composition and must not wrap itself in wide+page (avoids nested wells). **Lock: WorkSection passes layout; FeaturedProject is content-only including the image.** WorkSection structure: page container (header + featured text + rows) and a sibling wide container for the plate **or** FeaturedProject returns two fragments. Cleaner lock: **`FeaturedProject` includes both wells internally** (it is the one component that is allowed to emit page then wide). WorkSection: SectionHeader (page) → FeaturedProject → row list (page).

**Accessibility.** Primary link accessible name = title. Plate may be inside that link. Live/Repo separate links after in tab order. Heading `h3`.

**Animation.** Plate grayscale. Section reveal once.

**Composition.** Kicker, h3, lede, MetaLine, TextLinks, Plate 16:9 grayscaleHover true.

**Reusability.** P2 (one on Home; do not use on case study — recap is `CaseStudyRecap`).

**Dependencies.** `Kicker`, `MetaLine`, `TextLink`, `Plate`.

---

## ProjectRow

**Purpose.** Non-featured work list item. Whole row → case study.

**Folder.** `components/content/ProjectRow`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `year` | string | yes | |
| `title` | string | yes | |
| `slug` | id | yes | |
| `summary` | string | yes | One sentence |
| `meta` | list of strings | no | Right zone; dropped on tablet as Phase 3 |

**States.** Hover title underline. Focus-visible on the single overlay link.

**Variants.** None.

**Responsive.** 3 zones ≥1024; 2 zones tablet (meta as third line); stack mobile (year above title).

**Accessibility.** One tab stop. `aria-labelledby` title+summary ids. Title is `h3`.

**Animation.** None beyond underline 150ms. Parent stagger max 4.

**Composition.** YearRail, title, summary, optional MetaLine. Parent list owns Hairlines.

**Reusability.** P2.

**Dependencies.** `YearRail`, `MetaLine`.

**Naming.** Not `ProjectCard`.

---

## ExperienceRow

**Purpose.** Compressed role. Not a link.

**Folder.** `components/content/ExperienceRow`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `startYear` | string | yes | |
| `endYear` | string | yes | `Present` if current |
| `role` | string | yes | |
| `company` | string | yes | |
| `location` | string? | no | Right zone desktop |
| `summary` | string | yes | 1–2 sentences |
| `current` | boolean | yes | |

**States.** None (cursor default).

**Variants.** None.

**Responsive.** Same rail behavior as ProjectRow. Location under company on mobile.

**Accessibility.** `h3` on `Role · Company` line (role text `color.text`, company secondary). Not interactive.

**Animation.** Parent stagger.

**Composition.** YearRail (`primary` start, `secondary` Present if current — or single string `2023 – Present` in primary; **lock: one string `YYYY – Present` or `YYYY – YYYY` in `primary`, `secondary` unused** to keep rail one or two lines max).

**Reusability.** P2.

**Dependencies.** `YearRail`.

---

## CapabilityGroup

**Purpose.** One of three text columns.

**Folder.** `components/content/CapabilityGroup`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `label` | string | yes | Clients / Servers / Platform |
| `items` | list of strings | yes | |

**States.** None. No hover per item.

**Variants.** None.

**Responsive.** Parent grid 3 / 2 / 1.

**Accessibility.** `h3` for group label **or** `p` kicker style + `ul`. **Lock: group label is `h3` at kicker visual size** (size/tracking of kicker, element `h3`) so outline is Section h2 → group h3. Items `ul`/`li`.

**Animation.** Parent stagger ≤3.

**Composition.** Label + list. No icons.

**Reusability.** P2.

**Dependencies.** None.

---

## ActivityStat

**Purpose.** Contribution total + caption.

**Folder.** `components/content/ActivityStat`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `count` | integer | yes | Tabular |
| `caption` | string | yes | `contributions in the last year` or `last 26 weeks` on mobile if weeks truncated |

**States.** None. No count-up.

**Variants.** None.

**Responsive.** Caption string may change with week window.

**Accessibility.** The accessible summary of the graph. `type.h3` visual.

**Animation.** Forbidden tick-up.

**Composition.** Number + caption.

**Reusability.** P2.

**Dependencies.** None.

---

## ContributionGraph

**Purpose.** Inert monochrome week grid.

**Folder.** `components/content/ContributionGraph`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `weeks` | list of weeks (7 counts each) | yes | Parent already sliced to 53 or 26 |
| `levels` | 5 ink steps | n/a | Computed from counts; five buckets, `color.surface` → `color.text` |

**States.** None. Cells not hoverable (no GitHub-style day tooltip — no Tooltip component).

**Variants.** None.

**Responsive.** Parent passes sliced weeks. Cell min 8–10px, 3px gap, 2px radius. Inner height 160/128/112.

**Accessibility.** `aria-hidden="true"`. Entire graph ignored.

**Animation.** None. No fill-in.

**Composition.** Lives inside `Plate aspect=graph padding=md grayscaleHover=false`.

**Reusability.** P2.

**Dependencies.** `Plate` (parent wraps).

**Naming.** Not `GithubGraph`.

---

## RepoRow

**Purpose.** Optional GitHub repo line. External.

**Folder.** `components/content/RepoRow`

**Props.** `name`, `description`, `language?`, `href`.

**States.** Same hover as ProjectRow (title underline).

**Variants.** None.

**Responsive.** Language hidden on tablet/mobile.

**Accessibility.** One link, name + description. External icon hidden.

**Animation.** Underline 150ms.

**Composition.** Hairlines owned by parent. External `TextLink` or row overlay to `href`.

**Reusability.** P2. Max 3.

**Dependencies.** `TextLink` / Icon arrow.

---

## Portrait

**Purpose.** About photo plate 1:1.

**Folder.** `components/content/Portrait`

**Props.** `src`, `alt` (real name, e.g. `Manish Jangra`).

**States.** Grayscale hover (not a link).

**Variants.** None.

**Responsive.** 320 desktop, 280 tablet, full well mobile. Parent sets box; Portrait fills 1:1.

**Accessibility.** Informative image.

**Animation.** 400ms grayscale.

**Composition.** `Plate aspect=1:1 grayscaleHover=true` without href.

**Reusability.** P2.

**Dependencies.** `Plate`.

---

## CopyButton

**Purpose.** Copy email to clipboard.

**Folder.** `components/content/CopyButton`

**Props.** `value` (email string), `onCopied` (handler → LiveRegion).

**States.** Rest / success 2s (`check` icon) then revert. `aria-label` `Copy email address` / `Copied`.

**Variants.** None.

**Responsive.** 40×40 always.

**Accessibility.** IconButton. Announce via LiveRegion.

**Animation.** Icon swap, no bounce.

**Composition.** Beside email in ContactDetails.

**Reusability.** P2.

**Dependencies.** `IconButton`, `LiveRegion` (via callback).

---

## ContactForm

**Purpose.** Name, email, message, submit.

**Folder.** `components/content/ContactForm`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `values` | name, email, message strings | yes | |
| `errors` | optional strings per field | no | |
| `status` | enum: `idle` \| `submitting` \| `success` \| `error` | yes | |
| `onChange` | handler | yes | |
| `onSubmit` | handler | yes | |
| `fullWidthSubmit` | boolean | yes | True below 1024 |

**States.** Idle, submitting (button loading), success (button success + helper `Message sent. I will reply by email.`), error (form-level helper if network, else field errors).

**Variants.** None.

**Responsive.** Fields full width of left column. Submit full width if `fullWidthSubmit`.

**Accessibility.** No autofocus. Tab name → email → message → submit. Success/error also to LiveRegion.

**Animation.** None on fields. Button per primitive.

**Composition.** Field ×3, Button primary `Send` / `Sending…` / `Sent`.

**Reusability.** P2. One instance.

**Dependencies.** `Field`, `Button`.

---

## ContactDetails

**Purpose.** Channel hierarchy beside or below the form.

**Folder.** `components/content/ContactDetails`

**Props.** `email`, `location`, `linkedin`, `resumeHref`, `github`, `whatsapp?` (url or omit).

**States.** Copy success via CopyButton.

**Variants.** None.

**Responsive.** Parent stacks below 1024. On desktop, first line aligns with Name label — **parent `ContactSection` handles alignment** (CSS grid row); this component is just a stack: email row, location, links.

**Accessibility.** Email is `mailto` + copy. Links real anchors.

**Animation.** None.

**Composition.** Email as `type.h4`/`body.lg` TextLink mailto + CopyButton. Location caption. TextLinks: LinkedIn, Résumé, GitHub, optional WhatsApp (`tone` default, WhatsApp `type.caption` size — **lock: WhatsApp uses `TextLink tone=muted`**).

**Reusability.** P2.

**Dependencies.** `TextLink`, `CopyButton`.

---

## CaseStudyRecap

**Purpose.** Article header: kicker, h1, lede, meta, optional links.

**Folder.** `components/content/CaseStudyRecap`

**Props.** `kicker`, `title`, `lede`, `meta` items, `liveUrl?`, `repoUrl?`.

**States.** None special.

**Variants.** None.

**Responsive.** `h1` display.md / display.sm (Phase 3).

**Accessibility.** Sole `h1` on the page.

**Animation.** None.

**Composition.** Inside prose well. No 100vh.

**Reusability.** P2.

**Dependencies.** `Kicker`, `MetaLine`, `TextLink`.

---

## CaseStudyBody

**Purpose.** Render the case study outline: Problem, Role, Approach, Highlights, Outcome as `h2` + paragraphs. Optional one diagram.

**Folder.** `components/content/CaseStudyBody`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `sections` | list of `{ heading, paragraphs: strings[], figure?: { src, alt, caption? } }` | yes | At most one `figure` in the whole list |
| `html` or `markdown` | string? | no | Alternative: one resolved document. **Lock: prefer structured `sections` so headings cannot skip levels** |

**States.** None.

**Variants.** None.

**Responsive.** Prose well. Figure uses Plate 16:9 or intrinsic, max width = prose, grayscaleHover false.

**Accessibility.** h2 sequence, no skip. Figure alt states the claim.

**Animation.** None (Phase 3: no subhead reveals).

**Composition.** Article flow.

**Reusability.** P2.

**Dependencies.** `Plate` for figure.

---

## CaseStudyPager

**Purpose.** Prev / All work / Get in touch.

**Folder.** `components/content/CaseStudyPager`

**Props.** `prev?: { title, slug }`, `next?: { title, slug }` — Phase 3 showed Dayzo | All work | Get in touch. **Lock:** left = previous title or empty; center = `All work` → `/#work`; right = `Get in touch` → `/#contact`. If using prev/next both, do not also require next on the right — **right is always Contact**, left is previous project (or next if we only have one sibling). Simpler: **left `← {otherProject}`**, **center All work**, **right Get in touch**. `otherProject` optional.

**States.** Hover on links.

**Variants.** None.

**Responsive.** Three zones wrap on mobile: stack All work, Contact, then other project.

**Accessibility.** Nav `aria-label="Case study pagination"`.

**Animation.** None.

**Composition.** Hairline row, `container.page`.

**Reusability.** P2.

**Dependencies.** `TextLink`, `Hairline`.

---

# Sections

Each section is a P3 assembly. They own `id`, `scroll-margin`, `section` + `aria-labelledby`, padding tokens, and which `Container` wells are used. They fetch nothing (Phase 5 pages pass data).

## HeroSection

**Purpose.** Identity. First paint.

**Folder.** `components/sections/HeroSection`

**Props.** `kicker`, `name` (h1), `lede`, `availability?`, `primary` `{ label, href }` default Get in touch `#contact`, `secondary` See selected work `#work`, `tertiary` Download résumé `/resume`.

**States.** None.

**Variants.** None.

**Responsive.** Type scale Phase 1. min-height 100vh except short landscape. Actions row vs stack.

**Accessibility.** One `h1`. Section can be unlabeled or `aria-label="Introduction"`.

**Animation.** None (no reveal).

**Composition.** `Container wide` → Kicker, h1, lede, Button lg primary, TextLinks.

**Reusability.** P3. One.

**Dependencies.** `Container`, `Kicker`, `Button`, `TextLink`.

---

## WorkSection

**Purpose.** `#work`. Header, featured, rows.

**Folder.** `components/sections/WorkSection`

**Props.** `header` (kicker, title, support?), `featured` (FeaturedProject props), `projects` (list of ProjectRow props, the non-featured).

**States.** None. Empty list must not ship (Phase 2).

**Responsive.** As FeaturedProject + ProjectRow.

**Accessibility.** `id=work` `aria-labelledby` header titleId.

**Animation.** Reveal header + featured; first 4 rows stagger 60ms.

**Composition.** Container page: SectionHeader. FeaturedProject (owns page+wide). Container page: Hairline list of ProjectRow.

**Reusability.** P3.

**Dependencies.** `SectionHeader`, `FeaturedProject`, `ProjectRow`, `Hairline`, `Container`.

---

## ExperienceSection

**Purpose.** `#experience`.

**Folder.** `components/sections/ExperienceSection`

**Props.** `header`, `roles` list of ExperienceRow props.

**States.** None.

**Responsive.** Rows.

**Accessibility.** `id=experience`.

**Animation.** Header reveal; first 4 rows stagger.

**Composition.** Container page, SectionHeader, Hairline list of ExperienceRow.

**Reusability.** P3.

**Dependencies.** `SectionHeader`, `ExperienceRow`, `Hairline`, `Container`.

---

## CapabilitiesSection

**Purpose.** `#capabilities`. Three groups.

**Folder.** `components/sections/CapabilitiesSection`

**Props.** `header`, `groups` exactly 3 of CapabilityGroup props (4th forbidden in v1 without Phase 3 amendment).

**States.** None.

**Responsive.** 3 columns ≥1024, 2 on tablet, 1 mobile. Gap 48/32.

**Accessibility.** `id=capabilities`.

**Animation.** Groups stagger ≤3.

**Composition.** Container page, SectionHeader, grid of CapabilityGroup. No extra wrappers that look like cards.

**Reusability.** P3.

**Dependencies.** `SectionHeader`, `CapabilityGroup`, `Container`.

---

## ActivitySection

**Purpose.** `#activity`.

**Folder.** `components/sections/ActivitySection`

**Props.**

| Name | Kind | Required | Notes |
|---|---|---|---|
| `header` | SectionHeader props | yes | |
| `status` | enum: `ready` \| `error` | yes | Error: hide stat+graph, show fallback sentence + profile link |
| `count` | integer? | if ready | |
| `caption` | string | yes | |
| `weeks` | weeks? | if ready | Already sliced |
| `profileUrl` | url | yes | |
| `repos` | list ≤3 | no | |

**States.** Ready / error (not a spinner on Home if SSR — Phase 5). If client fetch fails, error UI.

**Responsive.** Week slice is the **page’s job** (pass 26 vs 53). Graph heights in Plate.

**Accessibility.** `id=activity`. Graph hidden. Stat + `View GitHub profile` (`relMe`).

**Animation.** Reveal. No cell animation.

**Composition.** Container page: header, ActivityStat. Container wide: Plate+ContributionGraph. Container page: TextLink, optional RepoRows.

**Reusability.** P3.

**Dependencies.** `SectionHeader`, `ActivityStat`, `Plate`, `ContributionGraph`, `TextLink`, `RepoRow`, `Container`.

---

## AboutSection

**Purpose.** `#about`.

**Folder.** `components/sections/AboutSection`

**Props.** `header`, `paragraphs` (1–3 strings), `portrait?` `{ src, alt }`.

**States.** None.

**Responsive.** Split 320 + 64 + prose ≥1024 if portrait; else prose left in page well. Stack below 1024.

**Accessibility.** `id=about`. Paragraphs as `p`. First `type.body.lg` on desktop.

**Animation.** Header + (portrait+text) one reveal unit.

**Composition.** Container page: SectionHeader, then grid. Portrait. Div of paragraphs. No social row.

**Reusability.** P3.

**Dependencies.** `SectionHeader`, `Portrait`, `Container`.

---

## ContactSection

**Purpose.** `#contact`.

**Folder.** `components/sections/ContactSection`

**Props.** `header`, form props (spread to ContactForm), details props, `alignDetailsWithNameField` implied by grid.

**States.** Defers to form.

**Responsive.** 2 columns ≥1024 gap 80px; stack below. Form first in DOM (and visually on mobile).

**Accessibility.** `id=contact`. No autofocus on hash.

**Animation.** Header reveal only. No field stagger.

**Composition.** Container page: SectionHeader, grid: ContactForm | ContactDetails.

**Reusability.** P3.

**Dependencies.** `SectionHeader`, `ContactForm`, `ContactDetails`, `Container`.

---

## CaseStudyLayout

**Purpose.** `/work/[slug]` assembly.

**Folder.** `components/sections/CaseStudyLayout`

**Props.** Recap props, `image?` `{ src, alt }`, body sections, pager props.

**States.** None.

**Responsive.** Recap+body prose well; media wide; pager page well. Padding-top 128/96/64.

**Accessibility.** Article. h1 in recap. Nav current handled by SiteShell `work-page`.

**Animation.** Page crossfade at route level (Phase 5), not inside this component. No 100vh. Image color at rest (`grayscaleHover=false`).

**Composition.** CaseStudyRecap, optional Plate 16:9, CaseStudyBody, CaseStudyPager.

**Reusability.** P3.

**Dependencies.** Recap, Plate, Body, Pager, Container.

---

## NotFoundSection

**Purpose.** 404.

**Folder.** `components/sections/NotFoundSection`

**Props.** None required. Copy locked: kicker `404`, h1 `This page does not exist.`, TextLink `Go home` → `/`.

**States.** None.

**Responsive.** Prose well, padding-top 160.

**Accessibility.** `h1`. No extra live region.

**Animation.** None.

**Composition.** Container prose, Kicker, h1, TextLink.

**Reusability.** P3.

**Dependencies.** `Container`, `Kicker`, `TextLink`.

---

# Page compositions (not extra components)

These are **routes** in Phase 5, not `components/`:

| Route | Assembles |
|---|---|
| `/` | SiteShell (`current` from spy) + Hero + Work + Experience + Capabilities + Activity + About + Contact |
| `/work/[slug]` | SiteShell (`work-page`) + CaseStudyLayout |
| `/resume` | Redirect/file, no component |
| 404 | SiteShell (`none`) + NotFoundSection |

Scroll spy, hash `replaceState`, command item list, theme persistence: Phase 5, not new components. A hook is not a component; `useScrollSpy` will be specified in Phase 5.

---

# Shared list pattern

Work and Experience lists:

1. Parent renders top Hairline.
2. Map rows.
3. Between rows, Hairline.
4. After last row, Hairline.

Rows have padding-y 32/24, no internal borders. YearRail 96px at ≥768 when horizontal.

---

# Animation ownership

| Motion | Owner |
|---|---|
| Nav scrolled hairline | Navbar |
| Overlay opacity | MobileMenu, CommandMenu |
| Button/link color | primitives |
| Plate grayscale | Plate |
| Section reveal 8px/400ms/once | Section components, `once`, max stagger 4 |
| Route crossfade | Phase 5 layout, not a component |
| Spinner | Spinner |

No section invents a new duration.

---

# Token-to-component map (quick)

| Token / rule | Components |
|---|---|
| Wells | `Container` |
| Kickers | `Kicker`, `SectionHeader`, `CapabilityGroup` label |
| Primary button | `Button` in Hero, ContactForm |
| Rows | `ProjectRow`, `ExperienceRow`, `RepoRow` |
| Plates | `Plate`, `Portrait`, graph, featured, case media |
| 96px rail | `YearRail` |
| Command | `CommandMenu` + `CommandTrigger` |
| Focus ring | all interactive primitives |
| Live | `LiveRegion` |

---

# Checklist

Use this before approving Phase 4 and before `05-Implementation-Guide.md`.

## Conventions

- [ ] Folders: `primitives/`, `chrome/`, `content/`, `sections/` with the import rule (no cycles).
- [ ] Names avoid Card, Timeline, CommandPalette, GithubGraph, Dock.
- [ ] Hierarchy matches SiteShell → chrome → sections → content → primitives.
- [ ] Reusability ranks P0–P3 are assigned; sections are not over-parameterized.

## Inventory completeness

- [ ] Every Phase 3 visible object has a component: skip, nav, command, hero, featured, rows, experience, three capability groups, graph, stat, repos, about, form, details, footer, case study recap/body/pager, 404.
- [ ] Rejected list blocks Card, Tooltip, generic Modal, FAB, skill bars.
- [ ] `Field` not a raw public `Input`. `TextLink` not `Button variant=text`.

## Contracts

- [ ] Featured title is `h3`; Work section `h2` is the thesis; YearRail 96px shared.
- [ ] Featured may emit page + wide wells; case study image is color at rest.
- [ ] Graph is `aria-hidden`; ActivityStat + profile link are the a11y story; error hides the grid.
- [ ] Contact: three fields, no autofocus, LiveRegion on copy/send; WhatsApp muted text only.
- [ ] Command menu uses dialog + combobox/listbox, 560px, scale 0.98–1 without overshoot.
- [ ] MobileMenu is a dialog, focus trap, no slide drawer.
- [ ] Capability groups are 3, items not links, labels `h3`.
- [ ] Hairlines owned by list parents.

## A11y and motion

- [ ] Every icon button has a label; theme label is the next state.
- [ ] One primary `Button` per viewport region; `size.lg` hero only.
- [ ] Reduced motion and 40px targets inherited, not restated as exceptions.
- [ ] Stagger max 4; hero no reveal; case study body no per-h2 reveal.

## Process

- [ ] No React/Tailwind/CSS in this document.
- [ ] Props are named and typed in prose; no layout-breaking props.
- [ ] Phase 5 can now define App Router files, data shapes matching these props, state (theme, menu, command, form, scroll spy), and which components are server vs client.

---

**End of Phase 4.**

Approve this document to proceed to **Phase 5: `05-Implementation-Guide.md`**. Component names and folders are now the engineering vocabulary. Adding a `Card` or a tooltip after this is a spec regression, not a polish item.
