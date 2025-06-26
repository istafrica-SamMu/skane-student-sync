import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Filter, Edit, Trash2, Mail, Shield, MoreVertical, Calendar, IdCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SystemUsersViewManagement } from "@/components/system/SystemUsersViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";
import { useIsMobile } from "@/hooks/use-mobile";

const UserManagement = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isViewRolesOpen, setIsViewRolesOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newUserRole, setNewUserRole] = useState("");
  const [editUserRole, setEditUserRole] = useState("");

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [columns, setColumns] = useState<ViewColumn[]>([
    { key: 'username', label: 'Username', visible: true },
    { key: 'name', label: 'Name', visible: true },
    { key: 'email', label: 'Email', visible: !isMobile },
    { key: 'socialSecurityNumber', label: 'SSN', visible: false },
    { key: 'role', label: 'Role', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'startDate', label: 'Start Date', visible: !isMobile },
    { key: 'lastLogin', label: 'Last Login', visible: !isMobile },
  ]);
  const [filters, setFilters] = useState<ViewFilter[]>([]);

  const roles = [
    "Municipality Admin",
    "School Admin", 
    "Regional Admin",
    "Teacher",
    "Administrative Staff",
    "School Principal"
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "anna.andersson",
      socialSecurityNumber: "1985-04-12-1234",
      name: "Anna Andersson",
      email: "anna.andersson@malmoe.se",
      role: "Municipality Admin",
      organization: "Malmö Municipality",
      status: "Active",
      startDate: "2023-01-15",
      endDate: null,
      lastLogin: "2024-06-10 14:30",
      activeRoles: ["Municipality Admin", "Regional Coordinator"],
      inactiveRoles: ["Teacher"]
    },
    {
      id: 2,
      username: "erik.eriksson",
      socialSecurityNumber: "1978-09-23-5678",
      name: "Erik Eriksson",
      email: "erik@skola.se",
      role: "School Admin",
      organization: "Malmö International School",
      status: "Active",
      startDate: "2022-08-20",
      endDate: null,
      lastLogin: "2024-06-11 09:15",
      activeRoles: ["School Admin"],
      inactiveRoles: []
    },
    {
      id: 3,
      username: "maria.nilsson",
      socialSecurityNumber: "1990-11-05-9012",
      name: "Maria Nilsson",
      email: "maria.nilsson@region.se",
      role: "Regional Admin",
      organization: "Skåne Regional Platform",
      status: "Inactive",
      startDate: "2021-03-10",
      endDate: "2024-05-30",
      lastLogin: "2024-05-25 16:45",
      activeRoles: [],
      inactiveRoles: ["Regional Admin", "System Administrator"]
    }
  ]);

  // View Management Functions
  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: `view-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedViews([...savedViews, newView]);
    setCurrentView(newView);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setColumns(view.columns);
    setFilters(view.filters);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(v => v.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(undefined);
    }
  };

  // Apply filters to users
  const applyFilters = (users: any[]) => {
    return users.filter(user => {
      return filters.every(filter => {
        const fieldValue = String(user[filter.field]).toLowerCase();
        const filterValue = String(filter.value).toLowerCase();
        
        switch (filter.operator) {
          case 'equals':
            return fieldValue === filterValue;
          case 'contains':
            return fieldValue.includes(filterValue);
          case 'startsWith':
            return fieldValue.startsWith(filterValue);
          case 'endsWith':
            return fieldValue.endsWith(filterValue);
          default:
            return true;
        }
      });
    });
  };

  const filteredUsers = applyFilters(users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleAddUser = () => {
    toast({
      title: "User Added",
      description: "New user has been successfully added to the system.",
    });
    setIsAddUserOpen(false);
    setNewUserRole("");
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUserRole(user.role);
    setIsEditUserOpen(true);
  };

  const handleViewRoles = (user) => {
    setSelectedUser(user);
    setIsViewRolesOpen(true);
  };

  const handleUpdateUser = () => {
    toast({
      title: "User Updated",
      description: "User information has been successfully updated.",
    });
    setIsEditUserOpen(false);
    setSelectedUser(null);
    setEditUserRole("");
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been successfully removed from the system.",
      variant: "destructive",
    });
  };

  const handleSendEmail = (user) => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${user.name} at ${user.email}`,
    });
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ike-primary leading-tight truncate">
            User Management
          </h1>
          <p className="text-ike-neutral mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
            Manage system users and their permissions
          </p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90 w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10">
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Add User</span>
              <span className="xs:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Add New User</DialogTitle>
              <DialogDescription className="text-sm">
                Add a new user to the system. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 sm:gap-4 py-4 max-h-[50vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="username" className="sm:text-right text-sm">
                  Username
                </Label>
                <Input id="username" placeholder="Enter username" className="sm:col-span-3 text-sm h-9" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="ssn" className="sm:text-right text-sm">
                  SSN
                </Label>
                <Input id="ssn" placeholder="YYYY-MM-DD-XXXX" className="sm:col-span-3 text-sm h-9" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="name" className="sm:text-right text-sm">
                  Name
                </Label>
                <Input id="name" placeholder="Enter full name" className="sm:col-span-3 text-sm h-9" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="email" className="sm:text-right text-sm">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter email address" className="sm:col-span-3 text-sm h-9" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="startDate" className="sm:text-right text-sm">
                  Start Date
                </Label>
                <Input id="startDate" type="date" className="sm:col-span-3 text-sm h-9" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="endDate" className="sm:text-right text-sm">
                  End Date
                </Label>
                <Input id="endDate" type="date" className="sm:col-span-3 text-sm h-9" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="role" className="sm:text-right text-sm">
                  Role
                </Label>
                <Select value={newUserRole} onValueChange={setNewUserRole}>
                  <SelectTrigger className="sm:col-span-3 text-sm h-9">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role} className="text-sm">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="organization" className="sm:text-right text-sm">
                  Organization
                </Label>
                <Input id="organization" placeholder="Enter organization" className="sm:col-span-3 text-sm h-9" />
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button type="submit" onClick={handleAddUser} className="w-full sm:w-auto text-sm h-9">
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Management Component */}
      <div className="hidden sm:block">
        <SystemUsersViewManagement
          views={savedViews}
          currentView={currentView}
          onSaveView={handleSaveView}
          onLoadView={handleLoadView}
          onDeleteView={handleDeleteView}
          columns={columns}
          filters={filters}
          onColumnsChange={setColumns}
          onFiltersChange={setFilters}
        />
      </div>

      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            System Users
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Manage user accounts with complete profile information and role assignments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search users..."
                className="pl-8 sm:pl-10 text-sm h-9 sm:h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto text-sm h-9 sm:h-10">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-96">
                <SheetHeader>
                  <SheetTitle className="text-base sm:text-lg">Filter Users</SheetTitle>
                  <SheetDescription className="text-sm">
                    Apply filters to find specific users in the system.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-3 sm:gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="filter-role" className="text-sm">Role</Label>
                    <Input id="filter-role" placeholder="Filter by role" className="text-sm h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-org" className="text-sm">Organization</Label>
                    <Input id="filter-org" placeholder="Filter by organization" className="text-sm h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-status" className="text-sm">Status</Label>
                    <Input id="filter-status" placeholder="Filter by status" className="text-sm h-9" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button onClick={() => setIsFilterOpen(false)} className="text-sm h-9">Apply Filters</Button>
                    <Button variant="outline" onClick={() => setIsFilterOpen(false)} className="text-sm h-9">Clear</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Card View */}
          {isMobile ? (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="border border-ike-neutral-light/50">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{user.name}</h3>
                        <p className="text-xs text-ike-neutral truncate">@{user.username}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white" align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-3 h-3 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewRoles(user)}>
                            <Shield className="w-3 h-3 mr-2" />
                            View Roles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendEmail(user)}>
                            <Mail className="w-3 h-3 mr-2" />
                            Email
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-3 h-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90vw] max-w-md">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-base">Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-sm">
                                  This action cannot be undone. This will permanently delete the user
                                  account for {user.name} and remove all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                                <AlertDialogCancel className="text-sm h-9">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="text-sm h-9">
                                  Delete User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{user.role}</Badge>
                        <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800 text-xs' : 'bg-red-100 text-red-800 text-xs'}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-ike-neutral truncate">{user.email}</p>
                      <p className="text-xs text-ike-neutral/70 truncate">{user.organization}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.filter(col => col.visible).map((column) => (
                      <th key={column.key} className="text-left p-4 font-medium text-ike-neutral-dark text-sm">
                        {column.label}
                      </th>
                    ))}
                    <th className="text-left p-4 font-medium text-ike-neutral-dark text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-ike-neutral-light/50">
                      {columns.filter(col => col.visible).map((column) => (
                        <td key={column.key} className="p-4 text-sm">
                          {column.key === 'role' ? (
                            <Badge variant="outline" className="text-xs">{user[column.key]}</Badge>
                          ) : column.key === 'status' ? (
                            <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800 text-xs' : 'bg-red-100 text-red-800 text-xs'}>
                              {user.status}
                            </Badge>
                          ) : column.key === 'username' || column.key === 'name' ? (
                            <span className="font-medium">{user[column.key]}</span>
                          ) : (
                            <span className={['email', 'socialSecurityNumber', 'startDate', 'lastLogin'].includes(column.key) ? 'text-ike-neutral' : ''}>
                              {user[column.key]}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="text-sm h-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewRoles(user)}>
                              <Shield className="w-4 h-4 mr-2" />
                              View Roles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendEmail(user)}>
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user
                                    account for {user.name} and remove all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                    Delete User
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-ike-neutral mx-auto mb-4" />
              <p className="text-ike-neutral text-sm">No users found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Edit User</DialogTitle>
            <DialogDescription className="text-sm">
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-3 sm:gap-4 py-4 max-h-[50vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-username" className="sm:text-right text-sm">
                  Username
                </Label>
                <Input 
                  id="edit-username" 
                  defaultValue={selectedUser.username} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-name" className="sm:text-right text-sm">
                  Name
                </Label>
                <Input 
                  id="edit-name" 
                  defaultValue={selectedUser.name} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-email" className="sm:text-right text-sm">
                  Email
                </Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  defaultValue={selectedUser.email} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-ssn" className="sm:text-right text-sm">
                  SSN
                </Label>
                <Input 
                  id="edit-ssn" 
                  defaultValue={selectedUser.socialSecurityNumber} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-role" className="sm:text-right text-sm">
                  Role
                </Label>
                <Select value={editUserRole} onValueChange={setEditUserRole}>
                  <SelectTrigger className="sm:col-span-3 text-sm h-9">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role} className="text-sm">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-startDate" className="sm:text-right text-sm">
                  Start Date
                </Label>
                <Input 
                  id="edit-startDate" 
                  type="date" 
                  defaultValue={selectedUser.startDate} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-endDate" className="sm:text-right text-sm">
                  End Date
                </Label>
                <Input 
                  id="edit-endDate" 
                  type="date" 
                  defaultValue={selectedUser.endDate || ""} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit-organization" className="sm:text-right text-sm">
                  Organization
                </Label>
                <Input 
                  id="edit-organization" 
                  defaultValue={selectedUser.organization} 
                  className="sm:col-span-3 text-sm h-9" 
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button type="submit" onClick={handleUpdateUser} className="w-full sm:w-auto text-sm h-9">
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Roles Dialog */}
      <Dialog open={isViewRolesOpen} onOpenChange={setIsViewRolesOpen}>
        <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              Role Assignments - {selectedUser?.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              View active and inactive role assignments for this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  Active Roles
                </h4>
                <div className="space-y-2">
                  {selectedUser.activeRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg border">
                      <Badge className="bg-green-100 text-green-800 text-xs">{role}</Badge>
                      <span className="text-xs sm:text-sm text-green-600">Active</span>
                    </div>
                  ))}
                  {selectedUser.activeRoles.length === 0 && (
                    <p className="text-ike-neutral italic text-sm">No active roles assigned</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <IdCard className="w-3 h-3 sm:w-4 sm:h-4" />
                  Inactive Roles
                </h4>
                <div className="space-y-2">
                  {selectedUser.inactiveRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg border">
                      <Badge variant="outline" className="text-red-700 border-red-200 text-xs">{role}</Badge>
                      <span className="text-xs sm:text-sm text-red-600">Inactive</span>
                    </div>
                  ))}
                  {selectedUser.inactiveRoles.length === 0 && (
                    <p className="text-ike-neutral italic text-sm">No inactive roles</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewRolesOpen(false)} className="w-full sm:w-auto text-sm h-9">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
