  
<script setup>
    
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted, watch } from 'vue'
    const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
    const route = useRoute()
    const agency = ref(null)
    const agents = ref([])
    const originalAgents = ref([])
    const activeTab = ref(0)

    const filters = ref({
        agent: '',  
        email: '', 
        phone: '', 
    })

    const router = useRouter()

  
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

    const getAgentsByAgency = async () => {
        startFullScreenLoading()
        const filter = {
            AgencyId: route.params.id, 		
        }
        const { status, data } = await http(`/api/agencies/agentsByAgency/`, {params: filter})

        if(status){
            agents.value = data
            originalAgents.value = data
        }
        stopFullScreenLoading()
    }

    const filterAgents = () => {
        agents.value = originalAgents.value.filter(agent => {
            return (
                (!filters.value.agent || agent.firstName.toLowerCase().includes(filters.value.agent.toLowerCase()) ||  agent.lastName.toLowerCase().includes(filters.value.agent.toLowerCase())) &&
                (!filters.value.email || agent.email.toLowerCase().includes(filters.value.email.toLowerCase())) &&
                (!filters.value.phone || agent.phone.toLowerCase().includes(filters.value.phone.toLowerCase()))
            )
        })
    }

    
    const clearFilter = () => {
        filters.value.agent = ''
        filters.value.email = ''
        filters.value.phone = ''        
        agents.value = [...originalAgents.value]
    }

    // Monitorizar el cambio en el query para cambiar el tab seleccionado
    watch(() => route.query.tab, (newTab) => {
        if (newTab !== undefined) {
            activeTab.value = parseInt(newTab)
        }
    })

    onMounted(async () => {
        await getAgencyById()
        await getAgentsByAgency()

        const tabFromQuery = route.query.tab
        if (tabFromQuery !== undefined) {
            activeTab.value = parseInt(tabFromQuery)
        }
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
                        <NuxtLink :to="`/agencies/`" class="flex-center gap-1">
                            <span class="material-symbols-outlined">arrow_back</span>                        
                        </NuxtLink>                                                    														
					</CustomButton>
                    <h2 class="text-gray-900 font-semibold text-lg">{{  agency?.commercialName }}</h2>                    
                </div>

                <div class="right-element text-right">
                    <CustomButton
                        class=" !py-1 text-white"
                        icon
                        style="color: #4CB8C4;"
                >						
                        <NuxtLink :to="`/agencies/edit/${route.params.id}`" class="flex-center gap-1">
                            <span>{{ $t('edit') }}</span>                    
                        </NuxtLink> 
					</CustomButton>
                </div>
            </div>
            
            <Tabs :value="activeTab">
                <TabList>
                    <Tab :value="0"> {{ $t('agency') }}</Tab>
                    <Tab :value="1"> {{ $t('agents') }}</Tab>                
                </TabList>
                <TabPanels>
                    <TabPanel :value="0">                        
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" v-if="agency">
                            <div class="bg-white overflow-hidden">
                                <div class="sm:px-6 py-2">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        {{ $t('general_info') }}
                                    </h3>                                            
                                </div>
                                <div class="border-gray-200 px-4 py-5 sm:p-0">
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('commercial_name')}}: 
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.commercialName}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('bussines_name')}}:
                                        </span>
                                        <span class="text-gray-900">
                                            
                                            {{agency.businessName}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('email') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.commercialEmail}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('phone') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.commercialPhone}}
                                        </span>
                                    </div>                        
                                </div>
                            </div>
                            <div class="bg-white overflow-hidden">
                                <div class="px-1 sm:px-6 py-1">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        {{ $t('address') }}
                                    </h3>                                            
                                </div>
                                <div class="border-gray-200 px-4 py-5 sm:p-0">
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('country') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.countryCode}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('state') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.statePlace}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('city') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.cityPlace}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('address') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.address}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('zip_code') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.zipCode}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white overflow-hidden">
                                <div class="px-1 sm:px-6 py-1">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        {{ $t('documents') }}
                                    </h3>                                            
                                </div>
                                <div class="border-gray-200 px-4 py-5 sm:p-0">
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('document_type') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.documentTypeId}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('document_number') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.documentNumber}}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div class="bg-white overflow-hidden">
                                <div class="px-1 sm:px-6 py-1">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        {{ $t('additional_info') }}
                                    </h3>                                            
                                </div>
                                <div class="border-gray-200 px-4 py-5 sm:p-0">
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('web_site') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.website}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('status') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.status}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('model_commission') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.useCommissionModel}}
                                        </span>
                                    </div>
                                    <div class="px-1 sm:px-6 py-1 text-sm">
                                        <span class="text-gray-900 font-semibold">
                                            {{ $t('commission_discount') }}:
                                        </span>
                                        <span class="text-gray-900">
                                            {{agency.useCommissionDiscount}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel :value="1">
                        <form  @submit.prevent="filterAgents">
                            <div class="bg-[#4CB8C4] text-white rounded p-5 mt-2">
                        
                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-cente mt-4">
                                    <div>
                                        <CustomInput
                                            v-model="filters.agent"
                                            :label="$t('agent')"
                                            :show-clear-button="true"
                                            @clear="filters.agent = ''"
                                        />
                                    </div>
                                    <div>
                                        <CustomInput
                                            v-model="filters.email"
                                            :label="$t('email')"
                                            :show-clear-button="true"
                                            @clear="filters.email = ''"
                                        />
                                                    
                                    </div>
                                    <div>
                                        <CustomInput
                                            v-model="filters.phone"
                                            :label="$t('phone')"
                                            :show-clear-button="true"
                                            @clear="filters.phone = ''"
                                        />
                                    </div>
                                    <div> 
                                        <div class="flex  space-x-4" >
                                            <button
                                                class="flex items-center space-x-2 text-white px-1 py-2 rounded bg-red-500 hover:bg-red-600"
                                                @click="clearFilter"
                                            >                                        
                                                <span class="material-symbols-outlined text-white">
                                                    search
                                                </span>                                        
                                                <span>
                                                    {{$t('clear_filters')}} 
                                                </span>
                                            </button>
                                            <button
                                                class="flex items-center space-x-2 text-white px-1 py-2 border border-white rounded hover:bg-white/10"
                                                type="submit"
                                            >                                        
                                                <span class="material-symbols-outlined text-white">
                                                    search
                                                </span>                                        
                                                <span>
                                                    {{$t('search')}} 
                                                </span>
                                            </button>
                                        </div>                            
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                        <DataTable
                            :value="agents"                            
                            scrollable
                            lazy
                            paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                            :pt="{
                                root: { class: 'text-xs mt-8 overflow-x-hidden rounded' },
                                table: { class: 'w-full border-2' },
                                thead: { class: '!font-normal text-white text-xs text-center'}
                            }"
                            
                        >
                
                            <Column
                                field="agentId"
                                class="min-w-[6rem]"
                                header="#"
                                :pt="{
                                    headerContent: { class: 'font-normal text-center'},
                                    headerTitle: { class: 'w-full'},
                                    bodyCell: { class: 'text-center'}
                                }"
                            />
                            <Column
                                field="firstName"
                                class="min-w-[12rem]"
                                :header="$t('agent')"
                                :pt="{
                                headerContent: { class: 'font-normal text-center' },
                                headerTitle: { class: 'w-full' }
                                }"
                            >
                                <template #body="slotProps">						
                                    <nuxt-link 
                                        :to="`/agents/${slotProps.data.agentId}`" 
                                        class="hover:underline"
                                        style="color: #4CB8C4;"
                                    >
                                        {{ slotProps.data.firstName }} {{ slotProps.data.lastName }}
                                    </nuxt-link>
                                </template>
                            </Column>
                            <Column
                                field="email"
                                class="min-w-[7rem]"
                                :header="$t('email')"
                                :pt="{
                                    headerContent: { class: 'font-normal text-center'},
                                    headerTitle: { class: 'w-full'},
                                    bodyCell: { class: 'text-center'}
                                }"
                            />
                            <Column
                                field="phone"
                                :header="$t('phone')"
                                :pt="{
                                    headerContent: { class: 'font-normal text-center'},
                                    headerTitle: { class: 'w-full'},
                                    bodyCell: { class: 'text-center'}
                                }"
                            />
                            <Column
                                field="country"
                                class="min-w-[6rem]"
                                :header="$t('country')"
                                :pt="{
                                    headerContent: { class: 'font-normal text-center'},
                                    headerTitle: { class: 'w-full'},
                                    bodyCell: { class: 'text-right'}
                                }"
                            />
                            <Column
                                field="status"
                                class="min-w-[6rem]"
                                :header="$t('status')"
                            >
                                <template #body="slotProps">
                                    <span 
                                        class="material-symbols-outlined"
                                        :class="slotProps.data.status ? 'text-green-500' : 'text-red-500'"
                                        style="font-size: 16px;"
                                    >
                                        {{ slotProps.data.status ? 'check_circle' : 'cancel' }}
                                    </span>
                                </template>
                            </Column>
                            
                        </DataTable>
                    </TabPanel>
                
                </TabPanels>
            </Tabs>
        </CustomContainer>
    </div>
</template>




  