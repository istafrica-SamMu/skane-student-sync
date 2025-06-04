
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
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path.startsWith("/students")) {
      if (path === "/students") return "Studenthantering > Studentregister";
      if (path.includes("placements")) return "Studenthantering > Placeringar & Överföringar";
      if (path.includes("conflicts")) return "Studenthantering > Konfliktlösning";
      if (path.includes("bulk")) return "Studenthantering > Massoperationer";
    }
    if (path.startsWith("/financial")) {
      if (path.includes("calculations")) return "Ekonomihantering > IKE-beräkningar";
      if (path.includes("pricelists")) return "Ekonomihantering > Prislistor";
    }
    if (path.startsWith("/reports")) {
      if (path.includes("standard")) return "Rapporter & Analys > Standardrapporter";
      if (path.includes("contributions")) return "Rapporter & Analys > Bidragsrapporter";
      if (path.includes("statistics")) return "Rapporter & Analys > Statistik";
      if (path.includes("follow-up")) return "Rapporter & Analys > Uppföljningsrapporter";
    }
    if (path.startsWith("/integration")) return "Integration & Import";
    if (path.startsWith("/settings")) return "Inställningar";
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
            placeholder="Sök studenter, skolor, rapporter..."
            className="pl-10 border-ike-primary/20 focus:border-ike-primary"
          />
        </div>

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
                <div className="text-sm font-medium">Anna Lindström</div>
                <div className="text-xs text-ike-neutral">Municipal Admin</div>
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
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logga ut</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
