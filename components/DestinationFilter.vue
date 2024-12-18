<script setup>
defineProps({
  destinations: {
    type: Array,
    required: true
  }
})

const { destinationInput } = useHotelFiltersStore()

</script>
<template>
  <CustomInput
    v-model="destinationInput.name"
    readonly="true"
    :label="$t('destination')"
    icon="distance"
    :close-on-input="true"
    :show-clear-button="true"
    @clear="destinationInput = {}"
  >
    <template #options>
      <div
        class="absolute bg-white w-full z-10 text-black max-h-48 overflow-y-auto shadow-lg border-2 border-t-0 border-gray-600"
      >
        <div
          v-for="dest in destinations"
          :key="dest.id"
          class="p-3 flex items-center hover:bg-[#4CB8C4] cursor-pointer"
          @mousedown="destinationInput = dest"
        >
          <div class="ml-6 truncate">
            {{ dest.name }}
          </div>
        </div>
      </div>
    </template>
  </CustomInput>
</template>
