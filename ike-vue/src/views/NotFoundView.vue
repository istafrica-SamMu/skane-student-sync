<template>
  <div class="min-h-screen flex items-center justify-center bg-ike-neutral-light">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-ike-neutral-dark">404</h1>
      <h2 class="text-2xl font-semibold text-ike-neutral-dark mt-4">Page Not Found</h2>
      <p class="text-ike-neutral mt-2 mb-6">The page you're looking for doesn't exist.</p>
      <Button 
        @click="$router.push('/dashboard')"
        class="bg-ike-primary hover:bg-ike-primary-dark text-white"
      >
        Go to Dashboard
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script> 