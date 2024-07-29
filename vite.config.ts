// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Estendendo os tipos do Vite
declare module 'vite' {
  export interface UserConfig {
    test?: {
      globals?: boolean
      environment?: string
      include?: string[]
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})