<template>
  <div class="bg-gray-100">
    <NuxtLoadingIndicator/>
    <Header/>
    <div class="min-h-[90vh]">
      <div class="flex p-6 px-8 md:px-6 gap-5">
        <AgencySidebar/>
        <slot/>
      </div>
    </div>
    <Footer/>
    <FullScreenLoader/>
  </div>
</template>
<script setup lang="ts">
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
