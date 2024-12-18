<script setup>
import useSearchingStateStore from '~/utils/useSearchingStateStore.js'

defineProps({
  minorsAgeError: {
    type: Boolean,
    default: false
  }
})
const { hotelDestinations, dateRangeInput } = useHotelFiltersStore()
const { isSearchable } = useSearchingStateStore()

defineEmits(['search'])

</script>
<template>
  <div>
    <DestinationFilter
      type="hotel"
      :destinations="hotelDestinations"
      class="py-3 flex-1"
    />
    <DateRangeInput v-model="dateRangeInput" class="py-3 flex-1" />
    <div class="relative">
      <HotelPaxFilter class="py-3 flex-1" />
      <p
        v-show="minorsAgeError"
        class="absolute text-red-400 text-xs font-bold mt-4 pl-1 bottom-[-0.5rem]"
      >
        {{ $t('incomplete_ages') }}
      </p>
    </div>
    <div class="flex justify-end pt-5 w-full">
      <CustomButton
        :is-loading="!isSearchable"
        @click="$emit('search')"
      >
        {{ $t('search') }}
      </CustomButton>
    </div>
  </div>
</template>
