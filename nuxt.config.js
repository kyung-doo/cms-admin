const changeLoaderOptions = loaders => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['~/assets']
        })
      }
    }
  }
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    base: '/admin/',
    middleware: [
      'storeReset'
    ],
  },
 
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /**
   * Import CSS
   */
  css: [
    /* Import Font Awesome Icons Set */
    '~/node_modules/flag-icon-css/css/flag-icon.min.css',
    /* Import Font Awesome Icons Set */
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    /* Import Font Awesome Icons Set */
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    /* Import Simple Line Icons Set */
    '~/node_modules/simple-line-icons/css/simple-line-icons.css',
    /* Import Bootstrap Vue Styles */
    '~/node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    /* Import Core SCSS */
    { src: '~/assets/scss/style.scss', lang: 'scss' },
    '~/assets/main.css'
  ],

  modules: [
    'nuxt-client-init-module',
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt'
  ],

  

  plugins: [
    '~/plugins/settings',
    '~/plugins/utils'
  ],

  generate: {
    dir: '../backend/public/admin'
  },
  
  /*
  ** Build configuration
  */
  build: {

    vendor: [
      { src: '~/plugins/utils', ssr:false },
      { src: 'vuejs-datepicker', ssr:false }
    ],
    
    // styleResources: {
    //   scss: ['~/assets/scss/style.scss']
    // },

    /*
    ** Run ESLint on save
    */
    extend (config, { app, isDev, isClient }) {

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // const vueLoader = config.module.rules.find(
      //   ({loader}) => loader === 'vue-loader')
      // const { options: {loaders} } = vueLoader || { options: {} }
      
      // if (loaders) {
      //   for (const loader of Object.values(loaders)) {
      //     changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
      //   }
      // }

      // config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
    }
  }
}

