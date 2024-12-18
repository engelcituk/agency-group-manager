import { createGlobalState } from '@vueuse/core'
import moment from 'moment'

export default createGlobalState(() => {
  const { user } = useAuthStore()
  const orderId = ref('')
  const paymentUrl = ref('')
  const acceptBankTransfer = ref(false)
  const experienceSummary = ref({})
  const hotelSummary = ref({})
  const transferSummary = ref({})
  const orderForm = reactive({
    country: {},
    agency: {},
    agent: {},
    accepted_terms: false,
    discount: null,
    partial_payment: false,
    notes: '',
    transfer_type: 'oneway',
    trips: []
  })
  const orderFormError = ref(false)

  watch(transferSummary, (value) => {
    if (!value) return
    if (!value.id) return
    for (let i = 0; i < value.trips.length; i++) {
      orderForm.trips.push({
        airline: '',
        flight: '',
        time: '',
        pickup: '',
        international: true,
        is_leaving: value.trips[i].is_leaving,
        has_flight: value.trips[i].has_flight
      })
    }
  })

  watch(() => orderForm.trips, (value) => {
    for (const tripForm of value) {
      if (!tripForm.time) continue
      if (!tripForm.is_leaving) {
        tripForm.pickup = tripForm.time
        continue
      }
      tripForm.pickup = adjustPickupTime(tripForm.time, tripForm.international)
    }
  }, { deep: true })

  function adjustPickupTime (time, international) {
    if (international) {
      return moment(time, 'HH:mm').subtract(4, 'hour').format('HH:mm')
    } else {
      return moment(time, 'HH:mm').subtract(3, 'hour').format('HH:mm')
    }
  }

  function validateOrderForm () {
    if (!orderForm.name || !orderForm.last_name || !orderForm.country.code || !orderForm.email || !orderForm.phone || !orderForm.accepted_terms) {
      orderFormError.value = true
      return false
    }
    if (orderForm.is_admin && (!orderForm.agency.id || !orderForm.agent.id)) {
      orderFormError.value = true
      return false
    }

    for (const tripForm of orderForm.trips) {
      if (!tripForm.pickup) {
        orderFormError.value = true
        return false
      }

      if (!tripForm.has_flight) continue

      if (!tripForm.airline || !tripForm.flight || !tripForm.time || !tripForm.pickup) {
        orderFormError.value = true
        return false
      }
    }

    return true
  }

  function resetStore () {
    experienceSummary.value = null
    hotelSummary.value = null
    transferSummary.value = null
    orderId.value = null
    paymentUrl.value = null
    orderForm.accepted_terms = false
    orderForm.partial_payment = false
    orderForm.name = null
    orderForm.last_name = null
    orderForm.email = null
    orderForm.phone = null
    orderForm.agency = {}
    orderForm.agent = {}
    orderForm.discount = null
    orderForm.country = {}
    orderForm.transfer_type = 'oneway'
    orderForm.notes = ''
    orderForm.trips = []
    orderForm.commission_type = 1
    orderFormError.value = false
    acceptBankTransfer.value = false
  }

  return {
    paymentUrl,
    orderId,
    acceptBankTransfer,
    experienceSummary,
    hotelSummary,
    transferSummary,
    orderForm,
    orderFormError,
    validateOrderForm,
    resetStore
  }
})
