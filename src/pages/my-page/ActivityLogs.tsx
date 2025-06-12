
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Activity, Search, Filter, Download, Clock, User, Settings } from "lucide-react";

const ActivityLogs = () => {
  const logs = [
    {
      id: 1,
      action: "Student Enrollment Created",
      user: "Current User",
      timestamp: "2024-01-15 14:30:25",
      type: "create",
      details: "Created enrollment for student ID: 12345",
      ipAddress: "192.168.1.100"
    },
    {
      id: 2,
      action: "Report Generated",
      user: "Current User",
      timestamp: "2024-01-15 13:15:10",
      type: "report",
      details: "Generated monthly enrollment report",
      ipAddress: "192.168.1.100"
    },
    {
      id: 3,
      action: "Settings Updated",
      user: "Current User",
      timestamp: "2024-01-15 11:45:30",
      type: "update",
      details: "Updated notification preferences",
      ipAddress: "192.168.1.100"
    },
    {
      id: 4,
      action: "Data Export",
      user: "Current User",
      timestamp: "2024-01-14 16:20:15",
      type: "export",
      details: "Exported student data to CSV",
      ipAddress: "192.168.1.100"
    },
    {
      id: 5,
      action: "Login Session",
      user: "Current User",
      timestamp: "2024-01-14 08:30:00",
      type: "auth",
      details: "User logged into the system",
      ipAddress: "192.168.1.100"
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <User className="w-4 h-4 text-green-500" />;
      case 'update':
        return <Settings className="w-4 h-4 text-blue-500" />;
      case 'report':
        return <Activity className="w-4 h-4 text-purple-500" />;
      case 'export':
        return <Download className="w-4 h-4 text-orange-500" />;
      case 'auth':
        return <User className="w-4 h-4 text-gray-500" />;
      default:
        return <Activity className="w-4 h-4 text-ike-primary" />;
    }
  };

  const getActionBadge = (type: string) => {
    const variants = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      report: 'bg-purple-100 text-purple-800',
      export: 'bg-orange-100 text-orange-800',
      auth: 'bg-gray-100 text-gray-800'
    };
    return variants[type as keyof typeof variants] || 'bg-ike-primary/10 text-ike-primary';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary">Activity Logs</h1>
        <p className="text-ike-neutral-dark mt-2">
          Track and monitor your system activities and changes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-ike-primary" />
            <span>Filter Logs</span>
          </CardTitle>
          <CardDescription>
            Filter and search through your activity history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-medium">
                Search Activities
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ike-neutral" />
                <Input 
                  id="search" 
                  placeholder="Search activities..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-from" className="text-sm font-medium">
                From Date
              </Label>
              <Input 
                id="date-from" 
                type="date" 
                defaultValue="2024-01-01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to" className="text-sm font-medium">
                To Date
              </Label>
              <Input 
                id="date-to" 
                type="date" 
                defaultValue="2024-01-15"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" size="sm">
              Clear Filters
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary/90" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-ike-primary" />
              <span>Recent Activities</span>
            </div>
            <Badge variant="secondary" className="bg-ike-primary/10 text-ike-primary">
              {logs.length} entries
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={log.id}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(log.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-ike-neutral-dark">{log.action}</h4>
                      <Badge className={getActionBadge(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-ike-neutral">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-ike-neutral">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{log.user}</span>
                      </div>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
                {index < logs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
