<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/components/layout/AppLayout.vue'

const authStore = useAuthStore()
</script>

<template>
  <div id="app">
    <AppLayout v-if="authStore.isAuthenticated">
      <router-view />
    </AppLayout>
    <router-view v-else />
  </div>
</template>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
