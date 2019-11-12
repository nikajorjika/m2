require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  router: {
    middleware: ['i18n']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['swiper/dist/css/swiper.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/hammer.js',
    {
      src: '~/plugins/nuxt-swiper.js',
      ssr: false
    },
    {
      src: '~/plugins/currency-converter.js',
      mode: 'client'
    },
    {
      src: '~/plugins/pusher.js',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-svg-loader'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/verify', method: 'post', propertyName: 'token' },
          logout: { url: '/user/sign-out', method: 'post' },
          user: {
            url: '/user/current-user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  },

  icon: {
    iconSrc: '~static/icon.png'
  },

  manifest: {
    theme_color: '#f26529'
  },
  pwa: {
    manifest: {
      name: 'Paveleon App',
      lang: 'ka',
      start_url: '/ka',
      display: 'fullscreen',
      orientation: 'landscape'
    }
  },
  styleResources: {
    sass: '~assets/styles/app.scss'
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.SERVER_IP,
    prefix: process.env.API_PREFIX
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  svgLoader: {
    svgoConfig: {
      plugins: [{ prefixIds: false }]
    }
  }
}
