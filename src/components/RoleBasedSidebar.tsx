
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
import { ChevronDown, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { regionalAdminMenu, municipalityAdminMenu, schoolAdminMenu } from "@/config/roleMenus";

export function RoleBasedSidebar() {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'regional-admin':
        return regionalAdminMenu;
      case 'municipality-admin':
        return municipalityAdminMenu;
      case 'school-admin':
        return schoolAdminMenu;
      default:
        return [];
    }
  };

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'regional-admin':
        return 'Regional Administrator';
      case 'municipality-admin':
        return 'Municipality Administrator';
      case 'school-admin':
        return 'School Administrator';
      default:
        return 'IKE 2.0';
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ike-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-ike-primary">IKE 2.0</h1>
            <p className="text-xs text-ike-neutral">{getRoleTitle()}</p>
          </div>
        </div>
        {user && (
          <div className="mt-2 p-2 bg-ike-neutral-light rounded">
            <p className="text-sm font-medium text-ike-neutral-dark">{user.name}</p>
            <p className="text-xs text-ike-neutral">{user.email}</p>
            {user.organization && (
              <p className="text-xs text-ike-neutral">{user.organization}</p>
            )}
          </div>
        )}
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
                                <Link to={subItem.url || '#'}>
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.title}</span>
                                </Link>
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
                      <Link to={item.url || '#'}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
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
