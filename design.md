---
name: Fisher Lok Precision Calibration Console
description: An evidence-led quantitative engineering portfolio with calibrated signal-path surfaces, cobalt state color, and compact instrument readouts.
colors:
  canvas: "#f5f7fa"
  surface: "#ffffff"
  surface-subtle: "#edf1f6"
  surface-raised: "#ffffff"
  ink: "#111722"
  ink-soft: "#4c586b"
  ink-faint: "#5f6b7e"
  line: "#d4dce7"
  line-strong: "#aeb9c8"
  accent: "#145cff"
  accent-strong: "#0049d8"
  accent-soft: "#e7eeff"
  accent-ink: "#ffffff"
  night: "#0a101b"
  night-raised: "#101a29"
  night-ink: "#f4f7fb"
  night-soft: "#b2bfd0"
  focus: "#0b55f5"
  dark-canvas: "#080c13"
  dark-surface: "#0d141f"
  dark-surface-subtle: "#141e2c"
  dark-surface-raised: "#111a27"
  dark-ink-soft: "#b6c1d0"
  dark-ink-faint: "#8d9bad"
  dark-line: "#253143"
  dark-line-strong: "#3d4b60"
  dark-accent: "#6f98ff"
  dark-accent-strong: "#8badff"
  dark-accent-soft: "#17274a"
  dark-accent-ink: "#08101e"
  dark-focus: "#8badff"
  blog-line: "#344054"
  blog-row-line: "#273346"
  blog-feature-line: "#4a5870"
  blog-link: "#7fa4ff"
  contact-soft: "#eef3ff"
  dark-contact-soft: "#183058"
typography:
  display:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: "clamp(64px, 8.2vw, 96px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.038em"
  section-title:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: "clamp(48px, 6.4vw, 82px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: "clamp(30px, 3.3vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: "clamp(28px, 3vw, 42px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  body:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  lead:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: "clamp(17px, 1.5vw, 20px)"
    fontWeight: 400
    lineHeight: 1.58
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, SFMono-Regular, Consolas, monospace"
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.08em"
  link:
    fontFamily: "JetBrains Mono, SFMono-Regular, Consolas, monospace"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.035em"
  nav:
    fontFamily: "Manrope, Helvetica Neue, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  tag: 6px
  control: 12px
  media: 14px
  square: 0px
spacing:
  control-gap: 10px
  inline: 18px
  content: 24px
  section-gap: 32px
  layout-gap: 48px
  wide-gap: 72px
  container-gutter: "clamp(24px, 5vw, 72px)"
  section-y: "clamp(96px, 11vw, 164px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: 46px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: 46px
  button-tertiary:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    typography: "{typography.nav}"
    rounded: "{rounded.square}"
    padding: "0 10px"
    height: 46px
  navigation:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.nav}"
    height: 72px
  theme-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    size: 44px
  project-tag:
    backgroundColor: transparent
    textColor: "{colors.ink-faint}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "4px 8px"
  evidence-link:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.link}"
  project-media:
    backgroundColor: "{colors.surface-subtle}"
    rounded: "{rounded.media}"
  evidence-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "clamp(32px, 4vw, 56px)"
  blog-list:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.square}"
    padding: "clamp(96px, 11vw, 164px) 0"

---

# Design System: Fisher Lok Precision Calibration Console

## Overview

**Creative North Star: "Precision Calibration Console"**

The interface treats engineering evidence as a calibrated signal path. Cool-white and midnight surfaces, graphite type, cobalt state color, instrument-grade lines, and compact mono readouts make the progression from research to reliable trading systems legible without pretending to be a trading terminal. The visual world is quiet at rest and exact in state: hierarchy comes from scale, alignment, contrast, and evidence, not ornament.

The portfolio opens with a large identity statement and direct conversion actions, then gives the visitor a four-stage Research → Data → Execution → Monitoring control. Projects are evidence rows with real imagery, descriptions, tags, and links; the blog is a dark, structured reading list; contact resolves into a high-contrast cobalt field. Light and dark modes share the same geometry and state logic.

**Key Characteristics:**
- Calibrated signal-path storytelling from research to monitoring.
- Cool-white and midnight tonal surfaces with cobalt reserved for state and action.
- Manrope for human-readable hierarchy; JetBrains Mono for instrument labels and evidence links.
- Hairlines, tonal layers, and alignment create depth without shadows.
- Real project, résumé, service, blog, and email destinations remain the source of truth.

## Colors

The palette is cool, high-contrast, and operational: a pale blue-gray canvas carries the portfolio, white surfaces hold evidence, midnight carries the reading list, and cobalt marks action, selection, progress, and focus. Dark mode swaps the neutral ramps and lifts cobalt for legibility while preserving the same signal grammar.

### Primary
- **Calibration Cobalt** (`{colors.accent}`): The primary action, active journey stage, scroll-progress bar, links, and selection signal.
- **Deep Cobalt** (`{colors.accent-strong}`): Hover and pressed state for cobalt actions.
- **Cobalt Wash** (`{colors.accent-soft}`): Secondary-button hover and low-intensity accent field.

### Tertiary
- **Midnight Reading Field** (`{colors.night}`): The blog section's dark reading surface.
- **Night Raised Surface** (`{colors.night-raised}`): Reserved tonal lift for night-mode or dark content surfaces.

### Neutral
- **Cool Canvas** (`{colors.canvas}`): Light page background.
- **Evidence White** (`{colors.surface}`): Cards, controls, system panel, and journey tabs at rest.
- **Quiet Blue-Gray** (`{colors.surface-subtle}`): Image backing, subtle hover fill, and scrollbar track.
- **Graphite Ink** (`{colors.ink}`): Primary text and active navigation.
- **Soft Graphite** (`{colors.ink-soft}`): Paragraphs, inactive controls, and supporting copy.
- **Faint Graphite** (`{colors.ink-faint}`): Metadata, footer text, and low-emphasis labels.
- **Hairline** (`{colors.line}`): Structural dividers and borders.
- **Strong Hairline** (`{colors.line-strong}`): Section and system-control boundaries.
- **Night Ink** (`{colors.night-ink}`): Primary text on the blog field.
- **Night Soft** (`{colors.night-soft}`): Blog metadata and excerpts.
- **Accessible Focus Blue** (`{colors.focus}`): Visible keyboard focus outline.
- **Blog Rules** (`{colors.blog-line}`, `{colors.blog-row-line}`, `{colors.blog-feature-line}`): Dark-section list, row, and featured-entry dividers.
- **Blog Link Cobalt** (`{colors.blog-link}`): The lighter cobalt used by night-field reading links.
- **Contact Soft** (`{colors.contact-soft}`; dark mode `{colors.dark-contact-soft}`): Supporting copy on the cobalt contact field.

Dark mode uses `dark-canvas`, `dark-surface`, `dark-surface-subtle`, `dark-ink-soft`, `dark-ink-faint`, `dark-line`, `dark-line-strong`, `dark-accent`, `dark-accent-strong`, `dark-accent-soft`, `dark-accent-ink`, and `dark-focus` as the corresponding live values.

### Named Rules

**The One Signal Rule.** Cobalt is a state and action signal, not decoration. Keep it concentrated on actions, active tabs, progress, links, and focus.

**The Evidence Rule.** Every visual claim should resolve to existing project, service, résumé, blog, or contact evidence; do not add unsupported outcomes or performance claims.

## Typography

**Display Font:** Manrope (self-hosted `assets/fonts/manrope-latin.woff2`, with Helvetica Neue and sans-serif fallbacks)
**Body Font:** Manrope (the same self-hosted source)
**Label/Mono Font:** JetBrains Mono (self-hosted `assets/fonts/jetbrains-mono-latin.woff2`, with SFMono-Regular, Consolas, and monospace fallbacks)

**Character:** Manrope gives the console a measured, contemporary human voice with strong large-scale numerals and compact headlines. JetBrains Mono is a functional instrument layer: uppercase metadata, stage indices, and evidence links feel like readouts without turning the site into a fake terminal.

### Hierarchy
- **Display** (600, `clamp(64px, 8.2vw, 96px)`, 0.96): The hero identity statement; tight, oversized, and capped at roughly 10 characters per line.
- **Section title** (600, `clamp(48px, 6.4vw, 82px)`, 0.98): Oversized section signposts such as Featured Projects and Latest Blog Posts.
- **Headline** (600, `clamp(30px, 3.3vw, 48px)`, 1.08): Project titles and evidence-led feature headlines.
- **Title** (600, `clamp(28px, 3vw, 42px)`, 1.08): The active system-journey evidence title.
- **Lead** (400, `clamp(17px, 1.5vw, 20px)`, 1.58): Hero explanation, limited to approximately 52ch.
- **Body** (400, 16px, 1.65): Descriptions and supporting copy, generally constrained to 40–66ch for readable measure.
- **Label** (500, 10px, 1.6, `0.08em`): Uppercase stage labels, metadata, and compact instrument readouts.
- **Link** (600, 11px, 1.5, `0.035em`): Uppercase evidence and reading links with a small directional chevron.

### Named Rules

**The Two-Register Rule.** Use Manrope for hierarchy and explanation; use JetBrains Mono only where a compact readout or evidence affordance helps scanning.

**The Compressed Display Rule.** Large headings carry negative tracking only at the established display/headline sizes; body text remains open and readable.

## Layout

The page is a centered, full-width console with a `1280px` maximum content width and horizontal gutters of `clamp(24px, 5vw, 72px)`. The sticky navigation is `72px` tall on desktop. The hero uses a generous top/bottom field (`clamp(72px, 9vw, 126px)` to `clamp(88px, 10vw, 142px)`), with the identity and conversion copy first and the system journey control below. Major sections use vertical padding of `clamp(96px, 11vw, 164px)`.

The system journey is a full-width, line-bounded control: a `50px` mono heading, four equal tabs, and one inline evidence panel. Featured projects are alternating two-column evidence rows: image at left/text at right, then mirrored on even rows. The blog is a dark, four-column reading list with a larger first item; contact is a two-column cobalt field anchored at the bottom edge of its content.

At `1020px`, the hero and evidence panel tighten, panel links move beneath the copy, and blog links move under their title. At `760px`, navigation becomes a two-row `112px` bar with horizontally scrollable links, the hero stacks, journey tabs become a 2×2 grid, project rows become vertical, and contact stacks. At `520px`, gutters become `20px`, action buttons form a compact two-column grid with Services spanning the row, the journey heading stacks, projects use `42px` row padding, and blog rows become block flow. Section scroll margins follow the desktop `88px` and mobile `116px` navigation heights.

## Elevation & Depth

This is a no-shadow system. Depth comes from tonal adjacency and structural rules: cool canvas against white evidence surfaces, midnight against pale content, border strength changes, active cobalt fills, and the scroll-progress line. The sticky navigation uses a translucent canvas with `backdrop-filter: blur(16px)` and gains a hairline only after scrolling; this is atmospheric separation, not a floating card. Do not introduce drop shadows, glows, gradients, or glassmorphism as substitutes for the line-and-tone grammar.

### Named Rules

**The Flat-by-Default Rule.** Surfaces are flat at rest; hierarchy is earned through tone, border, spacing, and alignment.

**The Line Before Lift Rule.** When a boundary or state needs emphasis, strengthen the hairline or apply the cobalt state before considering any additional material effect.

## Shapes

The form language is gently controlled rather than pill-heavy. Primary and secondary actions and the theme toggle use `12px` corners; project media uses `14px`; tags use a compact `6px`; journey panels, rows, and section fields stay square at `0px`. Structural dividers are `1px` hairlines. Images clip to their `14px` media radius and use a `4 / 3` aspect ratio on mobile. There are no decorative blobs, circles, capsules, or ornamental corner treatments.

## Components

### Buttons
- **Shape:** Confident, gently squared controls (`12px` radius) with a `46px` minimum height.
- **Primary:** Calibration Cobalt fill, white text, `0 20px` horizontal padding, 13px/700 Manrope; hover moves to Deep Cobalt and translates upward `1px`.
- **Hover / Focus:** State transitions run over `180ms`; keyboard focus is a `3px` Accessible Focus Blue outline with `4px` offset.
- **Secondary:** Transparent canvas with a Strong Hairline border and Graphite Ink text; hover changes border/text to cobalt and fills with Cobalt Wash.
- **Tertiary:** Transparent, underlined Soft Graphite text with `0 10px` padding; hover changes text to cobalt without adding a box.

### Chips
- **Style:** Project tags are transparent, outlined by Strong Hairline, Graphite Faint text, JetBrains Mono uppercase at 10px, with `4px 8px` padding and `6px` corners.
- **State:** Tags are descriptive evidence metadata, not interactive filters; keep them quiet and never style them as bright badges.

### Cards / Containers
- **Corner Style:** The project “card” is a full-width evidence row with no outer radius; its media has `14px` corners.
- **Background:** Project rows inherit Cool Canvas; media rests on Quiet Blue-Gray; journey tabs/panel use Evidence White.
- **Shadow Strategy:** None. Use tonal layering and hairlines from Elevation & Depth.
- **Border:** A Strong Hairline starts the project list; Hairlines divide rows and journey controls.
- **Internal Padding:** Project rows use `clamp(52px, 6vw, 88px)` vertical padding; journey panel uses `clamp(32px, 4vw, 56px)`.

### Navigation
- **Style:** Sticky, translucent canvas navigation at `72px` desktop height; Fisher Lok is 20px/700 Manrope and links are 13px/600 Manrope.
- **States:** Inactive links use Soft Graphite; hover/active links use Graphite Ink with a 2px cobalt underline that grows from the left. The theme toggle is a 44px square control.
- **Mobile:** At `760px` the logo occupies a 48px row, links occupy a 64px horizontally scrollable row, and Home/Contact become available in the optional mobile navigation.

### Project Evidence Row
Each row pairs real project media with the existing title, description, tags, and external/internal evidence links. Even rows mirror the image/text sides. Links are JetBrains Mono uppercase with a small chevron; never turn a project row into a generic SaaS card with fabricated metrics.

### Blog List
The blog is a midnight reading field with one enlarged first article and compact subsequent rows. Metadata is Night Soft mono uppercase; titles are Night Ink Manrope; excerpts are Night Soft. Read links use a lighter cobalt and keep the same chevron convention.

### System-Journey Signature
The Research, Data, Execution, and Monitoring stages form a four-tab control, not a dashboard widget. Each tab shows a two-digit mono index and becomes a cobalt block when active. The single evidence panel exposes the stage number, real title/description, and only the links carried by the demo data. On activation, the panel uses the `evidence-reveal` motion (420ms cubic-bezier), with a `clip-path` reveal and 8px upward settle; reduced motion disables the reveal.

## Do's and Don'ts

### Do:
- **Do** lead with Fisher Lok’s existing identity, services, experience, projects, writing, and email destination.
- **Do** use the calibrated signal path to explain the research-to-deployment range.
- **Do** keep Manrope and JetBrains Mono in their established display/body versus instrument-label roles.
- **Do** use cobalt for action, active state, links, progress, and focus; keep its area intentionally limited.
- **Do** preserve line-led, no-shadow tonal depth and the `1020px`, `760px`, and `520px` responsive behavior.
- **Do** honor keyboard focus, semantic tab behavior, and `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** introduce bookstore/editorial warmth, parchment, brick-red, or gold.
- **Don't** imitate Apple or reuse Apple-like product-gallery language.
- **Don't** turn the site into generic SaaS cards, a fake terminal, or a dashboard.
- **Don't** add cyberpunk glow, gradients, decorative shadows, or ornamental glass effects.
- **Don't** fabricate clients, testimonials, trading returns, performance figures, deployments, or commercial outcomes.
- **Don't** replace evidence rows or the blog list with empty marketing claims.
