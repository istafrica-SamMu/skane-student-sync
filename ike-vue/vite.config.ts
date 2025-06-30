import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('prime-')
        }
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'primevue']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'primevue': ['primevue'],
          'vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
