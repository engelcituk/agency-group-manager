export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  let response

  try {
    
    response = await $fetch('Auth/AuthUser', {
      baseURL: config.authUrl,
      method: 'POST',
      body: {
        email: body.email,
        password: body.password
      }
    })
  } catch (error) {
    console.log('Error', error)
    return new Response('Unauthorized', { status: 401 })
  }

  const session = await useSession(event, {
    password: config.appKey,
    cookie: {
      secure: false,
    },
  })

  
  const user = {
    id: response.userId,
    email: response.email,
    name: response.firstName + ' ' + response.lastName,
  }


  await session.update({
    password: config.appKey,
    user
  })

  return user
})
