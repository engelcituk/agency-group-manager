export default defineNuxtRouteMiddleware(async (to, from) => {

  if (import.meta.server) return

  const { user } = useAuthStore()

  if (to.path === '/login' && user.value?.email) {
    return navigateTo('/')
  }

  if (to.path === '/login') return

  if (!user.value?.email) {
    return navigateTo('/login')
  }

})
