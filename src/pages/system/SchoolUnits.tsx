
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { School, Edit, Save, MapPin, Phone, Mail, Building, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SchoolUnits = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock current school data - in real app this would come from API
  const [schoolData, setSchoolData] = useState({
    name: "Malmö International School",
    organizationNumber: "556789-1234",
    address: "Storgatan 12",
    postalCode: "211 34",
    city: "Malmö",
    phone: "040-123 45 67",
    email: "info@malmointernational.se",
    website: "www.malmointernational.se",
    bankAccount: "123456789",
    bankName: "Swedbank",
    principalName: "Anna Andersson",
    principalEmail: "anna.andersson@malmointernational.se",
    type: "Independent",
    students: 450,
    programs: ["Natural Science", "Social Science", "Technology"]
  });

  const handleSave = () => {
    // In real app, this would save to API
    setIsEditing(false);
    console.log("Saving school data:", schoolData);
  };

  const handleInputChange = (field: string, value: string) => {
    setSchoolData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">School Unit Information</h1>
          <p className="text-ike-neutral">Manage your school's information, contact details, and bank information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-ike-primary hover:bg-ike-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-ike-primary hover:bg-ike-primary/90">
              <Edit className="w-4 h-4 mr-2" />
              Edit School Information
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-ike-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>
              School name, organization number, and type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                value={schoolData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="orgNumber">Organization Number</Label>
              <Input
                id="orgNumber"
                value={schoolData.organizationNumber}
                onChange={(e) => handleInputChange('organizationNumber', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label>School Type</Label>
              <Badge variant="secondary" className="ml-2">{schoolData.type}</Badge>
            </div>
            <div>
              <Label>Current Students</Label>
              <div className="text-2xl font-bold text-ike-primary">{schoolData.students}</div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-ike-primary" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Address, phone, email, and website details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={schoolData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={schoolData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={schoolData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={schoolData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={schoolData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={schoolData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bank Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-ike-primary" />
              Bank Information
            </CardTitle>
            <CardDescription>
              Banking details for financial transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={schoolData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input
                id="bankAccount"
                value={schoolData.bankAccount}
                onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Principal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-ike-primary" />
              Principal Information
            </CardTitle>
            <CardDescription>
              Principal contact details and references
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principalName">Principal Name</Label>
              <Input
                id="principalName"
                value={schoolData.principalName}
                onChange={(e) => handleInputChange('principalName', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="principalEmail">Principal Email</Label>
              <Input
                id="principalEmail"
                type="email"
                value={schoolData.principalEmail}
                onChange={(e) => handleInputChange('principalEmail', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programs Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Program Offerings</CardTitle>
          <CardDescription>
            Current programs offered at your school
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {schoolData.programs.map((program, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {program}
              </Badge>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            <Edit className="w-4 h-4 mr-2" />
            Manage Programs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolUnits;
