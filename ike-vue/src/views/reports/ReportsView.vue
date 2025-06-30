<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Reports & Analysis</h1>
        <p class="text-ike-neutral mt-2">
          Generate and analyze comprehensive reports
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="showExportModal = true">
          <i class="pi pi-download mr-2"></i>
          Export Reports
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="generateReport">
          <i class="pi pi-file-pdf mr-2"></i>
          Generate Report
        </Button>
      </div>
    </div>

    <!-- Report Types Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="reportType in reportTypes" 
        :key="reportType.id"
        class="cursor-pointer hover:shadow-lg transition-shadow"
        @click="selectReportType(reportType)"
      >
        <CardContent class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-lg bg-ike-primary/10 flex items-center justify-center">
              <i :class="`${reportType.icon} text-ike-primary text-xl`"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-ike-neutral-dark">{{ reportType.title }}</h3>
              <p class="text-sm text-ike-neutral mt-1">{{ reportType.description }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <Badge :variant="reportType.status === 'Available' ? 'default' : 'secondary'">
              {{ reportType.status }}
            </Badge>
            <span class="text-xs text-ike-neutral">{{ reportType.lastGenerated }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Advanced Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Report Filters</CardTitle>
        <CardDescription>
          Configure filters for your report generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form @submit="applyFilters">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Date Range">
              <Calendar
                v-model="filters.dateRange"
                selectionMode="range"
                placeholder="Select date range"
                class="w-full"
                :showIcon="true"
              />
            </FormField>
            
            <FormField label="Organization">
              <MultiSelect
                v-model="filters.organizations"
                :options="organizationOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select organizations"
                class="w-full"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Report Type">
              <Dropdown
                v-model="filters.reportType"
                :options="reportTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select report type"
                class="w-full"
              />
            </FormField>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FormField label="Status">
              <MultiSelect
                v-model="filters.statuses"
                :options="statusOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select statuses"
                class="w-full"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Grade Level">
              <MultiSelect
                v-model="filters.gradeLevels"
                :options="gradeLevelOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select grade levels"
                class="w-full"
                :showClear="true"
              />
            </FormField>
            
            <FormField label="Amount Range">
              <div class="flex space-x-2">
                <InputNumber
                  v-model="filters.minAmount"
                  placeholder="Min"
                  class="flex-1"
                  :minFractionDigits="0"
                  :maxFractionDigits="0"
                />
                <InputNumber
                  v-model="filters.maxAmount"
                  placeholder="Max"
                  class="flex-1"
                  :minFractionDigits="0"
                  :maxFractionDigits="0"
                />
              </div>
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

    <!-- Generated Reports Table -->
    <Card>
      <CardHeader>
        <CardTitle>Generated Reports</CardTitle>
        <CardDescription>
          View and manage your generated reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="generatedReports"
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
          
          <Column field="title" header="Report Title" sortable>
            <template #body="{ data }">
              <div>
                <div class="font-medium text-ike-neutral-dark">{{ data.title }}</div>
                <div class="text-xs text-ike-neutral">{{ data.description }}</div>
              </div>
            </template>
          </Column>
          
          <Column field="type" header="Type" sortable style="width: 120px">
            <template #body="{ data }">
              <Badge :variant="getReportTypeVariant(data.type)">
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
          
          <Column field="generatedAt" header="Generated" sortable style="width: 150px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.generatedAt) }}
              </div>
            </template>
          </Column>
          
          <Column field="fileSize" header="Size" sortable style="width: 100px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatFileSize(data.fileSize) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 150px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="downloadReport(data)"
                  class="h-8 w-8 p-0"
                  :disabled="data.status !== 'Completed'"
                >
                  <i class="pi pi-download h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewReport(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="deleteReport(data)"
                  class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <i class="pi pi-trash h-4 w-4"></i>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </CardContent>
    </Card>

    <!-- Export Modal -->
    <Modal
      v-model="showExportModal"
      title="Export Reports"
      width="600px"
    >
      <div class="space-y-4">
        <FormField label="Export Format" required>
          <Dropdown
            v-model="exportConfig.format"
            :options="exportFormatOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select format"
            class="w-full"
          />
        </FormField>
        
        <FormField label="Include Charts">
          <Checkbox
            v-model="exportConfig.includeCharts"
            :binary="true"
            label="Include charts and graphs"
          />
        </FormField>
        
        <FormField label="Include Raw Data">
          <Checkbox
            v-model="exportConfig.includeRawData"
            :binary="true"
            label="Include raw data tables"
          />
        </FormField>
        
        <FormField label="Compression">
          <Dropdown
            v-model="exportConfig.compression"
            :options="compressionOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select compression"
            class="w-full"
          />
        </FormField>
      </div>
      
      <template #footer>
        <Button variant="outline" @click="showExportModal = false">Cancel</Button>
        <Button @click="exportReports" :loading="exporting">Export Reports</Button>
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
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import MultiSelect from 'primevue/multiselect'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'

const toast = useToast()

// State
const loading = ref(false)
const applyingFilters = ref(false)
const exporting = ref(false)
const showExportModal = ref(false)

const filters = ref({
  dateRange: null,
  organizations: [],
  reportType: null,
  statuses: [],
  gradeLevels: [],
  minAmount: null,
  maxAmount: null
})

const exportConfig = ref({
  format: null,
  includeCharts: true,
  includeRawData: false,
  compression: null
})

// Sample data
const reportTypes = ref([
  {
    id: 1,
    title: 'Student Registry Report',
    description: 'Complete student registration data',
    icon: 'pi pi-users',
    status: 'Available',
    lastGenerated: '2 hours ago'
  },
  {
    id: 2,
    title: 'Financial Analysis Report',
    description: 'IKE calculations and financial data',
    icon: 'pi pi-calculator',
    status: 'Available',
    lastGenerated: '1 day ago'
  },
  {
    id: 3,
    title: 'Statistical Overview',
    description: 'Regional statistics and trends',
    icon: 'pi pi-chart-bar',
    status: 'Available',
    lastGenerated: '3 days ago'
  },
  {
    id: 4,
    title: 'Compliance Report',
    description: 'Regulatory compliance data',
    icon: 'pi pi-shield',
    status: 'Processing',
    lastGenerated: '1 week ago'
  },
  {
    id: 5,
    title: 'Performance Metrics',
    description: 'School performance indicators',
    icon: 'pi pi-star',
    status: 'Available',
    lastGenerated: '5 days ago'
  },
  {
    id: 6,
    title: 'Audit Trail Report',
    description: 'System activity and changes',
    icon: 'pi pi-history',
    status: 'Available',
    lastGenerated: '2 days ago'
  }
])

const generatedReports = ref([
  {
    id: 'REP-2024-001',
    title: 'Q4 2024 Student Registry',
    description: 'Complete student data for Q4 2024',
    type: 'Student Registry',
    status: 'Completed',
    generatedAt: '2024-01-15T10:30:00',
    fileSize: 2048576
  },
  {
    id: 'REP-2024-002',
    title: 'Financial Analysis Q4',
    description: 'Financial analysis for Q4 2024',
    type: 'Financial Analysis',
    status: 'Completed',
    generatedAt: '2024-01-14T14:20:00',
    fileSize: 1536000
  },
  {
    id: 'REP-2024-003',
    title: 'Regional Statistics 2024',
    description: 'Regional statistics overview',
    type: 'Statistical Overview',
    status: 'Processing',
    generatedAt: '2024-01-13T09:15:00',
    fileSize: 0
  }
])

// Options for dropdowns
const organizationOptions = [
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Municipality Beta', value: 'Municipality Beta' },
  { label: 'Regional Office', value: 'Regional Office' }
]

const reportTypeOptions = [
  { label: 'Student Registry', value: 'student-registry' },
  { label: 'Financial Analysis', value: 'financial-analysis' },
  { label: 'Statistical Overview', value: 'statistical-overview' },
  { label: 'Compliance Report', value: 'compliance-report' }
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' }
]

const gradeLevelOptions = [
  { label: 'Grade 9', value: 'grade-9' },
  { label: 'Grade 10', value: 'grade-10' },
  { label: 'Grade 11', value: 'grade-11' },
  { label: 'Grade 12', value: 'grade-12' }
]

const exportFormatOptions = [
  { label: 'PDF', value: 'pdf' },
  { label: 'Excel', value: 'excel' },
  { label: 'CSV', value: 'csv' },
  { label: 'JSON', value: 'json' }
]

const compressionOptions = [
  { label: 'None', value: 'none' },
  { label: 'ZIP', value: 'zip' },
  { label: 'RAR', value: 'rar' }
]

// Methods
const selectReportType = (reportType: any) => {
  toast.add({
    severity: 'info',
    summary: 'Report Type Selected',
    detail: `Selected ${reportType.title}`,
    life: 3000
  })
}

const generateReport = () => {
  toast.add({
    severity: 'info',
    summary: 'Report Generation',
    detail: 'Report generation started',
    life: 3000
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
    detail: 'Report filters have been applied successfully',
    life: 3000
  })
}

const clearFilters = () => {
  filters.value = {
    dateRange: null,
    organizations: [],
    reportType: null,
    statuses: [],
    gradeLevels: [],
    minAmount: null,
    maxAmount: null
  }
  
  toast.add({
    severity: 'info',
    summary: 'Filters Cleared',
    detail: 'All filters have been cleared',
    life: 3000
  })
}

const exportReports = async () => {
  if (!exportConfig.value.format) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please select an export format',
      life: 3000
    })
    return
  }

  exporting.value = true
  
  // Simulate export process
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  exporting.value = false
  showExportModal.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Export Complete',
    detail: 'Reports have been exported successfully',
    life: 3000
  })
}

const downloadReport = (report: any) => {
  toast.add({
    severity: 'info',
    summary: 'Download',
    detail: `Downloading ${report.title}`,
    life: 3000
  })
}

const viewReport = (report: any) => {
  toast.add({
    severity: 'info',
    summary: 'View Report',
    detail: `Viewing ${report.title}`,
    life: 3000
  })
}

const deleteReport = (report: any) => {
  toast.add({
    severity: 'warn',
    summary: 'Delete Report',
    detail: `Deleting ${report.title}`,
    life: 3000
  })
}

const getReportTypeVariant = (type: string) => {
  switch (type) {
    case 'Student Registry': return 'default'
    case 'Financial Analysis': return 'secondary'
    case 'Statistical Overview': return 'outline'
    default: return 'outline'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed': return 'default'
    case 'Processing': return 'secondary'
    case 'Failed': return 'destructive'
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

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

onMounted(() => {
  loading.value = true
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script> 