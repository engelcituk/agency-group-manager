<script setup>
import moment from 'moment'
import 'moment/dist/locale/es'
import { capitalCase } from 'change-case'
import { DatePicker } from 'v-calendar'
import { useInfiniteScroll, useScroll } from '@vueuse/core'
import 'v-calendar/style.css'

defineProps({
  showClearButton: {
    type: Boolean,
    default: false
  }
})

const value = defineModel()
const dateRangeDetails = computed(() => {
  if (!value.value?.start) return null
  const startDateLabel = moment(value.value.start).format('DD-MMM-YYYY')
  const endDateLabel = moment(value.value.end).format('DD-MMM-YYYY')
  return `${startDateLabel} / ${endDateLabel}`
})

const { isMobile } = useScreenUtilsStore()

const calendarContainer = ref()
const { y } = useScroll(calendarContainer)
const calendar = ref()
const calendarOpen = ref(false)
const selectedMonthIndex = ref(0)

let firstCalendarLoad = true
useInfiniteScroll(calendarContainer, async () => {
  if (firstCalendarLoad) {
    firstCalendarLoad = false
    return
  }
  await calendar.value.moveBy(1)
  y.value = 0
}, { distance: 0, interval: 1000 })

const { currentLanguage } = useUserSettingsStore()
moment.locale(currentLanguage.short)
const minDate = moment().subtract(10, 'years')
const maxDate = moment().add(2, 'year')

const monthList = []
const currentMonth = moment().subtract(1, 'year')
function addMonths (monthsToAdd) {
  for (let i = 0; i < monthsToAdd; i++) {
    monthList.push({
      monthIndex: currentMonth.get('months'),
      year: currentMonth.get('year'),
      label: capitalCase(currentMonth.format('MMMM'))
    })
    currentMonth.add(1, 'month')
  }
}

function onCalendarChangePage (pages) {
  selectedMonthIndex.value = monthList.findIndex(
    month => month.monthIndex === pages[0].month - 1 && month.year === pages[0].year
  )
}

async function onMonthClick (monthListElement) {
  await calendar.value.move({ month: monthListElement.monthIndex + 1, year: monthListElement.year })
}

function onShowCalendar () {
  const currentDate = moment(value.value?.start) || moment()
  calendar.value.move(currentDate.toDate())
  selectedMonthIndex.value = monthList.findIndex(
    month => month.monthIndex === currentDate.month() && month.year === currentDate.year()
  )
}

addMonths(24)
</script>
<template>
  <CustomInput
    v-model="dateRangeDetails"
    v-model:optionsOpen="calendarOpen"
    readonly="true"
    :label="$t('arrive_leave_dates')"
    icon="today"
    :show-clear-button="showClearButton"
    @clear="value = { start: null, end: null }"
    @open-options="onShowCalendar"
  >
    <template #options="{ close }">
      <div
        v-if="isMobile"
        class="fixed inset-0 bg-black/80 w-screen h-screen z-30 p-5 text-black"
      >
        <div class="flex flex-col bg-white w-full h-full p-5 overscroll-y-auto">
          <div class="text-md text-center pb-2">
            {{ $t('select_dates') }}
          </div>
          <div class="h-full overflow-y-auto">
            <DatePicker
              ref="calendar"
              v-model.range="value"
              title-position="none"
              transparent
              color="gray"
              borderless
              :min-date="minDate.toDate()"
              :max-date="maxDate.toDate()"
              expanded
              :rows="2"
              :step="1"
              locale="es"
              @did-move="onCalendarChangePage"
            />
          </div>
          <div class="flex pt-4 gap-2 justify-end">
            <button
              class="bg-transparent [border-radius:--border-radius] text-black h-8 px-3 text-center text-xs"
              @click="calendarOpen = false"
            >
              {{ $t('cancel') }}
            </button>
            <button
              class="bg-[--primary-color] [border-radius:--border-radius] text-[--accent-color] h-8 px-3 text-center text-xs"
              @click="calendarOpen = false"
            >
              {{ $t('select') }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="absolute bg-white w-96 z-30 text-black p-2 h-[30rem] shadow-lg"
      >
        <div class="flex h-[85%]">
          <div class="p-2 w-24 overflow-y-auto">
            <div
              v-for="(month, index) in monthList"
              :key="index"
              class="text-xs my-1 cursor-pointer"
            >
              <div
                v-if="month.monthIndex === 0 || index === 0"
                class="flex text-xss opacity-40"
              >
                <div class="mr-2">
                  {{ month.year }}
                </div>
                <div class="flex-1 border border-t-gray-600 translate-y-1/2" />
              </div>
              <div
                :class="{ 'font-bold': selectedMonthIndex === index }"
                @click="onMonthClick(month)"
              >
                {{ month.label }}
              </div>
            </div>
          </div>
          <div
            ref="calendarContainer"
            class="flex-1 h-full overflow-y-auto"
          >
            <DatePicker
              ref="calendar"
              v-model.range="value"
              title-position="none"
              transparent
              color="gray"
              borderless
              :min-date="minDate.toDate()"
              :max-date="maxDate.toDate()"
              expanded
              :rows="2"
              :step="1"
              :locale="currentLanguage.short"
              @did-move="onCalendarChangePage"
            />
            <div class="mb-10" />
          </div>
        </div>
        <div class="flex justify-end">
          <CustomButton
            class="mt-4"
            @click="close()"
          >
            {{ $t('select') }}
          </CustomButton>
        </div>
      </div>
    </template>
  </CustomInput>
</template>
