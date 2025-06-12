
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Settings, Play, Pause } from "lucide-react";

const ScheduleIntegration = () => {
  const schedules = [
    {
      id: 1,
      name: "Daily Student Sync",
      description: "Import new and updated student records",
      frequency: "Daily at 2:00 AM",
      lastRun: "2024-01-15 02:00:00",
      nextRun: "2024-01-16 02:00:00",
      status: "active",
      system: "Procapita"
    },
    {
      id: 2,
      name: "Weekly Enrollment Update",
      description: "Sync enrollment changes and transfers",
      frequency: "Weekly (Monday 1:00 AM)",
      lastRun: "2024-01-15 01:00:00",
      nextRun: "2024-01-22 01:00:00",
      status: "active",
      system: "Extens"
    },
    {
      id: 3,
      name: "Monthly Grade Updates",
      description: "Import grade promotions and completions",
      frequency: "Monthly (1st day 3:00 AM)",
      lastRun: "2024-01-01 03:00:00",
      nextRun: "2024-02-01 03:00:00",
      status: "paused",
      system: "Procapita"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary mb-2">Schedule Integration</h1>
        <p className="text-ike-neutral">
          Manage automated integration schedules with municipal student information systems
        </p>
      </div>

      <div className="grid gap-6">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="border border-ike-neutral-light">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-ike-primary" />
                  <div>
                    <CardTitle className="text-ike-primary">{schedule.name}</CardTitle>
                    <CardDescription className="text-ike-neutral">
                      {schedule.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={schedule.status === 'active' ? 'default' : 'secondary'}>
                    {schedule.status}
                  </Badge>
                  <Badge variant="outline">{schedule.system}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-ike-neutral-dark mb-1">Frequency</p>
                  <p className="text-ike-neutral flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {schedule.frequency}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-ike-neutral-dark mb-1">Last Run</p>
                  <p className="text-ike-neutral">{schedule.lastRun}</p>
                </div>
                <div>
                  <p className="font-medium text-ike-neutral-dark mb-1">Next Run</p>
                  <p className="text-ike-neutral">{schedule.nextRun}</p>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                {schedule.status === 'active' ? (
                  <Button variant="outline" size="sm">
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  Run Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-ike-neutral-light">
        <CardHeader>
          <CardTitle className="text-ike-primary">Add New Schedule</CardTitle>
          <CardDescription className="text-ike-neutral">
            Create a new automated integration schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-ike-primary hover:bg-ike-primary/90 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Create Schedule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleIntegration;
