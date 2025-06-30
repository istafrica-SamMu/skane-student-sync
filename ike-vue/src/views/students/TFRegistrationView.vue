<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">TF Number Registration</h1>
        <p class="text-ike-neutral mt-2">
          Manage Tax Agency (TF) number registrations for students
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="exportTFData">
          <i class="pi pi-download mr-2"></i>
          Export Data
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showBulkRegistrationModal = true">
          <i class="pi pi-users mr-2"></i>
          Bulk Registration
        </Button>
      </div>
    </div>

    <!-- Status Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Pending Registrations
          </CardTitle>
          <i class="pi pi-clock h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">18</div>
          <div class="text-xs text-ike-neutral mt-1">
            Awaiting processing
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Registered This Month
          </CardTitle>
          <i class="pi pi-check-circle h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">156</div>
          <div class="text-xs text-ike-neutral mt-1">
            Successfully registered
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Validation Errors
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">7</div>
          <div class="text-xs text-ike-neutral mt-1">
            Require correction
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Rejected Applications
          </CardTitle>
          <i class="pi pi-times-circle h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">3</div>
          <div class="text-xs text-ike-neutral mt-1">
            Need resubmission
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Advanced Filters -->
    <Card>
      <CardHeader>
        <CardTitle>TF Registration Filters</CardTitle>
        <CardDescription>
          Filter registrations by status, date, and organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form @submit="applyFilters">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Registration Status">
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
            
            <FormField label="Age Group">
              <Dropdown
                v-model="filters.ageGroup"
                :options="ageGroupOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select age group"
                class="w-full"
              />
            </FormField>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FormField label="Date Range">
              <Calendar
                v-model="filters.dateRange"
                selectionMode="range"
                placeholder="Select date range"
                class="w-full"
                :showIcon="true"
              />
            </FormField>
            
            <FormField label="Registration Type">
              <Dropdown
                v-model="filters.registrationType"
                :options="registrationTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select type"
                class="w-full"
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

    <!-- TF Registrations Table -->
    <Card>
      <CardHeader>
        <CardTitle>TF Number Registrations</CardTitle>
        <CardDescription>
          Manage student TF number registration requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="filteredRegistrations"
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
          
          <Column field="birthDate" header="Birth Date" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.birthDate) }}
              </div>
            </template>
          </Column>
          
          <Column field="age" header="Age" sortable style="width: 80px">
            <template #body="{ data }">
              <Badge :variant="getAgeVariant(data.age)">
                {{ data.age }}
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
          
          <Column field="registrationType" header="Type" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getRegistrationTypeVariant(data.registrationType)">
                {{ data.registrationType }}
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
          
          <Column field="tfNumber" header="TF Number" sortable style="width: 120px">
            <template #body="{ data }">
              <div v-if="data.tfNumber" class="font-mono text-sm">
                {{ data.tfNumber }}
              </div>
              <div v-else class="text-sm text-ike-neutral">
                Pending
              </div>
            </template>
          </Column>
          
          <Column field="submittedAt" header="Submitted" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.submittedAt) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 150px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewRegistration(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Pending'"
                  variant="ghost"
                  size="sm"
                  @click="approveRegistration(data)"
                  class="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                >
                  <i class="pi pi-check h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Pending'"
                  variant="ghost"
                  size="sm"
                  @click="rejectRegistration(data)"
                  class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <i class="pi pi-times h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editRegistration(data)"
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

    <!-- New Registration Modal -->
    <Modal
      v-model="showNewRegistrationModal"
      title="New TF Number Registration"
      width="700px"
    >
      <div class="space-y-4">
        <Form @submit="createRegistration">
          <div class="grid grid-cols-2 gap-4">
            <FormField label="Student" required>
              <Dropdown
                v-model="newRegistration.studentId"
                :options="studentOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select student"
                class="w-full"
                :filter="true"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Registration Type" required>
              <Dropdown
                v-model="newRegistration.registrationType"
                :options="registrationTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select type"
                class="w-full"
              />
            </FormField>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <FormField label="Birth Date" required>
              <Calendar
                v-model="newRegistration.birthDate"
                placeholder="Select birth date"
                class="w-full"
                :showIcon="true"
                :maxDate="new Date()"
              />
            </FormField>
            
            <FormField label="Priority">
              <Dropdown
                v-model="newRegistration.priority"
                :options="priorityOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select priority"
                class="w-full"
              />
            </FormField>
          </div>
          
          <FormField label="Reason for Registration">
            <Textarea
              v-model="newRegistration.reason"
              placeholder="Enter reason for TF number registration"
              rows="3"
              class="w-full"
            />
          </FormField>
          
          <FormField label="Additional Documents">
            <FileUpload
              v-model="newRegistration.documents"
              :multiple="true"
              accept=".pdf,.jpg,.png"
              :maxFileSize="5000000"
              chooseLabel="Choose Files"
              uploadLabel="Upload"
              cancelLabel="Cancel"
              class="w-full"
            />
          </FormField>
        </Form>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showNewRegistrationModal = false">Cancel</Button>
        <Button @click="createRegistration" :loading="creatingRegistration">Create Registration</Button>
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
import FileUpload from 'primevue/fileupload'
import Avatar from 'primevue/avatar'
import Column from 'primevue/column'

const toast = useToast()

// State
const loading = ref(false)
const applyingFilters = ref(false)
const creatingRegistration = ref(false)
const showNewRegistrationModal = ref(false)
const showBulkRegistrationModal = ref(false)

const filters = ref({
  status: [],
  organization: null,
  ageGroup: null,
  dateRange: null,
  registrationType: null,
  priority: null
})

const newRegistration = ref({
  studentId: null,
  registrationType: null,
  birthDate: null,
  priority: null,
  reason: '',
  documents: null
})

// Sample data
const registrations = ref([
  {
    id: 'TF-2024-001',
    studentName: 'Anna Andersson',
    studentId: '2024-001',
    birthDate: '2010-05-15',
    age: 13,
    organization: 'Independent School Alpha',
    registrationType: 'New Registration',
    status: 'Pending',
    tfNumber: null,
    submittedAt: '2024-01-15T10:30:00'
  },
  {
    id: 'TF-2024-002',
    studentName: 'Erik Eriksson',
    studentId: '2024-002',
    birthDate: '2009-08-22',
    age: 14,
    organization: 'Municipality Beta School',
    registrationType: 'Replacement',
    status: 'Approved',
    tfNumber: '123456-7890',
    submittedAt: '2024-01-14T14:20:00'
  },
  {
    id: 'TF-2024-003',
    studentName: 'Maria Nilsson',
    studentId: '2024-003',
    birthDate: '2011-03-10',
    age: 12,
    organization: 'Independent School Delta',
    registrationType: 'New Registration',
    status: 'Rejected',
    tfNumber: null,
    submittedAt: '2024-01-13T09:15:00'
  }
])

// Options
const statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'In Progress', value: 'In Progress' }
]

const organizationOptions = [
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Municipality Beta School', value: 'Municipality Beta School' },
  { label: 'Independent School Delta', value: 'Independent School Delta' },
  { label: 'Municipality Gamma School', value: 'Municipality Gamma School' }
]

const ageGroupOptions = [
  { label: '6-12 years', value: '6-12' },
  { label: '13-15 years', value: '13-15' },
  { label: '16-18 years', value: '16-18' },
  { label: '19+ years', value: '19+' }
]

const registrationTypeOptions = [
  { label: 'New Registration', value: 'New Registration' },
  { label: 'Replacement', value: 'Replacement' },
  { label: 'Correction', value: 'Correction' },
  { label: 'Emergency', value: 'Emergency' }
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
const filteredRegistrations = computed(() => {
  return registrations.value.filter(registration => {
    const matchesStatus = filters.value.status.length === 0 || 
      filters.value.status.includes(registration.status)
    
    const matchesOrg = !filters.value.organization || 
      registration.organization === filters.value.organization
    
    const matchesType = !filters.value.registrationType || 
      registration.registrationType === filters.value.registrationType
    
    const matchesPriority = !filters.value.priority || 
      registration.priority === filters.value.priority
    
    return matchesStatus && matchesOrg && matchesType && matchesPriority
  })
})

// Methods
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getAgeVariant = (age: number) => {
  if (age < 13) return 'outline'
  if (age < 16) return 'secondary'
  return 'default'
}

const getRegistrationTypeVariant = (type: string) => {
  switch (type) {
    case 'New Registration': return 'default'
    case 'Replacement': return 'secondary'
    case 'Correction': return 'outline'
    case 'Emergency': return 'destructive'
    default: return 'outline'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Approved': return 'secondary'
    case 'Pending': return 'default'
    case 'Rejected': return 'destructive'
    case 'In Progress': return 'outline'
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
    detail: 'TF registration filters have been applied successfully',
    life: 3000
  })
}

const clearFilters = () => {
  filters.value = {
    status: [],
    organization: null,
    ageGroup: null,
    dateRange: null,
    registrationType: null,
    priority: null
  }
  
  toast.add({
    severity: 'info',
    summary: 'Filters Cleared',
    detail: 'All filters have been cleared',
    life: 3000
  })
}

const exportTFData = () => {
  toast.add({
    severity: 'success',
    summary: 'Export Started',
    detail: 'TF registration data export has been initiated',
    life: 3000
  })
}

const createRegistration = async () => {
  if (!newRegistration.value.studentId || !newRegistration.value.registrationType || 
      !newRegistration.value.birthDate) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  creatingRegistration.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const registration = {
    id: `TF-2024-${String(registrations.value.length + 1).padStart(3, '0')}`,
    studentName: studentOptions.find(s => s.value === newRegistration.value.studentId)?.label.split(' (')[0] || 'Unknown Student',
    studentId: newRegistration.value.studentId,
    birthDate: newRegistration.value.birthDate,
    age: new Date().getFullYear() - new Date(newRegistration.value.birthDate).getFullYear(),
    organization: 'Current Organization',
    registrationType: newRegistration.value.registrationType,
    status: 'Pending',
    tfNumber: null,
    submittedAt: new Date().toISOString()
  }
  
  registrations.value.unshift(registration)
  
  // Reset form
  newRegistration.value = {
    studentId: null,
    registrationType: null,
    birthDate: null,
    priority: null,
    reason: '',
    documents: null
  }
  
  showNewRegistrationModal.value = false
  creatingRegistration.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Registration Created',
    detail: 'TF number registration has been created successfully',
    life: 3000
  })
}

const viewRegistration = (registration: any) => {
  toast.add({
    severity: 'info',
    summary: 'View Registration',
    detail: `Viewing registration ${registration.id}`,
    life: 3000
  })
}

const approveRegistration = (registration: any) => {
  registration.status = 'Approved'
  registration.tfNumber = `123456-${Math.floor(Math.random() * 9000) + 1000}`
  
  toast.add({
    severity: 'success',
    summary: 'Registration Approved',
    detail: `Registration ${registration.id} has been approved`,
    life: 3000
  })
}

const rejectRegistration = (registration: any) => {
  registration.status = 'Rejected'
  
  toast.add({
    severity: 'warn',
    summary: 'Registration Rejected',
    detail: `Registration ${registration.id} has been rejected`,
    life: 3000
  })
}

const editRegistration = (registration: any) => {
  toast.add({
    severity: 'info',
    summary: 'Edit Registration',
    detail: `Editing registration ${registration.id}`,
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