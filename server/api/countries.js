export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { places } =  await $fetch('Place/GetPlaces', {
    baseURL: config.placesUrl,    	
    params: { placeTypeId: 2 }
  })

  return places.map((country) => {
    return {
      name: country[true ? 'displayES' : 'displayEN'],
      code: country.code
    }
  })
})
