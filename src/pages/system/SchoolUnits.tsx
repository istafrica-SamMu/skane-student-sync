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
import PrincipalTransitionModal from "@/components/system/PrincipalTransitionModal";
import { 
  Building2, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  Calendar,
  Search,
  Plus,
  Link,
  Unlink,
  GraduationCap,
  DollarSign,
  Hash,
  ArrowRightLeft
} from "lucide-react";

interface SchoolUnit {
  id: string;
  name: string;
  code: string;
  type: 'elementary' | 'middle' | 'high' | 'special';
  email: string;
  phone: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  visitingAddress: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  municipality: string;
  municipalityCode: string;
  municipalityName: string;
  establishedDate: string;
  endDate?: string;
  status: 'active' | 'inactive';
  capacity: number;
  currentStudents: number;
  additionalAmount: number;
  principalId?: string;
  principalName?: string;
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

interface Principal {
  id: string;
  name: string;
  email: string;
}

const SchoolUnits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLinkGroupDialogOpen, setIsLinkGroupDialogOpen] = useState(false);
  const [isAssignPrincipalDialogOpen, setIsAssignPrincipalDialogOpen] = useState(false);
  const [isPrincipalTransitionDialogOpen, setIsPrincipalTransitionDialogOpen] = useState(false);
  const [selectedSchoolUnit, setSelectedSchoolUnit] = useState<SchoolUnit | null>(null);

  // Mock data
  const [schoolUnits, setSchoolUnits] = useState<SchoolUnit[]>([
    {
      id: '1',
      name: 'Stockholm Elementary School',
      code: 'SES001',
      type: 'elementary',
      email: 'info@ses.stockholm.se',
      phone: '+46 8 123 4567',
      address: {
        street: 'Skolvägen 10',
        postalCode: '11122',
        city: 'Stockholm',
        country: 'Sweden'
      },
      visitingAddress: {
        street: 'Skolvägen 10',
        postalCode: '11122',
        city: 'Stockholm',
        country: 'Sweden'
      },
      municipality: 'Stockholm',
      municipalityCode: '0180',
      municipalityName: 'Stockholm Municipality',
      establishedDate: '1985-08-15',
      status: 'active',
      capacity: 500,
      currentStudents: 450,
      additionalAmount: 25000,
      principalId: '1',
      principalName: 'Anna Andersson',
      groups: [
        { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm' }
      ]
    },
    {
      id: '2',
      name: 'Göteborg High School',
      code: 'GHS002',
      type: 'high',
      email: 'contact@ghs.goteborg.se',
      phone: '+46 31 987 6543',
      address: {
        street: 'Gymnasievägen 25',
        postalCode: '41255',
        city: 'Göteborg',
        country: 'Sweden'
      },
      visitingAddress: {
        street: 'Gymnasievägen 25',
        postalCode: '41255',
        city: 'Göteborg',
        country: 'Sweden'
      },
      municipality: 'Göteborg',
      municipalityCode: '1480',
      municipalityName: 'Göteborg Municipality',
      establishedDate: '1972-01-10',
      status: 'active',
      capacity: 800,
      currentStudents: 720,
      additionalAmount: 35000,
      groups: []
    }
  ]);

  const [availableGroups] = useState<Group[]>([
    { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm', status: 'active' },
    { id: '2', name: 'Northern District Group', municipality: 'Stockholm', status: 'active' },
    { id: '3', name: 'Göteborg West Group', municipality: 'Göteborg', status: 'active' },
    { id: '4', name: 'Malmö South Group', municipality: 'Malmö', status: 'active' }
  ]);

  const [availablePrincipals] = useState<Principal[]>([
    { id: '1', name: 'Anna Andersson', email: 'anna.andersson@example.com' },
    { id: '2', name: 'Erik Eriksson', email: 'erik.eriksson@example.com' },
    { id: '3', name: 'Maria Johansson', email: 'maria.johansson@example.com' }
  ]);

  const filteredSchoolUnits = schoolUnits.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'elementary': return 'bg-blue-100 text-blue-800';
      case 'middle': return 'bg-green-100 text-green-800';
      case 'high': return 'bg-purple-100 text-purple-800';
      case 'special': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLinkGroup = (schoolUnitId: string, groupId: string) => {
    const group = availableGroups.find(g => g.id === groupId);
    if (!group) return;

    setSchoolUnits(prev => prev.map(unit => 
      unit.id === schoolUnitId
        ? {
            ...unit,
            groups: [...unit.groups, { id: group.id, name: group.name, municipality: group.municipality }]
          }
        : unit
    ));

    toast({
      title: "Group Linked",
      description: `School unit has been linked to ${group.name}`,
    });
  };

  const handleUnlinkGroup = (schoolUnitId: string, groupId: string) => {
    setSchoolUnits(prev => prev.map(unit => 
      unit.id === schoolUnitId
        ? {
            ...unit,
            groups: unit.groups.filter(g => g.id !== groupId)
          }
        : unit
    ));

    toast({
      title: "Group Unlinked",
      description: "School unit has been unlinked from the group",
    });
  };

  const handleAssignPrincipal = (schoolUnitId: string, principalId: string) => {
    const principal = availablePrincipals.find(p => p.id === principalId);
    if (!principal) return;

    setSchoolUnits(prev => prev.map(unit => 
      unit.id === schoolUnitId
        ? {
            ...unit,
            principalId: principal.id,
            principalName: principal.name
          }
        : unit
    ));

    toast({
      title: "Principal Assigned",
      description: `${principal.name} has been assigned as principal`,
    });
  };

  const handleRemovePrincipal = (schoolUnitId: string) => {
    setSchoolUnits(prev => prev.map(unit => 
      unit.id === schoolUnitId
        ? {
            ...unit,
            principalId: undefined,
            principalName: undefined
          }
        : unit
    ));

    toast({
      title: "Principal Removed",
      description: "Principal has been removed from the school unit",
    });
  };

  const handleEditSchoolUnit = (schoolUnit: SchoolUnit) => {
    setSelectedSchoolUnit(schoolUnit);
    setIsEditDialogOpen(true);
  };

  const handleDeleteSchoolUnit = (schoolUnitId: string) => {
    const schoolUnit = schoolUnits.find(u => u.id === schoolUnitId);
    if (!schoolUnit) return;

    if (window.confirm(`Are you sure you want to delete "${schoolUnit.name}"? This action cannot be undone.`)) {
      setSchoolUnits(prev => prev.filter(u => u.id !== schoolUnitId));
      toast({
        title: "School Unit Deleted",
        description: `${schoolUnit.name} has been deleted successfully`,
      });
    }
  };

  const openLinkDialog = (schoolUnit: SchoolUnit) => {
    setSelectedSchoolUnit(schoolUnit);
    setIsLinkGroupDialogOpen(true);
  };

  const openAssignPrincipalDialog = (schoolUnit: SchoolUnit) => {
    setSelectedSchoolUnit(schoolUnit);
    setIsAssignPrincipalDialogOpen(true);
  };

  const handlePrincipalTransition = (
    schoolUnitId: string, 
    currentPrincipalEndDate: string, 
    newPrincipalId: string, 
    newPrincipalStartDate: string, 
    notes: string
  ) => {
    const newPrincipal = availablePrincipals.find(p => p.id === newPrincipalId);
    if (!newPrincipal) return;

    setSchoolUnits(prev => prev.map(unit => 
      unit.id === schoolUnitId
        ? {
            ...unit,
            principalId: newPrincipal.id,
            principalName: newPrincipal.name
          }
        : unit
    ));

    toast({
      title: "Principal Transition Completed",
      description: `${newPrincipal.name} has been assigned as the new principal starting ${newPrincipalStartDate}. Previous principal assignment ended on ${currentPrincipalEndDate}.`,
    });

    console.log('Principal transition:', {
      schoolUnitId,
      currentPrincipalEndDate,
      newPrincipalId,
      newPrincipalStartDate,
      notes
    });
  };

  const openPrincipalTransitionDialog = (schoolUnit: SchoolUnit) => {
    setSelectedSchoolUnit(schoolUnit);
    setIsPrincipalTransitionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">School Units Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage school units, their affiliations, and principal assignments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              <Building2 className="w-4 h-4 mr-2" />
              Add School Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New School Unit</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="administration">Administration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">School Name</Label>
                    <Input id="name" placeholder="Enter school name" />
                  </div>
                  <div>
                    <Label htmlFor="code">School Code</Label>
                    <Input id="code" placeholder="Enter school code" />
                  </div>
                  <div>
                    <Label htmlFor="type">School Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elementary">Elementary</SelectItem>
                        <SelectItem value="middle">Middle School</SelectItem>
                        <SelectItem value="high">High School</SelectItem>
                        <SelectItem value="special">Special Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="500" />
                  </div>
                  <div>
                    <Label htmlFor="established">Established Date</Label>
                    <Input id="established" type="date" />
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
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="school@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+46 8 123 4567" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="address">Postal Address</Label>
                    <Textarea id="address" placeholder="Street, Postal Code, City, Country" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="visitingAddress">Visiting Address</Label>
                    <Textarea id="visitingAddress" placeholder="Street, Postal Code, City, Country" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="administration" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="municipalityCode">Municipality Code</Label>
                    <Input id="municipalityCode" placeholder="0180" />
                  </div>
                  <div>
                    <Label htmlFor="municipalityName">Municipality Name</Label>
                    <Input id="municipalityName" placeholder="Stockholm Municipality" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="additionalAmount">Additional Amount (SEK)</Label>
                    <Input id="additionalAmount" type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-ike-primary hover:bg-ike-primary-dark"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  toast({
                    title: "School Unit Added",
                    description: "New school unit has been added successfully",
                  });
                }}
              >
                Add School Unit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
          <Input
            placeholder="Search school units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredSchoolUnits.map((schoolUnit) => (
          <Card key={schoolUnit.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-ike-primary">{schoolUnit.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-ike-neutral mt-1">
                      <span>Code: {schoolUnit.code}</span>
                      <span>{schoolUnit.municipalityName} ({schoolUnit.municipalityCode})</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(schoolUnit.type)}>
                    {schoolUnit.type}
                  </Badge>
                  <Badge variant={schoolUnit.status === 'active' ? 'default' : 'secondary'}>
                    {schoolUnit.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditSchoolUnit(schoolUnit)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteSchoolUnit(schoolUnit.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Contact Information</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-ike-primary" />
                    <span>{schoolUnit.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-ike-primary" />
                    <span>{schoolUnit.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-ike-primary" />
                    <span>{schoolUnit.address.street}, {schoolUnit.address.city}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-ike-primary" />
                    <span>Est. {schoolUnit.establishedDate}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Administration</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <Hash className="w-4 h-4 text-ike-primary" />
                    <span>Code: {schoolUnit.municipalityCode}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Building2 className="w-4 h-4 text-ike-primary" />
                    <span>{schoolUnit.municipalityName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-ike-primary" />
                    <span>Additional: {schoolUnit.additionalAmount.toLocaleString()} SEK</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Statistics</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-ike-primary" />
                    <span>Students: {schoolUnit.currentStudents}/{schoolUnit.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-ike-primary h-2 rounded-full" 
                      style={{ width: `${(schoolUnit.currentStudents / schoolUnit.capacity) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-ike-primary flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Principal
                    </h5>
                    <div className="flex space-x-1">
                      {schoolUnit.principalName ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openPrincipalTransitionDialog(schoolUnit)}
                            title="Manage Principal Transition"
                          >
                            <ArrowRightLeft className="w-4 h-4 mr-1" />
                            Transition
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRemovePrincipal(schoolUnit.id)}
                          >
                            <Unlink className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openAssignPrincipalDialog(schoolUnit)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {schoolUnit.principalName ? (
                    <p className="text-sm font-medium">{schoolUnit.principalName}</p>
                  ) : (
                    <p className="text-sm text-ike-neutral italic">No principal assigned</p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ike-primary flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Group Affiliations ({schoolUnit.groups.length})
                    </h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openLinkDialog(schoolUnit)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Link Group
                    </Button>
                  </div>
                  
                  {schoolUnit.groups.length === 0 ? (
                    <p className="text-sm text-ike-neutral italic">No groups assigned</p>
                  ) : (
                    <div className="space-y-2">
                      {schoolUnit.groups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-2 bg-ike-neutral-light rounded">
                          <div>
                            <p className="font-medium text-sm">{group.name}</p>
                            <p className="text-xs text-ike-neutral">{group.municipality}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUnlinkGroup(schoolUnit.id, group.id)}
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

      {/* Edit School Unit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit School Unit - {selectedSchoolUnit?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="administration">Administration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editName">School Name</Label>
                  <Input id="editName" defaultValue={selectedSchoolUnit?.name} placeholder="Enter school name" />
                </div>
                <div>
                  <Label htmlFor="editCode">School Code</Label>
                  <Input id="editCode" defaultValue={selectedSchoolUnit?.code} placeholder="Enter school code" />
                </div>
                <div>
                  <Label htmlFor="editType">School Type</Label>
                  <Select defaultValue={selectedSchoolUnit?.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary</SelectItem>
                      <SelectItem value="middle">Middle School</SelectItem>
                      <SelectItem value="high">High School</SelectItem>
                      <SelectItem value="special">Special Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editCapacity">Capacity</Label>
                  <Input id="editCapacity" type="number" defaultValue={selectedSchoolUnit?.capacity} />
                </div>
                <div>
                  <Label htmlFor="editEstablished">Established Date</Label>
                  <Input id="editEstablished" type="date" defaultValue={selectedSchoolUnit?.establishedDate} />
                </div>
                <div>
                  <Label htmlFor="editEndDate">End Date (Optional)</Label>
                  <Input id="editEndDate" type="date" defaultValue={selectedSchoolUnit?.endDate} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editEmail">Email</Label>
                  <Input id="editEmail" type="email" defaultValue={selectedSchoolUnit?.email} placeholder="school@example.com" />
                </div>
                <div>
                  <Label htmlFor="editPhone">Phone</Label>
                  <Input id="editPhone" defaultValue={selectedSchoolUnit?.phone} placeholder="+46 8 123 4567" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="editAddress">Postal Address</Label>
                  <Textarea 
                    id="editAddress" 
                    defaultValue={`${selectedSchoolUnit?.address?.street}, ${selectedSchoolUnit?.address?.postalCode} ${selectedSchoolUnit?.address?.city}, ${selectedSchoolUnit?.address?.country}`}
                    placeholder="Street, Postal Code, City, Country" 
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="editVisitingAddress">Visiting Address</Label>
                  <Textarea 
                    id="editVisitingAddress" 
                    defaultValue={`${selectedSchoolUnit?.visitingAddress?.street}, ${selectedSchoolUnit?.visitingAddress?.postalCode} ${selectedSchoolUnit?.visitingAddress?.city}, ${selectedSchoolUnit?.visitingAddress?.country}`}
                    placeholder="Street, Postal Code, City, Country" 
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="administration" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editMunicipalityCode">Municipality Code</Label>
                  <Input id="editMunicipalityCode" defaultValue={selectedSchoolUnit?.municipalityCode} placeholder="0180" />
                </div>
                <div>
                  <Label htmlFor="editMunicipalityName">Municipality Name</Label>
                  <Input id="editMunicipalityName" defaultValue={selectedSchoolUnit?.municipalityName} placeholder="Stockholm Municipality" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="editAdditionalAmount">Additional Amount (SEK)</Label>
                  <Input id="editAdditionalAmount" type="number" defaultValue={selectedSchoolUnit?.additionalAmount} placeholder="0" />
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
                  title: "School Unit Updated",
                  description: "School unit information has been updated successfully",
                });
              }}
            >
              Update School Unit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Group Dialog */}
      <Dialog open={isLinkGroupDialogOpen} onOpenChange={setIsLinkGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Group to {selectedSchoolUnit?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select Group</Label>
            <Select onValueChange={(groupId) => {
              if (selectedSchoolUnit) {
                handleLinkGroup(selectedSchoolUnit.id, groupId);
                setIsLinkGroupDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a group to link" />
              </SelectTrigger>
              <SelectContent>
                {availableGroups
                  .filter(group => !selectedSchoolUnit?.groups.some(g => g.id === group.id))
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

      {/* Assign Principal Dialog */}
      <Dialog open={isAssignPrincipalDialogOpen} onOpenChange={setIsAssignPrincipalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Principal to {selectedSchoolUnit?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select Principal</Label>
            <Select onValueChange={(principalId) => {
              if (selectedSchoolUnit) {
                handleAssignPrincipal(selectedSchoolUnit.id, principalId);
                setIsAssignPrincipalDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a principal to assign" />
              </SelectTrigger>
              <SelectContent>
                {availablePrincipals
                  .filter(principal => !schoolUnits.some(unit => unit.principalId === principal.id))
                  .map((principal) => (
                    <SelectItem key={principal.id} value={principal.id}>
                      {principal.name} ({principal.email})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      {/* Principal Transition Modal */}
      <PrincipalTransitionModal
        isOpen={isPrincipalTransitionDialogOpen}
        onClose={() => setIsPrincipalTransitionDialogOpen(false)}
        schoolUnit={selectedSchoolUnit}
        availablePrincipals={availablePrincipals}
        onTransition={handlePrincipalTransition}
      />
    </div>
  );
};

export default SchoolUnits;
