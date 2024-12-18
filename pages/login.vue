<script setup>

import { useStorage } from '@vueuse/core'

definePageMeta({
  layout: false
})
const router = useRouter()

const { t } = useI18n()
const { startFullScreenLoading, stopFullScreenLoading } = useFullScreenLoadingStore()
const email = ref('')
const password = ref('')
const passwordMode = ref('password')
const errorMessage = ref()

const { login } = useAuthStore()

const rememberMe = useStorage('remember-me', false)
const rememberEmail = useStorage('remember-email', '')

if (rememberEmail.value) {
  email.value = rememberEmail.value
}

async function attemptLogin () {
  try {
    errorMessage.value = ''
    startFullScreenLoading()
    await login(email.value, password.value)

    if (rememberMe.value) {
      rememberEmail.value = email.value
    } else {
      rememberEmail.value = ''
    }

    if ('redirect' in router.currentRoute.value.query) {
      await router.push(router.currentRoute.value.query.redirect)
    } else {
      await router.push({ path: '/' })
    }
    stopFullScreenLoading()
  } catch (e) {
    console.log(e)
    stopFullScreenLoading()
    errorMessage.value = t('invalid_credentials')
  }
}

</script>
<template>
  <div class="form-container flex justify-center md:justify-between h-screen p-0 sm:p-12">
    <div class="bg-white sm:rounded-3xl w-full mr-0 sm:mr-8 sm:w-80 py-12 px-8">
      <div class="mt-12 flex justify-center">
        <img
          class="h-32"
          src="@/assets/img/mh_logo.jpg"
          alt="The Fives Logo"
        >
      </div>
      <form
        class="flex flex-col mt-10 gap-8 text-sm"
        @submit.prevent="attemptLogin"
      >
        <CustomInput
          v-model="email"
          label="Email"
        />
        <CustomInput
          v-model="password"
          label="Password"
          :type="passwordMode"
          :show-reveal-button="password !== ''"
          @reveal="passwordMode = passwordMode === 'password' ? 'text' : 'password'"
        />
<!--        <router-link-->
<!--          to="/forgot-password"-->
<!--          class="text-xs text-[#4CB8C4] text-right"-->
<!--        >-->
<!--          {{ $t('forgot_password') }}-->
<!--        </router-link>-->
        <div class="flex items-center justify-end">
          <Toggle
            v-model="rememberMe"
            @keyup.space="rememberMe = !rememberMe"
          />
          <span class="text-xs ml-2">{{ $t('remember_me') }}</span>
        </div>
        <div
          v-if="errorMessage"
          class="text-red-500"
        >
          {{ errorMessage }}
        </div>
        <div class="mt-4 flex justify-end">
          <CustomButton type="submit">
            {{ $t('login') }}
          </CustomButton>
        </div>
      </form>
    </div>
    <div class="image-container flex-1 hidden md:block bg-no-repeat overflow-hidden rounded-3xl">
      <div class="image-cover flex justify-center items-center h-full w-full px-24">
        <div class="text-white text-center text-6xl">

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-container {
  background: var(--primary-color);
  box-shadow: 8px 8px 10px 0px rgba(0, 0, 0, 0.50);
}
.image-container {
  background-image: url('@/assets/img/login.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: 6px 6px 30px 0px rgba(0, 0, 0, 0.25);
}
.image-cover {
  background: rgba(9, 9, 9, 0.6);
}
</style>
