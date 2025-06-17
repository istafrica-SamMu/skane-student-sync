
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building,
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  Edit,
  Save,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface SchoolUnit {
  id: string;
  name: string;
  unitCode: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  principal: string;
  totalStudents: number;
  establishedYear: number;
  description: string;
  status: 'active' | 'inactive';
}

const SchoolUnitInfo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock data for the school admin's school
  const [schoolUnit, setSchoolUnit] = useState<SchoolUnit>({
    id: "1",
    name: "Malmö Tech Academy",
    unitCode: "MTA001",
    address: "Teknikgatan 15",
    postalCode: "21141",
    city: "Malmö",
    phone: "040-123456",
    email: "info@malmotech.se",
    principal: user?.name || "Unknown",
    totalStudents: 450,
    establishedYear: 1998,
    description: "A modern technical school focusing on engineering, computer science, and digital media programs.",
    status: 'active'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUnit, setEditedUnit] = useState<SchoolUnit>(schoolUnit);

  const handleEdit = () => {
    setEditedUnit(schoolUnit);
    setIsEditing(true);
  };

  const handleSave = () => {
    setSchoolUnit(editedUnit);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "School unit information updated successfully!"
    });
  };

  const handleCancel = () => {
    setEditedUnit(schoolUnit);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof SchoolUnit, value: string | number) => {
    setEditedUnit(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">My School Unit</h1>
          <p className="text-ike-neutral mt-2">
            Manage your school unit information and settings
          </p>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Information
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* School Unit Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-ike-primary" />
              <span>Basic Information</span>
            </CardTitle>
            <CardDescription>
              Core details about your school unit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school-name">School Name</Label>
              {isEditing ? (
                <Input
                  id="school-name"
                  value={editedUnit.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <p className="text-ike-neutral-dark font-medium">{schoolUnit.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit-code">Unit Code</Label>
              {isEditing ? (
                <Input
                  id="unit-code"
                  value={editedUnit.unitCode}
                  onChange={(e) => handleInputChange('unitCode', e.target.value)}
                />
              ) : (
                <p className="text-ike-neutral-dark font-medium">{schoolUnit.unitCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="principal">Principal</Label>
              <p className="text-ike-neutral-dark font-medium">{schoolUnit.principal}</p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Badge variant={schoolUnit.status === 'active' ? 'default' : 'secondary'}>
                {schoolUnit.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label>Established Year</Label>
              <p className="text-ike-neutral-dark font-medium">{schoolUnit.establishedYear}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-ike-primary" />
              <span>Contact Information</span>
            </CardTitle>
            <CardDescription>
              Address and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={editedUnit.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              ) : (
                <p className="text-ike-neutral-dark font-medium">{schoolUnit.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                {isEditing ? (
                  <Input
                    id="postal-code"
                    value={editedUnit.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                ) : (
                  <p className="text-ike-neutral-dark font-medium">{schoolUnit.postalCode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                {isEditing ? (
                  <Input
                    id="city"
                    value={editedUnit.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                ) : (
                  <p className="text-ike-neutral-dark font-medium">{schoolUnit.city}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedUnit.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-ike-neutral" />
                  <p className="text-ike-neutral-dark font-medium">{schoolUnit.phone}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedUnit.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-ike-neutral" />
                  <p className="text-ike-neutral-dark font-medium">{schoolUnit.email}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description and Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Description */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>School Description</CardTitle>
            <CardDescription>
              Overview and description of your school
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedUnit.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full"
              />
            ) : (
              <p className="text-ike-neutral-dark">{schoolUnit.description}</p>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-ike-primary" />
              <span>Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-ike-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-ike-primary">{schoolUnit.totalStudents}</div>
              <div className="text-sm text-ike-neutral">Total Students</div>
            </div>

            <div className="text-center p-4 bg-ike-neutral-light rounded-lg">
              <div className="text-2xl font-bold text-ike-neutral-dark">
                {new Date().getFullYear() - schoolUnit.establishedYear}
              </div>
              <div className="text-sm text-ike-neutral">Years of Operation</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolUnitInfo;
