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
