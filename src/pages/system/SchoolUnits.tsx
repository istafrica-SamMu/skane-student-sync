
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { School, Plus, Search, MapPin, Users } from "lucide-react";

const SchoolUnits = () => {
  const schools = [
    {
      id: 1,
      name: "Malmö International School",
      municipality: "Malmö",
      type: "Independent",
      address: "Storgatan 12, Malmö",
      students: 450,
      programs: ["Natural Science", "Social Science"],
      status: "Active"
    },
    {
      id: 2,
      name: "Lund Technical Gymnasium",
      municipality: "Lund",
      type: "Municipal",
      address: "Teknikgatan 5, Lund",
      students: 680,
      programs: ["Technology", "Engineering"],
      status: "Active"
    },
    {
      id: 3,
      name: "Helsingborg Arts School",
      municipality: "Helsingborg",
      type: "Independent",
      address: "Konstvägen 8, Helsingborg",
      students: 320,
      programs: ["Arts", "Media"],
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">School Units</h1>
          <p className="text-ike-neutral">Manage school units across the region</p>
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
            Regional School Units
          </CardTitle>
          <CardDescription>
            Overview of all school units in the regional system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search schools..."
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {schools.map((school) => (
              <Card key={school.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{school.name}</CardTitle>
                      <CardDescription>{school.municipality} Municipality</CardDescription>
                    </div>
                    <Badge variant={school.type === 'Independent' ? 'default' : 'secondary'}>
                      {school.type}
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
                      <span className="text-ike-neutral">{school.students} students</span>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-ike-neutral-dark">Programs:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {school.programs.map((program, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        Manage School
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

export default SchoolUnits;
