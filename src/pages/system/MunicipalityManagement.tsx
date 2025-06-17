
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Users, School, Edit, Trash2, MoreVertical, MapPin, Phone, Mail, Euro, Calculator } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MunicipalityManagement = () => {
  const { toast } = useToast();
  const [isAddMunicipalityOpen, setIsAddMunicipalityOpen] = useState(false);
  const [isEditMunicipalityOpen, setIsEditMunicipalityOpen] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  const [municipalities, setMunicipalities] = useState([
    {
      id: 1,
      name: "Malmö Municipality",
      code: "MAL",
      organizationNumber: "212000-1124",
      schools: 45,
      students: 12500,
      administrators: 8,
      status: "Active",
      contactPersons: [
        { name: "Anna Svensson", role: "Administrator", email: "anna.svensson@malmo.se", phone: "+46 40 123 456" }
      ],
      postalAddress: {
        street: "Stortorget 1",
        postalCode: "211 34",
        city: "Malmö",
        country: "Sweden"
      },
      priceList: "Standard 2024",
      accounting: "Account Group A",
      additionalAmount: 0
    },
    {
      id: 2,
      name: "Lund Municipality",
      code: "LUN",
      organizationNumber: "212000-1231",
      schools: 28,
      students: 8200,
      administrators: 5,
      status: "Active",
      contactPersons: [
        { name: "Erik Lindqvist", role: "Administrator", email: "erik.lindqvist@lund.se", phone: "+46 46 789 123" }
      ],
      postalAddress: {
        street: "Stora Södergatan 17",
        postalCode: "222 23",
        city: "Lund",
        country: "Sweden"
      },
      priceList: "Standard 2024",
      accounting: "Account Group B",
      additionalAmount: 5000
    },
    {
      id: 3,
      name: "Helsingborg Municipality",
      code: "HEL",
      organizationNumber: "212000-1347",
      schools: 38,
      students: 11000,
      administrators: 7,
      status: "Active",
      contactPersons: [
        { name: "Maria Johansson", role: "Administrator", email: "maria.johansson@helsingborg.se", phone: "+46 42 456 789" }
      ],
      postalAddress: {
        street: "Drottninggatan 1",
        postalCode: "251 89",
        city: "Helsingborg",
        country: "Sweden"
      },
      priceList: "Enhanced 2024",
      accounting: "Account Group C",
      additionalAmount: 2500
    }
  ]);

  const handleAddMunicipality = () => {
    toast({
      title: "Municipality Added",
      description: "New municipality has been successfully added to the system.",
    });
    setIsAddMunicipalityOpen(false);
  };

  const handleEditMunicipality = (municipality) => {
    setSelectedMunicipality(municipality);
    setIsEditMunicipalityOpen(true);
  };

  const handleUpdateMunicipality = () => {
    toast({
      title: "Municipality Updated",
      description: "Municipality information has been successfully updated.",
    });
    setIsEditMunicipalityOpen(false);
    setSelectedMunicipality(null);
  };

  const handleDeleteMunicipality = (municipalityId) => {
    setMunicipalities(municipalities.filter(municipality => municipality.id !== municipalityId));
    toast({
      title: "Municipality Deleted",
      description: "Municipality has been successfully removed from the system.",
      variant: "destructive",
    });
  };

  const handleManageMunicipality = (municipality) => {
    setSelectedMunicipality(municipality);
    setIsEditMunicipalityOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipality Management</h1>
          <p className="text-ike-neutral">Manage home municipalities in the regional system</p>
        </div>
        
        <Dialog open={isAddMunicipalityOpen} onOpenChange={setIsAddMunicipalityOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Municipality
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Municipality</DialogTitle>
              <DialogDescription>
                Add a new home municipality to the regional system. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Municipality Name *</Label>
                    <Input id="name" placeholder="Enter municipality name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Municipality Code *</Label>
                    <Input id="code" placeholder="Enter municipality code" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgNumber">Organization Number *</Label>
                    <Input id="orgNumber" placeholder="XXXXXX-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" placeholder="Active" defaultValue="Active" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Postal Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input id="street" placeholder="Street address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" placeholder="XXX XX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="Sweden" defaultValue="Sweden" />
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-6">Contact Persons</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input id="contactName" placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Role</Label>
                      <Input id="contactRole" placeholder="Administrator" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input id="contactEmail" type="email" placeholder="email@municipality.se" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input id="contactPhone" placeholder="+46 XX XXX XXXX" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceList">Price List</Label>
                    <Input id="priceList" placeholder="Standard 2024" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accounting">Accounting Group</Label>
                    <Input id="accounting" placeholder="Account Group A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalAmount">Additional Amount (SEK)</Label>
                    <Input id="additionalAmount" type="number" placeholder="0" defaultValue="0" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="additional" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schools">Number of Schools</Label>
                    <Input id="schools" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="students">Number of Students</Label>
                    <Input id="students" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="administrators">Number of Administrators</Label>
                    <Input id="administrators" type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMunicipality}>Add Municipality</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {municipalities.map((municipality) => (
          <Card key={municipality.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-ike-primary" />
                  {municipality.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white" align="end">
                    <DropdownMenuItem onClick={() => handleEditMunicipality(municipality)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleManageMunicipality(municipality)}>
                      <Building className="w-4 h-4 mr-2" />
                      Manage
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the municipality
                            "{municipality.name}" and remove all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteMunicipality(municipality.id)}>
                            Delete Municipality
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                <div className="space-y-1">
                  <div>Code: {municipality.code}</div>
                  <div>Org. Nr: {municipality.organizationNumber}</div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ike-neutral">Status</span>
                  <Badge className="bg-green-100 text-green-800">{municipality.status}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Schools</span>
                    </div>
                    <span className="font-medium">{municipality.schools}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Students</span>
                    </div>
                    <span className="font-medium">{municipality.students.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Administrators</span>
                    </div>
                    <span className="font-medium">{municipality.administrators}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-ike-neutral" />
                    <span className="text-sm">{municipality.postalAddress.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-ike-neutral" />
                    <span className="text-sm">{municipality.priceList}</span>
                  </div>
                  {municipality.additionalAmount > 0 && (
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">+{municipality.additionalAmount.toLocaleString()} SEK</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleManageMunicipality(municipality)}
                  >
                    Manage Municipality
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Municipality Dialog */}
      <Dialog open={isEditMunicipalityOpen} onOpenChange={setIsEditMunicipalityOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Municipality</DialogTitle>
            <DialogDescription>
              Update municipality information and details.
            </DialogDescription>
          </DialogHeader>
          {selectedMunicipality && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Municipality Name</Label>
                    <Input id="edit-name" defaultValue={selectedMunicipality.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-code">Municipality Code</Label>
                    <Input id="edit-code" defaultValue={selectedMunicipality.code} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-orgNumber">Organization Number</Label>
                    <Input id="edit-orgNumber" defaultValue={selectedMunicipality.organizationNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Input id="edit-status" defaultValue={selectedMunicipality.status} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Postal Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-street">Street Address</Label>
                      <Input id="edit-street" defaultValue={selectedMunicipality.postalAddress.street} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-postalCode">Postal Code</Label>
                      <Input id="edit-postalCode" defaultValue={selectedMunicipality.postalAddress.postalCode} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-city">City</Label>
                      <Input id="edit-city" defaultValue={selectedMunicipality.postalAddress.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-country">Country</Label>
                      <Input id="edit-country" defaultValue={selectedMunicipality.postalAddress.country} />
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-6">Contact Persons</h4>
                  {selectedMunicipality.contactPersons.map((contact, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded">
                      <div className="space-y-2">
                        <Label htmlFor={`edit-contactName-${index}`}>Contact Name</Label>
                        <Input id={`edit-contactName-${index}`} defaultValue={contact.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-contactRole-${index}`}>Role</Label>
                        <Input id={`edit-contactRole-${index}`} defaultValue={contact.role} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-contactEmail-${index}`}>Email</Label>
                        <Input id={`edit-contactEmail-${index}`} defaultValue={contact.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-contactPhone-${index}`}>Phone</Label>
                        <Input id={`edit-contactPhone-${index}`} defaultValue={contact.phone} />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-priceList">Price List</Label>
                    <Input id="edit-priceList" defaultValue={selectedMunicipality.priceList} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-accounting">Accounting Group</Label>
                    <Input id="edit-accounting" defaultValue={selectedMunicipality.accounting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-additionalAmount">Additional Amount (SEK)</Label>
                    <Input id="edit-additionalAmount" type="number" defaultValue={selectedMunicipality.additionalAmount} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="additional" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-schools">Number of Schools</Label>
                    <Input id="edit-schools" type="number" defaultValue={selectedMunicipality.schools} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-students">Number of Students</Label>
                    <Input id="edit-students" type="number" defaultValue={selectedMunicipality.students} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-administrators">Number of Administrators</Label>
                    <Input id="edit-administrators" type="number" defaultValue={selectedMunicipality.administrators} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateMunicipality}>Update Municipality</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalityManagement;
