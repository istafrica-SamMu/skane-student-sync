<template>
  <h3 :class="titleClasses" v-bind="$attrs">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
}

const props = defineProps<Props>()

const titleClasses = computed(() => {
  const baseClasses = 'text-2xl font-semibold leading-none tracking-tight'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})
</script> 