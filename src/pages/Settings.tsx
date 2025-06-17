import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users,
  Check,
  X,
  Lock,
  Key,
  UserPlus,
  Shield,
  Trash2,
  Edit,
  Plus,
  GraduationCap,
  Building,
  FileText,
  BarChart3,
  Settings as SettingsIcon,
  DollarSign
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const Settings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  // Available permissions for municipal admin
  const availablePermissions: Permission[] = [
    {
      id: "students_view",
      name: "View Students", 
      description: "View student information and records",
      category: "Students",
      icon: GraduationCap
    },
    {
      id: "students_edit",
      name: "Edit Students",
      description: "Modify student information and enrollment",
      category: "Students", 
      icon: GraduationCap
    },
    {
      id: "students_create",
      name: "Create Students",
      description: "Add new student records",
      category: "Students",
      icon: GraduationCap
    },
    {
      id: "units_view",
      name: "View School Units",
      description: "View school unit details and information",
      category: "School Units",
      icon: Building
    },
    {
      id: "units_edit", 
      name: "Edit School Units",
      description: "Modify school unit details and settings",
      category: "School Units",
      icon: Building
    },
    {
      id: "reports_view",
      name: "View Reports",
      description: "Access municipal reports and statistics",
      category: "Reports",
      icon: BarChart3
    },
    {
      id: "reports_export",
      name: "Export Reports", 
      description: "Export reports and data",
      category: "Reports",
      icon: FileText
    },
    {
      id: "financial_view",
      name: "View Financial Data",
      description: "Access financial reports and data",
      category: "Financial",
      icon: DollarSign
    },
    {
      id: "financial_edit",
      name: "Edit Financial Data",
      description: "Modify financial information",
      category: "Financial", 
      icon: DollarSign
    },
    {
      id: "enrollment_manage",
      name: "Manage Enrollment",
      description: "Configure enrollment settings and periods",
      category: "Administration",
      icon: SettingsIcon
    },
    {
      id: "users_manage",
      name: "Manage Users",
      description: "Create and manage user accounts within municipality",
      category: "Administration",
      icon: Users
    }
  ];

  // Municipal-specific roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "School Principal",
      description: "Principal with full school management access",
      permissions: ["students_view", "students_edit", "units_view", "units_edit", "reports_view", "enrollment_manage"]
    },
    {
      id: "2", 
      name: "Administrative Staff",
      description: "Administrative staff with student and report access",
      permissions: ["students_view", "students_edit", "students_create", "reports_view", "reports_export"]
    },
    {
      id: "3",
      name: "Teacher",
      description: "Teacher with student viewing access",
      permissions: ["students_view", "reports_view"]
    },
    {
      id: "4",
      name: "Municipal Coordinator", 
      description: "Municipal coordinator with broad access",
      permissions: ["students_view", "students_edit", "units_view", "reports_view", "reports_export", "financial_view", "enrollment_manage"]
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Lars Andersson",
      email: "lars.andersson@malmoe.se",
      role: "School Principal",
      organization: "Malmö Central Elementary",
      status: 'active',
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Sofia Eriksson", 
      email: "sofia.eriksson@malmoe.se",
      role: "Administrative Staff",
      organization: "Malmö North High School",
      status: 'active',
      createdAt: "2024-02-10"
    },
    {
      id: "3",
      name: "Michael Johansson",
      email: "michael.johansson@malmoe.se", 
      role: "Teacher",
      organization: "Malmö Tech Academy",
      status: 'active',
      createdAt: "2024-03-05"
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    password: ""
  });

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });

  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match!",
        variant: "destructive"
      });
      return;
    }

    if (!passwordMeetsRequirements(passwordData.newPassword)) {
      toast({
        title: "Error",
        description: "Password does not meet security requirements!",
        variant: "destructive"
      });
      return;
    }

    // Simulate password change
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setIsPasswordDialogOpen(false);
    }, 1000);
  };

  const passwordMeetsRequirements = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*]/.test(password);
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields!",
        variant: "destructive"
      });
      return;
    }

    const user: User = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      organization: newUser.organization,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "", organization: "", password: "" });
    setIsUserDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Municipal user created successfully!",
    });
  };

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description || newRole.permissions.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one permission!",
        variant: "destructive"
      });
      return;
    }

    const role: Role = {
      id: (roles.length + 1).toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions
    };

    setRoles([...roles, role]);
    setNewRole({ name: "", description: "", permissions: [] });
    setIsRoleDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Municipal role created successfully!",
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully!",
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization || "",
      password: ""
    });
    setIsUserDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { ...user, name: newUser.name, email: newUser.email, role: newUser.role, organization: newUser.organization }
        : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
    setNewUser({ name: "", email: "", role: "", organization: "", password: "" });
    setIsUserDialogOpen(false);
    
    toast({
      title: "Success",
      description: "User updated successfully!",
    });
  };

  const handlePermissionToggle = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {};
    availablePermissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('settings.title')}</h1>
          <p className="text-ike-neutral mt-2">
            Municipal Administration Settings
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="password" className="w-full">
        <TabsList>
          <TabsTrigger value="password">
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Municipal Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-ike-primary" />
                <span>Change Password</span>
              </CardTitle>
              <CardDescription>
                Update your account password. Password must meet security requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Repeat New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
              
              {/* Password Requirements */}
              <div className="p-4 border border-ike-neutral-light rounded-lg bg-ike-neutral-light/30">
                <h4 className="font-medium text-ike-neutral-dark mb-3">Password Requirements:</h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center space-x-2 ${passwordData.newPassword.length >= 8 ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {passwordData.newPassword.length >= 8 ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>At least 8 characters long</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[A-Z]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[A-Z]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[a-z]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[a-z]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[0-9]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[0-9]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains number</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[!@#$%^&*]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[!@#$%^&*]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains special character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>

              <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    disabled={!passwordMeetsRequirements(passwordData.newPassword) || passwordData.newPassword !== passwordData.confirmPassword || !passwordData.currentPassword}
                    className="w-full"
                  >
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Password Change</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to change your password? You will need to log in again with your new password.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePasswordChange}>
                      Change Password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ike-neutral-dark">Municipal User Management</h2>
                <p className="text-ike-neutral">Manage users and roles within your municipality</p>
              </div>
              <div className="flex space-x-2">
                <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Shield className="mr-2 h-4 w-4" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Municipal Role</DialogTitle>
                      <DialogDescription>
                        Define a new role with specific permissions for your municipal users.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input
                          id="role-name"
                          value={newRole.name}
                          onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., District Coordinator"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role-description">Description</Label>
                        <Input
                          id="role-description"
                          value={newRole.description}
                          onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Brief description of the role"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Permissions</Label>
                        <div className="space-y-6">
                          {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => (
                            <div key={category} className="space-y-3">
                              <h4 className="font-medium text-ike-primary flex items-center space-x-2">
                                <permissions[0].icon className="w-4 h-4" />
                                <span>{category}</span>
                              </h4>
                              <div className="grid grid-cols-1 gap-3 pl-6">
                                {permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-start space-x-3">
                                    <Checkbox
                                      id={permission.id}
                                      checked={newRole.permissions.includes(permission.id)}
                                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                                    />
                                    <div className="space-y-1">
                                      <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                                        {permission.name}
                                      </Label>
                                      <p className="text-sm text-ike-neutral">{permission.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateRole}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Role
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-ike-primary hover:bg-ike-primary/90">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingUser ? 'Edit Municipal User' : 'Create New Municipal User'}</DialogTitle>
                      <DialogDescription>
                        {editingUser ? 'Update user information and role assignment.' : 'Add a new user to your municipality and assign them a role.'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          value={newUser.name}
                          onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input
                          id="user-email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@malmoe.se"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a municipal role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.name}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-organization">School/Department</Label>
                        <Input
                          id="user-organization"
                          value={newUser.organization}
                          onChange={(e) => setNewUser(prev => ({ ...prev, organization: e.target.value }))}
                          placeholder="Malmö Central Elementary"
                        />
                      </div>
                      {!editingUser && (
                        <div className="space-y-2">
                          <Label htmlFor="user-password">Temporary Password</Label>
                          <Input
                            id="user-password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="User will be prompted to change"
                          />
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {
                        setIsUserDialogOpen(false);
                        setEditingUser(null);
                        setNewUser({ name: "", email: "", role: "", organization: "", password: "" });
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={editingUser ? handleUpdateUser : handleCreateUser}>
                        {editingUser ? 'Update User' : 'Create User'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Roles Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-ike-primary" />
                  <span>Municipal Roles</span>
                </CardTitle>
                <CardDescription>
                  Manage roles and their permissions within your municipality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-ike-neutral">{role.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {role.permissions.slice(0, 3).map(permissionId => {
                            const permission = availablePermissions.find(p => p.id === permissionId);
                            return permission ? (
                              <span key={permissionId} className="px-2 py-1 bg-ike-primary/10 text-ike-primary rounded text-xs">
                                {permission.name}
                              </span>
                            ) : null;
                          })}
                          {role.permissions.length > 3 && (
                            <span className="px-2 py-1 bg-ike-neutral-light text-ike-neutral rounded text-xs">
                              +{role.permissions.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-ike-primary" />
                  <span>Municipal Users ({users.length})</span>
                </CardTitle>
                <CardDescription>
                  Manage user accounts and role assignments within your municipality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-ike-neutral">{user.email}</p>
                          </div>
                          <div className="px-2 py-1 bg-ike-primary/10 text-ike-primary rounded text-sm">
                            {user.role}
                          </div>
                          {user.organization && (
                            <div className="px-2 py-1 bg-ike-neutral-light text-ike-neutral rounded text-sm">
                              {user.organization}
                            </div>
                          )}
                          <div className={`px-2 py-1 rounded text-sm ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </div>
                        </div>
                        <p className="text-xs text-ike-neutral mt-1">Created: {user.createdAt}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Municipal User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
