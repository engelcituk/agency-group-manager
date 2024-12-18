export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const query = getQuery(event)
    try {
        const agency = await $fetch(`Agency/GetById`, {
            baseURL: config.agentsUrl,	
            params: query,		
        })
        return { status: true, data: agency }
    } catch (error) {
        return { 
            status: false, 
            msg: `Failed to fetch agency with ID: ${id}`, 
            data: [], 
            error 
        }
    }
})
