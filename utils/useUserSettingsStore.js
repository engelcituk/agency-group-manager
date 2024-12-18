import { createGlobalState, useStorage } from '@vueuse/core'
import flagMX from '~/assets/img/flag_mx.png'
import flagUSA from '~/assets/img/flag_usa.png'
import moment from 'moment'
import 'moment/dist/locale/es'

export default createGlobalState(() => {
  const { setLocale } = useI18n()

  const languages = [
    {
      id: 1,
      key: 'en',
      label: 'English (EN-US)',
      short: 'en',
      flag: flagUSA,
      privacy_policy: import.meta.env.VITE_PRIVACY_URL_EN
    },
    {
      id: 2,
      key: 'es',
      label: 'Español (ES)',
      short: 'es',
      flag: flagMX,
      privacy_policy: import.meta.env.VITE_PRIVACY_URL_ES
    }
  ]

  const currencies = [
    {
      key: 'MXN',
      label: 'Peso (MXN)'
    },
    {
      key: 'USD',
      label: 'Dollar (USD)'
    }
  ]

  const defaultSettings = { lang: 'es', currency: 'MXN' }
  const userSettings = useStorage('site-settings', defaultSettings)
  const currentLanguage = languages.find(lang => lang.key === userSettings.value.lang)
  setLocale(currentLanguage.key)
  const currentCurrency = currencies.find(currency => currency.key === userSettings.value.currency)

  moment.locale(currentLanguage.short)

  function changeCurrentLanguage (key) {
    userSettings.value = { lang: key, currency: userSettings.value.currency }
    window.location.reload()
  }

  function changeCurrentCurrency (key) {
    userSettings.value = { lang: userSettings.value.lang, currency: key }
    // const { clearCart } = useCartStore()
    // clearCart()

    window.location.reload()
  }

  return {
    currentLanguage,
    languages,
    changeCurrentLanguage,
    currentCurrency,
    currencies,
    changeCurrentCurrency,
  }
})

