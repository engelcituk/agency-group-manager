<script setup>
import Galleria from 'primevue/galleria'

const activeIndex = ref(0)

const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})

const galleryOpen = defineModel('isOpen', {
  type: Boolean,
  default: false
})

const next = () => {
  activeIndex.value = activeIndex.value === props.hotel.gallery.length - 1 ? props.hotel.gallery.length - 1 : activeIndex.value + 1
}
const prev = () => {
  activeIndex.value = activeIndex.value === 0 ? 0 : activeIndex.value - 1
}
</script>
<template>
  <Modal v-model:is-open="galleryOpen">
    <template #body>
      <div class="text-xl font-bold">
        {{ hotel.name }}
      </div>
      <div class="relative flex justify-center mt-10 w-full">
        <Galleria
          v-model:active-index="activeIndex"
          :value="hotel.gallery"
          :num-visible="5"
          container-style="max-width: 640px; width: 100%"
          :show-thumbnails="false"
          :show-indicators="true"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item"
              style="height: 27rem; display: block"
            >
          </template>
        </Galleria>
        <button
          class="absolute h-10 w-10 rounded-full right-0 bg-black/80 flex-center top-[12rem] opacity-40"
          @click="next"
        >
          <span class="material-symbols-outlined text-white">chevron_right</span>
        </button>
        <button
          class="absolute h-10 w-10 rounded-full left-0 bg-black/80 flex-center top-[12rem] opacity-40"
          @click="prev"
        >
          <span class="material-symbols-outlined text-white">chevron_left</span>
        </button>
      </div>
    </template>
  </Modal>
</template>
