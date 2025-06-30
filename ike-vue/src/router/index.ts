import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRoleMenus } from '@/composables/useRoleMenus'
import type { UserRole } from '@/types'

// Import views (we'll create these next)
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import StudentsView from '@/views/students/StudentsView.vue'
import StudentPlacementsView from '@/views/students/StudentPlacementsView.vue'
import StudentConflictsView from '@/views/students/StudentConflictsView.vue'
import StudentBulkView from '@/views/students/StudentBulkView.vue'
import TFRegistrationView from '@/views/students/TFRegistrationView.vue'
import TravelCardDocumentsView from '@/views/students/TravelCardDocumentsView.vue'
import FinancialView from '@/views/financial/FinancialView.vue'
import ReportsView from '@/views/reports/ReportsView.vue'
import IntegrationView from '@/views/integration/IntegrationView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import UserManagementView from '@/views/system/UserManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { 
        requiresAuth: true,
        roles: ['regional-admin', 'municipality-admin', 'school-admin', 'orgadmin', 'devadmin']
      }
    },
    {
      path: '/students',
      name: 'students',
      component: StudentsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/students/placements',
      name: 'student-placements',
      component: StudentPlacementsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/students/conflicts',
      name: 'student-conflicts',
      component: StudentConflictsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/students/bulk',
      name: 'student-bulk',
      component: StudentBulkView,
      meta: { requiresAuth: true }
    },
    {
      path: '/students/tf-registration',
      name: 'tf-registration',
      component: TFRegistrationView,
      meta: { requiresAuth: true }
    },
    {
      path: '/students/travel-cards',
      name: 'travel-cards',
      component: TravelCardDocumentsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/financial',
      name: 'financial',
      component: FinancialView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/integration',
      name: 'integration',
      component: IntegrationView,
      meta: { requiresAuth: true }
    },
    {
      path: '/system/users',
      name: 'user-management',
      component: UserManagementView,
      meta: { 
        requiresAuth: true, 
        roles: ['regional-admin', 'devadmin'] 
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { requiresAuth: false }
    }
  ]
})

// Navigation guard for authentication and role-based access
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { hasPermission } = useRoleMenus()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check if user is already logged in and trying to access login page
  if (to.name === 'login' && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }
  
  // Check role-based access
  if (to.meta.roles && authStore.userRole) {
    const allowedRoles = to.meta.roles as UserRole[]
    if (!allowedRoles.includes(authStore.userRole)) {
      next('/dashboard') // Redirect to dashboard if role not allowed
      return
    }
  }
  
  // Check role-based permissions
  if (to.meta.requiresRole && !hasPermission(to.meta.requiresRole as string)) {
    next('/')
    return
  }
  
  next()
})

export default router
