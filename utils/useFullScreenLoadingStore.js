import { createGlobalState } from '@vueuse/core'

export default createGlobalState(() => {
  const isLoading = ref(false)
  const isFullScreenLoading = computed(() => {
    return isLoading.value
  })

  function startFullScreenLoading () {
    isLoading.value = true
  }

  function stopFullScreenLoading () {
    isLoading.value = false
  }

  return {
    isFullScreenLoading,
    startFullScreenLoading,
    stopFullScreenLoading
  }
})
