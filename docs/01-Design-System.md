# 01 — Design System

**Phase:** 1 of 6  
**Document type:** Visual language specification  
**Status:** Approved  
**Depends on:** None (foundational)  
**Downstream documents must conform to:** This file in full. `02-UX-Architecture.md`, `03-Page-Blueprint.md`, `04-Component-System.md`, `05-Implementation-Guide.md`, and `06-Polish-and-Finishing.md` may not introduce colors, typefaces, radii, shadows, or motion principles that contradict this document.

This is not a redesign of the existing cinematic / 3D / glassmorphic portfolio. It is a new product. The previous site’s visual language (particle fields, neon accents, bento-glass cards, amber labels, dashboard chrome) is retired. Nothing from it is reused unless restated here.

This document is the single source of truth for how the portfolio looks, feels, and behaves at the atomic level. Another designer or engineer should be able to implement the entire interface from these tokens and rules without asking a follow-up question.

---

# Brand Philosophy

## Who this site is for

The site is the public product of **Manish Jangra**, a full-stack software engineer who builds complete systems: interfaces, APIs, data models, and the operational layer around them. The visitor is not here to be entertained. They are here to decide, in a short amount of time, whether this person can be trusted with real product work.

## Personality

The portfolio is **calm, precise, and editorial**. It speaks the way a senior engineer writes a design doc: short sentences, no filler, every element justified. It is confident without being loud. It never performs “creativity.” It demonstrates judgment.

Five words that describe the brand:

1. **Measured** — nothing is decorative by default.
2. **Sharp** — type, edges, and spacing are exact.
3. **Quiet** — the work is louder than the chrome.
4. **Editorial** — the page is composed like a magazine spread, not a dashboard.
5. **Inevitable** — the layout should feel like the only correct arrangement.

It is not playful. It is not cyberpunk. It is not a SaaS landing page with a gradient mesh. It is not a developer template with a hero, three cards, and a contact form.

## How visitors should feel

Within five seconds the visitor should feel:

- They have entered a finished product, not a template.
- The person behind it has taste and restraint.
- There is nothing to “figure out.” The page is already telling them what matters.

After thirty seconds they should feel:

- Oriented. They know who this is, what they do, and where the proof lives.
- Unhurried. The page gives them room. They are not being sold to.
- Curious, not overwhelmed. The next click is obvious.

After two minutes they should feel:

- This engineer thinks in systems, not screenshots.
- The work is real, specific, and recent.
- Contacting him would be a low-friction, high-signal action.

## How recruiters should perceive Manish

Recruiters and hiring managers should leave with a clear, defensible picture:

| Perception | How the design produces it |
|---|---|
| **Engineering excellence** | Typographic precision, zero visual debt, performance-first motion, semantic structure |
| **Product thinking** | Content hierarchy that answers “what / for whom / why it matters” before “what stack” |
| **Attention to detail** | Consistent 8px rhythm, identical hover timings, no orphaned states, perfect focus rings |
| **Clean architecture** | The site itself is the exhibit: simple information architecture, no ornamental complexity |
| **Premium design** | Museum-grade whitespace, monochrome discipline, one accent used like punctuation |
| **Performance** | Instant first paint, no WebGL tax, motion that never blocks content |
| **Simplicity** | One column of meaning. Secondary information is quiet. Nothing competes with the work |

They should **not** perceive: “this person likes 3D,” “this person likes dark themes,” or “this person used a popular template.” Those are the failure modes of the previous site.

## Brand voice (for all copy that appears on the site)

- First person, present tense, specific.
- No buzzword stacks (“passionate developer leveraging cutting-edge…”).
- No emoji in UI chrome. No exclamation marks in headlines.
- Project descriptions lead with the problem and the outcome, not the framework.
- Labels are short: `Selected work`, not `Check out my amazing projects`.
- The name is **Manish Jangra**. In tight UI (nav mark, footer, metadata) it may be shortened to **Manish**. Never a handle as the primary identity.

## What “premium” means here

Premium is not gold, glass, or glow. Premium is:

- Correct type at the correct size with the correct tracking.
- Enough empty space that the eye can rest.
- One decision per region of the page.
- Motion that feels like physics, not decoration.
- A site that still looks expensive when all color is removed — which it mostly is.

---

# Design Principles

These principles are binding. If a later-phase decision conflicts with a principle, the principle wins.

### 1. Content is the interface

The page is a reading experience. Layout exists to sequence content, not to display components. If a region has no content job, it does not exist.

### 2. One idea per viewport

At any scroll position, one thing should be primary. Hero: identity. Projects: the work. Experience: proof of trajectory. Contact: the ask. Competing focal points are a design error.

### 3. Whitespace is a material

Empty space is not leftover. It is the primary surface. Prefer removing an element over compressing padding. If a section feels sparse, that is usually correct.

### 4. Hierarchy before decoration

Size, weight, and proximity create structure. Color, borders, and motion only reinforce it. If hierarchy fails in pure black-and-white, the layout is wrong.

### 5. Monochrome is a constraint, not a theme

Almost everything is a shade of gray. The single accent (see Color System) is used the way a period is used in a sentence: rarely, and only to close a thought. If the accent appears more than a handful of times above the fold, it is overused.

### 6. Typography carries the brand

Type is the logo, the illustration, and the personality. The site should still be recognizable with all images removed. Display sizes are large. Body is generous. Labels are small, tracked, and quiet.

### 7. Consistency is a feature

The same radius, the same 200ms ease, the same 1px border, the same 24px gutter, everywhere. Visitors should never notice a component. They should only notice that everything feels like it belongs.

### 8. Motion has a job

Motion explains a state change, guides attention, or confirms an action. It never introduces itself. If you cannot name the job in one clause, delete the animation.

### 9. Reduce until it hurts, then stop

Every border, shadow, icon, and label must survive a deletion test: if removing it does not harm comprehension, remove it. Stop reducing when comprehension or rhythm breaks.

### 10. The site is the proof

The portfolio is not a gallery of other products with a skin on top. The craft of this site — load time, focus order, spacing, copy — is itself evidence of how Manish works.

### 11. Accessibility is not a layer

Contrast, keyboard access, semantics, and reduced-motion are design constraints from the first token, not a QA pass at the end. A beautiful interface that cannot be tabbed through is unfinished.

### 12. Responsive means re-composed, not shrunk

Mobile is not a scaled-down desktop. Type, spacing, and column count change. The idea of each section does not.

### 13. Quiet chrome, loud work

Navigation, buttons, and metadata recede. Project titles, outcomes, and writing come forward. UI chrome should be the least interesting thing on the page.

### 14. Intention over inventory

Do not show everything. Show the right things in the right order. A short, ordered list of excellent work beats a grid of everything ever shipped.

### 15. Timeless over trendy

No glassmorphism, no mesh gradients, no glow borders, no bento-for-its-own-sake, no noise overlays as identity, no 3D hero. The site should look considered in 2028. If a pattern is currently popular on landing-page galleries, it is a candidate for rejection.

---

# Color System

The palette is **near-black ink on near-white paper**, with a full inverse for dark mode. Light mode is canonical: it is the designed experience, the Open Graph default, and the first impression. Dark mode is a first-class equivalent, not a desaturated afterthought. Both modes share the same token names.

There is **one accent**: a cool, slightly blue-shifted ink used only for focus, links-in-prose, and the current navigation state. It is not a brand color in the marketing sense. It is a functional signal.

No other hues exist on the public site. No amber, no green success banners, no red except for form validation errors (a functional exception, specified below). Social brand colors (GitHub, LinkedIn) are not used as fills; those services appear as text or monochrome icons.

## Light mode (canonical)

| Token | Hex | RGB | Role | Why it exists |
|---|---|---|---|---|
| `color.bg` | `#FAFAFA` | 250, 250, 250 | Page background | Not pure white. Pure `#FFFFFF` against a browser chrome of white creates a dead, washed-out field. `#FAFAFA` is paper: slightly warm-neutral, enough to let white surfaces lift. |
| `color.bg.elevated` | `#FFFFFF` | 255, 255, 255 | Sticky nav, modal overlay surface | The only true white. Reserved for elements that must lift off the page (nav on scroll, dialogs). If everything is white, nothing is elevated. |
| `color.surface` | `#F4F4F5` | 244, 244, 245 | Recessed regions, code well, table zebra optional | One step darker than the page. Used when a region needs to feel inset without a border. Prevents “card on card” by being a background, not a container. |
| `color.surface.hover` | `#ECECED` | 236, 236, 237 | Hover fill for ghost rows, list items, icon buttons | A barely-there state change. Dark enough to register, light enough that it never looks selected. |
| `color.card` | `#FFFFFF` | 255, 255, 255 | Project media frames, image plates | Cards are white plates on the paper background. They earn their existence with a 1px border, not a shadow. |
| `color.border` | `#E4E4E7` | 228, 228, 231 | Default hairline | Visible on `#FAFAFA` and `#FFFFFF` without becoming a box. This is the primary structural line of the entire product. |
| `color.border.strong` | `#D4D4D8` | 212, 212, 216 | Hovered borders, input rest, dividers that must hold | Used when a line must survive sitting next to body text or a photograph. |
| `color.border.subtle` | `#F0F0F2` | 240, 240, 242 | Large section rules, footer rules | For long horizontal rules that would otherwise dominate. |
| `color.text` | `#18181B` | 24, 24, 27 | Primary text, headings | Not `#000000`. Pure black on `#FAFAFA` is harsh and slightly bluish. Zinc-950 reads as ink. |
| `color.text.secondary` | `#52525B` | 82, 82, 91 | Body supporting sentences, descriptions | Readable as a paragraph, clearly subordinate to headings. Meets WCAG AA against `color.bg`. |
| `color.text.muted` | `#A1A1AA` | 161, 161, 170 | Labels, timestamps, kicker text, captions | Metadata. Must never be used for sentences the user needs to understand the page. |
| `color.text.inverse` | `#FAFAFA` | 250, 250, 250 | Text on inverse (primary button, dark media overlays) | Matches the page paper, not pure white, so inverse text feels related to the page. |
| `color.hover` | `#27272A` | 39, 39, 42 | Hovered primary text links, hovered nav items | A step toward black. Hover is a darkening, never a colorization. |
| `color.selection.bg` | `#E4E4E7` | 228, 228, 231 | `::selection` background | Selection should feel like a highlight on paper, not a neon mark. Same family as borders. |
| `color.selection.text` | `#18181B` | 24, 24, 27 | `::selection` text | Keep text readable; do not invert on selection. |
| `color.scrollbar.track` | `transparent` | — | Scrollbar track | The page is the track. A painted track adds chrome the brand does not want. |
| `color.scrollbar.thumb` | `#D4D4D8` | 212, 212, 216 | Scrollbar thumb | Visible enough to grab, quiet enough to ignore. 6px wide, rounded. |
| `color.scrollbar.thumb.hover` | `#A1A1AA` | 161, 161, 170 | Scrollbar thumb hover | Confirms the control is interactive without becoming a focal point. |
| `color.code.bg` | `#F4F4F5` | 244, 244, 245 | Inline and block code background | Recessed, not framed like a terminal. This is not a VS Code skin. |
| `color.code.text` | `#27272A` | 39, 39, 42 | Code text | Slightly softer than body so code does not shout. |
| `color.code.border` | `#E4E4E7` | 228, 228, 231 | Block code outline | Optional; prefer background alone for inline code. |
| `color.link` | `#3F3F46` | 63, 63, 70 | Inline links in prose | Darker than secondary text, lighter than primary. Links are identified by underline, not by hue. |
| `color.link.hover` | `#18181B` | 24, 24, 27 | Hovered inline links | Darken + remain underlined. No color jump. |
| `color.focus` | `#3F3F46` | 63, 63, 70 | Focus ring | A 2px ring, offset 2px, using this ink. Visible on both white and paper. Not blue. Not brand-colored. Keyboard users get a precise ring; mouse users do not see it (`:focus-visible` only). |
| `color.overlay` | `rgba(24, 24, 27, 0.40)` | — | Modal / command-menu backdrop | Dims the page without turning it into a different product. 40% is enough to trap attention; more feels theatrical. |
| `color.shadow` | `rgba(24, 24, 27, 0.06)` | — | Shadow pigment | Shadows are the same ink as text, at very low alpha. Never a colored glow. |
| `color.accent` | `#3F3F46` | 63, 63, 70 | Current nav item, focused control, rare punctuation | Functionally identical to `color.focus` / `color.link` on purpose. There is no second brand color. |
| `color.error` | `#7F1D1D` | 127, 29, 29 | Form validation text and input border on error | The only non-neutral hue. Desaturated dark red so it reads as a system message, not a brand accent. Used only on invalid fields and their helper text. |
| `color.error.bg` | `#FEF2F2` | 254, 242, 242 | Error field wash (optional, inputs only) | A 4% red wash behind an invalid input. Never used as a toast or banner. |
| `color.success` | `#14532D` | 20, 83, 45 | Form success helper only | Equally desaturated. Used once: “Message sent.” Never as a badge system. |

## Dark mode (first-class inverse)

Dark mode inverts the paper/ink relationship. It does **not** invert every gray mechanically (that produces muddy midtones). Each token is retuned so contrast ratios and elevation still work.

| Token | Hex | Why the dark value is this, not a naive invert |
|---|---|---|
| `color.bg` | `#0A0A0B` | Near-black with a hair of warmth. Pure `#000000` blooms on OLED and kills shadow. |
| `color.bg.elevated` | `#111113` | Sticky nav and dialogs lift by going *lighter*, which is how elevation works in the dark. |
| `color.surface` | `#141416` | Recessed regions. Darker than elevated, lighter than page — a trough. |
| `color.surface.hover` | `#1C1C1F` | Hover must lighten, not darken. |
| `color.card` | `#111113` | Same as elevated. Cards are plates of slightly lighter black, outlined, not shadowed. |
| `color.border` | `#27272A` | Hairlines must be lighter than the surface to be visible. This is the hardest token to get right; too light and the page becomes a wireframe. |
| `color.border.strong` | `#3F3F46` | Hovered / input rest. |
| `color.border.subtle` | `#1C1C1F` | Long rules. |
| `color.text` | `#FAFAFA` | Paper-as-ink. Not `#FFFFFF` (too hot on OLED). |
| `color.text.secondary` | `#A1A1AA` | Same muted family as light, now serving as secondary. |
| `color.text.muted` | `#71717A` | Must remain ≥ 4.5:1 against `color.bg` for any text that conveys meaning; purely decorative labels may sit here. |
| `color.text.inverse` | `#18181B` | Text on light buttons in dark mode. |
| `color.hover` | `#E4E4E7` | Hover lightens primary text. |
| `color.selection.bg` | `#27272A` | |
| `color.selection.text` | `#FAFAFA` | |
| `color.scrollbar.track` | `transparent` | |
| `color.scrollbar.thumb` | `#27272A` | |
| `color.scrollbar.thumb.hover` | `#3F3F46` | |
| `color.code.bg` | `#141416` | |
| `color.code.text` | `#E4E4E7` | |
| `color.code.border` | `#27272A` | |
| `color.link` | `#D4D4D8` | |
| `color.link.hover` | `#FAFAFA` | |
| `color.focus` | `#D4D4D8` | Light ring on dark surfaces. Still not blue. |
| `color.overlay` | `rgba(0, 0, 0, 0.64)` | Darker overlay; the page is already dark. |
| `color.shadow` | `rgba(0, 0, 0, 0.48)` | Shadows in dark mode are deeper and tighter, or omitted in favor of borders. Prefer borders. |
| `color.accent` | `#D4D4D8` | |
| `color.error` | `#FECACA` | Light coral on dark, still desaturated. |
| `color.error.bg` | `rgba(127, 29, 29, 0.20)` | |
| `color.success` | `#BBF7D0` | |

## Color usage rules

1. **Default recipe:** `color.bg` page, `color.text` headings, `color.text.secondary` body, `color.border` for structure, no fill on cards unless a photograph or a true plate is needed.
2. **Do not stack surfaces.** A card inside a surface inside a card is dashboard thinking. Maximum nesting: page → optional plate → content.
3. **Photographs** sit on `color.card` with `color.border`. Default treatment: **grayscale** at rest, full color on hover (see Cards). This is the only “color event” in the product besides error/success.
4. **Never** use the accent as a large fill (no colored hero, no colored buttons except the inverse primary which is ink, not hue).
5. **GitHub contribution graph** (Phase 2/3) must be redrawn in this gray ramp. Five intensity steps of a single ink. No GitHub greens.
6. **Charts, language bars, tech-stack marks** are monochrome. Differentiation is by length, weight, or label — not by rainbow.
7. **Dark/light** follows the OS (`prefers-color-scheme`) and can be overridden by a single control in the nav. The control is an icon button, not a colorful toggle.

## Contrast requirements (binding)

- `color.text` on `color.bg`: well above WCAG AAA for body (≥ 7:1). Light: 15.3:1. Dark: 18.1:1 (approximate; verify in QA).
- `color.text.secondary` on `color.bg`: ≥ 7:1 preferred, **≥ 4.5:1 required** (AA for body).
- `color.text.muted` on `color.bg`: ≥ 4.5:1 if the text is required to understand the UI; otherwise it is decorative and must be duplicated by accessible text.
- Focus ring: 2px solid `color.focus` with 2px offset. Must be visible against both `color.bg` and `color.card`.
- Primary button (inverse fill `color.text`, label `color.text.inverse`): ≥ 7:1.

---

# Typography

Typography is the identity system. There is no wordmark logo. The name set in the correct size and tracking *is* the logo.

## Font selection

### Sans (UI, body, most headings) — `font.sans`

**Primary:** Geist Sans  
**Why:** Designed by Vercel for product and marketing on screens. Neutral, slightly geometric, excellent at both 12px labels and 72px display. It is the closest open equivalent to the Linear / Vercel / Raycast family of UIs without copying any one of them. It does not look like Inter-on-every-template, and it does not look like a fashion serif.

**Loading:** Self-hosted via `next/font` (or the Geist npm package). `font-display: swap` is acceptable; `optional` is preferred for the body weight if metrics allow to protect CLS. Subset to `latin`. Variable font if available; otherwise load weights 400, 500, 600 only. Do not load 700 or 800 — display weight is achieved with size and tracking, not extra-black cuts.

### Mono (labels, metadata, code, kicker) — `font.mono`

**Primary:** Geist Mono  
**Why:** Matches Geist Sans in x-height and color. Used for: section kickers (`SELECTED WORK`), timestamps, tech tags, commit meta, keyboard hints, inline code. Never used for paragraphs. Never used for the hero headline.

### Serif

**None.** A display serif would push the site toward fashion-editorial templates. Apple, Linear, Vercel, OpenAI, Raycast, and Notion all lead with a sans. Editorial quality here comes from scale, measure, and whitespace — not from a second family.

## Fallback stack

These are not decorative. They are the experience when Geist has not loaded or cannot load.

- **Sans:** `Geist Sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`
- **Mono:** `Geist Mono, ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`

Fallbacks must preserve roughly similar x-height so layout does not collapse. Do not use Inter as a named webfallback (it is the previous site’s face and the default of too many templates). System UI is the correct fallback.

## Optical usage

| Role | Family | Weight | Notes |
|---|---|---|---|
| Hero name / primary headline | Sans | 500 | Medium, not bold. Size does the work. |
| Section titles | Sans | 500 | |
| Card titles / project names | Sans | 500 | |
| Body | Sans | 400 | |
| UI labels / nav | Sans | 500 | 14px. Medium so they hold at small size. |
| Kickers / meta / tags | Mono | 400 or 500 | Always uppercase or always sentence case — pick per component and never mix inside one component. Kickers: uppercase + tracked. Tags: sentence case. |
| Code | Mono | 400 | |
| Strong emphasis in body | Sans | 500 | Prefer rewriting the sentence over italic. Italics are allowed for titles of works only. |

**Forbidden weights:** 300 (too thin on Windows ClearType), 700+ (too loud; fights the monochrome calm), italic as a heading style.

## Heading scale

Modular scale is **1.250** (major third) from a 16px body, rounded to the 4px grid. Display sizes above H1 are named, not numbered, because they are not a heading level — they are a display role.

| Token | Size (px) | Size (rem) | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|---|
| `type.display.xl` | 80 | 5.00 | 500 | 1.05 (84px) | -0.04em | Hero name on wide desktop only (≥1440) |
| `type.display.lg` | 64 | 4.00 | 500 | 1.06 (68px) | -0.035em | Hero name default desktop |
| `type.display.md` | 48 | 3.00 | 500 | 1.08 (52px) | -0.03em | Hero name tablet; rare in-page display |
| `type.display.sm` | 40 | 2.50 | 500 | 1.10 (44px) | -0.025em | Hero name mobile; page titles |
| `type.h1` | 40 | 2.50 | 500 | 1.15 (46px) | -0.025em | Page-level title if not the hero |
| `type.h2` | 32 | 2.00 | 500 | 1.20 (38px) | -0.02em | Section titles (`Selected work`) |
| `type.h3` | 24 | 1.50 | 500 | 1.25 (30px) | -0.015em | Project titles, subsection titles |
| `type.h4` | 20 | 1.25 | 500 | 1.30 (26px) | -0.01em | Card titles, dialog titles |
| `type.h5` | 16 | 1.00 | 500 | 1.40 (22px) | 0 | Dense UI headings |
| `type.h6` | 14 | 0.875 | 500 | 1.40 (20px) | 0.01em | Overline-adjacent headings |

Negative tracking on large sizes is mandatory. Untracked 64px Geist looks loose and amateur. Do not track body text negatively.

## Body scale

| Token | Size (px) | Size (rem) | Weight | Line height | Letter spacing | Measure | Use |
|---|---|---|---|---|---|---|---|
| `type.body.lg` | 18 | 1.125 | 400 | 1.65 (30px) | 0 | 38–42em | Hero lede, about paragraphs |
| `type.body` | 16 | 1.00 | 400 | 1.60 (26px) | 0 | 36–40em | Default reading text |
| `type.body.sm` | 14 | 0.875 | 400 | 1.55 (22px) | 0.005em | 34–38em | Card descriptions, secondary paragraphs |
| `type.caption` | 13 | 0.8125 | 400 | 1.45 (19px) | 0.01em | — | Photo captions, footnotes |
| `type.label` | 12 | 0.75 | 500 | 1.40 (17px) | 0.04em | — | UI labels, nav (sentence case) |
| `type.kicker` | 11 | 0.6875 | 500 | 1.30 (14px) | 0.16em | — | Section kickers, uppercase, mono |
| `type.micro` | 10 | 0.625 | 500 | 1.30 (13px) | 0.12em | — | Legal, version, “scroll” hints |

## Mono scale

Mono never scales independently for display. It is always a label size:

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `type.mono.md` | 14px / 0.875rem | 400 | 0 | Inline code, command menu rows |
| `type.mono.sm` | 12px / 0.75rem | 400 | 0.02em | Tags, dates, keyboard hints |
| `type.mono.xs` | 11px / 0.6875rem | 500 | 0.16em | Kickers (same as `type.kicker`) |

## Responsive typography

The display sizes change. Body does not shrink below 16px on mobile. Small body on a phone is a template tell.

| Breakpoint | Hero display | Section title (h2) | Body |
|---|---|---|---|
| ≥1440px | `type.display.xl` (80) | 32 | 16–18 |
| 1024–1439px | `type.display.lg` (64) | 32 | 16 |
| 768–1023px | `type.display.md` (48) | 28 (exception: 28px is allowed here only; sit on 4px grid) | 16 |
| ≤767px | `type.display.sm` (40) | 24 | 16 |

Line length: body copy never exceeds **40em** (~640px at 16px). On wide screens, text columns stay narrow and the leftover space is whitespace, not wider lines.

Hero lede: max **22em** so the sentence breaks with editorial rhythm, not a full-width strip.

## Tabular figures

All dates, contribution counts, years, and numeric stats use `font-variant-numeric: tabular-nums` so columns of numbers do not wobble.

## Hyphenation and wrapping

- Headlines: `balance` where supported; no hyphens.
- Body: auto hyphens allowed only on mobile (`hyphens: auto`) with `lang="en"`.
- Project titles: never truncate with ellipsis on desktop; wrap to two lines maximum. On mobile, two lines then ellipsis.
- URLs in footer: break on any character if needed.

---

# Spacing System

The root unit is **4px**. All spacing tokens are multiples of 4. The working unit for layout is **8px**. If a value is not divisible by 4, it is a bug.

Do not use “magic” spacing (13px, 15px, 18px gaps, etc.). Type line-heights may land off-grid; the box around the type must still sit on the grid.

## Spacing tokens

| Token | px | rem | Typical use |
|---|---|---|---|
| `space.0` | 0 | 0 | Reset |
| `space.1` | 4 | 0.25 | Icon-to-label, tight inline |
| `space.2` | 8 | 0.50 | Inside chips, input padding-y (small) |
| `space.3` | 12 | 0.75 | Button padding-y, compact stacks |
| `space.4` | 16 | 1.00 | Default inner padding, paragraph gap |
| `space.5` | 20 | 1.25 | Card padding (compact) |
| `space.6` | 24 | 1.50 | Card padding (default), nav inner |
| `space.8` | 32 | 2.00 | Component group gap |
| `space.10` | 40 | 2.50 | Small section-internal blocks |
| `space.12` | 48 | 3.00 | Default block gap inside a section |
| `space.16` | 64 | 4.00 | Section padding (mobile) |
| `space.20` | 80 | 5.00 | Section padding (tablet) |
| `space.24` | 96 | 6.00 | Section padding (desktop) |
| `space.32` | 128 | 8.00 | Hero extra air, major section breaks |
| `space.40` | 160 | 10.00 | Desktop hero top/bottom (max) |

There is no `space.7`, `space.9`, etc. If a composition seems to need 28px, use 24 or 32.

## Containers

The page is not a full-bleed app shell. It is a **centered reading column** with a wider media well.

| Token | Width | Use |
|---|---|---|
| `container.prose` | 720px (45rem) | About, project case-study text, any long reading |
| `container.page` | 1120px (70rem) | Default page well: nav contents, project list, experience, contact |
| `container.wide` | 1280px (80rem) | Hero, featured project media, GitHub graph |
| `container.max` | 1440px (90rem) | Absolute max. Beyond this, the page grows margin, not content. |

Horizontal padding (gutter) is **inside** the container, not in addition to it:

| Viewport | Gutter (left/right) |
|---|---|
| ≤767px | 20px (`space.5`) — the only approved 20px; it is `space.5` |
| 768–1023px | 32px (`space.8`) |
| ≥1024px | 48px (`space.12`) |

The container is centered. There is no sidebar on the public site.

## Section spacing

A “section” is a named vertical region (Hero, Work, Experience, etc.).

| Viewport | Padding-top | Padding-bottom | Notes |
|---|---|---|---|
| Desktop ≥1024 | 96px (`space.24`) | 96px | Hero is the exception: 128–160px top to clear the nav with air |
| Tablet 768–1023 | 80px (`space.20`) | 80px | |
| Mobile ≤767 | 64px (`space.16`) | 64px | |

Between a section title block and the section’s content: **48px desktop / 32px mobile** (`space.12` / `space.8`).

Between two sibling items in a list (projects, jobs): **0** if they are divided by a hairline; the hairline + the item’s own padding create the rhythm. Item padding-y: **32px desktop / 24px mobile**.

Do not add extra margin-top on the first section after the nav; the hero’s padding-top handles clearance.

## Card spacing

Default card (if a plate is used): **24px** padding all sides. Compact card: **16px**. Gap between stacked elements inside a card: **8px** for meta, **12px** for title-to-description, **16px** for description-to-actions.

Most “cards” in this product are **not plates**. They are rows: media left or above, text right or below, separated by `space.6`–`space.8`, sitting directly on `color.bg`. See Cards.

## Vertical rhythm inside a title block

A section header is always this stack, top to bottom:

1. Kicker (`type.kicker`, `color.text.muted`) 
2. 12px gap (`space.3`)
3. Title (`type.h2`, `color.text`)
4. 16px gap (`space.4`) if a supporting sentence exists
5. Supporting sentence (`type.body`, `color.text.secondary`, max 40em)

Never put an icon next to the kicker. Never put a colored pill behind the kicker.

---

# Radius

Corners are slightly rounded — Apple/Linear, not squircle-heavy iOS widgets, not sharp Material 1.0.

| Token | px | Use |
|---|---|---|
| `radius.none` | 0 | Images that bleed to a column edge (rare), the page itself |
| `radius.sm` | 4 | Checkboxes, tiny chips, tooltip tails (if any), inline code |
| `radius.md` | 8 | Buttons, inputs, icon buttons, nav pills, tags |
| `radius.lg` | 12 | Cards / plates, images, dialogs, command menu |
| `radius.xl` | 16 | Large media frames, featured project image only |
| `radius.full` | 9999 | Avatars if used, nothing else. Not buttons. Not tags. |

**Rules:**

- Buttons are `radius.md` (8), not pills. Pill buttons look like marketing CTAs.
- The command menu and modal are `radius.lg` (12).
- Images inside a bordered plate inherit the plate’s radius minus 1px so they do not poke the border. Implementers: inner radius = outer radius − border width.
- Do not mix radii in one component (e.g. a 16px image with an 8px caption plate). One radius per composed object.
- Focus rings follow the control’s radius.

---

# Shadows

This product is **border-first, shadow-second**. Most elevation is a 1px `color.border`. Shadows exist for floating layers that must separate from a scrolling page (dropdown, command menu, tooltip, sticky nav at the moment it lifts).

Shadows use `color.shadow` pigment. No spread-glow. No colored shadows.

| Token | Recipe (description, not CSS-in-JS) | Use |
|---|---|---|
| `shadow.none` | No shadow | Default for everything |
| `shadow.sm` | Y-offset 1px, blur 2px, 0 spread, 4% ink | Subtle lift on hovered bordered controls if the border alone is not enough. Prefer border-color change over this. |
| `shadow.md` | Y-offset 4px, blur 16px, 0 spread, 6% ink (light) / 48% (dark) | Dropdown menus, tooltips |
| `shadow.lg` | Y-offset 12px, blur 40px, 0 spread, 8% ink (light) / 56% (dark) | Command menu, modal dialog |
| `shadow.nav` | Y-offset 1px, blur 0, 0 spread, hairline equivalent — **or** simply a bottom border | Sticky nav. A shadow is optional; a `color.border` bottom edge is preferred. If both exist, it is too much. Pick the border. |

**Rules:**

- Cards at rest: **no shadow**.
- Cards on hover: **no shadow**. Hover is expressed by border-color `color.border` → `color.border.strong` and a 4px translate-y *or* an underline on the title — not a pop.
- Dark mode: prefer borders over shadows. `shadow.md` and `shadow.lg` may be used for the command menu only.
- Never stack a shadow and a heavy border on the same element.

---

# Icons

## Family

**Lucide** (the open, ISC-licensed descendant of Feather). Stroke-based, 24×24 viewBox, optical consistency with Geist.

**Why Lucide, not a custom set, not Phosphor, not Heroicons, not Font Awesome:** Lucide’s 1.5–2px stroke at 16–20px matches the hairline borders of this system. Filled icon sets look like app chrome. Font Awesome looks like a bootstrap template. A custom set is out of scope.

## Stroke

- Default stroke width: **1.5** (Lucide default).
- Do not use 1px (disappears on non-retina) or 2.5px (too heavy next to 1px borders).
- Caps and joins: round (Lucide default). Do not override.
- Icons are optically aligned to text, never stretched.

## Sizing

Icons sit on a square box. The glyph is the token size; the hit target is larger (see Buttons).

| Token | Glyph size | Typical use |
|---|---|---|
| `icon.sm` | 14px | Inside `type.label` / tags, command menu row prefix |
| `icon.md` | 16px | Default: nav, buttons, list rows |
| `icon.lg` | 20px | Empty states, feature statements in About |
| `icon.xl` | 24px | Rare. Footer social only if no text label. Prefer text. |

Do not use 12px glyphs — they fail contrast and precision.

## Color

Icons inherit `currentColor`. Default `color.text.secondary`. Hover `color.text`. Active/current `color.text`. Never a second hue. Never gradient fills.

## Spacing next to text

Icon-to-label gap is **8px** (`space.2`). Optical exception: a 16px icon next to 14px label may use 6px if it looks loose — but 6px is not a token; use 8px and live with it. Consistency > optical micro-nits at this size.

## Usage rules

- Decorative icons next to section titles are **forbidden** (Principle 9 and 13).
- External links get a 14px arrow-up-right, `aria-hidden`, with the accessible name on the text.
- Social links in the footer are **text** (`GitHub`, `LinkedIn`, `Email`). Icons optional, never icon-only in the footer.
- Icon-only buttons (theme toggle, command trigger, close) require an `aria-label` and a 40×40 minimum hit target.

---

# Buttons

Buttons are quiet. There is one loud action on the entire site at a time (usually `Get in touch` or `Send`). Everything else is secondary or ghost.

## Anatomy (all variants)

- Height: **40px** default (`size.md`). 32px compact (`size.sm`) for table-like rows and the command menu. 48px (`size.lg`) is reserved for the hero primary action only — one per page.
- Horizontal padding: 16px (`size.md`), 12px (`size.sm`), 20px (`size.lg`).
- Radius: `radius.md` (8).
- Label: `type.label` (12px/500) with +0.04em tracking, or 14px/500 for `size.lg`. Sentence case. Never all-caps on buttons.
- Icon: `icon.md`, 8px from label.
- Transition: 150ms on background, border, color. 0ms on layout. Easing: `ease.out`.

## Variants

### Primary

- Fill: `color.text` (ink). Label: `color.text.inverse`.
- Rest: solid ink plate. No border (the fill is the edge).
- Hover: fill `color.hover`. No translate. No shadow.
- Active (pressed): fill `#09090B` in light / slightly lighter in dark. Scale **not** used.
- Disabled: fill `color.border`, label `color.text.muted`, `cursor: not-allowed`, not focusable in tab order if truly disabled.
- Use: the single most important action in a region (hero contact, form submit). Maximum **one** primary button visible in the viewport.

### Secondary

- Fill: transparent. Border: 1px `color.border.strong`. Label: `color.text`.
- Hover: background `color.surface.hover`, border `color.text.secondary`.
- Active: background `color.surface`.
- Disabled: border `color.border`, label `color.text.muted`.
- Use: alternative actions (`View GitHub`, `Read case study`).

### Ghost

- Fill: transparent. No border. Label: `color.text.secondary`.
- Hover: background `color.surface.hover`, label `color.text`.
- Active: background `color.surface`.
- Use: nav-adjacent actions, card-level “Open”, pagination.

### Text (link-button)

- No fill, no border, no padding-x beyond 2px for focus. Label: `color.link` with underline `1px` offset 3px, underline color `color.border.strong`.
- Hover: label `color.link.hover`, underline `color.text`.
- Use: inline or list actions (`Read more`, `Open repository`). Looks like a link because it is one.

### Icon button

- Square: 40×40 visual, 40×40 hit target (already sufficient). Compact: 32×32 visual **with** an invisible 40×40 hit area.
- Ghost treatment by default.
- Must have `aria-label`.
- Use: theme toggle, close dialog, open command menu, copy.

## States (all variants)

| State | Behavior |
|---|---|
| Rest | As specified per variant |
| Hover | As specified; 150ms. No movement. |
| Focus-visible | 2px `color.focus` ring, 2px offset. Does not replace hover. Both can apply. |
| Active | Darker/lighter as specified. Duration 80ms. |
| Disabled | Reduced contrast, no hover, `aria-disabled` or `disabled`. Explain why in helper text if the user might not know (e.g. form incomplete). |
| Loading | Label replaced by a 16px monochrome spinner (1.5px stroke arc, 800ms linear rotation) + visually hidden “Sending…”. Width of the button **does not change** (reserve min-width from the rest label). |
| Success (form only) | Primary button label becomes “Sent” for 2s, then returns. No green fill. Optional: a line of `color.success` helper text below the form. |

## What buttons are not

- Not pills.
- Not gradient.
- Not full-width except on mobile forms (submit may be 100% of the form column).
- Not accompanied by a second competing primary in the same section.

---

# Inputs

Forms on the public site: **contact only** (name, email, message, optional optional-subject). Admin/CRM is out of scope for this public design system; if it remains in the product it consumes these same tokens but is specified in Phase 5 as a separate app shell.

## Anatomy

- Label: above the field, `type.label`, `color.text.secondary`, 8px below-label gap. Labels are always visible (no floating labels).
- Field height: 40px (text, email). Textarea: min-height 144px (36 × 4), resizable vertically only.
- Padding: 12px 12px.
- Radius: `radius.md`.
- Background: `color.bg.elevated` (white in light). Border: 1px `color.border.strong`.
- Text: `type.body.sm` or `type.body`, `color.text`. Placeholder: `color.text.muted`, never italic.
- Helper text: `type.caption`, `color.text.muted`, 8px below field.

## States

| State | Border | Background | Extra |
|---|---|---|---|
| Rest | `color.border.strong` | `color.bg.elevated` | |
| Hover | `color.text.muted` | same | Mouse only |
| Focus | `color.text` (1px) + 2px `color.focus` ring offset 2px | same | Label stays put |
| Error | `color.error` | `color.error.bg` | Helper replaced by error text in `color.error`. `aria-invalid="true"`, `aria-describedby` points at error id |
| Disabled | `color.border` | `color.surface` | `color.text.muted` |

## Rules

- No icons inside fields unless a clear/search affordance is required (not needed on contact).
- Autocomplete attributes are mandatory (`name`, `email`).
- Required fields marked with a text `(required)` in the label at `color.text.muted`, not a red asterisk. Asterisks are noisy and fail some screen readers unless `abbr` is used; the word is clearer.
- Tab order: name → email → message → submit. No hidden fields in the tab path.
- Spellcheck on for message, off for email.

---

# Cards

A card in this system is a **structured unit of content**, not a rounded rectangle with a drop shadow. Most of the site should use **rows**, not plates.

## Two structures

### 1. Row (default for projects, experience, links)

- Full width of `container.page`.
- Top hairline `color.border` (the first row in a list includes the line; the list also ends with a line).
- Padding: 32px 0 desktop, 24px 0 mobile.
- Layout: one horizontal band. Left: index or year (`type.mono.sm`, `color.text.muted`, tabular). Middle: title + one-line description. Right (desktop): tech tags or a year. On mobile: stack, year above title.
- Hover: title color stays `color.text`; an underline appears under the title (1px, `color.border.strong` → `color.text`). The row background does **not** fill. The cursor is pointer if the whole row is the hit target.
- No radius, no shadow, no border-left accent.

### 2. Plate (only for media)

- Background `color.card`, border 1px `color.border`, radius `radius.lg`.
- Used to hold a screenshot, a GitHub graph, or a portrait.
- Padding: 0 if the media bleeds; 24px if the plate contains mixed media + caption.
- Hover (when the plate is a link): border `color.border.strong`. Image treatment: grayscale 100% rest → 0% on hover, 400ms `ease.out`. This is the signature media interaction. It must be identical on every image plate.
- No lift, no scale > 1.01. If a scale is used at all, it is 1.01 on the image only, 400ms, overflow hidden by the plate so the border does not move.

## Project card (composition preview; full spec in Phase 4)

A project in the index is a **Row** with an optional **Plate** for the featured project only.

- **Featured (first project):** Plate of media at `container.wide`, 16:9, below a short kicker + title + 2-line lede. Then a row of meta (role, year, stack as text).
- **The rest:** Rows. No thumbnails in the list. Thumbnails in a list recreate “card overload.” Proof lives on the project page / case study.

## Rules

- Never a grid of equal image-cards on the homepage.
- Never a colored top border or gradient wash.
- Never an icon in a rounded square as a project mark.
- Tags are text in `font.mono` at 12px, `color.text.muted`, separated by a middot or a 16px gap — not chips with fills. If a chip is required for contrast on a photo, it is a 4px-radius, 1px-border, transparent fill, 12px mono label.

---

# Navigation

Navigation is a **thin editorial masthead**, not a product app bar, not a dock, not a floating pill.

## Anatomy

- Height: 56px mobile, 64px desktop. Content vertically centered.
- Background: `color.bg` at rest (transparent over the page color, which is the same). On scroll past 8px: `color.bg.elevated` at 80% with `backdrop-filter: blur(12px)` and a bottom hairline `color.border`. If backdrop-filter is unavailable, solid `color.bg.elevated`.
- Layout: left = name mark. Right = links + command hint + theme.
- Name mark: `Manish` in `type.label` or 14px/500 sans, `color.text`, letter-spacing 0.02em. It is the home link. It is not a logo device. No avatar in the nav.
- Links: `About`, `Work`, `Experience`, `Contact` — exact set to be confirmed in Phase 2. `type.label`, `color.text.secondary`, 24px gap between items.
- Current section: `color.text`, no pill, no underline bar. Optional: a 1px underline, 12px wide, centered under the word, `color.text`. Prefer the color change alone.
- Right cluster gap: 8px between command trigger, theme, and (on mobile) menu.

## Behavior

- **Sticky.** Always. Does not hide on scroll-down. Hiding nav on scroll is a mobile-app pattern and fights the “I want to jump to Contact” recruiter behavior.
- **Transparent-to-hairline** as specified. No shadow.
- **Command menu trigger:** visible as `⌘K` in `type.mono.sm`, `color.text.muted`, inside a ghost control with a 1px `color.border` — Raycast/Linear cue, earned because this is an engineer’s site. Hidden on viewports <768 if it crowds; keyboard still works.
- **Mobile <768:** links collapse into a simple full-screen overlay (not a hamburger drawer with animation theater). Trigger: 40×40 icon button, label “Menu” / “Close”. Overlay: `color.bg`, large stacked links at `type.h3`, padding `space.8`. No illustration. Focus trap on. Esc closes.
- **Skip link:** first focusable in the document. Text “Skip to content”. Visible only on focus. Target: `#main`.

## What navigation is not

- Not a bottom dock.
- Not a vertical sidebar.
- Not glassmorphic.
- Not numbered (`01 — Work`). Numbers belong in the project list, not the nav.

---

# Animation Philosophy

This section is not a list of animations. It is the law that later documents must obey when they specify motion.

## Purpose

Motion exists to **keep the user’s mental model in sync with the interface**. A menu appears from the thing that opened it. A page’s content arrives as if the previous page got out of the way. A hover confirms “this is clickable.” That is the entire job.

## Character

The motion is **physical and short**. It feels like a well-made hardware switch, not a cinematic title sequence. Apple’s product pages, Linear’s app, and Notion’s editor all move less than people remember. What people remember is that nothing jolted.

## Timing

| Token | Duration | When |
|---|---|---|
| `motion.instant` | 80ms | Pressed/active, toggles |
| `motion.fast` | 150ms | Hover color, border, opacity |
| `motion.base` | 200ms | Standard enter/exit of small UI (tooltip, dropdown) |
| `motion.slow` | 400ms | Image grayscale, large layout fades, page section reveal |
| `motion.page` | 500ms | Rare. Route-level fade only |

Never exceed 500ms for a single transition. Never chain more than two sequential motions for one action.

## Easing

| Token | Curve (cubic-bezier) | Character |
|---|---|---|
| `ease.out` | `0.16, 1, 0.3, 1` | Default. Fast start, long settle. Linear-like. |
| `ease.in-out` | `0.45, 0, 0.55, 1` | Symmetric. Only for looping or ping-pong (spinner is linear instead). |
| `ease.linear` | `0, 0, 1, 1` | Spinners only. |

Do not use bounce, elastic, or spring with overshoot on public UI. A spring with damping high enough to avoid overshoot is acceptable for the command menu’s scale-in (scale 0.98 → 1.00, opacity 0 → 1). If the spring overshoots, it is wrong.

## Direction

- **Enter:** opacity 0 → 1. Optional translateY 8px → 0. Never translate from 40px (that is “wow” motion).
- **Exit:** faster than enter (use `motion.fast`), opacity only. Do not reverse a long slide on close.
- **Page:** crossfade. No shared-element hero morphs. No 3D page flips.

## Scroll-reveal

Allowed, with constraints:

- Trigger: when 20% of the element is in view, once (`once: true`).
- Effect: opacity 0.01 → 1 over 400ms `ease.out`, optional 8px rise.
- Stagger between siblings: 60ms, max 4 items (then the rest appear together). A 12-item staggered list is a template.
- Already-in-view on load (hero): no reveal. Hero is painted in the first frame. Anything else is a flash of empty page.

## Hover

- Color and underline: yes, 150ms.
- Grayscale on images: yes, 400ms.
- Scale of entire cards: no.
- Magnetic buttons, custom cursor, spotlight that follows the mouse: **no.** Those are the previous site. They signal “demo,” not “product.”
- The system cursor is the cursor. `cursor: pointer` on controls. No custom cursor.

## Reduced motion

If `prefers-reduced-motion: reduce`:

- Duration → 0 for transforms.
- Opacity fades may remain at 150ms or also drop to 0. Prefer 0.
- Spinners may remain (they communicate a live process) but should not be the only status — always include text.
- Grayscale-to-color may remain (it is not vestibular) or snap. Snap is fine.

## What this site will never animate

- 3D / WebGL / canvas particles
- Gradient shifts
- Endless floating
- Scroll-jacking or hijacked snap on the whole page
- Number tick-ups for vanity stats
- Typing effects in the hero
- Parallax greater than 0

---

# Accessibility

Accessibility is specified here so Phase 2–6 cannot “add it later.”

## Contrast

See Color System. Additional rules:

- Placeholder text is not a label.
- `color.text.muted` is banned for paragraph copy.
- Focus is never `outline: none` without a `:focus-visible` replacement that meets 3:1 against adjacent colors.

## Keyboard

- All interactive elements are reachable by Tab in DOM order, which matches visual order (no positive `tabindex`).
- Skip link is first.
- Command menu: `⌘K` / `Ctrl+K` opens; `Esc` closes; `↑↓` moves; `Enter` activates; focus returns to the trigger.
- Mobile menu: same Esc / focus trap / restore.
- Project rows are one tab stop (the wrapping link), not title + tags + icon as three stops.
- Visible focus at all times for keyboard users.

## Semantics

- One `h1` per page: the hero name on home, the page title elsewhere.
- Sections are `section` with `aria-labelledby` pointing at the visible `h2`.
- Nav is `nav` with `aria-label="Primary"`. Footer nav is `nav` with `aria-label="Footer"`.
- Lists are lists. Do not fake a list with divs.
- The main landmark is `main#main`.
- Images have real `alt`. Decorative images (`alt=""`). Project screenshots describe the product UI, not “screenshot.”
- Buttons that navigate are links. Links that submit are buttons.

## Reduced motion

See Animation Philosophy. Implement with the CSS media query and a matching JS check for any JS-driven motion. Do not rely on CSS alone if Framer Motion (or equivalent) is used — both must read the preference.

## Name, role, value

- Icon buttons: `aria-label`.
- Theme toggle: `aria-pressed` or a label that includes the next state (“Switch to dark theme”).
- Current nav item: `aria-current="page"` or `aria-current="location"` for on-page sections.
- Live regions: form success and form errors use `aria-live="polite"`.

## Hit targets

Minimum 40×40 CSS pixels for every control, even if the glyph is 16px. Spacing between adjacent 40px targets: at least 8px.

## Language and direction

`html lang="en"`. No `dir` surprises. If a project title contains non-English text, mark that fragment with the correct `lang`.

## Media

No autoplaying video with sound. If a silent looping product video is used in a plate, it is `muted` `playsinline` and has a pause control. Prefer a still image.

---

# Design Tokens

Complete list. Names are canonical. Downstream documents and implementation must use these names (mapped to CSS custom properties in Phase 5). Values repeated here so this section can be used as a cheat sheet.

## Color — light

```
color.bg                     #FAFAFA
color.bg.elevated            #FFFFFF
color.surface                #F4F4F5
color.surface.hover          #ECECED
color.card                   #FFFFFF
color.border                 #E4E4E7
color.border.strong          #D4D4D8
color.border.subtle          #F0F0F2
color.text                   #18181B
color.text.secondary         #52525B
color.text.muted             #A1A1AA
color.text.inverse           #FAFAFA
color.hover                  #27272A
color.selection.bg           #E4E4E7
color.selection.text         #18181B
color.scrollbar.track        transparent
color.scrollbar.thumb        #D4D4D8
color.scrollbar.thumb.hover  #A1A1AA
color.code.bg                #F4F4F5
color.code.text              #27272A
color.code.border            #E4E4E7
color.link                   #3F3F46
color.link.hover             #18181B
color.focus                  #3F3F46
color.overlay                rgba(24, 24, 27, 0.40)
color.shadow                 rgba(24, 24, 27, 0.06)
color.accent                 #3F3F46
color.error                  #7F1D1D
color.error.bg               #FEF2F2
color.success                #14532D
```

## Color — dark

```
color.bg                     #0A0A0B
color.bg.elevated            #111113
color.surface                #141416
color.surface.hover          #1C1C1F
color.card                   #111113
color.border                 #27272A
color.border.strong          #3F3F46
color.border.subtle          #1C1C1F
color.text                   #FAFAFA
color.text.secondary         #A1A1AA
color.text.muted             #71717A
color.text.inverse           #18181B
color.hover                  #E4E4E7
color.selection.bg           #27272A
color.selection.text         #FAFAFA
color.scrollbar.track        transparent
color.scrollbar.thumb        #27272A
color.scrollbar.thumb.hover  #3F3F46
color.code.bg                #141416
color.code.text              #E4E4E7
color.code.border            #27272A
color.link                   #D4D4D8
color.link.hover             #FAFAFA
color.focus                  #D4D4D8
color.overlay                rgba(0, 0, 0, 0.64)
color.shadow                 rgba(0, 0, 0, 0.48)
color.accent                 #D4D4D8
color.error                  #FECACA
color.error.bg               rgba(127, 29, 29, 0.20)
color.success                #BBF7D0
```

## Typography

```
font.sans                    Geist Sans + fallbacks specified above
font.mono                    Geist Mono + fallbacks specified above

type.display.xl              80 / 500 / 1.05 / -0.04em
type.display.lg              64 / 500 / 1.06 / -0.035em
type.display.md              48 / 500 / 1.08 / -0.03em
type.display.sm              40 / 500 / 1.10 / -0.025em
type.h1                      40 / 500 / 1.15 / -0.025em
type.h2                      32 / 500 / 1.20 / -0.02em
type.h3                      24 / 500 / 1.25 / -0.015em
type.h4                      20 / 500 / 1.30 / -0.01em
type.h5                      16 / 500 / 1.40 / 0
type.h6                      14 / 500 / 1.40 / 0.01em
type.body.lg                 18 / 400 / 1.65 / 0
type.body                    16 / 400 / 1.60 / 0
type.body.sm                 14 / 400 / 1.55 / 0.005em
type.caption                 13 / 400 / 1.45 / 0.01em
type.label                   12 / 500 / 1.40 / 0.04em
type.kicker                  11 / 500 / 1.30 / 0.16em   (mono)
type.micro                   10 / 500 / 1.30 / 0.12em
type.mono.md                 14 / 400 / 1.50 / 0
type.mono.sm                 12 / 400 / 1.40 / 0.02em
type.mono.xs                 11 / 500 / 1.30 / 0.16em
```

## Spacing

```
space.0    0
space.1    4
space.2    8
space.3    12
space.4    16
space.5    20
space.6    24
space.8    32
space.10   40
space.12   48
space.16   64
space.20   80
space.24   96
space.32   128
space.40   160
```

## Layout

```
container.prose              720px
container.page               1120px
container.wide               1280px
container.max                1440px
gutter.mobile                20px
gutter.tablet                32px
gutter.desktop               48px
nav.height.mobile            56px
nav.height.desktop           64px
breakpoint.sm                640px
breakpoint.md                768px
breakpoint.lg                1024px
breakpoint.xl                1280px
breakpoint.2xl               1440px
```

Breakpoints are **min-width**. Mobile-first. The named layouts in later phases map as: Mobile `<768`, Tablet `768–1023`, Desktop `≥1024`, Wide `≥1440`.

## Radius

```
radius.none   0
radius.sm     4
radius.md     8
radius.lg     12
radius.xl     16
radius.full   9999
```

## Shadow

```
shadow.none
shadow.sm     0 1px 2px  color.shadow@4%
shadow.md     0 4px 16px color.shadow
shadow.lg     0 12px 40px color.shadow (8% light / 56% dark)
shadow.nav    do not use; use border instead
```

## Icons

```
icon.sm   14
icon.md   16
icon.lg   20
icon.xl   24
icon.stroke  1.5
icon.gap     8
icon.family  Lucide
```

## Buttons

```
button.height.sm   32
button.height.md   40
button.height.lg   48
button.pad.sm      12
button.pad.md      16
button.pad.lg      20
button.radius      radius.md
```

## Motion

```
motion.instant   80ms
motion.fast      150ms
motion.base      200ms
motion.slow      400ms
motion.page      500ms
ease.out         cubic-bezier(0.16, 1, 0.3, 1)
ease.in-out      cubic-bezier(0.45, 0, 0.55, 1)
ease.linear      linear
reveal.distance  8px
reveal.stagger   60ms
reveal.maxStaggerItems  4
```

## Z-index

A small, named scale. No arbitrary 9999.

```
z.base        0
z.raised      1      /* plates over a section background */
z.sticky      10     /* nav */
z.dropdown    20
z.overlay     30     /* backdrop */
z.modal       40     /* command menu, mobile menu, dialog */
z.toast       50     /* if ever needed; prefer inline live regions */
z.skip        60     /* skip link */
```

## Other

```
border.width            1px
focus.ring.width        2px
focus.ring.offset       2px
hit.target.min          40px
measure.body.max        40em
measure.lede.max        22em
image.hover             grayscale(100%) → grayscale(0%), 400ms ease.out
scrollbar.width         6px
theme.default           light
theme.follow            prefers-color-scheme, user override persisted
```

---

# Explicit non-goals (visual)

To keep later phases honest, the following are **out of the design language**:

- Custom cursors, cursor trails, magnetic hover
- WebGL, Three.js, particle fields, 3D globes/spheres
- Glassmorphism, noise textures as brand, mesh gradients, glow
- Neon, saturated accents, rainbow language charts, GitHub-green graphs
- Bento dashboards, equal-card grids of projects, icon-in-rounded-square features
- Dock navigation, OS-desktop metaphors, boot sequences
- Inter / previous-site amber / JetBrains Mono as brand faces
- Stock 3D hero illustrations, Lottie as identity
- Infinite logo marquee of technologies

---

# Checklist

Use this before approving Phase 1 and before starting `02-UX-Architecture.md`. Every item must be true.

## Brand

- [ ] The personality is calm, precise, and editorial — not cinematic, playful, or “dev-template.”
- [ ] Recruiters would infer engineering excellence from the craft of the page, not from a tagline claiming it.
- [ ] Voice rules (no buzzwords, no emoji chrome, name = Manish Jangra) are clear enough to write copy from.

## Principles

- [ ] There are 15 binding principles.
- [ ] “Content is the interface,” “whitespace is a material,” “typography carries the brand,” and “motion has a job” cannot be violated by later phases.
- [ ] Trendy patterns (glass, glow, 3D, bento-for-its-own-sake) are explicitly rejected.

## Color

- [ ] Light mode is canonical; dark mode is fully specified, not inverted blindly.
- [ ] Every token has a why.
- [ ] The only non-gray hues are desaturated error and success, form-only.
- [ ] Links are identified by underline and weight of ink, not by a blue.
- [ ] Focus is a 2px ink ring, `:focus-visible` only, never a browser-default blue as brand.
- [ ] GitHub greens and social brand colors are banned on the public site.
- [ ] Contrast rules meet WCAG AA for body, AAA for primary text on paper.

## Typography

- [ ] Geist Sans + Geist Mono are the only families, with system fallbacks (not Inter).
- [ ] No serif. No weight below 400 or above 500 for UI (400/500 only).
- [ ] Display sizes are named; tracking tightens as size grows.
- [ ] Body never drops below 16px on mobile.
- [ ] Measure is capped (40em body, 22em lede).
- [ ] Kickers are mono, uppercase, tracked; buttons are sentence case.

## Spacing, radius, shadow

- [ ] Everything is on a 4px grid; layout prefers 8px.
- [ ] Four container widths exist; the page does not go full-bleed as an app shell.
- [ ] Section padding is 96 / 80 / 64 by breakpoint.
- [ ] Radius is 4 / 8 / 12 / 16 — buttons are 8, not pills.
- [ ] Cards at rest have no shadow; floating layers may; sticky nav uses a border.

## Components (atomic)

- [ ] Buttons: five variants, one primary per viewport, 40px default, loading width-stable.
- [ ] Inputs: labels on top, no floating labels, error tied via `aria-describedby`.
- [ ] Cards: rows by default, plates for media only; no homepage thumbnail grid.
- [ ] Nav: sticky masthead, name as mark, no dock; mobile is a full-screen text overlay.
- [ ] Icons: Lucide, 1.5 stroke, 14/16/20/24, inherit `currentColor`.

## Motion and a11y

- [ ] Durations are 80 / 150 / 200 / 400 / 500. Easing is `ease.out` by default. No bounce.
- [ ] Hero paints on first frame (no reveal). Scroll reveal is 8px / 400ms / once / max stagger 4.
- [ ] No custom cursor, no scroll-jacking, no WebGL.
- [ ] `prefers-reduced-motion` zeros transforms.
- [ ] Keyboard, semantics, hit targets (40px), skip link, and live regions are specified.

## Tokens and process

- [ ] The token list is complete and named for implementation in Phase 5.
- [ ] z-index has a named scale.
- [ ] Explicit non-goals are listed so Phase 3–6 cannot reintroduce the old site.
- [ ] This document does not contain React, Tailwind class strings, or CSS files — only specification.
- [ ] Phase 2 may now define IA, journeys, and content strategy **using these tokens and principles only**.

---

**End of Phase 1.**  

Approve this document to proceed to **Phase 2: `02-UX-Architecture.md`**. If anything here is wrong — especially light-vs-dark as canonical, Geist vs another face, row-based projects vs a media-heavy index, or the ban on custom cursors / WebGL — say so now. Changing those after Phase 3 is expensive.
