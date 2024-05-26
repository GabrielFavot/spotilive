// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      hostname: 'http://localhost:3000',
    },
    spotify: {
      redirectUri: '/api/auth/callback',
      clientId: '',
      clientSecret: '',
      refreshToken: '',
    },
  },

  app: {
    head: {
      title: 'Spotify Grid',
      link: [{ rel: 'icon', type: 'ico', href: '/favicon.ico' }],
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    // devStorage: {
    //   spotify: {
    //     driver: 'fs',
    //     base: '.nuxt/.data',
    //   },
    //   cache: {
    //     driver: 'memory',
    //   },
    // },
    storage: {
      spotify: {
        driver: 'netlifyBlobs',
        name: 'spotify-grid',
        deployScoped: true,
        siteID: process.env.SITE_ID,
        token: process.env.NETLIFY_API_TOKEN,
      },
      cache: {
        driver: 'netlifyBlobs',
        name: 'cache',
      },
    },
    routeRules: {
      '/api/me/currently-playing-track': { cache: { maxAge: 5 } },
    },
    scheduledTasks: {
      '*/3 * * * *': 'history:refresh',
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/image', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    domains: ['i.scdn.co'],
  },
});
