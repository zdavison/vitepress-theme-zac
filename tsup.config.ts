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
