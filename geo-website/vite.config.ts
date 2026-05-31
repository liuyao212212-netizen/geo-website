import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { writeFileSync, readFileSync, readdirSync, statSync } from 'fs'

// Post-build: replace absolute /images/ paths with relative ./images/
function replaceImagePathsPlugin() {
  return {
    name: 'replace-image-paths',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const replacements: [RegExp, string][] = [
        [/["']\/images\//g, '"./images/'],
        [/\(\/images\//g, '("./images/'],
        [/url\(\/images\//g, 'url(./images/'],
        [/url\(['"]\/images\//g, "url('./images/"],
      ]
      function walk(dir: string) {
        for (const f of readdirSync(dir)) {
          const fp = resolve(dir, f)
          const st = statSync(fp)
          if (st.isDirectory()) { walk(fp); continue }
          if (!/\.(html|js|css)$/.test(f)) continue
          let content = readFileSync(fp, 'utf-8')
          let changed = false
          for (const [re, rep] of replacements) {
            if (re.test(content)) {
              content = content.replace(re, rep)
              changed = true
            }
          }
          if (changed) writeFileSync(fp, content)
        }
      }
      walk(distDir)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), replaceImagePathsPlugin()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
