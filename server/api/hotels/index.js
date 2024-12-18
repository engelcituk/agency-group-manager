import { mapHotelFromService } from '~/server/api/utils/mappings.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const minorsAges = JSON.parse(query.minors_ages)
  const result = await $fetch('Quote/GetHotels', {
    baseURL: config.hotelsUrl,
    params: {
      ChannelId: config.channelId,
      LanguageId: query.lang,
      CheckIn: query.start_date,
      CheckOut: query.end_date,
      Adults: query.adults,
      Children: query.children,
      ChildrenAges: minorsAges,
      DestinationId: query.destination_id,
      TotalRooms: 1
    }
  })

  const hotels = []
  for (const hotel of result[0].hotels) {
    const mappedHotel = await mapHotelFromService(hotel, event)
    hotels.push(mappedHotel)
  }

  return hotels
})
