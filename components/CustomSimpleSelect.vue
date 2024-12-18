<script setup>
import CustomInput from '@/components/CustomInput.vue'
import { watch } from 'vue'

defineProps({
  options: {
    type: Array,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  optionKey: {
    type: String,
    default: 'id'
  },
  optionName: {
    type: String,
    default: 'name'
  },
  showClearButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update'])

const value = defineModel({ default: {} })

watch(value, v => {
  if (!v) value.value = {}
  emit('update', v)
})

</script>
<template>
  <CustomInput
    v-model="value[optionName]"
    readonly="true"
    :label="$t('destination')"
    :icon="icon"
    :close-on-input="true"
    :show-clear-button="showClearButton"
    @clear="value = {}"
  >
    <template #options>
      <div
        class="absolute bg-white w-full z-10 text-black max-h-48 overflow-y-auto shadow-lg border-2 border-t-0 border-gray-600"
      >
        <div
          v-for="option in options"
          :key="option[optionKey]"
          class="p-3 flex items-center hover:bg-[#4CB8C4] cursor-pointer"
          @mousedown="value = option"
        >
          <div class="ml-6 truncate">
            {{ option[optionName] }}
          </div>
        </div>
      </div>
    </template>
  </CustomInput>
</template>
