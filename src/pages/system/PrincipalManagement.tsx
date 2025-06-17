import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  Building2,
  Calendar,
  Search,
  Plus,
  Unlink
} from "lucide-react";

interface Principal {
  id: string;
  name: string;
  email: string;
  phone: string;
  personalNumber: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive';
  groups: Array<{
    id: string;
    name: string;
    municipality: string;
  }>;
}

interface Group {
  id: string;
  name: string;
  municipality: string;
  status: 'active' | 'inactive';
}

const PrincipalManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLinkGroupDialogOpen, setIsLinkGroupDialogOpen] = useState(false);
  const [selectedPrincipal, setSelectedPrincipal] = useState<Principal | null>(null);

  // Mock data
  const [principals, setPrincipals] = useState<Principal[]>([
    {
      id: '1',
      name: 'Anna Andersson',
      email: 'anna.andersson@example.com',
      phone: '+46 70 123 4567',
      personalNumber: '19801201-1234',
      address: {
        street: 'Skolvägen 15',
        postalCode: '12345',
        city: 'Stockholm',
        country: 'Sweden'
      },
      startDate: '2023-01-15',
      status: 'active',
      groups: [
        { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm' },
        { id: '2', name: 'Northern District Group', municipality: 'Stockholm' }
      ]
    },
    {
      id: '2',
      name: 'Erik Eriksson',
      email: 'erik.eriksson@example.com',
      phone: '+46 70 987 6543',
      personalNumber: '19750315-5678',
      address: {
        street: 'Rektorgatan 22',
        postalCode: '54321',
        city: 'Göteborg',
        country: 'Sweden'
      },
      startDate: '2022-08-20',
      status: 'active',
      groups: []
    }
  ]);

  const [availableGroups] = useState<Group[]>([
    { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm', status: 'active' },
    { id: '2', name: 'Northern District Group', municipality: 'Stockholm', status: 'active' },
    { id: '3', name: 'Göteborg West Group', municipality: 'Göteborg', status: 'active' },
    { id: '4', name: 'Malmö South Group', municipality: 'Malmö', status: 'active' }
  ]);

  const filteredPrincipals = principals.filter(principal =>
    principal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLinkGroup = (principalId: string, groupId: string) => {
    const group = availableGroups.find(g => g.id === groupId);
    if (!group) return;

    setPrincipals(prev => prev.map(principal => 
      principal.id === principalId
        ? {
            ...principal,
            groups: [...principal.groups, { id: group.id, name: group.name, municipality: group.municipality }]
          }
        : principal
    ));

    toast({
      title: "Group Linked",
      description: `Principal has been linked to ${group.name}`,
    });
  };

  const handleUnlinkGroup = (principalId: string, groupId: string) => {
    setPrincipals(prev => prev.map(principal => 
      principal.id === principalId
        ? {
            ...principal,
            groups: principal.groups.filter(g => g.id !== groupId)
          }
        : principal
    ));

    toast({
      title: "Group Unlinked",
      description: "Principal has been unlinked from the group",
    });
  };

  const handleEditPrincipal = (principal: Principal) => {
    setSelectedPrincipal(principal);
    setIsEditDialogOpen(true);
  };

  const handleDeletePrincipal = (principalId: string) => {
    const principal = principals.find(p => p.id === principalId);
    if (!principal) return;

    if (window.confirm(`Are you sure you want to delete "${principal.name}"? This action cannot be undone.`)) {
      setPrincipals(prev => prev.filter(p => p.id !== principalId));
      toast({
        title: "Principal Deleted",
        description: `${principal.name} has been deleted successfully`,
      });
    }
  };

  const openLinkDialog = (principal: Principal) => {
    setSelectedPrincipal(principal);
    setIsLinkGroupDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Principal Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage principals and their group affiliations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Principal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Principal</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="personalNumber">Personal Number</Label>
                <Input id="personalNumber" placeholder="YYYYMMDD-XXXX" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+46 70 123 4567" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Street, Postal Code, City, Country" />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-ike-primary hover:bg-ike-primary-dark">
                Add Principal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
          <Input
            placeholder="Search principals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPrincipals.map((principal) => (
          <Card key={principal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-ike-primary">{principal.name}</CardTitle>
                    <p className="text-sm text-ike-neutral">Personal Number: {principal.personalNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={principal.status === 'active' ? 'default' : 'secondary'}>
                    {principal.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditPrincipal(principal)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePrincipal(principal.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-ike-primary" />
                    <span>{principal.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-ike-primary" />
                    <span>{principal.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-ike-primary" />
                    <span>{principal.address.street}, {principal.address.city}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-ike-primary" />
                    <span>Start: {principal.startDate}</span>
                    {principal.endDate && <span>End: {principal.endDate}</span>}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ike-primary flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Group Affiliations ({principal.groups.length})
                    </h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openLinkDialog(principal)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Link Group
                    </Button>
                  </div>
                  
                  {principal.groups.length === 0 ? (
                    <p className="text-sm text-ike-neutral italic">No groups assigned</p>
                  ) : (
                    <div className="space-y-2">
                      {principal.groups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-2 bg-ike-neutral-light rounded">
                          <div>
                            <p className="font-medium text-sm">{group.name}</p>
                            <p className="text-xs text-ike-neutral">{group.municipality}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUnlinkGroup(principal.id, group.id)}
                          >
                            <Unlink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Principal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Principal - {selectedPrincipal?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="editName">Full Name</Label>
              <Input id="editName" defaultValue={selectedPrincipal?.name} placeholder="Enter full name" />
            </div>
            <div>
              <Label htmlFor="editPersonalNumber">Personal Number</Label>
              <Input id="editPersonalNumber" defaultValue={selectedPrincipal?.personalNumber} placeholder="YYYYMMDD-XXXX" />
            </div>
            <div>
              <Label htmlFor="editEmail">Email</Label>
              <Input id="editEmail" type="email" defaultValue={selectedPrincipal?.email} placeholder="email@example.com" />
            </div>
            <div>
              <Label htmlFor="editPhone">Phone</Label>
              <Input id="editPhone" defaultValue={selectedPrincipal?.phone} placeholder="+46 70 123 4567" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="editAddress">Address</Label>
              <Textarea 
                id="editAddress" 
                defaultValue={`${selectedPrincipal?.address?.street}, ${selectedPrincipal?.address?.postalCode} ${selectedPrincipal?.address?.city}, ${selectedPrincipal?.address?.country}`}
                placeholder="Street, Postal Code, City, Country" 
              />
            </div>
            <div>
              <Label htmlFor="editStartDate">Start Date</Label>
              <Input id="editStartDate" type="date" defaultValue={selectedPrincipal?.startDate} />
            </div>
            <div>
              <Label htmlFor="editEndDate">End Date (Optional)</Label>
              <Input id="editEndDate" type="date" defaultValue={selectedPrincipal?.endDate} />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark"
              onClick={() => {
                setIsEditDialogOpen(false);
                toast({
                  title: "Principal Updated",
                  description: "Principal information has been updated successfully",
                });
              }}
            >
              Update Principal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Group Dialog */}
      <Dialog open={isLinkGroupDialogOpen} onOpenChange={setIsLinkGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Group to {selectedPrincipal?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select Group</Label>
            <Select onValueChange={(groupId) => {
              if (selectedPrincipal) {
                handleLinkGroup(selectedPrincipal.id, groupId);
                setIsLinkGroupDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a group to link" />
              </SelectTrigger>
              <SelectContent>
                {availableGroups
                  .filter(group => !selectedPrincipal?.groups.some(g => g.id === group.id))
                  .map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name} ({group.municipality})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrincipalManagement;
