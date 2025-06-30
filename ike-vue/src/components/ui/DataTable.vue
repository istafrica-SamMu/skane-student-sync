<template>
  <div class="w-full">
    <PrimeVueDataTable
      :value="value"
      :paginator="paginator"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      :loading="loading"
      :stripedRows="stripedRows"
      :sortable="sortable"
      :filter="filter"
      :globalFilter="globalFilter"
      :globalFilterFields="globalFilterFields"
      :emptyMessage="emptyMessage"
      :class="tableClasses"
      v-bind="$attrs"
    >
      <template #header v-if="$slots.header">
        <slot name="header" />
      </template>
      
      <template #empty v-if="$slots.empty">
        <slot name="empty" />
      </template>
      
      <template #loading v-if="$slots.loading">
        <slot name="loading" />
      </template>
      
      <slot />
    </PrimeVueDataTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DataTable from 'primevue/datatable'

interface Props {
  value?: any[]
  paginator?: boolean
  rows?: number
  rowsPerPageOptions?: number[]
  loading?: boolean
  stripedRows?: boolean
  sortable?: boolean
  filter?: boolean
  globalFilter?: string
  globalFilterFields?: string[]
  emptyMessage?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  paginator: true,
  rows: 10,
  rowsPerPageOptions: () => [10, 20, 50],
  loading: false,
  stripedRows: true,
  sortable: true,
  filter: false,
  emptyMessage: 'No records found'
})

const tableClasses = computed(() => {
  const baseClasses = 'p-datatable-sm'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})

// Alias for template
const PrimeVueDataTable = DataTable
</script>

<style scoped>
:deep(.p-datatable) {
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.p-datatable-header) {
  background: hsl(var(--background));
  border-bottom: 1px solid hsl(var(--border));
  padding: 1rem;
}

:deep(.p-datatable-thead > tr > th) {
  background: hsl(var(--muted));
  border-bottom: 1px solid hsl(var(--border));
  font-weight: 600;
  color: hsl(var(--muted-foreground));
  padding: 0.75rem 1rem;
}

:deep(.p-datatable-tbody > tr) {
  border-bottom: 1px solid hsl(var(--border));
  transition: background-color 0.2s;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: hsl(var(--muted) / 0.5);
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
  color: hsl(var(--foreground));
}

:deep(.p-datatable-footer) {
  background: hsl(var(--background));
  border-top: 1px solid hsl(var(--border));
  padding: 1rem;
}

:deep(.p-paginator) {
  background: hsl(var(--background));
  border-top: 1px solid hsl(var(--border));
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  border-radius: 0.375rem;
  margin: 0 0.125rem;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

:deep(.p-paginator .p-paginator-first,
       .p-paginator .p-paginator-prev,
       .p-paginator .p-paginator-next,
       .p-paginator .p-paginator-last) {
  border-radius: 0.375rem;
  margin: 0 0.125rem;
}

:deep(.p-paginator .p-paginator-first:hover,
       .p-paginator .p-paginator-prev:hover,
       .p-paginator .p-paginator-next:hover,
       .p-paginator .p-paginator-last:hover) {
  background: hsl(var(--muted));
}
</style> 