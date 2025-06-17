
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
  Plus
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

  // User management state
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Regional Admin",
      organization: "Region North",
      status: 'active',
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Municipality Admin",
      organization: "City Center",
      status: 'active',
      createdAt: "2024-02-10"
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Regional Admin",
      description: "Full system access and management",
      permissions: ["all"]
    },
    {
      id: "2",
      name: "Municipality Admin",
      description: "Municipal operations and reporting",
      permissions: ["municipal_admin", "reports", "students"]
    },
    {
      id: "3",
      name: "School Admin",
      description: "School-level administration",
      permissions: ["school_admin", "students", "basic_reports"]
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
      description: "User created successfully!",
    });
  };

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields!",
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
      description: "Role created successfully!",
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('settings.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('settings.subtitle')}
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
            {t('settings.users')}
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
                <h2 className="text-2xl font-bold text-ike-neutral-dark">User Management</h2>
                <p className="text-ike-neutral">Manage users and roles in your organization</p>
              </div>
              <div className="flex space-x-2">
                <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Shield className="mr-2 h-4 w-4" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                      <DialogDescription>
                        Define a new role with specific permissions for your organization.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input
                          id="role-name"
                          value={newRole.name}
                          onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., District Manager"
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
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingUser ? 'Edit User' : 'Create New User'}</DialogTitle>
                      <DialogDescription>
                        {editingUser ? 'Update user information and role assignment.' : 'Add a new user to your organization and assign them a role.'}
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
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
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
                        <Label htmlFor="user-organization">Organization (Optional)</Label>
                        <Input
                          id="user-organization"
                          value={newUser.organization}
                          onChange={(e) => setNewUser(prev => ({ ...prev, organization: e.target.value }))}
                          placeholder="Department or school name"
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
                  <span>System Roles</span>
                </CardTitle>
                <CardDescription>
                  Manage roles and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-ike-neutral">{role.description}</p>
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
                  <span>Users ({users.length})</span>
                </CardTitle>
                <CardDescription>
                  Manage user accounts and role assignments
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
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
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
