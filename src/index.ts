import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ZacLayout from './components/ZacLayout.vue'

// Font imports — must be JS imports so Vite resolves the woff2 files
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/jetbrains-mono'

// CSS overrides — imported AFTER DefaultTheme so ours win on equal specificity
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'
import './styles/hatch.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: ZacLayout,
}

export default theme
