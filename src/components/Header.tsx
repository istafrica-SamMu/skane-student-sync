import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return t('header.breadcrumb.dashboard');
    if (path.startsWith("/students")) {
      if (path === "/students") return t('header.breadcrumb.students');
      if (path.includes("placements")) return t('header.breadcrumb.students.placements');
      if (path.includes("conflicts")) return t('header.breadcrumb.students.conflicts');
      if (path.includes("bulk")) return t('header.breadcrumb.students.bulk');
    }
    if (path.startsWith("/financial")) {
      if (path.includes("calculations")) return t('header.breadcrumb.financial');
      if (path.includes("pricelists")) return t('header.breadcrumb.financial.pricelists');
    }
    if (path.startsWith("/reports")) {
      if (path.includes("standard")) return t('header.breadcrumb.reports');
      if (path.includes("contributions")) return t('header.breadcrumb.reports.contributions');
      if (path.includes("statistics")) return t('header.breadcrumb.reports.statistics');
      if (path.includes("follow-up")) return t('header.breadcrumb.reports.follow-up');
    }
    if (path.startsWith("/integration")) return t('header.breadcrumb.integration');
    if (path.startsWith("/settings")) return t('header.breadcrumb.settings');
    return "IKE 2.0";
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger className="mr-4" />
        
        {/* Breadcrumb */}
        <div className="flex-1">
          <nav className="text-sm text-ike-neutral">
            {getBreadcrumb()}
          </nav>
        </div>

        {/* Search */}
        <div className="relative mr-4 w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
          <Input
            placeholder={t('header.search.placeholder')}
            className="pl-10 border-ike-primary/20 focus:border-ike-primary"
          />
        </div>

        {/* Language Toggle */}
        <LanguageToggle />

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="mr-2 relative">
          <Bell className="h-4 w-4" />
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-ike-error text-white text-xs flex items-center justify-center"
          >
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{user?.name || 'User'}</div>
                <div className="text-xs text-ike-neutral">
                  {user?.role === 'regional-admin' && 'Regional Admin'}
                  {user?.role === 'municipality-admin' && 'Municipality Admin'}
                  {user?.role === 'school-admin' && 'School Admin'}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Inställningar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logga ut</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
