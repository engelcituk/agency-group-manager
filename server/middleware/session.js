export default defineEventHandler(async (event) => {

  const url = getRequestURL(event);

  if (!url.pathname.startsWith('/api')) {
    return
  }

  if (url.pathname.includes('public')) {
    return
  }

  const config = useRuntimeConfig(event)
  const session = await useSession(event, {
    password: config.appKey,
    cookie: {
      secure: false,
    },
  })

  if (!session.data?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

})
