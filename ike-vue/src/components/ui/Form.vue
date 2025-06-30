<template>
  <form @submit.prevent="handleSubmit" :class="formClasses">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [event: Event]
}>()

const formClasses = computed(() => {
  const baseClasses = 'space-y-6'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})

const handleSubmit = (event: Event) => {
  emit('submit', event)
}
</script> 