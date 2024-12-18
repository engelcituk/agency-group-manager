<script setup>

const props = defineProps({
  transfer: {
    type: Object,
    default: () => ({})
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['submit'])

const { user } = useAuthStore()
const {
  orderForm,
  resetStore,
  orderFormError
} = useOrderFormStore()

orderForm.country = {}
const countries = ref([])
const tacOpen = ref(false)
const tac = ref('')

const { selectedTransfers } = useCartStore()
const { transferSummary } = useOrderFormStore()

onMounted(async () => {
  resetStore()
  if (!props.transfer.id) {
    transferSummary.value = selectedTransfers.value?.[0] || {}
  }
  await fetchTac()
  await fetchCountries()
})

async function fetchCountries () {
  const data = await $fetch('/api/countries', { server: false })
  const allCountries = JSON.parse(JSON.stringify(data))
  const commonCountries = data
    .filter(country => ['MX', 'US', 'CA'].includes(country.code))
    .map(country => {
      country.suggested = true
      country.code = country.code + '_'
      return country
    })
  countries.value = commonCountries.concat(allCountries)
}

async function fetchTac () {
  // const { data } = await $fetch('tac')
  // tac.value = data.content
}

</script>

<template>
  <div>
    <div class="text-lg font-bold">
      {{ $t('reservation_holder') }}
    </div>
    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2">
      <div class="lg:col-span-1 lg:col-start-1">
        <CustomInput
          v-model="orderForm.name"
          name="name"
          :label="$t('name')"
        />
      </div>
      <div class="lg:col-span-1 lg:col-start-2">
        <CustomInput
          v-model="orderForm.last_name"
          name="last_name"
          :label="$t('last_name')"
        />
      </div>
      <div class="lg:col-span-1 sm:col-start-1">
        <CustomSelect
          v-model:model-value="orderForm.country"
          name="country"
          :options="countries"
          :label="$t('country')"
          option-key="code"
        />
      </div>
    </div>
    <div class="text-lg font-bold mt-8">
      {{ $t('contact_info') }}
    </div>
    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2">
      <div class="lg:col-span-1 lg:col-start-1">
        <CustomInput
          v-model="orderForm.email"
          :label="$t('email')"
          name="email"
        />
      </div>
      <div class="lg:col-span-1 lg:col-start-2">
        <CustomInput
          v-model="orderForm.phone"
          :label="$t('phone')"
          name="phone"
        />
      </div>
    </div>
    <div class="mt-8 flex items-center justify-end">
      <input
        id="terms"
        v-model="orderForm.accepted_terms"
        type="checkbox"
      >
      <label
        for="terms"
        class="ml-4 font-bold"
      >
        {{ $t('i_agree') }}
        <button
          class="text-[#4CB8C4]"
          @click="tacOpen = true"
        >{{ $t('terms_and_conditions') }}
        </button>
      </label>
    </div>
    <div
      v-if="!isLoading"
      class="mt-4 flex justify-end"
    >
      <CustomButton
        @click="$emit('submit')"
      >
        {{ $t('continue_payment') }}
      </CustomButton>
    </div>
    <p
      v-show="orderFormError"
      class="text-red-400 text-xs font-bold mt-4"
    >
      {{ $t('order_error') }}
    </p>
    <Modal v-model:is-open="tacOpen">
      <template #body>
        <div v-html="tac" />
      </template>
    </Modal>
  </div>
</template>
