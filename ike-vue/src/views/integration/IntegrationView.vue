<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Integration & Import</h1>
        <p class="text-ike-neutral mt-2">
          Manage data imports, exports, and system integrations
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="showExportModal = true">
          <i class="pi pi-upload mr-2"></i>
          Export Data
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showImportModal = true">
          <i class="pi pi-download mr-2"></i>
          Import Data
        </Button>
      </div>
    </div>

    <!-- Integration Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Active Integrations
          </CardTitle>
          <i class="pi pi-check-circle h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">8</div>
          <div class="text-xs text-ike-neutral mt-1">
            All systems connected
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Data Sync Status
          </CardTitle>
          <i class="pi pi-sync h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">Real-time</div>
          <div class="text-xs text-ike-neutral mt-1">
            Last sync: 2 min ago
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Pending Imports
          </CardTitle>
          <i class="pi pi-clock h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">3</div>
          <div class="text-xs text-ike-neutral mt-1">
            Awaiting processing
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Failed Imports
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">1</div>
          <div class="text-xs text-ike-neutral mt-1">
            Requires attention
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Integration Systems -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Systems</CardTitle>
          <CardDescription>
            Status of integrated external systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div 
              v-for="system in connectedSystems" 
              :key="system.id"
              class="flex items-center justify-between p-4 border rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-ike-primary/10 flex items-center justify-center">
                  <i :class="`${system.icon} text-ike-primary`"></i>
                </div>
                <div>
                  <h4 class="font-medium text-ike-neutral-dark">{{ system.name }}</h4>
                  <p class="text-sm text-ike-neutral">{{ system.description }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <Badge :variant="system.status === 'Connected' ? 'default' : 'destructive'">
                  {{ system.status }}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="testConnection(system)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-refresh h-4 w-4"></i>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Import History</CardTitle>
          <CardDescription>
            Latest data import activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div 
              v-for="importItem in importHistory" 
              :key="importItem.id"
              class="flex items-center justify-between p-4 border rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-ike-primary/10 flex items-center justify-center">
                  <i :class="`${importItem.icon} text-ike-primary`"></i>
                </div>
                <div>
                  <h4 class="font-medium text-ike-neutral-dark">{{ importItem.title }}</h4>
                  <p class="text-sm text-ike-neutral">{{ importItem.description }}</p>
                  <p class="text-xs text-ike-neutral/70">{{ importItem.timestamp }}</p>
                </div>
              </div>
              <Badge :variant="getImportStatusVariant(importItem.status)">
                {{ importItem.status }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Data Import/Export -->
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Import and export data in various formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Import Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-ike-neutral-dark">Import Data</h3>
            
            <FormField label="Import Type">
              <Dropdown
                v-model="importConfig.type"
                :options="importTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select import type"
                class="w-full"
              />
            </FormField>
            
            <FormField label="File Upload">
              <FileUpload
                v-model="importConfig.files"
                :multiple="true"
                accept=".csv,.xlsx,.json"
                :maxFileSize="10000000"
                chooseLabel="Choose Files"
                uploadLabel="Upload"
                cancelLabel="Cancel"
                class="w-full"
              />
            </FormField>
            
            <FormField label="Import Options">
              <div class="space-y-2">
                <Checkbox
                  v-model="importConfig.overwrite"
                  :binary="true"
                  label="Overwrite existing data"
                />
                <Checkbox
                  v-model="importConfig.validate"
                  :binary="true"
                  label="Validate data before import"
                />
                <Checkbox
                  v-model="importConfig.notify"
                  :binary="true"
                  label="Send notification on completion"
                />
              </div>
            </FormField>
            
            <Button 
              @click="startImport" 
              :loading="importing"
              :disabled="!importConfig.files || importConfig.files.length === 0"
              class="w-full"
            >
              <i class="pi pi-upload mr-2"></i>
              Start Import
            </Button>
          </div>

          <!-- Export Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-ike-neutral-dark">Export Data</h3>
            
            <FormField label="Export Type">
              <Dropdown
                v-model="exportConfig.type"
                :options="exportTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select export type"
                class="w-full"
              />
            </FormField>
            
            <FormField label="Data Range">
              <Calendar
                v-model="exportConfig.dateRange"
                selectionMode="range"
                placeholder="Select date range"
                class="w-full"
                :showIcon="true"
              />
            </FormField>
            
            <FormField label="Export Format">
              <Dropdown
                v-model="exportConfig.format"
                :options="exportFormatOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select format"
                class="w-full"
              />
            </FormField>
            
            <FormField label="Export Options">
              <div class="space-y-2">
                <Checkbox
                  v-model="exportConfig.includeMetadata"
                  :binary="true"
                  label="Include metadata"
                />
                <Checkbox
                  v-model="exportConfig.compress"
                  :binary="true"
                  label="Compress file"
                />
              </div>
            </FormField>
            
            <Button 
              @click="startExport" 
              :loading="exporting"
              class="w-full"
            >
              <i class="pi pi-download mr-2"></i>
              Start Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Import Modal -->
    <Modal
      v-model="showImportModal"
      title="Import Data"
      width="800px"
    >
      <div class="space-y-4">
        <FormField label="Select Import Type" required>
          <Dropdown
            v-model="modalImportConfig.type"
            :options="importTypeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select import type"
            class="w-full"
          />
        </FormField>
        
        <FormField label="Upload Files" required>
          <FileUpload
            v-model="modalImportConfig.files"
            :multiple="true"
            accept=".csv,.xlsx,.json"
            :maxFileSize="10000000"
            chooseLabel="Choose Files"
            uploadLabel="Upload"
            cancelLabel="Cancel"
            class="w-full"
          />
        </FormField>
        
        <FormField label="Import Settings">
          <div class="grid grid-cols-2 gap-4">
            <Checkbox
              v-model="modalImportConfig.overwrite"
              :binary="true"
              label="Overwrite existing data"
            />
            <Checkbox
              v-model="modalImportConfig.validate"
              :binary="true"
              label="Validate data"
            />
          </div>
        </FormField>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showImportModal = false">Cancel</Button>
        <Button @click="processImport" :loading="processingImport">Process Import</Button>
      </template>
    </Modal>

    <!-- Export Modal -->
    <Modal
      v-model="showExportModal"
      title="Export Data"
      width="600px"
    >
      <div class="space-y-4">
        <FormField label="Export Type" required>
          <Dropdown
            v-model="modalExportConfig.type"
            :options="exportTypeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select export type"
            class="w-full"
          />
        </FormField>
        
        <FormField label="Date Range">
          <Calendar
            v-model="modalExportConfig.dateRange"
            selectionMode="range"
            placeholder="Select date range"
            class="w-full"
            :showIcon="true"
          />
        </FormField>
        
        <FormField label="Export Format" required>
          <Dropdown
            v-model="modalExportConfig.format"
            :options="exportFormatOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select format"
            class="w-full"
          />
        </FormField>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showExportModal = false">Cancel</Button>
        <Button @click="processExport" :loading="processingExport">Process Export</Button>
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
import FormField from '@/components/ui/FormField.vue'
import Modal from '@/components/ui/Modal.vue'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'

const toast = useToast()

// State
const importing = ref(false)
const exporting = ref(false)
const processingImport = ref(false)
const processingExport = ref(false)
const showImportModal = ref(false)
const showExportModal = ref(false)

const importConfig = ref({
  type: null,
  files: [],
  overwrite: false,
  validate: true,
  notify: true
})

const exportConfig = ref({
  type: null,
  dateRange: null,
  format: null,
  includeMetadata: true,
  compress: false
})

const modalImportConfig = ref({
  type: null,
  files: [],
  overwrite: false,
  validate: true
})

const modalExportConfig = ref({
  type: null,
  dateRange: null,
  format: null
})

// Sample data
const connectedSystems = ref([
  {
    id: 1,
    name: 'Student Registry System',
    description: 'Central student database',
    icon: 'pi pi-database',
    status: 'Connected'
  },
  {
    id: 2,
    name: 'Financial Management',
    description: 'IKE calculation system',
    icon: 'pi pi-calculator',
    status: 'Connected'
  },
  {
    id: 3,
    name: 'Municipality Portal',
    description: 'Municipality data exchange',
    icon: 'pi pi-building',
    status: 'Connected'
  },
  {
    id: 4,
    name: 'External API',
    description: 'Third-party integrations',
    icon: 'pi pi-globe',
    status: 'Disconnected'
  }
])

const importHistory = ref([
  {
    id: 1,
    title: 'Student Data Import',
    description: 'Imported 1,247 student records',
    icon: 'pi pi-users',
    status: 'Completed',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    title: 'Financial Data Sync',
    description: 'Synchronized financial records',
    icon: 'pi pi-dollar',
    status: 'Completed',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    title: 'Municipality Data',
    description: 'Updated municipality information',
    icon: 'pi pi-building',
    status: 'Failed',
    timestamp: '6 hours ago'
  }
])

// Options for dropdowns
const importTypeOptions = [
  { label: 'Student Data', value: 'students' },
  { label: 'Financial Data', value: 'financial' },
  { label: 'Organization Data', value: 'organizations' },
  { label: 'Settings Data', value: 'settings' }
]

const exportTypeOptions = [
  { label: 'Student Registry', value: 'students' },
  { label: 'Financial Reports', value: 'financial' },
  { label: 'Statistical Data', value: 'statistics' },
  { label: 'Audit Logs', value: 'audit' }
]

const exportFormatOptions = [
  { label: 'CSV', value: 'csv' },
  { label: 'Excel', value: 'excel' },
  { label: 'JSON', value: 'json' },
  { label: 'XML', value: 'xml' }
]

// Methods
const testConnection = (system: any) => {
  toast.add({
    severity: 'info',
    summary: 'Connection Test',
    detail: `Testing connection to ${system.name}`,
    life: 3000
  })
}

const startImport = async () => {
  if (!importConfig.value.type || !importConfig.value.files || importConfig.value.files.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please select import type and upload files',
      life: 3000
    })
    return
  }

  importing.value = true
  
  // Simulate import process
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  importing.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Import Complete',
    detail: 'Data import completed successfully',
    life: 3000
  })
}

const startExport = async () => {
  if (!exportConfig.value.type || !exportConfig.value.format) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please select export type and format',
      life: 3000
    })
    return
  }

  exporting.value = true
  
  // Simulate export process
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  exporting.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Export Complete',
    detail: 'Data export completed successfully',
    life: 3000
  })
}

const processImport = async () => {
  if (!modalImportConfig.value.type || !modalImportConfig.value.files || modalImportConfig.value.files.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  processingImport.value = true
  
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  processingImport.value = false
  showImportModal.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Import Processed',
    detail: 'Import has been processed successfully',
    life: 3000
  })
}

const processExport = async () => {
  if (!modalExportConfig.value.type || !modalExportConfig.value.format) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  processingExport.value = true
  
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  processingExport.value = false
  showExportModal.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Export Processed',
    detail: 'Export has been processed successfully',
    life: 3000
  })
}

const getImportStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed': return 'default'
    case 'Processing': return 'secondary'
    case 'Failed': return 'destructive'
    default: return 'outline'
  }
}

onMounted(() => {
  // Initialize any required data
})
</script> 