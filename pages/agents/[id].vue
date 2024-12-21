  
<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
    import { useToast } from 'primevue/usetoast'
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()
    const toast = useToast()
    const agent = ref(null)
  
    const getAgentById = async () => {
        startFullScreenLoading()
        const filter = {
            agentId: route.params.id, 		
        }
        const { status, data } = await http(`/api/agencies/agentById/`, {params: filter})

        if(status){
            agent.value = data
        }        
        stopFullScreenLoading()
    }

    const resetEmail = () => {
        agent.value.email = ''
        emailInvalid.value = false
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailInvalid = ref(false)
    const validateEmail = () => {
        emailInvalid.value = !emailPattern.test(agent.value.email)
    }

    const cancelUpdate = () => {                
        router.push({ path: `/agencies/${ agent?.value.agencyId }`, query: { tab: 1 } })
    }

 
    const updateAgent = async ()=> {
        const payload = toRaw(agent.value) 
        payload.status = payload.status === true ? 1 : 0 
        startFullScreenLoading()
        const { status } = await http(`/api/agencies/updateAgent/`, {
            method: 'PUT', 
            body: payload, 
        })
        if( status){            
            toast.add({ severity: 'success', summary: t('update'), detail: t('agent_updated_successfully'), life: 3000 });
        }
        stopFullScreenLoading()  
    }


    onMounted(async () => {
        await getAgentById()
    })
</script>

   
<template>
	<div class="flex-1 max-w-7xl">
        <Toast position="bottom-right"/>
		<CustomContainer class=" p-8 ">
            <div class="flex justify-between items-center pb-4">
                <div class="left-element flex items-center space-x-4 text-lef">                   
                    <NuxtLink
                        :to="`/agencies/${agent?.agencyId}?tab=1`"                        
                        class="flex-center gap-1"
                    >
                        <CustomButton
                            class="!bg-[#4CB8C4] !py-1 text-white"
                            icon
                        >
                            <span class="material-symbols-outlined">arrow_back</span>                                                       														
                        </CustomButton>                      
                    </NuxtLink>                                                    														
				
                    <h2 class="text-gray-900 font-semibold">{{  $t('edit') }} {{ $t('agent') }}</h2>                    
                </div>            
            </div>
         
            <div class="container mx-auto bg-white p-4" v-if="agent">
                <form  @submit.prevent="updateAgent">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                        
                        <div class="text-gray-900 p-4">
                            <CustomInput
                                v-model="agent.firstName"
                                :label="$t('name')"
                                :show-clear-button="true"
                                @clear="agent.firstName = ''"
                            />
                        </div>
                        
                        <div class=" text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.lastName"
                                :label="$t('last_name')"
                                :show-clear-button="true"
                                @clear="agent.lastName = ''"
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

                
                        <div class="text-gray-900 py-1">
                            <label for="country" class="block text-[0.65rem] text-gray-900">{{ $t('profile_type') }}</label>
                            <select 
                                v-model="agent.profileTypeId"
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
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="cancelUpdate">
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




  