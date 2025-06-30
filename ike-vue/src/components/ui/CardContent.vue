<template>
  <div :class="contentClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
}

const props = defineProps<Props>()

const contentClasses = computed(() => {
  const baseClasses = 'p-6 pt-0'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})
</script> 