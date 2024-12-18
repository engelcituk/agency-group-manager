import { createGlobalState, useStorage } from '@vueuse/core'

export default createGlobalState(() => {
  const hotelRate = {}
  const selectedTransfers = useStorage('cart-transfers', [])
  const selectedExperiences = useStorage('cart-experiences', [])

  const { startDateDetails, endDateDetails, paxDetails } = useHotelFiltersStore()
  const cartTotal = computed(() => {
    const rawPrice = stringToNumber(hotelRate.value.room.rate?.discount_price)
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rawPrice)
  })

  function stringToNumber (value) {
    return Number(value.replace(/[^0-9.-]+/g, ''))
  }

  function clearCart () {
    hotelRate.value = {}
    selectedTransfers.value = []
    selectedExperiences.value = []
  }

  return {
    hotelRate,
    selectedTransfers,
    selectedExperiences,
    startDateDetails,
    endDateDetails,
    paxDetails,
    cartTotal,
    clearCart
  }
})
