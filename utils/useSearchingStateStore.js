import { createGlobalState } from '@vueuse/core'

export default createGlobalState(() => {
  const isSearchable = ref(true)

  function enableSearch () {
    isSearchable.value = true
  }

  function disableSearch () {
    isSearchable.value = false
  }

  return {
    isSearchable: readonly(isSearchable),
    enableSearch,
    disableSearch
  }
})
