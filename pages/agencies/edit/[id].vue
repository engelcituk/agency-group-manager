  
  
<script setup>
    import { ref, onMounted, toRaw  } from 'vue'
    import { useRoute } from 'vue-router'
    const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
    const route = useRoute()
    const agency = ref({})
    const countries = ref([])
    const country = ref(null)


    const getAgencyById = async () => {
        startFullScreenLoading()
        const filter = {
            agencyId: route.params.id, 		
        }
        const { status, data } = await http(`/api/agencies/agencyById/`, {params: filter})

        if(status){
            agency.value = data            
        }
        stopFullScreenLoading()
    }

    const getCountries = async () => {
        const { status, data } = await http(`/api/agencies/countries/`)
        if( status){
            countries.value = data
        }        
    }

    
    const cancelUpdate = () => {        
        navigateTo(`/agencies/${ route.params.id }`)
    }

    const updateAgency = async ()=> {
        const payload = toRaw(agency.value)
        console.log('update', payload)
        startFullScreenLoading()

        const { status, data } = await http(`/api/agencies/updateAgency/`, payload)

        stopFullScreenLoading()            
      
    }

    onMounted(async () => {
        await getAgencyById()
        await getCountries()
        // setSelectedCountry()
    })
</script>


   
<template>
	<div class="flex-1 max-w-7xl">
        
		<CustomContainer class=" p-8 ">
            <div class="flex justify-between items-center pb-4">
                <div class="left-element text-left">
                    <CustomButton
						class="!bg-[#4CB8C4] !py-1 text-white"
						icon
					>
                        <NuxtLink :to="`/agencies/${route.params.id}`" class="flex-center gap-1">
                            <span class="material-symbols-outlined">arrow_back</span>                        
                        </NuxtLink>                                                    														
					</CustomButton>
                </div>
          
            </div>
        
            <form  @submit.prevent="updateAgency">
                <div class="container mx-auto bg-white p-7" v-if="agency">
                    <h3 class="text-xl leading-6 font-medium text-gray-900 mb-4">{{ $t('general_info') }} </h3> 
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        
                        <div class="text-gray-900 py-2">
                            <CustomInput
                                v-model="agency.commercialName"
                                :label="$t('commercial_name')"
                                :show-clear-button="true"
                                @clear="agency.commercialName = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2">
                            <CustomInput
                                v-model="agency.businessName"
                                :label="$t('bussines_name')"
                                :show-clear-button="true"
                                @clear="agency.businessName = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2">
                            <CustomInput
                                v-model="agency.commercialEmail"
                                :label="$t('commercial_email')"
                                :show-clear-button="true"
                                @clear="agency.commercialEmail = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2">
                            <CustomInput
                                v-model="agency.commercialPhone"
                                :label="$t('commercial_phone')"
                                :show-clear-button="true"
                                @clear="agency.commercialPhone = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2 ">
                            <CustomInput
                                v-model="agency.commercialName"
                                :label="$t('agency_group')"
                                :show-clear-button="true"
                                @clear="agency.commercialName = ''"
                            />
                        </div>
                    </div>

                    <h3 class="text-xl leading-6 font-medium text-gray-900 my-4">{{ $t('address') }} </h3> 
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                        <div class="text-gray-900">
                            <label for="country" class="block text-[0.65rem] text-gray-900">{{ $t('country') }}</label>
                            <select 
                                v-model="agency.countryPlaceId"
                                id="country" 
                                class="w-full border-b-2 border-gray-800 bg-transparent focus:outline-none focus:border-black text-gray-900"
                            >
                            <option value="" disabled selected>{{ $t('choose_a_country') }}</option>
                                <option v-for="country in countries" :key="country.id" :value="country.id">
                                    {{ country.name }}
                                </option>
                            </select>                            
                        </div>
                        <div class="text-gray-900 py-3">
                            <CustomInput
                                v-model="agency.statePlace"
                                :label="$t('state')"
                                :show-clear-button="true"
                                @clear="agency.statePlace = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2">
                            <CustomInput
                                v-model="agency.cityPlace"
                                :label="$t('city')"
                                :show-clear-button="true"
                                @clear="agency.cityPlace = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2">
                            <CustomInput
                                v-model="agency.address"
                                :label="$t('address')"
                                :show-clear-button="true"
                                @clear="agency.address = ''"
                            />
                        </div>
                        <div class="text-gray-900 py-2 ">
                            <CustomInput
                                v-model="agency.zipCode"
                                :label="$t('zip_code')"
                                :show-clear-button="true"
                                @clear="agency.zipCode = ''"
                            />
                        </div>
                    </div>

                    <h3 class="text-xl leading-6 font-medium text-gray-900 my-4">{{ $t('documents') }} </h3> 
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div class="text-gray-900">
                  
                            <div class="text-gray-900 py-1">
                                <label for="country" class="block text-[0.65rem] text-gray-900">{{ $t('country') }}</label>
                                <select 
                                    v-model="agency.documentTypeId"
                                    id="country" 
                                    class="w-full border-b-2 border-gray-800 bg-transparent focus:outline-none focus:border-black text-gray-900"
                                >
                                    <option value="0" disabled selected>{{$t('choose_an_option')}}</option>                                    
                                    <option value="1">ABTA</option>
                                    <option value="2">ACTA</option>
                                    <option value="3">ARC</option>
                                    <option value="4">ATOL</option>
                                    <option value="5">CICMA</option>
                                    <option value="6">CLIA</option>
                                    <option value="7">IATA</option>
                                    <option value="8">PCC</option>
                                    <option value="9">RNT</option>
                                    <option value="10">RP</option>
                                    <option value="11">RUC</option>
                                    <option value="12">TICO</option>
                                    <option value="13">TIDS</option>
                                    <option value="14">TRU</option>
                                </select> 
                            </div>
                        </div>
                        <div class="text-gray-900 py-3">
                            <CustomInput
                                v-model="agency.documentNumber"
                                :label="$t('document_number')"
                                :show-clear-button="true"
                                @clear="agency.documentNumber = ''"
                            />
                        </div>               
                    </div>

                    <h3 class="text-xl leading-6 font-medium text-gray-900 my-4">{{ $t('additional_info') }} </h3> 
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div class="text-gray-900  flex items-center space-x-2 py-2">
                            <label for="toggle-switch-commission" class="text-sm font-medium text-gray-700">
                                {{ $t('model_commission') }}
                            </label>
                            <ToggleSwitch id="toggle-switch-commission" v-model="agency.useCommissionModel" />
                        </div>
                        <div class="text-gray-900  flex items-center space-x-2 py-2">
                            <label for="toggle-switch-discount" class="text-sm font-medium text-gray-700">
                                {{ $t('commission_discount') }}
                            </label>
                            <ToggleSwitch id="toggle-switch-discount" v-model="agency.useCommissionDiscount" />
                        </div>               
                    </div>
                
                    <div class="flex justify-end space-x-4 mt-4">
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="cancelUpdate">
                            {{ $t('cancel')}}
                        </button> 
                       
                        <button type="submit" class="bg-[#4CB8C4] text-white px-4 py-2 rounded hover:bg-[#3A98A0]">
                            {{$t('save')}}
                        </button>
                    </div>
                </div>
            </form>
           
        </CustomContainer>
    </div>
</template>
