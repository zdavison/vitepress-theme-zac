# VitePress Theme Zac — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an npm-distributable VitePress theme that applies the zac.ooo lofi aesthetic (DM Sans + JetBrains Mono, hatch shadows, monochrome palette, sharp corners) on top of VitePress's default theme.

**Architecture:** Extend VitePress's DefaultTheme via the `extends` API. Override CSS custom properties for colors, fonts, and spacing. Add a minimal ZacLayout.vue wrapper. Ship as an npm package with peer dependency on vitepress.

**Tech Stack:** VitePress 1.6.x, Vue 3, tsup (build), TypeScript, CSS custom properties

---

## File Structure

```
vitepress-theme-zac/
├── src/
│   ├── index.ts                    # Theme entry point
│   ├── styles/
│   │   ├── vars.css                # VitePress CSS variable overrides
│   │   ├── base.css                # Font imports, prose, global resets
│   │   ├── components.css          # Nav, sidebar, code block, container overrides
│   │   └── hatch.css               # Hatch shadow utility
│   └── components/
│       └── ZacLayout.vue           # Minimal layout wrapper
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── demo/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   │       └── index.ts
│   ├── index.md
│   ├── guide/
│   │   └── getting-started.md
│   └── examples/
│       └── components.md
└── .gitignore
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsup.config.ts`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "vitepress-theme-zac",
  "version": "0.1.0",
  "description": "A lofi VitePress theme inspired by zac.ooo",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles/*": "./dist/styles/*"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "vitepress dev demo",
    "demo:build": "vitepress build demo",
    "demo:preview": "vitepress preview demo"
  },
  "peerDependencies": {
    "vitepress": ">=1.0.0",
    "vue": ">=3.3.0"
  },
  "dependencies": {
    "@fontsource-variable/dm-sans": "^5.0.0",
    "@fontsource-variable/jetbrains-mono": "^5.0.0"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "vitepress": "^1.6.0",
    "vue": "^3.5.0"
  },
  "license": "MIT"
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "demo"]
}
```

- [ ] **Step 3: Create tsup.config.ts**

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['vitepress', 'vue'],
  outDir: 'dist',
  // Copy CSS files to dist/styles/
  async onSuccess() {
    const { cpSync, mkdirSync } = await import('fs')
    mkdirSync('dist/styles', { recursive: true })
    cpSync('src/styles', 'dist/styles', { recursive: true })
  },
})
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
demo/.vitepress/cache/
demo/.vitepress/dist/
*.local
```

- [ ] **Step 5: Install dependencies**

Run: `npm install`

Expected: Clean install, lock file created.

- [ ] **Step 6: Commit**

```bash
git add package.json tsconfig.json tsup.config.ts .gitignore package-lock.json
git commit -m "chore: scaffold project with tsup build"
```

---

### Task 2: CSS Variables Override (vars.css)

**Files:**
- Create: `src/styles/vars.css`

- [ ] **Step 1: Create vars.css with VitePress custom property overrides**

```css
/*
 * VitePress CSS variable overrides
 * Maps VitePress's default theme to the zac.ooo lofi palette
 */

:root {
  /* ── Backgrounds ── */
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f9f9f9;
  --vp-c-bg-elv: #ffffff;
  --vp-c-bg-soft: #f5f5f5;

  /* ── Text ── */
  --vp-c-text-1: #1a1a1a;
  --vp-c-text-2: #6b6b6b;
  --vp-c-text-3: #999999;

  /* ── Borders & Dividers ── */
  --vp-c-border: rgba(0, 0, 0, 0.12);
  --vp-c-divider: rgba(0, 0, 0, 0.08);
  --vp-c-gutter: rgba(0, 0, 0, 0.08);

  /* ── Brand (grayscale, no colored accents) ── */
  --vp-c-brand-1: #1a1a1a;
  --vp-c-brand-2: #333333;
  --vp-c-brand-3: #555555;
  --vp-c-brand-soft: rgba(0, 0, 0, 0.06);

  /* ── Default ── */
  --vp-c-default-1: #6b6b6b;
  --vp-c-default-2: #555555;
  --vp-c-default-3: #444444;
  --vp-c-default-soft: rgba(0, 0, 0, 0.04);

  /* ── Tip / Note (muted gray, not colored) ── */
  --vp-c-tip-1: #555555;
  --vp-c-tip-2: #444444;
  --vp-c-tip-3: #333333;
  --vp-c-tip-soft: rgba(0, 0, 0, 0.04);

  --vp-c-note-1: #555555;
  --vp-c-note-2: #444444;
  --vp-c-note-3: #333333;
  --vp-c-note-soft: rgba(0, 0, 0, 0.04);

  /* ── Warning (slightly warm gray) ── */
  --vp-c-warning-1: #6b5c00;
  --vp-c-warning-2: #594d00;
  --vp-c-warning-3: #473d00;
  --vp-c-warning-soft: rgba(107, 92, 0, 0.06);

  /* ── Danger (slightly cool gray) ── */
  --vp-c-danger-1: #8b0000;
  --vp-c-danger-2: #750000;
  --vp-c-danger-3: #5f0000;
  --vp-c-danger-soft: rgba(139, 0, 0, 0.06);

  /* ── Success ── */
  --vp-c-success-1: #1a5c1a;
  --vp-c-success-2: #154e15;
  --vp-c-success-3: #104010;
  --vp-c-success-soft: rgba(26, 92, 26, 0.06);

  /* ── Important ── */
  --vp-c-important-1: #3a3a5c;
  --vp-c-important-2: #30304e;
  --vp-c-important-3: #262640;
  --vp-c-important-soft: rgba(58, 58, 92, 0.06);

  /* ── Caution ── */
  --vp-c-caution-1: #8b0000;
  --vp-c-caution-2: #750000;
  --vp-c-caution-3: #5f0000;
  --vp-c-caution-soft: rgba(139, 0, 0, 0.06);

  /* ── Typography ── */
  --vp-font-family-base: "DM Sans Variable", "DM Sans", "Inter", ui-sans-serif,
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  --vp-font-family-mono: "JetBrains Mono Variable", "JetBrains Mono",
    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;

  /* ── Code ── */
  --vp-code-font-size: 0.85em;
  --vp-code-color: #1a1a1a;
  --vp-code-bg: rgba(0, 0, 0, 0.04);
  --vp-code-block-bg: #fafafa;
  --vp-code-block-color: #1a1a1a;
  --vp-code-line-highlight-color: rgba(0, 0, 0, 0.04);
  --vp-code-line-diff-add-color: rgba(26, 92, 26, 0.08);
  --vp-code-line-diff-remove-color: rgba(139, 0, 0, 0.08);
  --vp-code-tab-text-color: #6b6b6b;
  --vp-code-tab-active-text-color: #1a1a1a;
  --vp-code-tab-active-bar-color: #1a1a1a;
  --vp-code-copy-code-hover-bg: rgba(0, 0, 0, 0.04);
  --vp-code-copy-code-active-text: #1a1a1a;

  /* ── Buttons (grayscale) ── */
  --vp-button-brand-border: #1a1a1a;
  --vp-button-brand-text: #ffffff;
  --vp-button-brand-bg: #1a1a1a;
  --vp-button-brand-hover-border: #333333;
  --vp-button-brand-hover-text: #ffffff;
  --vp-button-brand-hover-bg: #333333;
  --vp-button-brand-active-border: #555555;
  --vp-button-brand-active-text: #ffffff;
  --vp-button-brand-active-bg: #555555;

  --vp-button-alt-border: rgba(0, 0, 0, 0.12);
  --vp-button-alt-text: #1a1a1a;
  --vp-button-alt-bg: #f5f5f5;
  --vp-button-alt-hover-border: rgba(0, 0, 0, 0.2);
  --vp-button-alt-hover-text: #1a1a1a;
  --vp-button-alt-hover-bg: #ebebeb;

  /* ── Shadows (subtle, minimal) ── */
  --vp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04);
  --vp-shadow-2: 0 2px 4px rgba(0, 0, 0, 0.06);
  --vp-shadow-3: 0 4px 8px rgba(0, 0, 0, 0.06);
  --vp-shadow-4: 0 6px 12px rgba(0, 0, 0, 0.06);
  --vp-shadow-5: 0 8px 16px rgba(0, 0, 0, 0.06);

  /* ── Home page hero ── */
  --vp-home-hero-name-color: #1a1a1a;

  /* ── Custom blocks ── */
  --vp-custom-block-font-size: 0.85rem;
  --vp-custom-block-code-font-size: 0.8rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/vars.css
git commit -m "feat: add CSS variable overrides for lofi palette"
```

---

### Task 3: Base Styles (base.css)

**Files:**
- Create: `src/styles/base.css`

- [ ] **Step 1: Create base.css with font imports and prose overrides**

```css
/*
 * Font imports and global base styles
 */

@import "@fontsource-variable/dm-sans";
@import "@fontsource-variable/jetbrains-mono";

/* ── Prose body sizing ── */
.vp-doc p,
.vp-doc li,
.vp-doc ul,
.vp-doc ol {
  font-size: 0.85rem;
  line-height: 1.6;
}

/* ── Inline code ── */
.vp-doc :not(pre) > code {
  padding: 0.15em 0.35em;
  border-radius: 0.25rem;
  font-size: 0.85em;
}

/* ── Code blocks ── */
.vp-doc div[class*="language-"] {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.25rem;
}

/* ── Scrollbar (thin, subtle) ── */
.vp-doc ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.vp-doc ::-webkit-scrollbar-thumb {
  background-color: #999999;
}

/* ── Sharp corners everywhere ── */
.VPButton,
.VPBadge,
.vp-doc div[class*="language-"],
.vp-doc .custom-block,
.VPFeature,
.VPNavBarSearch .search-input,
.VPLocalSearchBox .search-input {
  border-radius: 0.25rem !important;
}

/* ── Tables ── */
.vp-doc table {
  font-size: 0.85rem;
}

.vp-doc th,
.vp-doc td {
  border-color: rgba(0, 0, 0, 0.08);
}

/* ── Headings ── */
.vp-doc h1,
.vp-doc h2,
.vp-doc h3 {
  font-weight: 800;
  letter-spacing: -0.02em;
}

.vp-doc h1 {
  font-size: 1.75rem;
}

/* ── Links ── */
.vp-doc a {
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

/* ── Blockquotes ── */
.vp-doc blockquote {
  border-left: 2px solid rgba(0, 0, 0, 0.15);
  color: #6b6b6b;
  font-size: 0.85rem;
}

/* ── HR ── */
.vp-doc hr {
  border-color: rgba(0, 0, 0, 0.08);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/base.css
git commit -m "feat: add base styles with font imports and prose overrides"
```

---

### Task 4: Hatch Shadow Utility (hatch.css)

**Files:**
- Create: `src/styles/hatch.css`

- [ ] **Step 1: Create hatch.css**

```css
/*
 * Hatch shadow — the signature visual effect from zac.ooo
 * A diagonal-line comic-book shadow using a repeating linear gradient.
 */

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
    #999999 0px,
    #999999 1px,
    transparent 1px,
    transparent 4px
  );
  border-radius: inherit;
  pointer-events: none;
  opacity: 0.3;
  transition:
    top 0.15s ease,
    left 0.15s ease,
    opacity 0.15s ease;
}

.hatch-shadow:hover::after {
  top: 6px;
  left: 6px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/hatch.css
git commit -m "feat: add hatch shadow utility class"
```

---

### Task 5: Component Style Overrides (components.css)

**Files:**
- Create: `src/styles/components.css`

- [ ] **Step 1: Create components.css with nav, sidebar, and custom block overrides**

```css
/*
 * VitePress component style overrides
 * Applies the lofi aesthetic to built-in VitePress components.
 */

/* ── Navigation ── */

/* Active nav link uses hatch-pattern underline */
.VPNavBarMenuLink.active::after,
.VPNavScreenMenuLink.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: repeating-linear-gradient(
    45deg,
    #999999 0px,
    #999999 1px,
    transparent 1px,
    transparent 4px
  );
}

.VPNavBarMenuLink.active,
.VPNavScreenMenuLink.active {
  position: relative;
  color: var(--vp-c-text-1);
}

/* Remove default VitePress active color */
.VPNavBarMenuLink.active:hover {
  color: var(--vp-c-text-1);
}

/* Nav separator lines */
.VPNav .divider,
.VPNavBar .divider {
  background-color: rgba(0, 0, 0, 0.08);
}

/* ── Sidebar ── */

/* Active sidebar item: bold, not colored */
.VPSidebarItem.is-active > .item > .link > .text {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* Sidebar link hover */
.VPSidebarItem .link:hover .text {
  color: var(--vp-c-text-1);
}

/* Sidebar border */
.VPSidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

/* ── Custom Blocks ── */

/* All custom blocks: thin left border, no colored fills */
.vp-doc .custom-block {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 3px solid;
  background-color: transparent;
  padding: 1rem 1.25rem;
}

.vp-doc .custom-block.info,
.vp-doc .custom-block.note {
  border-left-color: #999999;
}

.vp-doc .custom-block.tip {
  border-left-color: #666666;
}

.vp-doc .custom-block.warning {
  border-left-color: #6b5c00;
}

.vp-doc .custom-block.danger,
.vp-doc .custom-block.caution {
  border-left-color: #8b0000;
}

/* Details blocks get hatch shadow */
.vp-doc .custom-block.details {
  position: relative;
}

.vp-doc .custom-block.details::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: repeating-linear-gradient(
    45deg,
    #999999 0px,
    #999999 1px,
    transparent 1px,
    transparent 4px
  );
  border-radius: inherit;
  pointer-events: none;
  opacity: 0.3;
  transition:
    top 0.15s ease,
    left 0.15s ease,
    opacity 0.15s ease;
}

.vp-doc .custom-block.details:hover::after {
  top: 6px;
  left: 6px;
}

/* Custom block title */
.vp-doc .custom-block-title {
  font-weight: 700;
  font-size: 0.85rem;
}

/* ── Feature cards on home page ── */
.VPFeature {
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  background-color: transparent !important;
  transition: border-color 0.15s ease;
}

.VPFeature:hover {
  border-color: rgba(0, 0, 0, 0.3) !important;
}

/* ── Footer ── */
.VPFooter {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

/* ── Content container ── */
.VPDoc .container .content {
  max-width: 768px;
}

/* ── Badge ── */
.VPBadge {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

/* ── Outline / ToC ── */
.VPDocAsideOutline .outline-link {
  font-size: 0.8rem;
}

.VPDocAsideOutline .outline-link.active {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/components.css
git commit -m "feat: add component style overrides for nav, sidebar, blocks"
```

---

### Task 6: Layout Component (ZacLayout.vue)

**Files:**
- Create: `src/components/ZacLayout.vue`

- [ ] **Step 1: Create ZacLayout.vue**

```vue
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </Layout>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ZacLayout.vue
git commit -m "feat: add ZacLayout wrapper component"
```

---

### Task 7: Theme Entry Point (index.ts)

**Files:**
- Create: `src/index.ts`

- [ ] **Step 1: Create the theme entry point**

```ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ZacLayout from './components/ZacLayout.vue'
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'
import './styles/hatch.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: ZacLayout,
}

export default theme
```

- [ ] **Step 2: Build to verify everything compiles**

Run: `npx tsup`

Expected: Clean build, `dist/` folder created with `index.js`, `index.d.ts`, and `styles/` directory.

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: add theme entry point"
```

---

### Task 8: Demo Site

**Files:**
- Create: `demo/.vitepress/config.ts`
- Create: `demo/.vitepress/theme/index.ts`
- Create: `demo/index.md`
- Create: `demo/guide/getting-started.md`
- Create: `demo/examples/components.md`

- [ ] **Step 1: Create demo VitePress config**

```ts
// demo/.vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Theme Zac Demo',
  description: 'Demo site for vitepress-theme-zac',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Examples', link: '/examples/components' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Components', link: '/examples/components' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],
  },
})
```

- [ ] **Step 2: Create demo theme entry that uses the local theme**

```ts
// demo/.vitepress/theme/index.ts
import Theme from '../../../src/index'

export default Theme
```

- [ ] **Step 3: Create demo home page**

```md
---
layout: home
hero:
  name: Theme Zac
  text: A lofi VitePress theme
  tagline: Minimal, sharp, monochrome — inspired by zac.ooo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Examples
      link: /examples/components
features:
  - title: Lofi Palette
    details: Black, white, and grays. No distracting colors — just content.
  - title: Hatch Shadows
    details: Distinctive diagonal-line shadow effect from zac.ooo.
  - title: DM Sans + JetBrains Mono
    details: Clean sans-serif body text with monospace code.
---
```

- [ ] **Step 4: Create demo guide page**

```md
# Getting Started

## Installation

Install the theme as a dependency:

```bash
npm install vitepress-theme-zac
```

## Usage

Create or update `.vitepress/theme/index.ts`:

```ts
import Theme from 'vitepress-theme-zac'
export default Theme
```

That's it. The theme applies automatically.

## What You Get

- **Lofi color palette** — monochrome, high contrast
- **DM Sans** for body text, **JetBrains Mono** for code
- **Sharp corners** (0.25rem radius)
- **Hatch shadows** on details blocks
- **Thin borders** with subtle transparency

## Code Example

Here's some inline code: `const x = 42`

And a code block:

```ts
interface Config {
  title: string
  description?: string
  theme: 'lofi'
}

function setup(config: Config) {
  return {
    ...config,
    ready: true,
  }
}
```

## Tables

| Feature | Status |
|---------|--------|
| Lofi palette | Done |
| Hatch shadows | Done |
| Custom fonts | Done |
| Dark mode | Not yet |
```

- [ ] **Step 5: Create demo components showcase page**

````md
# Component Showcase

This page demonstrates all styled VitePress elements.

## Custom Containers

::: info
This is an info block with a thin left border.
:::

::: tip
This is a tip with slightly darker emphasis.
:::

::: warning
This is a warning — note the warm-toned border.
:::

::: danger
This is a danger block for critical information.
:::

::: details Click to expand
This details block has a **hatch shadow** behind it. Hover to see it shift.

```ts
const hidden = 'revealed'
```
:::

## Badges

Some text with a <Badge type="info" text="info" /> badge.

And a <Badge type="tip" text="tip" /> badge.

And a <Badge type="warning" text="warning" /> badge.

And a <Badge type="danger" text="danger" /> badge.

## Code Blocks

Inline: `npm install vitepress-theme-zac`

```js
// JavaScript
function greet(name) {
  console.log(`Hello, ${name}!`)
}
```

```css
/* CSS */
.hatch-shadow::after {
  background: repeating-linear-gradient(
    45deg,
    #999 0px,
    #999 1px,
    transparent 1px,
    transparent 4px
  );
}
```

```diff
- old code
+ new code
```

## Typography

Regular paragraph text at 0.85rem. Clean and readable without being oversized.

**Bold text** and *italic text* and `inline code` and [a link](#).

> Blockquotes are muted with a thin left border.

---

### Heading 3

#### Heading 4

## Lists

- Unordered list item
- Another item
  - Nested item
  - Another nested item

1. Ordered list
2. Second item
3. Third item

## Table

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page title |
| `theme` | `'lofi'` | `'lofi'` | Color theme |
| `shadow` | `boolean` | `false` | Enable hatch shadow |

## Hatch Shadow

Use the `.hatch-shadow` class on any element:

```html
<div class="hatch-shadow" style="padding: 1rem; border: 1px solid rgba(0,0,0,0.1); border-radius: 0.25rem;">
  This box has a hatch shadow
</div>
```
````

- [ ] **Step 6: Start the dev server and verify visually**

Run: `npm run dev`

Expected: Dev server starts. Open in browser and verify:
- DM Sans font on body text
- JetBrains Mono on code blocks
- Monochrome palette (no blue/purple accents)
- Sharp corners (0.25rem)
- Hatch shadow on details block
- Hatch-pattern active nav underline
- Thin borders on code blocks and custom containers

- [ ] **Step 7: Commit**

```bash
git add demo/
git commit -m "feat: add demo site with guide and component showcase"
```

---

### Task 9: Build Verification & Final Polish

**Files:**
- Possibly modify: `src/styles/components.css`, `src/styles/base.css`, `src/styles/vars.css`

- [ ] **Step 1: Run the full build**

Run: `npm run build`

Expected: Clean build. `dist/` contains `index.js`, `index.d.ts`, and `styles/` directory with all 4 CSS files.

- [ ] **Step 2: Verify demo builds against dist**

Run: `npm run demo:build`

Expected: Clean build of the demo site.

- [ ] **Step 3: Fix any visual issues found during demo testing**

Review the running demo site for:
- Correct fonts loading (check DevTools > Network)
- No VitePress default blue/purple leaking through
- Sharp corners on all interactive elements
- Readable prose at 0.85rem
- Hatch shadow rendering and hover animation

Fix any issues in the appropriate CSS file.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: build verification and polish"
```
