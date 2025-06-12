
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, AlertTriangle, Search, Filter, CheckCircle, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LocationControl = () => {
  const doublePlacements = [
    {
      id: 1,
      student: "Alice Johansson",
      personalNumber: "200508-1234",
      placements: [
        { school: "Malmö Central Elementary", grade: "Grade 5", status: "Active" },
        { school: "Lund International School", grade: "Grade 5", status: "Pending" }
      ],
      detectedDate: "2024-06-10",
      priority: "High"
    },
    {
      id: 2,
      student: "Oliver Nilsson",
      personalNumber: "200312-5678",
      placements: [
        { school: "Malmö North High School", grade: "Grade 9", status: "Active" },
        { school: "Helsingborg Arts School", grade: "Grade 9", status: "Active" }
      ],
      detectedDate: "2024-06-09",
      priority: "Critical"
    }
  ];

  const locationViolations = [
    {
      id: 1,
      student: "Emma Larsson",
      homeAddress: "Storgatan 15, Malmö",
      schoolLocation: "Teknikvägen 25, Lund",
      distance: "25 km",
      violation: "Cross-municipal enrollment without approval",
      status: "Under Review"
    },
    {
      id: 2,
      student: "Max Andersson",
      homeAddress: "Centralgatan 8, Helsingborg",
      schoolLocation: "Nordgatan 12, Malmö",
      distance: "45 km",
      violation: "Exceeds maximum distance limit",
      status: "Pending Action"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Location Control & Double Placement</h1>
          <p className="text-ike-neutral">Detect and resolve placement conflicts and location violations</p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Run Detection
        </Button>
      </div>

      <Tabs defaultValue="double-placement" className="space-y-6">
        <TabsList>
          <TabsTrigger value="double-placement">Double Placement Detection</TabsTrigger>
          <TabsTrigger value="location-control">Location Control</TabsTrigger>
        </TabsList>

        <TabsContent value="double-placement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Double Placement Alerts
              </CardTitle>
              <CardDescription>
                Students enrolled in multiple schools simultaneously
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                  <Input
                    placeholder="Search by student name or personal number..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {doublePlacements.map((case_item) => (
                  <div key={case_item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{case_item.student}</h3>
                          <Badge variant={case_item.priority === 'Critical' ? 'destructive' : 'default'}>
                            {case_item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-ike-neutral">Personal Number: {case_item.personalNumber}</p>
                        <p className="text-sm text-ike-neutral">Detected: {case_item.detectedDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Active Placements:</h4>
                      {case_item.placements.map((placement, index) => (
                        <div key={index} className="flex items-center justify-between bg-ike-neutral-light/50 p-3 rounded">
                          <div>
                            <p className="font-medium">{placement.school}</p>
                            <p className="text-sm text-ike-neutral">{placement.grade}</p>
                          </div>
                          <Badge className={placement.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {placement.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location-control" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Violations
              </CardTitle>
              <CardDescription>
                Students enrolled outside their designated catchment areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                  <Input
                    placeholder="Search violations..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {locationViolations.map((violation) => (
                  <div key={violation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{violation.student}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-ike-neutral">Home Address:</span>
                            <p className="font-medium">{violation.homeAddress}</p>
                          </div>
                          <div>
                            <span className="text-ike-neutral">School Location:</span>
                            <p className="font-medium">{violation.schoolLocation}</p>
                          </div>
                          <div>
                            <span className="text-ike-neutral">Distance:</span>
                            <p className="font-medium">{violation.distance}</p>
                          </div>
                          <div>
                            <span className="text-ike-neutral">Status:</span>
                            <Badge variant="outline">{violation.status}</Badge>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-ike-neutral text-sm">Violation: </span>
                          <span className="text-sm">{violation.violation}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationControl;
