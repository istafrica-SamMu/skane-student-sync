<template>
  <div :class="chartContainerClasses">
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold text-ike-neutral-dark">{{ title }}</h3>
      <p v-if="description" class="text-sm text-ike-neutral mt-1">{{ description }}</p>
    </div>
    
    <div :style="{ height: height }" class="relative">
      <PrimeVueChart
        :type="type"
        :data="data"
        :options="chartOptions"
        :class="chartClasses"
      />
      
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/80">
        <div class="flex items-center space-x-2">
          <i class="pi pi-spin pi-spinner text-ike-primary"></i>
          <span class="text-sm text-ike-neutral">Loading chart...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Chart from 'primevue/chart'

interface Props {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar'
  data: any
  options?: any
  title?: string
  description?: string
  height?: string
  loading?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '300px',
  loading: false
})

const chartContainerClasses = computed(() => {
  const baseClasses = 'w-full'
  return props.className ? `${baseClasses} ${props.className}` : baseClasses
})

const chartClasses = computed(() => {
  return 'w-full h-full'
})

const chartOptions = computed(() => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    },
    scales: props.type === 'line' || props.type === 'bar' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'hsl(var(--border))'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    } : undefined
  }
  
  return { ...defaultOptions, ...props.options }
})

// Alias for template
const PrimeVueChart = Chart
</script>

<style scoped>
:deep(.p-chart) {
  border-radius: 0.5rem;
  overflow: hidden;
}
</style> 