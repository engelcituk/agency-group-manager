<script setup>
    import { ref, onMounted, toRaw  } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()

    const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
    const { t } = useI18n()

    const agent = ref({
        name: '',
        lastname: '',
        phone: '',
        mobile: '',
        email: '',
        profileType: '',
    })




const resetEmail = () => {
	agent.value.email = ''
	emailInvalid.value = false
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailInvalid = ref(false)
const validateEmail = () => {
	emailInvalid.value = !emailPattern.test(agent.value.email)
}

const cancelCreate = () => {
    router.push({ path: `/agencies/${ route.params.id }`, query: { tab: 1 } })
}
const creatAgent = () => {
    const payload = toRaw(agent.value)
    console.log(payload)
}

onBeforeMount(() => {
	
})
onMounted(async () => {
	// await fetchCountries()
})
</script>
<template>
	<div class="flex-1 max-w-7xl">
        <Toast position="bottom-right"/>
		<CustomContainer class=" p-8 ">
            <div class="flex justify-between items-center pb-4">
                <div class="left-element flex items-center space-x-4 text-lef">                   
                    <NuxtLink
                        :to="`/agencies/${route.params.id}?tab=1`"                        
                        class="flex-center gap-1"
                    >
                        <CustomButton
                            class="!bg-[#4CB8C4] !py-1 text-white"
                            icon
                        >
                            <span class="material-symbols-outlined">arrow_back</span>                                                       														
                        </CustomButton>                      
                    </NuxtLink>                                                    														
				
                    <h2 class="text-gray-900 font-semibold">{{  $t('add_new_agent') }} </h2>                    
                </div>            
            </div>
         
            <div class="container mx-auto bg-white p-4" v-if="agent">
                <form  @submit.prevent="creatAgent">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                        
                        <div class="text-gray-900 p-4">
                            <CustomInput
                                v-model="agent.name"
                                :label="$t('name')"
                                :show-clear-button="true"
                                @clear="agent.name = ''"
                            />
                        </div>
                        
                        <div class=" text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.lastname"
                                :label="$t('last_name')"
                                :show-clear-button="true"
                                @clear="agent.lastname = ''"
                            />
                        </div>
                        
                        <div class=" text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.phone"
                                :label="$t('phone')"
                                :show-clear-button="false"
                                @clear="agent.phone = ''"
                                type="number"
                            />                    
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                        
                        <div class="text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.mobile"
                                :label="$t('mobile')"
                                :show-clear-button="false"
                                @clear="agent.mobile = ''"
                                type="number"
                            /> 
                        </div>
                        
                        <div class=" text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.email"
                                type="email"
                                :label="$t('email')"
                                :show-clear-button="true"
                                @clear="resetEmail"
                                :style="{width: '100%'}"
                                :class="{
                                    'p-invalid': emailInvalid,
                                                
                                }"
                                @input="validateEmail"
                            />
                            <small v-if="emailInvalid" class="text-red-500">{{ $t('invalid_email')}}</small>
                        </div>

                
                        <div class="text-gray-900 py-1 px-4">
                            <label for="country" class="block text-[0.65rem] text-gray-900">{{ $t('profile_type') }}</label>
                            <select 
                                v-model="agent.profileType"
                                id="country" 
                                class="w-full border-b-2 border-gray-800 bg-transparent focus:outline-none focus:border-black text-gray-900"
                            >
                                <option value="0" disabled selected>{{$t('choose_an_option')}}</option>                                    
                                <option value="1">Owner</option>
                                <option value="2">Agent</option>                                
                            </select> 
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 mt-4">
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="cancelCreate">
                            {{ $t('cancel')}}
                        </button> 
                        
                        <button type="submit" class="bg-[#4CB8C4] text-white px-4 py-2 rounded hover:bg-[#3A98A0]">
                            {{$t('save')}}
                        </button>
                    </div>
                </form>
          
            </div>

        </CustomContainer>
    </div>
</template>

<style>
button[data-p-active="true"] {
  border: 2px solid #4CB8C4;
}
</style>
