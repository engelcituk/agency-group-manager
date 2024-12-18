export default defineEventHandler(async  (event) => {
    const config = useRuntimeConfig(event)
    try {
        const agencies = await $fetch('Agency/GetAllAgencies', {
            baseURL: config.agentsUrl,			
        })
        return { status: true, data: agencies }
    } catch (error) {        
        return { status: false, msg: 'Failed to fetch agencies', data:[], error };
    }
});