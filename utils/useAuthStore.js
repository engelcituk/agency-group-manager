import { createGlobalState, useStorage } from '@vueuse/core'

export default createGlobalState(() => {
  const user = useStorage('user', {})
  const router = useRouter()
  const userCommission = ref()

  async function login (email, password) {
     user.value = await $fetch('/api/public/login', {
      method: 'POST',
      body: { email, password },
    })
  }

  async function logout () {
    await $fetch('/api/public/logout', {
      method: 'POST',
    })
    user.value = {}
    await router.push({ path: '/login' })
  }

  return {
    login,
    logout,
    userCommission,
    user
  }
})
