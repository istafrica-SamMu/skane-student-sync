
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { School, Plus, Search, MapPin, Users, Settings, Calendar, Phone, Mail, GraduationCap, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MunicipalSchoolUnits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchoolDetails, setShowSchoolDetails] = useState(false);
  const [showAddSchool, setShowAddSchool] = useState(false);

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
    toast({
      title: "Managing School",
      description: `Opening management interface for ${school.name}`,
    });
    console.log("Managing school:", school.name);
  };

  const handleScheduleManagement = (school) => {
    toast({
      title: "Schedule Management",
      description: `Opening schedule management for ${school.name}`,
    });
    console.log("Managing schedule for:", school.name);
  };

  const handleAddNewSchool = () => {
    setShowAddSchool(true);
    console.log("Opening add new school dialog");
  };

  const confirmAddSchool = () => {
    toast({
      title: "School Unit Added",
      description: "New school unit has been successfully added to the system.",
    });
    setShowAddSchool(false);
    console.log("Adding new school unit");
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

                    <div className="pt-3 border-t flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleManageSchool(school);
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScheduleManagement(school);
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
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
      <Dialog open={showAddSchool} onOpenChange={setShowAddSchool}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-primary">
              <Plus className="w-5 h-5 mr-2" />
              Add New School Unit
            </DialogTitle>
            <DialogDescription>
              This will open the school creation wizard
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-ike-neutral mb-4">
              You are about to create a new school unit in your municipal system. 
              This will open the comprehensive school setup wizard.
            </p>
            <div className="bg-ike-neutral-light p-3 rounded-lg">
              <p className="text-sm text-ike-neutral">
                The wizard will guide you through setting up:
              </p>
              <ul className="text-sm text-ike-neutral mt-2 space-y-1">
                <li>• Basic school information</li>
                <li>• Contact details and address</li>
                <li>• Capacity and grade levels</li>
                <li>• Principal assignment</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddSchool(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary/90"
              onClick={confirmAddSchool}
            >
              <Plus className="w-4 h-4 mr-2" />
              Open School Wizard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalSchoolUnits;
