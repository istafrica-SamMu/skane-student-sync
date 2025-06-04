
import {
  Calendar,
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
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

// Menu items structure
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
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
        title: "Bidragsrapporter",
        url: "/reports/contributions",
        icon: Euro,
      },
      {
        title: "Statistik",
        url: "/reports/statistics",
        icon: TrendingUp,
      },
      {
        title: "Uppföljningsrapporter",
        url: "/reports/follow-up",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Integration & Import",
    icon: Database,
    items: [
      {
        title: "Kommunal SIS-synk",
        url: "/integration/municipal",
        icon: Link,
      },
      {
        title: "SS12000 Import",
        url: "/integration/ss12000",
        icon: Database,
      },
      {
        title: "Navet Integration",
        url: "/integration/navet",
        icon: User,
      },
      {
        title: "Filbehandling",
        url: "/integration/files",
        icon: FileText,
      },
    ],
  },
  {
    title: "Inställningar",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ike-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-ike-primary">IKE 2.0</h1>
            <p className="text-xs text-ike-neutral">Skåne Regional Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-ike-neutral-dark font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full hover:bg-ike-primary/10 hover:text-ike-primary">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto w-4 h-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild 
                                className="hover:bg-ike-primary/10 hover:text-ike-primary"
                              >
                                <a href={subItem.url}>
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      className="hover:bg-ike-primary/10 hover:text-ike-primary"
                    >
                      <a href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
