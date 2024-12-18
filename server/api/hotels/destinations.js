export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  return await $fetch('Quote/GetDestinations', {
    baseURL: config.hotelsUrl,
  })
})
