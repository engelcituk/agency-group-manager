<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button
    :disabled="isLoading"
    :class="{'opacity-60': isLoading}"
    type="button"
    class="relative button rounded bg-white text-[--primary-color] px-3 py-2 text-sm shadow-sm box-content border border-[--primary-color]"
  >
    <span
      v-show="isLoading"
      class="lds-dual-ring"
    />
    <span v-show="!isLoading">
      <slot />
    </span>
  </button>
</template>

<style scoped>
button:disabled {
  background: #c0c7ce;
}
.lds-dual-ring {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
