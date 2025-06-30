// User and Authentication Types
export type UserRole = 'regional-admin' | 'municipality-admin' | 'school-admin' | 'orgadmin' | 'devadmin' | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  organization?: string
}

// Navigation Types
export interface MenuItem {
  title: string
  route?: string
  icon: string
  children?: MenuItem[]
}

// Student Types
export interface Student {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  personalNumber: string
  homeMunicipality: string
  studyPath: string
  schoolYear: string
  schoolUnit: string
  status: 'active' | 'inactive' | 'pending'
}

// Financial Types
export interface PriceList {
  id: string
  name: string
  municipality: string
  year: string
  items: PriceListItem[]
}

export interface PriceListItem {
  id: string
  category: string
  amount: number
  currency: string
}

// Report Types
export interface Report {
  id: string
  name: string
  type: string
  generatedAt: string
  status: 'pending' | 'completed' | 'failed'
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'number' | 'date'
  required?: boolean
  options?: { label: string; value: any }[]
  validation?: any
}

// Toast/Notification Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

// Pagination Types
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Filter Types
export interface Filter {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'in' | 'not_in'
  value: any
}

export interface Sort {
  field: string
  direction: 'asc' | 'desc'
} 