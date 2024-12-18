export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig(event)

  const session = await useSession(event, {
    password: config.appKey,
    cookie: {
      secure: false,
    },
  })

  await session.clear()

  return 'ok'

})
