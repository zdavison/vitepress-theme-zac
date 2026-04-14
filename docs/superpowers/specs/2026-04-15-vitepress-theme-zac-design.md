# VitePress Theme Zac — Design Spec

## Overview

An npm-distributed VitePress theme that applies the zac.ooo visual style to developer documentation sites. Built by extending VitePress's default theme with CSS custom property overrides and minimal component wrapping.

**Primary use case:** Reusable theme for the author's own project documentation, installed as an npm package.

## Design Principles

Carried over from zac.ooo:

- **Lofi aesthetic** — black/white/gray palette, no bright accent colors
- **DM Sans Variable + JetBrains Mono Variable** font pairing
- **Sharp corners** — 0.25rem border radius everywhere
- **Thin transparent borders** — subtle dividers using oklch with low opacity
- **Hatch shadows** — diagonal-line comic-book shadow effect (45deg repeating gradient)
- **Small prose** — 0.85rem body text for density without sacrificing readability
- **Content-first** — minimal decoration, maximum readability

## Package Structure

```
vitepress-theme-zac/
├── src/
│   ├── index.ts              # Theme entry — extends default, registers components
│   ├── styles/
│   │   ├── vars.css           # VitePress CSS custom property overrides
│   │   ├── base.css           # Font imports, global resets, prose styling
│   │   ├── components.css     # Nav, sidebar, card, badge overrides
│   │   └── hatch.css          # Hatch shadow utility class
│   └── components/
│       └── ZacLayout.vue      # Wraps DefaultTheme.Layout
├── package.json               # npm package, peer dep on vitepress
├── tsconfig.json
└── demo/                      # Local VitePress site for dev/testing
    ├── .vitepress/
    │   ├── config.ts
    │   └── theme/
    │       └── index.ts
    ├── index.md
    ├── guide/
    │   └── getting-started.md
    └── examples/
        └── components.md
```

## Consumer Usage

```ts
// .vitepress/theme/index.ts
import Theme from 'vitepress-theme-zac'
export default Theme
```

That's it. No additional configuration required for the base style.

## Architecture: Extend Default Theme

The theme extends VitePress's `DefaultTheme` rather than building from scratch. This preserves all built-in functionality: sidebar navigation, search, table of contents, mobile menu, prev/next links, and markdown extensions.

### Theme Entry (src/index.ts)

```ts
import DefaultTheme from 'vitepress/theme'
import ZacLayout from './components/ZacLayout.vue'
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'
import './styles/hatch.css'

export default {
  extends: DefaultTheme,
  Layout: ZacLayout,
}
```

### ZacLayout.vue

Minimal wrapper around `DefaultTheme.Layout`. Responsibilities:

- Renders `DefaultTheme.Layout` with all its slots
- Provides mounting point for global style effects
- No structural changes to the default layout

No other component overrides initially. Sidebar, nav, ToC, and search are styled purely through CSS.

## Styling Strategy

### vars.css — CSS Custom Property Overrides

VitePress exposes CSS custom properties under `--vp-*`. We override these to establish the lofi palette:

| Property | Value | Purpose |
|---|---|---|
| `--vp-c-bg` | `#ffffff` | Page background |
| `--vp-c-bg-soft` | `#f9f9f9` | Sidebar, code block backgrounds |
| `--vp-c-bg-mute` | `#f1f1f1` | Muted backgrounds |
| `--vp-c-text-1` | `#1a1a1a` | Primary text (near-black) |
| `--vp-c-text-2` | `#6b6b6b` | Secondary/muted text |
| `--vp-c-text-3` | `#999999` | Tertiary text |
| `--vp-c-divider` | `rgba(0, 0, 0, 0.08)` | Borders and dividers |
| `--vp-c-brand-1` | `#1a1a1a` | Brand color (grayscale) |
| `--vp-c-brand-2` | `#333333` | Brand hover |
| `--vp-c-brand-3` | `#555555` | Brand active |
| `--vp-font-family-base` | `"DM Sans Variable", sans-serif` | Body font |
| `--vp-font-family-mono` | `"JetBrains Mono Variable", monospace` | Code font |
| `--vp-border-radius` | `0.25rem` | Global corner radius |

### base.css — Fonts and Global Resets

- Import `@fontsource-variable/dm-sans` and `@fontsource-variable/jetbrains-mono`
- Set body font-size base for prose (0.85rem)
- Override VitePress prose line-height to 1.6
- Thin scrollbar styling matching zac.ooo

### components.css — Component Style Overrides

**Navigation:**
- Active link indicator uses hatch-pattern stripe (45deg repeating gradient) instead of VitePress's default colored underline
- Nav separator lines with low-opacity borders

**Sidebar:**
- Subtle border-right instead of background differentiation
- Active item uses bold weight, not colored highlight

**Code blocks:**
- Thin 1px border with low opacity
- Subtle oklch-based background tint
- JetBrains Mono at 0.85em
- Inline code gets light background with 0.25rem radius

**Custom containers (info/warning/tip/danger/details):**
- Thin left border instead of colored background fills
- Monochrome palette — varying gray intensities
- `::: details` blocks get hatch shadow
- No bright blues/yellows/reds

**Content area:**
- Max-width container for readable line lengths
- Card-like bordered sections where appropriate

### hatch.css — Hatch Shadow Utility

The signature visual element from zac.ooo:

```css
.hatch-shadow {
  position: relative;
}

.hatch-shadow::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: repeating-linear-gradient(
    45deg,
    #999 0px,
    #999 1px,
    transparent 1px,
    transparent 4px
  );
  border-radius: inherit;
  pointer-events: none;
  opacity: 0.3;
  transition: top 0.15s ease, left 0.15s ease, opacity 0.15s ease;
}

.hatch-shadow:hover::after {
  top: 6px;
  left: 6px;
}
```

Applied via CSS to:
- Custom container `::: details` blocks
- Any elements the user adds `.hatch-shadow` to manually

## Font Dependencies

Bundled as npm dependencies (not peer deps):

- `@fontsource-variable/dm-sans`
- `@fontsource-variable/jetbrains-mono`

These are imported in `base.css` so consumers don't need to install or configure fonts.

## Demo Site

A local VitePress site under `demo/` for development and visual testing:

- `index.md` — Home page using VitePress hero/features layout
- `guide/getting-started.md` — Sample doc page with headings, code blocks, lists, tables
- `examples/components.md` — Showcase of all styled elements: custom containers, code blocks, badges, hatch shadows

The demo uses the theme via a local file reference in its `.vitepress/theme/index.ts`.

## Build & Distribution

- **Build tool:** `tsup` for bundling (simple, handles CSS + TS well)
- **Package exports:** Main entry point at `src/index.ts`, CSS files included
- **Peer dependency:** `vitepress` (user provides their own version)
- **Dev dependency:** `vitepress` (for the demo site and type checking)

## Not In Scope

- Dark mode (light only to start)
- Custom Vue components beyond the layout wrapper
- Link preview tooltips (zac.ooo-specific, not relevant for docs)
- DaisyUI dependency (visual principles extracted, not the framework)
- Tailwind CSS dependency (pure CSS overrides)
- Search customization (use VitePress default)
- Whiteboard or interactive features
