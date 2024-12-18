module.exports = {
  apps: [
    {
      name: 'Marholiday Network Group Manager',
      port: '3002',
      script: './.output/server/index.mjs',
      env: {
        NUXT_HOTELS_URL: 'http://tst-hotelquote.thefives.com.mx/api/',
        NUXT_PLACES_URL: 'http://tst-places.thefives.com.mx/api/',
        NUXT_BACKSALES_URL: 'http://tst-backsales.thefives.com.mx/api/v1/',
        NUXT_BACKSALES_TOKEN: '721c4950cfab0ca291338a5d202cda8817157715',
        NUXT_CHANNEL_ID: '103',
        NUXT_APP_KEY: '80d42cfb-1cd2-462c-8f17-e3237d9027e922',
        NUXT_AGENTS_URL: 'http://tst-api.marholidaystravel.com/api/',
        NUXT_BOOK_URL: 'http://tst-book.thefives.com.mx/',
        NUXT_AUTH_URL: 'http://192.168.43.167:96/api/'
      }
    }
  ]
}
