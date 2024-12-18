<script setup>
import useOrderStore from '@/store/order.js'

const { orderForm } = useOrderStore()
</script>

<template>
  <select
    v-model="orderForm.commission_type"
    class="w-56 border-[--secondary-bg-color] border py-2 px-3 text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 rounded text-center"
  >
    <option
      :value="1"
      selected
    >
      {{ $t('commission_pending') }}
    </option>
    <option
      :value="2"
    >
      {{ $t('commission_discount') }}
    </option>
  </select>
</template>
