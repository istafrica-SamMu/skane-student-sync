
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, BarChart3, DollarSign, TrendingUp } from "lucide-react";

const MunicipalFinancialReports = () => {
  const reports = [
    {
      id: 1,
      name: "Monthly Financial Summary",
      description: "Complete overview of municipal education expenses",
      lastGenerated: "2024-11-15",
      frequency: "Monthly",
      status: "ready",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Student Cost Analysis",
      description: "Detailed cost breakdown per student and program",
      lastGenerated: "2024-11-10",
      frequency: "Weekly",
      status: "ready",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "Budget Variance Report",
      description: "Comparison between budgeted and actual expenses",
      lastGenerated: "2024-11-01",
      frequency: "Monthly",
      status: "generating",
      size: "Processing..."
    },
    {
      id: 4,
      name: "Payment Reconciliation",
      description: "Inter-municipal payment tracking and reconciliation",
      lastGenerated: "2024-10-31",
      frequency: "Monthly",
      status: "ready",
      size: "3.1 MB"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-ike-success text-white">Ready</Badge>;
      case "generating":
        return <Badge className="bg-ike-warning text-white">Generating</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Municipal Financial Reports</h1>
          <p className="text-ike-neutral mt-2">
            Generate and access comprehensive financial reports for municipal education
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Monthly Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12.5M SEK</div>
            <div className="text-xs text-ike-success">98.2% utilized</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Cost per Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">125,400 SEK</div>
            <div className="text-xs text-ike-neutral">Annual average</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Budget Variance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">+2.3%</div>
            <div className="text-xs text-ike-neutral">Above budget</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Savings Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">185,000 SEK</div>
            <div className="text-xs text-ike-neutral">This fiscal year</div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Available Financial Reports
          </CardTitle>
          <CardDescription>
            Access and download municipal financial reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-ike-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{report.name}</h3>
                      <p className="text-sm text-ike-neutral">{report.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-ike-neutral mt-1">
                        <span>Last generated: {report.lastGenerated}</span>
                        <span>Frequency: {report.frequency}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(report.status)}
                    {report.status === "ready" && (
                      <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
              Budget Analysis
            </CardTitle>
            <CardDescription>
              Generate budget vs actual spending report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
              Cost per Student
            </CardTitle>
            <CardDescription>
              Detailed cost breakdown by program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              Trend Analysis
            </CardTitle>
            <CardDescription>
              Year-over-year financial trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary/90 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MunicipalFinancialReports;
