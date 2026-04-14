import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Theme Zac Demo',
  description: 'Demo site for vitepress-theme-zac',
  markdown: {
    theme: 'github-light',
  },
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
