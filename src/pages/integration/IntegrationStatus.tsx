
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertCircle, CheckCircle, Clock, Download, RefreshCw } from "lucide-react";

const IntegrationStatus = () => {
  const systemStatus = [
    {
      system: "Procapita",
      status: "connected",
      lastSync: "2024-01-15 14:45:00",
      nextSync: "2024-01-16 02:00:00",
      recordsToday: 1247,
      uptime: "99.8%"
    },
    {
      system: "Extens",
      status: "warning",
      lastSync: "2024-01-15 12:30:00",
      nextSync: "2024-01-15 18:00:00",
      recordsToday: 823,
      uptime: "97.2%"
    },
    {
      system: "Manual Uploads",
      status: "idle",
      lastSync: "2024-01-14 16:20:00",
      nextSync: "On demand",
      recordsToday: 0,
      uptime: "100%"
    }
  ];

  const recentLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:45:23",
      system: "Procapita",
      level: "info",
      message: "Student import completed successfully. 1247 records processed.",
      details: "Import job #1524 finished"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:30:15",
      system: "Procapita",
      level: "info",
      message: "Starting scheduled student import from Procapita",
      details: "Import job #1524 started"
    },
    {
      id: 3,
      timestamp: "2024-01-15 12:35:42",
      system: "Extens",
      level: "warning",
      message: "API rate limit reached. Retrying in 5 minutes.",
      details: "HTTP 429 response from Extens API"
    },
    {
      id: 4,
      timestamp: "2024-01-15 12:30:18",
      system: "Extens",
      level: "info",
      message: "Enrollment sync started",
      details: "Processing 1265 enrollment records"
    },
    {
      id: 5,
      timestamp: "2024-01-15 10:15:33",
      system: "System",
      level: "error",
      message: "Database connection timeout during student validation",
      details: "Query timeout after 30 seconds"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case 'idle':
        return <Badge variant="secondary">Idle</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'idle':
        return <Clock className="w-5 h-5 text-ike-neutral" />;
      default:
        return <Activity className="w-5 h-5 text-ike-neutral" />;
    }
  };

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary mb-2">Integration Status & Logs</h1>
          <p className="text-ike-neutral">
            Monitor integration status and view system logs
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="border border-ike-neutral-light">
          <CardHeader>
            <CardTitle className="text-ike-primary">System Status</CardTitle>
            <CardDescription className="text-ike-neutral">
              Current status of all integrated systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="border border-ike-neutral-light rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(system.status)}
                    <div>
                      <h4 className="font-medium text-ike-neutral-dark">{system.system}</h4>
                    </div>
                  </div>
                  {getStatusBadge(system.status)}
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-ike-neutral-dark">Last Sync</p>
                    <p className="text-ike-neutral">{system.lastSync}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ike-neutral-dark">Next Sync</p>
                    <p className="text-ike-neutral">{system.nextSync}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ike-neutral-dark">Records Today</p>
                    <p className="text-ike-neutral">{system.recordsToday.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ike-neutral-dark">Uptime</p>
                    <p className="text-ike-neutral">{system.uptime}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-ike-neutral-light">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-ike-primary">Recent Logs</CardTitle>
                <CardDescription className="text-ike-neutral">
                  Latest system events and activities
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="border border-ike-neutral-light rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getLogLevelBadge(log.level)}
                    <Badge variant="outline">{log.system}</Badge>
                    <span className="text-sm text-ike-neutral">{log.timestamp}</span>
                  </div>
                </div>
                <p className="text-ike-neutral-dark mb-1">{log.message}</p>
                <p className="text-sm text-ike-neutral">{log.details}</p>
              </div>
            ))}
            
            <div className="pt-4 text-center">
              <Button variant="outline">
                Load More Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntegrationStatus;
