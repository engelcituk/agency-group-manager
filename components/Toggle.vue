<script setup>
import { Switch } from '@headlessui/vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
defineEmits(['update:modelValue'])

</script>

<template>
  <Switch
    :checked="modelValue"
    :class="[modelValue ? 'bg-[#4CB8C4]' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:[#4CB8C4] focus:ring-offset-2']"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      :class="[modelValue ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
    />
  </Switch>
</template>
