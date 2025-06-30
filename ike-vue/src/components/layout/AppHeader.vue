<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLanguageStore } from '@/stores/language'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import OverlayPanel from 'primevue/overlaypanel'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import ScrollPanel from 'primevue/scrollpanel'

const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()

const searchQuery = ref('')
const notificationsPanel = ref()
const userMenu = ref()

const notifications = ref([
  {
    id: 1,
    title: "System Maintenance",
    message: "Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM",
    timestamp: "10 minutes ago",
    isRead: false,
    type: "system"
  },
  {
    id: 2,
    title: "New Message",
    message: "You have received a new message from Regional Office",
    timestamp: "1 hour ago",
    isRead: false,
    type: "message"
  },
  {
    id: 3,
    title: "Data Validation Required",
    message: "Student data validation deadline is approaching",
    timestamp: "2 hours ago",
    isRead: true,
    type: "warning"
  }
])

const currentLanguage = computed(() => languageStore.currentLanguage)
const unreadCount = computed(() => notifications.value.filter(n => !n.isRead).length)

const toggleLanguage = () => {
  languageStore.setLanguage(currentLanguage.value === 'en' ? 'sv' : 'en')
}

const toggleNotifications = (event: Event) => {
  notificationsPanel.value.toggle(event)
}

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event)
}

const getUserRoleDisplay = () => {
  const roles: { [key: string]: string } = {
    'regional-admin': 'Regional Admin',
    'municipality-admin': 'Municipality Admin',
    'school-admin': 'School Admin',
    'orgadmin': 'Organization Admin',
    'devadmin': 'Development Admin',
  }
  return roles[authStore.userRole || ''] || 'User'
}

const userMenuOptions = ref([
  {
    label: 'My Profile',
    icon: 'pi pi-user',
    command: () => router.push('/my-page'),
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    command: () => router.push('/settings'),
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.logout()
      router.push('/login')
    },
  },
])

const markAsRead = (notificationId: number) => {
  notifications.value = notifications.value.map(notif => 
    notif.id === notificationId ? { ...notif, isRead: true } : notif
  )
}

const markAllAsRead = () => {
  notifications.value = notifications.value.map(notif => ({ ...notif, isRead: true }))
}

const deleteNotification = (notificationId: number) => {
  notifications.value = notifications.value.filter(notif => notif.id !== notificationId)
}
</script>

<template>
  <header class="sticky top-0 z-30 w-full border-b bg-white">
    <div class="flex h-16 items-center px-6">
      <!-- Breadcrumb -->
      <div class="flex-1">
        <div class="flex items-center space-x-3 text-gray-700">
          <i class="pi pi-th-large text-lg"></i>
          <span class="font-semibold text-lg">Dashboard</span>
        </div>
      </div>

      <!-- Search -->
      <div class="flex-1 flex justify-center">
        <div class="relative w-full max-w-md">
          <i class="pi pi-search absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"></i>
          <InputText
            v-model="searchQuery"
            placeholder="Search students, schools, reports..."
            class="pl-10 w-full !bg-gray-100 border-transparent focus:!bg-white focus:!border-ike-primary rounded-lg"
          />
        </div>
      </div>
      
      <!-- Right Side Controls -->
      <div class="flex-1 flex items-center justify-end space-x-5">
        <!-- Language Toggle -->
        <Button
          text
          plain
          @click="toggleLanguage"
          class="!text-gray-700 hover:!bg-gray-100"
        >
          <div class="flex items-center space-x-2">
            <span class="font-semibold">{{ currentLanguage.toUpperCase() }}</span>
            <i class="pi pi-chevron-down text-xs"></i>
          </div>
        </Button>

        <!-- Notifications -->
        <Button 
          text 
          plain 
          class="!text-gray-700 hover:!bg-gray-100 relative"
          @click="toggleNotifications"
        >
          <i class="pi pi-bell h-5 w-5"></i>
          <Badge v-if="unreadCount > 0" severity="danger" class="absolute top-1 right-0.5"></Badge>
        </Button>
        
        <!-- User Menu -->
        <Menu ref="userMenu" :model="userMenuOptions" :popup="true" />
        <button @click="toggleUserMenu" class="flex items-center space-x-3">
          <Avatar 
            icon="pi pi-user" 
            size="large" 
            shape="circle" 
            class="!bg-ike-primary !text-white" 
          />
          <div class="text-left">
            <div class="font-semibold text-gray-800">{{ authStore.currentUser?.name || 'User' }}</div>
            <div class="text-xs text-gray-500">{{ getUserRoleDisplay() }}</div>
          </div>
        </button>
      </div>
    </div>
  </header>

  <!-- Notifications Panel -->
  <OverlayPanel ref="notificationsPanel" class="w-80 p-0 mt-2">
    <div class="border-b p-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-800">Notifications</h3>
        <Button 
          v-if="unreadCount > 0"
          text
          size="sm" 
          @click="markAllAsRead"
          class="!text-xs !text-ike-primary hover:!text-ike-primary-dark"
        >
          Mark all as read
        </Button>
      </div>
    </div>
    <ScrollPanel class="h-80">
      <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
        No notifications
      </div>
      <div v-else>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors', { 'bg-ike-primary/5': !notification.isRead }]"
        >
          <div class="flex items-start justify-between space-x-2">
            <div class="flex-1 space-y-1">
              <div class="flex items-center space-x-2">
                 <h4 :class="['text-sm font-medium', { 'text-gray-800': !notification.isRead, 'text-gray-600': notification.isRead }]">
                  {{ notification.title }}
                </h4>
                <div v-if="!notification.isRead" class="w-2 h-2 bg-ike-primary rounded-full"></div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-400">
                {{ notification.timestamp }}
              </p>
            </div>
            <div class="flex space-x-1">
              <Button
                v-if="!notification.isRead"
                text
                size="sm"
                @click="markAsRead(notification.id)"
                class="!h-7 !w-7 !p-0 hover:!bg-ike-primary/10"
              >
                <i class="pi pi-check h-4 w-4 text-green-500"></i>
              </Button>
              <Button
                text
                size="sm"
                @click="deleteNotification(notification.id)"
                class="!h-7 !w-7 !p-0 hover:!bg-red-50 hover:!text-red-600"
              >
                <i class="pi pi-trash h-4 w-4"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollPanel>
    <div v-if="notifications.length > 0" class="border-t p-2">
      <Button 
        text 
        size="sm" 
        class="!w-full !text-ike-primary hover:!text-ike-primary-dark hover:!bg-ike-primary/5"
      >
        View all notifications
      </Button>
    </div>
  </OverlayPanel>
</template> 