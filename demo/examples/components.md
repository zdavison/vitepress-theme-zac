# Components

A showcase of styled VitePress elements using vitepress-theme-zac.

---

## Custom Containers

::: info Info
This is an **info** container. Use it for general notes.
:::

::: tip Tip
This is a **tip** container. Great for helpful hints.
:::

::: warning Warning
This is a **warning** container. Use it to flag potential issues.
:::

::: danger Danger
This is a **danger** container. Use it for critical warnings.
:::

::: details Click to expand
This is a **details** container with a code block inside:

```ts
const theme = 'lofi'
console.log(`Using theme: ${theme}`)
```
:::

---

## Badges

Badges render inline: <Badge type="info" text="info" /> <Badge type="tip" text="tip" /> <Badge type="warning" text="warning" /> <Badge type="danger" text="danger" />

Use them next to headings or inline in text to indicate status or type.

---

## Code Blocks

Inline code: `const x = 42`

JavaScript:

```js
function greet(name) {
  return `Hello, ${name}!`
}

greet('world')
```

CSS:

```css
.hatch-shadow {
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.08);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
}
```

Diff:

```diff
- background: #3451b2;
+ background: #000;
- border-radius: 8px;
+ border-radius: 0.25rem;
```

---

## Typography

A regular paragraph with **bold text**, _italic text_, `inline code`, and a [link to the guide](/guide/getting-started).

> This is a blockquote. Use it to call out quotes or important passages from other sources.

---

### Heading Level 3

#### Heading Level 4

---

## Lists

Unordered list:

- First item
- Second item
  - Nested item A
  - Nested item B
- Third item

Ordered list:

1. Step one
2. Step two
3. Step three

---

## Table

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | The page title shown in the browser tab |
| `description` | `string` | `undefined` | Meta description for SEO |
| `theme` | `'lofi'` | `'lofi'` | The visual theme variant |
| `sidebar` | `boolean` | `true` | Whether to show the sidebar |

---

## Hatch Shadow

The `.hatch-shadow` utility class applies a distinctive diagonal-line shadow effect:

```html
<div class="hatch-shadow" style="padding: 1rem; border: 1px solid #000;">
  This box uses the hatch shadow effect.
</div>
```

<div class="hatch-shadow" style="padding: 1rem; border: 1px solid currentColor; display: inline-block; margin-top: 0.5rem;">
  This box uses the hatch shadow effect.
</div>
