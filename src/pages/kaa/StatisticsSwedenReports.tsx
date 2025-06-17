import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { 
  FileText,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Plus,
  Calendar,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileDown,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface SCBReport {
  id: number;
  reportType: string;
  period: string;
  year: number;
  quarter?: number;
  submissionDate: string;
  dueDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  youngPersonsIncluded: number;
  createdBy: string;
  submittedBy?: string;
  notes?: string;
  fileName?: string;
}

interface ExportConfig {
  fileFormat: 'csv' | 'xlsx' | 'xml';
  includeHeaders: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  reportTypes: string[];
  encoding: 'UTF-8' | 'ISO-8859-1';
}

const reportTypes = [
  "KAA Quarterly Report",
  "Annual Youth Statistics",
  "Intervention Outcomes",
  "Demographics Report",
  "Employment Statistics",
  "Education Progress"
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return <Badge className="bg-gray-500 text-white">Draft</Badge>;
    case "submitted":
      return <Badge className="bg-ike-primary text-white">Submitted</Badge>;
    case "approved":
      return <Badge className="bg-ike-success text-white">Approved</Badge>;
    case "rejected":
      return <Badge className="bg-red-500 text-white">Rejected</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const StatisticsSwedenReports = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<SCBReport[]>([
    {
      id: 1,
      reportType: "KAA Quarterly Report",
      period: "Q4",
      year: 2024,
      quarter: 4,
      submissionDate: "2024-01-15",
      dueDate: "2024-01-31",
      status: "submitted",
      youngPersonsIncluded: 156,
      createdBy: "Maria Lindberg",
      submittedBy: "Erik Johansson",
      notes: "All data validated and complete",
      fileName: "kaa_q4_2024.xlsx"
    },
    {
      id: 2,
      reportType: "Annual Youth Statistics",
      period: "2023",
      year: 2023,
      submissionDate: "2024-02-01",
      dueDate: "2024-02-28",
      status: "approved",
      youngPersonsIncluded: 423,
      createdBy: "Anna Svensson",
      submittedBy: "Maria Lindberg",
      notes: "Comprehensive annual overview",
      fileName: "annual_youth_stats_2023.xlsx"
    },
    {
      id: 3,
      reportType: "Intervention Outcomes",
      period: "Q1",
      year: 2024,
      quarter: 1,
      submissionDate: "",
      dueDate: "2024-04-30",
      status: "draft",
      youngPersonsIncluded: 78,
      createdBy: "Erik Johansson",
      notes: "Data collection in progress"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<SCBReport | null>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [editingReport, setEditingReport] = useState<SCBReport | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [reportToSubmit, setReportToSubmit] = useState<number | null>(null);
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    fileFormat: 'xlsx',
    includeHeaders: true,
    dateRange: {
      start: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    reportTypes: [],
    encoding: 'UTF-8'
  });
  const [formData, setFormData] = useState<Omit<SCBReport, 'id'>>({
    reportType: "",
    period: "",
    year: new Date().getFullYear(),
    submissionDate: "",
    dueDate: "",
    status: "draft",
    youngPersonsIncluded: 0,
    createdBy: "",
    notes: ""
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesYear = yearFilter === "all" || report.year.toString() === yearFilter;
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  const handleViewDetails = (report: SCBReport) => {
    setSelectedReport(report);
    setShowReportDetails(true);
  };

  const handleEdit = (report: SCBReport) => {
    setFormData(report);
    setEditingReport(report);
    setShowReportForm(true);
  };

  const handleSubmit = (id: number) => {
    setReportToSubmit(id);
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    if (reportToSubmit !== null) {
      setReports(reports.map(r => 
        r.id === reportToSubmit 
          ? { ...r, status: 'submitted' as const, submissionDate: new Date().toISOString().split('T')[0] }
          : r
      ));
      toast({
        title: "Report Submitted",
        description: "The report has been submitted to Statistics Sweden successfully.",
      });
      setShowSubmitDialog(false);
      setReportToSubmit(null);
    }
  };

  const handleExportSCB = () => {
    // Filter reports based on export configuration
    const exportableReports = reports.filter(report => {
      const reportDate = new Date(report.submissionDate || report.dueDate);
      const startDate = new Date(exportConfig.dateRange.start);
      const endDate = new Date(exportConfig.dateRange.end);
      
      const withinDateRange = reportDate >= startDate && reportDate <= endDate;
      const matchesType = exportConfig.reportTypes.length === 0 || exportConfig.reportTypes.includes(report.reportType);
      const isSubmittedOrApproved = report.status === 'submitted' || report.status === 'approved';
      
      return withinDateRange && matchesType && isSubmittedOrApproved;
    });

    if (exportableReports.length === 0) {
      toast({
        title: "No Data to Export",
        description: "No reports match the selected criteria for export.",
        variant: "destructive"
      });
      return;
    }

    // Generate filename based on configuration
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fileName = `scb_export_${dateStr}.${exportConfig.fileFormat}`;

    // Simulate file generation and download
    const exportData = exportableReports.map(report => ({
      'Report Type': report.reportType,
      'Period': report.period,
      'Year': report.year,
      'Young Persons': report.youngPersonsIncluded,
      'Submission Date': report.submissionDate,
      'Status': report.status,
      'Created By': report.createdBy
    }));

    // Create downloadable content
    let content = '';
    if (exportConfig.fileFormat === 'csv') {
      const headers = Object.keys(exportData[0] || {});
      if (exportConfig.includeHeaders) {
        content = headers.join(',') + '\n';
      }
      content += exportData.map(row => 
        headers.map(header => `"${row[header as keyof typeof row] || ''}"`).join(',')
      ).join('\n');
    } else if (exportConfig.fileFormat === 'xml') {
      content = '<?xml version="1.0" encoding="' + exportConfig.encoding + '"?>\n<scb_reports>\n';
      content += exportData.map(report => 
        '  <report>\n' +
        Object.entries(report).map(([key, value]) => 
          `    <${key.toLowerCase().replace(/ /g, '_')}>${value}</${key.toLowerCase().replace(/ /g, '_')}>`
        ).join('\n') +
        '\n  </report>'
      ).join('\n');
      content += '\n</scb_reports>';
    } else {
      // For XLSX, we'll simulate with CSV-like content
      content = 'Excel format export (simulated)\n' + JSON.stringify(exportData, null, 2);
    }

    // Create and trigger download
    const blob = new Blob([content], { type: 'text/plain;charset=' + exportConfig.encoding });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: `Successfully exported ${exportableReports.length} reports to ${fileName}`,
    });

    setShowExportDialog(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportData: SCBReport = {
      ...formData,
      id: editingReport ? editingReport.id : Date.now(),
    };

    if (editingReport) {
      setReports(reports.map(r => r.id === editingReport.id ? reportData : r));
      toast({
        title: "Report Updated",
        description: `${reportData.reportType} has been updated successfully.`,
      });
    } else {
      setReports([...reports, reportData]);
      toast({
        title: "Report Created",
        description: `${reportData.reportType} has been created successfully.`,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      reportType: "",
      period: "",
      year: new Date().getFullYear(),
      submissionDate: "",
      dueDate: "",
      status: "draft",
      youngPersonsIncluded: 0,
      createdBy: "",
      notes: ""
    });
    setEditingReport(null);
    setShowReportForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Statistics Sweden Reports</h1>
          <p className="text-ike-neutral mt-2">
            Manage and submit reports to Statistics Sweden (SCB) for KAA activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="border-ike-primary text-ike-primary hover:bg-ike-primary hover:text-white"
            onClick={() => setShowExportDialog(true)}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export to SCB
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setShowReportForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{reports.length}</div>
            <div className="text-xs text-ike-neutral">All time reports</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {reports.filter(r => r.status === "submitted" || r.status === "approved").length}
            </div>
            <div className="text-xs text-ike-neutral">To Statistics Sweden</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {reports.filter(r => r.status === "draft").length}
            </div>
            <div className="text-xs text-ike-neutral">Draft reports</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Young Persons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {reports.reduce((sum, r) => sum + r.youngPersonsIncluded, 0)}
            </div>
            <div className="text-xs text-ike-neutral">Total reported</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by report type, period, creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Statistics Sweden Reports ({filteredReports.length})
          </CardTitle>
          <CardDescription>
            Manage reports submitted to Statistics Sweden for KAA activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Report Type</TableHead>
                <TableHead className="font-medium">Period</TableHead>
                <TableHead className="font-medium">Due Date</TableHead>
                <TableHead className="font-medium">Young Persons</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Created By</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {report.reportType}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{report.period} {report.year}</div>
                      {report.quarter && (
                        <div className="text-xs text-ike-neutral">Quarter {report.quarter}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.dueDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {report.youngPersonsIncluded}
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-sm">
                    {report.createdBy}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                        <DropdownMenuItem onClick={() => handleViewDetails(report)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {report.status === 'draft' && (
                          <DropdownMenuItem onClick={() => handleEdit(report)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Edit Report
                          </DropdownMenuItem>
                        )}
                        {report.status === 'draft' && (
                          <DropdownMenuItem onClick={() => handleSubmit(report.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Submit to SCB
                          </DropdownMenuItem>
                        )}
                        {report.fileName && (
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download File
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <FileDown className="w-5 h-5 mr-2 text-ike-primary" />
              Export to Statistics Sweden
            </DialogTitle>
            <DialogDescription>
              Configure and generate files for Statistics Sweden reporting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fileFormat" className="text-ike-neutral">File Format</Label>
                <Select value={exportConfig.fileFormat} onValueChange={(value: 'csv' | 'xlsx' | 'xml') => 
                  setExportConfig({...exportConfig, fileFormat: value})}>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="xml">XML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="encoding" className="text-ike-neutral">Character Encoding</Label>
                <Select value={exportConfig.encoding} onValueChange={(value: 'UTF-8' | 'ISO-8859-1') => 
                  setExportConfig({...exportConfig, encoding: value})}>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTF-8">UTF-8</SelectItem>
                    <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate" className="text-ike-neutral">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={exportConfig.dateRange.start}
                  onChange={(e) => setExportConfig({
                    ...exportConfig,
                    dateRange: {...exportConfig.dateRange, start: e.target.value}
                  })}
                  className="border-ike-primary/20 focus:border-ike-primary"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-ike-neutral">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={exportConfig.dateRange.end}
                  onChange={(e) => setExportConfig({
                    ...exportConfig,
                    dateRange: {...exportConfig.dateRange, end: e.target.value}
                  })}
                  className="border-ike-primary/20 focus:border-ike-primary"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-ike-neutral">Report Types to Include</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {reportTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exportConfig.reportTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setExportConfig({
                            ...exportConfig,
                            reportTypes: [...exportConfig.reportTypes, type]
                          });
                        } else {
                          setExportConfig({
                            ...exportConfig,
                            reportTypes: exportConfig.reportTypes.filter(t => t !== type)
                          });
                        }
                      }}
                      className="rounded border-ike-primary/20"
                    />
                    <span className="text-sm text-ike-neutral-dark">{type}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-ike-neutral mt-2">
                Leave empty to include all report types
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeHeaders"
                checked={exportConfig.includeHeaders}
                onChange={(e) => setExportConfig({...exportConfig, includeHeaders: e.target.checked})}
                className="rounded border-ike-primary/20"
              />
              <Label htmlFor="includeHeaders" className="text-ike-neutral">
                Include column headers in export
              </Label>
            </div>

            <div className="bg-ike-neutral-light/30 p-4 rounded-lg">
              <h4 className="font-medium text-ike-neutral-dark mb-2">Export Summary</h4>
              <p className="text-sm text-ike-neutral">
                {reports.filter(r => r.status === 'submitted' || r.status === 'approved').length} reports 
                are available for export based on current filters.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleExportSCB}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Generate Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Form Modal */}
      <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              {editingReport ? "Edit SCB Report" : "New SCB Report"}
            </DialogTitle>
            <DialogDescription>
              {editingReport ? "Update report information" : "Create a new report for Statistics Sweden"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportType" className="text-ike-neutral">Report Type *</Label>
                <Select value={formData.reportType} onValueChange={(value) => setFormData({...formData, reportType: value})} required>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="period" className="text-ike-neutral">Period *</Label>
                <Input
                  id="period"
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Q1, Q2, Annual, etc."
                  required
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-ike-neutral">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || new Date().getFullYear()})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  min="2020"
                  max="2030"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-ike-neutral">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="youngPersonsIncluded" className="text-ike-neutral">Young Persons Included</Label>
                <Input
                  id="youngPersonsIncluded"
                  type="number"
                  value={formData.youngPersonsIncluded}
                  onChange={(e) => setFormData({...formData, youngPersonsIncluded: parseInt(e.target.value) || 0})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  min="0"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="createdBy" className="text-ike-neutral">Created By *</Label>
                <Input
                  id="createdBy"
                  type="text"
                  value={formData.createdBy}
                  onChange={(e) => setFormData({...formData, createdBy: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Staff member name"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes" className="text-ike-neutral">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full min-h-[80px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Additional notes about the report..."
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                {editingReport ? "Update Report" : "Create Report"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Report Details Modal */}
      <Dialog open={showReportDetails} onOpenChange={setShowReportDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Report Details
            </DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Report Type</label>
                  <p className="text-ike-neutral-dark font-medium">{selectedReport.reportType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Period</label>
                  <p className="text-ike-neutral-dark">{selectedReport.period} {selectedReport.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Due Date</label>
                  <p className="text-ike-neutral-dark">{selectedReport.dueDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Young Persons</label>
                  <p className="text-ike-neutral-dark">{selectedReport.youngPersonsIncluded}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Created By</label>
                  <p className="text-ike-neutral-dark">{selectedReport.createdBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                </div>
                {selectedReport.submissionDate && (
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Submission Date</label>
                    <p className="text-ike-neutral-dark">{selectedReport.submissionDate}</p>
                  </div>
                )}
                {selectedReport.submittedBy && (
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Submitted By</label>
                    <p className="text-ike-neutral-dark">{selectedReport.submittedBy}</p>
                  </div>
                )}
              </div>
              {selectedReport.notes && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Notes</label>
                  <div className="bg-ike-neutral-light/30 p-3 rounded-lg">
                    <p className="text-ike-neutral-dark whitespace-pre-wrap">{selectedReport.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Confirmation Modal */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
              <Send className="w-5 h-5 mr-2 text-ike-primary" />
              Submit Report to Statistics Sweden
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this report to Statistics Sweden? Once submitted, the report cannot be edited.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmSubmit}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StatisticsSwedenReports;
