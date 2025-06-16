
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const FinancialExport = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isRunExportModalOpen, setIsRunExportModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const exportJobs = [
    {
      id: 1,
      name: "Monthly IKE Export",
      system: "Agresso",
      lastRun: "2024-11-15 06:00",
      nextRun: "2024-12-01 06:00",
      status: "Success",
      records: 1247,
      format: "XML"
    },
    {
      id: 2,
      name: "Student Cost Export",
      system: "Visma",
      lastRun: "2024-11-10 08:30",
      nextRun: "2024-11-17 08:30",
      status: "Running",
      records: 892,
      format: "CSV"
    }
  ];

  const handleRunNow = (job) => {
    setSelectedJob(job);
    setIsRunExportModalOpen(true);
  };

  const handleConfirmRunExport = () => {
    const jobName = selectedJob ? selectedJob.name : "Export";
    toast({
      title: "Export Started",
      description: `${jobName} has been started successfully`,
    });
    setIsRunExportModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Financial System Export</h1>
          <p className="text-ike-neutral mt-2">
            Export data to municipal financial systems and external platforms
          </p>
        </div>
      </div>

      {/* Export Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{exportJobs.length}</div>
            <p className="text-xs text-ike-neutral">Configured exports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Last 24h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">2</div>
            <p className="text-xs text-ike-neutral">Successful exports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">1</div>
            <p className="text-xs text-ike-neutral">Currently processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">0</div>
            <p className="text-xs text-ike-neutral">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Exports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Clock className="w-5 h-5 mr-2 text-ike-primary" />
            Scheduled Export Jobs
          </CardTitle>
          <CardDescription>
            Monitor and manage automated export jobs to financial systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Export Name</TableHead>
                <TableHead>Target System</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium text-ike-neutral-dark">{job.name}</TableCell>
                  <TableCell>{job.system}</TableCell>
                  <TableCell className="text-ike-neutral">{job.lastRun}</TableCell>
                  <TableCell className="text-ike-neutral">{job.nextRun}</TableCell>
                  <TableCell>{job.records.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.format}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={job.status === "Success" ? "default" : job.status === "Running" ? "secondary" : "destructive"}
                      className={
                        job.status === "Success" ? "bg-ike-success text-white" :
                        job.status === "Running" ? "bg-ike-warning text-white" :
                        "bg-ike-error text-white"
                      }
                    >
                      {job.status === "Success" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {job.status === "Running" && <Clock className="w-3 h-3 mr-1" />}
                      {job.status === "Failed" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                      onClick={() => handleRunNow(job)}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Run Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Run Export Confirmation Modal */}
      <Dialog open={isRunExportModalOpen} onOpenChange={setIsRunExportModalOpen}>
        <DialogContent className="bg-white max-w-md border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Play className="w-5 h-5 mr-2 text-ike-primary" />
              Run Export Job
            </DialogTitle>
            <DialogDescription>
              {selectedJob 
                ? `Are you sure you want to run "${selectedJob.name}" now?`
                : "Are you sure you want to run the export job?"
              }
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-3 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-ike-neutral">Target System:</span>
                  <p className="text-ike-neutral-dark">{selectedJob.system}</p>
                </div>
                <div>
                  <span className="font-medium text-ike-neutral">Format:</span>
                  <p className="text-ike-neutral-dark">{selectedJob.format}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRunExportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmRunExport}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialExport;
