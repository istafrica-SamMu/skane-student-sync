<template>
  <div :class="headerClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
}

const props = defineProps<Props>()

const headerClasses = computed(() => {
  const baseClasses = 'flex flex-col space-y-1.5 p-6'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})
</script> 