// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Infinito',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  modules: [
    '@nuxt/content',
    'nuxt-icon',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true
  }
})
