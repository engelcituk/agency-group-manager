<script setup>
const { currentCurrency } = useUserSettingsStore()

const props = defineProps({
  hotel: {
    type: Object,
    required: false,
    default: () => ({})
  },
  isFinal: {
    type: Boolean,
    default: false
  }
})

const {
  paxDetails,
  cartTotal
} = useCartStore()

</script>

<template>
  <div>
    <div v-if="hotel.id">
      <h1 class="text-sm font-bold">
        {{ $t('reservation_summary') }}
      </h1>
      <h2 class="my-2">
        {{ hotel.name }}
      </h2>
      <p class="text-xss">
        {{ hotel.address }}
      </p>
      <div class="flex items-center text-xs my-1">
        <span class="material-symbols-outlined text-[--secondary-bg-color] w-8">king_bed</span>
        <span class="flex-1 ml-1">{{ $t('room') + ' ' + hotel.room?.name }}</span>
      </div>
      <div class="flex items-center text-xs my-1">
        <span class="material-symbols-outlined text-[--secondary-bg-color] w-8">groups</span>
        <span class="flex-1 ml-1">{{ paxDetails }}</span>
      </div>
      <div class="flex items-center text-xs my-1">
        <span
          v-if="hotel.room?.rate?.meal_plan === 'ASI'"
          class="material-symbols-outlined text-[--secondary-bg-color] w-8"
        >all_inclusive</span>
        <span
          v-else
          class="material-symbols-outlined text-[--secondary-bg-color] w-8"
        >local_cafe</span>
        <p class="flex-1 ml-1">
          <span>{{ hotel.room?.rate?.meal_plan_name }}</span>
          <span
            v-if="hotel.room?.rate?.refundable"
            class="flex-1 ml-1"
          >- {{ $t('refundable_rate') }}</span>
          <span
            v-else
            class="flex-1 ml-1"
          >- {{ $t('non_refundable') }}</span>
        </p>
      </div>
      <div class="flex items-center text-xs my-1">
        <span class="material-symbols-outlined text-[--secondary-bg-color] w-8">today</span>
        <span class="flex-1 ml-1">{{ $t('arrive') }}: {{ hotel.start_date }}</span>
      </div>
      <div class="flex items-center text-xs my-1">
        <span class="material-symbols-outlined text-[--secondary-bg-color] w-8">event</span>
        <span class="flex-1 ml-1">{{ $t('leave') }}: {{ hotel.end_date }}</span>
      </div>
      <div class="flex items-center text-xs my-1">
        <span class="material-symbols-outlined text-[--secondary-bg-color] w-8">event_available</span>
        <span class="flex-1 ml-1">{{ $t('stay') }}: {{ hotel.total_nights }} {{ $t('nights', hotel.total_nights) }}</span>
      </div>
      <slot name="hotelTotal">
        <div class="flex items-center justify-end my-1 text-sm">
          <span>{{ $t('subtotal') }}:&nbsp;</span>
          <p class="font-bold">{{ hotel.room?.rate?.discount_price }}<span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span></p>
        </div>
      </slot>

      <div class="flex-1 border border-transparent border-t-gray-600 translate-y-1/2" />

      <slot name="cartTotal">
        <div class="flex items-center justify-end mt-4 font-bold text-md">
          <span>Total:&nbsp;</span>
          <p>{{ cartTotal }}<span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span></p>
        </div>
        <p class="text-xss text-right">
          {{ $t('tax_included') }}
        </p>
      </slot>
    </div>
    <div v-else>
      <ListItemSkeleton
        class="!h-6"
      />
      <ListItemSkeleton
        class="!h-48 mt-3"
      />
    </div>
  </div>
</template>
