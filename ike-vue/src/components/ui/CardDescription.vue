<template>
  <p :class="descriptionClasses" v-bind="$attrs">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
}

const props = defineProps<Props>()

const descriptionClasses = computed(() => {
  const baseClasses = 'text-sm text-muted-foreground'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})
</script> 