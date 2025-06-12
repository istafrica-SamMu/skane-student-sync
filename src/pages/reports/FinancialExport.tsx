
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinancialExport = () => {
  const { t } = useLanguage();

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
    },
    {
      id: 3,
      name: "Municipal Statistics",
      system: "Local DB",
      lastRun: "2024-11-12 14:15",
      nextRun: "2024-11-19 14:15",
      status: "Failed",
      records: 0,
      format: "JSON"
    }
  ];

  const availableExports = [
    {
      id: 1,
      name: "IKE Transaction Export",
      description: "Export all IKE transactions for financial reconciliation",
      format: "XML, CSV",
      frequency: "Monthly"
    },
    {
      id: 2,
      name: "Student Cost Breakdown",
      description: "Detailed cost breakdown per student for budget planning",
      format: "Excel, CSV",
      frequency: "Weekly"
    },
    {
      id: 3,
      name: "Municipal Summary",
      description: "High-level summary for municipal reporting",
      format: "PDF, Excel",
      frequency: "Quarterly"
    },
    {
      id: 4,
      name: "Inter-Municipal Reconciliation",
      description: "Data for inter-municipal cost settlements",
      format: "XML, JSON",
      frequency: "Monthly"
    }
  ];

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
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Settings className="w-4 h-4 mr-2" />
            Export Settings
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Play className="w-4 h-4 mr-2" />
            Run Export
          </Button>
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
            <div className="text-2xl font-bold text-ike-error">1</div>
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
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                        <Play className="w-3 h-3 mr-1" />
                        Run Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Available Export Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileSpreadsheet className="w-5 h-5 mr-2 text-ike-primary" />
            Available Export Templates
          </CardTitle>
          <CardDescription>
            Pre-configured export templates for different financial systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableExports.map((export_template) => (
              <div 
                key={export_template.id} 
                className="p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center mr-3">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ike-neutral-dark">{export_template.name}</h3>
                      <div className="text-sm text-ike-neutral mt-1">
                        <span>{export_template.format}</span>
                        <span className="mx-2">•</span>
                        <span>{export_template.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ike-neutral mt-3">
                  {export_template.description}
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    <Download className="w-4 h-4 mr-1" />
                    Export Now
                  </Button>
                  <Button size="sm" variant="outline" className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialExport;
