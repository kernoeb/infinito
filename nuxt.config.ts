export default defineNuxtConfig({
  app: {
    head: {
      title: 'Infinito',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Free and open-source web app to find and share stuff' },
        { name: 'author', content: 'kernoeb' },
        { name: 'keywords', content: 'infinito, free, open-source, web, app, find, share, stuff' },
        { name: 'language', content: 'French' },
        { name: 'robots', content: 'index,follow' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://infinito.noewen.com' },
        { name: 'twitter:title', content: 'Infinito' },
        { name: 'twitter:description', content: 'Free and open-source web app to find and share stuff' },
        { name: 'twitter:image', content: 'https://infinito.noewen.com/banner.png' }
      ]
    }
  },
  modules: [
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
