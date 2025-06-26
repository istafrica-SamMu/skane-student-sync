import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Plus, Edit, Trash2, Settings, Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PERMISSIONS, ROLE_TEMPLATES } from "@/config/permissions";
import { OrganizationalRole } from "@/types/roleManagement";
import { RoleManagementViewManagement } from "@/components/system/RoleManagementViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";
import { useIsMobile } from "@/hooks/use-mobile";

const RoleManagement = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<OrganizationalRole | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [columns, setColumns] = useState<ViewColumn[]>([
    { key: 'roleType', label: 'Role Type', visible: true },
    { key: 'municipality', label: 'Municipality', visible: !isMobile },
    { key: 'schoolUnit', label: 'School Unit', visible: !isMobile },
    { key: 'principal', label: 'Principal', visible: false },
    { key: 'group', label: 'Group', visible: false },
    { key: 'permissions', label: 'Permissions', visible: true },
    { key: 'status', label: 'Status', visible: true },
  ]);
  const [filters, setFilters] = useState<ViewFilter[]>([]);

  const municipalities = ["Malmö Municipality", "Stockholm Municipality", "Göteborg Municipality"];
  const schoolUnits = ["Malmö Central Elementary", "Malmö North High School", "Malmö Tech Academy"];
  const principals = ["Anna Andersson", "Erik Eriksson", "Maria Nilsson"];
  const groups = ["Group A", "Group B", "Group C"];

  const [organizationalRoles, setOrganizationalRoles] = useState<OrganizationalRole[]>([
    {
      id: "1",
      roleType: "Municipality Administrator",
      municipality: "Malmö Municipality",
      permissions: PERMISSIONS.filter(p => ['municipal', 'regional'].includes(p.scope)),
      isActive: true,
      startDate: "2023-01-15",
      endDate: undefined
    },
    {
      id: "2", 
      roleType: "School Administrator",
      municipality: "Malmö Municipality",
      schoolUnit: "Malmö Central Elementary",
      permissions: PERMISSIONS.filter(p => ['school', 'regional'].includes(p.scope)),
      isActive: true,
      startDate: "2022-08-20",
      endDate: undefined
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

  // Apply filters to roles
  const applyFilters = (roles: OrganizationalRole[]) => {
    return roles.filter(role => {
      return filters.every(filter => {
        const fieldValue = String(role[filter.field as keyof OrganizationalRole] || '').toLowerCase();
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

  const [newRole, setNewRole] = useState({
    roleType: "",
    municipality: "",
    schoolUnit: "",
    principal: "",
    group: "",
    permissions: [] as string[],
    startDate: "",
    endDate: ""
  });

  const [editRole, setEditRole] = useState({
    id: "",
    roleType: "",
    municipality: "",
    schoolUnit: "",
    principal: "",
    group: "",
    permissions: [] as string[],
    startDate: "",
    endDate: "",
    isActive: true
  });

  const filteredRoles = applyFilters(organizationalRoles.filter(role =>
    role.roleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.municipality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.schoolUnit?.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleCreateRole = () => {
    const roleTemplate = ROLE_TEMPLATES.find(t => t.name === newRole.roleType);
    
    if (!roleTemplate) {
      toast({
        title: "Error",
        description: "Please select a valid role type.",
        variant: "destructive",
      });
      return;
    }

    const role: OrganizationalRole = {
      id: String(organizationalRoles.length + 1),
      roleType: newRole.roleType,
      municipality: newRole.municipality || undefined,
      schoolUnit: newRole.schoolUnit || undefined,
      principal: newRole.principal || undefined,
      group: newRole.group || undefined,
      permissions: PERMISSIONS.filter(p => newRole.permissions.includes(p.id)),
      isActive: true,
      startDate: newRole.startDate,
      endDate: newRole.endDate || undefined
    };

    setOrganizationalRoles([...organizationalRoles, role]);
    setNewRole({
      roleType: "",
      municipality: "",
      schoolUnit: "",
      principal: "",
      group: "",
      permissions: [],
      startDate: "",
      endDate: ""
    });
    setShowCreateRole(false);

    toast({
      title: "Role Created",
      description: "New organizational role has been successfully created.",
    });
  };

  const handleEditRole = (role: OrganizationalRole) => {
    setEditRole({
      id: role.id,
      roleType: role.roleType,
      municipality: role.municipality || "",
      schoolUnit: role.schoolUnit || "",
      principal: role.principal || "",
      group: role.group || "",
      permissions: role.permissions.map(p => p.id),
      startDate: role.startDate,
      endDate: role.endDate || "",
      isActive: role.isActive
    });
    setSelectedRole(role);
    setShowEditRole(true);
  };

  const handleUpdateRole = () => {
    if (!selectedRole) return;

    const updatedRole: OrganizationalRole = {
      id: editRole.id,
      roleType: editRole.roleType,
      municipality: editRole.municipality || undefined,
      schoolUnit: editRole.schoolUnit || undefined,
      principal: editRole.principal || undefined,
      group: editRole.group || undefined,
      permissions: PERMISSIONS.filter(p => editRole.permissions.includes(p.id)),
      isActive: editRole.isActive,
      startDate: editRole.startDate,
      endDate: editRole.endDate || undefined
    };

    setOrganizationalRoles(organizationalRoles.map(role => 
      role.id === selectedRole.id ? updatedRole : role
    ));
    
    setShowEditRole(false);
    setSelectedRole(null);

    toast({
      title: "Role Updated",
      description: "Organizational role has been successfully updated.",
    });
  };

  const handleDeleteRole = (roleId: string) => {
    setOrganizationalRoles(organizationalRoles.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "Organizational role has been successfully removed.",
      variant: "destructive",
    });
  };

  const getPermissionsByCategory = (category: string) => {
    return PERMISSIONS.filter(p => p.category === category);
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ike-primary leading-tight truncate">
            Role Management
          </h1>
          <p className="text-ike-neutral mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
            Manage organizational roles and permissions
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary/90 w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10"
          onClick={() => setShowCreateRole(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">Create Role</span>
          <span className="xs:hidden">Create</span>
        </Button>
      </div>

      {/* View Management Component - Now visible on all screen sizes */}
      <div className="w-full">
        <RoleManagementViewManagement
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
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            Organizational Roles
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Manage role assignments with organizational context and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search roles..."
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
                  <SheetTitle className="text-base sm:text-lg">Filter Roles</SheetTitle>
                  <SheetDescription className="text-sm">
                    Apply filters to find specific roles in the system.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-3 sm:gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="filter-role" className="text-sm">Role Type</Label>
                    <Input id="filter-role" placeholder="Filter by role type" className="text-sm h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-municipality" className="text-sm">Municipality</Label>
                    <Input id="filter-municipality" placeholder="Filter by municipality" className="text-sm h-9" />
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
              {filteredRoles.map((role) => (
                <Card key={role.id} className="border border-ike-neutral-light/50">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{role.roleType}</h3>
                        <p className="text-xs text-ike-neutral truncate">{role.municipality || 'No municipality'}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white" align="end">
                          <DropdownMenuItem onClick={() => handleEditRole(role)}>
                            <Edit className="w-3 h-3 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-3 h-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90vw] max-w-md mx-auto">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-base">Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-sm">
                                  This action cannot be undone. This will permanently delete the role
                                  "{role.roleType}" and remove all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                                <AlertDialogCancel className="text-sm h-9">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteRole(role.id)} className="text-sm h-9">
                                  Delete Role
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{role.permissions.length} permissions</Badge>
                        <Badge className={role.isActive ? 'bg-green-100 text-green-800 text-xs' : 'bg-red-100 text-red-800 text-xs'}>
                          {role.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      {role.schoolUnit && (
                        <p className="text-xs text-ike-neutral/70 truncate">{role.schoolUnit}</p>
                      )}
                      <p className="text-xs text-ike-neutral/60">Start: {role.startDate}</p>
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
                  {filteredRoles.map((role) => (
                    <tr key={role.id} className="border-b hover:bg-ike-neutral-light/50">
                      {columns.filter(col => col.visible).map((column) => (
                        <td key={column.key} className="p-4 text-sm">
                          {column.key === 'roleType' ? (
                            <span className="font-medium">{role.roleType}</span>
                          ) : column.key === 'municipality' ? (
                            <span className="text-ike-neutral">{role.municipality || '-'}</span>
                          ) : column.key === 'schoolUnit' ? (
                            <span className="text-ike-neutral">{role.schoolUnit || '-'}</span>
                          ) : column.key === 'principal' ? (
                            <span className="text-ike-neutral">{role.principal || '-'}</span>
                          ) : column.key === 'group' ? (
                            <span className="text-ike-neutral">{role.group || '-'}</span>
                          ) : column.key === 'permissions' ? (
                            <Badge variant="outline" className="text-xs">{role.permissions.length} permissions</Badge>
                          ) : column.key === 'status' ? (
                            <Badge className={role.isActive ? 'bg-green-100 text-green-800 text-xs' : 'bg-red-100 text-red-800 text-xs'}>
                              {role.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          ) : null}
                        </td>
                      ))}
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditRole(role)} className="text-sm h-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-sm h-8">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[95vw] max-w-md sm:max-w-lg mx-auto">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-base sm:text-lg">Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-sm">
                                  This action cannot be undone. This will permanently delete the role
                                  "{role.roleType}" and remove all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                                <AlertDialogCancel className="text-sm h-9">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteRole(role.id)} className="text-sm h-9">
                                  Delete Role
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredRoles.length === 0 && (
            <div className="text-center py-8">
              <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-ike-neutral mx-auto mb-4" />
              <p className="text-ike-neutral text-sm">No roles found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] max-h-[95vh] sm:max-h-[80vh] overflow-y-auto mx-auto">
          <DialogHeader className="space-y-2 pb-2">
            <DialogTitle className="text-base sm:text-lg font-semibold">Create Organizational Role</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Define a new role with organizational context and specific permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-2 sm:py-4 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto px-1">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="roleType" className="text-xs sm:text-sm font-medium sm:text-right">Role Type</Label>
              <Select value={newRole.roleType} onValueChange={(value) => setNewRole({...newRole, roleType: value})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.name} className="text-xs sm:text-sm">
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="municipality" className="text-xs sm:text-sm font-medium sm:text-right">Municipality</Label>
              <Select value={newRole.municipality} onValueChange={(value) => setNewRole({...newRole, municipality: value})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality} className="text-xs sm:text-sm">
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="schoolUnit" className="text-xs sm:text-sm font-medium sm:text-right">School Unit</Label>
              <Select value={newRole.schoolUnit} onValueChange={(value) => setNewRole({...newRole, schoolUnit: value})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue placeholder="Select school unit" />
                </SelectTrigger>
                <SelectContent>
                  {schoolUnits.map((school) => (
                    <SelectItem key={school} value={school} className="text-xs sm:text-sm">
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="startDate" className="text-xs sm:text-sm font-medium sm:text-right">Start Date</Label>
              <Input 
                id="startDate" 
                type="date" 
                className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9"
                value={newRole.startDate}
                onChange={(e) => setNewRole({...newRole, startDate: e.target.value})}
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-xs sm:text-sm font-medium">Permissions</Label>
              {['student_data', 'financial', 'administration', 'reports'].map(category => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-xs sm:text-sm capitalize">{category.replace('_', ' ')}</h4>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {getPermissionsByCategory(category).map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={permission.id}
                          checked={newRole.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewRole({...newRole, permissions: [...newRole.permissions, permission.id]});
                            } else {
                              setNewRole({...newRole, permissions: newRole.permissions.filter(p => p !== permission.id)});
                            }
                          }}
                        />
                        <Label htmlFor={permission.id} className="text-xs sm:text-sm">
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-2 sm:pt-4">
            <Button variant="outline" onClick={() => setShowCreateRole(false)} className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9">
              Cancel
            </Button>
            <Button onClick={handleCreateRole} className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9">
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showEditRole} onOpenChange={setShowEditRole}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] max-h-[95vh] sm:max-h-[80vh] overflow-y-auto mx-auto">
          <DialogHeader className="space-y-2 pb-2">
            <DialogTitle className="text-base sm:text-lg font-semibold">Edit Organizational Role</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Update role details, organizational context and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-2 sm:py-4 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto px-1">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="editRoleType" className="text-xs sm:text-sm font-medium sm:text-right">Role Type</Label>
              <Select value={editRole.roleType} onValueChange={(value) => setEditRole({...editRole, roleType: value})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.name} className="text-xs sm:text-sm">
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="editMunicipality" className="text-xs sm:text-sm font-medium sm:text-right">Municipality</Label>
              <Select value={editRole.municipality} onValueChange={(value) => setEditRole({...editRole, municipality: value})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality} className="text-xs sm:text-sm">
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="editSchoolUnit" className="text-xs sm:text-sm font-medium sm:text-right">School Unit</Label>
              <Select value={editRole.schoolUnit} onValueChange={(value) => setEditRole({...editRole, schoolUnit: value})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue placeholder="Select school unit" />
                </SelectTrigger>
                <SelectContent>
                  {schoolUnits.map((school) => (
                    <SelectItem key={school} value={school} className="text-xs sm:text-sm">
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="editStartDate" className="text-xs sm:text-sm font-medium sm:text-right">Start Date</Label>
              <Input 
                id="editStartDate" 
                type="date" 
                className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9"
                value={editRole.startDate}
                onChange={(e) => setEditRole({...editRole, startDate: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="editEndDate" className="text-xs sm:text-sm font-medium sm:text-right">End Date</Label>
              <Input 
                id="editEndDate" 
                type="date" 
                className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9"
                value={editRole.endDate}
                onChange={(e) => setEditRole({...editRole, endDate: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="editActive" className="text-xs sm:text-sm font-medium sm:text-right">Status</Label>
              <Select value={editRole.isActive ? "active" : "inactive"} onValueChange={(value) => setEditRole({...editRole, isActive: value === "active"})}>
                <SelectTrigger className="sm:col-span-3 text-xs sm:text-sm h-8 sm:h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" className="text-xs sm:text-sm">Active</SelectItem>
                  <SelectItem value="inactive" className="text-xs sm:text-sm">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-xs sm:text-sm font-medium">Permissions</Label>
              {['student_data', 'financial', 'administration', 'reports'].map(category => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-xs sm:text-sm capitalize">{category.replace('_', ' ')}</h4>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {getPermissionsByCategory(category).map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`edit-${permission.id}`}
                          checked={editRole.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setEditRole({...editRole, permissions: [...editRole.permissions, permission.id]});
                            } else {
                              setEditRole({...editRole, permissions: editRole.permissions.filter(p => p !== permission.id)});
                            }
                          }}
                        />
                        <Label htmlFor={`edit-${permission.id}`} className="text-xs sm:text-sm">
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-2 sm:pt-4">
            <Button variant="outline" onClick={() => setShowEditRole(false)} className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9">
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9">
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
