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
  Zap
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
      {
        title: "Support",
        url: "/system/support",
        icon: HelpCircle,
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
    title: "Regional Operations",
    icon: Database,
    items: [
      {
        title: "Population Data",
        url: "/operations/population",
        icon: Users,
      },
    ],
  },
  {
    title: "Integration Management",
    icon: Workflow,
    items: [
      {
        title: "Integration Overview",
        url: "/integration",
        icon: Monitor,
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
        title: "Integration Testing",
        url: "/integration/testing",
        icon: Activity,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: BarChart3,
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

export const municipalityAdminMenu = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    url: '/dashboard'
  },
  {
    title: 'KAA Management',
    icon: Users,
    items: [
      {
        title: 'KAA Dashboard',
        icon: BarChart3,
        url: '/kaa/dashboard'
      },
      {
        title: 'KAA Registry',
        icon: UserPlus,
        url: '/kaa-registry'
      },
      {
        title: 'Contact Occasions',
        icon: MessageSquare,
        url: '/kaa/contact-occasions'
      },
      {
        title: 'Measures & Actions',
        icon: Activity,
        url: '/kaa/measures-actions'
      }
    ]
  },
  {
    title: 'Integration Management',
    icon: Zap,
    items: [
      {
        title: 'Tax Agency Hub',
        icon: Building2,
        url: '/integration/tax-agency'
      },
      {
        title: 'UHR BEDA',
        icon: GraduationCap,
        url: '/integration/uhr-beda'
      }
    ]
  }
];

export const schoolAdminMenu = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    url: '/dashboard'
  },
  {
    title: 'KAA Management',
    icon: Users,
    items: [
      {
        title: 'KAA Dashboard',
        icon: BarChart3,
        url: '/kaa/dashboard'
      },
      {
        title: 'KAA Registry',
        icon: UserPlus,
        url: '/kaa-registry'
      },
      {
        title: 'Contact Occasions',
        icon: MessageSquare,
        url: '/kaa/contact-occasions'
      },
      {
        title: 'Measures & Actions',
        icon: Activity,
        url: '/kaa/measures-actions'
      }
    ]
  }
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
