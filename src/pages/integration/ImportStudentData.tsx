
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Upload, FileText, AlertTriangle, CheckCircle } from "lucide-react";

const ImportStudentData = () => {
  const importJobs = [
    {
      id: 1,
      name: "Student Records Import",
      system: "Procapita",
      status: "completed",
      progress: 100,
      recordsProcessed: 1247,
      recordsTotal: 1247,
      startTime: "2024-01-15 14:30:00",
      endTime: "2024-01-15 14:45:00",
      errors: 0
    },
    {
      id: 2,
      name: "Enrollment Data Sync",
      system: "Extens",
      status: "running",
      progress: 65,
      recordsProcessed: 823,
      recordsTotal: 1265,
      startTime: "2024-01-15 15:00:00",
      endTime: null,
      errors: 2
    },
    {
      id: 3,
      name: "Grade Transitions",
      system: "Procapita",
      status: "failed",
      progress: 25,
      recordsProcessed: 156,
      recordsTotal: 624,
      startTime: "2024-01-15 13:15:00",
      endTime: "2024-01-15 13:20:00",
      errors: 15
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'running':
        return <Database className="w-5 h-5 text-blue-600" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Database className="w-5 h-5 text-ike-neutral" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary mb-2">Import Student Data</h1>
        <p className="text-ike-neutral">
          Import and sync student data from municipal SIS (Procapita, Extens, etc.)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-ike-neutral-light">
          <CardHeader className="pb-4">
            <CardTitle className="text-ike-primary flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Procapita Import
            </CardTitle>
            <CardDescription className="text-ike-neutral">
              Import from Procapita SIS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Start Import
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-ike-neutral-light">
          <CardHeader className="pb-4">
            <CardTitle className="text-ike-primary flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Extens Import
            </CardTitle>
            <CardDescription className="text-ike-neutral">
              Import from Extens SIS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Start Import
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-ike-neutral-light">
          <CardHeader className="pb-4">
            <CardTitle className="text-ike-primary flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Manual Upload
            </CardTitle>
            <CardDescription className="text-ike-neutral">
              Upload CSV/Excel files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-ike-neutral-light">
        <CardHeader>
          <CardTitle className="text-ike-primary">Recent Import Jobs</CardTitle>
          <CardDescription className="text-ike-neutral">
            Monitor the status of recent data import operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {importJobs.map((job) => (
            <div key={job.id} className="border border-ike-neutral-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <h4 className="font-medium text-ike-neutral-dark">{job.name}</h4>
                    <p className="text-sm text-ike-neutral">System: {job.system}</p>
                  </div>
                </div>
                {getStatusBadge(job.status)}
              </div>
              
              {job.status === 'running' && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-ike-neutral mb-1">
                    <span>Progress</span>
                    <span>{job.recordsProcessed} / {job.recordsTotal} records</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Start Time</p>
                  <p className="text-ike-neutral">{job.startTime}</p>
                </div>
                <div>
                  <p className="font-medium text-ike-neutral-dark">End Time</p>
                  <p className="text-ike-neutral">{job.endTime || 'Running...'}</p>
                </div>
                <div>
                  <p className="font-medium text-ike-neutral-dark">Records</p>
                  <p className="text-ike-neutral">{job.recordsProcessed} / {job.recordsTotal}</p>
                </div>
                <div>
                  <p className="font-medium text-ike-neutral-dark">Errors</p>
                  <p className={`${job.errors > 0 ? 'text-red-600' : 'text-ike-neutral'}`}>
                    {job.errors}
                  </p>
                </div>
              </div>

              {job.errors > 0 && (
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    View Errors
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportStudentData;
