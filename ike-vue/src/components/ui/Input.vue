<template>
  <div class="w-full">
    <InputText
      v-model="inputValue"
      :class="[
        'w-full',
        'transition-colors',
        'duration-200',
        'border',
        'rounded-md',
        'px-3',
        'py-2',
        'text-sm',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ike-primary',
        'focus:border-ike-primary',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 hover:border-gray-400'
      ]"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :pattern="pattern"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :required="required"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
    />
    <div v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </div>
    <div v-if="hint" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'

interface Props {
  modelValue?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  minlength?: number
  pattern?: string
  autocomplete?: string
  autofocus?: boolean
  required?: boolean
  error?: string
  hint?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'keypress', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  readonly: false,
  autofocus: false,
  required: false
})

const emit = defineEmits<Emits>()

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value || '')
})

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

const handleKeypress = (event: KeyboardEvent) => {
  emit('keypress', event)
}
</script> 