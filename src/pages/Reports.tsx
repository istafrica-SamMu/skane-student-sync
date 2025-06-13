import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Download, 
  Calendar, 
  Edit,
  ChevronRight,
  Clock,
  Star,
  User,
  DollarSign,
  BarChart3
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Reports = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // School admin specific report categories
  const reportCategories = [
    {
      id: 1,
      name: "Student Lists & Statistics",
      icon: User,
      count: 8,
      popular: "Current Student Roster",
      url: "/students"
    },
    {
      id: 2,
      name: "Financial Contribution Reports",
      icon: DollarSign,
      count: 5,
      popular: "School Financial Summary",
      url: "/financial"
    },
    {
      id: 3,
      name: "Data Export & Statistics",
      icon: BarChart3,
      count: 6,
      popular: "Student Data Export",
      url: "/students/classes"
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Current Student Roster",
      category: "Student Lists",
      generatedDate: "2024-11-15 10:30",
      format: "Excel",
      user: user?.name || "School Admin"
    },
    {
      id: 2,
      name: "Monthly Financial Contribution",
      category: "Financial Reports",
      generatedDate: "2024-11-10 14:15",
      format: "PDF",
      user: user?.name || "School Admin"
    },
    {
      id: 3,
      name: "Program Enrollment Statistics",
      category: "School Statistics",
      generatedDate: "2024-11-12 09:45",
      format: "Excel",
      user: user?.name || "School Admin"
    }
  ];

  const savedReports = [
    {
      id: 1,
      name: "Weekly Student Attendance",
      category: "Student Lists",
      lastRun: "2024-11-10",
      favorite: true,
      description: "Weekly attendance report for all classes"
    },
    {
      id: 2,
      name: "Financial Contribution Summary",
      category: "Financial Reports",
      lastRun: "2024-11-08",
      favorite: true,
      description: "Monthly financial contribution breakdown"
    },
    {
      id: 3,
      name: "Class Performance Analysis",
      category: "School Statistics",
      lastRun: "2024-10-30",
      favorite: false,
      description: "Academic performance across all programs"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Basic Reporting</h1>
          <p className="text-ike-neutral mt-2">
            School-specific student lists, financial reports, and data export capabilities
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ike-neutral" />
        <Input
          placeholder="Search school reports..."
          className="pl-10 py-6 text-lg border-ike-primary/20 focus:border-ike-primary"
        />
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCategories.map((category) => (
          <Card 
            key={category.id}
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-primary"
            onClick={() => window.location.href = category.url}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-ike-primary/10 text-ike-primary rounded-full flex items-center justify-center mr-2">
                    <category.icon className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-ike-neutral-dark">{category.name}</CardTitle>
                </div>
                <Badge variant="secondary">{category.count}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ike-neutral mb-4">
                Most popular: <span className="text-ike-neutral-dark">{category.popular}</span>
              </p>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-ike-primary hover:bg-ike-primary/10"
              >
                View Reports
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Clock className="w-5 h-5 mr-2 text-ike-primary" />
            Recent Reports
          </CardTitle>
          <CardDescription>
            Recently generated school reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{report.name}</h3>
                    <div className="text-sm text-ike-neutral mt-1">
                      <span className="mr-4">{report.category}</span>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                    <div className="flex items-center text-xs text-ike-neutral mt-2">
                      <User className="w-3 h-3 mr-1" />
                      {report.user}
                      <span className="mx-2">•</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      {report.generatedDate}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Star className="w-5 h-5 mr-2 text-ike-warning" />
            Saved Report Templates
          </CardTitle>
          <CardDescription>
            Your custom report templates and favorites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedReports.map((report) => (
              <div 
                key={report.id} 
                className="p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ike-neutral-dark flex items-center">
                        {report.name}
                        {report.favorite && (
                          <Star className="w-4 h-4 ml-2 text-ike-warning fill-ike-warning" />
                        )}
                      </h3>
                      <div className="text-sm text-ike-neutral">
                        <span>{report.category}</span>
                        <span className="mx-2">•</span>
                        <span>Last run: {report.lastRun}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ike-neutral mt-3">
                  {report.description}
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <FileText className="w-4 h-4 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Report Types for School Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-ike-primary" />
              Student Lists & Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/students'}>
              <span className="text-sm">Current Student Roster</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/students/classes'}>
              <span className="text-sm">Students by Class</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/students'}>
              <span className="text-sm">Student Statistics</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
              Financial Contribution Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/financial'}>
              <span className="text-sm">School Financial Summary</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/financial'}>
              <span className="text-sm">Cost per Student</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/financial'}>
              <span className="text-sm">Annual Financial Report</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
              Data Export & Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/students'}>
              <span className="text-sm">Student Data Export</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/students/classes'}>
              <span className="text-sm">Class Information Export</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md cursor-pointer" onClick={() => window.location.href = '/financial'}>
              <span className="text-sm">Financial Data Export</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
