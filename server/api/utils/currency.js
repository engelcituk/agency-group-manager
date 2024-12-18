export function convertCurrencyProps (hotel, exchangeRate) {
  return iterateObject(hotel, exchangeRate)
}

function iterateObject (obj, exchangeRate) {
  if (typeof obj !== 'object' || obj === null) return

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {

      if (key.startsWith('$')) {
        const newKey = key.replace('$', '')
        obj[newKey] = formatCurrency(exchangeCurrency(obj[key], exchangeRate))
      }

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = iterateObject(obj[key], exchangeRate)
      }
    }
  }

  return obj
}

export function formatCurrency (amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function exchangeCurrency (amount, rate) {
  return (amount * rate).toFixed(2)
}

export async function getHotelExchangeRate (hotelId, event) {
  const currency = getQuery(event).currency

  if (currency === 'USD') return 1

  const config = useRuntimeConfig(event)

  const params = {}
  if (hotelId) params.hotelId = hotelId

  const result = await $fetch('catalogs/currency', {
    baseURL: config.backsalesUrl,
    headers: {
      Authorization: 'Token ' + config.backsalesToken
    },
    params
  })

  return Number(result.find(c => c.code === currency).value)
}
