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
    devStorage: {
      default: {
        driver: 'memory',
      },
    },
    storage: {
      default: {
        driver: 'netlifyBlobs',
      },
    },
    routeRules: {
      '/api/me/currently-playing-tracking-track': { cache: { maxAge: 5 } },
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/image'],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  image: {
    domains: ['i.scdn.co'],
  },
});
