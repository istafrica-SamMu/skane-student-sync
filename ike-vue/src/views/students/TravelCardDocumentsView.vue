<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Travel Card Documents</h1>
        <p class="text-ike-neutral mt-2">
          Manage student travel card applications and document processing
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="exportTravelData">
          <i class="pi pi-download mr-2"></i>
          Export Data
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showNewApplicationModal = true">
          <i class="pi pi-plus mr-2"></i>
          New Application
        </Button>
      </div>
    </div>

    <!-- Status Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Pending Applications
          </CardTitle>
          <i class="pi pi-clock h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">25</div>
          <div class="text-xs text-ike-neutral mt-1">
            Awaiting review
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Approved This Month
          </CardTitle>
          <i class="pi pi-check-circle h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">89</div>
          <div class="text-xs text-ike-neutral mt-1">
            Cards issued
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Missing Documents
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">12</div>
          <div class="text-xs text-ike-neutral mt-1">
            Require additional docs
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Expiring Soon
          </CardTitle>
          <i class="pi pi-calendar-times h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">8</div>
          <div class="text-xs text-ike-neutral mt-1">
            Within 30 days
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Advanced Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Travel Card Filters</CardTitle>
        <CardDescription>
          Filter applications by status, type, and organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form @submit="applyFilters">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Application Status">
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
            
            <FormField label="Card Type">
              <MultiSelect
                v-model="filters.cardType"
                :options="cardTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select card types"
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
            
            <FormField label="Distance Category">
              <Dropdown
                v-model="filters.distanceCategory"
                :options="distanceCategoryOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select distance"
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

    <!-- Travel Card Applications Table -->
    <Card>
      <CardHeader>
        <CardTitle>Travel Card Applications</CardTitle>
        <CardDescription>
          Review and process travel card applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="filteredApplications"
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
          
          <Column field="cardType" header="Card Type" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getCardTypeVariant(data.cardType)">
                {{ data.cardType }}
              </Badge>
            </template>
          </Column>
          
          <Column field="distanceCategory" header="Distance" sortable style="width: 100px">
            <template #body="{ data }">
              <div class="flex items-center space-x-1">
                <i class="pi pi-map-marker text-ike-primary"></i>
                <span class="text-sm">{{ data.distanceCategory }}</span>
              </div>
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
          
          <Column field="status" header="Status" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getStatusVariant(data.status)">
                {{ data.status }}
              </Badge>
            </template>
          </Column>
          
          <Column field="cardNumber" header="Card Number" sortable style="width: 140px">
            <template #body="{ data }">
              <div v-if="data.cardNumber" class="font-mono text-sm">
                {{ data.cardNumber }}
              </div>
              <div v-else class="text-sm text-ike-neutral">
                Pending
              </div>
            </template>
          </Column>
          
          <Column field="expiryDate" header="Expiry" sortable style="width: 120px">
            <template #body="{ data }">
              <div v-if="data.expiryDate" class="text-sm">
                <span :class="isExpiringSoon(data.expiryDate) ? 'text-ike-error' : 'text-ike-neutral'">
                  {{ formatDate(data.expiryDate) }}
                </span>
              </div>
              <div v-else class="text-sm text-ike-neutral">
                N/A
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
                  @click="viewApplication(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Pending'"
                  variant="ghost"
                  size="sm"
                  @click="approveApplication(data)"
                  class="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                >
                  <i class="pi pi-check h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Pending'"
                  variant="ghost"
                  size="sm"
                  @click="rejectApplication(data)"
                  class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <i class="pi pi-times h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editApplication(data)"
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

    <!-- New Application Modal -->
    <Modal
      v-model="showNewApplicationModal"
      title="New Travel Card Application"
      width="800px"
    >
      <div class="space-y-4">
        <Form @submit="createApplication">
          <div class="grid grid-cols-2 gap-4">
            <FormField label="Student" required>
              <Dropdown
                v-model="newApplication.studentId"
                :options="studentOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select student"
                class="w-full"
                :filter="true"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Card Type" required>
              <Dropdown
                v-model="newApplication.cardType"
                :options="cardTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select card type"
                class="w-full"
              />
            </FormField>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <FormField label="Distance Category" required>
              <Dropdown
                v-model="newApplication.distanceCategory"
                :options="distanceCategoryOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select distance"
                class="w-full"
              />
            </FormField>
            
            <FormField label="Priority">
              <Dropdown
                v-model="newApplication.priority"
                :options="priorityOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select priority"
                class="w-full"
              />
            </FormField>
          </div>
          
          <FormField label="Home Address" required>
            <Textarea
              v-model="newApplication.homeAddress"
              placeholder="Enter home address"
              rows="2"
              class="w-full"
            />
          </FormField>
          
          <FormField label="School Address" required>
            <Textarea
              v-model="newApplication.schoolAddress"
              placeholder="Enter school address"
              rows="2"
              class="w-full"
            />
          </FormField>
          
          <FormField label="Required Documents">
            <FileUpload
              v-model="newApplication.documents"
              :multiple="true"
              accept=".pdf,.jpg,.png"
              :maxFileSize="10000000"
              chooseLabel="Choose Files"
              uploadLabel="Upload"
              cancelLabel="Cancel"
              class="w-full"
            />
            <div class="text-xs text-ike-neutral mt-2">
              Required: ID document, proof of address, school enrollment confirmation
            </div>
          </FormField>
          
          <FormField label="Additional Notes">
            <Textarea
              v-model="newApplication.notes"
              placeholder="Enter any additional notes"
              rows="3"
              class="w-full"
            />
          </FormField>
        </Form>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showNewApplicationModal = false">Cancel</Button>
        <Button @click="createApplication" :loading="creatingApplication">Create Application</Button>
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
const creatingApplication = ref(false)
const showNewApplicationModal = ref(false)

const filters = ref({
  status: [],
  cardType: [],
  organization: null,
  dateRange: null,
  distanceCategory: null,
  priority: null
})

const newApplication = ref({
  studentId: null,
  cardType: null,
  distanceCategory: null,
  priority: null,
  homeAddress: '',
  schoolAddress: '',
  documents: null,
  notes: ''
})

// Sample data
const applications = ref([
  {
    id: 'TC-2024-001',
    studentName: 'Anna Andersson',
    studentId: '2024-001',
    cardType: 'Regional Card',
    distanceCategory: '5-10 km',
    organization: 'Independent School Alpha',
    status: 'Pending',
    cardNumber: null,
    expiryDate: null,
    submittedAt: '2024-01-15T10:30:00'
  },
  {
    id: 'TC-2024-002',
    studentName: 'Erik Eriksson',
    studentId: '2024-002',
    cardType: 'Municipal Card',
    distanceCategory: '2-5 km',
    organization: 'Municipality Beta School',
    status: 'Approved',
    cardNumber: 'TC-2024-002-001',
    expiryDate: '2025-01-15',
    submittedAt: '2024-01-14T14:20:00'
  },
  {
    id: 'TC-2024-003',
    studentName: 'Maria Nilsson',
    studentId: '2024-003',
    cardType: 'Regional Card',
    distanceCategory: '10-15 km',
    organization: 'Independent School Delta',
    status: 'Rejected',
    cardNumber: null,
    expiryDate: null,
    submittedAt: '2024-01-13T09:15:00'
  }
])

// Options
const statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Under Review', value: 'Under Review' },
  { label: 'Document Required', value: 'Document Required' }
]

const cardTypeOptions = [
  { label: 'Regional Card', value: 'Regional Card' },
  { label: 'Municipal Card', value: 'Municipal Card' },
  { label: 'Special Needs Card', value: 'Special Needs Card' },
  { label: 'Temporary Card', value: 'Temporary Card' }
]

const distanceCategoryOptions = [
  { label: '0-2 km', value: '0-2 km' },
  { label: '2-5 km', value: '2-5 km' },
  { label: '5-10 km', value: '5-10 km' },
  { label: '10-15 km', value: '10-15 km' },
  { label: '15+ km', value: '15+ km' }
]

const organizationOptions = [
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Municipality Beta School', value: 'Municipality Beta School' },
  { label: 'Independent School Delta', value: 'Independent School Delta' },
  { label: 'Municipality Gamma School', value: 'Municipality Gamma School' }
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
const filteredApplications = computed(() => {
  return applications.value.filter(application => {
    const matchesStatus = filters.value.status.length === 0 || 
      filters.value.status.includes(application.status)
    
    const matchesCardType = filters.value.cardType.length === 0 || 
      filters.value.cardType.includes(application.cardType)
    
    const matchesOrg = !filters.value.organization || 
      application.organization === filters.value.organization
    
    const matchesDistance = !filters.value.distanceCategory || 
      application.distanceCategory === filters.value.distanceCategory
    
    return matchesStatus && matchesCardType && matchesOrg && matchesDistance
  })
})

// Methods
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getCardTypeVariant = (type: string) => {
  switch (type) {
    case 'Regional Card': return 'default'
    case 'Municipal Card': return 'secondary'
    case 'Special Needs Card': return 'outline'
    case 'Temporary Card': return 'destructive'
    default: return 'outline'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Approved': return 'secondary'
    case 'Pending': return 'default'
    case 'Rejected': return 'destructive'
    case 'Under Review': return 'outline'
    case 'Document Required': return 'destructive'
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

const isExpiringSoon = (expiryDate: string) => {
  const expiry = new Date(expiryDate)
  const now = new Date()
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilExpiry <= 30
}

const applyFilters = async () => {
  applyingFilters.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  applyingFilters.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Filters Applied',
    detail: 'Travel card filters have been applied successfully',
    life: 3000
  })
}

const clearFilters = () => {
  filters.value = {
    status: [],
    cardType: [],
    organization: null,
    dateRange: null,
    distanceCategory: null,
    priority: null
  }
  
  toast.add({
    severity: 'info',
    summary: 'Filters Cleared',
    detail: 'All filters have been cleared',
    life: 3000
  })
}

const exportTravelData = () => {
  toast.add({
    severity: 'success',
    summary: 'Export Started',
    detail: 'Travel card data export has been initiated',
    life: 3000
  })
}

const createApplication = async () => {
  if (!newApplication.value.studentId || !newApplication.value.cardType || 
      !newApplication.value.distanceCategory || !newApplication.value.homeAddress || 
      !newApplication.value.schoolAddress) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  creatingApplication.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const application = {
    id: `TC-2024-${String(applications.value.length + 1).padStart(3, '0')}`,
    studentName: studentOptions.find(s => s.value === newApplication.value.studentId)?.label.split(' (')[0] || 'Unknown Student',
    studentId: newApplication.value.studentId,
    cardType: newApplication.value.cardType,
    distanceCategory: newApplication.value.distanceCategory,
    organization: 'Current Organization',
    status: 'Pending',
    cardNumber: null,
    expiryDate: null,
    submittedAt: new Date().toISOString()
  }
  
  applications.value.unshift(application)
  
  // Reset form
  newApplication.value = {
    studentId: null,
    cardType: null,
    distanceCategory: null,
    priority: null,
    homeAddress: '',
    schoolAddress: '',
    documents: null,
    notes: ''
  }
  
  showNewApplicationModal.value = false
  creatingApplication.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Application Created',
    detail: 'Travel card application has been created successfully',
    life: 3000
  })
}

const viewApplication = (application: any) => {
  toast.add({
    severity: 'info',
    summary: 'View Application',
    detail: `Viewing application ${application.id}`,
    life: 3000
  })
}

const approveApplication = (application: any) => {
  application.status = 'Approved'
  application.cardNumber = `${application.id}-001`
  application.expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  toast.add({
    severity: 'success',
    summary: 'Application Approved',
    detail: `Application ${application.id} has been approved`,
    life: 3000
  })
}

const rejectApplication = (application: any) => {
  application.status = 'Rejected'
  
  toast.add({
    severity: 'warn',
    summary: 'Application Rejected',
    detail: `Application ${application.id} has been rejected`,
    life: 3000
  })
}

const editApplication = (application: any) => {
  toast.add({
    severity: 'info',
    summary: 'Edit Application',
    detail: `Editing application ${application.id}`,
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