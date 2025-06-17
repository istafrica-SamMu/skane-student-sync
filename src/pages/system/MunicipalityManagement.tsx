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
  MapPin, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Users,
  Building2,
  Calendar,
  Search,
  Plus,
  Unlink,
  Link,
  GraduationCap,
  DollarSign,
  FileText,
  Calculator
} from "lucide-react";

interface Municipality {
  id: string;
  name: string;
  code: string;
  organizationNumber: string;
  region: string;
  email: string;
  phone: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  website?: string;
  establishedDate: string;
  status: 'active' | 'inactive';
  population: number;
  area: number; // in km²
  // Financial fields
  priceList: {
    id: string;
    name: string;
    version: string;
    effectiveDate: string;
  };
  accounting: {
    accountingSystem: string;
    fiscalYearStart: string;
    fiscalYearEnd: string;
    currencyCode: string;
  };
  additionalAmount: {
    amount: number;
    description: string;
    category: string;
    effectiveDate: string;
  };
  linkedGroups: Array<{
    id: string;
    name: string;
  }>;
  linkedSchools: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  linkedPrincipals: Array<{
    id: string;
    name: string;
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
  type: string;
  municipality: string;
  status: 'active' | 'inactive';
}

interface Principal {
  id: string;
  name: string;
  email: string;
}

const MunicipalityManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const [linkType, setLinkType] = useState<'groups' | 'schools' | 'principals'>('groups');

  // Mock data
  const [municipalities, setMunicipalities] = useState<Municipality[]>([
    {
      id: '1',
      name: 'Stockholm',
      code: 'STO001',
      organizationNumber: '212000-1355',
      region: 'Stockholm County',
      email: 'info@stockholm.se',
      phone: '+46 8 508 290 00',
      address: {
        street: 'Stadshuset',
        postalCode: '10520',
        city: 'Stockholm',
        country: 'Sweden'
      },
      website: 'https://stockholm.se',
      establishedDate: '1252-01-01',
      status: 'active',
      population: 975551,
      area: 188.0,
      priceList: {
        id: 'PL001',
        name: 'Stockholm Standard Price List 2024',
        version: '2.1',
        effectiveDate: '2024-01-01'
      },
      accounting: {
        accountingSystem: 'Raindance',
        fiscalYearStart: '2024-01-01',
        fiscalYearEnd: '2024-12-31',
        currencyCode: 'SEK'
      },
      additionalAmount: {
        amount: 15000,
        description: 'Administrative fee for inter-municipal students',
        category: 'Administrative',
        effectiveDate: '2024-01-01'
      },
      linkedGroups: [
        { id: '1', name: 'Stockholm Central Group' },
        { id: '2', name: 'Northern District Group' }
      ],
      linkedSchools: [
        { id: '1', name: 'Stockholm Elementary School', type: 'elementary' },
        { id: '3', name: 'Stockholm High School', type: 'high' }
      ],
      linkedPrincipals: [
        { id: '1', name: 'Anna Andersson' }
      ]
    },
    {
      id: '2',
      name: 'Göteborg',
      code: 'GOT002',
      organizationNumber: '212000-1447',
      region: 'Västra Götaland County',
      email: 'kontakt@goteborg.se',
      phone: '+46 31 365 00 00',
      address: {
        street: 'Stadshuset',
        postalCode: '40420',
        city: 'Göteborg',
        country: 'Sweden'
      },
      website: 'https://goteborg.se',
      establishedDate: '1621-01-01',
      status: 'active',
      population: 583056,
      area: 203.7,
      priceList: {
        id: 'PL002',
        name: 'Göteborg Standard Price List 2024',
        version: '1.5',
        effectiveDate: '2024-01-01'
      },
      accounting: {
        accountingSystem: 'Agresso',
        fiscalYearStart: '2024-01-01',
        fiscalYearEnd: '2024-12-31',
        currencyCode: 'SEK'
      },
      additionalAmount: {
        amount: 12500,
        description: 'Transportation supplement',
        category: 'Transportation',
        effectiveDate: '2024-01-01'
      },
      linkedGroups: [
        { id: '3', name: 'Göteborg West Group' }
      ],
      linkedSchools: [
        { id: '2', name: 'Göteborg High School', type: 'high' }
      ],
      linkedPrincipals: []
    }
  ]);

  const [availableGroups] = useState<Group[]>([
    { id: '1', name: 'Stockholm Central Group', municipality: 'Stockholm', status: 'active' },
    { id: '2', name: 'Northern District Group', municipality: 'Stockholm', status: 'active' },
    { id: '3', name: 'Göteborg West Group', municipality: 'Göteborg', status: 'active' },
    { id: '4', name: 'Malmö South Group', municipality: 'Malmö', status: 'active' }
  ]);

  const [availableSchools] = useState<SchoolUnit[]>([
    { id: '1', name: 'Stockholm Elementary School', type: 'elementary', municipality: 'Stockholm', status: 'active' },
    { id: '2', name: 'Göteborg High School', type: 'high', municipality: 'Göteborg', status: 'active' },
    { id: '3', name: 'Stockholm High School', type: 'high', municipality: 'Stockholm', status: 'active' }
  ]);

  const [availablePrincipals] = useState<Principal[]>([
    { id: '1', name: 'Anna Andersson', email: 'anna.andersson@example.com' },
    { id: '2', name: 'Erik Eriksson', email: 'erik.eriksson@example.com' },
    { id: '3', name: 'Maria Johansson', email: 'maria.johansson@example.com' }
  ]);

  const regions = [...new Set(municipalities.map(m => m.region))];

  const filteredMunicipalities = municipalities.filter(municipality => {
    const matchesSearch = municipality.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         municipality.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         municipality.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || municipality.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleLink = (municipalityId: string, entityId: string, type: 'groups' | 'schools' | 'principals') => {
    let entity;
    if (type === 'groups') {
      entity = availableGroups.find(g => g.id === entityId);
    } else if (type === 'schools') {
      entity = availableSchools.find(s => s.id === entityId);
    } else {
      entity = availablePrincipals.find(p => p.id === entityId);
    }
    
    if (!entity) return;

    setMunicipalities(prev => prev.map(municipality => {
      if (municipality.id === municipalityId) {
        const updated = { ...municipality };
        if (type === 'groups') {
          updated.linkedGroups = [...updated.linkedGroups, { id: entity.id, name: entity.name }];
        } else if (type === 'schools') {
          updated.linkedSchools = [...updated.linkedSchools, { 
            id: entity.id, 
            name: entity.name, 
            type: (entity as SchoolUnit).type 
          }];
        } else {
          updated.linkedPrincipals = [...updated.linkedPrincipals, { id: entity.id, name: entity.name }];
        }
        return updated;
      }
      return municipality;
    }));

    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1, -1)} Linked`,
      description: `${entity.name} has been linked to the municipality`,
    });
  };

  const handleUnlink = (municipalityId: string, entityId: string, type: 'groups' | 'schools' | 'principals') => {
    setMunicipalities(prev => prev.map(municipality => {
      if (municipality.id === municipalityId) {
        const updated = { ...municipality };
        if (type === 'groups') {
          updated.linkedGroups = updated.linkedGroups.filter(g => g.id !== entityId);
        } else if (type === 'schools') {
          updated.linkedSchools = updated.linkedSchools.filter(s => s.id !== entityId);
        } else {
          updated.linkedPrincipals = updated.linkedPrincipals.filter(p => p.id !== entityId);
        }
        return updated;
      }
      return municipality;
    }));

    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1, -1)} Unlinked`,
      description: `${type.charAt(0).toUpperCase() + type.slice(1, -1)} has been unlinked from the municipality`,
    });
  };

  const handleEdit = (municipality: Municipality) => {
    setSelectedMunicipality(municipality);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (municipalityId: string) => {
    const municipality = municipalities.find(m => m.id === municipalityId);
    if (!municipality) return;

    if (window.confirm(`Are you sure you want to delete "${municipality.name}"? This action cannot be undone.`)) {
      setMunicipalities(prev => prev.filter(m => m.id !== municipalityId));
      toast({
        title: "Municipality Deleted",
        description: `${municipality.name} has been deleted successfully`,
      });
    }
  };

  const handleSave = () => {
    setIsEditDialogOpen(false);
    toast({
      title: "Municipality Updated",
      description: "Municipality information has been updated successfully",
    });
  };

  const handleAdd = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Municipality Added",
      description: "New municipality has been added successfully",
    });
  };

  const openLinkDialog = (municipality: Municipality, type: 'groups' | 'schools' | 'principals') => {
    setSelectedMunicipality(municipality);
    setLinkType(type);
    setIsLinkDialogOpen(true);
  };

  const getAvailableEntities = () => {
    if (!selectedMunicipality) return [];
    
    if (linkType === 'groups') {
      return availableGroups.filter(group => 
        !selectedMunicipality.linkedGroups.some(g => g.id === group.id)
      );
    } else if (linkType === 'schools') {
      return availableSchools.filter(school => 
        !selectedMunicipality.linkedSchools.some(s => s.id === school.id)
      );
    } else {
      return availablePrincipals.filter(principal => 
        !selectedMunicipality.linkedPrincipals.some(p => p.id === principal.id)
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipality Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage municipalities and their relationships with groups, schools, and principals
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              <MapPin className="w-4 h-4 mr-2" />
              Add Municipality
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Municipality</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="financial">Financial Details</TabsTrigger>
                <TabsTrigger value="contact">Contact & Address</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Municipality Name</Label>
                    <Input id="name" placeholder="Enter municipality name" />
                  </div>
                  <div>
                    <Label htmlFor="code">Municipality Code</Label>
                    <Input id="code" placeholder="Enter municipality code" />
                  </div>
                  <div>
                    <Label htmlFor="orgNumber">Organization Number</Label>
                    <Input id="orgNumber" placeholder="XXXXXX-XXXX" />
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" placeholder="Enter region" />
                  </div>
                  <div>
                    <Label htmlFor="population">Population</Label>
                    <Input id="population" type="number" placeholder="500000" />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (km²)</Label>
                    <Input id="area" type="number" step="0.1" placeholder="188.0" />
                  </div>
                  <div>
                    <Label htmlFor="established">Established Date</Label>
                    <Input id="established" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://example.se" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-ike-primary" />
                      Price List
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="priceListName">Price List Name</Label>
                        <Input id="priceListName" placeholder="Standard Price List 2024" />
                      </div>
                      <div>
                        <Label htmlFor="priceListVersion">Version</Label>
                        <Input id="priceListVersion" placeholder="1.0" />
                      </div>
                      <div>
                        <Label htmlFor="priceListEffective">Effective Date</Label>
                        <Input id="priceListEffective" type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
                      Accounting
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accountingSystem">Accounting System</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select accounting system" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="raindance">Raindance</SelectItem>
                            <SelectItem value="agresso">Agresso</SelectItem>
                            <SelectItem value="visma">Visma</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currencyCode">Currency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="SEK" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SEK">SEK</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
                        <Input id="fiscalYearStart" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="fiscalYearEnd">Fiscal Year End</Label>
                        <Input id="fiscalYearEnd" type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
                      Additional Amount
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="additionalAmount">Amount (SEK)</Label>
                        <Input id="additionalAmount" type="number" placeholder="15000" />
                      </div>
                      <div>
                        <Label htmlFor="additionalCategory">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrative">Administrative</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="additionalDescription">Description</Label>
                        <Textarea id="additionalDescription" placeholder="Description of the additional amount" />
                      </div>
                      <div>
                        <Label htmlFor="additionalEffective">Effective Date</Label>
                        <Input id="additionalEffective" type="date" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="info@municipality.se" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+46 8 123 4567" />
                  </div>
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
              <Button className="bg-ike-primary hover:bg-ike-primary-dark" onClick={handleAdd}>
                Add Municipality
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
          <Input
            placeholder="Search municipalities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredMunicipalities.map((municipality) => (
          <Card key={municipality.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-ike-primary">{municipality.name}</CardTitle>
                    <p className="text-sm text-ike-neutral">
                      Code: {municipality.code} • Org: {municipality.organizationNumber} • {municipality.region}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={municipality.status === 'active' ? 'default' : 'secondary'}>
                    {municipality.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(municipality)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(municipality.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Contact Information</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-ike-primary" />
                    <span>{municipality.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-ike-primary" />
                    <span>{municipality.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-ike-primary" />
                    <span>{municipality.address.street}, {municipality.address.city}</span>
                  </div>
                  {municipality.website && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Link className="w-4 h-4 text-ike-primary" />
                      <a href={municipality.website} target="_blank" rel="noopener noreferrer" className="text-ike-primary hover:underline">
                        {municipality.website}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Statistics</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-ike-primary" />
                    <span>Population: {municipality.population.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-ike-primary" />
                    <span>Area: {municipality.area} km²</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-ike-primary" />
                    <span>Est. {municipality.establishedDate}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-ike-primary">Financial Information</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-ike-primary" />
                    <span>{municipality.priceList.name} v{municipality.priceList.version}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calculator className="w-4 h-4 text-ike-primary" />
                    <span>{municipality.accounting.accountingSystem}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-ike-primary" />
                    <span>{municipality.additionalAmount.amount.toLocaleString()} SEK</span>
                  </div>
                  <p className="text-xs text-ike-neutral">{municipality.additionalAmount.description}</p>
                </div>
              </div>

              <Tabs defaultValue="groups" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="groups" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Groups ({municipality.linkedGroups.length})
                  </TabsTrigger>
                  <TabsTrigger value="schools" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Schools ({municipality.linkedSchools.length})
                  </TabsTrigger>
                  <TabsTrigger value="principals" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Principals ({municipality.linkedPrincipals.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="groups" className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-ike-primary">Linked Groups</h5>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openLinkDialog(municipality, 'groups')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Link Group
                    </Button>
                  </div>
                  {municipality.linkedGroups.length === 0 ? (
                    <p className="text-sm text-ike-neutral italic">No groups linked</p>
                  ) : (
                    <div className="space-y-2">
                      {municipality.linkedGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-2 bg-ike-neutral-light rounded">
                          <span className="font-medium text-sm">{group.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUnlink(municipality.id, group.id, 'groups')}
                          >
                            <Unlink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="schools" className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-ike-primary">Linked Schools</h5>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openLinkDialog(municipality, 'schools')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Link School
                    </Button>
                  </div>
                  {municipality.linkedSchools.length === 0 ? (
                    <p className="text-sm text-ike-neutral italic">No schools linked</p>
                  ) : (
                    <div className="space-y-2">
                      {municipality.linkedSchools.map((school) => (
                        <div key={school.id} className="flex items-center justify-between p-2 bg-ike-neutral-light rounded">
                          <div>
                            <span className="font-medium text-sm">{school.name}</span>
                            <Badge className="ml-2 text-xs">{school.type}</Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUnlink(municipality.id, school.id, 'schools')}
                          >
                            <Unlink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="principals" className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-ike-primary">Linked Principals</h5>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openLinkDialog(municipality, 'principals')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Link Principal
                    </Button>
                  </div>
                  {municipality.linkedPrincipals.length === 0 ? (
                    <p className="text-sm text-ike-neutral italic">No principals linked</p>
                  ) : (
                    <div className="space-y-2">
                      {municipality.linkedPrincipals.map((principal) => (
                        <div key={principal.id} className="flex items-center justify-between p-2 bg-ike-neutral-light rounded">
                          <span className="font-medium text-sm">{principal.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUnlink(municipality.id, principal.id, 'principals')}
                          >
                            <Unlink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Municipality Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Municipality - {selectedMunicipality?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="financial">Financial Details</TabsTrigger>
              <TabsTrigger value="contact">Contact & Address</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editName">Municipality Name</Label>
                  <Input id="editName" defaultValue={selectedMunicipality?.name} placeholder="Enter municipality name" />
                </div>
                <div>
                  <Label htmlFor="editCode">Municipality Code</Label>
                  <Input id="editCode" defaultValue={selectedMunicipality?.code} placeholder="Enter municipality code" />
                </div>
                <div>
                  <Label htmlFor="editOrgNumber">Organization Number</Label>
                  <Input id="editOrgNumber" defaultValue={selectedMunicipality?.organizationNumber} placeholder="XXXXXX-XXXX" />
                </div>
                <div>
                  <Label htmlFor="editRegion">Region</Label>
                  <Input id="editRegion" defaultValue={selectedMunicipality?.region} placeholder="Enter region" />
                </div>
                <div>
                  <Label htmlFor="editPopulation">Population</Label>
                  <Input id="editPopulation" type="number" defaultValue={selectedMunicipality?.population} />
                </div>
                <div>
                  <Label htmlFor="editArea">Area (km²)</Label>
                  <Input id="editArea" type="number" step="0.1" defaultValue={selectedMunicipality?.area} />
                </div>
                <div>
                  <Label htmlFor="editEstablished">Established Date</Label>
                  <Input id="editEstablished" type="date" defaultValue={selectedMunicipality?.establishedDate} />
                </div>
                <div>
                  <Label htmlFor="editWebsite">Website</Label>
                  <Input id="editWebsite" defaultValue={selectedMunicipality?.website} placeholder="https://example.se" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-ike-primary" />
                    Price List
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editPriceListName">Price List Name</Label>
                      <Input id="editPriceListName" defaultValue={selectedMunicipality?.priceList.name} />
                    </div>
                    <div>
                      <Label htmlFor="editPriceListVersion">Version</Label>
                      <Input id="editPriceListVersion" defaultValue={selectedMunicipality?.priceList.version} />
                    </div>
                    <div>
                      <Label htmlFor="editPriceListEffective">Effective Date</Label>
                      <Input id="editPriceListEffective" type="date" defaultValue={selectedMunicipality?.priceList.effectiveDate} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
                    Accounting
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editAccountingSystem">Accounting System</Label>
                      <Input id="editAccountingSystem" defaultValue={selectedMunicipality?.accounting.accountingSystem} />
                    </div>
                    <div>
                      <Label htmlFor="editCurrencyCode">Currency</Label>
                      <Input id="editCurrencyCode" defaultValue={selectedMunicipality?.accounting.currencyCode} />
                    </div>
                    <div>
                      <Label htmlFor="editFiscalYearStart">Fiscal Year Start</Label>
                      <Input id="editFiscalYearStart" type="date" defaultValue={selectedMunicipality?.accounting.fiscalYearStart} />
                    </div>
                    <div>
                      <Label htmlFor="editFiscalYearEnd">Fiscal Year End</Label>
                      <Input id="editFiscalYearEnd" type="date" defaultValue={selectedMunicipality?.accounting.fiscalYearEnd} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
                    Additional Amount
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editAdditionalAmount">Amount (SEK)</Label>
                      <Input id="editAdditionalAmount" type="number" defaultValue={selectedMunicipality?.additionalAmount.amount} />
                    </div>
                    <div>
                      <Label htmlFor="editAdditionalCategory">Category</Label>
                      <Input id="editAdditionalCategory" defaultValue={selectedMunicipality?.additionalAmount.category} />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="editAdditionalDescription">Description</Label>
                      <Textarea id="editAdditionalDescription" defaultValue={selectedMunicipality?.additionalAmount.description} />
                    </div>
                    <div>
                      <Label htmlFor="editAdditionalEffective">Effective Date</Label>
                      <Input id="editAdditionalEffective" type="date" defaultValue={selectedMunicipality?.additionalAmount.effectiveDate} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editEmail">Email</Label>
                  <Input id="editEmail" type="email" defaultValue={selectedMunicipality?.email} />
                </div>
                <div>
                  <Label htmlFor="editPhone">Phone</Label>
                  <Input id="editPhone" defaultValue={selectedMunicipality?.phone} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="editAddress">Address</Label>
                  <Textarea 
                    id="editAddress" 
                    defaultValue={`${selectedMunicipality?.address?.street}, ${selectedMunicipality?.address?.postalCode} ${selectedMunicipality?.address?.city}, ${selectedMunicipality?.address?.country}`}
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
              onClick={handleSave}
            >
              Update Municipality
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Entity Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Link {linkType.charAt(0).toUpperCase() + linkType.slice(1, -1)} to {selectedMunicipality?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Select {linkType.charAt(0).toUpperCase() + linkType.slice(1, -1)}</Label>
            <Select onValueChange={(entityId) => {
              if (selectedMunicipality) {
                handleLink(selectedMunicipality.id, entityId, linkType);
                setIsLinkDialogOpen(false);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder={`Select a ${linkType.slice(0, -1)} to link`} />
              </SelectTrigger>
              <SelectContent>
                {getAvailableEntities().map((entity) => (
                  <SelectItem key={entity.id} value={entity.id}>
                    {entity.name}
                    {'municipality' in entity && ` (${entity.municipality})`}
                    {'email' in entity && ` (${entity.email})`}
                    {'type' in entity && ` - ${entity.type}`}
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

export default MunicipalityManagement;
