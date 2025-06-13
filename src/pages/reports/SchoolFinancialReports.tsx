
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Search, 
  Download, 
  TrendingUp,
  FileText,
  Calendar,
  Euro,
  BarChart3
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const SchoolFinancialReports = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const financialReports = [
    {
      id: 1,
      name: "School Financial Summary",
      description: "Monthly financial overview for the school",
      amount: "342,500 SEK",
      period: "November 2024",
      status: "completed",
      format: "PDF/Excel",
      icon: DollarSign
    },
    {
      id: 2,
      name: "Cost per Student Analysis",
      description: "Detailed cost breakdown per enrolled student",
      amount: "1,387 SEK/student",
      period: "November 2024",
      status: "completed",
      format: "Excel",
      icon: BarChart3
    },
    {
      id: 3,
      name: "Annual Financial Report",
      description: "Yearly financial summary and projections",
      amount: "3,890,000 SEK",
      period: "2024",
      status: "in_progress",
      format: "PDF",
      icon: TrendingUp
    },
    {
      id: 4,
      name: "Municipal Contribution Report",
      description: "Funding received from municipality",
      amount: "298,750 SEK",
      period: "November 2024",
      status: "completed",
      format: "PDF/Excel",
      icon: Euro
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ike-success text-white">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-ike-primary text-white">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Financial Reports</h1>
          <p className="text-ike-neutral mt-2">
            School financial contribution reports and cost analysis
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ike-neutral" />
        <Input
          placeholder="Search financial reports..."
          className="pl-10 border-ike-primary/20 focus:border-ike-primary"
        />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">342,500 SEK</div>
            <div className="text-xs text-ike-success mt-1">+2.3% from last month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Cost per Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1,387 SEK</div>
            <div className="text-xs text-ike-neutral mt-1">Monthly average</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Municipal Funding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">298,750 SEK</div>
            <div className="text-xs text-ike-neutral mt-1">This month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Annual Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3.89M SEK</div>
            <div className="text-xs text-ike-neutral mt-1">2024 projection</div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Available Financial Reports
          </CardTitle>
          <CardDescription>
            Generate and download financial contribution reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                    <report.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{report.name}</h3>
                    <p className="text-sm text-ike-neutral mt-1">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-sm font-medium text-ike-primary">{report.amount}</div>
                      <Badge variant="outline">{report.format}</Badge>
                      {getStatusBadge(report.status)}
                      <div className="flex items-center text-xs text-ike-neutral">
                        <Calendar className="w-3 h-3 mr-1" />
                        {report.period}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light">
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                    disabled={report.status !== "completed"}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
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

export default SchoolFinancialReports;
