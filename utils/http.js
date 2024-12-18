export default $fetch.create({
  baseURL: '/api',
  credentials: 'include',
  onRequest ({ options }) {

    const { currentLanguage, currentCurrency } = useUserSettingsStore()

    options.query = {
      ...options.query,
      lang: currentLanguage.id,
      currency: currentCurrency.key,
    }
  },
})

