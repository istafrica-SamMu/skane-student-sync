import type { MenuItem } from '@/types'

export const regionalAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: "pi pi-home",
  },
  {
    title: "System Management",
    icon: "pi pi-cog",
    children: [
      {
        title: "User Management",
        route: "/system/users",
        icon: "pi pi-users",
      },
      {
        title: "Role Management",
        route: "/system/roles",
        icon: "pi pi-shield",
      },
      {
        title: "Municipality Management",
        route: "/system/municipalities",
        icon: "pi pi-building",
      },
      {
        title: "Group Management",
        route: "/system/groups",
        icon: "pi pi-th-large",
      },
      {
        title: "Principal Management",
        route: "/system/principals",
        icon: "pi pi-user-tie",
      },
      {
        title: "School Units",
        route: "/system/school-units",
        icon: "pi pi-sitemap",
      },
      {
        title: "School Years",
        route: "/system/school-years",
        icon: "pi pi-calendar",
      },
    ],
  },
  {
    title: "Study Path Management",
    icon: "pi pi-book",
    route: "/study-paths",
    children: [
      {
        title: "National Programs",
        route: "/study-paths/national-programs",
        icon: "pi pi-flag"
      },
      {
        title: "Price Codes",
        route: "/study-paths/price-codes",
        icon: "pi pi-dollar",
      },
    ],
  },
  {
    title: "Integration Management",
    icon: "pi pi-sync",
    route: "/integration",
    children: [
      {
        title: "Tax Agency Hub",
        route: "/integration/tax-agency-hub",
        icon: "pi pi-database",
      },
      {
        title: "UHR BEDA Integration",
        route: "/integration/uhr-beda",
        icon: "pi pi-cloud-upload",
      },
      {
        title: "Admission Integration",
        route: "/integration/admission",
        icon: "pi pi-user-plus",
      },
    ],
  },
  {
    title: "Calculation Engine",
    route: "/calculation-engine",
    icon: "pi pi-calculator",
  },
  {
    title: "Reports & Analytics",
    icon: "pi pi-chart-line",
    route: "/reports",
    children: [
       {
        title: "Student Lists",
        route: "/reports/student-lists",
        icon: "pi pi-list",
      },
    ],
  },
  {
    title: "My Page",
    icon: "pi pi-user",
    route: "/my-page",
    children: [
      {
        title: "Messages",
        route: "/my-page/messages",
        icon: "pi pi-envelope",
      },
       {
        title: "Settings",
        route: "/my-page/settings",
        icon: "pi pi-cog",
      },
    ],
  },
  {
    title: "Support",
    route: "/support",
    icon: "pi pi-question-circle",
  },
]

export const municipalityAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: "pi pi-home",
  },
  {
    title: "Student Management",
    icon: "pi pi-users",
    children: [
      {
        title: "Students Overview",
        route: "/students",
        icon: "pi pi-users",
      },
      {
        title: "TF Number Registration",
        route: "/students/tf-registration",
        icon: "pi pi-id-card",
      },
      {
        title: "Conflict Resolution",
        route: "/students/conflict-resolution",
        icon: "pi pi-exclamation-triangle",
      },
      {
        title: "Municipal School Students",
        route: "/students/municipal",
        icon: "pi pi-graduation-cap",
      },
      {
        title: "External School Students",
        route: "/students/external",
        icon: "pi pi-arrow-right-arrow-left",
      },
      {
        title: "Travel Card Documents",
        route: "/students/travel-cards",
        icon: "pi pi-credit-card",
      },
    ],
  },
  {
    title: "KAA Management",
    icon: "pi pi-clipboard",
    children: [
      {
        title: "KAA Dashboard",
        route: "/kaa/dashboard",
        icon: "pi pi-chart-bar",
      },
      {
        title: "KAA Registry",
        route: "/kaa/registry",
        icon: "pi pi-users",
      },
      {
        title: "Measures & Actions",
        route: "/kaa/measures",
        icon: "pi pi-clock",
      },
      {
        title: "Contact Occasions",
        route: "/kaa/contacts",
        icon: "pi pi-comment",
      },
      {
        title: "Statistics Sweden Reports",
        route: "/kaa/scb-reports",
        icon: "pi pi-file",
      },
    ],
  },
  {
    title: "Integration Management",
    icon: "pi pi-link",
    children: [
      {
        title: "Import Student Data",
        route: "/integration/import",
        icon: "pi pi-database",
      },
      {
        title: "Tax Agency Hub",
        route: "/integration/tax-agency-hub",
        icon: "pi pi-database",
      },
      {
        title: "UHR BEDA Integration",
        route: "/integration/uhr-beda",
        icon: "pi pi-graduation-cap",
      },
      {
        title: "Admission Integration",
        route: "/integration/admission",
        icon: "pi pi-user-plus",
      },
    ],
  },
  {
    title: "Financial Management",
    icon: "pi pi-calculator",
    children: [
      {
        title: "Accounting Configuration",
        route: "/financial/accounting-configuration",
        icon: "pi pi-cog",
      },
      {
        title: "Municipal Price Lists",
        route: "/financial/pricelists",
        icon: "pi pi-dollar",
      },
      {
        title: "Additional Amounts",
        route: "/financial/additional-amounts",
        icon: "pi pi-plus-circle",
      },
      {
        title: "Payment Blocks",
        route: "/financial/payment-blocks",
        icon: "pi pi-stop-circle",
      },
    ],
  },
  {
    title: "Municipal Operations",
    icon: "pi pi-building",
    children: [
      {
        title: "Municipal School Units",
        route: "/operations/municipal-schools",
        icon: "pi pi-graduation-cap",
      },
      {
        title: "Municipal User Administration",
        route: "/operations/municipal-users",
        icon: "pi pi-users",
      },
    ],
  },
  {
    title: "Reports",
    icon: "pi pi-file",
    children: [
      {
        title: "Money to Receive",
        route: "/reports/money-to-receive",
        icon: "pi pi-chart-line",
      },
      {
        title: "Money to Pay",
        route: "/reports/money-to-pay",
        icon: "pi pi-dollar",
      },
      {
        title: "Municipal Statistics",
        route: "/reports/municipal-statistics",
        icon: "pi pi-chart-bar",
      },
      {
        title: "Financial System Export",
        route: "/reports/financial-export",
        icon: "pi pi-file-excel",
      },
      {
        title: "Geographical Analysis",
        route: "/analysis/geographical",
        icon: "pi pi-map-marker",
      },
    ],
  },
  {
    title: "My Page",
    icon: "pi pi-user",
    children: [
      {
        title: "Messages",
        route: "/my-page/messages",
        icon: "pi pi-comment",
      },
      {
        title: "Enrollment Settings",
        route: "/my-page/enrollment",
        icon: "pi pi-cog",
      },
      {
        title: "Activity Logs",
        route: "/my-page/logs",
        icon: "pi pi-clock",
      },
      {
        title: "Settings",
        route: "/my-page/settings",
        icon: "pi pi-cog",
      },
    ],
  },
  {
    title: "Support",
    route: "/system/support",
    icon: "pi pi-question-circle",
  },
]

export const schoolAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: "pi pi-home",
  },
  {
    title: "Student Management",
    icon: "pi pi-users",
    children: [
      {
        title: "Student Roster & Classes",
        route: "/students",
        icon: "pi pi-users",
      },
      {
        title: "TF Number Registration",
        route: "/students/tf-registration",
        icon: "pi pi-id-card",
      },
      {
        title: "Conflict Resolution",
        route: "/students/conflict-resolution",
        icon: "pi pi-exclamation-triangle",
      },
      {
        title: "Travel Card Documents",
        route: "/students/travel-cards",
        icon: "pi pi-credit-card",
      },
    ],
  },
  {
    title: "KAA Management",
    icon: "pi pi-clipboard",
    children: [
      {
        title: "KAA Dashboard",
        route: "/kaa/dashboard",
        icon: "pi pi-chart-bar",
      },
      {
        title: "KAA Registry",
        route: "/kaa/registry",
        icon: "pi pi-users",
      },
      {
        title: "Contact Occasions",
        route: "/kaa/contacts",
        icon: "pi pi-comment",
      },
    ],
  },
  {
    title: "School Operations",
    icon: "pi pi-graduation-cap",
    children: [
      {
        title: "School Unit Information",
        route: "/my-school/info",
        icon: "pi pi-info-circle",
      },
    ],
  },
  {
    title: "Reports",
    icon: "pi pi-file",
    children: [
      {
        title: "Student Lists",
        route: "/reports/students",
        icon: "pi pi-users",
      },
      {
        title: "Financial Reports",
        route: "/reports/financial",
        icon: "pi pi-dollar",
      },
    ],
  },
  {
    title: "My Page",
    icon: "pi pi-user",
    children: [
      {
        title: "Messages",
        route: "/my-page/messages",
        icon: "pi pi-comment",
      },
      {
        title: "Activity Logs",
        route: "/my-page/logs",
        icon: "pi pi-clock",
      },
      {
        title: "Settings",
        route: "/my-page/settings",
        icon: "pi pi-cog",
      },
    ],
  },
  {
    title: "Support",
    route: "/system/support",
    icon: "pi pi-question-circle",
  },
]

export const orgAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: "pi pi-home",
  },
  {
    title: "Organization Management",
    icon: "pi pi-building",
    children: [
      {
        title: "Customer Accounts",
        route: "/org/customers",
        icon: "pi pi-users",
      },
      {
        title: "Group Management",
        route: "/system/groups",
        icon: "pi pi-building",
      },
      {
        title: "Account Hierarchy",
        route: "/org/hierarchy",
        icon: "pi pi-sitemap",
      },
      {
        title: "Billing & Subscriptions",
        route: "/org/billing",
        icon: "pi pi-dollar",
      },
      {
        title: "Organization Settings",
        route: "/org/settings",
        icon: "pi pi-cog",
      },
    ],
  },
  {
    title: "User Administration",
    icon: "pi pi-shield",
    children: [
      {
        title: "Global User Management",
        route: "/org/users",
        icon: "pi pi-users",
      },
      {
        title: "Role & Permissions",
        route: "/org/permissions",
        icon: "pi pi-key",
      },
      {
        title: "Access Control",
        route: "/org/access",
        icon: "pi pi-shield",
      },
    ],
  },
  {
    title: "System Oversight",
    icon: "pi pi-desktop",
    children: [
      {
        title: "System Health",
        route: "/org/health",
        icon: "pi pi-clock",
      },
      {
        title: "Usage Analytics",
        route: "/org/analytics",
        icon: "pi pi-chart-bar",
      },
      {
        title: "Audit Logs",
        route: "/org/audit",
        icon: "pi pi-file",
      },
    ],
  },
  {
    title: "Support & Communication",
    icon: "pi pi-comment",
    children: [
      {
        title: "Customer Support",
        route: "/org/support",
        icon: "pi pi-comment",
      },
      {
        title: "Announcements",
        route: "/org/announcements",
        icon: "pi pi-bell",
      },
      {
        title: "Knowledge Base",
        route: "/org/knowledge",
        icon: "pi pi-book",
      },
    ],
  },
  {
    title: "Support",
    route: "/system/support",
    icon: "pi pi-question-circle",
  },
]

export const devAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: "pi pi-home",
  },
  {
    title: "Integration Management",
    icon: "pi pi-link",
    children: [
      {
        title: "API Configurations",
        route: "/dev/integrations",
        icon: "pi pi-code",
      },
      {
        title: "Customer Integrations",
        route: "/dev/customer-integrations",
        icon: "pi pi-link",
      },
      {
        title: "Integration Testing",
        route: "/dev/testing",
        icon: "pi pi-clock",
      },
      {
        title: "API Documentation",
        route: "/dev/api-docs",
        icon: "pi pi-file",
      },
    ],
  },
  {
    title: "Localization & Translations",
    icon: "pi pi-globe",
    children: [
      {
        title: "Translation Management",
        route: "/dev/translations",
        icon: "pi pi-globe",
      },
      {
        title: "Language Settings",
        route: "/dev/languages",
        icon: "pi pi-globe",
      },
      {
        title: "Translation Tools",
        route: "/dev/translation-tools",
        icon: "pi pi-cog",
      },
    ],
  },
  {
    title: "Development Tools",
    icon: "pi pi-terminal",
    children: [
      {
        title: "Environment Management",
        route: "/dev/environments",
        icon: "pi pi-server",
      },
      {
        title: "Database Management",
        route: "/dev/database",
        icon: "pi pi-database",
      },
      {
        title: "System Configuration",
        route: "/dev/config",
        icon: "pi pi-cog",
      },
      {
        title: "Feature Flags",
        route: "/dev/features",
        icon: "pi pi-sitemap",
      },
    ],
  },
  {
    title: "Monitoring & Debugging",
    icon: "pi pi-desktop",
    children: [
      {
        title: "System Logs",
        route: "/dev/logs",
        icon: "pi pi-file",
      },
      {
        title: "Performance Monitoring",
        route: "/dev/performance",
        icon: "pi pi-chart-bar",
      },
      {
        title: "Error Tracking",
        route: "/dev/errors",
        icon: "pi pi-exclamation-triangle",
      },
      {
        title: "Debug Tools",
        route: "/dev/debug",
        icon: "pi pi-terminal",
      },
    ],
  },
  {
    title: "Development Resources",
    icon: "pi pi-code",
    children: [
      {
        title: "Code Repository",
        route: "/dev/repository",
        icon: "pi pi-sitemap",
      },
      {
        title: "Development Docs",
        route: "/dev/docs",
        icon: "pi pi-book",
      },
      {
        title: "Testing Suite",
        route: "/dev/test-suite",
        icon: "pi pi-clock",
      },
    ],
  },
  {
    title: "Support",
    route: "/system/support",
    icon: "pi pi-question-circle",
  },
] 