<template>
  <div
    class="hidden sm:block w-52 mt-2"
  >
    <div class="flex flex-col gap-2 text-[#4CB8C4]">
      <NuxtLink
        to="/agencies"
        active-class="text-white bg-[#41CAB4]"
        class="flex items-center cursor-pointer p-2 rounded"
      >
        <span class="material-symbols-outlined">support_agent</span>
        <span class="ml-1">{{ $t('agencies') }}</span>
      </NuxtLink>
      <NuxtLink
        to="/reservations"
        active-class="text-white bg-[#41CAB4]"
        class="flex items-center cursor-pointer p-2 rounded"
      >
        <span class="material-symbols-outlined">checklist</span>
        <span class="ml-1">{{ $t('reservations') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
