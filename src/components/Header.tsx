import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Search, User, LogOut, Settings, CheckCheck, Archive, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM",
      timestamp: "10 minutes ago",
      isRead: false,
      type: "system"
    },
    {
      id: 2,
      title: "New Message",
      message: "You have received a new message from Regional Office",
      timestamp: "1 hour ago",
      isRead: false,
      type: "message"
    },
    {
      id: 3,
      title: "Data Validation Required",
      message: "Student data validation deadline is approaching",
      timestamp: "2 hours ago",
      isRead: true,
      type: "warning"
    }
  ]);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="mr-2 relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-ike-error text-white text-xs flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4" align="end">
            <div className="border-b border-ike-neutral-light p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ike-neutral-dark">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs text-ike-primary hover:text-ike-primary-dark"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-ike-neutral">
                  No notifications
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-ike-neutral-light/50 hover:bg-ike-neutral-light/30 transition-colors ${
                        !notification.isRead ? 'bg-ike-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between space-x-2">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? 'text-ike-neutral-dark' : 'text-ike-neutral'
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-ike-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-xs text-ike-neutral leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-ike-neutral/70">
                            {notification.timestamp}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0 hover:bg-ike-primary/10"
                            >
                              <CheckCheck className="h-3 w-3 text-ike-primary" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {notifications.length > 0 && (
              <div className="border-t border-ike-neutral-light p-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-ike-primary hover:text-ike-primary-dark hover:bg-ike-primary/5"
                >
                  View all notifications
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

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
