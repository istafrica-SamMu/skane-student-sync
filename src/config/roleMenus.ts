import {
  Home,
  Users,
  Calculator,
  FileText,
  BarChart3,
  Settings,
  Database,
  ArrowUpDown,
  AlertTriangle,
  Package,
  Euro,
  TrendingUp,
  UserCheck,
  Link,
  User,
  Shield,
  Building,
  GraduationCap,
  MessageSquare,
  Activity,
  FileSpreadsheet,
  Calendar,
  School,
  UserPlus,
  DollarSign,
  MapPin,
  Book,
  Briefcase,
  Clock,
  Bell,
  Mail,
  Info,
  Globe,
  Code,
  Key,
  Languages,
  Workflow,
  GitBranch,
  Server,
  Monitor,
  HardDrive,
  Terminal,
  Building2,
  ClipboardList,
  CreditCard,
  HelpCircle,
  Ban,
  IdCard
} from "lucide-react";

export interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  items?: MenuItem[];
}

export const regionalAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "System Management",
    icon: Settings,
    items: [
      {
        title: "User Management",
        url: "/system/users",
        icon: Users,
      },
      {
        title: "Role Management",
        url: "/system/roles",
        icon: Shield,
      },
      {
        title: "Municipality Management",
        url: "/system/municipalities",
        icon: Building,
      },
      {
        title: "Group Management",
        url: "/system/groups",
        icon: Building2,
      },
      {
        title: "Principal Management",
        url: "/system/principals",
        icon: UserCheck,
      },
      {
        title: "School Units",
        url: "/system/schools",
        icon: School,
      },
      {
        title: "School Years",
        url: "/system/school-years",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Study Path Management",
    icon: Book,
    items: [
      {
        title: "Study Paths",
        url: "/study-paths",
        icon: Book,
      },
      {
        title: "Price Codes",
        url: "/study-paths/price-codes",
        icon: Euro,
      },
    ],
  },
  {
    title: "Integration Management",
    icon: Workflow,
    items: [
      {
        title: "Tax Agency Hub",
        url: "/integration/tax-agency-hub",
        icon: Database,
      },
      {
        title: "UHR BEDA Integration",
        url: "/integration/uhr-beda",
        icon: GraduationCap,
      },
      {
        title: "Admission Integration",
        url: "/integration/admission",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Calculation Engine",
    url: "/integration",
    icon: Calculator,
  },
  {
    title: "Reports & Analytics",
    icon: FileText,
    items: [
      {
        title: "Statistics",
        url: "/statistics",
        icon: BarChart3,
      },
      {
        title: "Regional Statistics",
        url: "/reports/regional",
        icon: BarChart3,
      },
      {
        title: "Monthly Compilation",
        url: "/reports/monthly",
        icon: Calendar,
      },
      {
        title: "Financial Analysis",
        url: "/reports/financial",
        icon: DollarSign,
      },
      {
        title: "Change Tracking",
        url: "/reports/changes",
        icon: Activity,
      },
      {
        title: "Geographical Analysis",
        url: "/analysis/geographical",
        icon: MapPin,
      },
    ],
  },
  {
    title: "My Page",
    icon: User,
    items: [
      {
        title: "Messages",
        url: "/my-page/messages",
        icon: MessageSquare,
      },
      {
        title: "Enrollment Settings",
        url: "/my-page/enrollment",
        icon: Settings,
      },
      {
        title: "System Logs",
        url: "/my-page/logs",
        icon: Activity,
      },
      {
        title: "Settings",
        url: "/my-page/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Support",
    url: "/system/support",
    icon: HelpCircle,
  },
];

export const municipalityAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Student Management",
    icon: Users,
    items: [
      {
        title: "Students Overview",
        url: "/students",
        icon: Users,
      },
      {
        title: "TF Number Registration",
        url: "/students/tf-registration",
        icon: IdCard,
      },
      {
        title: "Municipal School Students",
        url: "/students/municipal",
        icon: School,
      },
      {
        title: "External School Students",
        url: "/students/external",
        icon: ArrowUpDown,
      },
      {
        title: "Travel Card Documents",
        url: "/students/travel-cards",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "KAA Management",
    icon: ClipboardList,
    items: [
      {
        title: "KAA Dashboard",
        url: "/kaa/dashboard",
        icon: BarChart3,
      },
      {
        title: "KAA Registry",
        url: "/kaa/registry",
        icon: Users,
      },
      {
        title: "Measures & Actions",
        url: "/kaa/measures",
        icon: Activity,
      },
      {
        title: "Contact Occasions",
        url: "/kaa/contacts",
        icon: MessageSquare,
      },
      {
        title: "Statistics Sweden Reports",
        url: "/kaa/scb-reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "Integration Management",
    icon: Workflow,
    items: [
      {
        title: "Import Student Data",
        url: "/integration/import",
        icon: Database,
      },
      {
        title: "Tax Agency Hub",
        url: "/integration/tax-agency-hub",
        icon: Database,
      },
      {
        title: "UHR BEDA Integration",
        url: "/integration/uhr-beda",
        icon: GraduationCap,
      },
      {
        title: "Admission Integration",
        url: "/integration/admission",
        icon: UserPlus,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Financial Management",
    icon: Calculator,
    items: [
      {
        title: "Accounting Configuration",
        url: "/financial/accounting-configuration",
        icon: Settings,
      },
      {
        title: "Municipal Price Lists",
        url: "/financial/pricelists",
        icon: Euro,
      },
      {
        title: "Additional Amounts",
        url: "/financial/additional-amounts",
        icon: DollarSign,
      },
      {
        title: "Payment Blocks",
        url: "/financial/payment-blocks",
        icon: Ban,
      },
      {
        title: "Municipal Financial Reports",
        url: "/financial/reports",
        icon: FileText,
      },
      {
        title: "Inter-Municipal Compensation",
        url: "/financial/compensation",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Municipal Operations",
    icon: Building,
    items: [
      {
        title: "Municipal School Units",
        url: "/operations/municipal-schools",
        icon: School,
      },
      {
        title: "Municipal User Administration",
        url: "/operations/municipal-users",
        icon: Users,
      },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      {
        title: "Statistics",
        url: "/statistics",
        icon: BarChart3,
      },
      {
        title: "Money to Receive",
        url: "/reports/money-to-receive",
        icon: TrendingUp,
      },
      {
        title: "Money to Pay",
        url: "/reports/money-to-pay",
        icon: DollarSign,
      },
      {
        title: "Municipal Statistics",
        url: "/reports/municipal-statistics",
        icon: BarChart3,
      },
      {
        title: "Financial System Export",
        url: "/reports/financial-export",
        icon: FileSpreadsheet,
      },
      {
        title: "Geographical Analysis",
        url: "/analysis/geographical",
        icon: MapPin,
      },
    ],
  },
  {
    title: "My Page",
    icon: User,
    items: [
      {
        title: "Messages",
        url: "/my-page/messages",
        icon: MessageSquare,
      },
      {
        title: "Enrollment Settings",
        url: "/my-page/enrollment",
        icon: Settings,
      },
      {
        title: "Activity Logs",
        url: "/my-page/logs",
        icon: Activity,
      },
      {
        title: "Settings",
        url: "/my-page/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Support",
    url: "/system/support",
    icon: HelpCircle,
  },
];

export const schoolAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Student Management",
    icon: Users,
    items: [
      {
        title: "Student Roster & Classes",
        url: "/students",
        icon: Users,
      },
      {
        title: "TF Number Registration",
        url: "/students/tf-registration",
        icon: IdCard,
      },
      {
        title: "Travel Card Documents",
        url: "/students/travel-cards",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "KAA Management",
    icon: ClipboardList,
    items: [
      {
        title: "KAA Dashboard",
        url: "/kaa/dashboard",
        icon: BarChart3,
      },
      {
        title: "KAA Registry",
        url: "/kaa/registry",
        icon: Users,
      },
      {
        title: "Contact Occasions",
        url: "/kaa/contacts",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "School Operations",
    icon: School,
    items: [
      {
        title: "School Unit Information",
        url: "/my-school/info",
        icon: Info,
      },
      {
        title: "Class Management",
        url: "/students/classes",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      {
        title: "Student Lists",
        url: "/reports/students",
        icon: Users,
      },
      {
        title: "Financial Reports",
        url: "/reports/financial",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "My Page",
    icon: User,
    items: [
      {
        title: "Messages",
        url: "/my-page/messages",
        icon: MessageSquare,
      },
      {
        title: "Activity Logs",
        url: "/my-page/logs",
        icon: Activity,
      },
      {
        title: "Settings",
        url: "/my-page/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Support",
    url: "/system/support",
    icon: HelpCircle,
  },
];

export const orgAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Organization Management",
    icon: Building,
    items: [
      {
        title: "Customer Accounts",
        url: "/org/customers",
        icon: Users,
      },
      {
        title: "Group Management",
        url: "/system/groups",
        icon: Building2,
      },
      {
        title: "Account Hierarchy",
        url: "/org/hierarchy",
        icon: GitBranch,
      },
      {
        title: "Billing & Subscriptions",
        url: "/org/billing",
        icon: DollarSign,
      },
      {
        title: "Organization Settings",
        url: "/org/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "User Administration",
    icon: Shield,
    items: [
      {
        title: "Global User Management",
        url: "/org/users",
        icon: Users,
      },
      {
        title: "Role & Permissions",
        url: "/org/permissions",
        icon: Key,
      },
      {
        title: "Access Control",
        url: "/org/access",
        icon: Shield,
      },
    ],
  },
  {
    title: "System Oversight",
    icon: Monitor,
    items: [
      {
        title: "System Health",
        url: "/org/health",
        icon: Activity,
      },
      {
        title: "Usage Analytics",
        url: "/org/analytics",
        icon: BarChart3,
      },
      {
        title: "Audit Logs",
        url: "/org/audit",
        icon: FileText,
      },
    ],
  },
  {
    title: "Support & Communication",
    icon: MessageSquare,
    items: [
      {
        title: "Customer Support",
        url: "/org/support",
        icon: MessageSquare,
      },
      {
        title: "Announcements",
        url: "/org/announcements",
        icon: Bell,
      },
      {
        title: "Knowledge Base",
        url: "/org/knowledge",
        icon: Book,
      },
    ],
  },
  {
    title: "Support",
    url: "/system/support",
    icon: HelpCircle,
  },
];

export const devAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Integration Management",
    icon: Workflow,
    items: [
      {
        title: "API Configurations",
        url: "/dev/integrations",
        icon: Code,
      },
      {
        title: "Customer Integrations",
        url: "/dev/customer-integrations",
        icon: Link,
      },
      {
        title: "Integration Testing",
        url: "/dev/testing",
        icon: Activity,
      },
      {
        title: "API Documentation",
        url: "/dev/api-docs",
        icon: FileText,
      },
    ],
  },
  {
    title: "Localization & Translations",
    icon: Languages,
    items: [
      {
        title: "Translation Management",
        url: "/dev/translations",
        icon: Languages,
      },
      {
        title: "Language Settings",
        url: "/dev/languages",
        icon: Globe,
      },
      {
        title: "Translation Tools",
        url: "/dev/translation-tools",
        icon: Settings,
      },
    ],
  },
  {
    title: "Development Tools",
    icon: Terminal,
    items: [
      {
        title: "Environment Management",
        url: "/dev/environments",
        icon: Server,
      },
      {
        title: "Database Management",
        url: "/dev/database",
        icon: HardDrive,
      },
      {
        title: "System Configuration",
        url: "/dev/config",
        icon: Settings,
      },
      {
        title: "Feature Flags",
        url: "/dev/features",
        icon: GitBranch,
      },
    ],
  },
  {
    title: "Monitoring & Debugging",
    icon: Monitor,
    items: [
      {
        title: "System Logs",
        url: "/dev/logs",
        icon: FileText,
      },
      {
        title: "Performance Monitoring",
        url: "/dev/performance",
        icon: BarChart3,
      },
      {
        title: "Error Tracking",
        url: "/dev/errors",
        icon: AlertTriangle,
      },
      {
        title: "Debug Tools",
        url: "/dev/debug",
        icon: Terminal,
      },
    ],
  },
  {
    title: "Development Resources",
    icon: Code,
    items: [
      {
        title: "Code Repository",
        url: "/dev/repository",
        icon: GitBranch,
      },
      {
        title: "Development Docs",
        url: "/dev/docs",
        icon: Book,
      },
      {
        title: "Testing Suite",
        url: "/dev/test-suite",
        icon: Activity,
      },
    ],
  },
  {
    title: "Support",
    url: "/system/support",
    icon: HelpCircle,
  },
];
