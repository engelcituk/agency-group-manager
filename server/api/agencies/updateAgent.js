export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event); 
    
    try {    
        const body = await readBody(event)             
        const updatedAgent = await $fetch('Agent/UpdateAgent', {
            baseURL: config.agentsUrl,
            method: 'PUT', 
            body, 
        })
        console.log(updatedAgent)

        return { status: true, data: updatedAgent }
    } catch (error) {
        console.error(error)
        return { status: false, msg: 'Failed to update agency', data: null, error }
    }
})
