
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Unlink,
  CreditCard,
  DollarSign,
  Hash
} from "lucide-react";

interface Principal {
  id: string;
  name: string;
  email: string;
  phone: string;
  personalNumber: string;
  organizationNumber: string;
  bankgiro: string;
  postgiro: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive';
  municipalityCode: string;
  municipalityName: string;
  additionalAmount: number;
  groups: Array<{
    id: string;
    name: string;
    municipality: string;
  }>;
  schoolUnits: Array<{
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

interface SchoolUnit {
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
  const [isLinkSchoolDialogOpen, setIsLinkSchoolDialogOpen] = useState(false);
  const [selectedPrincipal, setSelectedPrincipal] = useState<Principal | null>(null);

  // Mock data
  const [principals, setPrincipals] = useState<Principal[]>([
    {
      id: '1',
      name: 'Anna Andersson',
      email: 'anna.andersson@example.com',
      phone: '+46 70 123 4567',
      personalNumber: '19801201-1234',
      organizationNumber: '556123-4567',
      bankgiro: '123-4567',
      postgiro: '12 34 56-7',
      address: {
        street: 'Skolvägen 15',
        postalCode: '12345',
        city: 'Stockholm',
        country: 'Sweden'
      },
      startDate: '2023-01-15',
      status: 'active',
      municipalityCode: '0180',
      municipalityName: 'Stockholm',
      additionalAmount: 15000,
      groups: [
        { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm' },
        { id: '2', name: 'Northern District Group', municipality: 'Stockholm' }
      ],
      schoolUnits: [
        { id: '1', name: 'Stockholm Central School', municipality: 'Stockholm' }
      ]
    },
    {
      id: '2',
      name: 'Erik Eriksson',
      email: 'erik.eriksson@example.com',
      phone: '+46 70 987 6543',
      personalNumber: '19750315-5678',
      organizationNumber: '556987-6543',
      bankgiro: '987-6543',
      postgiro: '98 76 54-3',
      address: {
        street: 'Rektorgatan 22',
        postalCode: '54321',
        city: 'Göteborg',
        country: 'Sweden'
      },
      startDate: '2022-08-20',
      status: 'active',
      municipalityCode: '1480',
      municipalityName: 'Göteborg',
      additionalAmount: 22000,
      groups: [],
      schoolUnits: []
    }
  ]);

  const [availableGroups] = useState<Group[]>([
    { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm', status: 'active' },
    { id: '2', name: 'Northern District Group', municipality: 'Stockholm', status: 'active' },
    { id: '3', name: 'Göteborg West Group', municipality: 'Göteborg', status: 'active' },
    { id: '4', name: 'Malmö South Group', municipality: 'Malmö', status: 'active' }
  ]);

  const [availableSchoolUnits] = useState<SchoolUnit[]>([
    { id: '1', name: 'Stockholm Central School', municipality: 'Stockholm', status: 'active' },
    { id: '2', name: 'Northern District School', municipality: 'Stockholm', status: 'active' },
    { id: '3', name: 'Göteborg West School', municipality: 'Göteborg', status: 'active' },
    { id: '4', name: 'Malmö South School', municipality: 'Malmö', status: 'active' }
  ]);

  const filteredPrincipals = principals.filter(principal =>
    principal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.organizationNumber.includes(searchTerm)
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

  const handleLinkSchoolUnit = (principalId: string, schoolUnitId: string) => {
    const schoolUnit = availableSchoolUnits.find(s => s.id === schoolUnitId);
    if (!schoolUnit) return;

    setPrincipals(prev => prev.map(principal => 
      principal.id === principalId
        ? {
            ...principal,
            schoolUnits: [...principal.schoolUnits, { id: schoolUnit.id, name: schoolUnit.name, municipality: schoolUnit.municipality }]
          }
        : principal
    ));

    toast({
      title: "School Unit Linked",
      description: `Principal has been linked to ${schoolUnit.name}`,
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

  const handleUnlinkSchoolUnit = (principalId: string, schoolUnitId: string) => {
    setPrincipals(prev => prev.map(principal => 
      principal.id === principalId
        ? {
            ...principal,
            schoolUnits: principal.schoolUnits.filter(s => s.id !== schoolUnitId)
          }
        : principal
    ));

    toast({
      title: "School Unit Unlinked",
      description: "Principal has been unlinked from the school unit",
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

  const openLinkGroupDialog = (principal: Principal) => {
    setSelectedPrincipal(principal);
    setIsLinkGroupDialogOpen(true);
  };

  const openLinkSchoolDialog = (principal: Principal) => {
    setSelectedPrincipal(principal);
    setIsLinkSchoolDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Principal Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage principals and their organizational details
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Principal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Principal</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
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
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="organization" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizationNumber">Organization Number</Label>
                    <Input id="organizationNumber" placeholder="556123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="municipalityCode">Municipality Code</Label>
                    <Input id="municipalityCode" placeholder="0180" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="municipalityName">Municipality Name</Label>
                    <Input id="municipalityName" placeholder="Stockholm" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankgiro">Bankgiro</Label>
                    <Input id="bankgiro" placeholder="123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="postgiro">Postgiro</Label>
                    <Input id="postgiro" placeholder="12 34 56-7" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="additionalAmount">Additional Amount (SEK)</Label>
                    <Input id="additionalAmount" type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Street, Postal Code, City, Country" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
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
                    <div className="flex items-center space-x-4 text-sm text-ike-neutral mt-1">
                      <span>Personal: {principal.personalNumber}</span>
                      <span>Org: {principal.organizationNumber}</span>
                      <span>{principal.municipalityName} ({principal.municipalityCode})</span>
                    </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Contact Information</h4>
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
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Financial Information</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <CreditCard className="w-4 h-4 text-ike-primary" />
                    <span>Bankgiro: {principal.bankgiro}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Hash className="w-4 h-4 text-ike-primary" />
                    <span>Postgiro: {principal.postgiro}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-ike-primary" />
                    <span>Additional: {principal.additionalAmount.toLocaleString()} SEK</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ike-primary flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Affiliations
                    </h4>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openLinkGroupDialog(principal)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Group
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openLinkSchoolDialog(principal)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        School
                      </Button>
                    </div>
                  </div>
                  
                  {principal.groups.length === 0 && principal.schoolUnits.length === 0 ? (
                    <p className="text-sm text-ike-neutral italic">No affiliations</p>
                  ) : (
                    <div className="space-y-2">
                      {principal.groups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                          <div>
                            <p className="font-medium text-sm text-blue-800">{group.name}</p>
                            <p className="text-xs text-blue-600">Group • {group.municipality}</p>
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
                      {principal.schoolUnits.map((school) => (
                        <div key={school.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <div>
                            <p className="font-medium text-sm text-green-800">{school.name}</p>
                            <p className="text-xs text-green-600">School Unit • {school.municipality}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUnlinkSchoolUnit(principal.id, school.id)}
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Principal - {selectedPrincipal?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
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
                <div>
                  <Label htmlFor="editStartDate">Start Date</Label>
                  <Input id="editStartDate" type="date" defaultValue={selectedPrincipal?.startDate} />
                </div>
                <div>
                  <Label htmlFor="editEndDate">End Date (Optional)</Label>
                  <Input id="editEndDate" type="date" defaultValue={selectedPrincipal?.endDate} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="organization" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editOrganizationNumber">Organization Number</Label>
                  <Input id="editOrganizationNumber" defaultValue={selectedPrincipal?.organizationNumber} placeholder="556123-4567" />
                </div>
                <div>
                  <Label htmlFor="editMunicipalityCode">Municipality Code</Label>
                  <Input id="editMunicipalityCode" defaultValue={selectedPrincipal?.municipalityCode} placeholder="0180" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="editMunicipalityName">Municipality Name</Label>
                  <Input id="editMunicipalityName" defaultValue={selectedPrincipal?.municipalityName} placeholder="Stockholm" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editBankgiro">Bankgiro</Label>
                  <Input id="editBankgiro" defaultValue={selectedPrincipal?.bankgiro} placeholder="123-4567" />
                </div>
                <div>
                  <Label htmlFor="editPostgiro">Postgiro</Label>
                  <Input id="editPostgiro" defaultValue={selectedPrincipal?.postgiro} placeholder="12 34 56-7" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="editAdditionalAmount">Additional Amount (SEK)</Label>
                  <Input id="editAdditionalAmount" type="number" defaultValue={selectedPrincipal?.additionalAmount} placeholder="0" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="editAddress">Address</Label>
                  <Textarea 
                    id="editAddress" 
                    defaultValue={`${selectedPrincipal?.address?.street}, ${selectedPrincipal?.address?.postalCode} ${selectedPrincipal?.address?.city}, ${selectedPrincipal?.address?.country}`}
                    placeholder="Street, Postal Code, City, Country" 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
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

      {/* Link School Unit Dialog */}
      <Dialog open={isLinkSchoolDialogOpen} onOpenChange={setIsLinkSchoolDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link School Unit to {selectedPrincipal?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select School Unit</Label>
            <Select onValueChange={(schoolUnitId) => {
              if (selectedPrincipal) {
                handleLinkSchoolUnit(selectedPrincipal.id, schoolUnitId);
                setIsLinkSchoolDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a school unit to link" />
              </SelectTrigger>
              <SelectContent>
                {availableSchoolUnits
                  .filter(school => !selectedPrincipal?.schoolUnits.some(s => s.id === school.id))
                  .map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name} ({school.municipality})
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
