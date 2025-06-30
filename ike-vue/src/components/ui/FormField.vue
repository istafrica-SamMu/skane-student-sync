<template>
  <div :class="fieldClasses">
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="mt-1">
      <slot />
    </div>
    <p v-if="error" :class="errorClasses">
      {{ error }}
    </p>
    <p v-else-if="description" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  error?: string
  description?: string
  required?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false
})

const id = computed(() => `field-${Math.random().toString(36).substr(2, 9)}`)

const fieldClasses = computed(() => {
  const baseClasses = 'space-y-2'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})

const labelClasses = computed(() => {
  return 'text-sm font-medium text-ike-neutral-dark'
})

const errorClasses = computed(() => {
  return 'text-sm font-medium text-destructive'
})

const descriptionClasses = computed(() => {
  return 'text-sm text-muted-foreground'
})
</script> 