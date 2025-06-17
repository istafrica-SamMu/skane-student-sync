
import {
  LayoutDashboard,
  Users,
  School,
  GraduationCap,
  Calculator,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Building,
  UserCheck,
  MapPin,
  Calendar,
  Database,
  CreditCard,
  Building2,
  Globe,
  Code,
  Wrench,
  UserCog,
  Zap,
  Server,
  DollarSign,
  Activity,
  User,
  Euro,
  TrendingUp,
  FileSpreadsheet,
  Info
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
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "System Management",
    icon: Settings,
    items: [
      {
        title: "User Management",
        icon: Users,
        url: "/system/users",
      },
      {
        title: "Municipality Management",
        icon: Building,
        url: "/system/municipalities",
      },
      {
        title: "Group Management", 
        icon: Building2,
        url: "/system/groups",
      },
      {
        title: "Principal Management",
        icon: UserCog,
        url: "/system/principals",
      },
      {
        title: "School Units",
        icon: School,
        url: "/system/schools",
      },
      {
        title: "School Years",
        icon: Calendar,
        url: "/system/school-years",
      },
    ],
  },
  {
    title: "Study Paths",
    icon: GraduationCap,
    items: [
      {
        title: "Study Paths",
        icon: GraduationCap,
        url: "/study-paths",
      },
      {
        title: "Price Codes",
        icon: CreditCard,
        url: "/study-paths/price-codes",
      },
      {
        title: "National Programs",
        icon: Globe,
        url: "/study-paths/programs",
      },
    ],
  },
  {
    title: "Operations",
    icon: Database,
    items: [
      {
        title: "KAA Management",
        icon: UserCheck,
        url: "/operations/kaa",
      },
      {
        title: "Population Data",
        icon: Users,
        url: "/operations/population",
      },
      {
        title: "Address Updates",
        icon: MapPin,
        url: "/operations/addresses",
      },
      {
        title: "Municipal School Units",
        icon: School,
        url: "/operations/municipal-schools",
      },
      {
        title: "Municipal User Admin",
        icon: Users,
        url: "/operations/municipal-users",
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
];

export const municipalityAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Students",
    icon: Users,
    items: [
      {
        title: "All Students",
        icon: Users,
        url: "/students",
      },
      {
        title: "Students by Class",
        icon: Users,
        url: "/students/classes",
      },
      {
        title: "Municipal Students",
        icon: Users,
        url: "/students/municipal",
      },
      {
        title: "External Students",
        icon: Users,
        url: "/students/external",
      },
      {
        title: "Student Placements",
        icon: School,
        url: "/students/placements",
      },
      {
        title: "Student Conflicts",
        icon: FileText,
        url: "/students/conflicts",
      },
      {
        title: "Bulk Operations",
        icon: Database,
        url: "/students/bulk",
      },
    ],
  },
  {
    title: "KAA Management",
    icon: UserCheck,
    url: "/operations/kaa",
  },
  {
    title: "Import Student Data",
    url: "/integration/import",
    icon: Database,
  },
  {
    title: "Financial Management",
    icon: Calculator,
    items: [
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
];

export const schoolAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Students",
    icon: Users,
    items: [
      {
        title: "All Students",
        icon: Users,
        url: "/students",
      },
      {
        title: "Students by Class",
        icon: Users,
        url: "/students/classes",
      },
      {
        title: "Student Placements",
        icon: School,
        url: "/students/placements",
      },
      {
        title: "Bulk Operations",
        icon: Database,
        url: "/students/bulk",
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
];

export const orgAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Customer Management",
    icon: Building,
    items: [
      {
        title: "Organizations",
        icon: Building2,
        url: "/system/municipalities",
      },
      {
        title: "User Accounts",
        icon: Users,
        url: "/system/users",
      },
      {
        title: "Groups & Principals",
        icon: UserCog,
        url: "/system/groups",
      },
    ],
  },
  {
    title: "System Operations",
    icon: Server,
    items: [
      {
        title: "System Health",
        icon: Zap,
        url: "/reports/statistics",
      },
      {
        title: "Usage Analytics",
        icon: BarChart3,
        url: "/reports/regional",
      },
      {
        title: "Support Tickets",
        icon: MessageSquare,
        url: "/my-page/messages",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export const devAdminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Development Tools",
    icon: Code,
    items: [
      {
        title: "Integration Management",
        icon: Zap,
        url: "/integration",
      },
      {
        title: "Translation Management",
        icon: Globe,
        url: "/settings",
      },
      {
        title: "System Configuration",
        icon: Wrench,
        url: "/system/schools",
      },
    ],
  },
  {
    title: "Customer Setup",
    icon: Building,
    items: [
      {
        title: "Customer Integrations",
        icon: Server,
        url: "/integration/testing",
      },
      {
        title: "Data Migration",
        icon: Database,
        url: "/operations/population",
      },
      {
        title: "System Deployment",
        icon: Zap,
        url: "/integration/status",
      },
    ],
  },
  {
    title: "Analytics & Monitoring",
    icon: BarChart3,
    items: [
      {
        title: "System Logs",
        icon: FileText,
        url: "/my-page/logs",
      },
      {
        title: "Performance Metrics",
        icon: BarChart3,
        url: "/reports/statistics",
      },
      {
        title: "Error Tracking",
        icon: FileText,
        url: "/reports/changes",
      },
    ],
  },
];
