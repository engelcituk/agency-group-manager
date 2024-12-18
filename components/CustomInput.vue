<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  closeOnInput: {
    type: Boolean,
    default: false
  },
  optionsOpen: {
    type: Boolean,
    default: false
  },
  showClearButton: {
    type: Boolean,
    default: false
  },
  showRevealButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:optionsOpen', 'openOptions', 'optionsClose', 'clear', 'reveal'])

const el = ref(null)
const focused = ref(false)
const localOptionsOpen = ref(props.optionsOpen)

watch(() => props.optionsOpen, (value) => {
  localOptionsOpen.value = value
})

onClickOutside(el, () => {
  localOptionsOpen.value = false
  emit('update:optionsOpen', false)
})

function openOptions () {
  localOptionsOpen.value = true
  emit('update:optionsOpen', true)
  emit('openOptions')
}

function closeOptions () {
  localOptionsOpen.value = false
  emit('optionsClose')
  emit('update:optionsOpen', false)
}

async function onFocus () {
  focused.value = true
  openOptions()
}

async function onBlur () {
  focused.value = false
  if (props.closeOnInput) {
    closeOptions()
  }
}
</script>

<template>
  <div
    ref="el"
    class="relative"
  >
    <input
      v-bind="$attrs"
      :value="modelValue"
      class="w-full bg-transparent border-b-2 border-b-current focus:outline-none p-1 pb-0.5"
      :class="{'pl-8': !!icon, 'bg-[rgba(255,255,255,0.34)]': !!modelValue, '!bg-gray-200': $attrs.disabled }"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
    >
    <span
      v-if="icon"
      class="placeholder-icon material-symbols-outlined w-2 h-2"
    >{{ icon }}</span>
    <label
      class="placeholder-text"
      :class="{'with-icon': !!icon}"
    >
      <span
        class="text"
        :class="{ filled: !!modelValue || focused || localOptionsOpen }"
      >{{ label }}</span>
    </label>
    <div v-show="localOptionsOpen">
      <slot
        :close="closeOptions"
        name="options"
      />
    </div>
    <button
      v-if="modelValue && showClearButton"
      class="clear-button w-3 h-3 rounded-full flex-center"
      @click="emit('clear')"
    >
      <span
        class="text-md clear-icon material-symbols-outlined"
      >close</span>
    </button>
    <button
      v-if="showRevealButton"
      type="button"
      tabindex="-1"
      class="show-button w-5 h-5 rounded-full flex-center pr-2"
      @click="emit('reveal')"
    >
      <span
        v-if="$attrs.type === 'password'"
        class="text-md clear-icon material-symbols-outlined"
      >visibility</span>
      <span
        v-else
        class="text-md clear-icon material-symbols-outlined"
      >visibility_off</span>
    </button>
  </div>
</template>

<style scoped>

input::-ms-reveal {
  display:none;
}

.placeholder-icon {
  position: absolute;
  bottom: 0.6rem;
  left: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.clear-button {
  position: absolute;
  bottom: 40%;
  right: 2%;
  display: flex;
  align-items: center;
}

.show-button {
  position: absolute;
  top: 20%;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
}

.placeholder-text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.with-icon {
  left: 2rem;
}

.filled {
  font-size: 0.6rem;
  transform: translate(0, -120%);
}
.text {
  transition: transform 0.15s ease-out, font-size 0.15s ease-out, background-color 0.2s ease-out, color 0.15s ease-out;
}
</style>
