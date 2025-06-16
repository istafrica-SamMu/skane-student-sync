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
  Mail
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
        title: "Municipality Management",
        url: "/system/municipalities",
        icon: Building,
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
    title: "Regional Operations",
    icon: Database,
    items: [
      {
        title: "Grade Promotions",
        url: "/operations/promotions",
        icon: TrendingUp,
      },
      {
        title: "Population Data",
        url: "/operations/population",
        icon: Users,
      },
      {
        title: "Address Updates",
        url: "/operations/addresses",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Integrations",
    icon: Link,
    items: [
      {
        title: "Extens IKE Export",
        url: "/integration/extens",
        icon: FileSpreadsheet,
      },
      {
        title: "Population Registry",
        url: "/integration/population",
        icon: Users,
      },
      {
        title: "Integration Testing",
        url: "/integration/testing",
        icon: Settings,
      },
    ],
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
    ],
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
        title: "Students by Class & Study Path",
        url: "/students/classes",
        icon: GraduationCap,
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
    ],
  },
  {
    title: "Municipal Integration",
    icon: Database,
    items: [
      {
        title: "Schedule Integration",
        url: "/integration/schedule",
        icon: Calendar,
      },
      {
        title: "Import Student Data",
        url: "/integration/import",
        icon: Database,
      },
      {
        title: "Integration Status & Logs",
        url: "/integration/status",
        icon: Activity,
      },
    ],
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
      {
        title: "Enrollment Control & Scheduling",
        url: "/operations/enrollment-control",
        icon: Calendar,
      },
      {
        title: "Location Control & Double Placement",
        url: "/operations/location-control",
        icon: MapPin,
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
    ],
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
        title: "Manage Student Placements",
        url: "/students/placements",
        icon: ArrowUpDown,
      },
    ],
  },
  {
    title: "School Operations",
    icon: School,
    items: [
      {
        title: "School Unit Information",
        url: "/system/schools",
        icon: Building,
      },
      {
        title: "Programs & Specializations",
        url: "/study-paths/programs",
        icon: Book,
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
      {
        title: "School Statistics",
        url: "/reports/statistics",
        icon: BarChart3,
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
        title: "Enrollment Info",
        url: "/my-page/enrollment",
        icon: Settings,
      },
      {
        title: "Activity Logs",
        url: "/my-page/logs",
        icon: Activity,
      },
    ],
  },
];
