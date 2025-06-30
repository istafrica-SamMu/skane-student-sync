<template>
  <Dialog
    :visible="modelValue"
    @update:visible="handleVisibleChange"
    :modal="true"
    :closable="closable"
    :dismissable-mask="dismissableMask"
    :style="{ width: width }"
    :class="dialogClasses"
    @hide="handleClose"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-ike-neutral-dark">{{ title }}</h2>
        <Button
          v-if="closable"
          variant="ghost"
          size="sm"
          @click="handleClose"
          class="h-8 w-8 p-0"
        >
          <i class="pi pi-times h-4 w-4"></i>
        </Button>
      </div>
    </template>

    <div class="py-4">
      <slot />
    </div>

    <template #footer v-if="$slots.footer">
      <div class="flex justify-end space-x-2">
        <slot name="footer" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from './Button.vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string
  closable?: boolean
  dismissableMask?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '600px',
  closable: true,
  dismissableMask: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const dialogClasses = computed(() => {
  const baseClasses = 'p-0'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})

const handleVisibleChange = (value: boolean) => {
  emit('update:modelValue', value)
}

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
:deep(.p-dialog) {
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

:deep(.p-dialog-header) {
  border-bottom: 1px solid hsl(var(--border));
  padding: 1.5rem;
  background: hsl(var(--background));
}

:deep(.p-dialog-content) {
  padding: 0;
  background: hsl(var(--background));
}

:deep(.p-dialog-footer) {
  border-top: 1px solid hsl(var(--border));
  padding: 1.5rem;
  background: hsl(var(--background));
}
</style> 