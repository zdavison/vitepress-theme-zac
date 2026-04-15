import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ZacLayout from './components/ZacLayout.vue'

// CSS overrides — imported AFTER DefaultTheme so ours win on equal specificity
// Font imports are in styles/fonts.css (CSS @import) so they go through
// Vite's CSS pipeline and don't break Node.js SSR.
import './styles/fonts.css'
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'
import './styles/hatch.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: ZacLayout,
}

export default theme
