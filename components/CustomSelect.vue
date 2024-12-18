<script setup>
import { onKeyStroke } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  optionsOpen: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  optionKey: {
    type: String,
    default: 'id'
  },
  optionName: {
    type: String,
    default: 'name'
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

let blockMouseEnter = false
const localOptionsOpen = ref(props.optionsOpen)
const inputFilter = ref('')
const selectedOption = ref({})
const highlightedOptionIndex = ref(0)
const visibleOptions = computed(() => {
  return props.options.filter(option => {
    return option[props.optionName]?.toLowerCase().includes(inputFilter.value.toLowerCase())
  }).filter(option => {
    if (inputFilter.value.length === 0) return true
    return !option.suggested
  })
})

watch(visibleOptions, () => {
  highlightedOptionIndex.value = 0
})

watch(() => props.optionsOpen, (value) => {
  localOptionsOpen.value = value
})

if (props.modelValue?.id) {
  selectOption(props.modelValue)
}
watch(() => props.modelValue, (value) => {
  selectOption(value)
})

const mainInput = ref(null)
function selectOption (option) {
  selectedOption.value = option
  inputFilter.value = option[props.optionKey] ? option[props.optionName] : ''
  localOptionsOpen.value = false
  emit('update:modelValue', selectedOption.value)
  emit('select', selectedOption.value)
}

function terminateFilter () {
  if (selectedOption.value[props.optionKey]) {
    inputFilter.value = selectedOption.value[props.optionName]
  } else {
    inputFilter.value = ''
  }
}

onKeyStroke('ArrowDown', (e) => {
  e.preventDefault()
  if (!localOptionsOpen.value) return
  blockMouseEnter = true
  highlightedOptionIndex.value += 1
  if (highlightedOptionIndex.value === visibleOptions.value.length) highlightedOptionIndex.value = 0
  scrollToSelected()
})

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault()
  if (!localOptionsOpen.value) return
  blockMouseEnter = true
  highlightedOptionIndex.value -= 1
  if (highlightedOptionIndex.value < 0) highlightedOptionIndex.value = visibleOptions.value.length - 1
  scrollToSelected()
})

onKeyStroke('Enter', (e) => {
  e.preventDefault()
  if (!localOptionsOpen.value) return
  selectOption(visibleOptions.value[highlightedOptionIndex.value])
})

const optionsElement = ref(null)

function scrollToSelected () {
  const scrollableDiv = optionsElement.value
  const selectedOption = scrollableDiv.children[highlightedOptionIndex.value]
  const selectedOptionTop = selectedOption.offsetTop
  const selectedOptionHeight = selectedOption.offsetHeight
  const scrollableDivTop = scrollableDiv.offsetTop
  const scrollableDivHeight = scrollableDiv.offsetHeight

  if (selectedOptionTop < scrollableDivTop) {
    scrollableDiv.scrollTop = selectedOptionTop
  } else if (selectedOptionTop + selectedOptionHeight > scrollableDivTop + scrollableDivHeight) {
    scrollableDiv.scrollTop = selectedOptionTop + selectedOptionHeight - scrollableDivHeight
  }
}

function onMouseEnterInOption (index) {
  if (blockMouseEnter) {
    blockMouseEnter = false
    return
  }
  highlightedOptionIndex.value = index
}

</script>

<template>
  <CustomInput
    ref="mainInput"
    v-model="inputFilter"
    v-model:options-open="localOptionsOpen"
    :label="label"
    :close-on-input="true"
    @clear="selectOption({})"
    @options-close="terminateFilter"
  >
    <template #options>
      <div
        ref="optionsElement"
        class="absolute bg-white w-full z-10 text-black max-h-48 overflow-y-auto shadow-xl border-2 border-t-0 border-gray-600"
      >
        <div
          v-for="(option, index) in visibleOptions"
          :key="option[optionKey]"
          class="p-3 flex items-center cursor-pointer"
          :class="{'bg-gray-200': highlightedOptionIndex === index}"
          @mousedown="selectOption(option)"
          @mouseenter="onMouseEnterInOption(index)"
          @mousemove="onMouseEnterInOption(index)"
        >
          <span
            v-if="option.icon"
            class="material-symbols-outlined"
          >{{ option.icon }}</span>
          <div class="ml-2 truncate">
            {{ option[optionName] }}
          </div>
        </div>
      </div>
    </template>
  </CustomInput>
</template>
