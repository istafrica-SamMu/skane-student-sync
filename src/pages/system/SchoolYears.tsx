
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Check, Clock } from "lucide-react";

const SchoolYears = () => {
  const schoolYears = [
    {
      id: 1,
      year: "2024/2025",
      startDate: "2024-08-19",
      endDate: "2025-06-13",
      status: "Active",
      studentsEnrolled: 45680,
      schoolsParticipating: 156
    },
    {
      id: 2,
      year: "2023/2024",
      startDate: "2023-08-21",
      endDate: "2024-06-14",
      status: "Completed",
      studentsEnrolled: 44320,
      schoolsParticipating: 152
    },
    {
      id: 3,
      year: "2025/2026",
      startDate: "2025-08-18",
      endDate: "2026-06-12",
      status: "Planning",
      studentsEnrolled: 0,
      schoolsParticipating: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Check className="w-4 h-4" />;
      case 'Planning':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">School Years</h1>
          <p className="text-ike-neutral">Manage academic years across the regional system</p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New School Year
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schoolYears.map((year) => (
          <Card key={year.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-ike-primary" />
                  {year.year}
                </CardTitle>
                <Badge className={`${getStatusColor(year.status)} flex items-center gap-1`}>
                  {getStatusIcon(year.status)}
                  {year.status}
                </Badge>
              </div>
              <CardDescription>
                {new Date(year.startDate).toLocaleDateString('sv-SE')} - {new Date(year.endDate).toLocaleDateString('sv-SE')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-ike-neutral-light rounded-lg">
                    <div className="text-2xl font-bold text-ike-primary">
                      {year.studentsEnrolled.toLocaleString()}
                    </div>
                    <div className="text-sm text-ike-neutral">Students</div>
                  </div>
                  <div className="text-center p-3 bg-ike-neutral-light rounded-lg">
                    <div className="text-2xl font-bold text-ike-primary">
                      {year.schoolsParticipating}
                    </div>
                    <div className="text-sm text-ike-neutral">Schools</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={year.status === 'Completed'}
                  >
                    Manage Year Settings
                  </Button>
                  {year.status === 'Active' && (
                    <Button 
                      variant="outline" 
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      Promote All Students
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Year Operations</CardTitle>
          <CardDescription>
            Annual operations and transitions between school years
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col gap-2">
              <Calendar className="w-8 h-8 text-ike-primary" />
              <span className="font-medium">Annual Grade Promotion</span>
              <span className="text-sm text-ike-neutral text-center">
                Promote all students to next grade level
              </span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col gap-2">
              <Check className="w-8 h-8 text-ike-primary" />
              <span className="font-medium">Complete School Year</span>
              <span className="text-sm text-ike-neutral text-center">
                Finalize current academic year
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolYears;
