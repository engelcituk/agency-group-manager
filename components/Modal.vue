<script setup>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'

const closeButtonRef = ref(null)
defineEmits(['close', 'update:isOpen'])
defineProps({
  isOpen: {
    required: true,
    type: Boolean
  },
  small: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <TransitionRoot
    as="template"
    :show="isOpen"
  >
    <Dialog
      :initial-focus="closeButtonRef"
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="$emit('update:isOpen', false)"
    >
      <div class="flex sm:items-end justify-center pt-4 px-6 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-black/90 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block align-top sm:h-screen"
          aria-hidden="true"
        >&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-gray-100 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all w-full max-h-[90vh] overflow-y-auto overflow-xr-hidden sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
            :class="{'sm:max-w-lg': small}"
          >
            <div
              ref="closeButtonRef"
              class="absolute top-1 right-1 flex cursor-pointer"
              @click="$emit('update:isOpen', false)"
            >
              <span class="material-symbols-outlined">cancel</span>
            </div>
            <slot name="body" />
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
