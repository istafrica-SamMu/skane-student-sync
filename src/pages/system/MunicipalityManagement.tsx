
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Users, School } from "lucide-react";

const MunicipalityManagement = () => {
  const municipalities = [
    {
      id: 1,
      name: "Malmö Municipality",
      code: "MAL",
      schools: 45,
      students: 12500,
      administrators: 8,
      status: "Active"
    },
    {
      id: 2,
      name: "Lund Municipality",
      code: "LUN",
      schools: 28,
      students: 8200,
      administrators: 5,
      status: "Active"
    },
    {
      id: 3,
      name: "Helsingborg Municipality",
      code: "HEL",
      schools: 38,
      students: 11000,
      administrators: 7,
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipality Management</h1>
          <p className="text-ike-neutral">Manage municipalities in the regional system</p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Municipality
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {municipalities.map((municipality) => (
          <Card key={municipality.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-ike-primary" />
                {municipality.name}
              </CardTitle>
              <CardDescription>Code: {municipality.code}</CardDescription>
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

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Manage Municipality
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MunicipalityManagement;
