<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <div class="text-center mb-8">
        <div class="inline-block bg-ike-primary/10 p-3 rounded-lg mb-4">
          <i class="pi pi-chart-bar text-ike-primary text-3xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">IKE 2.0</h1>
        <p class="text-gray-500 mt-2 text-balance">
          Skåne Regional Platform - Inter-Municipal Compensation System
        </p>
      </div>
    
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
          <div class="relative">
            <select 
              v-model="selectedRole"
              id="role"
              required
              class="w-full appearance-none bg-white border border-gray-300 rounded-md py-3 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-ike-primary/50 focus:border-ike-primary"
            >
              <option disabled :value="null">Choose your role</option>
              <option v-for="option in roleOptions" :key="option.label" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i class="pi pi-chevron-down text-xs"></i>
            </div>
          </div>
        </div>

        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            v-model="fullName" 
            type="text"
            id="fullName"
            required
            placeholder="Enter your full name"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-ike-primary focus:border-ike-primary py-3 px-4"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="userEmail" 
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-ike-primary focus:border-ike-primary py-3 px-4"
          />
        </div>
      
        <div>
          <label for="organization" class="block text-sm font-medium text-gray-700 mb-1">Organization (Optional)</label>
          <input 
            v-model="userOrganization" 
            type="text"
            id="organization"
            placeholder="School/Municipality name"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-ike-primary focus:border-ike-primary py-3 px-4"
          />
        </div>
      
        <button 
          type="submit"
          :disabled="!selectedRole || !fullName || !userEmail"
          class="w-full bg-ike-primary hover:bg-ike-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
        >
          Login
        </button>
      </form>
  
      <p class="text-center text-sm text-gray-500 mt-6">
        Demo system - Select any role to explore the interface
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

const selectedRole = ref<UserRole>(null)
const fullName = ref('Mugisha Samuel')
const userEmail = ref('mugishasamuel400@gmail.com')
const userOrganization = ref('Region Skåne')

const roleOptions: { label: string; value: UserRole }[] = [
  { label: 'Regional Administrator', value: 'regional-admin' },
  { label: 'Municipality Administrator', value: 'municipality-admin' },
  { label: 'School Administrator', value: 'school-admin' },
  { label: 'Organization Administrator', value: 'orgadmin' },
  { label: 'Development Administrator', value: 'devadmin' }
]

const handleLogin = () => {
  if (selectedRole.value && fullName.value && userEmail.value) {
    authStore.login(selectedRole.value, {
      id: 'dev-user-01',
      name: fullName.value,
      email: userEmail.value,
      organization: userOrganization.value || 'Default Organization'
    })
    router.push('/dashboard')
  }
}
</script>

<style scoped>
/* Using Tailwind utility classes directly in the template is preferred for this project. */
/* Add any necessary global styles or one-off overrides here if needed. */
</style>