<script setup>
import { onClickOutside } from '@vueuse/core'

const optionsOpen = defineModel({ default: false })
const el = ref(null)

onClickOutside(el, () => {
  optionsOpen.value = false
})

</script>
<template>
  <div
    ref="el"
    class="relative cursor-pointer [border-radius:--border-radius]"
  >
    <div
      class="flex items-center"
      @click="optionsOpen = !optionsOpen"
    >
      <slot name="value" />
      <span class="mr-1 material-symbols-outlined">expand_more</span>
    </div>
    <div v-show="optionsOpen">
      <slot name="options" />
    </div>
  </div>
</template>
