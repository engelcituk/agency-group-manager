<script setup>

import useProfileMenuStore from '~/utils/useProfileMenuStore.js'

const { currentLanguage } = useUserSettingsStore()

const { isProfileMenuOpen } = useProfileMenuStore()

const { logout, user } = useAuthStore()

async function logoutUser() {
  isProfileMenuOpen.value = false
  await logout()
}
</script>

<template>
  <CustomDropdown
    class="hidden md:block"
  >
    <template #value>
      <img
        class="h-4"
        :src="currentLanguage.flag"
        :alt="'flag'"
      >
      <span class="text-xs ml-1">{{ currentLanguage.short.toUpperCase() }}</span>
    </template>
    <template #options>
      <div
        class="absolute top-8 right-0 bg-gray-100 z-20 text-black p-3 shadow-lg"
      >
        <InternationalizationSettings/>
      </div>
    </template>
  </CustomDropdown>
  <CustomDropdown v-model="isProfileMenuOpen">
    <template #value>
      <div class="bg-gray-200 border border-gray-400 rounded-full w-7 h-7 flex items-center justify-center">
        <span class="material-symbols-outlined">person</span>
      </div>
    </template>
    <template #options>
      <div
        class="absolute top-8 right-0 bg-gray-100 z-20 p-3 shadow-lg cursor-auto text-black"
      >
        <div class="w-full flex items-center space-x-4">
          <div class="bg-gray-200 border border-gray-400 rounded-full w-8 h-8 flex items-center justify-center">
            <span class="material-symbols-outlined">person</span>
          </div>
          <div class="flex-1">
            <div class="text-xs font-bold">
              {{ user.name }}
            </div>
            <div class="text-xs text-gray-400 truncate">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="pl-4">
          <div class="flex-1 border-t border-t-gray-300 my-2"/>
          <div class="flex-center">
            <button
              class="text-xs"
              @click="logoutUser"
            >
              {{ $t('logout') }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </CustomDropdown>
</template>

