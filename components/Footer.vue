<script setup>
import Modal from '@/components/Modal.vue'

const { currentLanguage } = useUserSettingsStore()
const privacyModalOpen = ref(false)
</script>

<template>
  <div class="bg-[#585857] py-4 px-4 md:px-20">
    <Modal v-model:is-open="privacyModalOpen">
      <template #body>
        <iframe
          class="h-[40rem] w-full"
          :src="currentLanguage.privacy_policy"
        />
      </template>
    </Modal>
    <div class="max-w-7xl mx-auto text-white">
      <div class="flex flex-col md:flex-row justify-center md:justify-between">
        <div class="flex justify-center">
          <img
            class="h-24"
            src="@/assets/img/mh_logo_white.png"
            alt="The Fives Logo"
          >
        </div>
        <div class="flex justify-center">
          <div class="text-xs">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-2xl">phone</span>
              <span>{{ $t('phone') }}</span>
            </div>
            <div>USA & CAN: 800-789-4595</div>
            <div>MEX: 984-242-0175</div>
            <div class="flex items-center mt-2">
              <span class="material-symbols-outlined text-2xl">email</span>
              <span>{{ $t('email') }}</span>
            </div>
            <div>tabookings@marholidaystravel.com</div>
          </div>
        </div>
      </div>
      <div class="justify-center mt-6 pt-4 border-t text-center">
        © MAR HOLIDAYS TRAVEL NETWORK, A COMPANY OF MAR HOLIDAYS TRAVEL D.M.C.
      </div>
      <div class="flex justify-center">
        <button
          class="underline ml-2 mt-2"
          @click="privacyModalOpen = true"
        >
          {{ $t('privacy_policy') }}
        </button>
      </div>
    </div>
  </div>
</template>
