
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar,
  Building,
  DollarSign,
  AlertTriangle,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react";
import type { ReportCategory, ReportType, ReportFilters } from "@/types/reports";

const ReportsDashboard = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({
    format: 'PDF'
  });

  const reportCategories: ReportCategory[] = [
    {
      id: "income",
      title: "Income Reports",
      description: "Revenue and income information for principals and municipalities",
      icon: DollarSign,
      reports: [
        {
          id: "income-principal",
          name: "Income Information for Principal",
          description: "Revenue details for receiving principals",
          formats: ['PDF', 'CSV'],
          requiresDateRange: true,
          requiresMunicipality: false,
          requiresPrincipal: true
        },
        {
          id: "income-individual-principal",
          name: "Individual Principal Income (CSV)",
          description: "Income information for individual principals in Excel format",
          formats: ['CSV', 'Excel'],
          requiresDateRange: true,
          requiresMunicipality: false,
          requiresPrincipal: true
        }
      ]
    },
    {
      id: "payment-documents",
      title: "Payment Documents",
      description: "Payment documentation for municipalities and principals",
      icon: Receipt,
      reports: [
        {
          id: "payment-docs-municipality",
          name: "Payment Documents for Municipality",
          description: "Payment documents for paying home municipalities",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: true,
          requiresPrincipal: false
        },
        {
          id: "internal-debit",
          name: "Internal Debit Documents",
          description: "Internal debit documentation",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: true,
          requiresPrincipal: false
        }
      ]
    },
    {
      id: "error-lists",
      title: "Error Lists",
      description: "Error reports for principals and municipalities",
      icon: AlertTriangle,
      reports: [
        {
          id: "error-principal",
          name: "Error List for Principal",
          description: "Error list for receiving principals",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: false,
          requiresPrincipal: true
        },
        {
          id: "error-municipality",
          name: "Error List for Municipality",
          description: "Error list for paying home municipalities",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: true,
          requiresPrincipal: false
        }
      ]
    },
    {
      id: "change-lists",
      title: "Change Lists",
      description: "Change tracking reports for principals and municipalities",
      icon: TrendingUp,
      reports: [
        {
          id: "change-principal",
          name: "Change List for Principal",
          description: "Change list for receiving principals",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: false,
          requiresPrincipal: true
        },
        {
          id: "change-municipality",
          name: "Change List for Municipality",
          description: "Change list for paying home municipalities",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: true,
          requiresPrincipal: false
        }
      ]
    },
    {
      id: "accounting",
      title: "Accounting Documents",
      description: "Financial accounting documentation",
      icon: FileSpreadsheet,
      reports: [
        {
          id: "accounting-municipality",
          name: "Accounting Documents for Municipality",
          description: "Accounting documents for paying home municipalities",
          formats: ['PDF', 'CSV'],
          requiresDateRange: true,
          requiresMunicipality: true,
          requiresPrincipal: false
        },
        {
          id: "financial-integration",
          name: "Financial Integration Files",
          description: "Files for integration with municipality financial systems",
          formats: ['CSV', 'Excel'],
          requiresDateRange: true,
          requiresMunicipality: true,
          requiresPrincipal: false
        }
      ]
    },
    {
      id: "invoices",
      title: "Invoice Documents",
      description: "Invoice documentation and address labels",
      icon: CreditCard,
      reports: [
        {
          id: "invoice-principal",
          name: "Invoice Documents for Principal",
          description: "Invoice documents for principals of students from municipalities outside joint venture",
          formats: ['PDF'],
          requiresDateRange: true,
          requiresMunicipality: false,
          requiresPrincipal: true
        },
        {
          id: "address-labels",
          name: "Address Labels",
          description: "Address labels for municipalities with invoice addresses of principals",
          formats: ['PDF'],
          requiresDateRange: false,
          requiresMunicipality: true,
          requiresPrincipal: false
        }
      ]
    }
  ];

  const handleGenerateReport = (report: ReportType) => {
    setSelectedReport(report);
    setFilters({
      ...filters,
      format: report.formats[0] as 'PDF' | 'CSV' | 'Excel'
    });
    setIsGenerateModalOpen(true);
  };

  const handleConfirmGenerate = () => {
    if (!selectedReport) return;

    // Validate required fields
    if (selectedReport.requiresDateRange && (!filters.dateFrom || !filters.dateTo)) {
      toast({
        title: "Missing Date Range",
        description: "Please select a date range for this report.",
        variant: "destructive",
      });
      return;
    }

    if (selectedReport.requiresMunicipality && !filters.municipality) {
      toast({
        title: "Missing Municipality",
        description: "Please select a municipality for this report.",
        variant: "destructive",
      });
      return;
    }

    if (selectedReport.requiresPrincipal && !filters.principal) {
      toast({
        title: "Missing Principal",
        description: "Please select a principal for this report.",
        variant: "destructive",
      });
      return;
    }

    // Simulate report generation
    toast({
      title: "Report Generation Started",
      description: `Generating ${selectedReport.name} in ${filters.format} format...`,
    });

    setIsGenerateModalOpen(false);
    setSelectedReport(null);
    setFilters({ format: 'PDF' });
  };

  const getFormatBadge = (format: string) => {
    const colors = {
      PDF: "bg-ike-error text-white",
      CSV: "bg-ike-success text-white", 
      Excel: "bg-ike-primary text-white"
    };
    return <Badge className={colors[format as keyof typeof colors] || "bg-gray-500 text-white"}>{format}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Reports Dashboard</h1>
          <p className="text-ike-neutral mt-2">
            Generate and manage payment reports, error lists, and financial documents
          </p>
        </div>
      </div>

      {/* Report Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-ike-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <category.icon className="w-5 h-5 mr-2 text-ike-primary" />
                {category.title}
              </CardTitle>
              <CardDescription className="text-ike-neutral">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-ike-neutral-light/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-ike-neutral-dark">{report.name}</h4>
                      <p className="text-xs text-ike-neutral mt-1">{report.description}</p>
                      <div className="flex space-x-1 mt-2">
                        {report.formats.map((format) => (
                          <span key={format} className="text-xs">{getFormatBadge(format)}</span>
                        ))}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="ml-3 bg-ike-primary hover:bg-ike-primary-dark text-white"
                      onClick={() => handleGenerateReport(report)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate Report Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Generate Report: {selectedReport?.name}
            </DialogTitle>
            <DialogDescription>
              Configure the parameters for generating this report
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6">
              {/* Report Info */}
              <div className="p-4 bg-ike-neutral-light/30 rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark">{selectedReport.name}</h4>
                <p className="text-sm text-ike-neutral mt-1">{selectedReport.description}</p>
              </div>

              {/* Format Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Format</label>
                  <Select value={filters.format} onValueChange={(value) => setFilters({...filters, format: value as any})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedReport.formats.map(format => (
                        <SelectItem key={format} value={format}>{format}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Range */}
              {selectedReport.requiresDateRange && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">From Date</label>
                    <Input
                      type="date"
                      value={filters.dateFrom || ""}
                      onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">To Date</label>
                    <Input
                      type="date"
                      value={filters.dateTo || ""}
                      onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Municipality Selection */}
              {selectedReport.requiresMunicipality && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Municipality</label>
                  <Select value={filters.municipality} onValueChange={(value) => setFilters({...filters, municipality: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="malmo">Malmö Municipality</SelectItem>
                      <SelectItem value="lund">Lund Municipality</SelectItem>
                      <SelectItem value="helsingborg">Helsingborg Municipality</SelectItem>
                      <SelectItem value="kristianstad">Kristianstad Municipality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Principal Selection */}
              {selectedReport.requiresPrincipal && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Principal</label>
                  <Select value={filters.principal} onValueChange={(value) => setFilters({...filters, principal: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select principal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lars-larsson">Lars Larsson</SelectItem>
                      <SelectItem value="maria-svensson">Maria Svensson</SelectItem>
                      <SelectItem value="erik-eriksson">Erik Eriksson</SelectItem>
                      <SelectItem value="anna-andersson">Anna Andersson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmGenerate}
                  className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsDashboard;
