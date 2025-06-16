
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { School, Plus, Search, MapPin, Users, Settings, Phone, Mail, GraduationCap, Building, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MunicipalSchoolUnits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchoolDetails, setShowSchoolDetails] = useState(false);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [showEditSchool, setShowEditSchool] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  // Form state for adding new school
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    principal: "",
    grades: "",
    capacity: "",
    type: "Municipal Elementary"
  });

  const [schoolUnits, setSchoolUnits] = useState([
    {
      id: 1,
      name: "Malmö Central Elementary",
      address: "Centralgatan 15, Malmö",
      students: 380,
      grades: "K-6",
      principal: "Anna Lindström",
      status: "Active",
      capacity: 450,
      phone: "040-123 45 67",
      email: "info@malmocentral.se",
      founded: "1985",
      type: "Municipal Elementary"
    },
    {
      id: 2,
      name: "Malmö North High School",
      address: "Nordgatan 22, Malmö",
      students: 620,
      grades: "7-12",
      principal: "Erik Johansson",
      status: "Active",
      capacity: 700,
      phone: "040-234 56 78",
      email: "info@malmonorth.se",
      founded: "1972",
      type: "Municipal High School"
    },
    {
      id: 3,
      name: "Malmö Tech Academy",
      address: "Teknikvägen 8, Malmö",
      students: 295,
      grades: "10-12",
      principal: "Maria Nilsson",
      status: "Active",
      capacity: 350,
      phone: "040-345 67 89",
      email: "info@malmotech.se",
      founded: "1998",
      type: "Technical Academy"
    }
  ]);

  const filteredSchools = schoolUnits.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewSchoolDetails = (school) => {
    setSelectedSchool(school);
    setShowSchoolDetails(true);
    console.log("Opening school details for:", school.name);
  };

  const handleManageSchool = (school) => {
    setEditingSchool({...school});
    setShowEditSchool(true);
    console.log("Opening edit modal for school:", school.name);
  };

  const handleUpdateSchool = () => {
    if (!editingSchool.name || !editingSchool.address || !editingSchool.principal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, address, principal).",
        variant: "destructive",
      });
      return;
    }

    // Ensure proper type conversion for numeric fields
    const updatedSchool = {
      ...editingSchool,
      capacity: typeof editingSchool.capacity === 'string' ? parseInt(editingSchool.capacity) || 0 : editingSchool.capacity,
      students: typeof editingSchool.students === 'string' ? parseInt(editingSchool.students) || 0 : editingSchool.students
    };

    setSchoolUnits(schoolUnits.map(school => 
      school.id === editingSchool.id ? updatedSchool : school
    ));
    
    setShowEditSchool(false);
    setEditingSchool(null);
    
    toast({
      title: "School Updated",
      description: `${editingSchool.name} has been successfully updated.`,
    });
    
    console.log("Updated school:", updatedSchool);
  };

  const handleAddNewSchool = () => {
    setShowAddSchool(true);
    console.log("Opening add new school dialog");
  };

  const handleSubmitNewSchool = () => {
    // Validate required fields
    if (!newSchool.name || !newSchool.address || !newSchool.principal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, address, principal).",
        variant: "destructive",
      });
      return;
    }

    // Ensure proper type conversion for numeric fields
    const schoolToAdd = {
      ...newSchool,
      id: schoolUnits.length + 1,
      students: 0,
      status: "Active",
      founded: new Date().getFullYear().toString(),
      capacity: parseInt(newSchool.capacity) || 0
    };

    setSchoolUnits([...schoolUnits, schoolToAdd]);

    toast({
      title: "School Unit Added",
      description: `${newSchool.name} has been successfully added to the system.`,
    });
    
    // Reset form
    setNewSchool({
      name: "",
      address: "",
      phone: "",
      email: "",
      principal: "",
      grades: "",
      capacity: "",
      type: "Municipal Elementary"
    });
    
    setShowAddSchool(false);
    console.log("Adding new school unit:", schoolToAdd);
  };

  const handleCloseAddSchool = () => {
    setShowAddSchool(false);
    // Reset form when closing
    setNewSchool({
      name: "",
      address: "",
      phone: "",
      email: "",
      principal: "",
      grades: "",
      capacity: "",
      type: "Municipal Elementary"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipal School Units</h1>
          <p className="text-ike-neutral">Manage school units within your municipality</p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary/90"
          onClick={handleAddNewSchool}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add School Unit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5" />
            School Units Overview
          </CardTitle>
          <CardDescription>
            Manage all school units within your municipal jurisdiction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search school units by name, principal, or address..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSchools.map((school) => (
              <Card key={school.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader onClick={() => handleViewSchoolDetails(school)}>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg hover:text-ike-primary transition-colors">
                        {school.name}
                      </CardTitle>
                      <CardDescription>Principal: {school.principal}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {school.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-ike-neutral" />
                      <span className="text-ike-neutral">{school.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-ike-neutral" />
                      <span className="text-ike-neutral">{school.students}/{school.capacity} students</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <School className="w-4 h-4 text-ike-neutral" />
                      <span className="text-ike-neutral">Grades: {school.grades}</span>
                    </div>

                    <div className="pt-3 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleManageSchool(school);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Manage School
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-8">
              <School className="w-12 h-12 text-ike-neutral mx-auto mb-4" />
              <p className="text-ike-neutral">No school units found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* School Details Modal */}
      <Dialog open={showSchoolDetails} onOpenChange={setShowSchoolDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-primary">
              <Building className="w-5 h-5 mr-2" />
              School Unit Details
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about the selected school unit
            </DialogDescription>
          </DialogHeader>
          {selectedSchool && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">School Name</label>
                    <p className="text-ike-neutral-dark font-medium">{selectedSchool.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Type</label>
                    <p className="text-ike-neutral-dark">{selectedSchool.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Principal</label>
                    <p className="text-ike-neutral-dark">{selectedSchool.principal}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Founded</label>
                    <p className="text-ike-neutral-dark">{selectedSchool.founded}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Address</label>
                    <p className="text-ike-neutral-dark">{selectedSchool.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Phone</label>
                    <p className="text-ike-neutral-dark flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {selectedSchool.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Email</label>
                    <p className="text-ike-neutral-dark flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {selectedSchool.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Grades</label>
                    <p className="text-ike-neutral-dark flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {selectedSchool.grades}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-3">Capacity & Enrollment</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-ike-primary">{selectedSchool.students}</p>
                    <p className="text-sm text-ike-neutral">Current Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-ike-neutral-dark">{selectedSchool.capacity}</p>
                    <p className="text-sm text-ike-neutral">Total Capacity</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-ike-success">
                      {Math.round((selectedSchool.students / selectedSchool.capacity) * 100)}%
                    </p>
                    <p className="text-sm text-ike-neutral">Utilization</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowSchoolDetails(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-ike-primary hover:bg-ike-primary/90"
                  onClick={() => {
                    setShowSchoolDetails(false);
                    handleManageSchool(selectedSchool);
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit School
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New School Modal */}
      <Dialog open={showAddSchool} onOpenChange={handleCloseAddSchool}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-primary">
              <Plus className="w-5 h-5 mr-2" />
              Add New School Unit
            </DialogTitle>
            <DialogDescription>
              Create a new school unit in your municipal system
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="schoolName">School Name *</Label>
              <Input
                id="schoolName"
                value={newSchool.name}
                onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                placeholder="Enter school name"
              />
            </div>
            <div>
              <Label htmlFor="schoolType">School Type</Label>
              <Input
                id="schoolType"
                value={newSchool.type}
                onChange={(e) => setNewSchool({...newSchool, type: e.target.value})}
                placeholder="Municipal Elementary"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address *</Label>
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
              <Label htmlFor="principal">Principal Name *</Label>
              <Input
                id="principal"
                value={newSchool.principal}
                onChange={(e) => setNewSchool({...newSchool, principal: e.target.value})}
                placeholder="Enter principal name"
              />
            </div>
            <div>
              <Label htmlFor="grades">Grade Levels</Label>
              <Input
                id="grades"
                value={newSchool.grades}
                onChange={(e) => setNewSchool({...newSchool, grades: e.target.value})}
                placeholder="K-6 or 7-12"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="capacity">School Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={newSchool.capacity}
                onChange={(e) => setNewSchool({...newSchool, capacity: e.target.value})}
                placeholder="450"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCloseAddSchool}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary/90"
              onClick={handleSubmitNewSchool}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add School Unit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit School Modal */}
      <Dialog open={showEditSchool} onOpenChange={setShowEditSchool}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-primary">
              <Edit className="w-5 h-5 mr-2" />
              Edit School Unit
            </DialogTitle>
            <DialogDescription>
              Update school unit information for {editingSchool?.name}
            </DialogDescription>
          </DialogHeader>
          {editingSchool && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="editSchoolName">School Name *</Label>
                <Input
                  id="editSchoolName"
                  value={editingSchool.name}
                  onChange={(e) => setEditingSchool({...editingSchool, name: e.target.value})}
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <Label htmlFor="editSchoolType">School Type</Label>
                <Input
                  id="editSchoolType"
                  value={editingSchool.type}
                  onChange={(e) => setEditingSchool({...editingSchool, type: e.target.value})}
                  placeholder="Municipal Elementary"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="editAddress">Address *</Label>
                <Input
                  id="editAddress"
                  value={editingSchool.address}
                  onChange={(e) => setEditingSchool({...editingSchool, address: e.target.value})}
                  placeholder="Street address, postal code, city"
                />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  value={editingSchool.phone}
                  onChange={(e) => setEditingSchool({...editingSchool, phone: e.target.value})}
                  placeholder="040-123 45 67"
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editingSchool.email}
                  onChange={(e) => setEditingSchool({...editingSchool, email: e.target.value})}
                  placeholder="info@school.se"
                />
              </div>
              <div>
                <Label htmlFor="editPrincipal">Principal Name *</Label>
                <Input
                  id="editPrincipal"
                  value={editingSchool.principal}
                  onChange={(e) => setEditingSchool({...editingSchool, principal: e.target.value})}
                  placeholder="Enter principal name"
                />
              </div>
              <div>
                <Label htmlFor="editGrades">Grade Levels</Label>
                <Input
                  id="editGrades"
                  value={editingSchool.grades}
                  onChange={(e) => setEditingSchool({...editingSchool, grades: e.target.value})}
                  placeholder="K-6 or 7-12"
                />
              </div>
              <div>
                <Label htmlFor="editCapacity">School Capacity</Label>
                <Input
                  id="editCapacity"
                  type="number"
                  value={editingSchool.capacity}
                  onChange={(e) => setEditingSchool({...editingSchool, capacity: e.target.value})}
                  placeholder="450"
                />
              </div>
              <div>
                <Label htmlFor="editStudents">Current Students</Label>
                <Input
                  id="editStudents"
                  type="number"
                  value={editingSchool.students}
                  onChange={(e) => setEditingSchool({...editingSchool, students: parseInt(e.target.value) || 0})}
                  placeholder="380"
                />
              </div>
              <div>
                <Label htmlFor="editFounded">Founded Year</Label>
                <Input
                  id="editFounded"
                  value={editingSchool.founded}
                  onChange={(e) => setEditingSchool({...editingSchool, founded: e.target.value})}
                  placeholder="1985"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditSchool(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary/90"
              onClick={handleUpdateSchool}
            >
              <Edit className="w-4 h-4 mr-2" />
              Update School
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalSchoolUnits;
