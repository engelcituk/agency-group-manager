<script setup>
const { t } = useI18n()

const { paxDetails, getHotelParams } = useHotelFiltersStore()
const { currentCurrency, showCommissions } = useUserSettingsStore()

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const tabs = []
if (props.room.not_refundable_rates.length > 0) {
  tabs.push({ name: t('non_refundable'), key: 'not_refundable', count: props.room.not_refundable_rates.length })
}
if (props.room.refundable_rates.length > 0) {
  tabs.push({ name: t('refundable_rate'), key: 'refundable', count: props.room.refundable_rates.length })
}
const currentTab = ref()
const rates = ref([])
if (tabs.length > 0) {
  changeRates(tabs[0])
}

function changeRates (tab) {
  currentTab.value = tab
  if (tab.key === 'not_refundable') {
    rates.value = props.room.not_refundable_rates
  } else {
    rates.value = props.room.refundable_rates
  }
}

defineEmits(['open-details'])

</script>
<template>
  <CustomContainer
    class="shadow-md overflow-hidden border border-gray-300 bg-white"
  >
    <div
      :style="{'background-image': `url('${room.cover_image}')`}"
      class="w-full h-44 bg-no-repeat bg-cover bg-center"
    />
    <div class="p-3 pb-6 bg-white text-sm">
      <div class="flex justify-end">
        <CustomButton
          class="text-xss py-[0.2rem]"
          @click="$emit('open-details')"
        >
          {{ $t('see_details') }}
        </CustomButton>
      </div>
      <div class="text-base mb-2 h-10">
        <p
          v-snip="{ lines: 2 }"
          class="mt-2"
        >
          {{ room.name }}
        </p>
      </div>
      <div class="flex justify-between mt-4">
        <div class="flex text-xss items-center">
          <span class="material-symbols-outlined text-[--secondary-bg-color]">group</span>
          <span>{{ paxDetails }}</span>
        </div>
      </div>
      <CustomContainer class="relative bg-[#E3FCF6] shadow-md p-2 pt-6 my-2 text-xs grid grid-cols-1 gap-y-0.5 h-auto sm:h-44">
        <div
          v-for="amenity in room.amenities.slice(0, 5)"
          :key="amenity.code"
          class="flex items-start"
        >
          <span class="material-symbols-outlined text-[--secondary-bg-color]">{{ amenity.code }}</span>
          <span class="ml-1">{{ amenity.name }}</span>
        </div>
      </CustomContainer>
      <div class="mt-2">
        {{ $t('choose_plan') }}
      </div>
      <div class="mb-2 flex-1 border border-t-gray-600 translate-y-1/2" />

      <div class="my-2">
        <nav
          class="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          <div
            v-for="(tab, tabIdx) in tabs"
            :key="tab.key"
            :class="[currentTab.key === tab.key ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group cursor-pointer relative min-w-0 overflow-hidden bg-white py-2 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10']"
            :aria-current="tab.current ? 'page' : undefined"
            class="text-xss"
            @click="changeRates(tab)"
          >
            <span>{{ tab.name }} ({{ tab.count }})</span>
            <span
              aria-hidden="true"
              :class="[currentTab.key === tab.key ? '[background:--primary-bg-color]' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-1']"
            />
          </div>
        </nav>
      </div>
      <div
        v-for="rate in rates"
        :key="rate.code"
        class="my-4"
      >
        <div class="text-md font-extrabold text-[#4CB8C4]">
          {{ rate.name }}
        </div>
        <div class="flex justify-between items-center">
          <div>
            <div class="text-xss line-through">
              {{ rate.price }}
            </div>
            <div class="font-bold">
              <span class="font-normal">Total: </span>{{ rate.discount_price }}<span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span>
            </div>
            <div class="text-xs">{{ $t('tax_included') }}</div>
            <div
              v-if="showCommissions"
              class="text-xss"
            >
              {{ $t('commission') }}: {{ rate.commission }}
              <span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span>
            </div>
          </div>
          <router-link :to="{ path: `/hotels/${$route.params.id}/checkout`, query: { ...getHotelParams(), rate_code: rate.code, room_code: room.code, room_id: room.id }}">
            <CustomButton
              class="text-xs my-1"
            >
              {{ $t('select') }}
            </CustomButton>
          </router-link>
        </div>
      </div>
      <div v-if="rates.length === 0">
        <div class="bg-[#F6E7BB] px-4 py-2 flex items-center shadow-md rounded mt-6">
          <div class="flex items-center justify-center">
            <span class="mr-1 material-symbols-outlined text-red-500">sentiment_sad</span>
          </div>
          <div class="text-xs">
            {{ $t('room_unavailable') }}
          </div>
        </div>
      </div>
    </div>
  </CustomContainer>
</template>
