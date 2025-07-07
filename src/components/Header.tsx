import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
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
import { Bell, Search, User, LogOut, Settings, CheckCheck, Archive, Trash2, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];

    // Always start with Dashboard
    items.push({ label: "Dashboard", url: "/" });

    if (path === "/" || path === "/dashboard") {
      return items;
    }

    // System pages
    if (path.startsWith("/system")) {
      items.push({ label: "System", url: "/system" });
      
      if (path === "/system/users") {
        items.push({ label: "User Management", url: "/system/users" });
      } else if (path === "/system/person-register") {
        items.push({ label: "Person Register", url: "/system/person-register" });
      } else if (path === "/system/roles") {
        items.push({ label: "Role Management", url: "/system/roles" });
      } else if (path === "/system/groups") {
        items.push({ label: "Group Management", url: "/system/groups" });
      } else if (path === "/system/municipalities") {
        items.push({ label: "Municipality Management", url: "/system/municipalities" });
      } else if (path === "/system/principals") {
        items.push({ label: "Principal Management", url: "/system/principals" });
      } else if (path === "/system/school-units") {
        items.push({ label: "School Units", url: "/system/school-units" });
      } else if (path === "/system/school-years") {
        items.push({ label: "School Years", url: "/system/school-years" });
      } else if (path === "/system/support") {
        items.push({ label: "Support", url: "/system/support" });
      }
    }
    
    // Students pages
    else if (path.startsWith("/students")) {
      items.push({ label: "Students", url: "/students" });
      
      if (path === "/students/placements") {
        items.push({ label: "Student Placements", url: "/students/placements" });
      } else if (path === "/students/conflicts") {
        items.push({ label: "Student Conflicts", url: "/students/conflicts" });
      } else if (path === "/students/bulk") {
        items.push({ label: "Bulk Operations", url: "/students/bulk" });
      } else if (path === "/students/municipal") {
        items.push({ label: "Municipal Students", url: "/students/municipal" });
      } else if (path === "/students/external") {
        items.push({ label: "External Students", url: "/students/external" });
      } else if (path === "/students/tf-registration") {
        items.push({ label: "TF Registration", url: "/students/tf-registration" });
      } else if (path === "/students/travel-cards") {
        items.push({ label: "Travel Card Documents", url: "/students/travel-cards" });
      } else if (path === "/students/by-class") {
        items.push({ label: "Students by Class", url: "/students/by-class" });
      } else if (path === "/students/conflict-resolution") {
        items.push({ label: "Conflict Resolution", url: "/students/conflict-resolution" });
      }
    }
    
    // Financial pages
    else if (path.startsWith("/financial")) {
      items.push({ label: "Financial", url: "/financial" });
      
      if (path === "/financial/pricelists") {
        items.push({ label: "Price Lists", url: "/financial/pricelists" });
      } else if (path === "/financial/additional-amounts") {
        items.push({ label: "Additional Amounts", url: "/financial/additional-amounts" });
      } else if (path === "/financial/compensation") {
        items.push({ label: "Inter-Municipal Compensation", url: "/financial/compensation" });
      } else if (path === "/financial/payment-blocks") {
        items.push({ label: "Payment Blocks", url: "/financial/payment-blocks" });
      } else if (path === "/financial/payment-documents") {
        items.push({ label: "Payment Documents", url: "/financial/payment-documents" });
      } else if (path === "/financial/accounting-configuration") {
        items.push({ label: "Accounting Configuration", url: "/financial/accounting-configuration" });
      } else if (path === "/financial/municipal-reports") {
        items.push({ label: "Municipal Financial Reports", url: "/financial/municipal-reports" });
      }
    }
    
    // Reports pages
    else if (path.startsWith("/reports")) {
      items.push({ label: "Reports", url: "/reports" });
      
      if (path === "/reports/contributions") {
        items.push({ label: "Contribution Reports", url: "/reports/contributions" });
      } else if (path === "/reports/statistics") {
        items.push({ label: "Statistics", url: "/reports/statistics" });
      } else if (path === "/reports/follow-up") {
        items.push({ label: "Follow-up Reports", url: "/reports/follow-up" });
      } else if (path === "/reports/change-lists") {
        items.push({ label: "Change Lists", url: "/reports/change-lists" });
      } else if (path === "/reports/error-lists") {
        items.push({ label: "Error Lists", url: "/reports/error-lists" });
      } else if (path === "/reports/change-tracking") {
        items.push({ label: "Change Tracking", url: "/reports/change-tracking" });
      } else if (path === "/reports/student-lists") {
        items.push({ label: "Student Lists", url: "/reports/student-lists" });
      } else if (path === "/reports/financial-analysis") {
        items.push({ label: "Financial Analysis", url: "/reports/financial-analysis" });
      } else if (path === "/reports/financial-export") {
        items.push({ label: "Financial Export", url: "/reports/financial-export" });
      } else if (path === "/reports/money-to-pay") {
        items.push({ label: "Money to Pay", url: "/reports/money-to-pay" });
      } else if (path === "/reports/money-to-receive") {
        items.push({ label: "Money to Receive", url: "/reports/money-to-receive" });
      } else if (path === "/reports/monthly-compilation") {
        items.push({ label: "Monthly Compilation", url: "/reports/monthly-compilation" });
      } else if (path === "/reports/municipal-statistics") {
        items.push({ label: "Municipal Statistics", url: "/reports/municipal-statistics" });
      } else if (path === "/reports/regional-statistics") {
        items.push({ label: "Regional Statistics", url: "/reports/regional-statistics" });
      } else if (path === "/reports/school-statistics") {
        items.push({ label: "School Statistics", url: "/reports/school-statistics" });
      } else if (path === "/reports/school-financial-reports") {
        items.push({ label: "School Financial Reports", url: "/reports/school-financial-reports" });
      } else if (path === "/reports/statistics-dashboard") {
        items.push({ label: "Statistics Dashboard", url: "/reports/statistics-dashboard" });
      }
    }
    
    // Integration pages
    else if (path.startsWith("/integration")) {
      items.push({ label: "Integration", url: "/integration" });
    }
    
    // Settings pages
    else if (path.startsWith("/settings")) {
      items.push({ label: "Settings", url: "/settings" });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-14 sm:h-16 items-center px-2 sm:px-4">
        <SidebarTrigger className="mr-2 sm:mr-4" />
        
        {/* Breadcrumb - Hidden on mobile when search is open */}
        <div className={`flex-1 min-w-0 ${isMobile && isSearchOpen ? 'hidden' : 'block'}`}>
          <Breadcrumb>
            <BreadcrumbList className="flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <div key={item.url} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator className="mx-1 sm:mx-2" />}
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage className="text-xs sm:text-sm font-medium text-ike-primary">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        href={item.url}
                        className="text-xs sm:text-sm text-ike-neutral hover:text-ike-primary transition-colors"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Mobile Search Toggle */}
        {isMobile && (
          <Button
            variant="ghost" 
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="mr-1"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}

        {/* Desktop Search or Mobile Search when open */}
        {(!isMobile || isSearchOpen) && (
          <div className={`relative ${isMobile ? 'flex-1 mx-2' : 'mr-4 w-64 lg:w-96'}`}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder={t('header.search.placeholder')}
              className="pl-10 border-ike-primary/20 focus:border-ike-primary text-sm"
              onBlur={() => isMobile && setIsSearchOpen(false)}
              autoFocus={isMobile && isSearchOpen}
            />
          </div>
        )}

        {/* Right side actions - Hidden on mobile when search is open */}
        <div className={`flex items-center space-x-1 sm:space-x-2 ${isMobile && isSearchOpen ? 'hidden' : 'flex'}`}>
          {/* Language Toggle - Hidden on small mobile */}
          <div className="hidden xs:block">
            <LanguageToggle />
          </div>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-ike-error text-white text-xs flex items-center justify-center min-w-[16px]"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-0 mr-2 sm:mr-4" align="end">
              <div className="border-b border-ike-neutral-light p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ike-neutral-dark text-sm sm:text-base">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs text-ike-primary hover:text-ike-primary-dark h-auto p-1"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-ike-neutral text-sm">
                    No notifications
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 sm:p-4 border-b border-ike-neutral-light/50 hover:bg-ike-neutral-light/30 transition-colors ${
                          !notification.isRead ? 'bg-ike-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between space-x-2">
                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className={`text-sm font-medium truncate ${
                                !notification.isRead ? 'text-ike-neutral-dark' : 'text-ike-neutral'
                              }`}>
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-ike-primary rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-ike-neutral leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-ike-neutral/70">
                              {notification.timestamp}
                            </p>
                          </div>
                          <div className="flex space-x-1 flex-shrink-0">
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
                    className="w-full text-ike-primary hover:text-ike-primary-dark hover:bg-ike-primary/5 text-sm"
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
              <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-ike-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium truncate max-w-[120px]">{user?.name || 'User'}</div>
                  <div className="text-xs text-ike-neutral truncate max-w-[120px]">
                    {user?.role === 'regional-admin' && 'Regional Admin'}
                    {user?.role === 'municipality-admin' && 'Municipality Admin'}
                    {user?.role === 'school-admin' && 'School Admin'}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 sm:w-56">
              <div className="sm:hidden px-3 py-2 border-b">
                <div className="text-sm font-medium">{user?.name || 'User'}</div>
                <div className="text-xs text-ike-neutral">
                  {user?.role === 'regional-admin' && 'Regional Admin'}
                  {user?.role === 'municipality-admin' && 'Municipality Admin'}
                  {user?.role === 'school-admin' && 'School Admin'}
                </div>
              </div>
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
      </div>
    </header>
  );
}
