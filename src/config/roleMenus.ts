import { 
  BarChart3, 
  Users, 
  GraduationCap, 
  DollarSign, 
  FileText, 
  Settings, 
  Building, 
  Shield,
  School,
  MapPin,
  UserCog,
  Database,
  BookOpen,
  Calendar,
  MessageSquare,
  HelpCircle,
  Activity,
  Download,
  Upload,
  TrendingUp,
  CreditCard,
  Mail,
  Phone,
  Home,
  Folder
} from "lucide-react";

export interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  items?: MenuItem[];
}

export const regionalAdminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Student Management",
    icon: GraduationCap,
    items: [
      {
        title: "All Students",
        url: "/students",
        icon: Users,
      },
      {
        title: "Student Placements",
        url: "/student-placements", 
        icon: MapPin,
      },
      {
        title: "Student Conflicts",
        url: "/student-conflicts",
        icon: Shield,
      },
      {
        title: "Bulk Operations",
        url: "/student-bulk",
        icon: Database,
      },
      {
        title: "Students by Class",
        url: "/students/by-class",
        icon: School,
      },
      {
        title: "Municipal Students",
        url: "/students/municipal",
        icon: Building,
      },
      {
        title: "External Students", 
        url: "/students/external",
        icon: Users,
      },
      {
        title: "Travel Card Documents",
        url: "/students/travel-cards",
        icon: CreditCard,
      }
    ],
  },
  {
    title: "Financial Management",
    icon: DollarSign,
    items: [
      {
        title: "Financial Overview",
        url: "/financial",
        icon: TrendingUp,
      },
      {
        title: "Price Lists",
        url: "/price-lists",
        icon: FileText,
      },
      {
        title: "Additional Amounts",
        url: "/financial/additional-amounts", 
        icon: DollarSign,
      },
      {
        title: "Municipal Financial Reports",
        url: "/financial/municipal-reports",
        icon: BarChart3,
      },
      {
        title: "Inter-Municipal Compensation",
        url: "/financial/compensation",
        icon: Building,
      }
    ],
  },
  {
    title: "Reports & Analytics",
    icon: FileText,
    items: [
      {
        title: "Reports Overview",
        url: "/reports",
        icon: FileText,
      },
      {
        title: "Regional Statistics",
        url: "/reports/regional-statistics",
        icon: TrendingUp,
      },
      {
        title: "Monthly Compilation", 
        url: "/reports/monthly-compilation",
        icon: Calendar,
      },
      {
        title: "Contribution Reports",
        url: "/contribution-reports",
        icon: BarChart3,
      },
      {
        title: "Follow-up Reports",
        url: "/follow-up-reports",
        icon: Activity,
      },
      {
        title: "Student Lists",
        url: "/reports/student-lists",
        icon: Users,
      },
      {
        title: "School Financial Reports",
        url: "/reports/school-financial",
        icon: DollarSign,
      },
      {
        title: "School Statistics",
        url: "/reports/school-statistics", 
        icon: School,
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
        icon: Building,
      },
      {
        title: "Financial Export",
        url: "/reports/financial-export",
        icon: Download,
      },
      {
        title: "Change Tracking",
        url: "/reports/change-tracking",
        icon: Activity,
      }
    ],
  },
  {
    title: "System Administration",
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
        title: "Enhanced Role Management",
        url: "/system/enhanced-roles",
        icon: UserCog,
      },
      {
        title: "Municipality Management",
        url: "/system/municipalities",
        icon: Building,
      },
      {
        title: "School Units",
        url: "/system/school-units",
        icon: School,
      },
      {
        title: "Principal Management",
        url: "/system/principals",
        icon: UserCog,
      },
      {
        title: "Group Management",
        url: "/system/groups",
        icon: Users,
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
      }
    ],
  },
  {
    title: "Study Paths",
    icon: BookOpen,
    items: [
      {
        title: "Study Paths Overview",
        url: "/study-paths",
        icon: BookOpen,
      },
      {
        title: "Price Codes",
        url: "/study-paths/price-codes",
        icon: DollarSign,
      },
      {
        title: "National Programs",
        url: "/study-paths/national-programs",
        icon: GraduationCap,
      }
    ],
  },
  {
    title: "Operations",
    icon: Activity,
    items: [
      {
        title: "Population Data",
        url: "/operations/population-data",
        icon: Users,
      },
      {
        title: "Address Updates",
        url: "/operations/address-updates",
        icon: MapPin,
      },
      {
        title: "Municipal School Units",
        url: "/operations/municipal-school-units",
        icon: School,
      },
      {
        title: "Municipal User Admin",
        url: "/operations/municipal-user-admin",
        icon: UserCog,
      }
    ],
  },
  {
    title: "KAA (Quality Assurance)",
    icon: Shield,
    items: [
      {
        title: "KAA Registry",
        url: "/kaa-registry",
        icon: Database,
      },
      {
        title: "Contact Occasions",
        url: "/kaa/contact-occasions",
        icon: Phone,
      },
      {
        title: "Statistics Sweden Reports",
        url: "/kaa/statistics-sweden-reports",
        icon: FileText,
      },
      {
        title: "Measures and Actions",
        url: "/kaa/measures-actions",
        icon: Activity,
      }
    ],
  },
  {
    title: "Integration",
    icon: Database,
    items: [
      {
        title: "Integration Overview",
        url: "/integration",
        icon: Database,
      },
      {
        title: "Extens Export",
        url: "/integration/extens-export",
        icon: Download,
      },
      {
        title: "Population Registry",
        url: "/integration/population-registry",
        icon: Users,
      },
      {
        title: "Integration Testing",
        url: "/integration/testing",
        icon: Activity,
      },
      {
        title: "Schedule Integration",
        url: "/integration/schedule",
        icon: Calendar,
      },
      {
        title: "Import Student Data",
        url: "/integration/import-student-data",
        icon: Upload,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: Activity,
      }
    ],
  },
  {
    title: "My Page",
    icon: Home,
    items: [
      {
        title: "Messages",
        url: "/my-page/messages",
        icon: Mail,
      },
      {
        title: "Enrollment Settings",
        url: "/my-page/enrollment-settings",
        icon: Settings,
      },
      {
        title: "Activity Logs",
        url: "/my-page/activity-logs",
        icon: Activity,
      }
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
];

export const municipalityAdminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Student Management",
    icon: GraduationCap,
    items: [
      {
        title: "Municipal Students",
        url: "/students/municipal",
        icon: Building,
      },
      {
        title: "External Students",
        url: "/students/external", 
        icon: Users,
      },
      {
        title: "Student Placements",
        url: "/student-placements",
        icon: MapPin,
      },
      {
        title: "Students by Class",
        url: "/students/by-class",
        icon: School,
      }
    ],
  },
  {
    title: "Financial Management",
    icon: DollarSign,
    items: [
      {
        title: "Municipal Financial Reports",
        url: "/financial/municipal-reports",
        icon: BarChart3,
      },
      {
        title: "Price Lists",
        url: "/price-lists",
        icon: FileText,
      },
      {
        title: "Additional Amounts",
        url: "/financial/additional-amounts",
        icon: DollarSign,
      }
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      {
        title: "Municipal Statistics",
        url: "/reports/municipal-statistics",
        icon: Building,
      },
      {
        title: "Student Lists",
        url: "/reports/student-lists",
        icon: Users,
      },
      {
        title: "Financial Export",
        url: "/reports/financial-export",
        icon: Download,
      }
    ],
  },
  {
    title: "Operations",
    icon: Activity,
    items: [
      {
        title: "Municipal School Units",
        url: "/operations/municipal-school-units",
        icon: School,
      },
      {
        title: "Municipal User Admin",
        url: "/operations/municipal-user-admin",
        icon: UserCog,
      }
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
];

export const schoolAdminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Students",
    icon: GraduationCap,
    items: [
      {
        title: "Students by Class",
        url: "/students/by-class",
        icon: School,
      },
      {
        title: "Travel Card Documents",
        url: "/students/travel-cards",
        icon: CreditCard,
      }
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      {
        title: "School Statistics",
        url: "/reports/school-statistics",
        icon: School,
      },
      {
        title: "School Financial Reports",
        url: "/reports/school-financial",
        icon: DollarSign,
      }
    ],
  },
  {
    title: "My School",
    icon: School,
    items: [
      {
        title: "School Information",
        url: "/my-school/info",
        icon: School,
      }
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
];

export const orgAdminMenu = [
  {
    title: "Organization Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "System Administration",
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
        title: "Enhanced Role Management",
        url: "/system/enhanced-roles",
        icon: UserCog,
      },
      {
        title: "Support",
        url: "/system/support",
        icon: HelpCircle,
      }
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
];

export const devAdminMenu = [
  {
    title: "Development Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "System Administration",
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
        title: "Enhanced Role Management",
        url: "/system/enhanced-roles",
        icon: UserCog,
      },
      {
        title: "Municipality Management",
        url: "/system/municipalities",
        icon: Building,
      },
      {
        title: "School Units",
        url: "/system/school-units",
        icon: School,
      },
      {
        title: "Principal Management",
        url: "/system/principals",
        icon: UserCog,
      },
      {
        title: "Support",
        url: "/system/support",
        icon: HelpCircle,
      }
    ],
  },
  {
    title: "Integration & Testing",
    icon: Database,
    items: [
      {
        title: "Integration Testing",
        url: "/integration/testing",
        icon: Activity,
      },
      {
        title: "Integration Status",
        url: "/integration/status",
        icon: Activity,
      }
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
];
