export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const query = getQuery(event)
    try {
        const agent = await $fetch(`Agent/GetById`, {
            baseURL: config.agentsUrl,	
            params: query,		
        })
        return { status: true, data: agent }
    } catch (error) {
        return { 
            status: false, 
            msg: `Failed to fetch agent with ID: ${id}`, 
            data: [], 
            error 
        }
    }
})
