import HoneybadgerSourceMapPlugin from '@honeybadger-io/webpack';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt2-honeybadger-sourcemaps',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/honeybadger.js', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      // Apenas em produção e no lado do cliente
      if (!isDev && isClient) {
        config.devtool = 'source-map';  // Gera sourcemaps no build de produção
        config.plugins.push(
          new HoneybadgerSourceMapPlugin({
            apiKey: process.env.HONEYBADGER_API_KEY,
            assetsUrl: 'https://nuxt2-honeybadger-sourcemaps-example.vercel.app/_nuxt',  // URL onde os assets estão hospedados
            revision: process.env.VERCEL_GIT_COMMIT_SHA || new Date().toISOString(),  // ID do commit ou timestamp
          })
        );
      }
    },
    transpile: ['@honeybadger-io/webpack'],  // Transpilação do plugin
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),  // Nome dos arquivos gerados
    },
  },

  publicRuntimeConfig: {
    honeybadgerApiKey: process.env.HONEYBADGER_API_KEY,
    honeybadgerEnvironment: process.env.HONEYBADGER_ENVIRONMENT,
  }
};
