export default defineEventHandler(async (event) => {
  return await getAgencies(event)
})

export async function getAgencies(event) {
  const config = useRuntimeConfig(event)

  const session = await useSession(event, {
    password: config.appKey,
    cookie: {
      secure: false,
    },
  })  
  const result = await $fetch('Agency/GetByGroupManager', {
    baseURL: config.agentsUrl,
    params: {
      groupManagerId: session.data.user.id,
    }
  })

  return result.map((agency) => {
    return {
      id: agency.agencyId,
      name: agency.commercialName,
    }
  })
}
