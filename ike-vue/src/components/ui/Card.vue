<template>
  <div :class="cardClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
}

const props = defineProps<Props>()

const cardClasses = computed(() => {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})
</script> 