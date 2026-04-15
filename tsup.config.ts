import { defineConfig } from 'tsup'
import vue from 'esbuild-plugin-vue3'

export default defineConfig({
  esbuildPlugins: [vue()],
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['vitepress', 'vue', /\.css$/],
  outDir: 'dist',
  // Copy CSS files to dist/styles/ so the external imports resolve at consume-time
  async onSuccess() {
    const { cpSync, mkdirSync } = await import('fs')
    mkdirSync('dist/styles', { recursive: true })
    cpSync('src/styles', 'dist/styles', { recursive: true })
  },
})
