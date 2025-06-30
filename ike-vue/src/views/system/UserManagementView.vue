<template>
  <div class="p-6 space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">User Management</h1>
        <p class="text-gray-500 mt-1">Manage system users and their permissions</p>
      </div>
      <Button>
        <i class="pi pi-plus mr-2"></i>
        Add User
      </Button>
    </div>

    <!-- Users Table -->
    <Card class="overflow-hidden">
      <DataTable :value="users" responsiveLayout="scroll">
        <template #header>
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <i class="pi pi-users text-xl text-gray-600"></i>
              <div>
                <h2 class="text-xl font-semibold text-gray-800">System Users</h2>
                <p class="text-sm text-gray-500">Manage user accounts with complete profile information and role assignments</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="p-input-icon-left w-full md:w-auto">
                <i class="pi pi-search" />
                <InputText placeholder="Search users..." class="w-full"/>
              </span>
              <Button variant="outline">
                <i class="pi pi-filter mr-2"></i>
                Filter
              </Button>
            </div>
          </div>
        </template>
        
        <Column field="username" header="Username" sortable>
           <template #body="slotProps">
            <span class="font-mono">{{ slotProps.data.username }}</span>
          </template>
        </Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="ssn" header="SSN"></Column>
        <Column field="role" header="Role" sortable>
          <template #body="slotProps">
            <Badge :value="slotProps.data.role" class="!bg-gray-100 !text-gray-700 !font-medium !py-1 !px-3"></Badge>
          </template>
        </Column>
        <Column field="status" header="Status" sortable>
          <template #body="slotProps">
            <Badge :value="slotProps.data.status" :severity="slotProps.data.status === 'Active' ? 'success' : 'danger'"></Badge>
          </template>
        </Column>
        <Column field="startDate" header="Start Date" sortable></Column>
        <Column field="lastLogin" header="Last Login" sortable></Column>
        <Column header="Actions">
          <template #body>
            <Button icon="pi pi-ellipsis-v" text plain rounded class="!text-gray-500"></Button>
          </template>
        </Column>
      </DataTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Badge from 'primevue/badge'

const users = ref([
  {
    username: 'anna.andersson',
    name: 'Anna Andersson',
    email: 'anna.andersson@malmoe.se',
    ssn: '1985-04-12-1234',
    role: 'Municipality Admin',
    status: 'Active',
    startDate: '2023-01-15',
    lastLogin: '2024-06-10 14:30',
  },
  {
    username: 'erik.eriksson',
    name: 'Erik Eriksson',
    email: 'erik@skola.se',
    ssn: '1978-09-23-5678',
    role: 'School Admin',
    status: 'Active',
    startDate: '2022-08-20',
    lastLogin: '2024-06-11 09:15',
  },
  {
    username: 'maria.nilsson',
    name: 'Maria Nilsson',
    email: 'maria.nilsson@region.se',
    ssn: '1990-11-05-9012',
    role: 'Regional Admin',
    status: 'Inactive',
    startDate: '2021-03-10',
    lastLogin: '2024-05-25 16:45',
  }
]);
</script> 