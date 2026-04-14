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
