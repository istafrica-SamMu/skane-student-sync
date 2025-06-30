<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Student Conflicts</h1>
        <p class="text-ike-neutral mt-2">
          Resolve conflicts in student data and placements
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="exportConflicts">
          <i class="pi pi-download mr-2"></i>
          Export Conflicts
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showBulkResolutionModal = true">
          <i class="pi pi-check-circle mr-2"></i>
          Bulk Resolution
        </Button>
      </div>
    </div>

    <!-- Conflict Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Critical Conflicts
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">8</div>
          <div class="text-xs text-ike-neutral mt-1">
            Require immediate attention
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Data Conflicts
          </CardTitle>
          <i class="pi pi-exclamation-circle h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">23</div>
          <div class="text-xs text-ike-neutral mt-1">
            Inconsistent information
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Placement Conflicts
          </CardTitle>
          <i class="pi pi-users h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">15</div>
          <div class="text-xs text-ike-neutral mt-1">
            Multiple enrollments
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Resolved Today
          </CardTitle>
          <i class="pi pi-check h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">12</div>
          <div class="text-xs text-ike-neutral mt-1">
            Successfully resolved
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Advanced Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Conflict Filters</CardTitle>
        <CardDescription>
          Filter conflicts by type, severity, and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form @submit="applyFilters">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Conflict Type">
              <MultiSelect
                v-model="filters.conflictType"
                :options="conflictTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select conflict types"
                class="w-full"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Severity">
              <MultiSelect
                v-model="filters.severity"
                :options="severityOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select severity levels"
                class="w-full"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Status">
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
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FormField label="Organization">
              <Dropdown
                v-model="filters.organization"
                :options="organizationOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select organization"
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
            
            <FormField label="Assigned To">
              <Dropdown
                v-model="filters.assignedTo"
                :options="userOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select assignee"
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

    <!-- Conflicts Table -->
    <Card>
      <CardHeader>
        <CardTitle>Conflict List</CardTitle>
        <CardDescription>
          Review and resolve student data conflicts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="filteredConflicts"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          :loading="loading"
          stripedRows
          expandableRows
          @rowExpand="onRowExpand"
          @rowCollapse="onRowCollapse"
        >
          <Column expander style="width: 3rem" />
          
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
          
          <Column field="conflictType" header="Type" sortable style="width: 150px">
            <template #body="{ data }">
              <Badge :variant="getConflictTypeVariant(data.conflictType)">
                {{ data.conflictType }}
              </Badge>
            </template>
          </Column>
          
          <Column field="severity" header="Severity" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge :variant="getSeverityVariant(data.severity)">
                {{ data.severity }}
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
          
          <Column field="organization" header="Organization" sortable>
            <template #body="{ data }">
              <div class="flex items-center space-x-2">
                <i class="pi pi-building text-ike-primary"></i>
                <span>{{ data.organization }}</span>
              </div>
            </template>
          </Column>
          
          <Column field="assignedTo" header="Assigned To" sortable>
            <template #body="{ data }">
              <div class="flex items-center space-x-2">
                <Avatar :label="getInitials(data.assignedTo)" class="w-6 h-6" />
                <span class="text-sm">{{ data.assignedTo }}</span>
              </div>
            </template>
          </Column>
          
          <Column field="createdAt" header="Created" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.createdAt) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 150px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewConflict(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Open'"
                  variant="ghost"
                  size="sm"
                  @click="resolveConflict(data)"
                  class="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                >
                  <i class="pi pi-check h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editConflict(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-pencil h-4 w-4"></i>
                </Button>
              </div>
            </template>
          </Column>
          
          <!-- Expanded Row Content -->
          <template #expansion="{ data }">
            <div class="p-4 bg-gray-50 border-t">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold text-ike-neutral-dark mb-3">Conflict Details</h4>
                  <div class="space-y-2 text-sm">
                    <div><strong>Description:</strong> {{ data.description }}</div>
                    <div><strong>Affected Fields:</strong> {{ data.affectedFields.join(', ') }}</div>
                    <div><strong>Source:</strong> {{ data.source }}</div>
                    <div><strong>Last Updated:</strong> {{ formatDate(data.lastUpdated) }}</div>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-semibold text-ike-neutral-dark mb-3">Resolution Options</h4>
                  <div class="space-y-2">
                    <div v-for="option in data.resolutionOptions" :key="option.id" class="flex items-center space-x-2">
                      <input
                        type="radio"
                        :id="option.id"
                        :name="`resolution-${data.id}`"
                        :value="option.id"
                        v-model="data.selectedResolution"
                        class="text-ike-primary"
                      />
                      <label :for="option.id" class="text-sm">{{ option.description }}</label>
                    </div>
                  </div>
                  
                  <div class="mt-4">
                    <Button
                      size="sm"
                      @click="applyResolution(data)"
                      :disabled="!data.selectedResolution"
                    >
                      Apply Resolution
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataTable>
      </CardContent>
    </Card>
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
import DataTable from '@/components/ui/DataTable.vue'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Calendar from 'primevue/calendar'
import Avatar from 'primevue/avatar'
import Column from 'primevue/column'

const toast = useToast()

// State
const loading = ref(false)
const applyingFilters = ref(false)
const showBulkResolutionModal = ref(false)

const filters = ref({
  conflictType: [],
  severity: [],
  status: [],
  organization: null,
  dateRange: null,
  assignedTo: null
})

// Sample data
const conflicts = ref([
  {
    id: 'CONF-2024-001',
    studentName: 'Anna Andersson',
    studentId: '2024-001',
    conflictType: 'Duplicate Enrollment',
    severity: 'Critical',
    status: 'Open',
    organization: 'Independent School Alpha',
    assignedTo: 'John Admin',
    createdAt: '2024-01-15T10:30:00',
    description: 'Student is enrolled in multiple schools simultaneously',
    affectedFields: ['Enrollment Status', 'School Assignment', 'Attendance Records'],
    source: 'System Integration',
    lastUpdated: '2024-01-15T14:20:00',
    resolutionOptions: [
      { id: 'keep-primary', description: 'Keep primary enrollment, remove others' },
      { id: 'merge-records', description: 'Merge all enrollment records' },
      { id: 'contact-parent', description: 'Contact parent for clarification' }
    ],
    selectedResolution: null
  },
  {
    id: 'CONF-2024-002',
    studentName: 'Erik Eriksson',
    studentId: '2024-002',
    conflictType: 'Data Inconsistency',
    severity: 'High',
    status: 'In Progress',
    organization: 'Municipality Beta School',
    assignedTo: 'Maria Manager',
    createdAt: '2024-01-14T14:20:00',
    description: 'Address information differs between systems',
    affectedFields: ['Address', 'Contact Information', 'Emergency Contacts'],
    source: 'Population Registry',
    lastUpdated: '2024-01-14T16:45:00',
    resolutionOptions: [
      { id: 'use-latest', description: 'Use most recent address data' },
      { id: 'verify-manual', description: 'Manually verify and update' },
      { id: 'flag-review', description: 'Flag for manual review' }
    ],
    selectedResolution: null
  },
  {
    id: 'CONF-2024-003',
    studentName: 'Maria Nilsson',
    studentId: '2024-003',
    conflictType: 'Missing Data',
    severity: 'Medium',
    status: 'Resolved',
    organization: 'Independent School Delta',
    assignedTo: 'Peter Processor',
    createdAt: '2024-01-13T09:15:00',
    description: 'Required guardian information is missing',
    affectedFields: ['Guardian Information', 'Emergency Contacts'],
    source: 'Data Import',
    lastUpdated: '2024-01-13T11:30:00',
    resolutionOptions: [
      { id: 'request-info', description: 'Request information from parent' },
      { id: 'use-existing', description: 'Use existing contact information' },
      { id: 'skip-optional', description: 'Mark as optional and skip' }
    ],
    selectedResolution: 'request-info'
  }
])

// Options for dropdowns
const conflictTypeOptions = [
  { label: 'Duplicate Enrollment', value: 'Duplicate Enrollment' },
  { label: 'Data Inconsistency', value: 'Data Inconsistency' },
  { label: 'Missing Data', value: 'Missing Data' },
  { label: 'Placement Conflict', value: 'Placement Conflict' },
  { label: 'Financial Conflict', value: 'Financial Conflict' }
]

const severityOptions = [
  { label: 'Critical', value: 'Critical' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' }
]

const statusOptions = [
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Closed', value: 'Closed' }
]

const organizationOptions = [
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Municipality Beta School', value: 'Municipality Beta School' },
  { label: 'Independent School Delta', value: 'Independent School Delta' },
  { label: 'Municipality Gamma School', value: 'Municipality Gamma School' }
]

const userOptions = [
  { label: 'John Admin', value: 'John Admin' },
  { label: 'Maria Manager', value: 'Maria Manager' },
  { label: 'Peter Processor', value: 'Peter Processor' },
  { label: 'Lisa Lead', value: 'Lisa Lead' }
]

// Computed
const filteredConflicts = computed(() => {
  return conflicts.value.filter(conflict => {
    const matchesType = filters.value.conflictType.length === 0 || 
      filters.value.conflictType.includes(conflict.conflictType)
    
    const matchesSeverity = filters.value.severity.length === 0 || 
      filters.value.severity.includes(conflict.severity)
    
    const matchesStatus = filters.value.status.length === 0 || 
      filters.value.status.includes(conflict.status)
    
    const matchesOrg = !filters.value.organization || 
      conflict.organization === filters.value.organization
    
    const matchesAssignee = !filters.value.assignedTo || 
      conflict.assignedTo === filters.value.assignedTo
    
    return matchesType && matchesSeverity && matchesStatus && matchesOrg && matchesAssignee
  })
})

// Methods
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getConflictTypeVariant = (type: string) => {
  switch (type) {
    case 'Duplicate Enrollment': return 'destructive'
    case 'Data Inconsistency': return 'default'
    case 'Missing Data': return 'secondary'
    case 'Placement Conflict': return 'outline'
    case 'Financial Conflict': return 'destructive'
    default: return 'outline'
  }
}

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'destructive'
    case 'High': return 'default'
    case 'Medium': return 'secondary'
    case 'Low': return 'outline'
    default: return 'outline'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Open': return 'destructive'
    case 'In Progress': return 'default'
    case 'Resolved': return 'secondary'
    case 'Closed': return 'outline'
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
    detail: 'Conflict filters have been applied successfully',
    life: 3000
  })
}

const clearFilters = () => {
  filters.value = {
    conflictType: [],
    severity: [],
    status: [],
    organization: null,
    dateRange: null,
    assignedTo: null
  }
  
  toast.add({
    severity: 'info',
    summary: 'Filters Cleared',
    detail: 'All filters have been cleared',
    life: 3000
  })
}

const exportConflicts = () => {
  toast.add({
    severity: 'success',
    summary: 'Export Started',
    detail: 'Conflict data export has been initiated',
    life: 3000
  })
}

const viewConflict = (conflict: any) => {
  toast.add({
    severity: 'info',
    summary: 'View Conflict',
    detail: `Viewing conflict ${conflict.id}`,
    life: 3000
  })
}

const resolveConflict = (conflict: any) => {
  conflict.status = 'In Progress'
  toast.add({
    severity: 'success',
    summary: 'Conflict Resolution Started',
    detail: `Resolution started for conflict ${conflict.id}`,
    life: 3000
  })
}

const editConflict = (conflict: any) => {
  toast.add({
    severity: 'info',
    summary: 'Edit Conflict',
    detail: `Editing conflict ${conflict.id}`,
    life: 3000
  })
}

const applyResolution = (conflict: any) => {
  conflict.status = 'Resolved'
  toast.add({
    severity: 'success',
    summary: 'Resolution Applied',
    detail: `Resolution applied to conflict ${conflict.id}`,
    life: 3000
  })
}

const onRowExpand = (event: any) => {
  // Handle row expansion
}

const onRowCollapse = (event: any) => {
  // Handle row collapse
}

onMounted(() => {
  loading.value = true
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script> 