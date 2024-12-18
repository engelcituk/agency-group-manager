<script setup>
import { watch } from 'vue'
import { useCounter } from '@vueuse/core'

const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  value: {
    type: Number,
    required: false,
    default: 0
  }
})

const emit = defineEmits(['update:value', 'increase', 'decrease'])

const { count, inc, dec } = useCounter(props.value, { min: props.min, max: props.max })

watch(count, (value) => {
  emit('update:value', value)
})

watch(() => props.value, () => {
  count.value = props.value
})

function increase () {
  if (count.value === props.max) return
  inc()
  emit('increase')
}

function decrease () {
  if (count.value === props.min) return
  dec()
  emit('decrease')
}

</script>

<template>
  <div class="flex items-center select-none">
    <div
      class="border [border-color:#4CB8C4] flex justify-center items-center h-6 w-6 rounded-full cursor-pointer"
      @click="decrease()"
    >
      <span class="material-symbols-outlined text-[#4CB8C4]">remove</span>
    </div>
    <div class="mx-2">
      {{ count }}
    </div>
    <div
      class="border [border-color:#4CB8C4] flex justify-center items-center h-6 w-6 rounded-full cursor-pointer"
      @click="increase()"
    >
      <span class="material-symbols-outlined text-[#4CB8C4]">add</span>
    </div>
  </div>
</template>
