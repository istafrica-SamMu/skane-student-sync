import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'regional-admin' | 'municipality-admin' | 'school-admin' | 'orgadmin' | 'devadmin' | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  organization?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const currentUser = computed(() => user.value)
  const userRole = computed(() => user.value?.role)

  const login = (role: UserRole, userData: Omit<User, 'role'>) => {
    if (role) {
      user.value = {
        ...userData,
        role,
      }
    }
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    currentUser,
    userRole,
    login,
    logout
  }
}) 