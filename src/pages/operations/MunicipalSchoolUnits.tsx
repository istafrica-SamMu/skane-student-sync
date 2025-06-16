
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { School, Plus, Search, MapPin, Users, Settings, Phone, Mail, GraduationCap, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MunicipalSchoolUnits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchoolDetails, setShowSchoolDetails] = useState(false);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [showManageSchool, setShowManageSchool] = useState(false);
  const [managedSchool, setManagedSchool] = useState(null);

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

  const schoolUnits = [
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
  ];

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
    setManagedSchool(school);
    setShowManageSchool(true);
    console.log("Managing school:", school.name);
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
    console.log("Adding new school unit:", newSchool);
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
                        <Settings className="w-4 h-4 mr-2" />
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
                  Manage School
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

      {/* Manage School Modal */}
      <Dialog open={showManageSchool} onOpenChange={setShowManageSchool}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-primary">
              <Settings className="w-5 h-5 mr-2" />
              Manage School Unit
            </DialogTitle>
            <DialogDescription>
              Administrative management for {managedSchool?.name}
            </DialogDescription>
          </DialogHeader>
          {managedSchool && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:bg-ike-neutral-light/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-ike-primary" />
                      <div>
                        <h3 className="font-semibold">Student Management</h3>
                        <p className="text-sm text-ike-neutral">Manage enrollments and student data</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-ike-neutral-light/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-ike-primary" />
                      <div>
                        <h3 className="font-semibold">Staff Management</h3>
                        <p className="text-sm text-ike-neutral">Manage teachers and staff</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-ike-neutral-light/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Building className="w-8 h-8 text-ike-primary" />
                      <div>
                        <h3 className="font-semibold">Facilities</h3>
                        <p className="text-sm text-ike-neutral">Manage school facilities and resources</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-ike-neutral-light/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Settings className="w-8 h-8 text-ike-primary" />
                      <div>
                        <h3 className="font-semibold">School Settings</h3>
                        <p className="text-sm text-ike-neutral">Configure school policies and settings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-2">Quick Stats</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-ike-primary">{managedSchool.students}</p>
                    <p className="text-xs text-ike-neutral">Total Students</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-ike-neutral-dark">25</p>
                    <p className="text-xs text-ike-neutral">Staff Members</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-ike-success">
                      {Math.round((managedSchool.students / managedSchool.capacity) * 100)}%
                    </p>
                    <p className="text-xs text-ike-neutral">Capacity Used</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowManageSchool(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-ike-primary hover:bg-ike-primary/90"
                  onClick={() => {
                    toast({
                      title: "Feature Access",
                      description: `Opening detailed management interface for ${managedSchool.name}`,
                    });
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Management
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalSchoolUnits;
