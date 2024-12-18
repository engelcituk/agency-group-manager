import { createGlobalState } from '@vueuse/core'
import moment from 'moment'

export default createGlobalState(() => {
  const { t } = useI18n()

  const adults = ref(2)
  const minors = ref(0)
  const minorsAges = ref([])
  const dateRange = ref({
    start: moment().add(7, 'day').toDate(),
    end: moment().add(12, 'day').toDate()
  })
  const destination = ref({})

  const adultsInput = ref()
  const minorsInput = ref()
  const minorsAgesInput = ref([])
  const dateRangeInput = ref({})
  const destinationInput = ref({})

  function initializeInputs () {
    adultsInput.value = adults.value
    minorsInput.value = minors.value
    minorsAgesInput.value = [...minorsAges.value]
    dateRangeInput.value = dateRange.value
    destinationInput.value = destination.value
  }

  const hotelDestinations = ref([])

  let beforeQuerySet = false
  watch(minorsInput, (value, oldValue) => {
    if (beforeQuerySet) return
    if (value > oldValue) minorsAgesInput.value.push(null)
    else if (value < oldValue) minorsAgesInput.value.pop()
  })

  async function fetchDestinations () {
    if (hotelDestinations.value.length > 0) return
    hotelDestinations.value = await $fetch('/api/hotels/destinations')
  }

  const paxDetails = computed(() => getPaxDetails(adults.value, minors.value))
  const paxInputDetails = computed(() => getPaxDetails(adultsInput.value, minorsInput.value))
  function getPaxDetails (adults, minors) {
    return `${adults || 0} ${t('adults')}, ${minors || 0} ${t('minors', minors)}`
  }

  const dateRangeDetails = computed(() => getDateRangeDetails(dateRange.value))
  const startDateDetails = computed(() => getDateDetails(dateRange.value.start))
  const endDateDetails = computed(() => getDateDetails(dateRange.value.end))
  const dateRangeInputDetails = computed(() => getDateRangeDetails(dateRangeInput.value))
  const totalNights = computed(() => {
    return moment(dateRange.value.end).diff(moment(dateRange.value.start), 'days')
  })

  function getDateRangeDetails (range) {
    if (!range.start) return null
    const startDateLabel = moment(range.start).format('DD-MMM-YYYY')
    const endDateLabel = moment(range.end).format('DD-MMM-YYYY')
    return `${startDateLabel} / ${endDateLabel}`
  }

  function getDateDetails (date) {
    if (!date) return null
    return moment(date).format('DD-MMM-YYYY')
  }

  function getHotelParams (id = null) {
    const params = {
      start_date: moment(dateRange.value.start).format('YYYY-MM-DD'),
      end_date: moment(dateRange.value.end).format('YYYY-MM-DD'),
      adults: adults.value,
      minors: minors.value,
      destination_id: destination.value.id,
      minors_ages: JSON.stringify(minorsAges.value)
    }
    if (id) params.hotel_id = id
    return params
  }

  async function setHotelParamsFromQuery (query) {
    beforeQuerySet = true
    await fetchDestinations()
    dateRange.value.start = moment(query.start_date).toDate()
    dateRange.value.end = moment(query.end_date).toDate()
    adults.value = Number(query.adults)
    minors.value = Number(query.minors)
    destination.value = hotelDestinations.value.find(destination => destination.id === Number(query.destination_id))
    if (!destination.value) {
      destination.value = hotelDestinations.value?.[0]
    }
    minorsAges.value = JSON.parse(query.minors_ages)
    await nextTick()
    beforeQuerySet = false
  }

  function updateHotelFilters () {
    dateRange.value = dateRangeInput.value
    adults.value = adultsInput.value
    minors.value = minorsInput.value
    destination.value = destinationInput.value
    minorsAges.value = minorsAgesInput.value

    const currentURL = window.location.href
    const url = new URL(currentURL)
    url.searchParams.set('start_date', moment(dateRange.value.start).format('YYYY-MM-DD'))
    url.searchParams.set('end_date', moment(dateRange.value.end).format('YYYY-MM-DD'))
    url.searchParams.set('adults', String(adults.value))
    url.searchParams.set('minors', String(minors.value))
    url.searchParams.set('destination_id', String(destination.value.id))
    const minorsAgesString = '[' + minorsAges.value.toString() + ']'
    url.searchParams.set('minors_ages', minorsAgesString)
    window.history.replaceState({}, '', url.toString())
  }

  return {
    paxDetails,
    adults,
    adultsInput,
    minors,
    minorsInput,
    minorsAges,
    minorsAgesInput,
    paxInputDetails,
    dateRange,
    dateRangeDetails,
    dateRangeInput,
    dateRangeInputDetails,
    destination,
    destinationInput,
    fetchDestinations,
    hotelDestinations,
    getHotelParams,
    setHotelParamsFromQuery,
    initializeInputs,
    updateHotelFilters,
    startDateDetails,
    endDateDetails,
    totalNights
  }
})
