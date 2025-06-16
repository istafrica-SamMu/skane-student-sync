
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { School, Plus, Search, MoreHorizontal, Edit, Trash2, Eye, MapPin, Users, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SchoolUnits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false);
  const [isEditSchoolOpen, setIsEditSchoolOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [deleteSchoolId, setDeleteSchoolId] = useState(null);
  
  // Mock data for schools in the region
  const [schools, setSchools] = useState([
    {
      id: 1,
      name: "Malmö International School",
      organizationNumber: "556789-1234",
      address: "Storgatan 12, 211 34 Malmö",
      phone: "040-123 45 67",
      email: "info@malmointernational.se",
      principalName: "Anna Andersson",
      principalEmail: "anna.andersson@malmointernational.se",
      type: "Independent",
      students: 450,
      status: "Active"
    },
    {
      id: 2,
      name: "Malmö Science Academy",
      organizationNumber: "556789-5678",
      address: "Vetenskapsgatan 5, 211 45 Malmö",
      phone: "040-234 56 78",
      email: "info@malmoscience.se",
      principalName: "Erik Johansson",
      principalEmail: "erik.johansson@malmoscience.se",
      type: "Independent",
      students: 320,
      status: "Active"
    },
    {
      id: 3,
      name: "Lund Technical School",
      organizationNumber: "556789-9012",
      address: "Teknikvägen 15, 223 62 Lund",
      phone: "046-345 67 89",
      email: "info@lundtech.se",
      principalName: "Maria Nilsson",
      principalEmail: "maria.nilsson@lundtech.se",
      type: "Independent",
      students: 280,
      status: "Active"
    }
  ]);

  const [newSchool, setNewSchool] = useState({
    name: "",
    organizationNumber: "",
    address: "",
    phone: "",
    email: "",
    principalName: "",
    principalEmail: "",
    type: "Independent"
  });

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.organizationNumber.includes(searchTerm) ||
    school.principalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSchool = () => {
    const schoolToAdd = {
      ...newSchool,
      id: schools.length + 1,
      students: 0,
      status: "Active"
    };
    setSchools([...schools, schoolToAdd]);
    setNewSchool({
      name: "",
      organizationNumber: "",
      address: "",
      phone: "",
      email: "",
      principalName: "",
      principalEmail: "",
      type: "Independent"
    });
    setIsAddSchoolOpen(false);
    toast({
      title: "School Added",
      description: `${newSchool.name} has been successfully added.`,
    });
  };

  const handleEditSchool = (school) => {
    setSelectedSchool(school);
    setIsEditSchoolOpen(true);
  };

  const handleUpdateSchool = () => {
    setSchools(schools.map(school => 
      school.id === selectedSchool.id ? selectedSchool : school
    ));
    setIsEditSchoolOpen(false);
    setSelectedSchool(null);
    toast({
      title: "School Updated",
      description: `${selectedSchool.name} has been successfully updated.`,
    });
  };

  const handleDeleteSchool = () => {
    setSchools(schools.filter(school => school.id !== deleteSchoolId));
    setDeleteSchoolId(null);
    toast({
      title: "School Deleted",
      description: "The school has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleViewSchool = (school) => {
    toast({
      title: "School Details",
      description: `Opening detailed view for ${school.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Regional School Units</h1>
          <p className="text-ike-neutral">Manage all school units in your region</p>
        </div>
        <Dialog open={isAddSchoolOpen} onOpenChange={setIsAddSchoolOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add School Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New School Unit</DialogTitle>
              <DialogDescription>
                Enter the details for the new school unit
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <Label htmlFor="orgNumber">Organization Number</Label>
                <Input
                  id="orgNumber"
                  value={newSchool.organizationNumber}
                  onChange={(e) => setNewSchool({...newSchool, organizationNumber: e.target.value})}
                  placeholder="556789-1234"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newSchool.address}
                  onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
                  placeholder="Street address, postal code, city"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newSchool.phone}
                  onChange={(e) => setNewSchool({...newSchool, phone: e.target.value})}
                  placeholder="040-123 45 67"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newSchool.email}
                  onChange={(e) => setNewSchool({...newSchool, email: e.target.value})}
                  placeholder="info@school.se"
                />
              </div>
              <div>
                <Label htmlFor="principalName">Principal Name</Label>
                <Input
                  id="principalName"
                  value={newSchool.principalName}
                  onChange={(e) => setNewSchool({...newSchool, principalName: e.target.value})}
                  placeholder="Enter principal name"
                />
              </div>
              <div>
                <Label htmlFor="principalEmail">Principal Email</Label>
                <Input
                  id="principalEmail"
                  type="email"
                  value={newSchool.principalEmail}
                  onChange={(e) => setNewSchool({...newSchool, principalEmail: e.target.value})}
                  placeholder="principal@school.se"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddSchoolOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSchool} className="bg-ike-primary hover:bg-ike-primary/90">
                Add School
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-ike-primary" />
            School Units Management
          </CardTitle>
          <CardDescription>
            Overview and management of all school units in your region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search schools..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School Name</TableHead>
                <TableHead>Organization Number</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-ike-neutral" />
                      <div>
                        <div className="font-medium">{school.name}</div>
                        <div className="text-sm text-ike-neutral">{school.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{school.organizationNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{school.principalName}</div>
                      <div className="text-sm text-ike-neutral">{school.principalEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-ike-neutral" />
                      <span className="text-sm">{school.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-ike-neutral" />
                      <span>{school.students}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {school.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                        <DropdownMenuItem onClick={() => handleViewSchool(school)} className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSchool(school)} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteSchoolId(school.id)} 
                          className="flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit School Dialog */}
      <Dialog open={isEditSchoolOpen} onOpenChange={setIsEditSchoolOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit School Unit</DialogTitle>
            <DialogDescription>
              Update the school unit information
            </DialogDescription>
          </DialogHeader>
          {selectedSchool && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="editSchoolName">School Name</Label>
                <Input
                  id="editSchoolName"
                  value={selectedSchool.name}
                  onChange={(e) => setSelectedSchool({...selectedSchool, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editOrgNumber">Organization Number</Label>
                <Input
                  id="editOrgNumber"
                  value={selectedSchool.organizationNumber}
                  onChange={(e) => setSelectedSchool({...selectedSchool, organizationNumber: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="editAddress">Address</Label>
                <Input
                  id="editAddress"
                  value={selectedSchool.address}
                  onChange={(e) => setSelectedSchool({...selectedSchool, address: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  value={selectedSchool.phone}
                  onChange={(e) => setSelectedSchool({...selectedSchool, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={selectedSchool.email}
                  onChange={(e) => setSelectedSchool({...selectedSchool, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPrincipalName">Principal Name</Label>
                <Input
                  id="editPrincipalName"
                  value={selectedSchool.principalName}
                  onChange={(e) => setSelectedSchool({...selectedSchool, principalName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPrincipalEmail">Principal Email</Label>
                <Input
                  id="editPrincipalEmail"
                  type="email"
                  value={selectedSchool.principalEmail}
                  onChange={(e) => setSelectedSchool({...selectedSchool, principalEmail: e.target.value})}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditSchoolOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSchool} className="bg-ike-primary hover:bg-ike-primary/90">
              Update School
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteSchoolId} onOpenChange={() => setDeleteSchoolId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the school unit and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSchool} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SchoolUnits;
