<script setup>
import CustomContainer from '@/components/CustomContainer.vue'
</script>
<template>
  <CustomContainer
    class="mb-5 bg-white shadow-xl"
  >
    <div class="flex flex-wrap">
      <div
        class="shining w-full sm:w-52 h-48 sm:h-auto"
      />
      <div class="flex-1 p-2">
        <div class="shining text-xl h-8" />
        <div class="flex gap-2 mt-2">
          <div class="shining h-4 w-24" />
        </div>
        <div class="shining h-12 mt-2" />
        <div class="flex flex-wrap gap-2 my-2">
          <div class="shining h-4 w-12" />
          <div class="shining h-4 w-12" />
          <div class="shining h-4 w-12" />
          <div class="shining h-4 w-12" />
          <div class="shining h-4 w-12" />
        </div>
        <div class="flex items-end justify-between">
          <div />
          <div class="shining h-10 w-28" />
        </div>
      </div>
    </div>
  </CustomContainer>
</template>
