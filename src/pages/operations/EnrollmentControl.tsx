
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Clock, Search, Filter, CheckCircle, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnrollmentControl = () => {
  const enrollmentPeriods = [
    {
      id: 1,
      name: "Fall 2024 Enrollment",
      startDate: "2024-08-01",
      endDate: "2024-08-31",
      status: "Active",
      applications: 1250,
      processed: 1100
    },
    {
      id: 2,
      name: "Spring 2025 Enrollment",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      status: "Upcoming",
      applications: 0,
      processed: 0
    }
  ];

  const scheduleConflicts = [
    {
      id: 1,
      student: "Emma Andersson",
      conflict: "Double booking in Math and Science",
      school: "Malmö Central Elementary",
      severity: "High",
      timeSlot: "09:00-10:00"
    },
    {
      id: 2,
      student: "Viktor Nilsson",
      conflict: "Room capacity exceeded",
      school: "Malmö North High School",
      severity: "Medium",
      timeSlot: "13:00-14:00"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Enrollment Control & Scheduling</h1>
          <p className="text-ike-neutral">Manage municipal enrollment and resolve scheduling conflicts</p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <Calendar className="w-4 h-4 mr-2" />
          New Enrollment Period
        </Button>
      </div>

      <Tabs defaultValue="enrollment" className="space-y-6">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment Control</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling Management</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Enrollment Periods
              </CardTitle>
              <CardDescription>
                Manage enrollment periods and application processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrollmentPeriods.map((period) => (
                  <div key={period.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{period.name}</h3>
                      <Badge className={period.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {period.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-ike-neutral">Start Date:</span>
                        <p className="font-medium">{period.startDate}</p>
                      </div>
                      <div>
                        <span className="text-ike-neutral">End Date:</span>
                        <p className="font-medium">{period.endDate}</p>
                      </div>
                      <div>
                        <span className="text-ike-neutral">Applications:</span>
                        <p className="font-medium">{period.applications}</p>
                      </div>
                      <div>
                        <span className="text-ike-neutral">Processed:</span>
                        <p className="font-medium">{period.processed}/{period.applications}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage Applications
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Scheduling Conflicts
              </CardTitle>
              <CardDescription>
                Identify and resolve scheduling conflicts across municipal schools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                  <Input
                    placeholder="Search conflicts..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {scheduleConflicts.map((conflict) => (
                  <div key={conflict.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{conflict.student}</h3>
                          <Badge variant={conflict.severity === 'High' ? 'destructive' : 'default'}>
                            {conflict.severity}
                          </Badge>
                        </div>
                        <p className="text-ike-neutral mb-2">{conflict.conflict}</p>
                        <div className="text-sm text-ike-neutral">
                          <span>School: {conflict.school} • Time: {conflict.timeSlot}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                        <Button variant="outline" size="sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Details
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

export default EnrollmentControl;
