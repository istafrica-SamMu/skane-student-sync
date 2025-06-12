
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { School, Plus, Search, MapPin, Users, Settings, Calendar } from "lucide-react";

const MunicipalSchoolUnits = () => {
  const schoolUnits = [
    {
      id: 1,
      name: "Malmö Central Elementary",
      address: "Centralgatan 15, Malmö",
      students: 380,
      grades: "K-6",
      principal: "Anna Lindström",
      status: "Active",
      capacity: 450
    },
    {
      id: 2,
      name: "Malmö North High School",
      address: "Nordgatan 22, Malmö",
      students: 620,
      grades: "7-12",
      principal: "Erik Johansson",
      status: "Active",
      capacity: 700
    },
    {
      id: 3,
      name: "Malmö Tech Academy",
      address: "Teknikvägen 8, Malmö",
      students: 295,
      grades: "10-12",
      principal: "Maria Nilsson",
      status: "Active",
      capacity: 350
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipal School Units</h1>
          <p className="text-ike-neutral">Manage school units within your municipality</p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
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
              placeholder="Search school units..."
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {schoolUnits.map((school) => (
              <Card key={school.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{school.name}</CardTitle>
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MunicipalSchoolUnits;
