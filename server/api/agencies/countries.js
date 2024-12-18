
export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig(event)
    const cookies = parseCookies(event);
    const locale = cookies['i18n_redirected'] || 'en'

    try {
        const response = await $fetch(`Place/GetPlaces`, {
            baseURL: config.placesUrl,	
            params: { placeTypeId: 2 },		
        })
        const countries = response.places.map((country) => {
            return {
                id: country.placeId,
                name: locale === 'en' ? country.displayEN : country.displayES,            
                code: country.code
            }
        })
        return { status: true, data: countries }
    } catch (error) {
        return { 
            status: false, 
            msg: `Failed to fetch places`, 
            data: [], 
            error 
        }
    }
})