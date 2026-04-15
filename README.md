# vitepress-theme-zac

A lofi, monochrome VitePress theme. Sharp corners, hatch shadows, DM Sans + JetBrains Mono.

**[Live Demo](https://zdavison.github.io/vitepress-theme-zac/)**

## Install

```sh
npm install vitepress-theme-zac
```

Peer dependencies: `vitepress >= 1.0.0`, `vue >= 3.3.0`.

## Setup

### 1. Create theme file

Create `.vitepress/theme/index.ts`:

```ts
import Theme from 'vitepress-theme-zac'
export default Theme
```

### 2. Update VitePress config

Add the following to `.vitepress/config.ts`:

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    theme: 'github-light',
  },

  vite: {
    ssr: {
      noExternal: ['vitepress-theme-zac'],
    },
  },
})
```

The `ssr.noExternal` entry is **required** — without it, Node.js will attempt to import the theme's CSS files directly during the SSR build pass, which fails. This tells Vite to bundle the theme (including its CSS) through its own pipeline instead.

## Features

- Monochrome palette (black, white, grays — no color accents)
- DM Sans Variable (body) + JetBrains Mono Variable (code)
- Sharp corners (0.25rem border-radius)
- Hatch shadows on feature cards and details blocks
- Light mode only (dark mode toggle is hidden)
- Extends `DefaultTheme` — all standard VitePress features work

## Hatch shadow utility

The theme provides a `.hatch-shadow` CSS class:

```html
<div class="hatch-shadow" style="padding: 1rem; border: 1px solid currentColor;">
  Content with diagonal-line shadow
</div>
```

## Individual style imports

You can import styles individually if needed:

```ts
import 'vitepress-theme-zac/styles/vars.css'
import 'vitepress-theme-zac/styles/base.css'
import 'vitepress-theme-zac/styles/components.css'
import 'vitepress-theme-zac/styles/hatch.css'
import 'vitepress-theme-zac/styles/fonts.css'
```

## License

MIT
