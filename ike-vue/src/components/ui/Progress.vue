<template>
  <div :class="progressClasses" v-bind="$attrs">
    <div 
      :class="indicatorClasses"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number
  max?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100
})

const progressClasses = computed(() => {
  const baseClasses = 'relative h-4 w-full overflow-hidden rounded-full bg-secondary'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})

const indicatorClasses = computed(() => {
  return 'h-full w-full flex-1 bg-primary transition-all'
})
</script> 