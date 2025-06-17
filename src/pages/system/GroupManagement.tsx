
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
  Building
} from "lucide-react";

interface Group {
  id: string;
  name: string;
  municipality: string;
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

const GroupManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLinkPrincipalDialogOpen, setIsLinkPrincipalDialogOpen] = useState(false);
  const [isLinkSchoolDialogOpen, setIsLinkSchoolDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // Mock data
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Stockholm Central Group',
      municipality: 'Stockholm',
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

  const openLinkPrincipalDialog = (group: Group) => {
    setSelectedGroup(group);
    setIsLinkPrincipalDialogOpen(true);
  };

  const openLinkSchoolDialog = (group: Group) => {
    setSelectedGroup(group);
    setIsLinkSchoolDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Group Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage educational groups and their associations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
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
                    <Label htmlFor="orgNumber">Organization Number</Label>
                    <Input id="orgNumber" placeholder="212000-XXXX" />
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
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input id="endDate" type="date" />
                  </div>
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
                <div>
                  <Label htmlFor="additionalAmount">Additional Amount (SEK)</Label>
                  <Input id="additionalAmount" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Additional details about financial arrangements..." />
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

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
          <Input
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-ike-primary">{group.name}</CardTitle>
                    <p className="text-sm text-ike-neutral">{group.municipality} • {group.organizationNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                    {group.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="principals">Principals ({group.linkedPrincipals.length})</TabsTrigger>
                  <TabsTrigger value="schools">School Units ({group.linkedSchoolUnits.length})</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-ike-primary">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-ike-primary" />
                          <span>{group.contactPerson.name} ({group.contactPerson.role})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-ike-primary" />
                          <span>{group.contactPerson.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-ike-primary" />
                          <span>{group.contactPerson.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-ike-primary">Address</h4>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-ike-primary mt-0.5" />
                        <div>
                          <p>{group.address.street}</p>
                          <p>{group.address.postalCode} {group.address.city}</p>
                          <p>{group.address.country}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-ike-primary">Financial</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <Euro className="w-4 h-4 text-ike-primary" />
                          <span>{group.additionalAmount.toLocaleString()} SEK</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-ike-primary" />
                          <span>Start: {group.startDate}</span>
                        </div>
                        {group.endDate && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-ike-primary" />
                            <span>End: {group.endDate}</span>
                          </div>
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
                      <h4 className="font-medium text-ike-primary mb-2">Administrative Details</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Group ID:</span> {group.id}</div>
                        <div><span className="font-medium">Organization Number:</span> {group.organizationNumber}</div>
                        <div><span className="font-medium">Status:</span> {group.status}</div>
                        <div><span className="font-medium">Start Date:</span> {group.startDate}</div>
                        {group.endDate && <div><span className="font-medium">End Date:</span> {group.endDate}</div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-ike-primary mb-2">Summary</h4>
                      <div className="space-y-2 text-sm">
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
