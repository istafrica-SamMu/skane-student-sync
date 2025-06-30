<template>
  <aside class="fixed top-0 left-0 h-screen w-72 bg-gray-50 border-r flex flex-col">
    <!-- Logo -->
    <div class="h-16 border-b flex items-center px-6 shrink-0">
      <div class="flex items-center space-x-3">
        <div class="bg-ike-primary p-2 rounded-lg">
          <i class="pi pi-chart-bar text-white text-2xl"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-800">IKE 2.0</h1>
          <p class="text-xs text-gray-500">{{ getRoleTitle() }}</p>
        </div>
      </div>
    </div>

    <!-- User Info -->
    <div class="p-4 shrink-0">
      <div class="bg-white p-4 rounded-lg border">
        <p class="text-sm font-semibold text-gray-800">{{ authStore.currentUser?.name }}</p>
        <p class="text-xs text-gray-500 truncate">{{ authStore.currentUser?.email }}</p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto px-4">
      <h3 class="px-2 text-sm font-semibold text-gray-500 mb-2">Navigation</h3>
      <nav class="space-y-1">
        <template v-for="item in menuItems" :key="item.title">
          <div v-if="item.children && item.children.length > 0">
            <button @click="toggleMenu(item.title)" class="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-200 focus:outline-none">
              <div class="flex items-center space-x-3">
                <i :class="item.icon" class="w-5 h-5 text-gray-600"></i>
                <span class="font-medium text-gray-700">{{ item.title }}</span>
              </div>
              <i class="pi pi-chevron-down w-4 h-4 transition-transform" :class="{'rotate-180': openMenus.includes(item.title)}"></i>
            </button>
            <div v-show="openMenus.includes(item.title)" class="pl-6 pt-1 space-y-1">
              <router-link
                v-for="subItem in item.children"
                :key="subItem.title"
                :to="subItem.route || '#'"
                class="flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors"
                :class="isActiveRoute(subItem.route) ? 'bg-ike-primary/10 text-ike-primary font-semibold' : 'text-gray-600 hover:bg-gray-200'"
              >
                <i :class="`${subItem.icon} w-5 h-5`"></i>
                <span>{{ subItem.title }}</span>
              </router-link>
            </div>
          </div>
          <router-link
            v-else
            :to="item.route || '#'"
            class="flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors"
            :class="isActiveRoute(item.route) ? 'bg-ike-primary/10 text-ike-primary font-semibold' : 'text-gray-600 hover:bg-gray-200'"
          >
            <i :class="`${item.icon} w-5 h-5 text-gray-600`"></i>
            <span class="font-medium text-gray-700">{{ item.title }}</span>
          </router-link>
        </template>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRoleMenus } from '@/composables/useRoleMenus'
import type { UserRole } from '@/types'

const route = useRoute()
const authStore = useAuthStore()
const { getMenuItems } = useRoleMenus()

const menuItems = computed(() => getMenuItems(authStore.userRole ?? 'regional-admin'))
const openMenus = ref<string[]>([])

const getRoleTitle = () => {
  const roles: { [key: string]: string } = {
    'regional-admin': 'Regional Administrator',
    'municipality-admin': 'Municipality Administrator',
    'school-admin': 'School Administrator',
    'orgadmin': 'Organization Administrator',
    'devadmin': 'Development Administrator'
  }
  return roles[authStore.userRole || ''] || 'IKE 2.0'
}

const toggleMenu = (title: string) => {
  if (openMenus.value.includes(title)) {
    openMenus.value = openMenus.value.filter(m => m !== title)
  } else {
    openMenus.value.push(title)
  }
}

const isActiveRoute = (url?: string) => {
  if (!url) return false;
  const isParentRoute = menuItems.value.some(item => item.route === url && item.children && item.children.length > 0);

  if (isParentRoute) {
    return route.path.startsWith(url);
  } else {
    // For child routes or non-parent routes, we can check for a more exact match
    return route.path === url;
  }
}
</script> 