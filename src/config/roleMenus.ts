
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
      {
        title: "National Programs",
        url: "/study-paths/programs",
        icon: GraduationCap,
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
        title: "Municipal Students",
        url: "/students/municipal",
        icon: Users,
      },
      {
        title: "Students by Class",
        url: "/students/by-class",
        icon: GraduationCap,
      },
      {
        title: "External Students",
        url: "/students/external",
        icon: ArrowUpDown,
      },
      {
        title: "Location Control",
        url: "/students/location-control",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Municipal Integration",
    icon: Database,
    items: [
      {
        title: "SIS Integration",
        url: "/integration/sis",
        icon: Database,
      },
      {
        title: "Integration Schedule",
        url: "/integration/schedule",
        icon: Clock,
      },
      {
        title: "Integration Logs",
        url: "/integration/logs",
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
        url: "/financial/price-lists",
        icon: Euro,
      },
      {
        title: "Additional Amounts",
        url: "/financial/additional",
        icon: DollarSign,
      },
      {
        title: "Compensation Reports",
        url: "/financial/compensation",
        icon: FileText,
      },
    ],
  },
  {
    title: "Municipal Operations",
    icon: Building,
    items: [
      {
        title: "School Units",
        url: "/operations/schools",
        icon: School,
      },
      {
        title: "User Management",
        url: "/operations/users",
        icon: Users,
      },
      {
        title: "Enrollment Control",
        url: "/operations/enrollment",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      {
        title: "Money to Receive",
        url: "/reports/receivables",
        icon: TrendingUp,
      },
      {
        title: "Money to Pay",
        url: "/reports/payables",
        icon: DollarSign,
      },
      {
        title: "Municipal Statistics",
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
        title: "School Roster",
        url: "/students/roster",
        icon: Users,
      },
      {
        title: "Add New Student",
        url: "/students/add",
        icon: UserPlus,
      },
      {
        title: "Student Placements",
        url: "/students/placements",
        icon: ArrowUpDown,
      },
      {
        title: "Class Management",
        url: "/students/classes",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "School Operations",
    icon: School,
    items: [
      {
        title: "School Information",
        url: "/school/information",
        icon: Building,
      },
      {
        title: "Programs & Classes",
        url: "/school/programs",
        icon: Book,
      },
      {
        title: "Unit Management",
        url: "/school/units",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Data Entry",
    icon: FileText,
    items: [
      {
        title: "Student Registration",
        url: "/data-entry/registration",
        icon: UserPlus,
      },
      {
        title: "Bulk Operations",
        url: "/data-entry/bulk",
        icon: Package,
      },
      {
        title: "Student Completion",
        url: "/data-entry/completion",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Warnings & Notifications",
    icon: Bell,
    items: [
      {
        title: "Double Registration",
        url: "/warnings/double-registration",
        icon: AlertTriangle,
      },
      {
        title: "System Warnings",
        url: "/warnings/system",
        icon: Bell,
      },
      {
        title: "Conflict Resolution",
        url: "/warnings/conflicts",
        icon: AlertTriangle,
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
