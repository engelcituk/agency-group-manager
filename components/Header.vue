<script setup>
</script>

<template>
  <div>
    <div class="bg-white shadow-md px-8 py-2 h-[4rem]">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center">
          <div class="flex">
            <NuxtLink to="/">
              <img
                class="h-12"
                src="~/assets/img/mh_logo.jpg"
                alt="The Fives Logo"
              >
            </NuxtLink>
          </div>
          <div class="flex space-x-1 items-center">
            <SettingsDropdown />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
