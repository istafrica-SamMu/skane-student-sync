
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { School, Edit, MapPin, Users, Building, Phone, Mail, User, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SchoolInfo = () => {
  const { toast } = useToast();
  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  
  // Mock data for the school admin's school
  const [schoolData, setSchoolData] = useState({
    id: 1,
    name: "Malmö International School",
    organizationNumber: "556789-1234",
    address: "Storgatan 12, 211 34 Malmö",
    phone: "040-123 45 67",
    email: "info@malmointernational.se",
    website: "www.malmointernational.se",
    principalName: "Anna Andersson",
    principalEmail: "anna.andersson@malmointernational.se",
    principalPhone: "040-123 45 68",
    type: "Independent",
    students: 450,
    status: "Active",
    description: "Malmö International School is committed to providing excellent education with an international perspective, fostering global citizenship and academic excellence.",
    founded: "1995",
    grades: "K-12",
    curriculum: "International Baccalaureate"
  });

  const [editData, setEditData] = useState({ ...schoolData });

  const handleSaveInfo = () => {
    setSchoolData({ ...editData });
    setIsEditInfoOpen(false);
    toast({
      title: "School Information Updated",
      description: "School information has been successfully updated.",
    });
  };

  const handleSaveContact = () => {
    setSchoolData({ ...editData });
    setIsEditContactOpen(false);
    toast({
      title: "Contact Information Updated",
      description: "Contact information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditData({ ...schoolData });
    setIsEditInfoOpen(false);
    setIsEditContactOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">School Information</h1>
          <p className="text-ike-neutral">Manage your school's information and settings</p>
        </div>
        <Badge className="bg-green-100 text-green-800 px-3 py-1">
          {schoolData.status}
        </Badge>
      </div>

      {/* School Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-6 h-6 text-ike-primary" />
            School Overview
          </CardTitle>
          <CardDescription>
            Basic information about your school
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">School Name</Label>
                <p className="text-lg font-semibold">{schoolData.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Organization Number</Label>
                <p className="font-medium">{schoolData.organizationNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">School Type</Label>
                <p className="font-medium">{schoolData.type}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Founded</Label>
                <p className="font-medium">{schoolData.founded}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Grades Offered</Label>
                <p className="font-medium">{schoolData.grades}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Curriculum</Label>
                <p className="font-medium">{schoolData.curriculum}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Total Students</Label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-ike-neutral" />
                  <span className="font-semibold text-lg">{schoolData.students}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Label className="text-sm font-medium text-ike-neutral-dark">Description</Label>
            <p className="mt-2 text-ike-neutral leading-relaxed">{schoolData.description}</p>
          </div>

          <div className="mt-6 flex justify-end">
            <Dialog open={isEditInfoOpen} onOpenChange={setIsEditInfoOpen}>
              <DialogTrigger asChild>
                <Button className="bg-ike-primary hover:bg-ike-primary/90">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit School Information
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit School Information</DialogTitle>
                  <DialogDescription>
                    Update your school's basic information
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <Label htmlFor="editName">School Name</Label>
                    <Input
                      id="editName"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editType">School Type</Label>
                    <Input
                      id="editType"
                      value={editData.type}
                      onChange={(e) => setEditData({...editData, type: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editFounded">Founded Year</Label>
                    <Input
                      id="editFounded"
                      value={editData.founded}
                      onChange={(e) => setEditData({...editData, founded: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editGrades">Grades Offered</Label>
                    <Input
                      id="editGrades"
                      value={editData.grades}
                      onChange={(e) => setEditData({...editData, grades: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCurriculum">Curriculum</Label>
                    <Input
                      id="editCurriculum"
                      value={editData.curriculum}
                      onChange={(e) => setEditData({...editData, curriculum: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editStudents">Total Students</Label>
                    <Input
                      id="editStudents"
                      type="number"
                      value={editData.students}
                      onChange={(e) => setEditData({...editData, students: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="editDescription">Description</Label>
                    <Textarea
                      id="editDescription"
                      value={editData.description}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveInfo} className="bg-ike-primary hover:bg-ike-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-6 h-6 text-ike-primary" />
            Contact Information
          </CardTitle>
          <CardDescription>
            School location and contact details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Address</Label>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-ike-neutral mt-1" />
                  <p className="font-medium">{schoolData.address}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Phone</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-ike-neutral" />
                  <p className="font-medium">{schoolData.phone}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-ike-neutral" />
                  <p className="font-medium">{schoolData.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Principal</Label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-4 h-4 text-ike-neutral" />
                  <p className="font-medium">{schoolData.principalName}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Principal Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-ike-neutral" />
                  <p className="font-medium">{schoolData.principalEmail}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-ike-neutral-dark">Principal Phone</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-ike-neutral" />
                  <p className="font-medium">{schoolData.principalPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Dialog open={isEditContactOpen} onOpenChange={setIsEditContactOpen}>
              <DialogTrigger asChild>
                <Button className="bg-ike-primary hover:bg-ike-primary/90">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Contact Information
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Contact Information</DialogTitle>
                  <DialogDescription>
                    Update your school's contact details
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="col-span-2">
                    <Label htmlFor="editAddress">Address</Label>
                    <Input
                      id="editAddress"
                      value={editData.address}
                      onChange={(e) => setEditData({...editData, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPhone">Phone</Label>
                    <Input
                      id="editPhone"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editEmail">Email</Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPrincipalName">Principal Name</Label>
                    <Input
                      id="editPrincipalName"
                      value={editData.principalName}
                      onChange={(e) => setEditData({...editData, principalName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPrincipalEmail">Principal Email</Label>
                    <Input
                      id="editPrincipalEmail"
                      type="email"
                      value={editData.principalEmail}
                      onChange={(e) => setEditData({...editData, principalEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPrincipalPhone">Principal Phone</Label>
                    <Input
                      id="editPrincipalPhone"
                      value={editData.principalPhone}
                      onChange={(e) => setEditData({...editData, principalPhone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editWebsite">Website</Label>
                    <Input
                      id="editWebsite"
                      value={editData.website}
                      onChange={(e) => setEditData({...editData, website: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveContact} className="bg-ike-primary hover:bg-ike-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolInfo;
