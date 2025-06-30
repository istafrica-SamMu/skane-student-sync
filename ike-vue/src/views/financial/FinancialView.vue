<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Financial Management</h1>
        <p class="text-ike-neutral mt-2">
          Manage IKE calculations, price lists, and financial reports
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="showPriceListModal = true">
          <i class="pi pi-list mr-2"></i>
          Manage Price Lists
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showCalculationModal = true">
          <i class="pi pi-calculator mr-2"></i>
          New Calculation
        </Button>
      </div>
    </div>

    <!-- Financial Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="border-l-4 border-l-ike-primary">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Total Revenue
          </CardTitle>
          <i class="pi pi-dollar h-4 w-4 text-ike-primary"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">12.4M SEK</div>
          <div class="flex items-center text-xs text-ike-success mt-1">
            <i class="pi pi-arrow-up w-3 h-3 mr-1"></i>
            +8.2% from last month
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-success">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Active Calculations
          </CardTitle>
          <i class="pi pi-calculator h-4 w-4 text-ike-success"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">24</div>
          <div class="text-xs text-ike-neutral mt-1">
            Ongoing processes
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-warning">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Pending Approvals
          </CardTitle>
          <i class="pi pi-clock h-4 w-4 text-ike-warning"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">7</div>
          <div class="text-xs text-ike-neutral mt-1">
            Require attention
          </div>
        </CardContent>
      </Card>

      <Card class="border-l-4 border-l-ike-error">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-ike-neutral">
            Overdue Payments
          </CardTitle>
          <i class="pi pi-exclamation-triangle h-4 w-4 text-ike-error"></i>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-ike-neutral-dark">3</div>
          <div class="text-xs text-ike-neutral mt-1">
            Need follow-up
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent class="p-6">
          <Chart
            type="line"
            :data="revenueChartData"
            title="Monthly Revenue Trend"
            description="Revenue growth over the last 12 months"
            height="300px"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <Chart
            type="doughnut"
            :data="revenueByTypeData"
            title="Revenue by Type"
            description="Breakdown of revenue sources"
            height="300px"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Recent Calculations Table -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Calculations</CardTitle>
        <CardDescription>
          Latest IKE calculations and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="calculations"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20]"
          :loading="loading"
          stripedRows
        >
          <Column field="id" header="ID" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge variant="outline" class="font-mono">{{ data.id }}</Badge>
            </template>
          </Column>
          
          <Column field="title" header="Calculation" sortable>
            <template #body="{ data }">
              <div>
                <div class="font-medium text-ike-neutral-dark">{{ data.title }}</div>
                <div class="text-xs text-ike-neutral">{{ data.description }}</div>
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
          
          <Column field="amount" header="Amount" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="font-medium text-ike-neutral-dark">
                {{ formatCurrency(data.amount) }}
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
          
          <Column field="createdAt" header="Created" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.createdAt) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 120px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewCalculation(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editCalculation(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-pencil h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="deleteCalculation(data)"
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

    <!-- New Calculation Modal -->
    <Modal
      v-model="showCalculationModal"
      title="New IKE Calculation"
      width="800px"
    >
      <Form @submit="createCalculation">
        <div class="grid grid-cols-2 gap-4">
          <FormField label="Calculation Title" required>
            <InputText
              v-model="newCalculation.title"
              placeholder="Enter calculation title"
              class="w-full"
            />
          </FormField>
          
          <FormField label="Organization" required>
            <Dropdown
              v-model="newCalculation.organization"
              :options="organizationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select organization"
              class="w-full"
            />
          </FormField>
        </div>
        
        <FormField label="Description">
          <Textarea
            v-model="newCalculation.description"
            placeholder="Enter calculation description"
            rows="3"
            class="w-full"
          />
        </FormField>
        
        <div class="grid grid-cols-2 gap-4">
          <FormField label="Calculation Type" required>
            <Dropdown
              v-model="newCalculation.type"
              :options="calculationTypeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select type"
              class="w-full"
            />
          </FormField>
          
          <FormField label="Priority">
            <Dropdown
              v-model="newCalculation.priority"
              :options="priorityOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select priority"
              class="w-full"
            />
          </FormField>
        </div>
      </Form>
      
      <template #footer>
        <Button variant="outline" @click="showCalculationModal = false">Cancel</Button>
        <Button @click="createCalculation" :loading="creatingCalculation">Create Calculation</Button>
      </template>
    </Modal>

    <!-- Price List Modal -->
    <Modal
      v-model="showPriceListModal"
      title="Manage Price Lists"
      width="1000px"
    >
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-ike-neutral-dark">Current Price Lists</h3>
          <Button size="sm" @click="showAddPriceModal = true">
            <i class="pi pi-plus mr-2"></i>
            Add Price Item
          </Button>
        </div>
        
        <DataTable
          :value="priceList"
          :paginator="true"
          :rows="5"
          stripedRows
        >
          <Column field="code" header="Code" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge variant="outline" class="font-mono">{{ data.code }}</Badge>
            </template>
          </Column>
          
          <Column field="description" header="Description" sortable>
            <template #body="{ data }">
              <div>
                <div class="font-medium text-ike-neutral-dark">{{ data.description }}</div>
                <div class="text-xs text-ike-neutral">{{ data.category }}</div>
              </div>
            </template>
          </Column>
          
          <Column field="price" header="Price" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="font-medium text-ike-neutral-dark">
                {{ formatCurrency(data.price) }}
              </div>
            </template>
          </Column>
          
          <Column field="validFrom" header="Valid From" sortable style="width: 120px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.validFrom) }}
              </div>
            </template>
          </Column>
          
          <Column field="status" header="Status" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge :variant="data.status === 'Active' ? 'default' : 'secondary'">
                {{ data.status }}
              </Badge>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 100px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editPriceItem(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-pencil h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="deletePriceItem(data)"
                  class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <i class="pi pi-trash h-4 w-4"></i>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
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
import Chart from '@/components/ui/Chart.vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Column from 'primevue/column'

const toast = useToast()

// State
const loading = ref(false)
const creatingCalculation = ref(false)
const showCalculationModal = ref(false)
const showPriceListModal = ref(false)
const showAddPriceModal = ref(false)

const newCalculation = ref({
  title: '',
  description: '',
  organization: null,
  type: null,
  priority: null
})

// Sample data
const calculations = ref([
  {
    id: 'CALC-2024-001',
    title: 'Q4 2024 IKE Calculation',
    description: 'Fourth quarter calculation for independent schools',
    organization: 'Independent School Alpha',
    amount: 1250000,
    status: 'Completed',
    createdAt: '2024-01-15'
  },
  {
    id: 'CALC-2024-002',
    title: 'Municipality Beta Calculation',
    description: 'Annual calculation for municipality schools',
    organization: 'Municipality Beta',
    amount: 890000,
    status: 'In Progress',
    createdAt: '2024-01-14'
  },
  {
    id: 'CALC-2024-003',
    title: 'Regional Overview Q4',
    description: 'Regional overview calculation',
    organization: 'Regional Office',
    amount: 2100000,
    status: 'Pending Approval',
    createdAt: '2024-01-13'
  }
])

const priceList = ref([
  {
    code: 'IKE-001',
    description: 'Basic IKE Rate',
    category: 'Standard Rate',
    price: 85000,
    validFrom: '2024-01-01',
    status: 'Active'
  },
  {
    code: 'IKE-002',
    description: 'Special Needs Rate',
    category: 'Special Education',
    price: 125000,
    validFrom: '2024-01-01',
    status: 'Active'
  },
  {
    code: 'IKE-003',
    description: 'International Program Rate',
    category: 'Special Programs',
    price: 95000,
    validFrom: '2024-01-01',
    status: 'Active'
  }
])

// Chart data
const revenueChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue (M SEK)',
      data: [8.2, 9.1, 10.3, 11.2, 12.1, 11.8, 10.9, 11.5, 12.3, 12.8, 12.4, 13.1],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }
  ]
})

const revenueByTypeData = ref({
  labels: ['Independent Schools', 'Municipal Schools', 'Special Education', 'International Programs'],
  datasets: [
    {
      data: [45, 30, 15, 10],
      backgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(251, 191, 36)',
        'rgb(239, 68, 68)'
      ]
    }
  ]
})

// Options for dropdowns
const organizationOptions = [
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Municipality Beta', value: 'Municipality Beta' },
  { label: 'Regional Office', value: 'Regional Office' }
]

const calculationTypeOptions = [
  { label: 'Standard IKE', value: 'standard' },
  { label: 'Special Education', value: 'special' },
  { label: 'International Program', value: 'international' },
  { label: 'Regional Overview', value: 'regional' }
]

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' }
]

// Methods
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed': return 'default'
    case 'In Progress': return 'secondary'
    case 'Pending Approval': return 'outline'
    default: return 'outline'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE')
}

const createCalculation = async () => {
  if (!newCalculation.value.title || !newCalculation.value.organization || !newCalculation.value.type) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  creatingCalculation.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const calculation = {
    id: `CALC-2024-${String(calculations.value.length + 1).padStart(3, '0')}`,
    title: newCalculation.value.title,
    description: newCalculation.value.description || '',
    organization: newCalculation.value.organization,
    amount: Math.floor(Math.random() * 2000000) + 500000,
    status: 'In Progress',
    createdAt: new Date().toISOString().split('T')[0]
  }
  
  calculations.value.unshift(calculation)
  
  // Reset form
  newCalculation.value = {
    title: '',
    description: '',
    organization: null,
    type: null,
    priority: null
  }
  
  showCalculationModal.value = false
  creatingCalculation.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Calculation created successfully',
    life: 3000
  })
}

const viewCalculation = (calculation: any) => {
  toast.add({
    severity: 'info',
    summary: 'View',
    detail: `Viewing calculation ${calculation.id}`,
    life: 3000
  })
}

const editCalculation = (calculation: any) => {
  toast.add({
    severity: 'info',
    summary: 'Edit',
    detail: `Editing calculation ${calculation.id}`,
    life: 3000
  })
}

const deleteCalculation = (calculation: any) => {
  toast.add({
    severity: 'warn',
    summary: 'Delete',
    detail: `Deleting calculation ${calculation.id}`,
    life: 3000
  })
}

const editPriceItem = (item: any) => {
  toast.add({
    severity: 'info',
    summary: 'Edit',
    detail: `Editing price item ${item.code}`,
    life: 3000
  })
}

const deletePriceItem = (item: any) => {
  toast.add({
    severity: 'warn',
    summary: 'Delete',
    detail: `Deleting price item ${item.code}`,
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