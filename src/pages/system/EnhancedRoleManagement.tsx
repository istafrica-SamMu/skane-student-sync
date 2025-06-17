
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Settings, Building, School, MapPin, Plus, Edit, Trash2, Search, Filter } from "lucide-react";
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
import { Municipality, SchoolUnit, Principal, Group, DataAccessRule } from "@/types/organizationalHierarchy";
import { OrganizationalHierarchy } from "@/components/OrganizationalHierarchy";

const EnhancedRoleManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<OrganizationalRole | null>(null);

  // Mock data for organizational hierarchy
  const [municipalities] = useState<Municipality[]>([
    {
      id: "1",
      name: "Malmö Municipality",
      code: "MAL",
      region: "Skåne",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    },
    {
      id: "2", 
      name: "Stockholm Municipality",
      code: "STO",
      region: "Stockholm",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    }
  ]);

  const [schoolUnits] = useState<SchoolUnit[]>([
    {
      id: "1",
      name: "Malmö Central Elementary",
      code: "MCE",
      municipalityId: "1",
      municipality: municipalities[0],
      type: "elementary",
      address: "Central Street 1, Malmö",
      principalId: "1",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    },
    {
      id: "2",
      name: "Malmö North High School",
      code: "MNH",
      municipalityId: "1",
      municipality: municipalities[0],
      type: "high",
      address: "North Avenue 15, Malmö",
      principalId: "2",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    }
  ]);

  const [principals] = useState<Principal[]>([
    {
      id: "1",
      name: "Anna Andersson",
      email: "anna.andersson@malmoe.se",
      socialSecurityNumber: "1975-04-12-1234",
      schoolUnits: [schoolUnits[0]],
      startDate: "2023-01-15",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    },
    {
      id: "2",
      name: "Erik Eriksson",
      email: "erik.eriksson@malmoe.se",
      socialSecurityNumber: "1980-08-20-5678",
      schoolUnits: [schoolUnits[1]],
      startDate: "2022-08-20",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    }
  ]);

  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "Class 5A",
      schoolUnitId: "1",
      schoolUnit: schoolUnits[0],
      grade: "5",
      academicYear: "2023-2024",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    },
    {
      id: "2",
      name: "Mathematics Year 1",
      schoolUnitId: "2",
      schoolUnit: schoolUnits[1],
      grade: "1",
      academicYear: "2023-2024",
      isActive: true,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01"
    }
  ]);

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

  const [dataAccessRules, setDataAccessRules] = useState<DataAccessRule[]>([
    {
      userId: "1",
      roleId: "1",
      municipalityIds: ["1"],
      schoolUnitIds: [],
      groupIds: [],
      canAccessRegionalStats: true,
      canAccessAllMunicipalData: true,
      restrictions: {
        studentDataScope: "municipal_only",
        financialDataScope: "municipal_only",
        reportsScope: "municipal_only"
      }
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
    endDate: "",
    dataAccessRule: {
      municipalityIds: [] as string[],
      schoolUnitIds: [] as string[],
      groupIds: [] as string[],
      canAccessRegionalStats: false,
      canAccessAllMunicipalData: false,
      restrictions: {
        studentDataScope: "none" as const,
        financialDataScope: "none" as const,
        reportsScope: "none" as const
      }
    }
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

    // Create corresponding data access rule
    const accessRule: DataAccessRule = {
      userId: "new-user", // This would be assigned when linking to a user
      roleId: role.id,
      municipalityIds: newRole.dataAccessRule.municipalityIds,
      schoolUnitIds: newRole.dataAccessRule.schoolUnitIds,
      groupIds: newRole.dataAccessRule.groupIds,
      canAccessRegionalStats: newRole.dataAccessRule.canAccessRegionalStats,
      canAccessAllMunicipalData: newRole.dataAccessRule.canAccessAllMunicipalData,
      restrictions: newRole.dataAccessRule.restrictions
    };

    setOrganizationalRoles([...organizationalRoles, role]);
    setDataAccessRules([...dataAccessRules, accessRule]);
    setNewRole({
      roleType: "",
      municipality: "",
      schoolUnit: "",
      principal: "",
      group: "",
      permissions: [],
      startDate: "",
      endDate: "",
      dataAccessRule: {
        municipalityIds: [],
        schoolUnitIds: [],
        groupIds: [],
        canAccessRegionalStats: false,
        canAccessAllMunicipalData: false,
        restrictions: {
          studentDataScope: "none",
          financialDataScope: "none",
          reportsScope: "none"
        }
      }
    });
    setShowCreateRole(false);

    toast({
      title: "Role Created",
      description: "New organizational role with enhanced permissions has been created.",
    });
  };

  const handleUpdateHierarchy = (type: string, data: any) => {
    // This would typically make API calls to update the backend
    console.log(`Adding new ${type}:`, data);
    
    toast({
      title: "Hierarchy Updated",
      description: `${type} has been added to the organizational hierarchy.`,
    });
  };

  const getPermissionsByCategory = (category: string) => {
    return PERMISSIONS.filter(p => p.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Enhanced Role Management</h1>
          <p className="text-ike-neutral">Manage roles with organizational hierarchy and granular permissions</p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary/90"
          onClick={() => setShowCreateRole(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Enhanced Role
        </Button>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="hierarchy">Organizational Hierarchy</TabsTrigger>
          <TabsTrigger value="access-rules">Data Access Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Enhanced Organizational Roles
              </CardTitle>
              <CardDescription>
                Manage role assignments with detailed organizational context and granular permissions
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
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
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
        </TabsContent>

        <TabsContent value="hierarchy">
          <OrganizationalHierarchy
            municipalities={municipalities}
            schoolUnits={schoolUnits}
            principals={principals}
            groups={groups}
            onUpdateHierarchy={handleUpdateHierarchy}
          />
        </TabsContent>

        <TabsContent value="access-rules">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Data Access Rules
              </CardTitle>
              <CardDescription>
                Granular data access controls based on organizational hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataAccessRules.map((rule, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="font-medium">Student Data Access</h4>
                        <Badge variant="outline">{rule.restrictions.studentDataScope}</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium">Financial Data Access</h4>
                        <Badge variant="outline">{rule.restrictions.financialDataScope}</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium">Reports Access</h4>
                        <Badge variant="outline">{rule.restrictions.reportsScope}</Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-4 text-sm text-ike-neutral">
                      <span>Municipalities: {rule.municipalityIds.length}</span>
                      <span>School Units: {rule.schoolUnitIds.length}</span>
                      <span>Groups: {rule.groupIds.length}</span>
                      <span>Regional Stats: {rule.canAccessRegionalStats ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Enhanced Role Dialog */}
      <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Enhanced Organizational Role</DialogTitle>
            <DialogDescription>
              Define a new role with detailed organizational context and granular data access permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Basic Role Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-ike-primary">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roleType">Role Type</Label>
                  <Select value={newRole.roleType} onValueChange={(value) => setNewRole({...newRole, roleType: value})}>
                    <SelectTrigger>
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
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={newRole.startDate}
                    onChange={(e) => setNewRole({...newRole, startDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Organizational Context */}
            <div className="space-y-4">
              <h3 className="font-medium text-ike-primary">Organizational Context</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="municipality">Municipality</Label>
                  <Select value={newRole.municipality} onValueChange={(value) => setNewRole({...newRole, municipality: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map((municipality) => (
                        <SelectItem key={municipality.id} value={municipality.name}>
                          {municipality.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="schoolUnit">School Unit</Label>
                  <Select value={newRole.schoolUnit} onValueChange={(value) => setNewRole({...newRole, schoolUnit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolUnits.map((school) => (
                        <SelectItem key={school.id} value={school.name}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Data Access Rules */}
            <div className="space-y-4">
              <h3 className="font-medium text-ike-primary">Data Access Permissions</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Student Data Scope</Label>
                  <Select 
                    value={newRole.dataAccessRule.restrictions.studentDataScope} 
                    onValueChange={(value: any) => setNewRole({
                      ...newRole, 
                      dataAccessRule: {
                        ...newRole.dataAccessRule,
                        restrictions: {
                          ...newRole.dataAccessRule.restrictions,
                          studentDataScope: value
                        }
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="assigned_only">Assigned Only</SelectItem>
                      <SelectItem value="school_only">School Only</SelectItem>
                      <SelectItem value="municipal_only">Municipal Only</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="system_wide">System Wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Financial Data Scope</Label>
                  <Select 
                    value={newRole.dataAccessRule.restrictions.financialDataScope}
                    onValueChange={(value: any) => setNewRole({
                      ...newRole, 
                      dataAccessRule: {
                        ...newRole.dataAccessRule,
                        restrictions: {
                          ...newRole.dataAccessRule.restrictions,
                          financialDataScope: value
                        }
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="school_only">School Only</SelectItem>
                      <SelectItem value="municipal_only">Municipal Only</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="system_wide">System Wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Reports Scope</Label>
                  <Select 
                    value={newRole.dataAccessRule.restrictions.reportsScope}
                    onValueChange={(value: any) => setNewRole({
                      ...newRole, 
                      dataAccessRule: {
                        ...newRole.dataAccessRule,
                        restrictions: {
                          ...newRole.dataAccessRule.restrictions,
                          reportsScope: value
                        }
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="assigned_only">Assigned Only</SelectItem>
                      <SelectItem value="school_only">School Only</SelectItem>
                      <SelectItem value="municipal_only">Municipal Only</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="system_wide">System Wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="regionalStats"
                    checked={newRole.dataAccessRule.canAccessRegionalStats}
                    onCheckedChange={(checked) => setNewRole({
                      ...newRole,
                      dataAccessRule: {
                        ...newRole.dataAccessRule,
                        canAccessRegionalStats: checked as boolean
                      }
                    })}
                  />
                  <Label htmlFor="regionalStats">Access Regional Statistics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="allMunicipalData"
                    checked={newRole.dataAccessRule.canAccessAllMunicipalData}
                    onCheckedChange={(checked) => setNewRole({
                      ...newRole,
                      dataAccessRule: {
                        ...newRole.dataAccessRule,
                        canAccessAllMunicipalData: checked as boolean
                      }
                    })}
                  />
                  <Label htmlFor="allMunicipalData">Access All Municipal Data</Label>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">System Permissions</Label>
              {['student_data', 'financial', 'administration', 'reports'].map(category => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm capitalize">{category.replace('_', ' ')}</h4>
                  <div className="grid grid-cols-2 gap-2 pl-4">
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
            <Button onClick={handleCreateRole}>Create Enhanced Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedRoleManagement;
