export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event)
    
    try {    
        const body = await readBody(event)             
        const agentCreated = await $fetch('Agent/CreateAgent', {
            baseURL: config.agentsUrl,
            method: 'POST', 
            body, 
        })
        console.log(agentCreated)

        return { status: true, data: agentCreated }
    } catch (error) {
        console.error(error)
        return { status: false, msg: 'Failed to update agent', data: null, error }
    }
})
