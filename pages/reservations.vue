<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import moment from 'moment'
import { useStorage } from '@vueuse/core'

const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
const { t } = useI18n()

const agency = useStorage('agency-selected', {})

const agencies = ref([])

async function fetchAgencies() {
  agencies.value = await http('agencies')
  console.log(agencies.value)
  if (!agency.value.id) {
    agency.value = agencies.value[0]
  }
  await fetchReservations()
}

const operationDateRangeFilter = ref({})
const dateRangeFilter = ref({})

const productTypeFilter = ref({})

const statusFilter = ref({})
const statusOptions = [
  { id: 5, name: t('requested') },
  { id: 10, name: t('annulled') },
  { id: 3, name: t('booked') },
  { id: 2, name: t('cancelled') }
]

const paymentStatusFilter = ref({})
const confirmStatusFilter = ref({})
const paymentMethodFilter = ref({})
const customerNameFilter = ref(null)

const filtersOpen = ref(true)

function resetFilters () {
  operationDateRangeFilter.value = {}
  dateRangeFilter.value = {}
  productTypeFilter.value = {}
  statusFilter.value = {}
  confirmStatusFilter.value = {}
  paymentStatusFilter.value = {}
  paymentMethodFilter.value = {}
  customerNameFilter.value = null

  searchReservations()
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
  await fetchReservations()
}

async function searchReservations () {
  if (firstReservationsLoad.value) return
  currentPage.value = 1
  first.value = 0
  await fetchReservations()
}

const reservations = ref([])
const firstReservationsLoad = ref(true)

async function fetchReservations () {
  startFullScreenLoading()
  try {
    const data = await http('reservations', {
      params: {
        agency_id: agency.value.id,
        limit: pageSize.value,
        page: currentPage.value,
        id: idFilter.value,
        reservation_start: dateRangeFilter.value?.start ? moment(dateRangeFilter.value.start).format('YYYY-MM-DD') : null,
        reservation_end: dateRangeFilter.value?.end ? moment(dateRangeFilter.value.end).format('YYYY-MM-DD') : null,
        operation_start: operationDateRangeFilter.value?.start ? moment(operationDateRangeFilter.value.start).format('YYYY-MM-DD') : null,
        operation_end: operationDateRangeFilter.value?.end ? moment(operationDateRangeFilter.value.end).format('YYYY-MM-DD') : null,
        product_type: productTypeFilter.value.id,
        status: statusFilter.value.id,
        payment_method: paymentMethodFilter.value.id,
        is_paid: paymentStatusFilter.value.id,
        is_confirmed: confirmStatusFilter.value.id,
        customer_name: customerNameFilter.value,
      }
    })
    const reservationsPage = data.reservations
    totalRecords.value = data.total
    reservations.value = reservationsPage.map(r => ({
      ...r,
      date_string: moment(r.date).format('DD-MMM-YYYY'),
      date: new Date(r.date),
      operation_date_string: moment(r.operation_date).format('DD-MMM-YYYY'),
      operation_date: new Date(r.operation_date)
    }))
  } catch (e) {
    console.log(e)
    reservations.value = []
  }
  firstReservationsLoad.value = false
  stopFullScreenLoading()
}

onBeforeMount(() => {
  resetFilters()
})
onMounted(async () => {
  await fetchAgencies()
})
</script>
<template>
  <div class="flex-1 max-w-7xl">
    <div class="flex flex-wrap items-center justify-end mb-2">
      <div class="w-full mt-4 md:mt-0 md:w-[30rem] flex ml-2 items-center">
        <CustomInput
          v-model="idFilter"
          class="w-full text-xs"
          :placeholder="$t('search_by_name_or_email')"
        />
        <CustomButton
          class="[background:transparent] !border !border-gray-700 text-gray-700 text-xs ml-4"
          @click="searchReservations"
        >
          {{ $t('search') }}
        </CustomButton>
      </div>
    </div>
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
            >expand_less</span>
            <span
              v-else
              class="material-symbols-outlined"
            >expand_more</span>
          </div>
        </div>
        <CustomContainer
          v-show="filtersOpen"
          class="bg-[#4CB8C4] text-white rounded p-5 mt-2 pt-8"
        >
          <div class="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-x-6 gap-y-6 text-xs">
            <div class="sm:col-span-2">
              <CustomSelect
                v-model:model-value="agency"
                :options="agencies"
                :label="$t('agency')"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <DateRangeInput
                v-model="dateRangeFilter"
                :label="$t('reservation_date')"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <DateRangeInput
                v-model="operationDateRangeFilter"
                :label="$t('operation_date')"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <CustomSimpleSelect
                v-model="productTypeFilter"
                :label="$t('product')"
                :options="[{ id: 1, name: $t('hotels') }, { id: 2, name: $t('experiences') }, { id: 3, name: $t('transfers') }]"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <CustomSimpleSelect
                v-model="statusFilter"
                :label="$t('reservation_status')"
                :options="statusOptions"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <CustomSimpleSelect
                v-model="confirmStatusFilter"
                :label="$t('confirmation_status')"
                :options="[{ id: true, name: $t('confirmed') }, { id: false, name: $t('pending') }]"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <CustomSimpleSelect
                v-model="paymentStatusFilter"
                :label="$t('payment_status')"
                :options="[{ id: true, name: $t('paid') }, { id: false, name: $t('not_paid') }]"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <CustomSimpleSelect
                v-model="paymentMethodFilter"
                :label="$t('payment_method')"
                :options="[{ id: 1, name: $t('credit_card') }, { id: 30, name: $t('wire_transfer') }]"
                :show-clear-button="true"
              />
            </div>
            <div class="sm:col-span-2">
              <CustomInput
                v-model="customerNameFilter"
                :label="$t('reservation_holder')"
                :show-clear-button="true"
                @clear="customerNameFilter = null"
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
              @click="fetchReservations"
            >
              <div class="flex-center gap-1">
                <span class="material-symbols-outlined">check</span>
                <span>{{ $t('apply_filters') }}</span>
              </div>
            </CustomButton>
          </div>
        </CustomContainer>
      </div>

      <div class="grid">
        <DataTable
          :value="reservations"
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
            field="date_string"
            class="min-w-[7rem]"
            :header="$t('reservation_date')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-center'}
            }"
          />
          <Column
            field="id"
            class="min-w-[6rem]"
            :header="$t('order_number')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-center'}
            }"
          />
          <Column
            field="customer_name"
            class="min-w-[12rem]"
            :header="$t('beneficiary')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'}
            }"
          />
          <Column
            field="operation_date_string"
            class="min-w-[7rem]"
            :header="$t('operation_date')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-center'}
            }"
          />
          <Column
            field="currency_code"
            :header="$t('currency')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-center'}
            }"
          />
          <Column
            field="total"
            class="min-w-[6rem]"
            :header="$t('amount')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-right'}
            }"
          />
          <Column
            field="pending"
            class="min-w-[6rem]"
            :header="$t('balance')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-right'}
            }"
          />
          <Column
            field="commission"
            class="min-w-[6rem]"
            :header="$t('commission')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-right'}
            }"
          />
          <Column
            field="confirmed_services_text"
            class="min-w-[4rem] text-center"
            :header="$t('confirmed_services')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-center'}
            }"
          >
            <template #body="{ data }">
              <span
                v-if="data.status === 'cancelled'"
                class="text-red-500"
              >{{ $t('cancelled') }}</span>
              <span v-else>{{ data.confirmed_services_text }}</span>
            </template>
          </Column>
          <Column
            field="agent_name"
            class="min-w-[4rem]"
            :header="$t('agent')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-left'}
            }"
          />
          <Column
            field="status"
            class="min-w-[4rem]"
            :header="$t('status')"
            :pt="{
              headerContent: { class: 'font-normal text-center'},
              headerTitle: { class: 'w-full'},
              bodyCell: { class: 'text-left'}
            }"
          />
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
