<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Bulk Student Operations</h1>
        <p class="text-ike-neutral mt-2">
          Import, export, and perform bulk operations on student data
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="showExportModal = true">
          <i class="pi pi-download mr-2"></i>
          Export Data
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showImportModal = true">
          <i class="pi pi-upload mr-2"></i>
          Import Data
        </Button>
      </div>
    </div>

    <!-- Operation Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Recent Imports
          </CardTitle>
          <i class="pi pi-upload h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">24</div>
          <div class="text-xs text-ike-neutral mt-1">
            This month
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Successful Operations
          </CardTitle>
          <i class="pi pi-check-circle h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">1,247</div>
          <div class="text-xs text-ike-neutral mt-1">
            Students processed
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Pending Operations
          </CardTitle>
          <i class="pi pi-clock h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">3</div>
          <div class="text-xs text-ike-neutral mt-1">
            In queue
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Failed Operations
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">2</div>
          <div class="text-xs text-ike-neutral mt-1">
            Require attention
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="showImportModal = true">
        <CardHeader>
          <CardTitle class="flex items-center space-x-2">
            <i class="pi pi-upload text-ike-primary"></i>
            <span>Import Students</span>
          </CardTitle>
          <CardDescription>
            Import student data from CSV, Excel, or XML files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-ike-neutral">
            Supported formats: CSV, XLSX, XML
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="showExportModal = true">
        <CardHeader>
          <CardTitle class="flex items-center space-x-2">
            <i class="pi pi-download text-ike-success"></i>
            <span>Export Data</span>
          </CardTitle>
          <CardDescription>
            Export student data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-ike-neutral">
            Formats: CSV, XLSX, PDF, JSON
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="showBulkUpdateModal = true">
        <CardHeader>
          <CardTitle class="flex items-center space-x-2">
            <i class="pi pi-pencil text-ike-warning"></i>
            <span>Bulk Update</span>
          </CardTitle>
          <CardDescription>
            Update multiple student records at once
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-ike-neutral">
            Update fields, status, or assignments
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="showValidationModal = true">
        <CardHeader>
          <CardTitle class="flex items-center space-x-2">
            <i class="pi pi-check-square text-ike-primary"></i>
            <span>Data Validation</span>
          </CardTitle>
          <CardDescription>
            Validate student data integrity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-ike-neutral">
            Check for errors and inconsistencies
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="showMergeModal = true">
        <CardHeader>
          <CardTitle class="flex items-center space-x-2">
            <i class="pi pi-objects-column text-ike-success"></i>
            <span>Merge Records</span>
          </CardTitle>
          <CardDescription>
            Merge duplicate student records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-ike-neutral">
            Identify and merge duplicates
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="showArchiveModal = true">
        <CardHeader>
          <CardTitle class="flex items-center space-x-2">
            <i class="pi pi-archive text-ike-neutral"></i>
            <span>Archive Data</span>
          </CardTitle>
          <CardDescription>
            Archive old student records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-ike-neutral">
            Archive inactive students
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Operations -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Operations</CardTitle>
        <CardDescription>
          Track the status of recent bulk operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="recentOperations"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20]"
          stripedRows
        >
          <Column field="id" header="Operation ID" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge variant="outline" class="font-mono">{{ data.id }}</Badge>
            </template>
          </Column>
          
          <Column field="type" header="Type" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getOperationTypeVariant(data.type)">
                {{ data.type }}
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
          
          <Column field="progress" header="Progress" sortable style="width: 150px">
            <template #body="{ data }">
              <div class="flex items-center space-x-2">
                <Progress :value="data.progress" class="flex-1" />
                <span class="text-sm text-ike-neutral">{{ data.progress }}%</span>
              </div>
            </template>
          </Column>
          
          <Column field="recordsProcessed" header="Records" sortable style="width: 100px">
            <template #body="{ data }">
              <span class="text-sm">{{ data.recordsProcessed }}/{{ data.totalRecords }}</span>
            </template>
          </Column>
          
          <Column field="startedAt" header="Started" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.startedAt) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 100px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewOperation(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  v-if="data.status === 'Running'"
                  variant="ghost"
                  size="sm"
                  @click="cancelOperation(data)"
                  class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <i class="pi pi-times h-4 w-4"></i>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </CardContent>
    </Card>

    <!-- Import Modal -->
    <Modal
      v-model="showImportModal"
      title="Import Student Data"
      width="600px"
    >
      <div class="space-y-4">
        <FormField label="Import Type" required>
          <Dropdown
            v-model="importConfig.type"
            :options="importTypeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select import type"
            class="w-full"
          />
        </FormField>
        
        <FormField label="File Upload" required>
          <FileUpload
            v-model="importConfig.files"
            :multiple="false"
            accept=".csv,.xlsx,.xml"
            :maxFileSize="10000000"
            chooseLabel="Choose File"
            uploadLabel="Upload"
            cancelLabel="Cancel"
            class="w-full"
            @select="onFileSelect"
          />
        </FormField>
        
        <FormField label="Options">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Checkbox
                v-model="importConfig.options.skipHeader"
                :binary="true"
                inputId="skipHeader"
              />
              <label for="skipHeader" class="text-sm">Skip header row</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox
                v-model="importConfig.options.updateExisting"
                :binary="true"
                inputId="updateExisting"
              />
              <label for="updateExisting" class="text-sm">Update existing records</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox
                v-model="importConfig.options.validateOnly"
                :binary="true"
                inputId="validateOnly"
              />
              <label for="validateOnly" class="text-sm">Validate only (no import)</label>
            </div>
          </div>
        </FormField>
        
        <FormField label="Mapping">
          <div class="text-sm text-ike-neutral">
            Configure field mapping after file upload
          </div>
        </FormField>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showImportModal = false">Cancel</Button>
        <Button @click="startImport" :loading="importing" :disabled="!importConfig.files?.length">
          Start Import
        </Button>
      </template>
    </Modal>

    <!-- Export Modal -->
    <Modal
      v-model="showExportModal"
      title="Export Student Data"
      width="500px"
    >
      <div class="space-y-4">
        <FormField label="Export Type" required>
          <Dropdown
            v-model="exportConfig.type"
            :options="exportTypeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select export type"
            class="w-full"
          />
        </FormField>
        
        <FormField label="Format" required>
          <Dropdown
            v-model="exportConfig.format"
            :options="exportFormatOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select format"
            class="w-full"
          />
        </FormField>
        
        <FormField label="Filters">
          <MultiSelect
            v-model="exportConfig.filters"
            :options="exportFilterOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select filters"
            class="w-full"
            :showClear="true"
          />
        </FormField>
        
        <FormField label="Fields to Export">
          <MultiSelect
            v-model="exportConfig.fields"
            :options="exportFieldOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select fields"
            class="w-full"
            :showClear="true"
          />
        </FormField>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showExportModal = false">Cancel</Button>
        <Button @click="startExport" :loading="exporting">
          Start Export
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import Progress from '@/components/ui/Progress.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'

const toast = useToast()

// State
const showImportModal = ref(false)
const showExportModal = ref(false)
const showBulkUpdateModal = ref(false)
const showValidationModal = ref(false)
const showMergeModal = ref(false)
const showArchiveModal = ref(false)

const importing = ref(false)
const exporting = ref(false)

const importConfig = ref({
  type: null,
  files: null,
  options: {
    skipHeader: true,
    updateExisting: false,
    validateOnly: false
  }
})

const exportConfig = ref({
  type: null,
  format: null,
  filters: [],
  fields: []
})

// Sample data
const recentOperations = ref([
  {
    id: 'OP-2024-001',
    type: 'Import',
    status: 'Completed',
    progress: 100,
    recordsProcessed: 150,
    totalRecords: 150,
    startedAt: '2024-01-15T10:30:00'
  },
  {
    id: 'OP-2024-002',
    type: 'Export',
    status: 'Running',
    progress: 65,
    recordsProcessed: 650,
    totalRecords: 1000,
    startedAt: '2024-01-15T11:15:00'
  },
  {
    id: 'OP-2024-003',
    type: 'Bulk Update',
    status: 'Failed',
    progress: 0,
    recordsProcessed: 0,
    totalRecords: 200,
    startedAt: '2024-01-15T09:45:00'
  }
])

// Options
const importTypeOptions = [
  { label: 'Student Data', value: 'students' },
  { label: 'Enrollment Data', value: 'enrollments' },
  { label: 'Contact Information', value: 'contacts' },
  { label: 'Financial Data', value: 'financial' }
]

const exportTypeOptions = [
  { label: 'All Students', value: 'all' },
  { label: 'Active Students', value: 'active' },
  { label: 'Inactive Students', value: 'inactive' },
  { label: 'By Organization', value: 'organization' }
]

const exportFormatOptions = [
  { label: 'CSV', value: 'csv' },
  { label: 'Excel (XLSX)', value: 'xlsx' },
  { label: 'PDF', value: 'pdf' },
  { label: 'JSON', value: 'json' }
]

const exportFilterOptions = [
  { label: 'By Municipality', value: 'municipality' },
  { label: 'By School', value: 'school' },
  { label: 'By Grade', value: 'grade' },
  { label: 'By Status', value: 'status' }
]

const exportFieldOptions = [
  { label: 'Student ID', value: 'studentId' },
  { label: 'Name', value: 'name' },
  { label: 'Date of Birth', value: 'birthDate' },
  { label: 'Address', value: 'address' },
  { label: 'Contact Info', value: 'contact' },
  { label: 'Enrollment Status', value: 'enrollment' },
  { label: 'School', value: 'school' },
  { label: 'Grade', value: 'grade' }
]

// Methods
const getOperationTypeVariant = (type: string) => {
  switch (type) {
    case 'Import': return 'default'
    case 'Export': return 'secondary'
    case 'Bulk Update': return 'outline'
    default: return 'outline'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed': return 'secondary'
    case 'Running': return 'default'
    case 'Failed': return 'destructive'
    case 'Pending': return 'outline'
    default: return 'outline'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const onFileSelect = (event: any) => {
  console.log('File selected:', event.files)
}

const startImport = async () => {
  importing.value = true
  
  // Simulate import process
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  importing.value = false
  showImportModal.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Import Started',
    detail: 'Student data import has been initiated',
    life: 3000
  })
}

const startExport = async () => {
  exporting.value = true
  
  // Simulate export process
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  exporting.value = false
  showExportModal.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Export Started',
    detail: 'Student data export has been initiated',
    life: 3000
  })
}

const viewOperation = (operation: any) => {
  toast.add({
    severity: 'info',
    summary: 'View Operation',
    detail: `Viewing operation ${operation.id}`,
    life: 3000
  })
}

const cancelOperation = (operation: any) => {
  operation.status = 'Cancelled'
  operation.progress = 0
  
  toast.add({
    severity: 'warn',
    summary: 'Operation Cancelled',
    detail: `Operation ${operation.id} has been cancelled`,
    life: 3000
  })
}

onMounted(() => {
  // Initialize component
})
</script> 