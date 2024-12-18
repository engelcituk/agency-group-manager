import { mapHotelFromService } from '~/server/api/utils/mappings.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const minorsAges = JSON.parse(query.minors_ages)

  let params = {
    ChannelId: config.channelId,
    LanguageId: query.lang,
    HotelId: query.hotel_id,
    CheckIn: query.start_date,
    CheckOut: query.end_date,
    Adults: query.adults,
    Children: query.children,
    ChildrenAges: minorsAges,
    TotalRooms: 1
  }

  if (minorsAges.length === 0) delete params.ChildrenAges

  const result = await $fetch('Quote/GetRooms', {
    baseURL: config.hotelsUrl,
    params
  })

  const hotel = await mapHotelFromService(result[0].hotels[0], event)
  hotel.rooms = hotel.rooms.filter(room => room.refundable_rates.length || room.not_refundable_rates.length)

  return hotel
})
