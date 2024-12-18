<script setup>
const { minorsInput, adultsInput, paxInputDetails, minorsAgesInput } = useHotelFiltersStore()
</script>

<template>
  <CustomInput
    v-model="paxInputDetails"
    readonly="true"
    :label="$t('guest', 2)"
    icon="bed"
  >
    <template #options="{ close }">
      <div
        class="absolute bg-white w-full z-10 text-black p-2 shadow-lg border-2 border-t-0 border-gray-600"
      >
        <div class="py-1 flex items-center justify-between">
          <div class="flex items-center">
            <span class="material-symbols-outlined">group</span>
            <div class="ml-1">
              {{ $t('adults') }}
            </div>
          </div>
          <Counter
            v-model:value="adultsInput"
            :min="1"
            :max="8"
            @increase="adultsInput++"
            @decrease="adultsInput--"
          />
        </div>
        <div class="py-1 flex items-center justify-between">
          <div class="flex items-center">
            <span class="material-symbols-outlined">child_care</span>
            <div class="ml-1">
              {{ $t('minors') }}
            </div>
          </div>
          <Counter
            v-model:value="minorsInput"
            :min="0"
            :max="6"
            @increase="minorsInput++"
            @decrease="minorsInput--"
          />
        </div>
        <div class="py-1 grid grid-cols-2 justify-items-center gap-2">
          <div
            v-for="(el, minorIndex) in minorsAgesInput"
            :key="minorIndex"
            class="w-24 text-xs"
          >
            <div>{{ $t('minor_age', { count: minorIndex + 1 }) }}</div>
            <select
              v-model="minorsAgesInput[minorIndex]"
              class="bg-[#F6F9F9] mt-1 w-24 border border-gray-400 shadow rounded px-2 py-1"
            >
              <option :value="null">
                {{ $t('age') }}
              </option>
              <option
                v-for="(el, i) in Array(18)"
                :key="i"
                :value="i"
              >
                {{ i }} {{ $t('years', i) }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-end">
          <CustomButton
            class="mt-4"
            @click="close()"
          >
            {{ $t('select') }}
          </CustomButton>
        </div>
      </div>
    </template>
  </CustomInput>
</template>
