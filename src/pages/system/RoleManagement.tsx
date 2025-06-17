
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Plus, Edit, Trash2, Settings, Search, Filter } from "lucide-react";
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

const RoleManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<OrganizationalRole | null>(null);

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

  const filteredRoles = organizationalRoles.filter(role =>
    role.roleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.municipality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.schoolUnit?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Role Management</h1>
          <p className="text-ike-neutral">Manage organizational roles and permissions</p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary/90"
          onClick={() => setShowCreateRole(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Organizational Roles
          </CardTitle>
          <CardDescription>
            Manage role assignments with organizational context and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search roles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Role Type</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Municipality</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">School Unit</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Principal</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Group</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Permissions</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Status</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="border-b hover:bg-ike-neutral-light/50">
                    <td className="p-4 font-medium">{role.roleType}</td>
                    <td className="p-4 text-ike-neutral">{role.municipality || '-'}</td>
                    <td className="p-4 text-ike-neutral">{role.schoolUnit || '-'}</td>
                    <td className="p-4 text-ike-neutral">{role.principal || '-'}</td>
                    <td className="p-4 text-ike-neutral">{role.group || '-'}</td>
                    <td className="p-4">
                      <Badge variant="outline">{role.permissions.length} permissions</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={role.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {role.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteRole(role.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Organizational Role</DialogTitle>
            <DialogDescription>
              Define a new role with organizational context and specific permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roleType" className="text-right">Role Type</Label>
              <Select value={newRole.roleType} onValueChange={(value) => setNewRole({...newRole, roleType: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.name}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="municipality" className="text-right">Municipality</Label>
              <Select value={newRole.municipality} onValueChange={(value) => setNewRole({...newRole, municipality: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schoolUnit" className="text-right">School Unit</Label>
              <Select value={newRole.schoolUnit} onValueChange={(value) => setNewRole({...newRole, schoolUnit: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select school unit" />
                </SelectTrigger>
                <SelectContent>
                  {schoolUnits.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">Start Date</Label>
              <Input 
                id="startDate" 
                type="date" 
                className="col-span-3"
                value={newRole.startDate}
                onChange={(e) => setNewRole({...newRole, startDate: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Permissions</Label>
              {['student_data', 'financial', 'administration', 'reports'].map(category => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm capitalize">{category.replace('_', ' ')}</h4>
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
                        <Label htmlFor={permission.id} className="text-sm">
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateRole(false)}>Cancel</Button>
            <Button onClick={handleCreateRole}>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showEditRole} onOpenChange={setShowEditRole}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Organizational Role</DialogTitle>
            <DialogDescription>
              Update role details, organizational context and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editRoleType" className="text-right">Role Type</Label>
              <Select value={editRole.roleType} onValueChange={(value) => setEditRole({...editRole, roleType: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.name}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editMunicipality" className="text-right">Municipality</Label>
              <Select value={editRole.municipality} onValueChange={(value) => setEditRole({...editRole, municipality: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editSchoolUnit" className="text-right">School Unit</Label>
              <Select value={editRole.schoolUnit} onValueChange={(value) => setEditRole({...editRole, schoolUnit: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select school unit" />
                </SelectTrigger>
                <SelectContent>
                  {schoolUnits.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editStartDate" className="text-right">Start Date</Label>
              <Input 
                id="editStartDate" 
                type="date" 
                className="col-span-3"
                value={editRole.startDate}
                onChange={(e) => setEditRole({...editRole, startDate: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editEndDate" className="text-right">End Date</Label>
              <Input 
                id="editEndDate" 
                type="date" 
                className="col-span-3"
                value={editRole.endDate}
                onChange={(e) => setEditRole({...editRole, endDate: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editActive" className="text-right">Status</Label>
              <Select value={editRole.isActive ? "active" : "inactive"} onValueChange={(value) => setEditRole({...editRole, isActive: value === "active"})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Permissions</Label>
              {['student_data', 'financial', 'administration', 'reports'].map(category => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm capitalize">{category.replace('_', ' ')}</h4>
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
                        <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditRole(false)}>Cancel</Button>
            <Button onClick={handleUpdateRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
