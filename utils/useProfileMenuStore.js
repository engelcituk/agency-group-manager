import { createGlobalState } from '@vueuse/core'

export default createGlobalState(() => {
  const isProfileMenuOpen = ref(false)

  return {
    isProfileMenuOpen
  }
})
