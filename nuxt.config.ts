import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
        },
      },
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
