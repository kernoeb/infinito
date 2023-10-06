const TITLE = 'Infinito'
const DOMAIN = 'infinito.noewen.com'
const URL = 'https://' + DOMAIN
const DESCRIPTION = 'Free and open-source web app to find and share stuff'
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
