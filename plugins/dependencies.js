import VueSnip from 'vue-snip'
import PrimeVue from 'primevue/config'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSnip)
  nuxtApp.vueApp.use(PrimeVue, { theme: 'none' })
})
