const pkg = require("./package");
const axios = require("axios");
const marked = require("marked");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en-gb'
    },
    title: "Dan B - Frontend Engineer & Web Designer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Dan B. Fontend Engineer. Web Designer. UI/UX, and Accessibility advocate."
      },
      { name:"google-site-verification", content:"gbsp7_kQow8w1s8OLfFXscUv0mHzw6wHR3Hkqsk9Vwk"}
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:400,700"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },

  /*
  ** Global CSS
  */
  css: ["~/assets/styles.css"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    'bootstrap-vue/nuxt',
    [
      "storyblok-nuxt",
      {
        accessToken:
          process.env.NODE_ENV == "production"
            ? "zI3ZMG4Bt3eQzAjBgCABuAtt"
            : "grIBGydGEUrfjqqtNZlxtgtt",
        cacheProvider: "memory"
      },
      '@nuxtjs/auth',
      '@nuxtjs/axios',
    ],
    ["@nuxtjs/google-analytics", {
      id: "UA-42270530-2"
    }]
  ],
  sitemap: {
    generate: true,
    hostname: 'https://danbdesigns.co.uk',
    exclude: []
  },

  generate: {
    routes: function() {
      return axios.get(
        "https://api.storyblok.com/v1/cdn/stories?version=published&token=zI3ZMG4Bt3eQzAjBgCABuAtt&starts_with=blog&cv=" +
          Math.floor(Date.now() / 1e3)
      )
      .then(res => {
        const blogPosts = res.data.stories.map(bp => bp.full_slug);
        return [
          '/',
          '/blog',
          '/about',
          ...blogPosts
        ]
      });
    }
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://127.0.0.1:3333/api/v1'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     });
    //   }
    // }
  }
};
