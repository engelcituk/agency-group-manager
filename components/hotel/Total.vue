<script setup>
const { currentCurrency } = useUserSettingsStore()
const { cartTotal } = useCartStore()
const { orderForm } = useOrderFormStore()

defineProps({
  hotel: {
    type: Object,
    required: true
  },
  isFinal: {
    type: Boolean,
    default: false
  }
})

</script>
<template>
  <ReservationSummary
    :hotel="hotel"
    :is-final="isFinal"
  >
    <template #hotelTotal>
      <div class="text-right mt-4">
        <div class="mt-2">
          <div
            class="font-bold text-base"
            :class="{'text-xs': orderForm.partial_payment}"
          >
            <span>Subtotal: </span>{{ hotel.room?.rate?.discount_price }}<span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span>
          </div>
          <div class="text-xss">
            {{ $t('tax_included') }}
          </div>
          <div
            v-if="orderForm.partial_payment"
            class="font-bold text-base"
          >
            <span>{{ $t('down_payment') }}: </span>{{ hotel.room?.rate?.partial_payment }}<span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #cartTotal>
      <div class="flex items-center justify-end mt-4 font-bold text-md">
        <span>Total:&nbsp;</span>
        <span>{{ cartTotal }}<span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span></span>
      </div>
      <p class="text-xss text-right">
        {{ $t('tax_included') }}
      </p>
    </template>
  </ReservationSummary>
</template>
