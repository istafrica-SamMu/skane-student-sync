<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <RoleBasedSidebar />
    
    <!-- Main Content Area -->
    <div class="ml-72">
      <!-- Header -->
      <AppHeader />
      
      <!-- Main Content -->
      <main>
        <!-- The router-view content will be passed into this slot -->
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoleBasedSidebar from '@/components/layout/RoleBasedSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script> 