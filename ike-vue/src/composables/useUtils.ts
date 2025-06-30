import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types'

export function useUtils() {
  const authStore = useAuthStore()

  const getRoleTitle = computed(() => {
    switch (authStore.userRole) {
      case 'regional-admin':
        return 'Regional Administrator'
      case 'municipality-admin':
        return 'Municipality Administrator'
      case 'school-admin':
        return 'School Administrator'
      case 'orgadmin':
        return 'Organization Administrator'
      case 'devadmin':
        return 'Development Administrator'
      default:
        return 'IKE 2.0'
    }
  })

  const formatDate = (date: string | Date): string => {
    const d = new Date(date)
    return d.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string = 'SEK'): string => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatPersonalNumber = (personalNumber: string): string => {
    // Format Swedish personal number (YYYYMMDD-XXXX)
    if (personalNumber.length === 10) {
      return `${personalNumber.slice(0, 6)}-${personalNumber.slice(6)}`
    }
    return personalNumber
  }

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'success':
        return 'ike-success'
      case 'pending':
      case 'warning':
        return 'ike-warning'
      case 'inactive':
      case 'error':
        return 'ike-error'
      default:
        return 'ike-neutral'
    }
  }

  const getStatusBadgeVariant = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'success':
        return 'success'
      case 'pending':
      case 'warning':
        return 'warning'
      case 'inactive':
      case 'error':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9)
  }

  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: number
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = window.setTimeout(() => func(...args), wait)
    }
  }

  return {
    getRoleTitle,
    formatDate,
    formatCurrency,
    formatPersonalNumber,
    getStatusColor,
    getStatusBadgeVariant,
    truncateText,
    generateId,
    debounce
  }
} 