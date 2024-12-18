import { convertCurrencyProps, getHotelExchangeRate } from '~/server/api/utils/currency.js'

export async function mapHotelFromService (hotel, event) {
  const rooms = hotel.rooms.map(mapRoomFromService)

  const mappedHotel = {
    id: hotel.hotelId,
    hotel_id: hotel.hotelId,
    name: hotel.name,
    address: hotel.address,
    description: hotel.description,
    short_description: hotel.shortDescription,
    cover_image: hotel.hotelImage,
    amenities: rooms[0].amenities,
    gallery: hotel.gallery.map(item => item.url),
    room: rooms[0] || {},
    rooms
  }

  const exchangeRate = await getHotelExchangeRate(hotel.id, event)
  mappedHotel.exchange_rate = exchangeRate

  return convertCurrencyProps(mappedHotel, exchangeRate)
}

export function mapRoomFromService (room) {
  if (!room) return {}
  const rates = room.rates?.map(mapRateFromService) || []

  return {
    id: room.roomId,
    code: room.roomTypeCode,
    name: room.roomTypeName,
    description: room.description,
    cover_image: room.roomImage,
    gallery: room.gallery.map(item => item.url),
    amenities: room.amenities,
    refundable_rates: rates.filter(rate => rate.refundable),
    not_refundable_rates: rates.filter(rate => !rate.refundable),
    rates,
    rate: rates[0] || {}
  }
}

export function mapRateFromService (rate, query, exchangeRate) {
  if (!rate) return {}

  return {
    id: rate.ratePlanId,
    code: rate.ratePlanCode,
    meal_plan_name: rate.mealPlanName,
    meal_plan_code: rate.mealPlanCode,
    $price: rate.amount,
    $discount_price: rate.total,
    $amount_base: rate.amountBase,
    refundable: !Boolean(rate.nonRefundable)
  }
}
