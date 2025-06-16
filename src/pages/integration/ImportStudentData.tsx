import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ErrorDetailsModal } from "@/components/ErrorDetailsModal";
import { Database, Upload, FileText, AlertTriangle, CheckCircle, X, Eye, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImportStudentData = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedJobForErrors, setSelectedJobForErrors] = useState<any>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'cancel' | 'retry';
    jobId: number;
    title: string;
    description: string;
  } | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importJobs, setImportJobs] = useState([
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
  ]);

  // Sample error data for demonstration
  const getErrorsForJob = (jobId: number) => {
    const errorSamples = [
      {
        id: 1,
        municipality: "Stockholm Municipality",
        error: "Invalid date format in enrollment field. Expected YYYY-MM-DD but received DD/MM/YYYY",
        timestamp: "2024-01-15 13:17:23",
        severity: "high" as const
      },
      {
        id: 2,
        municipality: "Göteborg Municipality", 
        error: "Student ID conflict: ID 12345 already exists in system with different personal information",
        timestamp: "2024-01-15 13:18:45",
        severity: "high" as const
      },
      {
        id: 3,
        municipality: "Malmö Municipality",
        error: "Missing required field: guardian contact information",
        timestamp: "2024-01-15 13:19:12",
        severity: "medium" as const
      },
      {
        id: 4,
        municipality: "Uppsala Municipality",
        error: "School code not found in registry: SCH-9876",
        timestamp: "2024-01-15 13:19:34",
        severity: "medium" as const
      },
      {
        id: 5,
        municipality: "Västerås Municipality",
        error: "Grade level validation warning: Grade 13 is unusual for this age group",
        timestamp: "2024-01-15 13:19:56",
        severity: "low" as const
      }
    ];
    
    if (jobId === 2) {
      return errorSamples.slice(0, 2);
    } else if (jobId === 3) {
      return errorSamples;
    }
    
    return [];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-ike-success text-white">Completed</Badge>;
      case 'running':
        return <Badge className="bg-ike-primary text-white">Running</Badge>;
      case 'failed':
        return <Badge className="bg-ike-error text-white">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-ike-success" />;
      case 'running':
        return <Database className="w-5 h-5 text-ike-primary" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-ike-error" />;
      default:
        return <Database className="w-5 h-5 text-ike-neutral" />;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file.name, file.size, file.type);
    }
  };

  const handleStartImport = (system: string) => {
    console.log(`Starting ${system} import...`);
    setShowImportDialog(true);
  };

  const handleConfirmImport = async () => {
    setIsImporting(true);
    setImportProgress(0);
    setShowImportDialog(false);
    
    try {
      // Create new import job
      const newJob = {
        id: Date.now(),
        name: `${selectedFile?.name || 'System'} Import`,
        system: "Manual Upload",
        status: "running",
        progress: 0,
        recordsProcessed: 0,
        recordsTotal: 500,
        startTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        endTime: null,
        errors: 0
      };

      setImportJobs(prev => [newJob, ...prev]);

      // Simulate import progress
      const interval = setInterval(() => {
        setImportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsImporting(false);
            
            // Update job status
            setImportJobs(prevJobs => 
              prevJobs.map(job => 
                job.id === newJob.id 
                  ? { 
                      ...job, 
                      status: "completed", 
                      progress: 100, 
                      recordsProcessed: 500,
                      endTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
                    }
                  : job
              )
            );

            toast({
              title: "Import Completed",
              description: `Successfully imported ${selectedFile?.name || 'student data'}.`,
            });
            
            setSelectedFile(null);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      toast({
        title: "Import Started",
        description: "Student data import has been initiated.",
      });

    } catch (error) {
      setIsImporting(false);
      toast({
        title: "Import Failed",
        description: "Failed to start the import process. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setShowJobDetails(true);
    console.log("Viewing job details:", job);
  };

  const handleViewErrors = (job: any) => {
    setSelectedJobForErrors(job);
    setShowErrorModal(true);
    console.log("Viewing errors for job:", job);
  };

  const handleCancelJob = (job: any) => {
    setConfirmAction({
      type: 'cancel',
      jobId: job.id,
      title: 'Cancel Import Job',
      description: `Are you sure you want to cancel "${job.name}"? This action cannot be undone.`
    });
    setShowConfirmDialog(true);
  };

  const handleRetryJob = (job: any) => {
    setConfirmAction({
      type: 'retry',
      jobId: job.id,
      title: 'Retry Import Job',
      description: `Are you sure you want to retry "${job.name}"? This will restart the import process.`
    });
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;

    const { type, jobId } = confirmAction;

    if (type === 'cancel') {
      setImportJobs(prev => 
        prev.map(job => 
          job.id === jobId 
            ? { ...job, status: "cancelled", endTime: new Date().toISOString().replace('T', ' ').substring(0, 19) }
            : job
        )
      );
      toast({
        title: "Job Cancelled",
        description: "Import job has been cancelled successfully.",
        variant: "destructive",
      });
    } else if (type === 'retry') {
      setImportJobs(prev => 
        prev.map(job => 
          job.id === jobId 
            ? { 
                ...job, 
                status: "running", 
                progress: 0, 
                recordsProcessed: 0, 
                errors: 0,
                startTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
                endTime: null
              }
            : job
        )
      );
      toast({
        title: "Job Restarted",
        description: "Import job has been restarted successfully.",
      });
    }

    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary mb-2">Import Student Data</h1>
        <p className="text-ike-neutral">
          Import and sync student data from municipal SIS (Procapita, Extens, etc.)
        </p>
      </div>

      {/* Active Import Progress */}
      {isImporting && (
        <Card className="border-ike-primary">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-primary">
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Import in Progress
            </CardTitle>
            <CardDescription>
              Processing {selectedFile?.name || 'student data'}...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-ike-neutral">Progress</span>
                <span className="text-ike-neutral">{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="h-3" />
              <div className="text-sm text-ike-neutral">
                Importing student records and validating data...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-ike-neutral-light hover:shadow-md transition-shadow">
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
            <Button 
              className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white"
              onClick={() => handleStartImport('Procapita')}
              disabled={isImporting}
            >
              <Upload className="w-4 h-4 mr-2" />
              Start Import
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-ike-neutral-light hover:shadow-md transition-shadow">
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
            <Button 
              className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white"
              onClick={() => handleStartImport('Extens')}
              disabled={isImporting}
            >
              <Upload className="w-4 h-4 mr-2" />
              Start Import
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-ike-neutral-light hover:shadow-md transition-shadow">
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
            <div className="space-y-3">
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              {selectedFile && (
                <div className="text-sm text-ike-neutral">
                  Selected: {selectedFile.name}
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowImportDialog(true)}
                disabled={!selectedFile || isImporting}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>
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
            <div key={job.id} className="border border-ike-neutral-light rounded-lg p-4 hover:shadow-sm transition-shadow">
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

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
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
                  <p className={`${job.errors > 0 ? 'text-ike-error' : 'text-ike-neutral'}`}>
                    {job.errors}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {job.errors > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-ike-error text-ike-error hover:bg-ike-error/10"
                      onClick={() => handleViewErrors(job)}
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      View Errors
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDetails(job)}
                    className="text-ike-neutral hover:text-ike-primary"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  {job.status === 'running' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancelJob(job)}
                      className="border-ike-error text-ike-error hover:bg-ike-error/10"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                  {job.status === 'failed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRetryJob(job)}
                      className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Import Confirmation Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
              <Upload className="w-5 h-5 mr-2 text-ike-primary" />
              Confirm Data Import
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedFile 
                ? `Are you sure you want to import "${selectedFile.name}"? This will process the student data and update the system.`
                : "Are you sure you want to start the system import? This will sync student data from the selected system."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-ike-neutral-light p-4 rounded-lg">
            <h4 className="font-medium text-ike-neutral-dark mb-2">Import Details</h4>
            <div className="space-y-2 text-sm text-ike-neutral">
              <div className="flex justify-between">
                <span>Source:</span>
                <span className="font-medium">{selectedFile?.name || 'System Integration'}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium">Student Records</span>
              </div>
              <div className="flex justify-between">
                <span>Action:</span>
                <span className="font-medium">Import & Validate</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmImport}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Start Import
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Job Details Modal */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Database className="w-5 h-5 mr-2 text-ike-primary" />
              Import Job Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the import job
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-ike-neutral">Job Name</Label>
                    <p className="text-ike-neutral-dark font-medium">{selectedJob.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-ike-neutral">System</Label>
                    <p className="text-ike-neutral-dark">{selectedJob.system}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-ike-neutral">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedJob.status)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-ike-neutral">Start Time</Label>
                    <p className="text-ike-neutral-dark">{selectedJob.startTime}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-ike-neutral">End Time</Label>
                    <p className="text-ike-neutral-dark">{selectedJob.endTime || 'Still running...'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-ike-neutral">Progress</Label>
                    <p className="text-ike-neutral-dark">{selectedJob.progress}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-3">Processing Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-ike-neutral-dark">{selectedJob.recordsTotal}</p>
                    <p className="text-ike-neutral">Total Records</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-ike-success">{selectedJob.recordsProcessed}</p>
                    <p className="text-ike-neutral">Processed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-ike-error">{selectedJob.errors}</p>
                    <p className="text-ike-neutral">Errors</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Details Modal */}
      {selectedJobForErrors && (
        <ErrorDetailsModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          jobName={selectedJobForErrors.name}
          errors={getErrorsForJob(selectedJobForErrors.id)}
        />
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmAction}
              className={confirmAction?.type === 'cancel' 
                ? "bg-ike-error hover:bg-ike-error/80 text-white" 
                : "bg-ike-primary hover:bg-ike-primary-dark text-white"
              }
            >
              {confirmAction?.type === 'cancel' ? 'Cancel Job' : 'Retry Job'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImportStudentData;
