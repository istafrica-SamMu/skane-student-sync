
import { Home, Users, FileText, BarChart3, Settings, Database, ArrowUpDown, AlertTriangle, Package, Euro, TrendingUp, UserCheck, Link as LinkIcon, User, Calendar, Upload, DollarSign, MessageSquare, Building, Calculator, Plus, MapPin } from "lucide-react";

export const regionalAdminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "System",
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
        icon: Building,
      },
      {
        title: "School Years",
        url: "/system/school-years",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Study Paths",
    icon: FileText,
    items: [
      {
        title: "Study Paths",
        url: "/study-paths",
        icon: FileText,
      },
      {
        title: "Price Codes",
        url: "/study-paths/price-codes",
        icon: Euro,
      },
      {
        title: "National Programs",
        url: "/study-paths/programs",
        icon: FileText,
      },
    ],
  },
  {
    title: "Operations",
    icon: Database,
    items: [
      {
        title: "Population Data",
        url: "/operations/population",
        icon: User,
      },
      {
        title: "Address Updates",
        url: "/operations/addresses",
        icon: MapPin,
      },
      {
        title: "Municipal School Units",
        url: "/operations/municipal-schools",
        icon: Building,
      },
      {
        title: "Municipal User Admin",
        url: "/operations/municipal-users",
        icon: User,
      },
    ],
  },
  {
    title: "Studenthantering",
    icon: Users,
    items: [
      {
        title: "Studentregister",
        url: "/students",
        icon: Users,
      },
      {
        title: "Students by Class",
        url: "/students/classes",
        icon: Users,
      },
      {
        title: "Municipal Students",
        url: "/students/municipal",
        icon: Users,
      },
      {
        title: "External Students",
        url: "/students/external",
        icon: Users,
      },
      {
        title: "Placeringar & Överföringar",
        url: "/students/placements",
        icon: ArrowUpDown,
      },
      {
        title: "Konfliktlösning",
        url: "/students/conflicts",
        icon: AlertTriangle,
      },
      {
        title: "Massoperationer",
        url: "/students/bulk",
        icon: Package,
      },
    ],
  },
  {
    title: "Ekonomihantering",
    icon: Calculator,
    items: [
      {
        title: "IKE-beräkningar",
        url: "/financial/calculations",
        icon: Calculator,
      },
      {
        title: "Additional Amounts",
        url: "/financial/additional-amounts",
        icon: Plus,
      },
      {
        title: "Municipal Financial Reports",
        url: "/financial/reports",
        icon: FileText,
      },
      {
        title: "Inter-municipal Compensation",
        url: "/financial/compensation",
        icon: Euro,
      },
      {
        title: "Prislistor",
        url: "/financial/pricelists",
        icon: Euro,
      },
    ],
  },
  {
    title: "Rapporter & Analys",
    icon: FileText,
    items: [
      {
        title: "Standardrapporter",
        url: "/reports/standard",
        icon: FileText,
      },
      {
        title: "Student Lists",
        url: "/reports/students",
        icon: Users,
      },
      {
        title: "School Financial Reports",
        url: "/reports/financial",
        icon: FileText,
      },
      {
        title: "School Statistics",
        url: "/reports/statistics",
        icon: BarChart3,
      },
      {
        title: "Bidragsrapporter",
        url: "/reports/contributions",
        icon: Euro,
      },
      {
        title: "Uppföljningsrapporter",
        url: "/reports/follow-up",
        icon: UserCheck,
      },
      {
        title: "Regional Statistics",
        url: "/reports/regional",
        icon: TrendingUp,
      },
      {
        title: "Monthly Compilation",
        url: "/reports/monthly",
        icon: Calendar,
      },
      {
        title: "Change Tracking",
        url: "/reports/changes",
        icon: LinkIcon,
      },
      {
        title: "Money To Receive",
        url: "/reports/money-to-receive",
        icon: Euro,
      },
      {
        title: "Money To Pay",
        url: "/reports/money-to-pay",
        icon: Euro,
      },
      {
        title: "Municipal Statistics",
        url: "/reports/municipal-statistics",
        icon: BarChart3,
      },
      {
        title: "Financial Export",
        url: "/reports/financial-export",
        icon: Upload,
      },
    ],
  },
  {
    title: "Integration & Import",
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
        icon: Upload,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: Settings,
      },
      {
        title: "Extens Export",
        url: "/integration/extens",
        icon: FileText,
      },
      {
        title: "Population Registry",
        url: "/integration/population",
        icon: User,
      },
      {
        title: "Integration Testing",
        url: "/integration/testing",
        icon: Settings,
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
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/my-page/settings",
        icon: Settings,
      },
    ],
  },
];

export const municipalityAdminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "System",
    icon: Settings,
    items: [
      {
        title: "School Units",
        url: "/system/schools",
        icon: Building,
      },
    ],
  },
  {
    title: "Operations",
    icon: Database,
    items: [
      {
        title: "Population Data",
        url: "/operations/population",
        icon: User,
      },
      {
        title: "Address Updates",
        url: "/operations/addresses",
        icon: MapPin,
      },
      {
        title: "Municipal School Units",
        url: "/operations/municipal-schools",
        icon: Building,
      },
      {
        title: "Municipal User Admin",
        url: "/operations/municipal-users",
        icon: User,
      },
    ],
  },
  {
    title: "Studenthantering",
    icon: Users,
    items: [
      {
        title: "Studentregister",
        url: "/students",
        icon: Users,
      },
      {
        title: "Students by Class",
        url: "/students/classes",
        icon: Users,
      },
      {
        title: "Municipal Students",
        url: "/students/municipal",
        icon: Users,
      },
      {
        title: "External Students",
        url: "/students/external",
        icon: Users,
      },
    ],
  },
  {
    title: "Ekonomihantering",
    icon: Calculator,
    items: [
      {
        title: "IKE-beräkningar",
        url: "/financial/calculations",
        icon: Calculator,
      },
      {
        title: "Additional Amounts",
        url: "/financial/additional-amounts",
        icon: Plus,
      },
      {
        title: "Municipal Financial Reports",
        url: "/financial/reports",
        icon: FileText,
      },
      {
        title: "Inter-municipal Compensation",
        url: "/financial/compensation",
        icon: Euro,
      },
    ],
  },
  {
    title: "Rapporter & Analys",
    icon: FileText,
    items: [
      {
        title: "Student Lists",
        url: "/reports/students",
        icon: Users,
      },
      {
        title: "Municipal Statistics",
        url: "/reports/municipal-statistics",
        icon: BarChart3,
      },
      {
        title: "Financial Export",
        url: "/reports/financial-export",
        icon: Upload,
      },
    ],
  },
  {
    title: "Integration & Import",
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
        icon: Upload,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: Settings,
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
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/my-page/settings",
        icon: Settings,
      },
    ],
  },
];

export const schoolAdminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My School",
    icon: Building,
    items: [
      {
        title: "School Information",
        url: "/my-school/info",
        icon: Building,
      },
    ],
  },
  {
    title: "Students",
    icon: Users,
    items: [
      {
        title: "Student Lists",
        url: "/reports/students",
        icon: Users,
      },
      {
        title: "Students by Class",
        url: "/students/classes",
        icon: Users,
      },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      {
        title: "Financial Reports",
        url: "/reports/financial",
        icon: DollarSign,
      },
      {
        title: "Statistics",
        url: "/reports/statistics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Integration",
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
        icon: Upload,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: Settings,
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
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/my-page/settings",
        icon: Settings,
      },
    ],
  },
];
