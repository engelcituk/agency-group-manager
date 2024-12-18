export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},

    build: {
        analyze: false,
    },

    runtimeConfig: {
        appKey: '',
        hotelsUrl: '',
        placesUrl: '',
        channelId: '',
        backsalesUrl: '',
        backsalesToken: '',
        agentsUrl: '',
        bookUrl: '',
        authUrl: '',
        public: {
            apiBase: '/api'
        }
    },

    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        head: {
            link: [{
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
            }],
            title: 'Agency Group Manager.',
        }
    },

    modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@primevue/nuxt-module'],

    i18n: {
        locales: [
            {code: 'en', language: 'en-US'},
            {code: 'es', language: 'es-MX'},
        ],
        strategy: 'no_prefix',
    },

    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    routeRules: {
        '/': {
            redirect: "/reservations",
        },
    },

    primevue: {
        options: {
            theme: 'none'
        }
    },

    plugins: ['~/plugins/dependencies']
})
