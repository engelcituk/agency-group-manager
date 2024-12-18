<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import moment from 'moment'
import { useStorage } from '@vueuse/core'

const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
const { t } = useI18n()

const filters = ref({
	agency: '', 
  	country: '', 
	email: '', 
  	status: true, 
})

const countries = ref([])
const agencies = ref([])

const fetchCountries = async () => {
	const data = await $fetch('/api/countries', { server: false })
	const allCountries = JSON.parse(JSON.stringify(data))
	const commonCountries = data.filter(country => ['MX', 'US', 'CA'].includes(country.code))
		.map(country => {
			country.suggested = true
			country.code = country.code + '_'
			return country
		})
	countries.value = commonCountries.concat(allCountries)	
}

const getAgencies = async () => {
	startFullScreenLoading()
	const filter = {
		agency: filters.value.agency, 
		country: filters.value.country, 
		email: emailInvalid.value ? '' : filters.value.email, 
		status: filters.value.status.id || true,  
	}
	const { status, data } = await http('/api/agencies/agencies', {params: filter})

	if(status){
		agencies.value = data
	}
	stopFullScreenLoading()
}

const filtersOpen = ref(true)

const resetFilters = () => {
	filters.value.agency = ''
	filters.value.country = ''
	filters.value.email = ''
	filters.value.status = true
}

const resetEmail = () => {
	filters.value.email = ''
	emailInvalid.value = false
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailInvalid = ref(false)
const validateEmail = () => {
  emailInvalid.value = !emailPattern.test(filters.value.email)
}

const pageSize = ref(10)
const currentPage = ref(1)
const totalRecords = ref(0)
const first = ref(0)

const idFilter = ref(null)

async function changePage (event) {
  pageSize.value = event.rows
  currentPage.value = event.page + 1
  first.value = event.first
  await getAgencies()
}

async function searchReservations () {
  if (firstReservationsLoad.value) return
  currentPage.value = 1
  first.value = 0
  await getAgencies()
}

const reservations = ref([])
const firstReservationsLoad = ref(true)


onBeforeMount(() => {
   resetFilters()
})
onMounted(async () => {
	// await fetchCountries()
})
</script>
<template>
	<div class="flex-1 max-w-7xl">
	
		<CustomContainer class="bg-white p-8 shadow-md">
			<div class="[background:transparent] !border border-[--secondary-bg-color] text-gray-700 text-xs rounded p-2">
				<div
					class="flex justify-between cursor-pointer"
					@click="filtersOpen = !filtersOpen"
				>
					<div class="flex items-center">
						<span class="material-symbols-outlined">content_paste_search</span>
						<span>{{ $t('advanced_search') }}</span>
					</div>
					<div class="items-center">
						<span
							v-if="filtersOpen"
							class="material-symbols-outlined"
						>
							expand_less
						</span>
						<span
							v-else
							class="material-symbols-outlined"
						>
							expand_more
						</span>
					</div>
				</div>
				<CustomContainer
					v-show="filtersOpen"
					class="bg-[#4CB8C4] text-white rounded p-5 mt-2 pt-8"
				>
					<div class="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-x-6 gap-y-6 text-xs">
				
						<div class="sm:col-span-2">
							<CustomInput
								v-model="filters.agency"
								:label="$t('agency')"
								:show-clear-button="true"
								@clear="filters.agency = ''"
							/>
						</div>
						<div class="sm:col-span-2">
							<CustomInput
								v-model="filters.country"
								:label="$t('country')"
								:show-clear-button="true"
								@clear="filters.country = ''"
							/>
						</div>
						<div class="sm:col-span-2">
							<CustomInput
								v-model="filters.email"
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
				

						<div class="sm:col-span-2">
							<CustomSimpleSelect
								v-model="filters.status"
								:label="$t('status')"
								:options="[{ id: true, name: $t('active') }, { id: false, name: $t('inactive') }]"
								:show-clear-button="true"
							/>
							
						</div>
				
					
					</div>
					<div class="flex justify-end mt-8">
						<CustomButton
							class="!bg-red-500 !py-1 text-white"
							icon
							@click="resetFilters"
						>
							<div class="flex-center gap-1">
								<span class="material-symbols-outlined">ink_eraser</span>
								<span class="hidden sm:block">{{ $t('clear_filters') }}</span>
							</div>
						</CustomButton>
						<CustomButton
							class="!bg-[--primary-bg-color] !py-1 ml-2 !border-gray-300 border !text-white"
							icon
							@click="getAgencies"
						>
							<div class="flex-center gap-1">								
								<span class="material-symbols-outlined">search</span>
								<span>{{ $t('apply_filters') }}</span>
							</div>
						</CustomButton>
					</div>
				</CustomContainer>
			</div>
			
			<div class="grid">
				<DataTable
					:value="agencies"
					:global-filter-fields="['customer_name', 'customer_email', 'id']"
					scrollable
					lazy
					paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
					:pt="{
						root: { class: 'text-xs mt-8 overflow-x-hidden rounded' },
						table: { class: 'w-full border-2' },
						thead: { class: '!font-normal text-white text-xs text-center'}
					}"
					paginator
					:first="first"
					:rows="pageSize"
					:total-records="totalRecords"
					:rows-per-page-options="[10, 20, 50]"
					@page="changePage"
				>
					
					<Column
						field="agencyId"
						class="min-w-[6rem]"
						header="#"
						:pt="{
							headerContent: { class: 'font-normal text-center'},
							headerTitle: { class: 'w-full'},
							bodyCell: { class: 'text-center'}
						}"
					/>
					<Column
						field="commercialName"
						class="min-w-[12rem]"
						:header="$t('agency')"
						:pt="{
						headerContent: { class: 'font-normal text-center' },
						headerTitle: { class: 'w-full' }
						}"
					>
						<template #body="slotProps">						
							<nuxt-link 
								:to="`/agencies/${slotProps.data.agencyId}`" 
								class="hover:underline"
								style="color: #4CB8C4;"
							>
								{{ slotProps.data.commercialName }}
							</nuxt-link>
						</template>
					</Column>
					<Column
						field="commercialEmail"
						class="min-w-[7rem]"
						:header="$t('email')"
						:pt="{
							headerContent: { class: 'font-normal text-center'},
							headerTitle: { class: 'w-full'},
							bodyCell: { class: 'text-center'}
						}"
					/>
					<Column
						field="commercialPhone"
						:header="$t('phone')"
						:pt="{
							headerContent: { class: 'font-normal text-center'},
							headerTitle: { class: 'w-full'},
							bodyCell: { class: 'text-center'}
						}"
					/>
					<Column
						field="countryCode"
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
			</div>
		</CustomContainer>
	</div>
</template>

<style>
button[data-p-active="true"] {
  border: 2px solid #4CB8C4;
}
</style>
