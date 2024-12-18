  
<script setup>
    import { useRoute, useRouter } from 'vue-router'

    import { ref, onMounted } from 'vue'
    const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
    const route = useRoute()
    const router = useRouter()

    
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

    const updateAgent = () => {
        console.log(`Update`)
    }

    onMounted(async () => {
        await getAgentById()
    })
</script>

   
<template>
	<div class="flex-1 max-w-7xl">
        
		<CustomContainer class=" p-8 ">
            <div class="flex justify-between items-center pb-4">
                <div class="left-element flex items-center space-x-4 text-lef">
                    <CustomButton
						class="!bg-[#4CB8C4] !py-1 text-white"
						icon
					>
                        <NuxtLink :to="`/agencies/${agent?.agencyId}`" class="flex-center gap-1">
                            <span class="material-symbols-outlined">arrow_back</span>                        
                        </NuxtLink>                                                    														
					</CustomButton>
                    <h2 class="text-gray-900 font-semibold">{{  $t('edit') }} {{ $t('agent') }}</h2>                    
                </div>
            
            </div>
         
            <div class="container mx-auto bg-white p-4" v-if="agent">
                <form  @submit.prevent="updateAgent">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- Primer div -->
                        <div class="text-gray-900 p-4">
                            <CustomInput
                                v-model="agent.firstName"
                                :label="$t('name')"
                                :show-clear-button="true"
                                @clear="agent.firstName = ''"
                            />
                        </div>

                        <!-- Segundo div -->
                        <div class=" text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.lastName"
                                :label="$t('last_name')"
                                :show-clear-button="true"
                                @clear="agent.lastName = ''"
                            />
                        </div>

                        <!-- Tercer div -->
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
                        <!-- Primer div -->
                        <div class="text-gray-900 p-4 ">
                            <CustomInput
                                v-model="agent.mobile"
                                :label="$t('mobile')"
                                :show-clear-button="false"
                                @clear="agent.mobile = ''"
                                type="number"
                            /> 
                        </div>

                        <!-- Segundo div -->
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

                        <!-- Tercer div -->
                        <div class=" text-gray-900 p-4 ">
                            <CustomSimpleSelect
                                v-model="agent.profileTypeId"
                                :label="$t('profile_type')"
                                :options="[{ id: true, name: $t('active') }, { id: false, name: $t('inactive') }]"
                                :show-clear-button="true"
                            />                    
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




  