import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Filter, Edit, Trash2, MoreVertical } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";
import { MunicipalUsersViewManagement } from "@/components/operations/MunicipalUsersViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

const MunicipalUserAdmin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "",
    school: ""
  });

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [columns, setColumns] = useState<ViewColumn[]>([
    { key: 'name', label: 'Name', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'role', label: 'Role', visible: true },
    { key: 'school', label: 'School', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'lastLogin', label: 'Last Login', visible: true },
  ]);
  const [filters, setFilters] = useState<ViewFilter[]>([]);

  const roles = [
    "School Principal",
    "Administrative Staff", 
    "Teacher",
    "Municipal Coordinator",
    "IT Administrator"
  ];

  const schools = [
    "Malmö Central Elementary",
    "Malmö North High School", 
    "Malmö Tech Academy",
    "Malmö International School",
    "Malmö Arts College",
    "Malmö Science Institute"
  ];

  const [municipalUsers, setMunicipalUsers] = useState([
    {
      id: 1,
      name: "Lars Andersson",
      email: "lars.andersson@malmoe.se",
      role: "School Principal",
      school: "Malmö Central Elementary",
      status: "Active",
      lastLogin: "2024-06-12",
      permissions: ["Student Management", "Staff Management"]
    },
    {
      id: 2,
      name: "Sofia Eriksson",
      email: "sofia.eriksson@malmoe.se",
      role: "Administrative Staff",
      school: "Malmö North High School",
      status: "Active",
      lastLogin: "2024-06-11",
      permissions: ["Student Records", "Reports"]
    },
    {
      id: 3,
      name: "Michael Johansson",
      email: "michael.johansson@malmoe.se",
      role: "Teacher",
      school: "Malmö Tech Academy",
      status: "Pending",
      lastLogin: "Never",
      permissions: ["Class Management"]
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

  const filteredUsers = applyFilters(municipalUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.school.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleAddUser = () => {
    if (!newUserData.name || !newUserData.email || !newUserData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, email, role).",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: municipalUsers.length + 1,
      ...newUserData,
      status: "Active",
      lastLogin: "Never",
      permissions: []
    };

    setMunicipalUsers([...municipalUsers, newUser]);
    setNewUserData({ name: "", email: "", role: "", school: "" });
    setShowAddUser(false);
    
    toast({
      title: "User Added",
      description: "New municipal user has been successfully added to the system.",
    });
    console.log("Adding new municipal user");
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
    setShowEditUser(true);
    console.log("Opening edit modal for user:", user.name);
  };

  const handleUpdateUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, email, role).",
        variant: "destructive",
      });
      return;
    }

    setMunicipalUsers(municipalUsers.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    
    setShowEditUser(false);
    setEditingUser(null);
    
    toast({
      title: "User Updated",
      description: `${editingUser.name} has been successfully updated.`,
    });
    
    console.log("Updated user:", editingUser);
  };

  const handleDeleteUser = (userId) => {
    setMunicipalUsers(municipalUsers.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "Municipal user has been successfully removed from the system.",
      variant: "destructive",
    });
    console.log("Deleted user with ID:", userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipal User Administration</h1>
          <p className="text-ike-neutral">Manage user accounts within your municipality</p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary/90"
          onClick={() => setShowAddUser(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* View Management Component */}
      <MunicipalUsersViewManagement
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Municipal Users
          </CardTitle>
          <CardDescription>
            Manage all user accounts within your municipal school system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search users..."
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
                  {columns.filter(col => col.visible).map((column) => (
                    <th key={column.key} className="text-left p-4 font-medium text-ike-neutral-dark">
                      {column.label}
                    </th>
                  ))}
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-ike-neutral-light/50">
                    {columns.filter(col => col.visible).map((column) => (
                      <td key={column.key} className="p-4">
                        {column.key === 'role' ? (
                          <Badge variant="outline">{user[column.key]}</Badge>
                        ) : column.key === 'status' ? (
                          <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {user.status}
                          </Badge>
                        ) : column.key === 'name' ? (
                          <span className="font-medium">{user[column.key]}</span>
                        ) : (
                          <span className={column.key === 'email' || column.key === 'school' || column.key === 'lastLogin' ? 'text-ike-neutral' : ''}>
                            {user[column.key]}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
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

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-ike-neutral mx-auto mb-4" />
              <p className="text-ike-neutral">No users found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Municipal User</DialogTitle>
            <DialogDescription>
              Add a new user to the municipal system. Fill in all the required information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input 
                id="name" 
                placeholder="Enter full name" 
                className="col-span-3"
                value={newUserData.name}
                onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter email address" 
                className="col-span-3"
                value={newUserData.email}
                onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role *
              </Label>
              <Select 
                value={newUserData.role} 
                onValueChange={(value) => setNewUserData({...newUserData, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="school" className="text-right">
                School
              </Label>
              <Select 
                value={newUserData.school} 
                onValueChange={(value) => setNewUserData({...newUserData, school: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Municipal User</DialogTitle>
            <DialogDescription>
              Update user information and settings for {editingUser?.name}.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name *
                </Label>
                <Input 
                  id="edit-name" 
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email *
                </Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role *
                </Label>
                <Select 
                  value={editingUser.role} 
                  onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-school" className="text-right">
                  School
                </Label>
                <Select 
                  value={editingUser.school} 
                  onValueChange={(value) => setEditingUser({...editingUser, school: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalUserAdmin;
