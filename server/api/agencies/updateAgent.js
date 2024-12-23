export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)    
    try {    
        const body = await readBody(event)             
        const updatedAgent = await $fetch('Agent/UpdateAgent', {
            baseURL: config.agentsUrl,
            method: 'PUT', 
            body, 
        })
        return { status: true, data: updatedAgent }
    } catch (error) {
        console.error(error)
        return { status: false, msg: 'Failed to update agent', data: null, error }
    }
})
