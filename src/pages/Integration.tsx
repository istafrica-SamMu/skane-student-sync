import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  TrendingUp,
  Euro,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  AlertTriangle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ErrorDetailsModal } from "@/components/ErrorDetailsModal";
import { ReportViewModal } from "@/components/ReportViewModal";
import { ConfirmationModal } from "@/components/ConfirmationModal";

const Integration = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);
  
  // Add missing state for calculation jobs
  const [calculationJobs, setCalculationJobs] = useState([
    {
      id: 1,
      name: "November 2024 Payment Calculations",
      type: "monthly",
      status: "completed",
      lastRun: "2024-11-15 14:30",
      processed: 15420,
      errors: 0,
      totalAmount: 2847500,
      municipalities: 15
    },
    {
      id: 2,
      name: "October 2024 Correction Run",
      type: "correction",
      status: "error",
      lastRun: "2024-11-10 09:15",
      processed: 8934,
      errors: 3,
      totalAmount: 0,
      municipalities: 8
    },
    {
      id: 3,
      name: "Annual Reconciliation 2024",
      type: "annual",
      status: "scheduled",
      lastRun: "2024-12-01 00:00",
      processed: 0,
      errors: 0,
      totalAmount: 0,
      municipalities: 33
    }
  ]);
  
  // Modal states
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [confirmationAction, setConfirmationAction] = useState<{
    type: 'cancel' | 'restart' | 'delete';
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  // Mock data for modals
  const mockErrorData = [
    {
      id: 1,
      municipality: "Municipality A",
      error: "Student enrollment data validation failed: Missing required field 'grade_level' for student ID 12345",
      timestamp: "2024-11-15 14:32:15",
      severity: 'high' as const
    },
    {
      id: 2,
      municipality: "Municipality B",
      error: "Price calculation mismatch: Expected €450 per student, calculated €425",
      timestamp: "2024-11-15 14:35:22",
      severity: 'medium' as const
    },
    {
      id: 3,
      municipality: "Municipality C",
      error: "Network timeout while retrieving additional amounts data",
      timestamp: "2024-11-15 14:38:10",
      severity: 'low' as const
    }
  ];

  const mockReportData = {
    summary: {
      totalAmount: 2847500,
      municipalitiesCount: 12,
      processingDate: "2024-11-15",
      status: "Completed"
    },
    details: [
      {
        municipality: "Municipality A",
        studentCount: 245,
        amountToPay: 125000,
        amountToReceive: 98000,
        netAmount: -27000
      },
      {
        municipality: "Municipality B",
        studentCount: 189,
        amountToPay: 87000,
        amountToReceive: 134000,
        netAmount: 47000
      },
      {
        municipality: "Municipality C",
        studentCount: 312,
        amountToPay: 156000,
        amountToReceive: 89000,
        netAmount: -67000
      }
    ]
  };

  // Enhanced handlers with modal integration
  const handleViewErrors = (job: any) => {
    setSelectedJob(job);
    setErrorModalOpen(true);
  };

  const handleViewReport = (job: any) => {
    setSelectedJob(job);
    setReportModalOpen(true);
  };

  const handleCancelJob = (job: any) => {
    setSelectedJob(job);
    setConfirmationAction({
      type: 'cancel',
      title: 'Cancel Calculation Job',
      description: 'Are you sure you want to cancel this calculation job? This action cannot be undone and any progress will be lost.',
      onConfirm: () => {
        setCalculationJobs(prev => 
          prev.map(j => 
            j.id === job.id 
              ? { ...j, status: "cancelled" }
              : j
          )
        );
        toast({
          title: "Job Cancelled",
          description: `"${job.name}" has been cancelled successfully.`,
          variant: "destructive"
        });
        setConfirmationModalOpen(false);
        setConfirmationAction(null);
      }
    });
    setConfirmationModalOpen(true);
  };

  const handleRestartJob = (job: any) => {
    setSelectedJob(job);
    setConfirmationAction({
      type: 'restart',
      title: 'Restart Calculation Job',
      description: 'Are you sure you want to restart this calculation job? This will reset all progress and start the calculation from the beginning.',
      onConfirm: () => {
        setCalculationJobs(prev => 
          prev.map(j => 
            j.id === job.id 
              ? { ...j, status: "running", processed: 0, errors: 0 }
              : j
          )
        );
        toast({
          title: "Job Restarted",
          description: `"${job.name}" has been restarted successfully.`,
        });
        setConfirmationModalOpen(false);
        setConfirmationAction(null);
      }
    });
    setConfirmationModalOpen(true);
  };

  const handleStartCalculation = () => {
    setIsCalculating(true);
    setCalculationProgress(0);
    
    toast({
      title: "Calculation Started",
      description: "Regional payment calculation has been initiated.",
    });
    
    // Simulate calculation progress
    const interval = setInterval(() => {
      setCalculationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCalculating(false);
          toast({
            title: "Calculation Complete",
            description: "Regional payment calculation has been completed successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleStartMonthlyCalculation = () => {
    const newJob = {
      id: Date.now(),
      name: "November 2024 Payment Calculations",
      type: "monthly",
      status: "running",
      lastRun: new Date().toISOString().replace('T', ' ').substring(0, 16),
      processed: 0,
      errors: 0,
      totalAmount: 0,
      municipalities: 15
    };

    setCalculationJobs(prev => [newJob, ...prev]);
    
    toast({
      title: "Monthly Calculation Started",
      description: "Monthly inter-municipal payment calculation has been initiated.",
    });
  };

  const handleStartAnnualReconciliation = () => {
    const newJob = {
      id: Date.now(),
      name: "Annual Reconciliation 2024",
      type: "annual",
      status: "running",
      lastRun: new Date().toISOString().replace('T', ' ').substring(0, 16),
      processed: 0,
      errors: 0,
      totalAmount: 0,
      municipalities: 33
    };

    setCalculationJobs(prev => [newJob, ...prev]);
    
    toast({
      title: "Annual Reconciliation Started",
      description: "Annual payment reconciliation has been initiated.",
    });
  };

  const handleStartCorrectionRun = () => {
    const newJob = {
      id: Date.now(),
      name: "November 2024 Correction Run",
      type: "correction",
      status: "running",
      lastRun: new Date().toISOString().replace('T', ' ').substring(0, 16),
      processed: 0,
      errors: 0,
      totalAmount: 0,
      municipalities: 8
    };

    setCalculationJobs(prev => [newJob, ...prev]);
    
    toast({
      title: "Correction Run Started",
      description: "Correction calculation has been initiated.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ike-success text-white">Completed</Badge>;
      case "running":
        return <Badge className="bg-ike-primary text-white">Running</Badge>;
      case "scheduled":
        return <Badge className="bg-ike-warning text-white">Scheduled</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">Error</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getJobIcon = (type: string) => {
    switch (type) {
      case "monthly":
        return <Calculator className="w-5 h-5 text-white" />;
      case "annual":
        return <TrendingUp className="w-5 h-5 text-white" />;
      case "correction":
        return <RefreshCcw className="w-5 h-5 text-white" />;
      default:
        return <Calculator className="w-5 h-5 text-white" />;
    }
  };

  const getJobIconBg = (type: string) => {
    switch (type) {
      case "monthly":
        return "bg-blue-500";
      case "annual":
        return "bg-ike-primary";
      case "correction":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Regional Payment Calculations</h1>
          <p className="text-ike-neutral mt-2">
            Trigger and monitor inter-municipal payment calculation jobs
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={handleStartCalculation}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Calculating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start New Calculation
            </>
          )}
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              +1 from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Amount Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">€2.8M</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              This month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Failed Calculations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1</div>
            <div className="flex items-center text-xs text-ike-error mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Requires attention
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Participating Municipalities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">33</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              +2 new this year
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Calculation Progress */}
      {isCalculating && (
        <Card className="border-ike-primary">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <RefreshCcw className="w-5 h-5 mr-2 text-ike-primary animate-spin" />
              Calculation in Progress
            </CardTitle>
            <CardDescription>
              Processing November 2024 payment calculations...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-ike-neutral">Progress</span>
                <span className="text-ike-neutral">{calculationProgress}%</span>
              </div>
              <Progress value={calculationProgress} className="h-3" />
              <div className="text-sm text-ike-neutral">
                Processing municipality data and calculating inter-municipal payments...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculation Jobs Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
            Payment Calculation Jobs
          </CardTitle>
          <CardDescription>
            Monitor and manage regional payment calculation jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {calculationJobs.map((job) => (
              <div 
                key={job.id} 
                className={`border rounded-lg p-4 ${
                  job.status === 'error' ? 'border-ike-error/30 bg-ike-error/5' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getJobIconBg(job.type)}`}>
                      {getJobIcon(job.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{job.name}</h3>
                      <p className="text-sm text-ike-neutral">
                        Last run: {job.lastRun}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(job.status)}
                </div>

                {job.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ike-neutral">Processing...</span>
                      <span className="text-ike-neutral">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">Records Processed</span>
                    <span className="font-medium">{job.processed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">Municipalities</span>
                    <span className="font-medium">{job.municipalities}</span>
                  </div>
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">Total Amount</span>
                    <span className={`font-medium flex items-center ${job.totalAmount > 0 ? 'text-ike-primary' : ''}`}>
                      <Euro className="w-4 h-4 mr-1" />
                      {job.totalAmount > 0 ? (job.totalAmount / 1000000).toFixed(1) + 'M' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-ike-neutral">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.status === 'scheduled' ? 'Next run: December 1, 2024' : 
                     job.status === 'running' ? 'Estimated completion: 30 minutes' :
                     job.status === 'error' ? 'Manual intervention required' :
                     'Completed successfully'}
                  </div>

                  <div className="flex space-x-2">
                    {job.status === "error" && job.errors > 0 && (
                      <Button 
                        size="sm" 
                        className="bg-ike-error hover:bg-ike-error/80 text-white"
                        onClick={() => handleViewErrors(job)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        View Errors ({job.errors})
                      </Button>
                    )}

                    {job.status === "running" && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-ike-error text-ike-error hover:bg-ike-error/10"
                        onClick={() => handleCancelJob(job)}
                      >
                        Cancel Job
                      </Button>
                    )}

                    {(job.status === "completed" || job.status === "error") && (
                      <Button 
                        size="sm" 
                        className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                        onClick={() => handleRestartJob(job)}
                      >
                        <RefreshCcw className="w-4 h-4 mr-1" />
                        Restart
                      </Button>
                    )}

                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-ike-neutral hover:text-ike-primary"
                      onClick={() => handleViewReport(job)}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      View Report
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Calculator className="w-5 h-5 mr-2 text-blue-500" />
              Monthly Calculations
            </CardTitle>
            <CardDescription>
              Trigger monthly inter-municipal payment calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Student enrollment data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Municipal price lists</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Additional amounts</span>
              </div>
              
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2"
                onClick={handleStartMonthlyCalculation}
              >
                Start Monthly Calculation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              Annual Reconciliation
            </CardTitle>
            <CardDescription>
              Run comprehensive annual payment reconciliation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Full year data validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Cross-municipality verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Adjustment calculations</span>
              </div>
              
              <Button 
                className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white mt-2"
                onClick={handleStartAnnualReconciliation}
              >
                Start Annual Reconciliation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <RefreshCcw className="w-5 h-5 mr-2 text-amber-500" />
              Correction Calculations
            </CardTitle>
            <CardDescription>
              Run correction calculations for specific periods or municipalities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Period-specific corrections</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Data error corrections</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Manual adjustments</span>
              </div>
              
              <Button 
                className="w-full border-amber-500 text-amber-500 hover:bg-amber-500/10" 
                variant="outline"
                onClick={handleStartCorrectionRun}
              >
                Start Correction Run
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Components */}
      <ErrorDetailsModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        jobName={selectedJob?.name || ""}
        errors={mockErrorData}
      />

      <ReportViewModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        jobName={selectedJob?.name || ""}
        reportData={mockReportData}
      />

      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => {
          setConfirmationModalOpen(false);
          setConfirmationAction(null);
        }}
        onConfirm={confirmationAction?.onConfirm || (() => {})}
        title={confirmationAction?.title || ""}
        description={confirmationAction?.description || ""}
        actionType={confirmationAction?.type || 'cancel'}
        jobName={selectedJob?.name}
      />
    </div>
  );
};

export default Integration;
