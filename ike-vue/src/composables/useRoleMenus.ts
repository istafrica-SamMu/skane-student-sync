import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { 
  regionalAdminMenu, 
  municipalityAdminMenu, 
  schoolAdminMenu, 
  orgAdminMenu, 
  devAdminMenu 
} from '@/config/roleMenus'
import type { MenuItem } from '@/types'

export function useRoleMenus() {
  const authStore = useAuthStore()

  const getMenuItems = (userRole?: string) => {
    const role = userRole || authStore.user?.role || 'regional-admin'
    
    switch (role) {
      case 'regional-admin':
        return regionalAdminMenu
      case 'municipality-admin':
        return municipalityAdminMenu
      case 'school-admin':
        return schoolAdminMenu
      case 'orgadmin':
        return orgAdminMenu
      case 'devadmin':
        return devAdminMenu
      default:
        return []
    }
  }

  const hasPermission = (requiredRole: string): boolean => {
    const userRole = authStore.user?.role || 'regional-admin'
    
    // Define role hierarchy (higher index = more permissions)
    const roleHierarchy = ['devadmin', 'regional-admin', 'municipality-admin', 'school-admin', 'orgadmin']
    
    const userRoleIndex = roleHierarchy.indexOf(userRole)
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole)
    
    // User has permission if their role is higher or equal in hierarchy
    return userRoleIndex <= requiredRoleIndex
  }

  return {
    getMenuItems,
    hasPermission
  }
} 