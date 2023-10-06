const TITLE = 'Infinito'
const DOMAIN = 'infinito.noewen.com'
const URL = 'https://' + DOMAIN
const DESCRIPTION = 'Free and open-source web app to find stuff'
const BANNER = `${URL}/banner.png`
const KEYWORDS = ['infinito', 'free', 'open-source', 'web', 'app', 'find', 'share', 'stuff']
const AUTHOR = 'kernoeb'

export default defineNuxtConfig({
  app: {
    head: {
      title: TITLE,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: DESCRIPTION },
        { name: 'author', content: AUTHOR },
        { name: 'keywords', content: KEYWORDS.join(', ') },
        { name: 'language', content: 'French' },
        { name: 'robots', content: 'index,follow' },

        // Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: URL + '/' },
        { hid: 'og:title', property: 'og:title', content: TITLE },
        { hid: 'og:description', property: 'og:description', content: DESCRIPTION },
        { property: 'og:image', content: BANNER },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: URL + '/' },
        { name: 'twitter:title', content: TITLE },
        { name: 'twitter:description', content: DESCRIPTION },
        { name: 'twitter:image', content: BANNER }
      ]
    }
  },
  modules: [
    'nuxt-icon',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: TITLE,
      short_name: TITLE,
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },
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
