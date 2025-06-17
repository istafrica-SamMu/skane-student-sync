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
import { ContactInfoCard } from "@/components/ContactInfoCard";
import { ContactForm } from "@/components/ContactForm";
import { 
  Building2, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Euro,
  Calendar,
  Users,
  Search,
  Plus,
  UserPlus,
  School,
  Unlink,
  Building,
  CreditCard,
  FileText
} from "lucide-react";

interface Group {
  id: string;
  name: string;
  municipality: string;
  municipalityCode: string;
  organizationNumber: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive';
  contactPerson: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  additionalAmount: number;
  bankgiro?: string;
  postgiro?: string;
  priceListId?: string;
  description?: string;
  linkedPrincipals: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  linkedSchoolUnits: Array<{
    id: string;
    name: string;
    municipality: string;
  }>;
}

interface Principal {
  id: string;
  name: string;
  email: string;
  municipality: string;
}

interface SchoolUnit {
  id: string;
  name: string;
  municipality: string;
  unitCode: string;
}

interface CollaborationArea {
  id: string;
  name: string;
  region: string;
  description?: string;
  municipalities: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  status: 'active' | 'inactive';
  coordinatorName: string;
  coordinatorEmail: string;
}

const GroupManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isContactEditDialogOpen, setIsContactEditDialogOpen] = useState(false);
  const [isLinkPrincipalDialogOpen, setIsLinkPrincipalDialogOpen] = useState(false);
  const [isLinkSchoolDialogOpen, setIsLinkSchoolDialogOpen] = useState(false);
  const [isCollaborationAreaDialogOpen, setIsCollaborationAreaDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // Enhanced mock data with new fields
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Stockholm Central Group',
      municipality: 'Stockholm',
      municipalityCode: '0180',
      organizationNumber: '212000-1355',
      startDate: '2023-01-01',
      status: 'active',
      contactPerson: {
        name: 'Maria Andersson',
        role: 'Group Coordinator',
        email: 'maria.andersson@stockholm.se',
        phone: '+46 8 123 4567'
      },
      address: {
        street: 'Centralvägen 10',
        postalCode: '11122',
        city: 'Stockholm',
        country: 'Sweden'
      },
      additionalAmount: 50000,
      bankgiro: '123-4567',
      postgiro: '12 34 56-7',
      priceListId: 'PL-2024-01',
      description: 'Central educational group managing multiple high schools in Stockholm region',
      linkedPrincipals: [
        { id: '1', name: 'Anna Andersson', email: 'anna.andersson@example.com' }
      ],
      linkedSchoolUnits: [
        { id: '1', name: 'Stockholm Central High School', municipality: 'Stockholm' }
      ]
    },
    {
      id: '2',
      name: 'Göteborg West Group',
      municipality: 'Göteborg',
      municipalityCode: '1480',
      organizationNumber: '212000-2466',
      startDate: '2023-03-15',
      status: 'active',
      contactPerson: {
        name: 'Erik Eriksson',
        role: 'Group Manager',
        email: 'erik.eriksson@goteborg.se',
        phone: '+46 31 987 6543'
      },
      address: {
        street: 'Västergatan 25',
        postalCode: '41234',
        city: 'Göteborg',
        country: 'Sweden'
      },
      additionalAmount: 75000,
      bankgiro: '234-5678',
      priceListId: 'PL-2024-02',
      description: 'Western Göteborg educational collective focusing on vocational training',
      linkedPrincipals: [],
      linkedSchoolUnits: []
    }
  ]);

  const [availablePrincipals] = useState<Principal[]>([
    { id: '1', name: 'Anna Andersson', email: 'anna.andersson@example.com', municipality: 'Stockholm' },
    { id: '2', name: 'Erik Eriksson', email: 'erik.eriksson@example.com', municipality: 'Göteborg' },
    { id: '3', name: 'Lisa Svensson', email: 'lisa.svensson@example.com', municipality: 'Stockholm' },
    { id: '4', name: 'Johan Nilsson', email: 'johan.nilsson@example.com', municipality: 'Malmö' }
  ]);

  const [availableSchoolUnits] = useState<SchoolUnit[]>([
    { id: '1', name: 'Stockholm Central High School', municipality: 'Stockholm', unitCode: 'STK001' },
    { id: '2', name: 'Göteborg West High School', municipality: 'Göteborg', unitCode: 'GTB002' },
    { id: '3', name: 'Stockholm North High School', municipality: 'Stockholm', unitCode: 'STK003' },
    { id: '4', name: 'Malmö South High School', municipality: 'Malmö', unitCode: 'MLM004' }
  ]);

  const [availableMunicipalities] = useState([
    { id: '1', name: 'Stockholm', code: '0180' },
    { id: '2', name: 'Solna', code: '0163' },
    { id: '3', name: 'Sundbyberg', code: '0184' },
    { id: '4', name: 'Göteborg', code: '1480' },
    { id: '5', name: 'Mölndal', code: '1481' },
    { id: '6', name: 'Malmö', code: '1280' },
    { id: '7', name: 'Lund', code: '1281' }
  ]);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLinkPrincipal = (groupId: string, principalId: string) => {
    const principal = availablePrincipals.find(p => p.id === principalId);
    if (!principal) return;

    setGroups(prev => prev.map(group => 
      group.id === groupId
        ? {
            ...group,
            linkedPrincipals: [...group.linkedPrincipals, {
              id: principal.id,
              name: principal.name,
              email: principal.email
            }]
          }
        : group
    ));

    toast({
      title: "Principal Linked",
      description: `${principal.name} has been linked to the group`,
    });
  };

  const handleUnlinkPrincipal = (groupId: string, principalId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId
        ? {
            ...group,
            linkedPrincipals: group.linkedPrincipals.filter(p => p.id !== principalId)
          }
        : group
    ));

    toast({
      title: "Principal Unlinked",
      description: "Principal has been unlinked from the group",
    });
  };

  const handleLinkSchoolUnit = (groupId: string, schoolUnitId: string) => {
    const schoolUnit = availableSchoolUnits.find(s => s.id === schoolUnitId);
    if (!schoolUnit) return;

    setGroups(prev => prev.map(group => 
      group.id === groupId
        ? {
            ...group,
            linkedSchoolUnits: [...group.linkedSchoolUnits, {
              id: schoolUnit.id,
              name: schoolUnit.name,
              municipality: schoolUnit.municipality
            }]
          }
        : group
    ));

    toast({
      title: "School Unit Linked",
      description: `${schoolUnit.name} has been linked to the group`,
    });
  };

  const handleUnlinkSchoolUnit = (groupId: string, schoolUnitId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId
        ? {
            ...group,
            linkedSchoolUnits: group.linkedSchoolUnits.filter(s => s.id !== schoolUnitId)
          }
        : group
    ));

    toast({
      title: "School Unit Unlinked",
      description: "School unit has been unlinked from the group",
    });
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsEditDialogOpen(true);
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    if (window.confirm(`Are you sure you want to delete "${group.name}"? This action cannot be undone.`)) {
      setGroups(prev => prev.filter(g => g.id !== groupId));
      toast({
        title: "Group Deleted",
        description: `${group.name} has been deleted successfully`,
      });
    }
  };

  const handleEditContact = (group: Group) => {
    setSelectedGroup(group);
    setIsContactEditDialogOpen(true);
  };

  const handleUpdateContact = (contactData: any) => {
    if (!selectedGroup) return;

    setGroups(prev => prev.map(group => 
      group.id === selectedGroup.id
        ? {
            ...group,
            contactPerson: {
              name: contactData.name,
              role: contactData.role,
              email: contactData.email,
              phone: contactData.phone
            },
            address: {
              street: contactData.street,
              postalCode: contactData.postalCode,
              city: contactData.city,
              country: contactData.country
            }
          }
        : group
    ));

    setIsContactEditDialogOpen(false);
    toast({
      title: "Contact Updated",
      description: "Contact information has been updated successfully",
    });
  };

  const openLinkPrincipalDialog = (group: Group) => {
    setSelectedGroup(group);
    setIsLinkPrincipalDialogOpen(true);
  };

  const openLinkSchoolDialog = (group: Group) => {
    setSelectedGroup(group);
    setIsLinkSchoolDialogOpen(true);
  };

  const handleCreateCollaborationArea = (areaData: any) => {
    const newArea: CollaborationArea = {
      id: Date.now().toString(),
      name: areaData.name,
      region: areaData.region,
      description: areaData.description,
      municipalities: availableMunicipalities.filter(m => areaData.municipalityIds.includes(m.id)),
      status: areaData.status,
      coordinatorName: areaData.coordinatorName,
      coordinatorEmail: areaData.coordinatorEmail
    };

    setCollaborationAreas(prev => [...prev, newArea]);
    setIsCollaborationAreaDialogOpen(false);
    toast({
      title: "Collaboration Area Created",
      description: `${newArea.name} has been created successfully`,
    });
  };

  const handleRemoveMunicipalityFromArea = (areaId: string, municipalityId: string) => {
    setCollaborationAreas(prev => prev.map(area => 
      area.id === areaId
        ? {
            ...area,
            municipalities: area.municipalities.filter(m => m.id !== municipalityId)
          }
        : area
    ));

    toast({
      title: "Municipality Removed",
      description: "Municipality has been removed from the collaboration area",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Group Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage educational groups, collaboration areas, and their associations with enhanced financial integration
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isCollaborationAreaDialogOpen} onOpenChange={setIsCollaborationAreaDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-neutral-light">
                <Users className="w-4 h-4 mr-2" />
                Add Collaboration Area
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-ike-primary">Create New Collaboration Area</DialogTitle>
              </DialogHeader>
              <CollaborationAreaForm
                onSubmit={handleCreateCollaborationArea}
                onCancel={() => setIsCollaborationAreaDialogOpen(false)}
                availableMunicipalities={availableMunicipalities}
              />
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ike-primary hover:bg-ike-primary-dark">
                <Plus className="w-4 h-4 mr-2" />
                Add Group
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-ike-primary">Add New Educational Group</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="administrative">Administrative</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="address">Address</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input id="groupName" placeholder="Enter group name" />
                    </div>
                    <div>
                      <Label htmlFor="municipality">Municipality</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select municipality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stockholm">Stockholm</SelectItem>
                          <SelectItem value="göteborg">Göteborg</SelectItem>
                          <SelectItem value="malmö">Malmö</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priceListId">Price List</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price list" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PL-2024-01">PL-2024-01 (Standard)</SelectItem>
                          <SelectItem value="PL-2024-02">PL-2024-02 (Premium)</SelectItem>
                          <SelectItem value="PL-2024-03">PL-2024-03 (Vocational)</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the group's purpose and scope..." />
                  </div>
                </TabsContent>
                
                <TabsContent value="administrative" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationNumber">Organization Number</Label>
                      <Input id="organizationNumber" placeholder="212000-XXXX" />
                    </div>
                    <div>
                      <Label htmlFor="municipalityCode">Municipality Code</Label>
                      <Input id="municipalityCode" placeholder="0180" />
                    </div>
                  </div>
                  <div className="bg-ike-neutral-light p-4 rounded-lg">
                    <h4 className="font-medium text-ike-primary mb-2">Administrative Notes</h4>
                    <p className="text-sm text-ike-neutral">
                      Organization number and municipality code are used for official reporting and integration 
                      with Swedish National Agency for Education systems.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Person Name</Label>
                      <Input id="contactName" placeholder="Full name" />
                    </div>
                    <div>
                      <Label htmlFor="contactRole">Role</Label>
                      <Input id="contactRole" placeholder="Position/Title" />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input id="contactEmail" type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input id="contactPhone" placeholder="+46 XX XXX XX XX" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="address" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input id="street" placeholder="Street name and number" />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" placeholder="XXX XX" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City name" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sweden">Sweden</SelectItem>
                          <SelectItem value="norway">Norway</SelectItem>
                          <SelectItem value="denmark">Denmark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="financial" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="additionalAmount">Additional Amount (SEK)</Label>
                      <Input id="additionalAmount" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="bankgiro">Bankgiro</Label>
                      <Input id="bankgiro" placeholder="123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="postgiro">Postgiro</Label>
                      <Input id="postgiro" placeholder="12 34 56-7" />
                    </div>
                  </div>
                  <div className="bg-ike-neutral-light p-4 rounded-lg">
                    <h4 className="font-medium text-ike-primary mb-2">Financial Information</h4>
                    <p className="text-sm text-ike-neutral">
                      Payment details and additional amounts for inter-municipal compensation calculations.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-ike-primary hover:bg-ike-primary-dark">
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">Educational Groups ({groups.length})</TabsTrigger>
          <TabsTrigger value="collaboration-areas">Collaboration Areas ({collaborationAreas.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="groups" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
              <Input
                placeholder="Search groups by name or municipality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-ike-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-ike-primary to-ike-primary-dark rounded-full flex items-center justify-center">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-ike-primary">{group.name}</CardTitle>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-ike-neutral">{group.municipality} • {group.organizationNumber}</p>
                          {group.municipalityCode && (
                            <Badge variant="outline" className="text-xs">
                              Code: {group.municipalityCode}
                            </Badge>
                          )}
                          {group.priceListId && (
                            <Badge variant="outline" className="text-xs">
                              {group.priceListId}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={group.status === 'active' ? 'default' : 'secondary'}
                        className={group.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {group.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditGroup(group)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="principals">Principals ({group.linkedPrincipals.length})</TabsTrigger>
                      <TabsTrigger value="schools">Schools ({group.linkedSchoolUnits.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-ike-primary flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Contact Information
                          </h4>
                          <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{group.contactPerson.name}</span>
                              <span className="text-ike-neutral">({group.contactPerson.role})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-3 h-3 text-ike-primary" />
                              <span>{group.contactPerson.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-3 h-3 text-ike-primary" />
                              <span>{group.contactPerson.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-ike-primary flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Address
                          </h4>
                          <div className="text-sm bg-gray-50 p-3 rounded-lg">
                            <p>{group.address.street}</p>
                            <p>{group.address.postalCode} {group.address.city}</p>
                            <p>{group.address.country}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-ike-primary flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Period & Status
                          </h4>
                          <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                            <div><span className="font-medium">Start:</span> {group.startDate}</div>
                            {group.endDate && <div><span className="font-medium">End:</span> {group.endDate}</div>}
                            <div><span className="font-medium">Status:</span> {group.status}</div>
                          </div>
                        </div>
                      </div>
                      
                      {group.description && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-ike-primary mb-2">Description</h4>
                          <p className="text-sm text-ike-neutral">{group.description}</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="contact" className="space-y-4">
                      <ContactInfoCard
                        contactPerson={group.contactPerson}
                        address={group.address}
                        onEdit={() => handleEditContact(group)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="financial" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-ike-primary flex items-center">
                            <Euro className="w-4 h-4 mr-2" />
                            Financial Details
                          </h4>
                          <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">Additional Amount:</span>
                              <span className="text-ike-primary font-semibold">
                                {group.additionalAmount.toLocaleString()} SEK
                              </span>
                            </div>
                            {group.priceListId && (
                              <div className="flex justify-between">
                                <span className="font-medium">Price List:</span>
                                <span>{group.priceListId}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-ike-primary flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payment Information
                          </h4>
                          <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                            {group.bankgiro && (
                              <div className="flex justify-between">
                                <span className="font-medium">Bankgiro:</span>
                                <span>{group.bankgiro}</span>
                              </div>
                            )}
                            {group.postgiro && (
                              <div className="flex justify-between">
                                <span className="font-medium">Postgiro:</span>
                                <span>{group.postgiro}</span>
                              </div>
                            )}
                            {!group.bankgiro && !group.postgiro && (
                              <p className="text-ike-neutral italic">No payment information available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="principals" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-ike-primary">Linked Principals</h4>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openLinkPrincipalDialog(group)}
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Link Principal
                        </Button>
                      </div>
                      
                      {group.linkedPrincipals.length === 0 ? (
                        <p className="text-sm text-ike-neutral italic">No principals linked to this group</p>
                      ) : (
                        <div className="grid gap-2">
                          {group.linkedPrincipals.map((principal) => (
                            <div key={principal.id} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded">
                              <div>
                                <p className="font-medium">{principal.name}</p>
                                <p className="text-sm text-ike-neutral">{principal.email}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleUnlinkPrincipal(group.id, principal.id)}
                              >
                                <Unlink className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="schools" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-ike-primary">Linked School Units</h4>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openLinkSchoolDialog(group)}
                        >
                          <School className="w-4 h-4 mr-1" />
                          Link School Unit
                        </Button>
                      </div>
                      
                      {group.linkedSchoolUnits.length === 0 ? (
                        <p className="text-sm text-ike-neutral italic">No school units linked to this group</p>
                      ) : (
                        <div className="grid gap-2">
                          {group.linkedSchoolUnits.map((school) => (
                            <div key={school.id} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded">
                              <div>
                                <p className="font-medium">{school.name}</p>
                                <p className="text-sm text-ike-neutral">{school.municipality}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleUnlinkSchoolUnit(group.id, school.id)}
                              >
                                <Unlink className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-ike-primary mb-3">Administrative Details</h4>
                          <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                            <div><span className="font-medium">Group ID:</span> {group.id}</div>
                            <div><span className="font-medium">Organization Number:</span> {group.organizationNumber}</div>
                            <div><span className="font-medium">Municipality Code:</span> {group.municipalityCode}</div>
                            <div><span className="font-medium">Status:</span> {group.status}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-ike-primary mb-3">Relationships Summary</h4>
                          <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                            <div><span className="font-medium">Linked Principals:</span> {group.linkedPrincipals.length}</div>
                            <div><span className="font-medium">Linked School Units:</span> {group.linkedSchoolUnits.length}</div>
                            <div><span className="font-medium">Additional Amount:</span> {group.additionalAmount.toLocaleString()} SEK</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="collaboration-areas" className="space-y-6">
          <div className="grid gap-6">
            {collaborationAreas.length === 0 ? (
              <div className="text-center p-12 bg-gray-50 rounded-lg">
                <Users className="w-16 h-16 text-ike-neutral mx-auto mb-4" />
                <h3 className="text-lg font-medium text-ike-primary mb-2">No Collaboration Areas</h3>
                <p className="text-ike-neutral mb-4">Create your first collaboration area to start managing municipal partnerships.</p>
                <Button onClick={() => setIsCollaborationAreaDialogOpen(true)} className="bg-ike-primary hover:bg-ike-primary-dark">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Collaboration Area
                </Button>
              </div>
            ) : (
              collaborationAreas.map((area) => (
                <CollaborationAreaCard
                  key={area.id}
                  area={area}
                  onRemoveMunicipality={(municipalityId) => handleRemoveMunicipalityFromArea(area.id, municipalityId)}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Group Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Group - {selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="administrative">Administrative</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editGroupName">Group Name</Label>
                  <Input id="editGroupName" defaultValue={selectedGroup?.name} placeholder="Enter group name" />
                </div>
                <div>
                  <Label htmlFor="editMunicipality">Municipality</Label>
                  <Select defaultValue={selectedGroup?.municipality?.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stockholm">Stockholm</SelectItem>
                      <SelectItem value="göteborg">Göteborg</SelectItem>
                      <SelectItem value="malmö">Malmö</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editStatus">Status</Label>
                  <Select defaultValue={selectedGroup?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editPriceListId">Price List</Label>
                  <Select defaultValue={selectedGroup?.priceListId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PL-2024-01">PL-2024-01 (Standard)</SelectItem>
                      <SelectItem value="PL-2024-02">PL-2024-02 (Premium)</SelectItem>
                      <SelectItem value="PL-2024-03">PL-2024-03 (Vocational)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editStartDate">Start Date</Label>
                  <Input id="editStartDate" type="date" defaultValue={selectedGroup?.startDate} />
                </div>
                <div>
                  <Label htmlFor="editEndDate">End Date (Optional)</Label>
                  <Input id="editEndDate" type="date" defaultValue={selectedGroup?.endDate} />
                </div>
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea id="editDescription" placeholder="Brief description of the group's purpose and scope..." />
              </div>
            </TabsContent>
            
            <TabsContent value="administrative" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editOrganizationNumber">Organization Number</Label>
                  <Input id="editOrganizationNumber" defaultValue={selectedGroup?.organizationNumber} placeholder="212000-XXXX" />
                </div>
                <div>
                  <Label htmlFor="editMunicipalityCode">Municipality Code</Label>
                  <Input id="editMunicipalityCode" defaultValue={selectedGroup?.municipalityCode} placeholder="0180" />
                </div>
              </div>
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-ike-primary mb-2">Administrative Notes</h4>
                <p className="text-sm text-ike-neutral">
                  Organization number and municipality code are used for official reporting and integration 
                  with Swedish National Agency for Education systems.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editContactName">Contact Person Name</Label>
                  <Input id="editContactName" defaultValue={selectedGroup?.contactPerson?.name} placeholder="Full name" />
                </div>
                <div>
                  <Label htmlFor="editContactRole">Role</Label>
                  <Input id="editContactRole" defaultValue={selectedGroup?.contactPerson?.role} placeholder="Position/Title" />
                </div>
                <div>
                  <Label htmlFor="editContactEmail">Email</Label>
                  <Input id="editContactEmail" type="email" defaultValue={selectedGroup?.contactPerson?.email} placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="editContactPhone">Phone</Label>
                  <Input id="editContactPhone" defaultValue={selectedGroup?.contactPerson?.phone} placeholder="+46 XX XXX XX XX" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="address" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="editStreet">Street Address</Label>
                  <Input id="editStreet" defaultValue={selectedGroup?.address?.street} placeholder="Street name and number" />
                </div>
                <div>
                  <Label htmlFor="editPostalCode">Postal Code</Label>
                  <Input id="editPostalCode" defaultValue={selectedGroup?.address?.postalCode} placeholder="XXX XX" />
                </div>
                <div>
                  <Label htmlFor="editCity">City</Label>
                  <Input id="editCity" defaultValue={selectedGroup?.address?.city} placeholder="City name" />
                </div>
                <div>
                  <Label htmlFor="editCountry">Country</Label>
                  <Select defaultValue={selectedGroup?.address?.country?.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweden">Sweden</SelectItem>
                      <SelectItem value="norway">Norway</SelectItem>
                      <SelectItem value="denmark">Denmark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-4">
              <div>
                <Label htmlFor="editAdditionalAmount">Additional Amount (SEK)</Label>
                <Input id="editAdditionalAmount" type="number" defaultValue={selectedGroup?.additionalAmount} placeholder="0" />
              </div>
              <div>
                <Label htmlFor="editBankgiro">Bankgiro</Label>
                <Input id="editBankgiro" defaultValue={selectedGroup?.bankgiro} placeholder="123-4567" />
              </div>
              <div>
                <Label htmlFor="editPostgiro">Postgiro</Label>
                <Input id="editPostgiro" defaultValue={selectedGroup?.postgiro} placeholder="12 34 56-7" />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark"
              onClick={() => {
                setIsEditDialogOpen(false);
                toast({
                  title: "Group Updated",
                  description: "Group information has been updated successfully",
                });
              }}
            >
              Update Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Edit Dialog */}
      <Dialog open={isContactEditDialogOpen} onOpenChange={setIsContactEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-ike-primary">
              Edit Contact Information - {selectedGroup?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedGroup && (
            <ContactForm
              initialData={{
                name: selectedGroup.contactPerson.name,
                role: selectedGroup.contactPerson.role,
                email: selectedGroup.contactPerson.email,
                phone: selectedGroup.contactPerson.phone,
                street: selectedGroup.address.street,
                postalCode: selectedGroup.address.postalCode,
                city: selectedGroup.address.city,
                country: selectedGroup.address.country.toLowerCase(),
              }}
              onSubmit={handleUpdateContact}
              onCancel={() => setIsContactEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Link Principal Dialog */}
      <Dialog open={isLinkPrincipalDialogOpen} onOpenChange={setIsLinkPrincipalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Principal to {selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select Principal</Label>
            <Select onValueChange={(principalId) => {
              if (selectedGroup) {
                handleLinkPrincipal(selectedGroup.id, principalId);
                setIsLinkPrincipalDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a principal to link" />
              </SelectTrigger>
              <SelectContent>
                {availablePrincipals
                  .filter(principal => !selectedGroup?.linkedPrincipals.some(p => p.id === principal.id))
                  .map((principal) => (
                    <SelectItem key={principal.id} value={principal.id}>
                      {principal.name} ({principal.municipality})
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
            <DialogTitle>Link School Unit to {selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select School Unit</Label>
            <Select onValueChange={(schoolUnitId) => {
              if (selectedGroup) {
                handleLinkSchoolUnit(selectedGroup.id, schoolUnitId);
                setIsLinkSchoolDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a school unit to link" />
              </SelectTrigger>
              <SelectContent>
                {availableSchoolUnits
                  .filter(school => !selectedGroup?.linkedSchoolUnits.some(s => s.id === school.id))
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

export default GroupManagement;
