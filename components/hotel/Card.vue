<script setup>
const { currentCurrency } = useUserSettingsStore()
const { getHotelParams } = useHotelFiltersStore()

const galleryOpen = ref(false)

defineProps({
  hotel: {
    type: Object,
    required: true
  }
})

</script>
<template>
  <CustomContainer class="mb-5 bg-white shadow-xl overflow-hidden">
    <div class="flex flex-wrap">
      <div
        :style="{'background-image': `url('${hotel.cover_image}')`}"
        class="w-full sm:w-52 h-48 sm:h-auto bg-no-repeat bg-cover bg-center cursor-pointer"
        @click="galleryOpen = true"
      />
      <div class="flex-1 p-4">
        <NuxtLink
          :to="{ path: `/hotels/${hotel.id}/rooms`, query: getHotelParams() }"
          class="text-xl font-bold under hover:underline cursor-pointer hover:text-blue-500"
        >
          {{ hotel.name }}
        </NuxtLink>
        <div class="flex flex-col md:flex-row gap-1 md:gap-2 text-xss md:items-center">
          <div class="flex items-center text-[--secondary-bg-color]">
            <span class="material-symbols-outlined star-icon">star_rate</span>
            <span class="material-symbols-outlined star-icon">star_rate</span>
            <span class="material-symbols-outlined star-icon">star_rate</span>
            <span class="material-symbols-outlined star-icon">star_rate</span>
            <span class="material-symbols-outlined star-icon">star_rate</span>
          </div>
          <div class="flex items-center">
            <span class="material-symbols-outlined text-[--secondary-bg-color]">local_cafe</span>
            <span class="ml-1">{{ hotel.meal_plan_name }}</span>
          </div>
          <div class="flex items-center text-xss">
            <span class="material-symbols-outlined text-[--secondary-bg-color]">distance</span>
            <span class="ml-1">{{ hotel.address }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between">
          <div class="w-full xl:w-2/3">
            <div class="text-xs mt-2 h-12">
              <p
                v-snip="{ lines: 3 }"
                class="mt-2"
              >
                {{ hotel.description }}
              </p>
            </div>
            <div class="grid grid-cols-3 md:grid-cols-5 gap-x-0 text-xss my-4 md:h-6">
              <div
                v-for="amenity in hotel.amenities?.slice(0, 5)"
                :key="amenity.code"
                class="flex items-center"
              >
                <span class="material-symbols-outlined text-[--secondary-bg-color]">{{ amenity.code }}</span>
                <span class="ml-1">{{ amenity.name }}</span>
              </div>
            </div>
            <div class="flex gap-2 text-xs items-center">
              <CustomContainer
                class="[background:--secondary-bg-color] text-[--secondary-contrast-color] text-white p-1">
                9.4
              </CustomContainer>
              <div>
                <div>{{ $t('exceptional') }}</div>
              </div>
            </div>
          </div>
          <div class="w-full xl:w-1/3 text-right">
            <span class="text-sm line-through">{{ hotel.room.rate.price }}</span>
            <div>
              <div class="text">
                <span class="text-xs">{{ $t('total_from') }}:</span> <span class="font-bold">{{
                  hotel.room.rate.discount_price
                }}</span><span class="text-xss">{{ ' ' + currentCurrency.key.toUpperCase() }}</span>
              </div>
              <div class="text-xs">
                {{ $t('tax_included') }}
              </div>
            </div>
            <NuxtLink
              :to="{ path: `/hotels/${hotel.id}/rooms`, query: getHotelParams() }"
              class="text-xl font-bold under hover:underline cursor-pointer hover:text-blue-500"
            >
              <CustomButton class="mt-4">
                {{ $t('book_hotel') }}
              </CustomButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <HotelPhotoGallery
      v-model:is-open="galleryOpen"
      :hotel="hotel"
    />
  </CustomContainer>
</template>
