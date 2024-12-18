<script setup>
import Modal from '@/components/Modal.vue'
import CustomContainer from '@/components/CustomContainer.vue'
import Galleria from 'primevue/galleria'
import { ref } from 'vue'

const props = defineProps({
  selectedRoom: {
    type: Object,
    required: true
  }
})

const isOpen = defineModel('isOpen', {
  type: Boolean,
  default: false
})

const activeIndex = ref(0)
const next = () => {
  activeIndex.value = activeIndex.value === props.selectedRoom.gallery.length - 1 ? props.selectedRoom.gallery.length - 1 : activeIndex.value + 1
}
const prev = () => {
  activeIndex.value = activeIndex.value === 0 ? 0 : activeIndex.value - 1
}
</script>
<template>
  <Modal
    v-model:is-open="isOpen"
  >
    <template #body>
      <div class="relative flex justify-center mt-10 w-full">
        <Galleria
          v-model:active-index="activeIndex"
          :value="selectedRoom.gallery"
          :num-visible="5"
          container-style="max-width: 640px; width: 100%"
          :show-thumbnails="false"
          :show-indicators="true"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item"
              style="height: 20rem; display: block"
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
      <div class="text-2xl font-bold mt-2">
        {{ selectedRoom.name }}
      </div>
      <div class="mb-4 text-xs mt-2">
        {{ selectedRoom.description }}
      </div>
      <CustomContainer class="bg-[#E3FCF6] shadow-md p-2 my-2 text-xs grid grid-cols-2 gap-y-0.5">
        <div
          v-for="amenity in selectedRoom.amenities"
          :key="amenity.code"
          class="flex items-center"
        >
          <span class="material-symbols-outlined text-[--secondary-bg-color]">{{ amenity.code }}</span>
          <span class="ml-1">{{ amenity.name }}</span>
        </div>
      </CustomContainer>
    </template>
  </Modal>
</template>
