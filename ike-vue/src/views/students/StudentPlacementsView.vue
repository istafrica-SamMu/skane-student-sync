<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Student Placements & Transfers</h1>
        <p class="text-ike-neutral mt-2">
          Manage student transfers between schools and municipalities
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="showBulkTransferModal = true">
          <i class="pi pi-users mr-2"></i>
          Bulk Transfer
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showNewPlacementModal = true">
          <i class="pi pi-plus mr-2"></i>
          New Placement
        </Button>
      </div>
    </div>

    <!-- Status Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Pending Transfers
          </CardTitle>
          <i class="pi pi-clock h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">12</div>
          <div class="text-xs text-ike-neutral mt-1">
            Awaiting approval
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Approved Transfers
          </CardTitle>
          <i class="pi pi-check-circle h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">45</div>
          <div class="text-xs text-ike-neutral mt-1">
            This month
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Rejected Transfers
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">3</div>
          <div class="text-xs text-ike-neutral mt-1">
            Require review
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Conflicts
          </CardTitle>
          <i class="pi pi-exclamation-circle h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">7</div>
          <div class="text-xs text-ike-neutral mt-1">
            Need resolution
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Advanced Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Transfer Filters</CardTitle>
        <CardDescription>
          Filter transfers by various criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form @submit="applyFilters">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Transfer Status">
              <MultiSelect
                v-model="filters.status"
                :options="statusOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select statuses"
                class="w-full"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="From Organization">
              <Dropdown
                v-model="filters.fromOrganization"
                :options="organizationOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select source organization"
                class="w-full"
              />
            </FormField>
            
            <FormField label="To Organization">
              <Dropdown
                v-model="filters.toOrganization"
                :options="organizationOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select target organization"
                class="w-full"
              />
            </FormField>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FormField label="Transfer Type">
              <Dropdown
                v-model="filters.transferType"
                :options="transferTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select transfer type"
                class="w-full"
              />
            </FormField>
            
            <FormField label="Date Range">
              <Calendar
                v-model="filters.dateRange"
                selectionMode="range"
                placeholder="Select date range"
                class="w-full"
                :showIcon="true"
              />
            </FormField>
            
            <FormField label="Priority">
              <Dropdown
                v-model="filters.priority"
                :options="priorityOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select priority"
                class="w-full"
              />
            </FormField>
          </div>
          
          <div class="flex justify-between items-center mt-6">
            <Button variant="outline" @click="clearFilters">
              Clear Filters
            </Button>
            <Button type="submit" :loading="applyingFilters">
              Apply Filters
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>

    <!-- Transfers Table -->
    <Card>
      <CardHeader>
        <CardTitle>Transfer Requests</CardTitle>
        <CardDescription>
          Manage student transfer requests and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="filteredTransfers"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          :loading="loading"
          stripedRows
        >
          <Column field="id" header="ID" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge variant="outline" class="font-mono">{{ data.id }}</Badge>
            </template>
          </Column>
          
          <Column field="studentName" header="Student" sortable>
            <template #body="{ data }">
              <div class="flex items-center space-x-3">
                <Avatar :label="getInitials(data.studentName)" class="w-8 h-8" />
                <div>
                  <div class="font-medium text-ike-neutral-dark">{{ data.studentName }}</div>
                  <div class="text-xs text-ike-neutral">{{ data.studentId }}</div>
                </div>
              </div>
            </template>
          </Column>
          
          <Column field="fromOrganization" header="From" sortable>
            <template #body="{ data }">
              <div class="flex items-center space-x-2">
                <i class="pi pi-building text-ike-primary"></i>
                <span>{{ data.fromOrganization }}</span>
              </div>
            </template>
          </Column>
          
          <Column field="toOrganization" header="To" sortable>
            <template #body="{ data }">
              <div class="flex items-center space-x-2">
                <i class="pi pi-building text-ike-success"></i>
                <span>{{ data.toOrganization }}</span>
              </div>
            </template>
          </Column>
          
          <Column field="transferType" header="Type" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getTransferTypeVariant(data.transferType)">
                {{ data.transferType }}
              </Badge>
            </template>
          </Column>
          
          <Column field="status" header="Status" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getStatusVariant(data.status)">
                {{ data.status }}
              </Badge>
            </template>
          </Column>
          
          <Column field="priority" header="Priority" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge :variant="getPriorityVariant(data.priority)">
                {{ data.priority }}
              </Badge>
            </template>
          </Column>
          
          <Column field="requestedAt" header="Requested" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.requestedAt) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 150px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewTransfer(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Pending'"
                  variant="ghost"
                  size="sm"
                  @click="approveTransfer(data)"
                  class="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                >
                  <i class="pi pi-check h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Pending'"
                  variant="ghost"
                  size="sm"
                  @click="rejectTransfer(data)"
                  class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <i class="pi pi-times h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editTransfer(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-pencil h-4 w-4"></i>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </CardContent>
    </Card>

    <!-- New Placement Modal -->
    <Modal
      v-model="showNewPlacementModal"
      title="New Student Placement"
      width="800px"
    >
      <div class="space-y-4">
        <FormField label="Student" required>
          <Dropdown
            v-model="newPlacement.studentId"
            :options="studentOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select student"
            class="w-full"
            :filter="true"
            :showClear="true"
          />
        </FormField>
        
        <div class="grid grid-cols-2 gap-4">
          <FormField label="From Organization" required>
            <Dropdown
              v-model="newPlacement.fromOrganization"
              :options="organizationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select source organization"
              class="w-full"
            />
          </FormField>
          
          <FormField label="To Organization" required>
            <Dropdown
              v-model="newPlacement.toOrganization"
              :options="organizationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select target organization"
              class="w-full"
            />
          </FormField>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <FormField label="Transfer Type" required>
            <Dropdown
              v-model="newPlacement.transferType"
              :options="transferTypeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select transfer type"
              class="w-full"
            />
          </FormField>
          
          <FormField label="Priority">
            <Dropdown
              v-model="newPlacement.priority"
              :options="priorityOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select priority"
              class="w-full"
            />
          </FormField>
        </div>
        
        <FormField label="Effective Date" required>
          <Calendar
            v-model="newPlacement.effectiveDate"
            placeholder="Select effective date"
            class="w-full"
            :showIcon="true"
            :minDate="new Date()"
          />
        </FormField>
        
        <FormField label="Reason">
          <Textarea
            v-model="newPlacement.reason"
            placeholder="Enter transfer reason"
            rows="3"
            class="w-full"
          />
        </FormField>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showNewPlacementModal = false">Cancel</Button>
        <Button @click="createPlacement" :loading="creatingPlacement">Create Placement</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import Form from '@/components/ui/Form.vue'
import FormField from '@/components/ui/FormField.vue'
import Modal from '@/components/ui/Modal.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Calendar from 'primevue/calendar'
import Textarea from 'primevue/textarea'
import Avatar from 'primevue/avatar'
import Column from 'primevue/column'

const toast = useToast()

// State
const loading = ref(false)
const applyingFilters = ref(false)
const creatingPlacement = ref(false)
const showNewPlacementModal = ref(false)
const showBulkTransferModal = ref(false)

const filters = ref({
  status: [],
  fromOrganization: null,
  toOrganization: null,
  transferType: null,
  dateRange: null,
  priority: null
})

const newPlacement = ref({
  studentId: null,
  fromOrganization: null,
  toOrganization: null,
  transferType: null,
  priority: null,
  effectiveDate: null,
  reason: ''
})

// Sample data
const transfers = ref([
  {
    id: 'TRF-2024-001',
    studentName: 'Anna Andersson',
    studentId: '2024-001',
    fromOrganization: 'Independent School Alpha',
    toOrganization: 'Municipality Beta School',
    transferType: 'Municipal Transfer',
    status: 'Pending',
    priority: 'High',
    requestedAt: '2024-01-15T10:30:00'
  },
  {
    id: 'TRF-2024-002',
    studentName: 'Erik Eriksson',
    studentId: '2024-002',
    fromOrganization: 'Municipality Gamma School',
    toOrganization: 'Independent School Delta',
    transferType: 'Independent School Transfer',
    status: 'Approved',
    priority: 'Medium',
    requestedAt: '2024-01-14T14:20:00'
  },
  {
    id: 'TRF-2024-003',
    studentName: 'Maria Nilsson',
    studentId: '2024-003',
    fromOrganization: 'Independent School Epsilon',
    toOrganization: 'Municipality Zeta School',
    transferType: 'Municipal Transfer',
    status: 'Rejected',
    priority: 'Low',
    requestedAt: '2024-01-13T09:15:00'
  }
])

// Options for dropdowns
const statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'In Progress', value: 'In Progress' }
]

const organizationOptions = [
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Municipality Beta School', value: 'Municipality Beta School' },
  { label: 'Municipality Gamma School', value: 'Municipality Gamma School' },
  { label: 'Independent School Delta', value: 'Independent School Delta' }
]

const transferTypeOptions = [
  { label: 'Municipal Transfer', value: 'Municipal Transfer' },
  { label: 'Independent School Transfer', value: 'Independent School Transfer' },
  { label: 'Regional Transfer', value: 'Regional Transfer' },
  { label: 'Emergency Transfer', value: 'Emergency Transfer' }
]

const priorityOptions = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Urgent', value: 'Urgent' }
]

const studentOptions = [
  { label: 'Anna Andersson (2024-001)', value: '2024-001' },
  { label: 'Erik Eriksson (2024-002)', value: '2024-002' },
  { label: 'Maria Nilsson (2024-003)', value: '2024-003' },
  { label: 'Johan Johansson (2024-004)', value: '2024-004' }
]

// Computed
const filteredTransfers = computed(() => {
  return transfers.value.filter(transfer => {
    const matchesStatus = filters.value.status.length === 0 || 
      filters.value.status.includes(transfer.status)
    
    const matchesFromOrg = !filters.value.fromOrganization || 
      transfer.fromOrganization === filters.value.fromOrganization
    
    const matchesToOrg = !filters.value.toOrganization || 
      transfer.toOrganization === filters.value.toOrganization
    
    const matchesType = !filters.value.transferType || 
      transfer.transferType === filters.value.transferType
    
    const matchesPriority = !filters.value.priority || 
      transfer.priority === filters.value.priority
    
    return matchesStatus && matchesFromOrg && matchesToOrg && matchesType && matchesPriority
  })
})

// Methods
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Approved': return 'default'
    case 'Pending': return 'secondary'
    case 'Rejected': return 'destructive'
    case 'In Progress': return 'outline'
    default: return 'outline'
  }
}

const getTransferTypeVariant = (type: string) => {
  switch (type) {
    case 'Municipal Transfer': return 'default'
    case 'Independent School Transfer': return 'secondary'
    case 'Regional Transfer': return 'outline'
    case 'Emergency Transfer': return 'destructive'
    default: return 'outline'
  }
}

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'Urgent': return 'destructive'
    case 'High': return 'default'
    case 'Medium': return 'secondary'
    case 'Low': return 'outline'
    default: return 'outline'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const applyFilters = async () => {
  applyingFilters.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  applyingFilters.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Filters Applied',
    detail: 'Transfer filters have been applied successfully',
    life: 3000
  })
}

const clearFilters = () => {
  filters.value = {
    status: [],
    fromOrganization: null,
    toOrganization: null,
    transferType: null,
    dateRange: null,
    priority: null
  }
  
  toast.add({
    severity: 'info',
    summary: 'Filters Cleared',
    detail: 'All filters have been cleared',
    life: 3000
  })
}

const createPlacement = async () => {
  if (!newPlacement.value.studentId || !newPlacement.value.fromOrganization || 
      !newPlacement.value.toOrganization || !newPlacement.value.transferType || 
      !newPlacement.value.effectiveDate) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  creatingPlacement.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const transfer = {
    id: `TRF-2024-${String(transfers.value.length + 1).padStart(3, '0')}`,
    studentName: studentOptions.find(s => s.value === newPlacement.value.studentId)?.label.split(' (')[0] || 'Unknown Student',
    studentId: newPlacement.value.studentId,
    fromOrganization: newPlacement.value.fromOrganization,
    toOrganization: newPlacement.value.toOrganization,
    transferType: newPlacement.value.transferType,
    status: 'Pending',
    priority: newPlacement.value.priority || 'Medium',
    requestedAt: new Date().toISOString()
  }
  
  transfers.value.unshift(transfer)
  
  // Reset form
  newPlacement.value = {
    studentId: null,
    fromOrganization: null,
    toOrganization: null,
    transferType: null,
    priority: null,
    effectiveDate: null,
    reason: ''
  }
  
  showNewPlacementModal.value = false
  creatingPlacement.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Placement Created',
    detail: 'Student placement request has been created successfully',
    life: 3000
  })
}

const viewTransfer = (transfer: any) => {
  toast.add({
    severity: 'info',
    summary: 'View Transfer',
    detail: `Viewing transfer ${transfer.id}`,
    life: 3000
  })
}

const approveTransfer = (transfer: any) => {
  transfer.status = 'Approved'
  toast.add({
    severity: 'success',
    summary: 'Transfer Approved',
    detail: `Transfer ${transfer.id} has been approved`,
    life: 3000
  })
}

const rejectTransfer = (transfer: any) => {
  transfer.status = 'Rejected'
  toast.add({
    severity: 'warn',
    summary: 'Transfer Rejected',
    detail: `Transfer ${transfer.id} has been rejected`,
    life: 3000
  })
}

const editTransfer = (transfer: any) => {
  toast.add({
    severity: 'info',
    summary: 'Edit Transfer',
    detail: `Editing transfer ${transfer.id}`,
    life: 3000
  })
}

onMounted(() => {
  loading.value = true
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script> 