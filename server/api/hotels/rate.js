import { mapHotelFromService } from '~/server/api/utils/mappings.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const minorsAges = JSON.parse(query.minors_ages)

  let params = {
    ChannelId: config.channelId,
    LanguageId: query.lang,
    HotelId: query.hotel_id,
    RoomId: query.room_id,
    RoomTypeCode: query.room_code,
    RatePlanCode: query.rate_code,
    CheckIn: query.start_date,
    CheckOut: query.end_date,
    Adults: query.adults,
    Children: query.children,
    ChildrenAges: minorsAges,
    TotalRooms: 1
  }

  if (minorsAges.length === 0) delete params.ChildrenAges

  const result = await $fetch('Quote/GetRoom', {
    baseURL: config.hotelsUrl,
    params
  })

  return await mapHotelFromService(result[0].hotels[0], event)
})
