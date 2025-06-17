
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Users, School, Edit, Trash2, MoreVertical, MapPin, Phone, Mail, Calendar, Link2, Unlink } from "lucide-react";
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

const GroupManagement = () => {
  const { toast } = useToast();
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Skåne Education Group",
      organizationNumber: "556123-4567",
      startDate: "2020-01-01",
      endDate: null,
      status: "Active",
      contactPersons: [
        { name: "Lars Andersson", role: "Group Manager", email: "lars.andersson@skaneedu.se", phone: "+46 40 123 456" }
      ],
      postalAddress: {
        street: "Bildningsgatan 12",
        postalCode: "211 45",
        city: "Malmö",
        country: "Sweden"
      },
      municipalityCode: "MAL",
      municipalityName: "Malmö Municipality",
      additionalAmount: 15000,
      linkedPrincipals: [
        { id: 1, name: "Malmö Technical School", type: "Principal" },
        { id: 2, name: "Skåne Business Academy", type: "Principal" }
      ],
      linkedSchoolUnits: [
        { id: 1, name: "Malmö Tech Campus A", principalId: 1 },
        { id: 2, name: "Malmö Tech Campus B", principalId: 1 },
        { id: 3, name: "Business Academy Main", principalId: 2 }
      ]
    },
    {
      id: 2,
      name: "Lund Academic Consortium",
      organizationNumber: "556789-0123",
      startDate: "2019-08-15",
      endDate: null,
      status: "Active",
      contactPersons: [
        { name: "Anna Bergström", role: "Consortium Director", email: "anna.bergstrom@lundacademic.se", phone: "+46 46 987 654" }
      ],
      postalAddress: {
        street: "Universitetsgatan 8",
        postalCode: "223 50",
        city: "Lund",
        country: "Sweden"
      },
      municipalityCode: "LUN",
      municipalityName: "Lund Municipality",
      additionalAmount: 8500,
      linkedPrincipals: [
        { id: 3, name: "Lund Science Institute", type: "Principal" }
      ],
      linkedSchoolUnits: [
        { id: 4, name: "Science Lab Building", principalId: 3 },
        { id: 5, name: "Research Wing", principalId: 3 }
      ]
    }
  ]);

  const handleAddGroup = () => {
    toast({
      title: "Group Added",
      description: "New group has been successfully added to the system.",
    });
    setIsAddGroupOpen(false);
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsEditGroupOpen(true);
  };

  const handleUpdateGroup = () => {
    toast({
      title: "Group Updated",
      description: "Group information has been successfully updated.",
    });
    setIsEditGroupOpen(false);
    setSelectedGroup(null);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
    toast({
      title: "Group Deleted",
      description: "Group has been successfully removed from the system.",
      variant: "destructive",
    });
  };

  const handleManageGroup = (group) => {
    setSelectedGroup(group);
    setIsEditGroupOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Group Management</h1>
          <p className="text-ike-neutral">Manage education groups and their affiliated principals and school units</p>
        </div>
        
        <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
              <DialogDescription>
                Create a new education group and configure its basic information, contacts, and affiliations.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact & Address</TabsTrigger>
                <TabsTrigger value="affiliations">Affiliations</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupName">Group Name *</Label>
                    <Input id="groupName" placeholder="Enter group name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgNumber">Organization Number *</Label>
                    <Input id="orgNumber" placeholder="XXXXXX-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input id="endDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipalityCode">Municipality Code</Label>
                    <Input id="municipalityCode" placeholder="Municipality code" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipalityName">Municipality Name</Label>
                    <Input id="municipalityName" placeholder="Municipality name" />
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
                      <Input id="contactRole" placeholder="Group Manager" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input id="contactEmail" type="email" placeholder="email@group.se" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input id="contactPhone" placeholder="+46 XX XXX XXXX" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="affiliations" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Linked Principals</h4>
                    <p className="text-sm text-ike-neutral mb-4">Select principals to link to this group</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Link2 className="w-4 h-4 mr-2" />
                        Link Principal
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Linked School Units</h4>
                    <p className="text-sm text-ike-neutral mb-4">School units will be automatically linked through their principals</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Link2 className="w-4 h-4 mr-2" />
                        Link School Unit
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="additionalAmount">Additional Amount (SEK)</Label>
                    <Input id="additionalAmount" type="number" placeholder="0" defaultValue="0" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit" onClick={handleAddGroup}>Add Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-ike-primary" />
                  {group.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white" align="end">
                    <DropdownMenuItem onClick={() => handleEditGroup(group)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleManageGroup(group)}>
                      <Building2 className="w-4 h-4 mr-2" />
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
                            This action cannot be undone. This will permanently delete the group
                            "{group.name}" and remove all associated affiliations.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteGroup(group.id)}>
                            Delete Group
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                <div className="space-y-1">
                  <div>Org. Nr: {group.organizationNumber}</div>
                  <div>{group.municipalityName}</div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ike-neutral">Status</span>
                  <Badge className="bg-green-100 text-green-800">{group.status}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Start Date</span>
                    </div>
                    <span className="font-medium">{new Date(group.startDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Principals</span>
                    </div>
                    <span className="font-medium">{group.linkedPrincipals.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">School Units</span>
                    </div>
                    <span className="font-medium">{group.linkedSchoolUnits.length}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-ike-neutral" />
                    <span className="text-sm">{group.postalAddress.city}</span>
                  </div>
                  {group.additionalAmount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Additional: +{group.additionalAmount.toLocaleString()} SEK</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleManageGroup(group)}
                  >
                    Manage Group
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Group Dialog */}
      <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Update group information, contacts, and manage affiliations.
            </DialogDescription>
          </DialogHeader>
          {selectedGroup && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact & Address</TabsTrigger>
                <TabsTrigger value="affiliations">Affiliations</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-groupName">Group Name</Label>
                    <Input id="edit-groupName" defaultValue={selectedGroup.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-orgNumber">Organization Number</Label>
                    <Input id="edit-orgNumber" defaultValue={selectedGroup.organizationNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-startDate">Start Date</Label>
                    <Input id="edit-startDate" type="date" defaultValue={selectedGroup.startDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-endDate">End Date</Label>
                    <Input id="edit-endDate" type="date" defaultValue={selectedGroup.endDate || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-municipalityCode">Municipality Code</Label>
                    <Input id="edit-municipalityCode" defaultValue={selectedGroup.municipalityCode} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-municipalityName">Municipality Name</Label>
                    <Input id="edit-municipalityName" defaultValue={selectedGroup.municipalityName} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Postal Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-street">Street Address</Label>
                      <Input id="edit-street" defaultValue={selectedGroup.postalAddress.street} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-postalCode">Postal Code</Label>
                      <Input id="edit-postalCode" defaultValue={selectedGroup.postalAddress.postalCode} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-city">City</Label>
                      <Input id="edit-city" defaultValue={selectedGroup.postalAddress.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-country">Country</Label>
                      <Input id="edit-country" defaultValue={selectedGroup.postalAddress.country} />
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-6">Contact Persons</h4>
                  {selectedGroup.contactPersons.map((contact, index) => (
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
              
              <TabsContent value="affiliations" className="space-y-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Linked Principals</h4>
                    <div className="space-y-2">
                      {selectedGroup.linkedPrincipals.map((principal) => (
                        <div key={principal.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-ike-neutral" />
                            <span>{principal.name}</span>
                            <Badge variant="outline">{principal.type}</Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Unlink className="w-4 h-4 mr-2" />
                            Unlink
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm">
                        <Link2 className="w-4 h-4 mr-2" />
                        Link New Principal
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Linked School Units</h4>
                    <div className="space-y-2">
                      {selectedGroup.linkedSchoolUnits.map((unit) => (
                        <div key={unit.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-2">
                            <School className="w-4 h-4 text-ike-neutral" />
                            <span>{unit.name}</span>
                            <Badge variant="outline">
                              Principal ID: {unit.principalId}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Unlink className="w-4 h-4 mr-2" />
                            Unlink
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm">
                        <Link2 className="w-4 h-4 mr-2" />
                        Link New School Unit
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-additionalAmount">Additional Amount (SEK)</Label>
                    <Input id="edit-additionalAmount" type="number" defaultValue={selectedGroup.additionalAmount} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateGroup}>Update Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupManagement;
