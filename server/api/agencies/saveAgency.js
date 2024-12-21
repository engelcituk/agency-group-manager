export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    try {    
        const body = await readBody(event)     
        
        const updatedAgency = await $fetch('Agency/UpdateAgency', {
            baseURL: config.agentsUrl,
            method: 'PUT', 
            body, 
        })

        return { status: true, data: updatedAgency }
    } catch (error) {
        return { status: false, msg: 'Failed to update agency', data: null, error }
    }
})
