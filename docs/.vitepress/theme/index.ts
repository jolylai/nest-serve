import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {},
} as Theme
