<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ike-neutral-dark">Student Management</h1>
        <p class="text-ike-neutral mt-2">
          Manage student registrations, placements, and data
        </p>
      </div>
      <div class="flex space-x-3">
        <Button variant="outline" @click="showImportModal = true">
          <i class="pi pi-upload mr-2"></i>
          Import Students
        </Button>
        <Button class="bg-ike-primary hover:bg-ike-primary-dark text-white" @click="showAddModal = true">
          <i class="pi pi-plus mr-2"></i>
          Add Student
        </Button>
      </div>
    </div>

    <!-- Filters and Search -->
    <Card>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Search</label>
            <InputText
              v-model="filters.search"
              placeholder="Search by name, ID, or organization..."
              class="w-full"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Status</label>
            <Dropdown
              v-model="filters.status"
              :options="statusOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="All Statuses"
              class="w-full"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Organization</label>
            <Dropdown
              v-model="filters.organization"
              :options="organizationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="All Organizations"
              class="w-full"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Grade Level</label>
            <Dropdown
              v-model="filters.gradeLevel"
              :options="gradeLevelOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="All Grades"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="flex space-x-2">
            <Button variant="outline" size="sm" @click="clearFilters">
              Clear Filters
            </Button>
            <Button variant="outline" size="sm" @click="exportData">
              <i class="pi pi-download mr-1"></i>
              Export
            </Button>
          </div>
          <div class="text-sm text-ike-neutral">
            {{ filteredStudents.length }} of {{ students.length }} students
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Students Table -->
    <Card>
      <CardHeader>
        <CardTitle>Student Registry</CardTitle>
        <CardDescription>
          Complete list of registered students with their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :value="filteredStudents"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
          :loading="loading"
          stripedRows
          class="p-datatable-sm"
        >
          <Column field="id" header="ID" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge variant="outline" class="font-mono">{{ data.id }}</Badge>
            </template>
          </Column>
          
          <Column field="name" header="Name" sortable>
            <template #body="{ data }">
              <div class="flex items-center space-x-3">
                <Avatar :label="getInitials(data.name)" class="w-8 h-8" />
                <div>
                  <div class="font-medium text-ike-neutral-dark">{{ data.name }}</div>
                  <div class="text-xs text-ike-neutral">{{ data.email }}</div>
                </div>
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
          
          <Column field="gradeLevel" header="Grade" sortable style="width: 100px">
            <template #body="{ data }">
              <Badge :variant="getGradeVariant(data.gradeLevel)">
                {{ data.gradeLevel }}
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
          
          <Column field="lastUpdated" header="Last Updated" sortable style="width: 150px">
            <template #body="{ data }">
              <div class="text-sm text-ike-neutral">
                {{ formatDate(data.lastUpdated) }}
              </div>
            </template>
          </Column>
          
          <Column header="Actions" style="width: 120px">
            <template #body="{ data }">
              <div class="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewStudent(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-eye h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editStudent(data)"
                  class="h-8 w-8 p-0"
                >
                  <i class="pi pi-pencil h-4 w-4"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="deleteStudent(data)"
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

    <!-- Add Student Modal -->
    <Dialog
      v-model:visible="showAddModal"
      modal
      header="Add New Student"
      :style="{ width: '600px' }"
      :closable="true"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">First Name</label>
            <InputText v-model="newStudent.firstName" class="w-full" />
          </div>
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Last Name</label>
            <InputText v-model="newStudent.lastName" class="w-full" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-ike-neutral mb-2 block">Email</label>
          <InputText v-model="newStudent.email" type="email" class="w-full" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Organization</label>
            <Dropdown
              v-model="newStudent.organization"
              :options="organizationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Organization"
              class="w-full"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-ike-neutral mb-2 block">Grade Level</label>
            <Dropdown
              v-model="newStudent.gradeLevel"
              :options="gradeLevelOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Grade"
              class="w-full"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="showAddModal = false">Cancel</Button>
          <Button @click="addStudent" :loading="addingStudent">Add Student</Button>
        </div>
      </template>
    </Dialog>

    <!-- Student Details Modal -->
    <Dialog
      v-model:visible="showDetailsModal"
      modal
      header="Student Details"
      :style="{ width: '700px' }"
      :closable="true"
    >
      <div v-if="selectedStudent" class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-ike-neutral-dark mb-4">Personal Information</h3>
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-ike-neutral">Full Name</label>
                <p class="text-ike-neutral-dark">{{ selectedStudent.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-ike-neutral">Email</label>
                <p class="text-ike-neutral-dark">{{ selectedStudent.email }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-ike-neutral">Organization</label>
                <p class="text-ike-neutral-dark">{{ selectedStudent.organization }}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-ike-neutral-dark mb-4">Academic Information</h3>
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-ike-neutral">Grade Level</label>
                <Badge :variant="getGradeVariant(selectedStudent.gradeLevel)">
                  {{ selectedStudent.gradeLevel }}
                </Badge>
              </div>
              <div>
                <label class="text-sm font-medium text-ike-neutral">Status</label>
                <Badge :variant="getStatusVariant(selectedStudent.status)">
                  {{ selectedStudent.status }}
                </Badge>
              </div>
              <div>
                <label class="text-sm font-medium text-ike-neutral">Registration Date</label>
                <p class="text-ike-neutral-dark">{{ formatDate(selectedStudent.lastUpdated) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="showDetailsModal = false">Close</Button>
          <Button @click="editStudent(selectedStudent)">Edit Student</Button>
        </div>
      </template>
    </Dialog>
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
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Avatar from 'primevue/avatar'

const toast = useToast()

// State
const loading = ref(false)
const addingStudent = ref(false)
const showAddModal = ref(false)
const showDetailsModal = ref(false)
const selectedStudent = ref(null)

const filters = ref({
  search: '',
  status: null,
  organization: null,
  gradeLevel: null
})

const newStudent = ref({
  firstName: '',
  lastName: '',
  email: '',
  organization: null,
  gradeLevel: null
})

// Sample data
const students = ref([
  {
    id: '2024-001',
    name: 'Anna Andersson',
    email: 'anna.andersson@school.se',
    organization: 'Independent School Alpha',
    gradeLevel: 'Grade 10',
    status: 'Active',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2024-002',
    name: 'Erik Eriksson',
    email: 'erik.eriksson@school.se',
    organization: 'Independent School Beta',
    gradeLevel: 'Grade 9',
    status: 'Active',
    lastUpdated: '2024-01-14'
  },
  {
    id: '2024-003',
    name: 'Maria Nilsson',
    email: 'maria.nilsson@school.se',
    organization: 'Independent School Gamma',
    gradeLevel: 'Grade 11',
    status: 'Pending',
    lastUpdated: '2024-01-13'
  }
])

// Options for dropdowns
const statusOptions = [
  { label: 'All Statuses', value: null },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Inactive', value: 'Inactive' }
]

const organizationOptions = [
  { label: 'All Organizations', value: null },
  { label: 'Independent School Alpha', value: 'Independent School Alpha' },
  { label: 'Independent School Beta', value: 'Independent School Beta' },
  { label: 'Independent School Gamma', value: 'Independent School Gamma' }
]

const gradeLevelOptions = [
  { label: 'All Grades', value: null },
  { label: 'Grade 9', value: 'Grade 9' },
  { label: 'Grade 10', value: 'Grade 10' },
  { label: 'Grade 11', value: 'Grade 11' },
  { label: 'Grade 12', value: 'Grade 12' }
]

// Computed
const filteredStudents = computed(() => {
  return students.value.filter(student => {
    const matchesSearch = !filters.value.search || 
      student.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      student.id.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      student.organization.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesStatus = !filters.value.status || student.status === filters.value.status
    const matchesOrganization = !filters.value.organization || student.organization === filters.value.organization
    const matchesGradeLevel = !filters.value.gradeLevel || student.gradeLevel === filters.value.gradeLevel
    
    return matchesSearch && matchesStatus && matchesOrganization && matchesGradeLevel
  })
})

// Methods
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Active': return 'default'
    case 'Pending': return 'secondary'
    case 'Inactive': return 'destructive'
    default: return 'outline'
  }
}

const getGradeVariant = (grade: string) => {
  const gradeNum = parseInt(grade.split(' ')[1])
  if (gradeNum >= 11) return 'default'
  if (gradeNum >= 9) return 'secondary'
  return 'outline'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE')
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: null,
    organization: null,
    gradeLevel: null
  }
}

const exportData = () => {
  toast.add({
    severity: 'info',
    summary: 'Export',
    detail: 'Export functionality will be implemented',
    life: 3000
  })
}

const viewStudent = (student: any) => {
  selectedStudent.value = student
  showDetailsModal.value = true
}

const editStudent = (student: any) => {
  // TODO: Implement edit functionality
  toast.add({
    severity: 'info',
    summary: 'Edit',
    detail: 'Edit functionality will be implemented',
    life: 3000
  })
}

const deleteStudent = (student: any) => {
  // TODO: Implement delete functionality
  toast.add({
    severity: 'warn',
    summary: 'Delete',
    detail: 'Delete functionality will be implemented',
    life: 3000
  })
}

const addStudent = async () => {
  if (!newStudent.value.firstName || !newStudent.value.lastName || !newStudent.value.email) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  addingStudent.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const student = {
    id: `2024-${String(students.value.length + 1).padStart(3, '0')}`,
    name: `${newStudent.value.firstName} ${newStudent.value.lastName}`,
    email: newStudent.value.email,
    organization: newStudent.value.organization || 'Unknown Organization',
    gradeLevel: newStudent.value.gradeLevel || 'Grade 9',
    status: 'Active',
    lastUpdated: new Date().toISOString().split('T')[0]
  }
  
  students.value.unshift(student)
  
  // Reset form
  newStudent.value = {
    firstName: '',
    lastName: '',
    email: '',
    organization: null,
    gradeLevel: null
  }
  
  showAddModal.value = false
  addingStudent.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Student added successfully',
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