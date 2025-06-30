<template>
  <div class="space-y-8 p-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-800">
        Regional Administration Dashboard
      </h1>
      <p class="text-gray-500 mt-1">
        fredag 20 juni 2025 • System Overview for Region Skåne
      </p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card class="flex items-center p-6 border-l-4 border-ike-primary">
        <div class="flex-1">
          <CardTitle class="text-sm font-medium text-gray-500">Total Municipalities</CardTitle>
          <p class="text-3xl font-bold text-gray-800 mt-2">33</p>
          <div class="flex items-center text-xs text-green-600 mt-1">
            <i class="pi pi-arrow-up w-3 h-3 mr-1"></i>
            All active and connected
          </div>
        </div>
        <i class="pi pi-building text-4xl text-gray-300"></i>
      </Card>

      <Card class="flex items-center p-6 border-l-4 border-green-500">
        <div class="flex-1">
          <CardTitle class="text-sm font-medium text-gray-500">Regional Students</CardTitle>
          <p class="text-3xl font-bold text-gray-800 mt-2">89,247</p>
          <div class="flex items-center text-xs text-green-600 mt-1">
            <i class="pi pi-arrow-up w-3 h-3 mr-1"></i>
            +3.2% from last year
          </div>
        </div>
        <i class="pi pi-users text-4xl text-gray-300"></i>
      </Card>

      <Card class="flex items-center p-6 border-l-4 border-orange-500">
        <div class="flex-1">
          <CardTitle class="text-sm font-medium text-gray-500">System Issues</CardTitle>
          <p class="text-3xl font-bold text-gray-800 mt-2">7</p>
          <p class="text-xs text-orange-600 mt-1">
            Across 4 municipalities
          </p>
        </div>
        <i class="pi pi-exclamation-triangle text-4xl text-orange-400"></i>
      </Card>
    </div>

    <!-- Regional Operations -->
    <Card>
      <CardHeader>
        <CardTitle>Regional Operations</CardTitle>
        <CardDescription>System administration and oversight</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap gap-4">
        <Button class="!bg-ike-primary hover:!bg-ike-primary-dark">
          <i class="pi pi-building mr-2"></i>
          Manage Municipalities
        </Button>
        <Button variant="outline">
          <i class="pi pi-sitemap mr-2"></i>
          School Unit Overview
        </Button>
        <Button variant="outline">
          <i class="pi pi-users mr-2"></i>
          User Management
        </Button>
        <Button variant="outline">
          <i class="pi pi-cog mr-2"></i>
          System Settings
        </Button>
      </CardContent>
    </Card>

    <!-- Municipality Status Overview -->
    <Card>
      <CardHeader>
        <CardTitle>Municipality Status Overview</CardTitle>
        <CardDescription>Real-time status of municipalities in the region</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <div 
          v-for="municipality in municipalities" 
          :key="municipality.name"
          class="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="bg-gray-100 p-3 rounded-lg mr-4">
            <i class="pi pi-building text-2xl text-ike-primary"></i>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-800">{{ municipality.name }}</p>
            <p class="text-sm text-gray-500">
              {{ municipality.students }} students • Last sync: {{ municipality.lastSync }}
            </p>
          </div>
          <Badge :severity="municipality.status.type" class="mr-3">
            {{ municipality.status.label }}
          </Badge>
          <div class="w-3 h-3 rounded-full" :class="municipality.status.colorClass"></div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from 'primevue/badge'

const municipalities = ref([
  {
    name: 'Malmö',
    students: '12450',
    lastSync: '2 min ago',
    status: { label: 'Healthy', type: 'success', colorClass: 'bg-green-500' }
  },
  {
    name: 'Lund',
    students: '8200',
    lastSync: '5 min ago',
    status: { label: 'Healthy', type: 'success', colorClass: 'bg-green-500' }
  },
  {
    name: 'Helsingborg',
    students: '9800',
    lastSync: '1 min ago',
    status: { label: 'Warning', type: 'warning', colorClass: 'bg-orange-500' }
  },
  {
    name: 'Kristianstad',
    students: '5600',
    lastSync: '15 min ago',
    status: { label: 'Error', type: 'danger', colorClass: 'bg-red-500' }
  }
])
</script> 