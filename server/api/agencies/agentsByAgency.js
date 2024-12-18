export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const query = getQuery(event)
    try {
        const agents = await $fetch(`Agent/GetByAgencyId`, {
            baseURL: config.agentsUrl,	
            params: query,		
        })
        return { status: true, data: agents }
    } catch (error) {
        return { 
            status: false, 
            msg: `Failed to fetch agency with ID: ${id}`, 
            data: [], 
            error 
        }
    }
})
