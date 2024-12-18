<script setup>
const {
  currentLanguage,
  languages,
  changeCurrentLanguage
} = useUserSettingsStore()

function selectLanguage (event) {
  const languageKey = event.target.value
  changeCurrentLanguage(languageKey)
}
</script>

<template>
  <div class="text-xs">
    {{ $t('language') }}
  </div>
  <select
    class="border-gray-300 py-2 px-3 text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
    @change="selectLanguage"
  >
    <option
      v-for="language in languages"
      :key="language.key"
      :selected="currentLanguage.key === language.key"
      :value="language.key"
    >
      {{ language.label }}
    </option>
  </select>
<!--  <div class="text-xs mt-4">-->
<!--    {{ $t('currency') }}-->
<!--  </div>-->
<!--  <select-->
<!--    class="border-gray-300 py-2 px-3 text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"-->
<!--    @change="e => changeCurrentCurrency(e.target.value)"-->
<!--  >-->
<!--    <option-->
<!--      v-for="currency in currencies"-->
<!--      :key="currency.key"-->
<!--      :selected="currentCurrency.key === currency.key"-->
<!--      :value="currency.key"-->
<!--    >-->
<!--      {{ currency.label }}-->
<!--    </option>-->
<!--  </select>-->
</template>
